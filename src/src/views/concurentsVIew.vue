<script  >
import SideBare from '../components/SideBare.vue';
import axios from 'axios'
import  URL from './config.js';
export default {
     data() {
      return {
       concurent_list :null,
       search:'',
		orderNumber:1 
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchconcurent_list();
    
   
  },
  methods: {
    roadto(id){
       let path ="editerconcurent_list/"+id;
      this.$router.push({ path:path});
    
    },
    fetchconcurent_list() {
      if(this.search==''){
       axios.get(URL.URL+'concurent_list')
        .then((response) => response)
        .then((data) => {
       return   this.concurent_list = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des concurent_list:', error);
        });
      }
      else{
        
        axios.get(URL.URL+'concurent_list/search?q='+this.search)
        .then((response) => response)
        .then((data) => {
       return   this.concurent_list = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des concurent_list:', error);
        });
       
     }
    
   },   
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'concurent_list/' + id)
          .then(() => {
            this.fetchconcurent_list();  
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
   <h2 class="form-label" for="datatable-search-input">Liste Des concurents</h2>

	<h3>	 
		<router-link :to="{name: 'ajouterconcurent_list'}"   class="btn btn-light">Ajouter Un concurent 
            <i class="fa-solid fa-user-plus"></i>

    </router-link></h3>
<center>   

  <br>
  <br>
  <br>
	 

  <div class="container"> 
    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchconcurent_list()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control" id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchconcurent_list()"><i class="fa-solid fa-search"></i></a>
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
	<th>nom</th>
	<th>capital social</th>
	<th>	banque</th>
	<th>nom gerant</th> 
	<th>num cnss</th> 	
	<th> qualiter</th> 	
	<th>registre</th> 	
	<th>rib</th> 	
	<th>Actions</th> 	
    				
 	
  </tr>
</thead>
<!-- {{ this.item }} -->
<!--Table head-->
 <!--Table body-->
<tbody    >
	<tr v-for="(item) in concurent_list" :key="item.id"  >  
 
		 
		   <td>{{ item.nom }}</td> 
		   <td>{{ item.capital_social }}</td> 
		   <td>{{ item.banque }}</td> 
		   <td>{{ item.nom_gerant }}</td> 
		   <td>{{ item.num_cnss }}</td> 
		   <td>{{ item.qualiter }}</td> 
		   <td>{{ item.registre }}</td> 
		   <td>{{ item.rib }}</td> 
	<td>
  <!-- <router-link :to="{ path: '/editconcurent_list', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editconcurent_list',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.id)"><i class="fa-solid fa-trash"></i></a>
&nbsp <router-link :to="{path: 'editerconcurent_list/'+item.id}">
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
