<template>
    <div>
        <Navbar/>
        <main role="main" class="main-section position-relative"></main>
        <div class="container mt-5">
            <hr class="featurette-divider mt-5 mb-5">
            <div class="text-center">
                    <h2 class="clear-heading">Suivi des Statistiques des Engagements</h2>
                </div><!-- /.text-center -->
            <div class="row ms-5 me-5 mb-5">
                <div class="col-4">
                    <hr class="featurette-divider-vertical">
                    <p>
                        Le suivi des statistiques des engagements vous permet de mesurer l'impact de vos interactions avec votre audience sur les réseaux sociaux. Notre outil vous fournit des données précieuses sur les likes, les partages, les commentaires, les mentions et les clics, vous permettant de comprendre comment votre audience réagit à votre contenu.
                    </p>
                </div>
                <div class="col-4">
                    <hr class="featurette-divider-vertical">
                    <p>
                        En analysant ces données, vous pouvez identifier les types de contenu qui suscitent le plus d'engagement, les moments opportuns pour publier et les sujets qui intéressent le plus votre audience. Vous pouvez également suivre l'évolution de l'engagement au fil du temps, évaluer l'efficacité de vos campagnes et ajuster votre stratégie en conséquence.
                    </p>
                </div>
                <div class="col-4">
                    <hr class="featurette-divider-vertical">
                    <p>
                        En comprenant mieux votre audience et en mesurant l'impact de vos actions, vous pouvez optimiser votre présence sur les réseaux sociaux, renforcer la fidélité à votre marque et atteindre vos objectifs marketing avec succès.
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
    name: 'EngagementStatisticsView',
    components: {
        Navbar,
        Footer
    }
}
</script>

<style scoped>
.main-section {
    background-image: url('@/assets/social12.png');
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
