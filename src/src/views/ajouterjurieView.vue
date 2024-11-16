<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
      nomjury:null,
      item: {
        nom: '',
        profession: '',
        qualiter: '' 
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
      axios.post( this.URL.URL+'jury', this.item)
        .then(response => { 
 
          this.success =true;
          this.eror=false;
          this.nomjury=this.item.nom;
           this.item.nom = '';
           this.item.profession = '';
           this.item.qualiter = ''; 
         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
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
   <h2 class="form-label" for="datatable-search-input">Ajouter un jurys</h2>

	 
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    {{this.nomjury}} est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{this.nomjury}} n'est pas  ajouté(e)  essaye une autre fois
</div> 
  <form @submit.prevent="addItem" id="FORM">
    {{this.item}}
    <div class="row">
<div class="col">
<label>Nom</label>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.nom" required="">
</div>
 
</div>
<div class="row">
<div class="col">
<label>profession</label>
<input type="text" class="form-control" aria-describedby="emailHelp" name="estimation"  v-model="item.profession" required="">
</div>
</div>
<div class="row"> 
<div class="col">
<label>Qualiter</label>
<input type="text" class="form-control" aria-describedby="emailHelp" name="estimation"  v-model="item.qualiter" required="">

</div>
 </div><div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Ajouter Un jury</button> 

</div>
</div>
 
 
 </form>

</center>
		</div> 	
		
</template>
