<template>
    <div class="wrapper">
          <aside id="sidebar" :class="sidebarClass">
              <div class="d-flex" >
                  <button class="toggle-btn" type="button" @click="toggleSidebar">
                      <i class="bi bi-grid-fill"></i>
                  </button>
                  <div class="sidebar-logo">
                      <a href="dashboard">Chocolanet</a>
                  </div>
              </div>
              <ul class="sidebar-nav">
                  <li class="sidebar-item">
                      <a href="dashboard" class="sidebar-link">
                          <i class="bi bi-speedometer2"></i>
                          <span>Dashboard</span>
                      </a>
                  </li>
                  <li class="sidebar-item">
                      <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                          data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                          <i class="bi bi-person-circle"></i>
                          <span>Mon contenu</span>
                      </a>
                      <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                          <li class="sidebar-item">
                              <a href="feed" class="sidebar-link">Mes publications</a>
                          </li>
                          <li class="sidebar-item">
                              <a href="statistiques" class="sidebar-link">
                                  <span>Mes statistiques</span>
                              </a>
                          </li>
                      </ul>
                  </li>
                  <li class="sidebar-item">
                      <a href="pages" class="sidebar-link">
                          <i class="bi bi-flag-fill"></i>
                          <span>Pages</span>
                      </a>
                  </li>
                  <div v-if="userRole === 'admin'">
                    <li class="sidebar-item">
                      <a href="espace-admin" class="sidebar-link">
                          <i class="bi bi-person-lines-fill"></i>
                          <span>Espace Admin</span>
                      </a>
                    </li>
                  </div>
              </ul>
          </aside>
          <div class="main ">
            <Topbar @user-role="setUserRole" />
              <slot />
          </div>
      </div>
  </template>

<script>
import Topbar from './Topbar.vue';
export default {
  data() {
    return {
      isOpened: true,
      userRole: null,
    };
  },
  components: {
    Topbar,
  },
  computed: {
    sidebarClass() {
      return this.isOpened ? 'expand' : '';
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpened = !this.isOpened;
    },
    setUserRole(role) {
      this.userRole = role;
      // You can perform additional logic here based on the user role
    },
  },
}
</script>





