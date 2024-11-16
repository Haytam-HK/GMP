<script  >
import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
      item: '',
       nom:'',
       URL:URL,
       success:false,
       eror:false,
    };
  },
  components:{
    SideBare,
  },
  mounted() {
    this.getItem()
  },
  methods: {
    getItem(){
  let id = this.$route.params.id;
   axios.get(URL.URL+'concurent_list/'+id)
        .then((response) => response)
        .then((data) => {
       return   this.item = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offres:', error);
        });
    },
   updateItem() {
  let id = this.$route.params.id;
     
        axios.put( this.URL.URL+'concurent_list/'+id, this.item);
           this.getItem();
          this.success =true;
          this.eror=false;
          this.nom = this.item.nom;
         
     
      
    }
  }
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
  #FORM{
    /* float: right; */
    /* margin-left: 20%; */
    width: 50%;
  }
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input">Modifier une concurent</h2>
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    {{this.nom}} est modifié avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{this.nom}} n'est pas modifié essaye une autre fois
</div> 
  <form @submit.prevent="updateItem" id="FORM">
    <div class="row">
        <div class="col">
<label>Nom</label> 
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.nom" >
</div> 
</div> 
<div class="row">
        <div class="col">
<label>Nom de gerant </label> 
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.nom_gerant" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>capital social </label>
<br>
<input type="number" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.capital_social" >
</div> 
</div>
 
<div class="row">
        <div class="col">
<label>Num cnss </label>
<br>
<input type="number" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.num_cnss" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>banque </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.banque" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>qualiter </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.qualiter" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>registre </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.registre" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>rib </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="this.item.rib" >
</div> 
</div>
 
<div class="row"> 
 
 </div><div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Modifier une concurent</button> 

</div>
</div>
 
 
 </form>

</center>
		</div> 	
		
</template>
