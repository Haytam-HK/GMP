

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
       datadocx:[],
	   getoffer:'',
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
	reforme(avisID,offreId){
		// alert(avisID+"  d d "+offreId)
		axios.get(URL.URL+'avis/'+avisID)
        .then((response) => response)
        .then((data) => {
           this.getoffer =data.data;
		console.log(  this.getoffer.offre.length);
		for (let a = 0; a < this.getoffer.offre.length+1; a++) { 
 		if (this.getoffer?.offre[a]?.id==offreId) {
 			let data = {
					num_avis: this.getoffer.num_avis,
					date_avis: this.getoffer.date_avis,
					date_ouverture: this.getoffer.date_ouverture,
					heure: this.getoffer.heure,
					 
						caution: this.getoffer?.offre[a].caution,
						estimation: this.getoffer?.offre[a].estimation,
						objet: this.getoffer?.offre[a].objet,
						num: this.getoffer?.offre[a].num,
					 
			}
			// this.datadocx.push({avis : data}); 
			this.datadocx =  {avis : data};
			this.getDoc(this.datadocx);
}
}

         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des avis:', error);
        });
 

	},
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
     
    getDoc(datadocx) {
      this.createAndSaveDocument(datadocx);
    },
    loadFile(url,callback){
        JSzipUtils.getBinaryContent(url,callback);
    },
   async createAndSaveDocument(datadocx){ 
   
        if(this.datadocx != null){
           let   dataset =datadocx;
		    console.log(this.datadocx)
          this.loadFile('./Reglement.docx',function(error,content){
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
            saveAs(out,`Reglement.docx`);  
         });
    } 
	this.datadocx=[];

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
   <h2 class="form-label" for="datatable-search-input">Liste Des réglements</h2>
 
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
	<th>num offre</th>
  </tr>
</thead>
<!--Table head-->
 <!--Table body-->
<tbody    >
    <tr v-for="avis in avis" :key="avis.id">
       <td>{{ avis.num_avis }}</td>
      <td>{{ avis.date_avis }}</td>
      <td>{{ avis.date_ouverture }}</td>
      <td>{{ avis.heure }}</td>
      
    <tr v-for="offre in avis.offre" :key="offre.id">
      
   <td>{{ offre.num}}<a href="#" class="link-secondary"  @click="reforme(avis.id,offre.id)"><i class="fa-solid fa-download"></i></a>
        </td>
    </tr>
</tr>
 
 
</tbody>
<!--Table body-->
 
</table>
 

</center>
		</div> 	
		
</template>


