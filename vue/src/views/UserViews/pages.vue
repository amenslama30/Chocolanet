<template>
  <Sidebar>
    <div class="container-fluid">
    <h1 class="h3 mb-0 text-gray-800 mt-4">Mes pages</h1>
    <div class="row ms-5 mt-5">
      <div v-for="page in pages" :key="page" class="col-md-5 col-12 mb-4 ms-5">
        <div class="card">
          <div class="card-header">
            {{ page.name }}
          </div>
          <div class="card-body d-flex flex-column align-items-center">
            
              <button 
                type="button" 
                class="btn btn-warning mb-3 w-75"
                @click="handlePageSelectionForFeed(page)">
                Voir mes publications
              </button>
            
            
              <button 
                type="button" 
                class="btn btn-warning mb-3 w-75"
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal2"
                @click="handlePageSelectionForPost(page)">
                Planifier une publication
              </button>
              
              <button 
                type="button" 
                class="btn btn-warning mb-3 w-75"
                @click="handlePageSelectionForStats(page)">
                Générer les statistiques
              </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
        <div v-show="showModal" class="modal modal-lg fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Créer une Publication</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="card-body">
                  <div v-if="alertMessage" :class="`alert alert-${alertType} alert-dismissible fade show`" role="alert">
                              {{ alertMessage }}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearAlert"></button>
                            </div>
                  <form class="container-sm w-50" @submit.prevent="submitPost">
                    <div class="m-3">
                      <label class="form-check-label">
                        Message :
                      </label>
                      <textarea v-model="message" class="form-control" id="Textarea1" rows="3"></textarea>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" v-model="chooseDateTime" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Choisir l'heure et la date 
                      </label>
                    </div>

                    <div v-if="chooseDateTime" class="m-3">
                      <label for="postDate">choisir la Date:</label>
                      <input type="date" v-model="postDate" class="form-control" id="postDate">
                    </div>
                    <div v-if="chooseDateTime" class="m-3">
                      <label for="postTime">Choisir l'heure:</label>
                      <input type="time" v-model="postTime" class="form-control" id="postTime">
                    </div>
                    <div class="m-3">
                      <button type="submit" class="btn btn-warning mb-3">Publier</button>
                    </div>
                    <div class="m-3">
                      <p>{{ statut }}</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      
  </Sidebar>
</template>

