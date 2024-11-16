<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
      item: {
        caution: '',
        estimation: '',
        objet: '',
        objet_ar: '',
        num: '',  
       },
       num:'',
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
      axios.post( this.URL.URL+'offre', this.item)
        .then(response => { 
 
          this.success =true;
          this.eror=false;
          this.num = this.item.num;
           this.item.objet = '';
           this.item.num = '';
           this.item.caution = '';
           this.item.estimation = '';
           this.item.objet_ar = '';
         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.success =false;
          this.num = this.item.num;


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
  .btn-light{
	float: right;
	margin: 30px;
	background-color: #c5e8ef;
  }
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input">Ajouter une Offre</h2>

	 
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    {{ this.num }} est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{ this.num }} n'est pas  ajouté  essaye une autre fois
</div>
<!-- {{ this.item }} -->
  <form @submit.prevent="addItem">
    <!-- {{ this.item }} -->
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
<label>objet arabe</label>
<textarea  class="form-control" aria-describedby="emailHelp" name="objet_ar" v-model="item.objet_ar" required=""></textarea>

</div>
<div class="col-sm">
 <button   class="btn btn-light">Ajouter Un offre</button> 
 
</div>
</div>
 
 </form>

</center>
		</div> 	
		
</template>
