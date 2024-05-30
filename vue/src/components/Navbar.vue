<template>
  <nav class="navbar navbar-expand-lg navbar-dark p-3" style="background-color: rgb(45, 18, 0);">
    <div class="container-fluid ms-5 me-5">
      <router-link class="navbar-brand me-5" to="/">Chocolanet</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Fonctionnalités
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="planification-contenu">Planification de contenu</a></li>
              <li><a class="dropdown-item" href="suivi-contenu">Suivi du contenu</a></li>
              <li><a class="dropdown-item" href="suivi-statistiques">Suivi des statistiques</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/integrations">Intégrations</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">A propos</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link class="btn btn-outline-light me-2" to="/login">Connexion</router-link>
          <router-link class="btn btn-light" to="/register">Inscription</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
.dropdown-menu {
  background: #ffffff;
  border: none;
  border-radius: 0.1rem;
}

.dropdown-item {
  color: rgb(45, 18, 0);
  margin-top: 5px;
}

.dropdown-item:hover {
  color: rgb(0, 0, 0);
  background-color: rgba(86, 86, 86, 0.045);
  border-left: 4px solid rgb(45, 18, 0);
}
</style>
