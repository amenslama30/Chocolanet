<template>
  <div>
      <Navbar/>
      <main role="main" class="main-section position-relative"></main>
      <div class="container mt-5">
          <hr class="featurette-divider mt-5 mb-5">
          <div class="text-center">
                  <h2 class="clear-heading">Suivi du Contenu</h2>
              </div><!-- /.text-center -->
          <div class="row ms-5 me-5 mb-5">
              <div class="col-4">
                  <hr class="featurette-divider-vertical">
                  <p>
                    Le suivi du contenu est une étape cruciale pour évaluer l'efficacité de votre stratégie de médias sociaux. Notre outil de suivi vous offre des analyses détaillées sur les performances de vos publications, vous permettant de comprendre ce qui fonctionne le mieux pour votre audience et d'adapter votre stratégie en conséquence.
                  </p>
              </div>
              <div class="col-4">
                  <hr class="featurette-divider-vertical">
                  <p>
                    Grâce à des tableaux de bord personnalisables, vous pouvez suivre les indicateurs clés tels que le nombre de vues, les engagements, les partages et les commentaires. Vous pouvez également surveiller les tendances de votre contenu au fil du temps, identifier les pics d'activité et ajuster votre calendrier éditorial en conséquence.
                  </p>
              </div>
              <div class="col-4">
                  <hr class="featurette-divider-vertical">
                  <p>
                    En analysant régulièrement les performances de votre contenu, vous pouvez optimiser votre stratégie de publication, améliorer l'engagement de votre audience et atteindre vos objectifs marketing sur les réseaux sociaux.
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
    name: 'ContentTrackingView',
    components: {
      Navbar,
      Footer
    }
  }
  </script>

<style scoped>
.main-section {
    background-image: url('@/assets/social11.png');
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