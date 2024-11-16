<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
        offres:null,
        avis:null,
        dataEdited:{
            "eliminerpvdeux": [],
            "observe": [],
            "note_experience": [],
            "motif": [],
            "n2_2_technicien": [],
            "taux":null,
            "n2_3_operateur": [],
            "mantant_dactes":[],
            "mantant_dactes_apres_verification": [],
            "n3_1_note_materiel": [],
            "n3_2_note_methodologie_materiel": [],
            "n2_1_chef_projet":[],
            "note_experience":[],
            
        },
        dataconcurents:[],
        concurents:[]
    }},
  components:{
    SideBare,
  },
  mounted(){ 
this.getoffre();
this.getavis();
this.getconcurent();
},
  methods: {
    updatedataInsertpv_deux(){
        let offer = this.$route.params.idoffre;
        let avis = this.$route.params.idavis;
        let pv_un = this.$route.params.pv_un;

        for(let i=0 ;i < this.concurents.length; i++){
        let format = {
            "id":this.concurents[i].id,
            "eliminerpvdeux": this.dataEdited?.eliminerpvdeux[i],
            "observe": this.dataEdited?.observe[i],
            "note_experience": this.dataEdited?.note_experience[i],
            "motif": this.dataEdited?.motif[i],
            "n2_2_technicien": this.dataEdited?.n2_2_technicien[i],
            "taux": (((this.dataEdited.mantant_dactes_apres_verification[i]-this.offres.estimation )*100)/(this.offres.estimation )).toFixed(2),
            "n2_3_operateur": this.dataEdited.n2_3_operateur[i],
            "mantant_dactes":this.dataEdited.mantant_dactes[i],
            "mantant_dactes_apres_verification": this.dataEdited?.mantant_dactes_apres_verification[i],
            "n3_1_note_materiel":this.dataEdited?.n3_1_note_materiel[i],
            "n3_2_note_methodologie_materiel":this.dataEdited?.n3_2_note_methodologie_materiel[i],
            "n2_1_chef_projet":this.dataEdited?.n2_1_chef_projet[i],
            "offre": this.concurents[i].offer,
    "avis": this.concurents[i].avis,
    "concurent_list": this.concurents[i].concurent_list, 
    "eliminer":  this.concurents[i].eliminer,
     "reserver":  this.concurents[i].reserver,
    "objet_reserve":  this.concurents[i].objet_reserve,
    "mantant_dactes": this.dataEdited.mantant_dactes[i],
    "dossier_complet":  this.concurents[i].dossier_complet,
    "postuler":  this.concurents[i].postuler, 

        } 
        axios.put(URL.URL+"concurrents/"+this.concurents[i].id,format);
      } 
      let formatpv_deux ={
        "offre":{"id":offer},
        "avis":{"id":avis},
        "pv_un":{"id":pv_un},
      }
      axios.post(URL.URL+"pv_deux",formatpv_deux);
      this.$router.push({ name: "processverbal" });


    },
    getconcurent(){
        let id = this.$route.params.pv_un;
    axios.get(URL.URL+'pv_un/'+id)
        .then((response) => response)
        .then((data) => {
      let dataconcurentlist= data.data.concurrents;
       
      let dataco= [];
for(let a =0; a<dataconcurentlist.length;a++){
  if(dataconcurentlist[a].eliminer!="oui"){
    dataco.push(dataconcurentlist[a]);
  console.log("cocnurent"); 
  }
 

}
this.concurents=dataco;

         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des pv_un:', error);
        });
    },
  getoffre(){
    let id = this.$route.params.idoffre;
    axios.get(URL.URL+'offre/'+id)
        .then((response) => response)
        .then((data) => {
       return   this.offres = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offre:', error);
        });
  },
  getavis(){
    let id = this.$route.params.idavis;
    axios.get(URL.URL+'avis/'+id)
        .then((response) => response)
        .then((data) => {
       return   this.avis = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offre:', error);
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
  .btn-light{
	float: right;
	margin: 30px;
	background-color: #c5e8ef;
  }
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input">Ajouter un processe verbale</h2>

	 
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    ce élément est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  ce élément n'est pas  ajouté  essaye une autre fois
</div> 
  <form >
    <!-- {{ this.journaldatainserted }} -->
    <div class="row">
        <div class="row">
<div class="col-sm">
<label>Avis</label>
 <input readonly="" type="text" class="form-control"  :value="this.avis?.num_avis" />
</div>
<div class="col-sm">
<label>offre</label>
<input readonly="" type="text" class="form-control" :value="this.offres?.num" />
 
</div>
  </div>
<!-- <h1> test</h1>
{{ this.test }} -->
 
 
</div>
  
 </form> 
 {{ this.dataEdited }}
 <!-- <div class="col-sm">
    <label>Taux</label>
    <input type="number" step="0.01" max="100"  v-model="this.dataEdited.taux" class="form-control"/>
 </div> -->
 <table  class="table table-striped " id="tableconcurrent">
    <thead >
       
        <!-- <td>{{ iteam. }}</td> -->
        <td>Nom </td>
        <td>TAUX </td>
        <td>eliminer</td>
        <td>motif</td>
        <td>observe </td> 
        <td>mantant dactes</td>
        <td>mantant dactes apres verification </td>
        <td>note d'experience </td>
        <td>N2.1 chef de projet</td>
        <td>N2.2 technicien</td>
        <td>N2.3 operateur</td>
        <td>N3.1 metodologie</td>
        <td>N3.2 materiel</td>
         
        
    </thead> 
    <!-- {{ this.dataEdited }} -->
    <tbody>   
     <!-- {{  this.concurrents }} -->
      <!-- {{ this.datauploadedUPCon }} -->
      <tr  v-for="(item,index) in this.concurents">
       
       <!-- <td>{{ iteam. }}</td> -->
       <td>
       {{ item.concurent_list.nom   }} 
    </td>
    
    <td >
      {{ (((this.dataEdited.mantant_dactes_apres_verification[index]-this.offres.estimation )*100)/(this.offres.estimation )).toFixed(2) }}
    </td>
         <td>
         <select class="form-control" v-model="this.dataEdited.eliminerpvdeux[index]"> 
           <option>oui</option>
           <option selected>non</option>
         </select>
       </td>
       <td>
         <textarea v-model="this.dataEdited.motif[index]" ></textarea>
       </td>
        
       <td>
         <textarea  v-model="this.dataEdited.observe[index]"></textarea>
       </td>
       <td>       
        <input type="number" step="0.01" max="100" v-model="this.dataEdited.mantant_dactes[index]"  class="form-control"/>
</td>
       
     <td>  <input type="number" step="0.01" class="form-control" v-model="this.dataEdited.mantant_dactes_apres_verification[index]"/>
     </td>
         
       <td><input type="number" max="100" v-model="this.dataEdited.note_experience[index]"  class="form-control"/></td>
       <td><input type="number" max="100"  v-model="this.dataEdited.n2_1_chef_projet[index]" class="form-control"/></td>
       <td><input type="number" class="form-control" v-model="this.dataEdited.n2_2_technicien[index]" /></td>
       <td><input type="number" max="100"  v-model="this.dataEdited.n2_3_operateur[index]" class="form-control"/></td>
       <td><input type="number" max="100"  v-model="this.dataEdited.n3_1_note_materiel[index]" class="form-control"/></td>
       <td><input type="number" max="100"  v-model="this.dataEdited.n3_2_note_methodologie_materiel[index]" class="form-control"/></td>
       
   </tr> 
</tbody>
 </table>
 <button class="btn btn-light"  @click="updatedataInsertpv_deux()">Ajouter</button>
</center>
		</div> 	
		
</template>
