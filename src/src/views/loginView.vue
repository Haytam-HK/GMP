<template>
 <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="logo.jpeg" id="logo"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form @submit.prevent="loginfun">
     

          <div class="alert alert-danger" role="alert"  v-if="eror">
 Email ou mot de passe eroné
</div> 

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="    email "  v-model="this.login.email" required=""/>
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="  mot de passe" v-model="this.login.password" required="" />
            <label class="form-label" for="form3Example4">Mot de passe</label>
          </div>
 

          <div class="text-center text-lg-start mt-4 pt-2">
            <button   class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Se conecter</button>
          
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
</template>
<style>
#logo{
  padding: 10%;
  width: 100%;
}
</style>
<script  > 
import axios from 'axios'
import  URL from './config.js';
export default {
     data() {
      return {
        login : {
            email:"",
            password:""
        },
        user:null,
        eror:false,
        URL:URL
      }
    }, 
 
 
  methods: {
    setCookie(name, value, daysToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
},
getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;  
}
  
,      
  loginfun(){
    if(this.login.email!=null && this.login.password!=null){
    axios.post( this.URL.URL+'login', this.login)
        .then(response => { 
        this.user =response.data;
if(this.user!=null){
 this.setCookie("myCookie", this.user.role, 1);
 
 const cookieValue = this.getCookie('myCookie');
if (cookieValue != null) {
           this.$router.push({ name: "offres" });
  console.log(cookieValue);
} else {
  // Cookie not found
  console.log("Cookie not found!");
}

}
         })
        .catch(error => { 
          this.eror=true
          console.error(  error);
        //   this.eror=true;
        //   this.success =false;


        });
  }
}
   },
 
  
  
 
  


 
 
};
</script>