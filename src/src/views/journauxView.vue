<script  >
import SideBare from '../components/SideBare.vue';
import axios from 'axios'
import  URL from './config.js';
export default {
     data() {
      return {
       journaux :null,
       search:''
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchjournaux();
    
   
  },
  methods: {
    fetchjournaux() {
      if(this.search==''){
       axios.get(URL.URL+'journales_list')
        .then((response) => response)
        .then((data) => {
       return   this.journaux = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des journaux:', error);
        });
      }
      else{
        
        axios.get(URL.URL+'journales_list/search?q='+this.search)
        .then((response) => response)
        .then((data) => {
       return   this.journaux = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des journaux:', error);
        });
       
     }
    
   },
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'journales_list/' + id)
          .then(() => {
            this.fetchjournaux();  
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
   <h2 class="form-label" for="datatable-search-input">Liste Des journaux</h2>

	<h3>	 
		<router-link :to="{name: 'ajouterjournal'}"   class="btn btn-light">Ajouter Un journal 
      <i class="fa-solid fa-newspaper"></i> 
    </router-link></h3>
<center>   

  <br>
  <br>
  <br>
	 

  <div class="container"> 
    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchjournaux()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control" id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchjournaux()"><i class="fa-solid fa-search"></i></a>
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
	<th>Nom du Journal</th> 
  </tr>
</thead>
<!--Table head-->
 <!--Table body-->
<tbody    >
	<tr v-for="(item) in journaux" :key="item.id"  >  
 
		 
		   <td>{{ item.nome_journale }}</td>  
	<td>
  <!-- <router-link :to="{ path: '/editjurie', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editjurie',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.id)"><i class="fa-solid fa-trash"></i></a>
     <router-link :to="{path: 'editjournal/'+item.id}">
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
