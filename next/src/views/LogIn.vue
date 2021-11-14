<template>
<div>
  <video-background claass="videoheight"
      :src="require(`@/assets/KobeBryantMix_C.mp4`)"
      style="height: 100vh; max-height: calc(100vh - 154px)"
      overlay="linear-gradient(45deg,#2a4ae430,#000000)" 
  >
    <div class="container max-w-md mx-auto">
      
      <!-- LOG IN -->
      <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 my-auto mx-6">
        <form @submit.prevent="handleSubmit">
          <!-- LOGIN DETAILS -->
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="email">
              EMAIL
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name ="email" id="email" v-model="getEmail" type="text"  placeholder="Email">
          </div>
          <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="password">
              PASSWORD
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" name ="password" id="password"  v-model="getPassword" type="password" placeholder="Password">
            <div class="text-gray-400 text-right">
              <router-link class="forgot-password" :to="{name: 'ForgotPassword'}">
              Forgot Password?</router-link>
            </div>
          </div>
          
          <!-- SIGN IN BUTTON -->
          <div class="items-center justify-between text-center mb-4">
            <button @click="Login" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full" >
              LOG IN
            </button>

            <div class="error text-center text-red-500 mb-2 mt-2" v-if="error">{{this.errorMsg}}</div>
          </div>

          <!-- SIGN UP LINK -->
          <div class="text-center text-white">
            <router-link :to="{name: 'SignUp'}">
            Don't have an account? <span class="text-yellow-500">Sign up</span></router-link>
          </div>

        </form>
      </div>
      <!-- END OF LOG IN -->

    </div>
  </video-background>
</div>
</template>


<script>
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { useRouter } from 'vue-router'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { useRouter } from 'vue-router'
import firebase from 'firebase/compat/app';
import VideoBackground from 'vue-responsive-video-background-player'

export default {
  name: 'LogIn',
  components:{
    VideoBackground,
  },
  data(){
    return{
      errorMsg: "",
      error: null,
      getEmail: "",
      getPassword: "",
    }
  },
  // setup() {
  //   const auth = getAuth()
  //   const router = useRouter()
  // },

  //   const handleSubmit = async e => {
  //     const { email, password } = e.target.elements
  //     try {
  //       await signInWithEmailAndPassword(auth, email.value, password.value)
  //       router.push('/')
  //     } catch (e) {
  //       this.error = true;
  //       this.errorMsg = e.message
  //     }
  //   }

  //   return { handleSubmit }
  // },

  methods: {

    Login(){
      // const auth = getAuth()
      // const router = useRouter()
      firebase
        .auth()
        .signInWithEmailAndPassword(this.getEmail, this.getPassword)
        .then(()=>{
          this.$router.replace({name: "Home"});
          this.error = false
          this.errorMsg = ""

        })
        .catch((err)=>{
          this.error = true
          console.log(err.message);
          if (err.message == "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
            this.errorMsg = "Password is invalid"
          }
          else if (err.message == "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
            this.errorMsg = "User does not have an account"
          }
          else if (err.message == "Firebase: The email address is badly formatted. (auth/invalid-email)."){
            this.errorMsg = "Email is invalid"
          }
          else if (err.message == "Firebase: An internal AuthError has occurred. (auth/internal-error)."){
            this.errorMsg = "Password is invalid"
          }
        })
      
    }

  }
}
</script>

