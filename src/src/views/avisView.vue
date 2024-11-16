<script  >
import SideBare from '../components/SideBare.vue';
import axios from 'axios'
import  URL from './config.js';
import docxtemplater from 'docxtemplater';
  import JSZip from 'jszip';
  import JSzipUtils from 'jszip-utils';
  import  saveAs  from 'file-saver';
  
// import JSzipUtils from 'jszip-utils
  export default {
     data() {
      return {
       avis :null,
       search:'',
       datadocx:'',
		orderNumber:1 
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchavis();
    
   
  },
  methods: {
    fetchavis() {
      if(this.search==''){
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

        
        axios.get(URL.URL+'avis/search?q='+this.search)
        .then((response) => response)
        .then((data) => {
       return   this.avis = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des avis:', error);
        });
       
     }
    
   },   
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'avis/' + id)
          .then(() => {
            this.fetchavis();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
          });
      }
    },
   
     
    getDoc(id) {
      this.createAndSaveDocument(id);
    },
    loadFile(url,callback){
        JSzipUtils.getBinaryContent(url,callback);
    },
   async createAndSaveDocument(id){ 
    await  axios.get(URL.URL+'avis/'+id)
        .then((response) => response)
        .then((data) => {
       return   this.datadocx = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des avis:', error);
        });
        if(this.datadocx != null){
           let   dataset = {"avis": this.datadocx};
       console.log(this.datadocx)
          this.loadFile('./avis.docx',function(error,content){
            if (error) { 
              throw error
            };
            let zip = new JSZip(content);
            let doc = new docxtemplater().loadZip(zip)
            if(dataset!=null){
            doc.setData(dataset)
          }else{
            getDoc(id);
          }
            try {
                doc.render()
            }
            catch (error) {
                let e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({error: e}));
                 throw error;
            }
            // docx generating
            let out = doc.getZip().generate({
                type:"blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                })
            saveAs(out,`Avis.docx`);  
         });
    } 

  }

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
  .link-secondary{
    padding-left: 4%;

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
   <h2 class="form-label" for="datatable-search-input">Liste Des avis</h2>

	<h3>	 
		<router-link :to="{name: 'Ajouteravi'}"   class="btn btn-light">Ajouter une avis 
			<i class="fa-solid fa-diagram-project"></i>    </router-link></h3>

<center>   

  <br>
  <br>
  <br>
	 

  <div class="container"> 
    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchavis()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control" id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchavis()"><i class="fa-solid fa-search"></i></a>
</span>
  </div>
</div>
  
 </div>
  
   
 </div>
 </div>
	
<!--Table--> 
<table class="table table-striped " id="table"  >

<!--Table head-->
<thead>
  <tr> 
	<th>Num</th>
	<th>date avis</th>
	<th>   date d'ouverture</th>
	<th>heure</th>
	<th>Actions</th>
  </tr>
</thead>
<!--Table head-->
 <!--Table body-->
<tbody    >
 	<tr v-for="(item) in avis" :key="item.id"  >  
 
 		   <td>{{ item.num_avis }}</td> 

          <td>{{ item.date_avis }}</td>
          <td>{{ item.date_ouverture }}</td>
          <td>{{ item.heure }}</td>
          
        
	 
	<td>
  <!-- <router-link :to="{ path: '/editavi', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editavi',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.id)"><i class="fa-solid fa-trash"></i></a>
   <a href="#" class="link-secondary"  @click="getDoc(item.id)"><i class="fa-solid fa-download"></i></a>
    
  </td>
  </tr> 
</tbody>
<!--Table body-->
 
</table>
 

</center>
		</div> 	
		
</template>


