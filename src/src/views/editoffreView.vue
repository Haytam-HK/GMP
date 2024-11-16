<script  >
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
   axios.get(URL.URL+'offre/'+id)
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
     
        axios.put( this.URL.URL+'offre/'+id, this.item);
          this.success =true;
          this.eror=false;
          this.num = this.item.num;
           this.getItem();
         
     
      
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
  .btn-light{
	float: right;
	margin: 30px;
	background-color: #c5e8ef;
  }
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input">Modifier une offre</h2>

	 
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    Cette offre est modifiée avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  Cette offre n'est pas  Modifé  essaye une autre fois
</div>
   <form @submit.prevent="updateItem">
     <div class="row">
<div class="col-sm">
<label>Num</label>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num"  v-model="item.num" required="">
</div>
<div class="col-sm">
<label>caution</label>
<input type="number" step="0.01" class="form-control" aria-describedby="emailHelp" name="caution"  v-model="item.caution" required="">
</div>
</div>
<div class="row">
<div class="col-sm">
<label>estimation</label>
<input type="number" step="0.01" class="form-control" aria-describedby="emailHelp" name="estimation"  v-model="item.estimation" required="">
</div>
<div class="col-sm">
<label>objet en fancais</label>
 <textarea  class="form-control" aria-describedby="emailHelp" name="objet" v-model="item.objet"   required=""></textarea>
</div>
</div>
<div class="row">

<div class="col-sm">
<label>objet en arabe</label>
<textarea  class="form-control" aria-describedby="emailHelp" name="objet_ar" v-model="item.objet_ar" required=""></textarea>

</div>
<div class="col-sm">
 <button class="btn btn-light">Modifier l'offre</button> 
 
</div>
</div>
 
 </form>

</center>
		</div> 	
		
</template>
