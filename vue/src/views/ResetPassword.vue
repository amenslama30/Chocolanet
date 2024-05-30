<template>
  <section class="vh-100">
    <button class="btn btn-warning rounded-circle ms-2 mt-2" style="width: 40px; height: 40px;" @click="goBack"><i class="bi bi-arrow-left"></i></button>
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card text-center mt-3">
            <div class="card-header text-white" style="background-color: #c7b299;">Réinitialisation du mot de passe</div>
            <div class="card-body p-4">
              <form @submit.prevent="resetPassword">
                <p class="lead fw-normal text-center mb-3 me-3" style="font-size: 15px;">Vous y êtes presque, saisissez votre nouveau mot de passe.</p>
                <!-- Email input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <label for="password">Nouveau mot de passe :</label>
                  <input 
                    type="password" 
                    id="password" 
                    v-model="password"
                    class="form-control"
                    placeholder="Enterez votre nouveau mot de passe"
                    required />
                </div>
                <div data-mdb-input-init class="form-outline mb-4">
                  <label for="cpassword">Confirmer mot de passe :</label>
                  <input 
                    type="password" 
                    id="cpassword" 
                    v-model="cpassword"
                    class="form-control"
                    placeholder="Confirmez votre nouveau mot de passe"
                    required />
                </div>


                <div class="d-flex flex-row align-items-center justify-content-center">
                  <button class="btn text-light w-50" style="background-color: #5f4e39; font-size: 14px;" type="submit" >Confirmer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div class="alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 mt-4 me-4" role="alert" v-if="showError">
    <strong>{{ alertError }}</strong>
    <button type="button" class="btn-close" @click="hideAlert" aria-label="Close"></button>
  </div>
  </section>
</template>

<script>
import { resetPassword } from '../services/AuthenticationService.js'
export default {
    data () {
        return {
            password: '',
            cpassword: '',
            token: this.$route.params.token,
            showError: false,
            alertError: '',
        }
    },
    methods: {
      async resetPassword() {
        try {
            await resetPassword(this.token, this.password);
              this.$router.push('/login')
            
        } catch (error) {
            this.showAlertError('Erreur de réinitialisation de mot de passe. Veuillez réessayer.', 'danger');
        }
      },
      goBack() {
        // Use the browser's history to navigate back
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
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