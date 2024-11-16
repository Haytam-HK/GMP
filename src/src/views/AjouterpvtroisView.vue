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
            "eliminertrois": [], 
            "motif": [],
            "gagnant": [],
            
            
        },
        dataconcurents:[],
        miniprix:1,
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
        let pv_deux = this.$route.params.pv_deux;

        for(let i=0 ;i < this.concurents.length; i++){
        let format = {
            "id":this.concurents[i].id,
             "observe": this.concurents[i]?.observe,
            "note_experience": this.concurents[i]?.note_experience,
            "motif": this.dataEdited?.motif[i],
            "n2_2_technicien": this.concurents[i]?.n2_2_technicien,
            "taux": this.concurents[i]?.taux,
            "n2_3_operateur": this.dataEdited.n2_3_operateur,
            "mantant_dactes":this.dataEdited.mantant_dactes,
            "mantant_dactes_apres_verification": this.concurents[i]?.mantant_dactes_apres_verification,
            "n3_1_note_materiel":this.concurents[i]?.n3_1_note_materiel,
            "n3_2_note_methodologie_materiel":this.concurents[i]?.n3_2_note_methodologie_materiel,
            "n2_1_chef_projet":this.concurents[i]?.n2_1_chef_projet,
            "offre": this.concurents[i].offer,
            "avis": this.concurents[i].avis, 
            "concurent_list": this.concurents[i].concurent_list, 
            "eliminer":  this.concurents[i].eliminer,
            "eliminerdeux":  this.concurents[i].eliminerdeux,
            "eliminertrois":  this.dataEdited?.eliminertrois[i],
            "reserver":  this.concurents[i].reserver,
            "objet_reserve":  this.concurents[i].objet_reserve,
            "mantant_dactes":  this.concurents[i].mantant_dactes,
            "dossier_complet":  this.concurents[i].dossier_complet,
            "postuler":  this.concurents[i].postuler, 
            "gagnant":  this.dataEdited?.gagnant[i], 
    

        } 
        axios.put(URL.URL+"concurrents/"+this.concurents[i].id,format);
      } 
      let formatpv_trois ={
        "offre":{"id":offer},
        "avis":{"id":avis},
        "pv_deux":{"id":pv_deux},
      }
      axios.post(URL.URL+"pv_trois",formatpv_trois);
      this.$router.push({ name: "processverbal" });


    },
    getconcurent(){
        let id = this.$route.params.pv_deux;
    axios.get(URL.URL+'pv_deux/'+id)
        .then((response) => response)
        .then((data) => {
      let dataconcurentlist= data.data.pv_un.concurrents;
       
      let dataco= [];
for(let a =0; a<dataconcurentlist.length;a++){
  if(dataconcurentlist[a].eliminerpvdeux!="oui" && dataconcurentlist[a].eliminer!="oui"){
    dataco.push(dataconcurentlist[a]);
  console.log("cocnurent"); 
  }
 

}
this.concurents= dataco.sort((a, b) => {
    return a.mantant_dactes_apres_verification - b.mantant_dactes_apres_verification;
  });
  this.miniprix=this.concurents[0].mantant_dactes_apres_verification;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des pv_deux:', error);
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
 
 <table  class="table table-striped " id="tableconcurrent">
    <thead >
       
        <!-- <td>{{ iteam. }}</td> -->
        <td>Nom </td>
        <td>total des notes  </td>
        <td>mantant dactes apres verification</td>
        <td>  moyene(%)</td>

        <td>eliminer</td> 
        <td>motif</td> 
        <td>gagnant</td> 
        
    </thead> 
    <!-- {{ this.dataEdited }} -->
    <tbody>   
     <!-- {{  this.concurrents }} -->
      <!-- {{ this.datauploadedUPCon }} -->
      <tr  v-for="(item,index) in concurents">
       
       <!-- <td>{{ iteam. }}</td> -->
       <td>
       {{ item.concurent_list.nom   }} 
    </td>
    <td >{{item.note_experience + item.n3_2_note_methodologie_materiel + item.n2_1_chef_projet + item.n3_1_note_materiel + item.n2_3_operateur + item.n2_2_technicien}}  </td>

    <!-- <td >{{this.item.eliminer}}  </td> -->
    
    <td >{{item.mantant_dactes_apres_verification}}  ( {{ 
    item.mantant_dactes_apres_verification==this.miniprix ? 100 :
      (100+((this.miniprix-item.mantant_dactes_apres_verification)*100)/this.miniprix).toFixed(2)
    
    }}%)</td>
     <td>
       {{ 
    item.mantant_dactes_apres_verification==this.miniprix ? 
    (((item.note_experience + item.n3_2_note_methodologie_materiel + item.n2_1_chef_projet + item.n3_1_note_materiel + item.n2_3_operateur + item.n2_2_technicien)+(100))/2).toFixed(2)

    :
      (((item.note_experience + item.n3_2_note_methodologie_materiel + item.n2_1_chef_projet + item.n3_1_note_materiel + item.n2_3_operateur + item.n2_2_technicien)+(100+((this.miniprix-item.mantant_dactes_apres_verification)*100)/this.miniprix))/2).toFixed(2)
    
    }}%
     </td>
    <td>
         <select class="form-control" v-model="this.dataEdited.eliminertrois[index]"> 
           <option>oui</option>
           <option selected>non</option>
         </select>
          </td>

          <td>
         <textarea class="form-control" v-model="this.dataEdited.motif[index]"></textarea>
          </td>

          
          <td> 
<select class="form-control" v-model="this.dataEdited.gagnant[index]"> 
           <option>oui</option>
           <option selected>non</option>
         </select>   </td>
       
        
      
      
   </tr> 
</tbody>
 </table>
 <button class="btn btn-light"  @click="updatedataInsertpv_deux()">Ajouter</button>
</center>
		</div> 	
		
</template>
