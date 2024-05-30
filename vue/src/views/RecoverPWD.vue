<template>
  <section class="vh-100">
    <button class="btn btn-warning rounded-circle ms-2 mt-2" style="width: 40px; height: 40px;" @click="goBack"><i class="bi bi-arrow-left"></i></button>
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card text-center mt-3">
            <div class="card-header text-white" style="background-color: #c7b299;">Vous avez oublié votre mot de passe ?</div>
            <div class="card-body p-4">
              <form @submit.prevent="recoverPassword">
                <p class="lead fw-normal text-center mb-3 me-3" style="font-size: 15px;">Veuillez saisir votre adresse mail afin de poursuivre à  la réinisialisation de votre mot de passe.</p>
                <!-- Email input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  
                  <input 
                    type="email" 
                    id="email" 
                    v-model="email"
                    class="form-control"
                    placeholder="Enterez votre adresse mail"
                    required />
                </div>


                <div class="d-flex flex-row align-items-center justify-content-center">
                  <button class="btn text-light w-75" style="background-color: #5f4e39; font-size: 14px;" type="submit" >Récupérer votre mot de passe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div class="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 mt-4 me-4" role="alert" v-if="showSuccess">
    <strong>{{ alertSuccess }}</strong>
    <button type="button" class="btn-close" @click="hideAlert" aria-label="Close"></button>
  </div>
  <div class="alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 mt-4 me-4" role="alert" v-if="showError">
    <strong>{{ alertError }}</strong>
    <button type="button" class="btn-close" @click="hideAlert" aria-label="Close"></button>
  </div>
  </section>
</template>

<script>
import { recoverPassword } from '../services/AuthenticationService.js'
export default {
    data () {
        return {
            email: '',
            showSuccess: false,
            showError: false,
            alertSuccess: '',
            alertError: '',
        }
    },
    methods: {
    async recoverPassword() {
      try {
        await recoverPassword(this.email);
        // Show success alert
        this.showAlertSuccess('Email envoyé! Vérifiez votre inbox.', 'success');
      } catch (error) {
        // Show error alert
        this.showAlertError('Erreur . Veuillez réessayer.', 'danger');
      }
    },
    goBack() {
      // Use the browser's history to navigate back
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
    showAlertSuccess(message, type) {
      this.alertSuccess = message;
      this.showSuccess = true;
      // Hide alert after 5 seconds
      setTimeout(() => {
        this.hideAlert();
      }, 2000);
    },
    showAlertError(message, type) {
      this.alertError = message;
      this.showError = true;
      // Hide alert after 5 seconds
      setTimeout(() => {
        this.hideAlert();
      }, 2000);
    },
    hideAlert() {
      this.showSuccess = false;
      this.showError = false;
    }
  }
}
</script>


<style lang="scss">
section {
  background-color: #fff8e1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.card{
  background-color: #c7b299;
}
.divider:after,
  .divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #000000;
  }
  .h-custom {
  height: calc(100% - 73px);
  }
  @media (max-width: 450px) {
  .h-custom {
  height: 100%;
  }
}
</style>