<script  >
import SideBare from '../components/SideBare.vue';
import axios from 'axios'
import  URL from './config.js';

import docxtemplater from 'docxtemplater';
  import JSZip from 'jszip';
  import JSzipUtils from 'jszip-utils';
  import  saveAs  from 'file-saver';
export default {
     data() {
      return {
       desicions :null,
       search:'',
       desicionsdata:[],
       desicionsimp:[],
       desicionsimpdata:[],
       dataavi:[],
       decisiontable:[],
		orderNumber:1 ,
    avis:'',
	modifiedData:[]
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchdesicions();

    
  },
  methods: {
	
    getdata(id){
      this.desicionsimpdata=[];

      
      axios.get(URL.URL+'decisions')
        .then((response) => response)
        .then((data) => {
           this.desicions = data.data;
           for( let a = 0;a <this.desicions.length+1 ; a++){
          if(this.desicions[a]?.avis.id==id){
            let format  = this.desicions[a].jury
             this.desicionsimp.push(format);
          }}
      
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des desicions:', error);
        });
        axios.get(URL.URL+'avis/'+id)
        .then((response) => response)
        .then((data) => {
           this.avis = data.data; 
           let formatavis ={
          "num_avis":this.avis.num_avis,
        "date_avis": this.avis.date_avis,
        "date_ouverture":this.avis.date_ouverture,
        "heure": this.avis.heure,
        "offre":this.avis.offre,
        "juries":this.desicionsimp
      };
      console.log("test");
      console.log(formatavis);
      this.dataavi.push(formatavis);
      this.getDoc( this.dataavi);
       
      
      
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des desicions:', error);
        });
        // console.log(this.avis)
        // let avisdata = this.avis
        // this.desicionsimp.push(this.avis);
//  let dattaa ={juries :this.desicionsimp ,  };
//            console.log(dattaa);
//           //  this.desicionsimpdata.push(this.avis );
           
      //  this.desicionsimpdata={"jurie" : this.desicionsimp};

    },
    fetchdesicions() {
      if(this.search==''){
       axios.get(URL.URL+'decisions')
        .then((response) => response)
        .then((data) => {
           this.desicions = data.data;
		   const uniqueAvisIds = [];
       for(let i =0 ; i < this.desicions.length+1;i++){
		console.log(this.desicionsdata.length);
                  if(this.desicionsdata.length>0){
                           for(let j =0 ; j < this.desicionsdata.length+1;j++){
							if(this.desicionsdata[j]!=null ){
								console.log(this.desicionsdata[j]);

							}
	                         }
				  }else{
					this.desicionsdata.push(this.desicions[i]);
				  }
	   }
        
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des desicions:', error);
        });


     
             
        
      }

      else{
        
    //     axios.get(URL.URL+'desicions/search?q='+this.search)
    //     .then((response) => response)
    //     .then((data) => {
    //    return   this.desicions = data.data;
    //      })
    //     .catch((error) => {
    //       console.error('Erreur lors de la récupération des desicions:', error);
    //     });
	for (let a = 0; a < this.desicions.length; a++) {
 		if (this.desicions[a].avis.num_avis.toUpperCase().indexOf(this.search) > -1) {
			this.desicionsdata.push(this.desicions[a]);
}
    // if (item.avis && item.avis.num_avis === this.search) {
    // //   this.desicions.push(item);
    // }
  }
  this.desicions=[];
console.log(this.desicions);
  for (let a = 0; a < this.desicionsdata.length; a++) { 

 			this.desicions.push(this.desicionsdata[a]);
			 
}
 
// Loop through the data and filter unique id values
// this.desicions.forEach((item) => {
//         if (!this.decisiontable.includes(item.id)) {
// 			decisiontable.push(item.id);
//         }
//       });
// for (let a = 0; a < this.desicions.length; a++) { 
// if(this.decisiontable.length>0){


//           if(this.desicions[a].avis.id!=1){
// 			this.decisiontable.push(this.decisions[a]);
// alert("ok")
		  
// 		} 
// 	}else{
// alert("ok 2 ")

// 		this.decisiontable.push(this.desicions[a]);

// 	}
// 	 }
         }
	
    
   },    
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'decisions/' + id)
          .then(() => {
            this.fetchdesicions();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
          });
      }
    },
    
    getDoc(data) {
      this.createAndSaveDocument(data);
    },
    loadFile(url,callback){
        JSzipUtils.getBinaryContent(url,callback);
    },
   async createAndSaveDocument(data){ 
    
            let   dataset = {data:data } ;
            console.log(this.datadocx)
          this.loadFile('./decisions.docx',function(error,content){
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
            saveAs(out,`Avis.docx`);  
         });
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
   <h2 class="form-label" for="datatable-search-input">Liste Des desicions</h2>

	<h3>	 
		<router-link :to="{name: 'Ajouterdesicion'}"   class="btn btn-light">Ajouter Un desicion 
			<i class="fa-solid fa-diagram-project"></i>    </router-link></h3>

<center>   

  <br>
  <br>
  <br>
	 

  <div class="container"> 
    <div class="row">
  <div class="col-8" >
   <!-- <a  href="#" class="link-secondary"  @click="fetchdesicions()"><i class="fa-solid fa-search"></i></a> -->
         <div class="input-group mb-3">
          <input type="search" class="form-control" id="datatable-search-input" placeholder="Recherche ..." v-model="search" >
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">    <a href="#" @click="fetchdesicions()"><i class="fa-solid fa-search"></i></a>
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
	<th>Num avis</th>
	<th>date desicions</th>
	<th>  l'heur a partire de</th> 
	<th>nom </th>	
	<th> profission</th> 
	<th>Actions </th>
  </tr>
</thead>
 <!--Table head-->
 <!--Table body--> 
<tbody    >
	{{ this.desicionsdata}}
<!-- {{ this.desicionsimp   }}

<br>
{{ this.dataavi}} -->

<!-- {{ this.avis }} -->
 	<tr v-for="(item) in desicions  " :key="item.id"  >  
		
 
 		   <td>{{ item.avis.num_avis  }}</td> 

          <td>{{ item.avis.date_avis }}</td> 
          <td>{{ item.avis.heur }}</td> 
          
        
		  <td>{{ item.jury.nom  }}</td> 
		<td>{{ item.jury.profission  }}</td> 
	<td>
  <!-- <router-link :to="{ path: '/editdesicion', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editdesicion',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.id)"><i class="fa-solid fa-trash"></i></a>
   <a href="#" class="link-secondary"  @click="getdata(item.avis.id)"><i class="fa-solid fa-download"></i></a>
    
  </td>
  </tr> 
</tbody>
<!--Table body-->
 </table>
 

</center>
		</div> 	
		
</template>


