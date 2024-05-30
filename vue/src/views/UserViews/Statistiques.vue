<template>
    <Sidebar>
      <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
          <h1 class="h3 mb-0 text-gray-800">Statistiques</h1>
          <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm" @click="generateReport">
            <i class="bi bi-download me-2"></i>Exporter le rapport
          </a>
        </div>
        <div class="mb-3">
          <label for="socialMedia">Selectionnez un réseau social:</label>
          <select class="form-select" v-model="selectedSocialMedia" aria-label="Default select">
            <option selected>Choisir un réseau social</option>
            <option value="facebook" @click="fetchEngagementData">Facebook</option>
            <!-- Add options for other social media platforms if needed -->
          </select>
        </div>
        <!-- Content Row -->
        <div class="row">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Nombre de publications</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totals.posts }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Nombre de likes</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totals.likes }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Nombre de commentaires</div>
                    <div class="row no-gutters align-items-center">
                      <div class="col-auto">
                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ totals.comments }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Nombre de partages</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totals.shares }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="card shadow mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h4 class="m-0 font-weight-bold text-dark">Engagements</h4>
              </div>
              <div class="card-body">
                <div class="chart-area">
                  <canvas id="engagementChart" width="800" height="200"></canvas>
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
  import { getEngagements } from '@/services/PostService';
  import { generateReport } from '@/services/PostService';
  
  
  export default {
    components: {
      Sidebar,
    },
    data() {
      return {
        selectedSocialMedia: 'Choisir un réseau social',
        totals: {
          likes: 0,
          comments: 0,
          shares: 0,
          posts: 0,
        },
      };
    },
    methods: {
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
          type: 'bar',
          data: {
            labels: ["Engagements des publications"],
            datasets: [
              {
                label: 'Likes',
                data: [this.totals.likes], // Data for Likes
                backgroundColor: 'rgba(255, 206, 86, 0.2)', // Likes
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
              },
              {
                label: 'Comments',
                data: [this.totals.comments], // Data for Comments
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Comments
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
              {
                label: 'Shares',
                data: [this.totals.shares], // Data for Shares
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Shares
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
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
    },
  };
</script>

  