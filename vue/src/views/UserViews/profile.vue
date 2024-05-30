<template>
  <button class="btn btn-warning rounded-circle ms-2 mt-2" style="width: 40px; height: 40px;" @click="goBack"><i class="bi bi-arrow-left"></i></button>
<div class="container rounded bg-white mt-5 ">
  
  <div class="row ms-5">
    <div class="card col-5 me-3">
      <div class="card-body p-2">
        <div class="d-flex flex-column align-items-center text-center">
          <img class="rounded-circle mt-5 mb-3" width="110px" :src="profileImage">
          <span class="font-weight-bold">{{ username2 }}</span>
          <span class="text-black-50">{{ email2 }}</span>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center mb-2">
        <button class="btn mb-2 w-50" :class="isFacebookLinked ? 'btn-success' : 'btn-primary'" type="button" @click="linkAccount('facebook.com')" :disabled="isFacebookLinked">
            {{ isFacebookLinked ? 'Facebook Linked' : 'Link with Facebook' }}
          </button>
          <button class="btn text-light w-50" :class="isTwitterLinked ? 'btn-success' : 'btn-info'" type="button" @click="linkAccount('twitter.com')" :disabled="isTwitterLinked">
            {{ isTwitterLinked ? 'Twitter Linked' : 'Link with Twitter' }}
          </button>
      </div>
    </div>

    <div class="card col-6">
  <div class="card-body p-2">
    <div class="py-5 ms-2">
      <div class="d-flex justify-content-between mb-3">
        <h4 class="text-right">Mes informations</h4>
        
      </div>
      <div class="row mt-3">
        <div class="col-md-11">
          <label class="labels">Nom d'utilisateur</label>
          <input v-model="username" type="text" class="form-control" :disabled="!isEditing"  aria-label="readonly input example">
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-11">
          <label class="labels">Adresse Email</label>
          <input v-model="email" type="text" class="form-control" :disabled="!isEditing"  aria-label="readonly input example">
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-11">
          <label class="labels">Numéro de téléphone</label>
          <input v-model="phone" type="text" class="form-control" :disabled="!isEditing" aria-label="readonly input example">
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-11">
          <label class="labels">Mot de passe</label>
          <input v-model="password" type="password" class="form-control" :disabled="!isEditing" aria-label="readonly input example">
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-12 mt-3 mb-3 text-center">
    <button class="btn profile-button" type="button" @click="toggleEditAndSave">{{ isEditing ?  'Terminer' : 'Modifier' }}</button>
  </div>
  </div>
  
        
  </div> 
</div>

</template>

<script>
import { fetchUser, linkSocialMediaAccount  } from '@/services/AuthenticationService.js';
import { modifUser, updateProfilePic } from '@/services/ProfileManage.js';
import _ from 'lodash';

export default {
  data() {
    return {
        username: '',
        username2: '',
        email: '',
        email2: '',
        phone: '',
        password: '',
        profileImage: '',
        userid: '',
        provider: [],
        providerLinked:'',
        initialUserData: {},
      isEditing: false,
      isFacebookLinked: false,
      isTwitterLinked: false,
    };
  },
  async mounted() {
    try {
      const response = await fetchUser();
      this.username = response.data.user.username
      this.username2 = response.data.user.username
      this.email = response.data.user.email
      this.email2 = response.data.user.email
      this.phone = response.data.user.phone
      this.password = response.data.user.password
      this.profileImage = response.data.user.profilePic
      this.userid = response.data.user._id
      const provider = response.data.user.provider
      provider.forEach(provider => {
        if (provider.providerName === 'facebook.com') {
          this.isFacebookLinked = true;
        } else if (provider.providerName === 'twitter.com') {
          this.isTwitterLinked = true;
        }
      });
      
      this.initialUserData = {
        username: response.data.user.username,
        email: response.data.user.email,
        phone: response.data.user.phone,
        password: response.data.user.password,
        profilePic: response.data.user.profilePic,
        userid: response.data.user._id
      };
      
      if (this.provider === 'facebook.com') {
        this.isFacebookLinked = true;
      } else if (this.provider === 'twitter.com') {
        this.isTwitterLinked = true;
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  methods: {
    toggleEditAndSave() {
      if (this.isEditing) {
        this.updateProfile();
      }
      this.isEditing = !this.isEditing;
    },
    async updateProfile() {
      const credentials = {};
      // Compare current fields with initial user data
      if (this.initialUserData.username !== this.username) {
        credentials.username = this.username;
      }
      if (this.initialUserData.email !== this.email) {
        credentials.email = this.email;
      }
      if (this.initialUserData.phone !== this.phone) {
        credentials.phone = this.phone;
      }
      if (this.initialUserData.password !== this.password) {
        if (!this.isValidPassword(this.password)) {
          this.errMdp = 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, un symbole et un chiffre';
          return;
        }
        credentials.password = this.password;
      }
      if (this.initialUserData.profilePic !== this.profileImage) {
        credentials.profilePic = this.profileImage;
      }
      
      if (_.isEmpty(credentials)) {
        console.log('No changes detected');
        return;
      } else {
        try {
          credentials.userid = this.userid
          await modifUser(credentials);
          this.initialUserData = { ...credentials }; // Update initial data
          this.isEditing = false;
          location.reload();
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    },
    async linkAccount(provider) {
      try {
        // Call backend API to initiate account linking
        await linkSocialMediaAccount(provider);
        
      } catch (error) {
        console.error('Error linking account:', error);
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
  },
};
</script>
<style scoped>
.form-control:focus {
    box-shadow: none;
    border-color: #582b00
}

.profile-button {
    background: #582b00;
    color: aliceblue;
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #694625;
    color: aliceblue;
}

.profile-button:focus {
    background: #582b00;
    box-shadow: none
}

.profile-button:active {
    background: #582b00;
    box-shadow: none
}



.labels {
    font-size: 15px
}

</style>