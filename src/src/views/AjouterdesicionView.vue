<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
        juries:'',
       search:'',
         avis:'',
       searchavis:'',
       success:false,
       eror:false,
       URL:URL,
       convertedData:'',
       index:0,
       dater:'',
       selectedItems: [],
       selectedOption:'',
       selectedItemsavis: [],
       selectedItemsJSON:{},
       item :{  
        avis:'',
        jury:''
       }
    };
  },
  components:{
    SideBare,
  },
   
  mounted() { 
    this.fetchjuries(); 
    this.fetchavis();
  },
  methods: {
  
   
    addItem() {
       
  
      this.convertedData  = this.item.jury.map((juryObj) => {
  return { "avis": this.item.avis, "jury": juryObj };
});
 
for (let a = 0; a < this.convertedData.length; a++) {
  
  axios.post( this.URL.URL+'decisions', this.convertedData[a])
        .then(response => { 
 
          this.success =true;
          this.eror=false;
           this.item.avis = ''; 
           this.item.jury = ''; 
           this.$router.push({ name: "decision" });

           
         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.success =false;


        });  
}
     },
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
     fetchavis() {
      if(this.searchavis==''){
        axios.get(URL.URL+'avis')
        .then((response) => response)
        .then((data) => {
       return   this.avis = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des avis:', error);
        });
      }
      else{
        
        axios.get(URL.URL+'avis/search?q='+this.searchavis)
        .then((response) => response)
        .then((data) => {
       return   this.avis = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des avis:', error);
        });
       
     }
    
   },  
   handleCheckboxChange() {
         this.selectedItemsJSON = JSON.stringify(
        this.selectedItems.map((item) => {
          return { id: item };
          
        })
      );
      this.item.jury=  JSON.parse(this.selectedItemsJSON );
    //   alert(JSON.parse(this.selectedItemsJSON ))

    //   addItem();
    //   this.item.jury='';
    //   this.selectedItemsJSON='';        
    },
    handleradioChangeavis() {
        const selectedOptionObj = { id: this.selectedOption };
       this.item.avis = selectedOptionObj;
        
    },
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
   
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input">Ajouter un avi</h2>

 <center>   
   <div class="alert alert-success" role="alert" v-if="success">
    {{ this.desicion }} est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{}} n'est pas  ajouté  essaye une autre fois
</div> 
   <form @submit.prevent="addItem"  >
    <div class="container">
        <div class="row">

 <div class="col">
    <div class="container"> 

<div class="row">
<div class="col-8" >
<!-- <a  href="#" class="link-secondary"  @click="fetchdecisions()"><i class="fa-solid fa-search"></i></a> -->
     <div class="input-group mb-3">
      <input type="search" class="form-control"   id="datatable-search-input" placeholder="Recherche ..." v-model="searchavis" >
<div class="input-group-append">
<span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchavis()"><i class="fa-solid fa-search"></i></a>
</span>
</div>
</div>

</div>
<div class="row"  > 
<div class="col">
 <label>Num des avis</label>
  
</div>
  
</div>
<div class="row" v-for="(elementavis,id) in avis" :key="elementavis.id" > 
<div class="col">
    <input type="radio"   @change="handleradioChangeavis"    v-model="this.selectedOption" :id="elementavis.id " :value="elementavis.id">
 </div>
<div class="col">

<label :for="elementavis.id">{{ elementavis.num_avis }}</label>

 </div>
</div>

</div>
</div>

 </div>
  
 <div class="col"> 
     <div class="container"> 

    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchdecisions()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control"   id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchjuries()"><i class="fa-solid fa-search"></i></a>
</span>
  </div>
</div>
  
 </div>
  
   
 </div>
 </div>
 <div class="row"  > 
<div class="col">
 <label>Nom des juries</label>
 </div>
  
</div>
<div class="row" v-for="(element,id) in juries" :key="element.id" > 
<div class="col">
    <input type="checkbox"   @change="handleCheckboxChange"        v-model="selectedItems" :id="element.id " :value="element.id">
 </div>
<div class="col">

<label :for="element.id">{{ element.nom }}</label>

 </div>
</div>

</div>
</div>
<div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Ajouter Une decision</button> 

</div>
</div>
    </div>
 </form>

</center>
		</div> 	
		
</template>
