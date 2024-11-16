<script>
import SideBare from '../components/SideBare.vue';
import axios from 'axios';
import URL from './config.js'
export default {
  data() {
    return {
      item: '',
       num:'',
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
   axios.get(URL.URL+'user/'+id)
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
     
        axios.put( this.URL.URL+'user/'+id, this.item);
           this.getItem();
          this.success =true;
          this.eror=false;
          this.num= this.item.name;
         
     
      
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
   <h2 class="form-label" for="datatable-search-input">Modifier un utilisateur</h2>

	 <!-- {{ this.item }} -->
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    {{this.num}} est modifié avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{this.num}} n'est pas  modifié  essaye une autre fois
</div> 
  <form @submit.prevent="updateItem" id="FORM">
    
    <div class="row">
<div class="col">
<label>Nom</label>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.name" required="">
</div>
 
</div>
<div class="row">
<div class="col">
<label>email</label>
<input type="text" class="form-control" aria-describedby="emailHelp" name="estimation"  v-model="item.email" required="">
</div>
</div>
<div class="row">
<div class="col">
<label>Mot de passe</label>
<input type="password" class="form-control" aria-describedby="emailHelp" name="estimation"  v-model="item.password" required="">
</div>
</div>
<div class="row"> 
<div class="col">
<label>role</label> 
<select class="form-control"   v-model="item.role" required="">
  <option>Membre</option>
  <option>Administrateur</option>
</select>
</div>
 </div><div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Modifeir l'utilisateur</button> 

</div>
</div>
 
 
 </form>

</center>
		</div> 	
		
</template>
