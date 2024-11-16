<script  >
import SideBare from '../components/SideBare.vue';
import axios from 'axios'
import  URL from './config.js';
export default {
     data() {
      return {
       users :null,
       search:'',
		orderNumber:1 
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchusers();
    
   
  },
  created(){
    this.cheacking();
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
  cheacking(){
    const cookieValue = this.getCookie('myCookie');
if (cookieValue != null) {
if (cookieValue != "Administrateur") {
  this.$router.push({ path: "/" });

} 
  console.log(cookieValue);
} else {
    this.$router.push({ path: "/" });
 
} 
  },

    fetchusers() {
      if(this.search==''){
       axios.get(URL.URL+'user')
        .then((response) => response)
        .then((data) => {
       return   this.users = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des users:', error);
        });
      }
      else{
        
        axios.get(URL.URL+'user/search?q='+this.search)
        .then((response) => response)
        .then((data) => {
       return   this.users = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des users:', error);
        });
       
     }
    
   },   
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'user/' + id)
          .then(() => {
            this.fetchusers();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
          });
      }
    }, 
    },


 
 
};
</script>
<style>
 #table{
	width: 100%;
 }
  #body-pd{
	padding-top: 100px;
  }
  .link-secondary{
    padding-left: 4%;

  }
  .btn-light{
	float: right;
	margin: 30px;
	background-color: #c5e8ef;
  }
     
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input">Liste Des utilisateurs</h2>

	<h3>	 
		<router-link :to="{name: 'ajouteruser'}"   class="btn btn-light">Ajouter Un utilisateur 
			<i class="fa-solid fa-users"></i>

    </router-link></h3>
<center>   

  <br>
  <br>
  <br>
	 

  <div class="container"> 
    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchusers()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control" id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchusers()"><i class="fa-solid fa-search"></i></a>
</span>
  </div>
</div>
  
 </div>
  
   
 </div>
 </div>
	
<!--Table--> 
<table class="table table-striped " id="table"  >

<!--Table head-->
<thead>
  <tr> 
	<th>Nom</th>
	<th>	Email</th>
	<th>role</th> 
	<th>Actions</th> 	 	
  </tr>
</thead>
<!--Table head-->
 <!--Table body-->
<tbody    >
	<tr v-for="(item) in users" :key="item.id"  >  
 
		 
		   <td>{{ item.name }}</td>
		   <td>{{ item.email }}</td>

          <td>{{ item.role }}</td>  
	<td>
  <!-- <router-link :to="{ path: '/edituser', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/edituser',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.id)"><i class="fa-solid fa-trash"></i></a>
	</td>
  </tr> 
</tbody>
<!--Table body-->


</table>
 

</center>
		</div> 	
		
</template>
