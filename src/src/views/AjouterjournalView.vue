<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
      item: {
        nome_journale: ''
       },
       URL:URL,
       success:false,
       eror:false,
       journalajoute:'',
    };
  },
  components:{
    SideBare,
  },
  methods: {
    addItem() {
      axios.post( this.URL.URL+'journales_list', this.item)
        .then(response => { 
 
          this.success =true;
          this.eror=false;
          this.journalajoute=this.item.nome_journale
           this.item.nome_journale= ''; 
         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.success =false;
          this.journalajoute=this.item.nome_journale


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
   <h2 class="form-label" for="datatable-search-input">Ajouter un Journal</h2>

	 
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    {{   this.journalajoute }}  est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{   this.journalajoute }}  n'est pas  ajouté  essaye une autre fois
</div> 
  <form @submit.prevent="addItem" id="FORM">
    
    <div class="row">
<div class="col">
<label>Nom du journal </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.nome_journale" required="">
</div>
 
</div>
 
<div class="row"> 
 
 </div><div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Ajouter Un Journal</button> 

</div>
</div>
 
 
 </form>

</center>
		</div> 	
		
</template>
