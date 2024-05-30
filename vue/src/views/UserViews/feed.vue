<template>
  <Sidebar>
    <div class="container mt-3">
      <!-- Social media selection -->
      <div class="mb-3">
        <label for="socialMedia">Selectionnez un réseau social:</label>
        <select class="form-select" v-model="selectedSocialMedia" aria-label="Default select">
          <option selected>Choisir un réseau social</option>
          <option value="facebook">Facebook</option>
          <!-- Add options for other social media platforms if needed -->
        </select>
      </div>
      
      <!-- Display posts based on selected social media -->
      <div v-if="feed.length">
        <div v-for="post in feed" :key="post.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ post.message }}</h5>
            <p class="card-text"><small class="text-muted">Créé le {{ formatCreatedTime(post.created_time) }}</small></p>
            <div v-if="post.full_picture">
              <img :src="post.full_picture" class="img-fluid" alt="Post image">
            </div>
            <div v-if="post.attachments">
              <div v-for="attachment in post.attachments.data" :key="attachment.title">
                <p v-if="attachment.title !== 'Ce contenu n’est pas disponible actuellement'">{{ attachment.title }}</p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <p class="card-text"><span class="badge bg-primary">Reactions: {{ post.reactions.summary.total_count }}</span></p>
              <p class="card-text"><span class="badge bg-secondary">Comments: {{ post.comments.summary.total_count }}</span></p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </Sidebar>
</template>

<script>
import { getFeed } from '@/services/PostService';
import Sidebar from '@/components/Sidebar';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      feed: [],
      selectedSocialMedia: 'Choisir un réseau social' // Default selected social media
    };
  },
  methods: {
    async fetchPosts() {
      try {
        // Fetch posts based on selected social media
        if (this.selectedSocialMedia === 'facebook') {
          const accessToken = this.getCookie('jwt');
          const response = await getFeed(accessToken);
          this.feed = response;

        } else if (this.selectedSocialMedia === 'twitter') {
          const accessToken = this.getCookie('X_access_token');
          const response = await getFeed(accessToken);
          this.feed = response;
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
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
    }
  },
  watch: {
    // Watch for changes in selected social media and fetch posts accordingly
    selectedSocialMedia(newVal) {
      this.fetchPosts();
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
