// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  FacebookAuthProvider, 
  TwitterAuthProvider, 
  linkWithPopup,
  signOut,
} 
from "firebase/auth";
import Api from './Api'

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjusymUoH41KIgoEjBlGRIkx2MGfatM6Y",
  authDomain: "testapi-f1757.firebaseapp.com",
  projectId: "testapi-f1757",
  storageBucket: "testapi-f1757.appspot.com",
  messagingSenderId: "579154118235",
  appId: "1:579154118235:web:31aa1f0936547d316ce17e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signin = async (credentials) => {
  return Api().post('signin', credentials)
}

const signup = async (credentials) => {
return Api().post('signup', credentials)
}

const signout = async () => {
return Api().get('signout')
}

const signInWithFacebook = async () => {
    const facebookProvider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      const response = Api().post('FBsignin', result)
      return response
    } catch (error) {
      console.error(error)
    }
};

const signUpWithFacebook = async () => {
    const facebookProvider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const response = Api().post('FBsignup', result)
      return response
    } catch (error) {
      console.error(error);
    }
};

const signInWithTwitter = async () => {
    const twitterProvider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, twitterProvider)
      const response = Api().post('Xsignin', result)
      return response
    } catch (error) {
      console.error(error)
    }
};

const signUpWithTwitter = async () => {
    const twitterProvider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      const response = Api().post('Xsignup', result)
      return response
    } catch (error) {
      console.error(error);
    }
};

const recoverPassword = (email) => {
  try{
    return Api().post('recover-password', { email });
  } catch (error) {
    console.error(error);
  }
};

const resetPassword = (token, password) => {
  try{
    return Api().post('reset-password', { token, password });
  } catch (error) {
    console.error(error);
  }
};

const linkSocialMediaAccount = async (provider) => {
  try {
    // Get the currently signed-in user from Firebase Authentication
    
    
    // Check if a user is signed in
    
      // Initialize provider based on the selected social media provider
      let firebaseProvider;
      if (provider === 'facebook.com') {
        firebaseProvider = new FacebookAuthProvider();
      } else if (provider === 'twitter.com') {
        firebaseProvider = new TwitterAuthProvider();
      } else {
        throw new Error('Unsupported provider');
      }

      // Sign in with the selected provider and link the account
      const result = await signInWithPopup(auth, firebaseProvider);
      // Send the data to the backend
      const response = Api().post('LinkAcc', result);
      return response
      // Account linking successful

  } catch (error) {
    console.error('Error linking account:', error);
    throw error; // Propagate error to the caller
  }
};

const fetchUser = async () => {
  return Api().get('fetchUser')
}

const getUserRole = async () => {
  return Api().get('getUserRole')
}

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('Signed out successfully'); // Optional logging
    // Handle successful signout (e.g., redirect to login page)
  } catch (error) {
    console.error('Error signing out:', error);
    // Handle signout errors (e.g., display error message)
  }
};

export { 
  signin,signup,
  signInWithFacebook, signUpWithFacebook,
  signInWithTwitter, signUpWithTwitter,
  recoverPassword, resetPassword,
  linkSocialMediaAccount,
  fetchUser,
  getUserRole,
  signout,
  signOutUser,
};