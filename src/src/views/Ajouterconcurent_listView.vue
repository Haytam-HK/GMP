<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
      nomAjoute:null,
      item:{
        capital_social: null,
        banque: null,
        num_cnss: null,
        registre: null,
        qualiter: null,
        rib: null,
        nom: null,
       },
       URL:URL,
       success:false,
       eror:false,
    };
  },
  components:{
    SideBare,
  },
  methods: {
    addItem() {
      axios.post( this.URL.URL+'concurent_list', this.item)
        .then(response => { 
 
          this.success =true;
          this.eror=false;
          this.nomAjoute=this.item.nom;
          
        this.item.capital_social= null;
        this.item.banque= null;
        this.item.num_cnss= null;
        this.item.registre= null;
        this.item.qualiter= null;
        this.item.rib= null;
        this.item.nom= null;
      

         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.nomAjoute=this.item.nom;
          this.success =false;


        });
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
   <h2 class="form-label" for="datatable-search-input">Ajouter un concurent</h2>

	 
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    {{ this.nomAjoute }} est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{ this.nomAjoute }} n'est pas  ajouté  essaye une autre fois
</div> 
  <form @submit.prevent="addItem" id="FORM">
    
    <div class="row">
        <div class="col">
<label>Nom</label> 
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.nom" >
</div> 
</div> 
<div class="row">
        <div class="col">
<label>Nom de gerant </label> 
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.nom_gerant" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>capital social </label>
<br>
<input type="number" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.capital_social" >
</div> 
</div>
 
<div class="row">
        <div class="col">
<label>Num cnss </label>
<br>
<input type="number" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.num_cnss" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>banque </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.banque" >
</div> 
</div>


<div class="row">
        <div class="col">
<label>qualiter </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.qualiter" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>registre </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.registre" >
</div> 
</div>
<div class="row">
        <div class="col">
<label>rib </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.rib" >
</div> 
</div>
 
<div class="row"> 
 
 </div><div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Ajouter Un concurent</button> 

</div>
</div>
 
 
 </form>

</center>
		</div> 	
		
</template>
