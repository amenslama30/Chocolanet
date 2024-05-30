<template>
  <div>
    <Navbar/>
    <main role="main">
      <div id="Carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#Carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#Carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#Carousel" data-bs-slide-to="2" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#Carousel" data-bs-slide-to="3" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="3000">
            <img src="../assets/social1.jpg" class="img-fluid d-block carousel-image">
            <div class="carousel-caption d-none d-md-block text-start">
              <h5><b>Bienvenue sur Chocolanet</b></h5>
              <p>Votre solution tout-en-un pour la gestion efficace de vos réseaux sociaux !</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/social2.jpg" class="img-fluid d-block carousel-image">
            <div class="carousel-caption d-none d-md-block text-start">
              <h5><b>Prenez le contrôle</b></h5>
              <p>de votre stratégie de contenu pour une visibilité maximale et des résultats exceptionnels.</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/social3.jpg" class="img-fluid d-block carousel-image">
            <div class="carousel-caption d-none d-md-block text-start">
              <h5 class=""><b>Gérez vos publications</b></h5>
              <p class="">pour atteindre votre audience au bon moment, sur les bonnes plateformes.</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/social4.jpg" class="img-fluid d-block carousel-image">
            <div class="carousel-caption d-none d-md-block text-start">
              <h5><b>Suivez vos publications</b></h5>
              <p>pour prendre des décisions éclairées pour optimiser votre présence en ligne.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#Carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#Carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      
      <!-- Marketing messaging and featurettes -->
      <div class="container marketing">
        <!-- Three columns of text below the carousel -->
        <div class="row mt-5">
          <div class="col-lg-4">
            <img class="rounded-circle mx-auto d-block mb-3" src="../assets/section2/success.png" alt="Fonctionnalité 1" style="height: 150px; width: 150px;">
            <h3 class="text-center">Grands succès</h3>
            <p class="text-center">Démontrez votre impact social grâce aux outils d'analyse les plus performants.</p>
          </div>
          <div class="col-lg-4">
            <img class="rounded-circle mx-auto d-block mb-3" src="../assets/section2/calendar.png" alt="Fonctionnalité 2" style="height: 150px; width: 150px;">
            <h3 class="text-center">Planification de contenu</h3>
            <p class="text-center">Planifiez vos publications sur plusieurs réseaux sociaux en avance, pour une présence en ligne cohérente et efficace.</p>
          </div>
          <div class="col-lg-4">
            <img class="rounded-circle mx-auto d-block mb-3" src="../assets/section2/stats.png" alt="Fonctionnalité 3" style="height: 150px; width: 150px;">
            <h3 class="text-center">Outils d'analyses</h3>
            <p class="text-center">Accédez à des statistiques détaillées sur vos publications, pour comprendre l'engagement de votre audience et optimiser votre contenu.</p>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-4">
            <img class="mx-auto d-block mb-3" src="../assets/section2/shield.png" alt="Fonctionnalité 4" style="height: 150px; width: 150px;">
            <h3 class="text-center">Sécurité renforcée</h3>
            <p class="text-center">Protégez vos données et votre confidentialité avec notre système de sécurité avancé, assurant une expérience utilisateur sûre et fiable.</p>
          </div>
          <div class="col-lg-4">
            <img class=" mx-auto d-block mb-3" src="../assets/section2/interface.png" alt="Fonctionnalité 5" style="height: 150px; width: 150px;">
            <h3 class="text-center">Interface conviviale</h3>
            <p class="text-center">Profitez d'une interface intuitive et facile à utiliser, conçue pour simplifier la gestion de vos réseaux sociaux, sans tracas ni complications.</p>
          </div>
          <div class="col-lg-4">
            <img class="mx-auto d-block mb-3" src="../assets/section2/assistance.png" alt="Fonctionnalité 6" style="height: 150px; width: 150px;">
            <h3 class="text-center">Assistance dédiée</h3>
            <p class="text-center">Bénéficiez d'un support client dédié et réactif, disponible pour répondre à vos questions et vous aider à tirer le meilleur parti de notre application.</p>
          </div>
        </div>

        <!-- START THE FEATURETTES -->
        <hr class="featurette-divider mt-5 mb-5">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">Transformez votre présence en ligne. <br> <span class="text-muted">Boostez votre impact.</span></h2>
            <p class="lead">Grâce à nos outils avancés, prenez le contrôle de votre stratégie de contenu et faites de chaque publication un succès retentissant.</p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-fluid mx-auto" src="../assets/social6.jpg" data-holder-rendered="true" style="width: 500px; height: 400px;">
          </div>
        </div>

        <hr class="featurette-divider mt-5 mb-5">

        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">Analysez et Optimisez. <span class="text-muted">Voyez par vous-même.</span></h2>
            <p class="lead">Avec nos outils d'analyse détaillée, comprenez mieux votre audience et optimisez chaque aspect de votre présence en ligne pour des résultats exceptionnels.</p>
          </div>
          <div class="col-md-5 order-md-1">
            <img class="featurette-image img-fluid mx-auto" src="../assets/social7.jpg" data-holder-rendered="true" style="width: 500px; height: 400px;">
          </div>
        </div>

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

        <!-- /END THE FEATURETTES -->
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

<style>
.carousel-image {
  object-fit: cover;
  width: 100%;
  
}
</style>
