<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
export default {
  data() {
    return {
      test:[],
      offres:[],
      avis:[],
      JounalList:[],
      journal:[],
      concurrentslist:[],
      avis_selected:null,
      offre_selected:null,
      concurentid_selected:null,
      concurrents:[],
      datauploadedUPCon:{
        eliminer:[],
        reserver:[],
        objet_reserve:[],
        postuler:[],
        dossier_complet:[],
        motif:[],
        mantant_dactes:[],
         
      }, 
      datauploaded:[],
      journaldatainserted : { 
        journales_list:'',
        numero_journal:null,
        date:"",
        etat:"",
        page_num:null, 
      }, 
      nomajouter:'',
       URL:URL,
       success:false,
       eror:false,
    };
  },
  components:{
    SideBare,
  },
  mounted(){
    this.getOffres();
    this.getAvis();
    this.getJounalList();
    this.getconcurrentsList();

  },
  methods: {
    getOffres(){
        axios.get(URL.URL+'offre')
        .then((response) => response)
        .then((data) => {
       return   this.offres = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des offres:', error);
        });
    },
    getAvis(){
        axios.get(URL.URL+'avis')
        .then((response) => response)
        .then((data) => {
       return   this.avis = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des avis:', error);
        });
    },
    getJounalList(){
        axios.get(URL.URL+'journales_list')
        .then((response) => response)
        .then((data) => {
           this.JounalList = data.data; 
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des liste des jouraux :', error);
        });
    },
    getconcurrentsList(){
        axios.get(URL.URL+'concurent_list')
        .then((response) => response)
        .then((data) => {
       return   this.concurrentslist = data.data;
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des liste des concurent_list :', error);
        });
    },
    getconcurrents(){
      let dataconc = [];
        axios.get(URL.URL+'concurrents')
        .then((response) => response)
        .then((data) => {
          dataconc = data.data;
          let dataconfiltre= [];
          for( let  z =0 ;z <dataconc.length;z++){
            if(dataconc[z]?.offre?.id==this.offre_selected){
              dataconfiltre.push(dataconc[z]);
             
            }
          };
          console.log("dataconfiltre");
              console.log(dataconfiltre);
          this.concurrents=[];
         return this.concurrents=dataconfiltre;

         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des liste des concurent_list :', error);
        });
    },
    getJounal(){
        this.journal='';
        let journaux =[];
        let id =this.offre_selected;
        axios.get(URL.URL+'journal')
        .then((response) => response)
        .then((data) => {
        let  journaldt = data.data;
        for( let a =0 ;a<journaldt.length;a++){
            if(journaldt[a]?.offre?.id==id){
                journaux.push(journaldt[a]);
            }
        }
this.journal=journaux;
journaux =[];
this.getconcurrents();
         })
        .catch((error) => {
          console.error('Erreur lors de la récupération des liste des jouraux :', error);
        });
    },
    deletjournal(id){
       const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL+'journal/'+id)
          .then(() => {
            this.getJounal();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
          });
      }
    
    },

    addjournal(){
        let formateddate=null;
    const [year, month, day] =this.journaldatainserted.date.split('-');
    formateddate= `${day}-${month}-${year}`;
        // alert("test"); journaldatainserted
        let formatjournal ={ 
"offre":{id:this.offre_selected},
"avis":{id : this.avis_selected} ,
"avis":{id : this.avis_selected} ,
"journales_list": {"id":this.journaldatainserted.journales_list},
"date":formateddate,
"numero_journal":this.journaldatainserted.numero_journal,
"etat": this.journaldatainserted.etat,
"page_num": this.journaldatainserted.page_num,
        
    }
    // console.log("data journal is : ");
    console.log(formatjournal); 
    axios.post( this.URL.URL+'journal',formatjournal)
        .then(response => { 
          this.nomajouter="journal ";
          this.success =true;
          this.eror=false; 
           this.getJounal();
           this.nomajouter="journal "
           this.journaldatainserted={
            "numero_journal":null,
 
"etat":null,
"page_num":null
           }
         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.success =false;


        });
   
  },
  addconcurrent(){
    let id =this.concurentid_selected;
 
      let format = {
    "offre": {
        "id": this.offre_selected
    },
    "avis": {
        "id": this.avis_selected
          
    },
    "concurent_list": {
        "id": id
    }
};
console.log(format);
axios.post( this.URL.URL+'concurrents',format)
        .then(response => { 
          this.success =true;
          this.eror=false;  
          this.nomajouter="concurrent";

          this.concurentid_selected=null;
          this.getconcurrents();


         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.success =false;


        });  
  },
  deletconcurrents(id){

    const response = confirm("Etes Vous sure vous voulez supprimer cet element?");
      if (response) {
        axios.delete(URL.URL + 'concurrents/' + id)
          .then(() => {
            this.getconcurrents();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
          });
      }
    },
    updateConcurent(){
  console.log("test");
  console.log(this.concurrents);
  for( let a = 0 ;a< this.concurrents.length; a++){
   
let format ={
  "id":this.concurrents[a].id,
  "offre":{"id":this.offre_selected},
  "avis":{"id":this.avis_selected},
  "concurent_list":{"id":this.concurrents[a].concurent_list?.id},
  "eliminer":this.datauploadedUPCon?.eliminer[a] || null,
  "reserver":this.datauploadedUPCon?.reserver[a] || null,
  "objet_reserve":this.datauploadedUPCon?.objet_reserve[a] || null,
  "motif":this.datauploadedUPCon?.motif[a] || null,
  "dossier_complet":this.datauploadedUPCon?.dossier_complet[a] || null,
  "postuler":this.datauploadedUPCon?.postuler[a] || null,
  
}; 
this.datauploaded.push(format);
axios.put(URL.URL+"concurrents/"+this.concurrents[a].id,format);
console.log("format is :");
  console.log(format);
  }
  this.journal=[];
  let id =this.offre_selected; 
let journaux=[];
  axios.get(URL.URL+'journal')
        .then((response) => response)
        .then((data) => {
        let  journaldt = data.data;
        for( let a =0 ;a<journaldt.length;a++){
            if(journaldt[a]?.offre?.id==id){
              let jr = {"id" : journaldt[a].id}
                journaux.push(jr);
                console.log("jr");
                console.log(journaux);
            }
        }
// this.journal=journaux; 
let formatpv_un ={
      "offre":{"id":this.offre_selected},
      "avis":{"id":this.avis_selected},
      "journal":journaux,
      "concurrents":this.datauploaded,
    };
    this.test=formatpv_un;
    console.log("formatpv_un");
    console.log(formatpv_un);
    axios.post(this.URL.URL+'pv_un', formatpv_un)
        .then(response => { 
 
          this.success =true;
          this.eror=false;
           this.$router.push({ name: "processverbal" });

           
         })
        .catch(error => { 
          console.error(  error);
          this.eror=true;
          this.success =false;


        });  

         })
  

// console.log("formatpv_un");
// console.log(formatpv_un);

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
    {{ this.nomajouter }} est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  {{ this.nomajouter }}  n'est pas  ajouté  essaye une autre fois
</div> 
  <form @submit.prevent="addItem">
    <!-- {{ this.journaldatainserted }} -->
    <div class="row">
        <div class="row">
<div class="col-sm">
<label>Avis</label>
<select class="form-control" v-model="this.avis_selected" required="">
    <option value="">choissisez un avi</option>
    <option v-for="(avi,index) in avis" :value="avi.id">{{avi.num_avis }}</option>

</select>
</div>
<div class="col-sm">
<label>offre</label>
<select class="form-control" required=""   v-model="this.offre_selected" @change="this.getJounal()">
    <option value="">choissisez un offre</option>
    <option v-for="(offre,index) in offres" :value="offre.id">{{offre.num }}</option>
</select>
</div>
  </div>
<!-- <h1> test</h1>
{{ this.test }} -->
  <div class="col-sm">
<label>des journaux</label>
<select class="form-control" required  v-model="this.journaldatainserted.journales_list" >
    <option value="">choissisez un journal</option>
    <option v-for="(journaleListe,index) in JounalList" :value="journaleListe.id">{{journaleListe.nome_journale }}</option>
</select>
</div>
 
<div class="col-sm">
<label>N° du journal</label>
<input type="number" step="0.01" class="form-control" aria-describedby="emailHelp" v-model="this.journaldatainserted.numero_journal"    required="">
</div>
<div class="col-sm">
<label>date</label>
<input type="date" class="form-control" aria-describedby="emailHelp" v-model="this.journaldatainserted.date"     required="">
</div>
 
<div class="col-sm">
<label>N° page</label>
<input type="number" step="0.01" class="form-control" aria-describedby="emailHelp" v-model="this.journaldatainserted.page_num"    required="">
</div>
<div class="col-sm">
<label></label>  
<a type="button" @click="addjournal" class="btn btn-light" href="#"><i class="fa-solid fa-plus"></i></a>
</div>
</div>
 <table  class="table table-striped ">
    <thead >
        <!-- <td>{{ iteam. }}</td> -->
        <td>Nom de journal</td>
        <td>N° du journal</td>
        <td>date </td> 
        <td>N° du page </td>
        <td>Action</td>
    </thead> 
    <tbody>  
    <tr v-for="(iteam , index)  in journal">
        <!-- <td>{{ iteam. }}</td> -->
        <td>{{iteam?.journales_list?.nome_journale}}</td>
        <td>{{iteam.numero_journal}}</td>
        <td>{{iteam.date}}</td> 
        <td>{{iteam.page_num}}</td> 
        <td>
            <a href="#" @click="this.deletjournal(iteam.id)">
                <i class="fa-solid fa-trash"></i>
            </a>
        </td>
    </tr>
</tbody>
 </table>
 </form> 
 <div class="row">
    <div class="row">
        <div class="col-sm">
        <label>Ajouter concurrent a cet offre</label>
        <select class="form-control"  v-model="this.concurentid_selected" required="">
            <option>Les concurrents</option>
            <option v-for="(concurrent , index) in concurrentslist" :value="concurrent.id">{{concurrent.nom}}</option>
        </select>
        </div>
        <div class="col-sm"> 
<a type="button"  @click="addconcurrent()" class="btn btn-light" href="#"><i class="fa-solid fa-plus"></i></a>
</div>
    </div>
 </div>
 <table  class="table table-striped " id="tableconcurrent">
    <thead >
       
        <!-- <td>{{ iteam. }}</td> -->
        <td>Nom </td>
        <td>eliminer</td>
        <td>reserver </td>
        <td>objet </td>
        <td>postuler </td>
        <td>dossier complete</td>
        <td>motif</td>
        <td>Actions</td>
    </thead> 
    <tbody>   
     <!-- {{  this.concurrents }} -->
      <!-- {{ this.datauploadedUPCon }} -->
    <tr v-for="(iteam , index)  in concurrents">
       
        <!-- <td>{{ iteam. }}</td> -->
        <td >
          {{ iteam?.concurent_list?.nom }} </td>
        <td>
          <select class="form-control" v-model="this.datauploadedUPCon.eliminer[index]"> 
            <option>oui</option>
            <option selected>non</option>
          </select>
        </td>
        <td>
          <select class="form-control" v-model="this.datauploadedUPCon.reserver[index]">
            <!-- <option>{{iteam?.reserver}}</option> -->
            <option>oui</option>
            <option selected>non</option>
          </select>
        </td>
        <td>
          <textarea  v-model="this.datauploadedUPCon.objet_reserve[index]"></textarea>
        </td>
        <td>
          <select class="form-control" v-model="this.datauploadedUPCon.postuler[index]">
            <!-- <option>{{iteam.postuler}}</option> -->
            <option>physique</option>
            <option selected>electronique</option>
          </select>
        </td>
        <td>
        
          <select class="form-control" v-model="this.datauploadedUPCon.dossier_complet[index]">
            <!-- <option>{{iteam.dossier_complet}}</option> -->
            <option>oui</option>
            <option>non</option>
          </select></td>
        <td>
          <textarea v-model="this.datauploadedUPCon.motif[index]"></textarea>
        
        </td>
        <!-- <td><input type="number"  v-model="this.datauploadedUPCon.mantant_dactes[index]"/></td> -->
         <td>
            <a href="#tableconcurrent" @click="this.deletconcurrents(iteam.id)">
                <i class="fa-solid fa-trash"></i>
            </a>
        </td>
    </tr>
</tbody>
 </table>
 <button class="btn btn-light"  @click="updateConcurent()">Ajouter</button>
</center>
		</div> 	
		
</template>
