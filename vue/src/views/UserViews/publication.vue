<template>
  <Sidebar>
    <form class="container-sm w-50" @submit.prevent="submitPost">
      <div class="mt-5 m-3">
        <select class="form-select" v-model="selectedPlatform" aria-label="Default select">
          <option selected>Select a platform</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="tiwtter">Twitter</option>
          <option value="github">Github</option>
        </select>
      </div>
      <div class="m-3">
        <textarea v-model="message" class="form-control" id="Textarea1" rows="3"></textarea>
      </div>
      <div class="m-3">
        <button type="submit" class="btn btn-primary mb-3">Publier</button>
      </div>
      <div class="m-3">
        <p>{{ statut }}</p>
      </div>
      
    </form>
  </Sidebar>
</template>

<script>
import { createPost } from '@/services/PostService'; 
import Sidebar from "@/components/Sidebar.vue"
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      selectedPlatform: 'Select a platform',
      message: '',
      statut: ''
    };
  },
  methods: {
    async submitPost() {
      if (this.selectedPlatform === "facebook"){
        try {
          // Call the createPost method with the message from the textarea
          await this.createPost(this.message, this.selectedPlatform);
          // Optionally, reset the textarea after posting
          this.message = '';
        } catch (error) {
          console.error('Error creating post:', error);
          // Handle error
        }
      }
    },
    async createPost(message) {
      try {
        const response = await createPost(message);
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
}
</script>
