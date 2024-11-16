<script  >
import SideBare from '../components/SideBare.vue';
import axios from 'axios'
import  URL from './config.js';
export default {
     data() {
      return {
       juries :null,
       search:''
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchjuries();
    
   
  },
  methods: {
    fetchjuries() {
      if(this.search==''){
       axios.get(URL.URL+'jury')
        .then((response) => response)
        .then((data) => {
       return   this.juries = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des juries:', error);
        });
      }
      else{
        
        axios.get(URL.URL+'jury/search?q='+this.search)
        .then((response) => response)
        .then((data) => {
       return   this.juries = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des juries:', error);
        });
       
     }
    
   },
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'jury/' + id)
          .then(() => {
            this.fetchjuries();  
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
   <h2 class="form-label" for="datatable-search-input">Liste Des juries</h2>

	<h3>	 
		<router-link :to="{name: 'ajouterjurie'}"   class="btn btn-light">Ajouter Un jurie 
			<i class="fa-solid fa-users"></i>

    </router-link></h3>
<center>   

  <br>
  <br>
  <br>
	 

  <div class="container"> 
    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchjuries()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control" id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchjuries()"><i class="fa-solid fa-search"></i></a>
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
	<th>	Profession</th>
	<th>Qualiter</th> 
	<th>Actions</th>
  </tr>
</thead>
<!--Table head-->
 <!--Table body-->
<tbody    >
	<tr v-for="(item) in juries" :key="item.id"  >  
 
		 
		   <td>{{ item.nom }}</td>
		   <td>{{ item.profession }}</td>

          <td>{{ item.qualiter }}</td>  
	<td>
  <!-- <router-link :to="{ path: '/editjurie', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editjurie',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.id)"><i class="fa-solid fa-trash"></i></a>
     &nbsp <router-link :to="{path: 'editjury/'+item.id}">
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
