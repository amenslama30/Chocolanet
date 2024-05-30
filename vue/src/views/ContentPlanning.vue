<template>
  <div>
      <Navbar/>
      <main role="main" class="main-section position-relative"></main>
      <div class="container mt-5">
          <hr class="featurette-divider mt-5 mb-5">
          <div class="text-center">
                  <h2 class="clear-heading">Planification du Contenu</h2>
              </div><!-- /.text-center -->
          <div class="row ms-5 me-5 mb-5">
              <div class="col-4">
                  <hr class="featurette-divider-vertical">
                  <p>
          La planification du contenu est une étape essentielle dans la gestion stratégique des réseaux sociaux. Notre outil de planification vous permet de créer un calendrier éditorial détaillé, de définir des objectifs de publication et de gérer efficacement votre contenu à travers différents canaux sociaux.
        </p>
              </div>
              <div class="col-4">
                  <hr class="featurette-divider-vertical">
                  <p>
          Grâce à une interface conviviale et des fonctionnalités avancées, vous pouvez organiser vos publications par date, heure et audience cible. Notre outil vous permet également de collaborer avec votre équipe, de planifier des campagnes à l'avance et de prévisualiser vos publications pour une cohérence et une qualité optimales.
        </p>
              </div>
              <div class="col-4">
                  <hr class="featurette-divider-vertical">
                  <p>
          En planifiant votre contenu de manière stratégique, vous pouvez maximiser l'impact de vos publications, maintenir une présence régulière sur les réseaux sociaux et renforcer l'engagement de votre audience.
        </p>
              </div>
          </div>
          <hr class="featurette-divider mt-5 mb-5">
          
      </div>
      <Footer/>
  </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'ContentPlanningView',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.main-section {
    background-image: url('@/assets/social10.png');
    background-size: cover;
    background-position: center;
    min-height: 80vh;
    margin-bottom: 50px;
}

.clear-heading {
    color: #000000; /* Set text color to white */
    font-weight: bold; /* Set font weight to bold */
    text-transform: uppercase; /* Convert text to uppercase */
}
</style>