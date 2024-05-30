<template>
    <Sidebar>
      <h1 class="h3 mb-0 text-gray-800 ms-2 mt-4">{{ name }}</h1>
      <div class="container mt-4">
        <div v-if="posts && posts.length">
          <div v-for="post in posts" :key="post.id" class="card mb-3">
            <div class="card-body">
            <button @click="deletePost(post.id, accesstoken)" class="btn btn-danger btn-sm" style="position: absolute; top: 5px; right: 5px;"><i class="bi bi-trash3"></i></button>
            <h5 class="card-title me-5">{{ post.message }}</h5>
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
import Sidebar from "@/components/Sidebar.vue";
import { deletePost } from '@/services/PostService';
export default {
  name: 'AnotherPage',
  components: {
    Sidebar
  },
  data() {
    return {
      posts: [], // Define a local variable to hold posts data
      name: '',
      accesstoken: ''
    };
  },
  mounted() {
    // Retrieve and parse posts data from query parameter
    if (this.$route.query.posts) {
      this.posts = JSON.parse(this.$route.query.posts);
    }
    if (this.$route.query.name) {
      this.name = JSON.parse(this.$route.query.name);
    }
    if (this.$route.query.accesstoken) {
      this.accesstoken = JSON.parse(this.$route.query.accesstoken);
    }
  },
    
    methods: {
      formatCreatedTime(createdTime) {
        const date = new Date(createdTime);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        };
        return date.toLocaleDateString('fr-FR', options);
      },
      async deletePost(postId, accessToken) {
        try {
            
            const response = await deletePost(postId, accessToken);
            // Assuming successful deletion, remove the post from the local data
            this.posts = this.posts.filter(post => post.id !== postId);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
      }
    },
  };
  </script>