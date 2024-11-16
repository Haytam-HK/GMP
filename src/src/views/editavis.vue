<script>
import SideBare from '../components/SideBare.vue';
import axios from 'axios';
import URL from './config.js';

export default {
  data() {
    return {
      item: {},
      success: false,
      error: false,
      URL: URL,
    };
  },
  components: {
    SideBare,
  },
  mounted() {
    this.getItem();
  },
  methods: {
    getItem() {
      let id = this.$route.params.id;
      axios
        .get(URL.URL + 'avis/' + id)
        .then((response) => response)
        .then((data) => {
          this.item = data.data;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'élément :', error);
        });
    },
    updateItem() {
      let id = this.$route.params.id;

      axios
        .put(this.URL.URL + 'avis/' + id, this.item)
        .then((response) => {
          this.success = true;
          this.error = false;
          this.getItem();
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour de l\'élément :', error);
          this.success = false;
          this.error = true;
        });
    },
    cancelEdit() {
      // Rediriger vers la page précédente ou une autre page après l'annulation de la modification
      this.$router.go(-1);
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
  /* .btn-light{
	float: right;
	margin: 30px;
	background-color: #c5e8ef;
  } */
   
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input">AModifier une avi</h2>

 <center>   
   <div class="alert alert-success" role="alert" v-if="success">
   Cet avis est modifié avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
 {{this.avisnumAjoute}} n'est pas modifié essaye une autre fois
</div> 
   <form @submit.prevent="updateItem"  >
    <div class="container">
        <div class="row">

       
        <div class="col">


  
<div class="row">
<div class="col">
<label>NUM d'avis</label>
<input type="text" class="form-control" aria-describedby="emailHelp" name="estimation"  v-model="item.num_avis" required="">
</div>
</div>
<div class="row">
<div class="col">
<label>date d'avis</label>
<input type="date"        @input="handleDateInput"  class="form-control"
     aria-describedby="emailHelp" name="estimation"   required="">
</div>
</div>
<div class="row"> 
<div class="col">
<label>date d'ouverture</label> 
<input type="date" class="form-control" aria-describedby="emailHelp" name="estimation"  required="" v-model="this.dater
"  @input="handleDateoverturInput">

</div>
 </div>
 <div class="row"> 
<div class="col">
<label>heure d'ouverture</label> 
<input type="time" class="form-control" aria-describedby="emailHelp" name="estimation"  v-model="item.heure" required="">

</div>
 </div>

 
</div>
<div class="col"> 
     <div class="container"> 

    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchOffres()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control"   id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchOffres()"><i class="fa-solid fa-search"></i></a>
</span>
  </div>
</div>
  
 </div>
  
   
 </div>
 </div>
 <div class="row"  > 
<div class="col">
 <label>NUM d'offres</label>
</div>
  
</div>
<div class="row" v-for="(element) in offres" :key="element.id" > 
<div class="col">
    <input type="checkbox"   @change="handleCheckboxChange"        v-model="selectedItems" :id="element.id " :value="element.id">
 </div>
<div class="col">

<label :for="element.id">{{ element.num }}</label>

 </div>
</div>

</div>
</div>
<div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Ajouter Un avis</button> 

</div>
</div>
    </div>
 </form>

</center>
		</div> 	
		
</template>