<script>
import { getPages, getLatestPost, createPost, createPostTimer, getPageEngagements } from '@/services/PostService';
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      pages: [],
      selectedPlatform: 'Select a platform',
      message: '',
      statut: '',
      posts: [],
      formattedTime: '',
      selectedPage: null,
      postDate: '',
      postTime: '',
      alertType: '',
      alertMessage: '',
      chooseDateTime: false,
      totals: {
          likes: 0,
          comments: 0,
          shares: 0,
          posts: 0,
        },
    };
  },
  
  async mounted() {
    try {
      const accessToken = this.getCookie('jwt');
      const response = await getPages(accessToken);
      this.pages = response.data.accounts.data.map((page) => ({
        PageId: page.id,
        name: page.name,
        accesstoken: page.access_token
      }));
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  },
  methods: {
    getCookie(name) {
      const value = document.cookie;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    async handlePageSelectionForFeed(data) {
      const { PageId, accesstoken, name } = data;
      try {
        const response = await getLatestPost(PageId, accesstoken);
        this.posts = response;
        // Navigate to another page with posts data
        this.$router.push({ name: 'AnotherPage', query: { posts: JSON.stringify(this.posts), name: JSON.stringify(name), accesstoken: JSON.stringify(accesstoken) } });
      } catch (error) {
        console.error('Error fetching latest post:', error);
      }
    },
    async handlePageSelectionForStats(data) {
      const { PageId, accesstoken, name } = data;
      try {
        const response = await getPageEngagements(PageId, accesstoken);
        // Navigate to another page with posts data
        this.$router.push({ name: 'statistiques-page', query: { stats: JSON.stringify(response), name: JSON.stringify(name) } });
      } catch (error) {
        console.error('Error fetching latest post:', error);
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
    async handlePageSelectionForPost(data) {
      const { PageId, accesstoken } = data;
      this.selectedPage = { PageId, accesstoken };
    },

    async submitPost() {
      if (this.selectedPlatform === "facebook") {
        try {
          if (!this.chooseDateTime) {
            // If chooseDateTime is false, create the post instantly
            await this.createPost(this.message, this.selectedPage.PageId, this.selectedPage.accesstoken);
          } else {
            // If chooseDateTime is true, create the post with scheduled time
            const scheduledTime = this.getScheduledTime();
            await this.createPostTimer(this.message, this.selectedPage.PageId, this.selectedPage.accesstoken, scheduledTime);
          }
          this.message = '';
          this.postDate = '';
          this.postTime = '';
        } catch (error) {
          console.error('Error creating post:', error);
        }
      }
    },

    getScheduledTime() {
      const date = new Date(`${this.postDate}T${this.postTime}:00`);
      return Math.floor(date.getTime() / 1000);
    },

    async createPost(message, PageId, accesstoken) {
      try {
        const response = await createPost({ message, PageId, accesstoken });
        if (response.status === 200) {
          this.alertType = 'success';
          this.alertMessage = 'Publication crée avec succès!';
        } else {
          this.alertType = 'danger';
          this.alertMessage = 'Problème de création de publication';
        }
        return response;
      } catch (error) {
        this.alertType = 'danger';
        this.alertMessage = 'Problème de création de publication';
        throw error;
      }
    },
    
    async createPostTimer(message, PageId, accesstoken, scheduled_publish_time) {
      try {
          const response = await createPostTimer({ message, PageId, accesstoken, scheduled_publish_time });
          if (response.status === 200) {
            this.alertType = 'success';
            this.alertMessage = 'Publication programmée avec succès!';
          } else {
            this.alertType = 'danger';
            this.alertMessage = 'Problème de création de publication';
          }
          return response;
      } catch (error) {
        this.alertType = 'danger';
        this.alertMessage = 'Problème de création de publication';
        throw error;
      }
    },

    clearAlert() {
      this.alertMessage = '';
    }
  },
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e3e6f0;
  border-radius: 0.35rem;
  width: 500px;
  max-width: 500px;
}
  
  .card > hr {
    margin-right: 0;
    margin-left: 0;
  }
  
  .card > .list-group {
    border-top: inherit;
    border-bottom: inherit;
  }
  
  .card > .list-group:first-child {
    border-top-width: 0;
    border-top-left-radius: calc(0.35rem - 1px);
    border-top-right-radius: calc(0.35rem - 1px);
  }
  
  .card > .list-group:last-child {
    border-bottom-width: 0;
    border-bottom-right-radius: calc(0.35rem - 1px);
    border-bottom-left-radius: calc(0.35rem - 1px);
  }
  
  .card > .card-header + .list-group,
  .card > .list-group + .card-footer {
    border-top: 0;
  }
  
  .card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
  }
  
  .card-title {
    margin-bottom: 0.75rem;
  }
  
  .card-subtitle {
    margin-top: -0.375rem;
    margin-bottom: 0;
  }
  
  .card-text:last-child {
    margin-bottom: 0;
  }
  
  .card-link:hover {
    text-decoration: none;
  }
  
  .card-link + .card-link {
    margin-left: 1.25rem;
  }
  
  .card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: #f8f9fc;
    border-bottom: 1px solid #e3e6f0;
  }
  
  .card-header:first-child {
    border-radius: calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0;
  }
  
  .card-footer {
    padding: 0.75rem 1.25rem;
    background-color: #f8f9fc;
    border-top: 1px solid #e3e6f0;
  }
  
  .card-footer:last-child {
    border-radius: 0 0 calc(0.35rem - 1px) calc(0.35rem - 1px);
  }
  
  .card-header-tabs {
    margin-right: -0.625rem;
    margin-bottom: -0.75rem;
    margin-left: -0.625rem;
    border-bottom: 0;
  }
  
  .card-header-pills {
    margin-right: -0.625rem;
    margin-left: -0.625rem;
  }
  
  .card-img-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1.25rem;
    border-radius: calc(0.35rem - 1px);
  }
  
  .card-img,
  .card-img-top,
  .card-img-bottom {
    flex-shrink: 0;
    width: 100%;
  }
  
  .card-img,
  .card-img-top {
    border-top-left-radius: calc(0.35rem - 1px);
    border-top-right-radius: calc(0.35rem - 1px);
  }
  
  .card-img,
  .card-img-bottom {
    border-bottom-right-radius: calc(0.35rem - 1px);
    border-bottom-left-radius: calc(0.35rem - 1px);
  }
  
  .card-deck .card {
    margin-bottom: 0.75rem;
  }
  
  @media (min-width: 576px) {
    .card-deck {
      display: flex;
      flex-flow: row wrap;
      margin-right: -0.75rem;
      margin-left: -0.75rem;
    }
    .card-deck .card {
      flex: 1 0 0%;
      margin-right: 0.75rem;
      margin-bottom: 0;
      margin-left: 0.75rem;
    }
  }
  
  .card-group > .card {
    margin-bottom: 0.75rem;
  }
  
  @media (min-width: 576px) {
    .card-group {
      display: flex;
      flex-flow: row wrap;
    }
    .card-group > .card {
      flex: 1 0 0%;
      margin-bottom: 0;
    }
    .card-group > .card + .card {
      margin-left: 0;
      border-left: 0;
    }
    .card-group > .card:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .card-group > .card:not(:last-child) .card-img-top,
    .card-group > .card:not(:last-child) .card-header {
      border-top-right-radius: 0;
    }
    .card-group > .card:not(:last-child) .card-img-bottom,
    .card-group > .card:not(:last-child) .card-footer {
      border-bottom-right-radius: 0;
    }
    .card-group > .card:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .card-group > .card:not(:first-child) .card-img-top,
    .card-group > .card:not(:first-child) .card-header {
      border-top-left-radius: 0;
    }
    .card-group > .card:not(:first-child) .card-img-bottom,
    .card-group > .card:not(:first-child) .card-footer {
      border-bottom-left-radius: 0;
    }
  }
  
  .card-columns .card {
    margin-bottom: 0.75rem;
  }
  
  @media (min-width: 576px) {
    .card-columns {
      -moz-column-count: 3;
      column-count: 3;
      -moz-column-gap: 1.25rem;
      column-gap: 1.25rem;
      orphans: 1;
      widows: 1;
    }
    .card-columns .card {
      display: inline-block;
      width: 100%;
    }
  }
  
  .accordion {
    overflow-anchor: none;
  }
  
  .accordion > .card {
    overflow: hidden;
  }
  
  .accordion > .card:not(:last-of-type) {
    border-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  
  .accordion > .card:not(:first-of-type) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  
  .accordion > .card > .card-header {
    border-radius: 0;
    margin-bottom: -1px;
  }
</style>
