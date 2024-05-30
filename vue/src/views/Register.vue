<template>
<section class="vh-100" >
  <button class="btn btn-warning rounded-circle ms-2 mt-2" style="width: 40px; height: 40px;" @click="goBack"><i class="bi bi-arrow-left"></i></button>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <img src="../assets/photo-signup.png"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <div class="card">
          <div class="card-body p-4">
            <form @submit.prevent="signup">
              <p class="lead fw-normal text-center mb-3 me-3">S'inscrire avec</p>
              <div class="d-flex flex-row align-items-center justify-content-center ">
                <button type="button" data-mdb-ripple-init class="btn btn-lg btn-block w-75" style="background-color: #3b5998; color: #ffffff;" @click="signUpWithFacebook">
                  <i class="bi bi-facebook"></i> Facebook
                </button>
              </div>

              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0">Ou</p>
              </div>

              <!-- Username input -->
              <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="username">Nom d'utilisateur</label>
                <input 
                  type="text" 
                  id="username" 
                  v-model="username"
                  class="form-control"
                  placeholder="Enterez votre nom d'utilisateur"
                  required />
              </div>
              
              <!-- Email input -->
              <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="email">Adresse Mail</label>
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
              
              <!-- Password input -->
              <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="cpassword">Mot de Passe</label>
                <input 
                  type="password" 
                  id="cpassword" 
                  v-model="cpassword"
                  class="form-control"
                  placeholder="Enterez votre mot de passe" 
                  required />
                  <p class="fs-6 text-danger">{{ errCmdp }}</p>
              </div>
              <div class="d-flex flex-row align-items-center justify-content-center">
                <button 
                class="btn btn-light btn-lg mt-4 mb-2 w-50" 
                type="submit" style="padding-left: 2rem; padding-right: 2rem;"
                :disabled="!username || !email || !password || !cpassword">S'inscrire</button>
              </div>
              <p class="text-danger"></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script>
import { signup, signUpWithFacebook, signUpWithTwitter } from '../services/AuthenticationService.js'
export default {
    data () {
        return {
            username: '',
            email: '',
            password: '',
            cpassword: '',
            message: '',
            errMdp: '',
            errCmdp: '',
        }
    },
    methods: {
        async signup () {
          this.errMdp = '';
          this.errCmdp = '';
          if (!this.isValidPassword(this.password)) {
            this.errMdp = 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, un symbole et un chiffre';
            return;
          }else if (this.password !== this.cpassword) {
            this.errCmdp = 'Le mot de passe doit matcher'
          }
          try{
            const response = await signup({
                username: this.username,
                email: this.email,
                password: this.password
            })
            if (response.status === 200) {
              this.$router.push({ path: response.data.redirect})
            }
          }catch (error){
            console.error(error)
          } 
        },

        async signUpWithFacebook() {
          try {
            const response = await signUpWithFacebook();
            if (response.status === 200) { // Successful signup with redirect
              this.$router.push({ path: response.data.redirect });
            } else if (response.data.status === 409) { // User already exists, redirect to login
              this.$router.push({ path: response.data.redirect });
            } else {
              console.error(response.message); // Handle errors
            }
          } catch (error) {
            console.error(error);
            // Handle sign-in errors (e.g., display error message)
          }
        },
        
        async signUpWithTwitter() {
          try {
            const response = await signUpWithTwitter();
            if (response.status === 200) { // Successful signup with redirect
              this.$router.push({ path: response.data.redirect });
            } else if (response.data.status === 409) { // User already exists, redirect to login
              this.$router.push({ path: response.data.redirect });
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
        }
        
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
