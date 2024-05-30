<template>
  <Sidebar>
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      <!-- Content Row -->
      <div class="card p-2 mb-2">
        <div class="row">
          <div class="col-sm-3 mb-2">
            <div class="card-body p-2">
              <p class="card-title small-text">Explorez Chocolanet</p>
              <h5 class="card-text fw-bolder small-text">Découvrez les outils de base</h5>
            </div>
          </div>
          <div class="col-sm-3 mb-2">
            <div class="card h-100 p-1">
              <img src="../../assets/publier.png" class="card-img-top small-img" alt="...">
              <div class="card-body p-3">
                <h5 class="card-title small-text">Visualisez vos publications</h5>
                <p class="card-text small-text">Organisez votre contenu pour un impact maximal</p>
                <a href="feed" class="btn btn-warning btn-sm">Go</a>
              </div>
            </div>
          </div>
          <div class="col-sm-3 mb-2">
            <div class="card h-100 p-1">
              <img src="../../assets/stats.png" class="card-img-top small-img" alt="...">
              <div class="card-body p-3">
                <h5 class="card-title small-text">Suivez vos statistiques</h5>
                <p class="card-text small-text">Examinez les performances de vos publications avec des statistiques détaillées</p>
                <a href="statistiques" class="btn btn-warning btn-sm">Go</a>
              </div>
            </div>
          </div>
          <div class="col-sm-3 mb-2">
            <div class="card h-100 p-1">
              <img src="../../assets/pages.png" class="card-img-top small-img" alt="...">
              <div class="card-body p-3">
                <h5 class="card-title small-text">Gérez vos Pages</h5>
                <p class="card-text small-text">Contrôlez toutes vos Pages depuis un seul endroit, pour une gestion simplifiée</p>
                <a href="pages" class="btn btn-warning btn-sm">Go</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      
      <!-- Latest Post Section -->
      <div class="row">
        <div class="col-xl-6 col-md-12">
          <div class="card shadow mb-2 ">
            <div class="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h4 class="m-0 font-weight-bold text-dark small-text">Engagements</h4>
            </div>
            <div class="card-body p-2">
              <div class="chart-area">
                <canvas id="engagementChart" height="300"></canvas>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-xl-6 col-md-12">
          <div class="card shadow mb-2 custom-card">
            <div class="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h4 class="m-0 font-weight-bold text-dark small-text">Dernière publication</h4>
            </div>
            <div class="card-body p-2">
              <p class="card-text"><strong>Message:</strong> {{ latestPost.message }}</p>
              <p class="card-text"><strong>Crée le :</strong> {{ created_time }}</p>
              <img v-if="latestPost.full_picture" :src="latestPost.full_picture" class="img-fluid" alt="Latest Post Image">
              <div class="d-flex justify-content-between">
                <p class="card-text"><span class="badge bg-primary">Reactions: {{ reactions }}</span></p>
                <p class="card-text"><span class="badge bg-secondary">Comments: {{ comments }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Chart from 'chart.js/auto';
import { getEngagements, getLatestFeed } from '@/services/PostService';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      totals: {
        likes: 0,
        comments: 0,
        shares: 0,
        posts: 0,
      },
      latestPost: {},
      reactions: '',
      comments: '',
      created_time: ''
    };
  },
  mounted() {
    this.fetchEngagementData();
    this.fetchLatestPost();
  },
  methods: {
    async fetchLatestPost() {
      try {
        const accessToken = this.getCookie('jwt');
        const response = await getLatestFeed(accessToken);
        this.reactions = response.reactions.summary.total_count;
        this.comments = response.comments.summary.total_count;
        this.latestPost = response;
        this.created_time = this.formatCreatedTime(this.latestPost.created_time)
      } catch (error) {
        console.error('Error fetching latest post:', error);
      }
    },
    async fetchEngagementData() {
      try {
        const accessToken = this.getCookie('jwt');
        const response = await getEngagements(accessToken);
        this.totals = response;
        this.createChart();
      } catch (error) {
        console.error('Error fetching engagement data:', error);
      }
    },
    createChart() {
      const ctx = document.getElementById('engagementChart').getContext('2d');
      this.engagementChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Likes', 'Comments', 'Shares'],
          datasets: [{
            data: [this.totals.likes, this.totals.comments, this.totals.shares],
            backgroundColor: [
              'rgba(255, 206, 86, 0.2)', // Likes
              'rgba(54, 162, 235, 0.2)', // Comments
              'rgba(255, 99, 132, 0.2)', // Shares
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    async generateReport() {
      try {
        const accessToken = this.getCookie('jwt');
        const response = await generateReport(accessToken);
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error('Error generating report:', error);
      }
    },
    formatCreatedTime(createdTime) {
      // Convert createdTime to a JavaScript Date object
      const date = new Date(createdTime);
      
      // Define French locale options for date formatting
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      
      // Format the date according to French locale
      return date.toLocaleDateString('fr-FR', options);
    },
  },
};
</script>

<style scoped>
.custom-card {
  max-height: 363px; /* Adjust the maximum height as needed */
  overflow-y: auto; /* Add vertical scroll if content exceeds the maximum height */
}
</style>