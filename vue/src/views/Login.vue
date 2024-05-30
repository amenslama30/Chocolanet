<template>
  <section class="vh-100">
    <button class="btn btn-warning rounded-circle ms-2 mt-2" style="width: 40px; height: 40px;" @click="goBack"><i class="bi bi-arrow-left"></i></button>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <img src="../assets/photo-login.png"
            class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div class="card ">
            <div class="card-body p-4">
              <form @submit.prevent="signin">
                <p class="lead fw-normal text-center mb-3 me-3">Se connecter avec</p>
                <div class="d-flex flex-row align-items-center justify-content-center ">
                  <button type="button" data-mdb-ripple-init class="btn btn-lg btn-block w-75" style="background-color: #3b5998; color: #ffffff;" @click="signInWithFacebook">
                    <i class="bi bi-facebook"></i> Facebook
                  </button>
                  
                </div>

                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0">Ou</p>
                </div>

                <!-- Email input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="email">Adresse Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="email"
                    class="form-control"
                    placeholder="Enterez votre adresse mail"
                    required />
                </div>

                <!-- Password input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="password">Mot de Passe</label>
                  <input 
                    type="password" 
                    id="password" 
                    v-model="password"
                    class="form-control"
                    placeholder="Enterez votre mot de passe" 
                    required />
                    <p class="fs-6 text-danger">{{ errMdp }}</p>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <!-- Checkbox -->
                  <div class="form-check mb-0">
                    
                  </div>
                  <router-link to="recover-password" class="fw-bold" style="color: #ce3a00;">Mot de passe oublié?</router-link>
                </div>

                <div class="d-flex flex-row align-items-center justify-content-center">
                  <button 
                    class="btn btn-light btn-lg mt-4 mb-2 w-75" 
                    type="submit" 
                    style="padding-left: 2.5rem; padding-right: 2.5rem;"
                    :disabled="!email || !password">
                    Se connecter</button>
                </div>

                <p class="text-danger d-flex flex-row align-items-center justify-content-center">{{ errorMessage }}</p>
                <p class="small fw-bold mt-2 pt-1 mb-0">Vous n'avez pas un compte? <router-link to="/register"
                      style="color: #ce3a00;">S'inscrire</router-link></p>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
  
  </section>
</template>

<script>
import { signin, signInWithFacebook, signInWithTwitter } from '../services/AuthenticationService.js'
export default {
    data () {
        return {
            email: '',
            password: '',
            errMdp: '',
            errorMessage: ''
        }
    },
    methods: {
      async signin () {
        this.errMdp = '';

        if (!this.isValidPassword(this.password)) {
          this.errMdp = 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, un symbole et un chiffre';
          return;
        }
        try{
          const response = await signin({
              email: this.email,
              password: this.password,
          })
          
          if (response.status === 200) {
            this.$router.push({ path: response.data.redirect})
          } 
        }catch (error){
          console.error(error)
          // Handle sign-in errors (e.g., display error message)
          this.errorMessage = error.response.data.message
        }
      },

      async signInWithFacebook() {
        try {
          const response = await signInWithFacebook();
          // Handle successful sign-in (e.g., redirect to user profile)
          if (response.status === 200) {
             // Set a default redirect if none provided
            this.$router.push({ path: response.data.redirect });
            const accessToken = response.data.accessToken
            localStorage.setItem('accessToken', accessToken);
          } else {
            console.error(response.message); // Handle errors
          }
        } catch (error) {
          console.error(error);
          // Handle sign-in errors (e.g., display error message)
          this.errorMessage = error.response.data.message
        }
      },

      async signInWithTwitter() {
        try {
          const response = await signInWithTwitter();
          // Handle successful sign-in (e.g., redirect to user profile)
          if (response.status === 200) {
             // Set a default redirect if none provided
            this.$router.push({ path: response.data.redirect });
            const accessToken = response.data.accessToken
            localStorage.setItem('accessToken', accessToken);
          } else {
            console.error(response.message); // Handle errors
          }
        } catch (error) {
          console.error(error);
          // Handle sign-in errors (e.g., display error message)
        }
      },
      isValidPassword(password) {
        // Check if password contains at least 8 characters with at least one uppercase letter, one symbol, and one number
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        return passwordRegex.test(password);
      },
      goBack() {
        // Use the browser's history to navigate back
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
      },
    } 
}
</script>

<style lang="scss" scoped>
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
input[type="checkbox"]#checkbox-signin {
    background-color: #ffffff; 
    border-color: #ffffff;
    outline: none;
    box-shadow: none;
  }
input[type="checkbox"]#checkbox-signin:checked {
    background-color: #cf2900; 
    border-color: #cf2900;
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