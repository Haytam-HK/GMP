

<script  >
import SideBare from '../components/SideBare.vue';
import axios from 'axios'
import  URL from './config.js';
export default {
     data() {
      return {
       offres :null,
       search:'',
		orderNumber:1 
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchOffres();
    
   
  },
  methods: {
    fetchOffres() {
      if(this.search==''){
       axios.get(URL.URL+'offre')
        .then((response) => response)
        .then((data) => {
       return   this.offres = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offres:', error);
        });
      }
      else{
        
        axios.get(URL.URL+'offre/search?q='+this.search)
        .then((response) => response)
        .then((data) => {
       return   this.offres = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offres:', error);
        });
       
     }
    
   },   
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'offre/' + id)
          .then(() => {
            this.fetchOffres();  
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
   <h2 class="form-label" for="datatable-search-input">Liste Des Offres</h2>

	<h3>	 
		<router-link :to="{name: 'ajouteroffre'}"   class="btn btn-light">Ajouter une offre
			<i class="fa-solid fa-bullseye"></i> 
    </router-link></h3>
<center>   

  <br>
  <br>
  <br>
	 

  <div class="container"> 
    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchOffres()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control" id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchOffres()"><i class="fa-solid fa-search"></i></a>
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
	<th>Num</th>
	<th>Estimation</th>
	<th>Caution</th>
	<th>Objet en francais</th>
	<th>Objet en arabe</th>
	<th>Actions</th>
  </tr>
</thead>
<!--Table head-->
 <!--Table body-->
<tbody    >
 	<tr v-for="(item) in offres" :key="item.id"  >  
 
		 
		   <td>{{ item.num }}</td>
		   <td>{{ item.estimation }}</td>

          <td>{{ item.caution }}</td>
          <td>{{ item.objet }}</td>
          <td>{{ item.objet_ar }}</td>
          
        
	 
	<td>
  <!-- <router-link :to="{ path: '/editoffre', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editoffre',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.id)"><i class="fa-solid fa-trash"></i></a>
    &nbsp <router-link :to="{path: 'editoffre/'+item.id}">
          <i class="fa-solid fa-pen"></i>
        </router-link>
  </td>
  </tr> 
</tbody>
<!--Table body-->


</table>
 

</center>
		</div> 	
		
</template>


