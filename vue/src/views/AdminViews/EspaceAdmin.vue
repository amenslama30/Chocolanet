<template>
  <Sidebar>
    <h1 class="h3 ms-2 mt-4 mb-0 text-gray-800">Espace Admin</h1>
    <div class="container mt-4">
      
      <!-- Success Alert -->
      <div v-if="alert.show && alert.type === 'success'" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ alert.message }}
        <button type="button" class="btn-close" @click="closeAlert" aria-label="Close"></button>
      </div>
      <!-- Warning Alert -->
      <div v-if="alert.show && alert.type === 'warning'" class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ alert.message }}
        <button type="button" class="btn-close" @click="closeAlert" aria-label="Close"></button>
      </div>
      <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addUserModal">
        Ajouter un utilisateur
      </button>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(user, index) in users" :key="user._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="editUser(user)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-danger" @click="deleteUser(user._id)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add User Form -->
      <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addUserModalLabel">Ajouter un utilisateur</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addUser">
                <div class="mb-3">
                  <label for="new-username" class="form-label">Nom d'utilisateur</label>
                  <input type="text" class="form-control" id="new-username" v-model="newUser.username" required>
                </div>
                <div class="mb-3">
                  <label for="new-email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="new-email" v-model="newUser.email" required>
                </div>
                <div class="mb-3">
                  <label for="new-password" class="form-label">Mot de passe</label>
                  <input type="password" class="form-control" id="new-password" v-model="newUser.password" required>
                  <p class="fs-6 text-danger">{{ errMdp }}</p>
                </div>
                <div class="mb-3">
                  <label for="new-phone" class="form-label">Téléphone</label>
                  <input type="text" class="form-control" id="new-phone" v-model="newUser.phone">
                  <p class="fs-6 text-danger">{{ errPhone }}</p>
                </div>
                <div class="mb-3">
                  <label for="new-role" class="form-label">Rôle</label>
                  <select class="form-control" id="new-role" v-model="newUser.role" required>
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary" :data-bs-dismiss="modalSuccess ? 'modal' : ''">Ajouter</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit User Form -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editUserModalLabel">Modifier utilisateur</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="editingUser">
                <form @submit.prevent="updateUser">
                  <div class="mb-3">
                    <label for="username" class="form-label">Nom d'utilisateur</label>
                    <input type="text" class="form-control" id="username" v-model="editingUser.username" required>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="editingUser.email" required>
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">Téléphone</label>
                    <input type="text" class="form-control" id="phone" v-model="editingUser.phone">
                    <p class="fs-6 text-danger">{{ errPhone }}</p>
                  </div>
                  <div class="mb-3">
                    <label for="role" class="form-label">Role</label>
                    <select class="form-control" id="role" v-model="editingUser.role" required>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-success me-2 w-25" :data-bs-dismiss="modalSuccess ? 'modal' : 'modal'">Confirmer</button>
                  <button type="button" class="btn btn-secondary w-25" data-bs-dismiss="modal">Annuler</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </Sidebar>
</template>


<script>
import Sidebar from "@/components/Sidebar.vue";
import { getUsers, addUser, deleteUser, updateUser } from "@/services/AdminService";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      users: [],
      editingUser: null, // Store the user being edited
      newUser: {
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'user' // Default role
      },
      alert: {
        show: false,
        type: '',
        message: ''
      },
      errPhone: '',
      errMdp: '',
      modalSuccess: false
    };
  },
  async mounted() {
    try {
      const response = await getUsers();
      this.users = response.data; // Assuming response is an object with a 'data' property containing the array of users
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  },
  methods: {
    async addUser() {
      this.errMdp = '';
      this.errPhone = '';
      if (!this.isValidPassword(this.newUser.password)) {
        this.errMdp = 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, un symbole et un chiffre';
        return;
      } else if(this.newUser.phone) {
        if (!this.isValidPhone(this.newUser.phone)) {
          this.errPhone = 'Le numéro de téléphone doit être un nombre';
          return;
        }
      } 
        try {
        const response = await addUser(this.newUser);
        if (response.status === 201) {
          // Clear the form fields
          this.newUser = {
            username: '',
            email: '',
            password: '',
            phone: '',
            role: 'user' // Reset role to default
          };
          this.modalSuccess = true
          this.users = response.data;
          this.showAlert('success', 'Utilisateur ajouté avec succès');
        } else {
          this.showAlert('warning', 'Échec de l\'ajout de l\'utilisateur');
        }
      } catch (error) {
        console.error("Error adding user:", error);
        this.showAlert('warning', 'Échec de l\'ajout de l\'utilisateur');
      }
    },
    async deleteUser(userId) {
      try {
        const response = await deleteUser(userId);
        if (response.status === 200) {
          // Remove the deleted user from the users array
          this.users = this.users.filter(user => user._id !== userId);
          this.showAlert('success', 'User deleted successfully');
        } else {
          this.showAlert('warning', 'Failed to delete user');
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        this.showAlert('warning', 'Failed to delete user');
      }
    },
    editUser(user) {
      // Set the user being edited
      this.editingUser = { ...user };
    },
    async updateUser() {
      this.errPhone = '';
      if(this.editingUser.phone) {
        if (!this.isValidPhone(this.editingUser.phone)) {
          this.errPhone = 'Le numéro de téléphone doit être un nombre';
          return;
        }
      } 
      try {
        const response = await updateUser(this.editingUser._id, this.editingUser);
        if (response.status === 200) {
          // Update the user in the users array
          const index = this.users.findIndex(user => user._id === this.editingUser._id);
          if (index !== -1) {
            this.users.splice(index, 1, response.data);
            this.users = response.data;
          }
          this.modalSuccess = true
          this.showAlert('success', 'User updated successfully');
          // Clear the editing user
          this.editingUser = null;
        } else {
          this.showAlert('warning', 'Failed to update user');
        }
      } catch (error) {
        console.error("Error updating user:", error);
        this.showAlert('warning', 'Failed to update user');
      }
    },
    isValidPhone(phone) {
      // Check if phone is a number
      return /^\d+$/.test(phone);
    },
    isValidPassword(password) {
      // Check if password contains at least 8 characters with at least one uppercase letter, one symbol, and one number
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
      return passwordRegex.test(password);
    },
    cancelEdit() {
      // Clear the editing user
      this.editingUser = null;
    },
    showAlert(type, message) {
      this.alert.type = type;
      this.alert.message = message;
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    },
    closeAlert() {
      this.alert.show = false;
      this.modalSuccess = false
    }
  },
};
</script>

