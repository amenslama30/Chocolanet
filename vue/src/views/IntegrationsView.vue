<template>
  <div>
    <Navbar/>
    <main role="main">

    <div class="container marketing mt-5">

      <!-- Three columns of text below the carousel -->
      <div class="row justify-content-center">
        <div class="col-lg-3">
          <img class="rounded-circle" src="@/assets/Facebook.png" alt="Generic placeholder image" width="140" height="140">
          <h2 class="mt-4 text-primary">Facebook</h2>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-5">
          <h2>Intégration de Facebook</h2>
          <p>L'intégration complète de Facebook dans notre outil de gestion de réseaux sociaux offre une expérience sans faille pour gérer efficacement votre présence sur ce réseau social incontournable. Grâce à notre plateforme, vous pouvez voir votre contenu, gérer vos pages, suivre les performances de vos publications, et interagir avec votre audience, le tout directement depuis un seul endroit.</p>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->

      <hr class="featurette-divider mt-5 mb-5">

      <div class="row featurette p-4" style="background-color: rgb(45, 18, 0);">
        <div class="col-md-7 d-flex flex-column justify-content-between">
          <div class="p-5">
            <h2 class="featurette-heading text-light">Exploitez plainement nos fonctionnalités</h2>
            <p class="lead text-light">pour la réussite de vos réseaux sociaux.</p>
            <button type="button" class="btn btn-warning btn-lg">
              <router-link to="/register" class="text-dark">S'inscrire dès maintenant</router-link>
            </button>
          </div>
        </div>
        <div class="col-md-5">
          <img class="featurette-image img-fluid mx-auto p-2" src="../assets/social8.jpg" data-holder-rendered="true">
        </div>
      </div>

        <hr class="featurette-divider mt-5 mb-5">
    </div><!-- /.container -->

    </main>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'HomeView',
  components: {
    Navbar,
    Footer
  }
}
</script>
