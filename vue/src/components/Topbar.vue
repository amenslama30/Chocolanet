<template>
<nav class="navbar navbar-expand-lg border-bottom justify-content-end" style="background-color: rgb(255, 249, 239);">
    <div class="topbar-divider d-none d-sm-block"></div>
    <p class="mb-0 me-3">Salut, <b class="ms-2">{{ user.username }}</b></p>
    <div class="dropdown me-4">
        <img class="rounded-circle" :src="user.profilePic" type="button" data-bs-toggle="dropdown" width="35" height="35" aria-expanded="false">
        <ul class="dropdown-menu dropdown-menu-end text-start" >
          <li><a class="dropdown-item" href="/profile">Mon compte</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item" @click="handleSignOut">Se déconnecter</button></li>
        </ul>
    </div>
</nav>
</template>

<script>
import { fetchUser, signout, signOutUser } from '../services/AuthenticationService.js'
export default {
  data() {
    return {
      user: {},
    }
  },
  async mounted() {
    try {
      const response = await fetchUser();
      this.user = response.data.user
      this.$emit('user-role', this.user.role);
      return response
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  methods: {
    async handleSignOut() {
      try {
        const response = await signout();
        await signOutUser()
        this.$router.push({ path: response.data.redirect }); // Redirect to login page after signout
      } catch (error) {
        console.error(error);
        // Handle signout errors (e.g., display error message)
      }
    },
  },
}
</script>

