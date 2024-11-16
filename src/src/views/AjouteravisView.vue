<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
      offres:'',
       search:'',
       success:false,
       eror:false,
       URL:URL,
       dater:'',
       avisnumAjoute:'',
       selectedItems: [],
       selectedItemsJSON:{},
       item :{ 
num_avis: null,
date_avis: '30-12-2023',
date_ouverture: null,
heure: "10:00",
offre:[{}]
}
    };
  },
  components:{
    SideBare,
  },
  computed: {
    formattedDate() {
      return this.formatDate(this.selectedDate); // Format the date to "dd-mm-yyyy"
    },
  },
  mounted() { 
    this.fetchOffres(); 
  },
  methods: {
    handleDateoverturInput(event) { 
        
    const formattedDate = event.target.value;
    const [year, month, day] =formattedDate.split('-');
    this.item.date_ouverture= `${day}-${month}-${year}`;

    },
    handleDateInput(event) { 
        
    const formattedDate = event.target.value;
    const org = new Date(formattedDate);
//   date.setDate(date.getDate() + 21);
    const [year, month, day] =formattedDate.split('-');
    this.item.date_avis= `${day}-${month}-${year}`;
    const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  const newDateInMilliseconds = org.getTime() + (21 * ONE_DAY_IN_MILLISECONDS);
  this.dater= new Date(newDateInMilliseconds);
  const year1 =    this.dater.getFullYear();
  const month1 = String( this.dater.getMonth() + 1).padStart(2, '0');
  const day1 = String( this.dater.getDate()).padStart(2, '0'); 
  this.dater=year1+'-'+month1+'-'+day1;
  this.getdateforAvisouverture(this.dater);
 
    },
    getdateforAvisouverture(formattedDate){
 
    const [year, month, day] =formattedDate.split('-');
    this.item.date_ouverture= `${day}-${month}-${year}`;
    },
    addItem() {
      axios.post( this.URL.URL+'avis', this.item)
        .then(response => { 
 
          this.success =true;
          this.eror=false;
          this.avisnumAjoute=this.item.num_avis;
           this.item.num_avis = '';
           this.item.date_avis = '';
           this.item.date_ouverture = ''; 
           
           this.item.heure = '10:00'; 
           this.item.offre = ''; 
           
         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.success =false;
          this.avisnumAjoute=this.item.num_avis;
      });
    },
    fetchOffres() {
      if(this.search==''){
       axios.get(URL.URL+'offre')
        .then((response) => response)
        .then((data) => {
        return   this.offres = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offres:', error);
        });
      }
      else{
        
        axios.get(URL.URL+'offre/search?q='+this.search)
        .then((response) => response)
        .then((data) => {
       return   this.offres = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offres:', error);
        });
       
     }
    
   },   
   handleCheckboxChange() {
       // Convert the selectedItems array to the desired JSON format
        this.selectedItemsJSON = JSON.stringify(
        this.selectedItems.map((item) => {
          return { id: item };
          
        })
      );
      this.item.offre=  JSON.parse(this.selectedItemsJSON );
        
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
   <h2 class="form-label" for="datatable-search-input">Ajouter une avi</h2>

 <center>   
   <div class="alert alert-success" role="alert" v-if="success">
   {{this.avisnumAjoute}} est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
 {{this.avisnumAjoute}} n'est pas  ajouté  essaye une autre fois
</div> 
   <form @submit.prevent="addItem"  >
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
<button   class="btn btn-light">Ajouter une avis</button> 

</div>
</div>
    </div>
 </form>

</center>
		</div> 	
		
</template>
