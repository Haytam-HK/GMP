<template lang="">
    <header class="header" id="header">
         <div class="header_toggle"  id="header-toggle"> <i class="fa-solid fa-bars"></i> </div>
         <div class="header_img"  @click="this.logout()">                          <i class="fa-solid fa-right-from-bracket"></i>
 </div>
     </header>
     <div class="l-navbar" id="nav-bar">
         <nav class="nav" id="nav" >
             <div>
                  <a href="#" class="nav_logo"> <i class="fa-solid fa-building-user"></i><span class="nav_logo-name">GESTION DES <br>OFFRES</span> </a>
 
 
 
                 <div class="nav_list">
                     <router-link :to="{name: 'offres'}" class="nav_link  ">
                      <i class="fa-solid fa-bullseye"></i>
                      offres
                     </router-link>
                     <router-link :to="{name: 'avis'}" class="nav_link  ">
                       <i class="fa-solid fa-diagram-project"></i>
                      avis
                     </router-link> 
                     <router-link :to="{name: 'decision'}" class="nav_link  ">
                         <i class="fa-solid fa-d"></i>
                       
                      decision
                     </router-link>
                     <router-link :to="{name: 'CPS'}" class="nav_link  ">
                         <i class="fa-solid fa-book"></i>
                       CPS
                     </router-link> 
                     <router-link :to="{name: 'reglement'}" class="nav_link  ">
                         <i class="fa-solid fa-d"></i>
 
                       réglement
                     </router-link> 
                     <router-link :to="{name: 'concurents'}" class="nav_link  ">
                         <i class="fa-solid fa-ruler"></i>
 
                          Concurents
                     </router-link>
 <!-- 
                     <router-link :to="{name: 'Convocation'}" class="nav_link  ">
                         <i class="fa-solid fa-ticket"></i>
                         Convocation
                     </router-link> -->
                     <router-link :to="{name: 'jury'}" class="nav_link  ">
                         <i class="fa-solid fa-gavel"></i>
 
                         jury
                     </router-link>
                     <router-link :to="{name: 'journaux'}" class="nav_link  ">
                         <i class="fa-solid fa-j"></i>
 
                         Journaux
                     </router-link>
                     <router-link :to="{name: 'user'}" class="nav_link  " v-if="isAdmin"   >
                         <i class="fa-solid fa-users"></i>
  
 
                         utilisateurs
                     </router-link>
                     <router-link :to="{name: 'processverbal'}" class="nav_link  ">
                         <i class="fa-solid fa-microchip"></i>
                         processe verbale
                     </router-link>
                     <router-link :to="{name: 'etatenaement'}" class="nav_link  ">
                         <i class="fa-solid fa-e"></i>
                        Etat d'engagement
                     </router-link>
                       
                  
                     
                 </div>
             </div>    </nav>
     </div>
     
 </template>
  
 <style  >
  #header{
     position: fixed;
   } 
 
     
 </style>
  
 <script  > 
   import '../assets/main.css'
 import '../assets/css/style.css'
 import '../assets/js/jquery.min.js'
  import '../assets/js/script.js'
 import '../assets/js/bootstrap.min.js'
 import '../assets/js/main.js' 
 export default {
    date(){
 return {
     isAdmin:false
 }
    },
  created(){ 
     
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
   
 ,        logout(){
     document.cookie = `myCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
 this.cheacking();
   },
   cheacking(){
     const cookieValue = this.getCookie('myCookie');
 if (cookieValue != null) {
 if (cookieValue == "Administrateur") {
     this.isAdmin=true;
 
 }
   console.log(cookieValue);
 } else {
     this.$router.push({ path: "/" });
  
 } 
   }
     
    },
  
   
   
  
   
 
 
  
  
 };
 </script>