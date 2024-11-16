<script >
 import SideBare from '../components/SideBare.vue';

 import axios from 'axios'
import  URL from './config.js';
import docxtemplater from 'docxtemplater';
  import JSZip from 'jszip';
  import JSzipUtils from 'jszip-utils';
  import  saveAs  from 'file-saver';
 
export default{
	data(){
		return  {
		search:'',
		avis: [],
		formattedData:[],
		formattedDatasearch:[],
		formattedDataStable:[],
			
		}
	},
	components : {
		SideBare,
	},
	mounted(){
		 this.fetchavis()
	},
	methods : {
    getdata(){
      axios.get(URL.URL+'avis')
        .then((response) => response)
        .then((data) => {
			this.avis=data.data ;
			for(let j = 0 ;j<this.avis.length+1 ;j++){
			for(let i = 0 ;i<this.avis[j]?.offre.length+1 ; i++){
				// console.log(this.avis[j].offre[i]?.id);

				if (this.avis[j]?.offre[i]?.id) {
              this.formattedData.push({
                id: this.avis[j]?.offre[i]?.id,
                caution:this.avis[j]?.offre[i]?.caution,
                estimation: this.avis[j]?.offre[i]?.estimation,
                objet: this.avis[j]?.offre[i]?.objet,
                objet_ar: this.avis[j]?.offre[i]?.objet_ar,
                num: this.avis[j]?.offre[i]?.num,
                avis: {
                  id:  this.avis[j]?.id,
                  num_avis: this.avis[j]?.num_avis,
                  date_avis: this.avis[j]?.date_avis,
                  date_ouverture:this.avis[j]?.date_ouverture,
                  heure: this.avis[j]?.heure
                }
              });
            }  
		}
		}
		this.formattedDataStable=this.formattedData;

		// console.log(this.formattedData);
         })
		 .catch((error) => {
          console.error('Erreur lors de la récupération des avis:', error);
        }); 

	 
		
    },
		fetchavis() {
      if(this.search==''){
          this.getdata();
		
      }
      else{ 

		this.formattedDatasearch=[];

                for (let a = 0; a < this.formattedDataStable.length; a++) {
 		if (this.formattedDataStable[a]?.num.indexOf(this.search) > -1) {

			this.formattedDatasearch.push(this.formattedDataStable[a]);
			console.log(this.formattedDataStable[a]);

} 
}
 
this.formattedData = this.formattedDatasearch;
      }
    
	},
	imprimer(idoffre,id){
    let avisdata=[];
    let formattedData=[];
    axios.get(URL.URL+'avis/'+id)
        .then((response) => response)
        .then((data) => {
          avisdata=data.data ;
			for(let i = 0 ;i<avisdata.offre.length ;i++){
				// console.log(avis[j].offre[i]?.id);

				if (avisdata.offre[i]?.id==idoffre) {
              formattedData.push({
                 
                caution:avisdata.offre[i]?.caution,
                estimation: avisdata.offre[i]?.estimation,
                objet: avisdata.offre[i]?.objet,
                objet_ar: avisdata.offre[i]?.objet_ar,
                num: avisdata.offre[i]?.num,
                  num_avis: avisdata.num_avis,
                  date_avis: avisdata.date_avis,
                  date_ouverture:avisdata.date_ouverture,
                  heure: avisdata?.heure
               
              });
              console.log("data:");
              console.log(formattedData);
              this.createAndSaveDocument(formattedData);
              
            }  
		} 
 	})
	},
  
  loadFile(url,callback){
        JSzipUtils.getBinaryContent(url,callback);
    },
   async createAndSaveDocument(data){ 
     
           let   dataset = {"data" : data};
       
          this.loadFile('./cps.docx',function(error,content){
            if (error) { 
              throw error
            };
            let zip = new JSZip(content);
            let doc = new docxtemplater().loadZip(zip)
            if(dataset!=null){
            doc.setData(dataset)
          
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
            saveAs(out,`CPS.docx`);  
         });
     

  }


}}
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
   <h2 class="form-label" for="datatable-search-input">
list des Cahiers des Prescription Spéciales
</h2>
 
	 
<center>   
	
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
<!-- {{ this.formattedDatasearch  }} -->
<!--Table head-->
<thead>
 
  
		<tr> 
          <th>Objet</th>
          <th>Num Offre</th>
          <th>N° Avis</th>
          <th>Date Avis</th>
          <th>Date Ouverture</th>
          <th>Imprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(offer, index) in formattedData" :key="index">
          <td>{{ offer.objet }}</td>
          <td>{{ offer.num }}</td>
          <td>{{ offer.avis.num_avis }}</td>
          <td>{{ offer.avis.date_avis }}</td>
          <td>{{ offer.avis.date_ouverture }}</td>
		  <td><a href="#" @click="imprimer(offer.id,offer.avis.id)"><i class="fa-solid fa-download"></i></a></td>
       
        </tr>
</tbody>
<!--Table body-->


</table>
 

</center>
		</div> 	
		
</template>
