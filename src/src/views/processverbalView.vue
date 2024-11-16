

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
       pv_deux:'',
	   pv_un:'',
	   pv_troi:'',
	   pv_all:[],
     pv_undata:[],
		orderNumber:1 ,
    juriespv2:[],
    avis:''
      }
    }, 
	components: {
  SideBare
},
mounted() {
    this.fetchdesicions();

    
  },
  methods: {
    getdatapv3forprint(idpvtroi,idavis,idoffre,avis_date,avis_num,heure){ 
        
          axios.get(URL.URL+'decisions')
        .then((response) => response)
        .then((data) => {
           let decisions = data.data; 
           let datajurie=[];
           let indice =0
           for(let z =0 ;z<decisions.length;z++){  
            if(decisions[z].avis.id==idavis){
              
              datajurie.push(decisions[z].jury);
               
            }
           }  
       datajurie.sort((a, b) => a.id - b.id);
           axios.get(URL.URL+'pv_trois/'+idpvtroi)
        .then((response) => response)
        .then((data) => {
           let pvtroidata = data.data; 
           let gagnant=[]; 
          let dataeliminer=[];
          let datanoeliminer=[];
          let montant='';
           for(let z =0 ;z<pvtroidata.pv_deux.pv_un.concurrents.length;z++){  
            if(pvtroidata.pv_deux.pv_un.concurrents[z].gagnant=="oui"){
              
              gagnant.push(pvtroidata.pv_deux.pv_un.concurrents[z].concurent_list);
                montant =pvtroidata.pv_deux.pv_un.concurrents[z].mantant_dactes_apres_verification;
               
            } 
          }
          for(let z =0 ;z<pvtroidata.pv_deux.pv_un.concurrents.length;z++){  

            if(pvtroidata.pv_deux.pv_un.concurrents[z].eliminertrois!="oui" && pvtroidata.pv_deux.pv_un.concurrents[z].eliminerpvdeux!="oui" && pvtroidata.pv_deux.pv_un.concurrents[z].eliminer!="oui"){
             
              let formdataelimine ={
                nom:pvtroidata.pv_deux.pv_un.concurrents[z].concurent_list.nom,
                verifiedmantantcon:pvtroidata.pv_deux.pv_un.concurrents[z].mantant_dactes_apres_verification,
              }
              datanoeliminer.push(formdataelimine);
            }
            if(pvtroidata.pv_deux.pv_un.concurrents[z].eliminertrois=="oui"){
              let formdataelimine ={
                nom:pvtroidata.pv_deux.pv_un.concurrents[z].concurent_list.nom,
                motif:pvtroidata.pv_deux.pv_un.concurrents[z].motif,
              }
              dataeliminer.push(formdataelimine);

            }
           }  
       
           axios.get(URL.URL+'offre/'+idoffre)
        .then((response) => response)
        .then((data) => {
           let objet = data.data.objet;
           let num_offre=data.data.num; 
           let estimation=data.data.estimation; 
           let responsedataeliminer='';
           let responsedatanoeliminer="";
           if(dataeliminer.length==0){
              responsedataeliminer='Néant';
           }
           if(datanoeliminer.length==0){
              responsedatanoeliminer='Néant';
           }
           
           let formpvtroi = {
            juries : datajurie,
            gagnant : gagnant ,
            date_ouverture:avis_date,
            avis_num:avis_num,
            objet:objet,
            num_offre:num_offre,
            estimation:estimation,
            heure:heure,
            datanoeliminer:datanoeliminer,
            dataeliminer:dataeliminer,
            responsedatanoeliminer:responsedatanoeliminer,
            responsedataeliminer:responsedataeliminer,
            montant:montant
           };
           console.log(formpvtroi);
           this.createAndSaveDocument("/proces_verbal_3.docx",formpvtroi);

           } );
       
          })
       
        })

    },
    roadto(idoffre,idavi,pv_un){
      let path ="Ajouterpv_deux/"+idavi+"/"+idoffre+"/"+pv_un;
      this.$router.push({ path:path});
    },
    roadtopv3(idoffre,idavi,pv_un){
      let path ="Ajouterpv_trois/"+idavi+"/"+idoffre+"/"+pv_un;
      this.$router.push({ path:path});
    },
    getdatapv2forprint(id_pc_deux,idavis){
      axios.get(URL.URL+'pv_deux/'+id_pc_deux)
        .then((response) => response)
        .then((data) => {
          axios.get(URL.URL+'decisions')
        .then((response) => response)
        .then((data) => {
           let decisions = data.data; 
           let datajurie=[];
           let indice =0
           for(let z =0 ;z<decisions.length;z++){  
            if(decisions[z].avis.id==idavis){
              
              datajurie.push(decisions[z].jury);
              console.log(datajurie);
            }
           }  
           datajurie.sort((a, b) => a.id - b.id);
          })
          let dataNoEliminerConcurrents=[];
          let dataEliminerConcurrents=[];
          let allpv_deux= data.data;
          let indice=0;
          let index=0; 
          
      
          for( let e =0;e<allpv_deux.pv_un.concurrents.length;e++){
      
            if(allpv_deux.pv_un.concurrents[e].eliminerpvdeux!="oui" && allpv_deux.pv_un.concurrents[e].eliminer!="oui"){
              indice++;
              
              let formatNoEliminerconcurant={
                "indice":indice,
                "nom":allpv_deux.pv_un.concurrents[e].concurent_list.nom || '',
                "verifiedmantant":allpv_deux.pv_un.concurrents[e]?.mantant_dactes_apres_verification || '',
                "mantantdactes":allpv_deux.pv_un.concurrents[e]?.mantant_dactes || '',
                "taux":allpv_deux.pv_un.concurrents[e]?.taux || '',
                "observe":allpv_deux.pv_un.concurrents[e]?.observe || '',
              }
                   dataNoEliminerConcurrents.push(formatNoEliminerconcurant);
                   console.log("dataNoEliminerConcurrents:");
                   console.log(dataNoEliminerConcurrents);
            }
            if(allpv_deux.pv_un.concurrents[e].eliminerpvdeux=="oui" ){
             index++; 
              let formatEliminerconcurant={
                "index":index,
                "nom":allpv_deux.pv_un?.concurrents[e]?.concurent_list?.nom,
                "motif":allpv_deux?.pv_un?.concurrents[e]?.motif
              }
                   dataEliminerConcurrents.push(formatEliminerconcurant);
                   console.log("dataEliminerConcurrents:");
                   console.log(dataEliminerConcurrents);

            }
          };
          let minconc = dataNoEliminerConcurrents.sort((a, b) => {
    return a.verifiedmantant - b.verifiedmantant;
  });
           axios.get(URL.URL+'decisions')
        .then((response) => response)
        .then((data) => {
          let idavis=allpv_deux.avis.id;
          console.log(idavis);
           this.desicions = data.data;
           let jury = [];
           this.juriespv2=[];
           for( let a = 0;a <this.desicions.length; a++){
          if(this.desicions[a]?.avis.id==idavis){
            let format  = this.desicions[a].jury
            console.log("forma juerie");
            console.log(format);
            this.juriespv2.push(format)  ;
          }} 
          let   reponsedataNoEliminerConcurrents="";

          if(dataNoEliminerConcurrents.length==0){
              reponsedataNoEliminerConcurrents="Néant";
          }
          let  reponsedataEliminerConcurrents='';
          if(dataEliminerConcurrents.length==0){
              reponsedataEliminerConcurrents="Néant";
          }
          this.juriespv2.sort((a, b) => a.id - b.id);
          let format_pv_deux = {
            offre_num : allpv_deux.offre.num,
            objet : allpv_deux.offre.objet,
            num_avis : allpv_deux.avis.num_avis || '',
            heure : allpv_deux.avis.heure || '',
            date_ouverture : allpv_deux.avis.date_ouverture || '', 
            "dataNoEliminerConcurrents":dataNoEliminerConcurrents || '',
            "dataEliminerConcurrents":dataEliminerConcurrents || '',
            "reponsedataEliminerConcurrents":reponsedataEliminerConcurrents || '',
            "reponsedataNoEliminerConcurrents":reponsedataNoEliminerConcurrents || '',
            "juries":this.juriespv2 || '',
            "minconcurent":minconc[0] || ''
             
            
          };
          

          console.log("format_pv_deux is : ");
          console.log(format_pv_deux);
          this.createAndSaveDocument("/proces_verbal_2.docx",format_pv_deux);

        });
        
        
      })
        .catch((error) => {
          console.error('Erreur lors de la récupération des processes verbal N° 2:', error);
        });
    },
    getdataforprint(idavis,id_pv,offre_num){
// alert(idavis+ " "+id_pv);
axios.get(URL.URL+'pv_un/'+id_pv)
        .then((response) => response)
        .then((data) => {
           let pv_un = data.data; 
           axios.get(URL.URL+'decisions')
        .then((response) => response)
        .then((data) => {
           let decisions = data.data; 
           let datajurie=[];
           let indice =0
           for(let z =0 ;z<decisions.length;z++){  
            if(decisions[z].avis.id==idavis){
              datajurie.push(decisions[z].jury);
             
            }
           } 
           datajurie.sort((a, b) => a.id - b.id);
            console.log("datajurie");
            console.log(datajurie); 
           indice=0;
                  let dataconcurentsreserver=[];
           for(let z =0 ;z<pv_un.concurrents.length;z++){ 
               if(pv_un.concurrents[z].reserver=="oui"){
            indice=indice+1;

               let formatconcurentreserve = { 
                 "objet_reserver":pv_un.concurrents[z].objet_reserve, 
                 "nom":pv_un.concurrents[z].concurent_list?.nom,

 
                               
 
               };
               dataconcurentsreserver.push(formatconcurentreserve);

               console.log("dataconcurentsreserver : ");
               console.log(dataconcurentsreserver);
              }
            }
           indice=0;
                 let dataconcurentsphysique=[];
           for(let z =0 ;z<pv_un.concurrents.length;z++){ 
            
               if(pv_un.concurrents[z].postuler=="physique"){
                indice=indice+1;
               let formatconcurentphysique = {
                 "indice":indice,
                 "nom":pv_un.concurrents[z].concurent_list?.nom,
                  
                               
 
               };
               dataconcurentsphysique.push(formatconcurentphysique);
               console.log(dataconcurentsphysique);
              }
            }
            indice=0;
                 let dataconcurentselectronique=[];
           for(let z =0 ;z<pv_un.concurrents.length;z++){ 
               if(pv_un.concurrents[z].postuler=="electronique"){
            indice=indice+1;
               let formatconcurentelectronique = {
                 "indice":indice,
                 "nom":pv_un.concurrents[z].concurent_list.nom,
                  
                               
 
               };
               dataconcurentselectronique.push(formatconcurentelectronique);
               console.log(dataconcurentselectronique);
              }
            }
           indice=0;
                 let dataconcurentselemine=[];
           for(let z =0 ;z<pv_un.concurrents.length;z++){ 
               if(pv_un.concurrents[z].eliminer=="oui"){
            indice=indice+1;

               let formatconcurentselemine = {
                 "indice":indice,
                 "nom":pv_un.concurrents[z].concurent_list?.nom,
                 "motif":pv_un.concurrents[z].motif, 
                               
 
               };
               dataconcurentselemine.push(formatconcurentselemine);
               console.log(dataconcurentselemine);
              }
            }


           indice=0;
                 let dataconcurentsnoneleine=[];
           for(let z =0 ;z<pv_un.concurrents.length;z++){ 
               if(pv_un.concurrents[z].eliminer!="oui"){
            indice=indice+1;
               let formatconcurentsnoelemine = {
                 "indice":indice,
                 "nom":pv_un.concurrents[z].concurent_list?.nom,
                 "montant":pv_un.concurrents[z].mantant_dactes || '', 
                               
 
               };
               dataconcurentsnoneleine.push(formatconcurentsnoelemine);
               console.log(dataconcurentsnoneleine);
              }
            }

           indice=0;
                 let dataconcurents=[];
           for(let z =0 ;z<pv_un.concurrents.length;z++){  

               indice=indice+1;
               
              let formatconcurents = {
                "indice":indice,
                "nom":pv_un.concurrents[z].concurent_list?.nom,
                "montant":pv_un.concurrents[z].mantant_dactes || '', 
                 
                              

              };
              if(pv_un.concurrents[z].postuler=="physique"){
              dataconcurents.push(formatconcurents);

              }
  
            
           };
               for(let z =0 ;z<pv_un.concurrents.length;z++){  

               indice=indice+1;
               
              let formatconcurents = {
                "indice":indice,
                "nom":pv_un.concurrents[z].concurent_list?.nom,
                "montant":pv_un.concurrents[z].mantant_dactes || '', 
                 
                              

              };
              if(pv_un.concurrents[z].postuler!="physique"){
              dataconcurents.push(formatconcurents);

              }
  
            
           };
           indice=0;
                 let datajournal=[];
           for(let z =0 ;z<pv_un.journal.length;z++){  
            
              indice=indice+1;
              let formatjournal = {
                "nomjournal":pv_un.journal[z].journales_list.nome_journale,
                "date":pv_un.journal[z].date,
                "etat":pv_un.journal[z].etat,
                "numero_journal":pv_un.journal[z].numero_journal, 
                "page_num":pv_un.journal[z].page_num,

              }
              datajournal.push(formatjournal);
              console.log(datajournal);
            
           }  
          let Reponse = " " ;
        let  Reponsephysique = " " ;
         let  Reponseelectronique = " " ;
        let  Reponsereserver= " " ;

           
           if(dataconcurentselemine.length<1){
          Reponse = "Néant" ;

        }else{
          Reponse = " " ;

        }
        if(dataconcurentsphysique.length<1){
          Reponsephysique = "Néant" ;

        }else{
          Reponsephysique = " " ;

        }
        if(dataconcurentselectronique.length<1){
          Reponseelectronique = "Néant" ;

        }else{
          Reponseelectronique = " " ;

        }
        if(dataconcurentsreserver.length<1){
          Reponsereserver = "Néant" ;

        }else{
          Reponsereserver= " " ;

        }
           let fomatprint = {
            "num_offre" : offre_num,
            "objet":pv_un.offre.objet,
            "estimation":pv_un.offre.estimation,
            "num_avis" :  pv_un.avis.num_avis,
            "date_ouverture" : pv_un.avis.date_ouverture,
            "heure" : pv_un.avis.heure,
            "juries":datajurie,
            "concurents":dataconcurents,
            "journal":datajournal,
            "no_elemine":dataconcurentsnoneleine,
            "elemine":dataconcurentselemine,
            "physique":dataconcurentsphysique,
            "electronique":dataconcurentselectronique,
            "reserver":dataconcurentsreserver,
            "Reponsereserver":Reponsereserver,
            "Reponsephysique":Reponsephysique,
            "Reponseelectronique":Reponseelectronique,
            "Reponse":Reponse,
           }
console.log(fomatprint);
this.createAndSaveDocument("/proces_verbal_01.docx",fomatprint);

        
        });
        });

    },
    
    loadFile(url,callback){
        JSzipUtils.getBinaryContent(url,callback);
    },
   async createAndSaveDocument(path,data){ 
    console.log("data printed : ");
console.log(data);
            let   dataset = {data:data } ;
            console.log(this.datadocx)
          this.loadFile(path,function(error,content){
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
            saveAs(out,`pv.docx`);  
         });

        
       } ,
       
     getdataforshow(){
      this.pv_all=[];
      this.pv_un=[];
      this.pv_deux=[];
      this.pv_troi=[];
      axios.get(URL.URL+'pv_un')
        .then((response) => response)
        .then((data) => {
           this.pv_un = data.data;
          
           axios.get(URL.URL+'pv_deux')
        .then((response) => response)
        .then((data) => {
           this.pv_deux = data.data;
           axios.get(URL.URL+'pv_trois')
        .then((response) => response)
        .then((data) => {
           this.pv_troi = data.data;

           for(let a = 0;a< this.pv_troi.length; a++){ 
     for(let c = 0;c< this.pv_un.length; c++){
        if( this.pv_troi[a]?.pv_deux?.pv_un?.id==this.pv_un[c].id){
          let formatpv ={
         "pv_un":this.pv_un[c].id,
         "pv_deux":this.pv_troi[a]?.pv_deux?.id,
         "pv_troi":this.pv_troi[a].id,
         "avis_date":this.pv_un[c].avis.date_ouverture,
        "avis_id": this.pv_un[c].avis.id,
        "avis_num": this.pv_un[c].avis.num_avis,
        "heure": this.pv_un[c].avis.heure,
        "offre_num":this.pv_un[c].offre.num, 
        "offre_id":this.pv_un[c].offre.id, 
      }; 
    this.pv_all.push(formatpv);
        }
    console.log("this.pv_all");
    console.log(this.pv_all);
         
    
}
 }
// pv 1 et pv 2

for(let a = 0;a< this.pv_deux.length; a++){ 
     for(let c = 0;c< this.pv_un.length; c++){
      console.log(c);
        if( this.pv_deux[a].pv_un.id==this.pv_un[c].id){
          let formatpv ={
         "pv_un":this.pv_un[c].id,
         "pv_deux":this.pv_deux[a].id,
         "avis_date":this.pv_un[c].avis.date_ouverture,
        "avis_id": this.pv_un[c].avis.id,
        "avis_num": this.pv_un[c].avis.num_avis,
        "heure": this.pv_un[c].avis.heure,
        "offre_num":this.pv_un[c].offre.num, 
        "offre_id":this.pv_un[c].offre.id, 
      }; 
    this.pv_all.push(formatpv);
        }
    console.log("this.pv_all");
    console.log(this.pv_all);
         
    
}
 }
//  seul pv1 
     for(let c = 0;c< this.pv_un.length; c++){
      console.log(c);
           let formatpv ={
         "pv_un":this.pv_un[c].id, 
         "avis_date":this.pv_un[c].avis.date_ouverture,
        "avis_id": this.pv_un[c].avis.id,
        "avis_num": this.pv_un[c].avis.num_avis,
        "heure": this.pv_un[c].avis.heure,
        "offre_num":this.pv_un[c].offre.num, 
        "offre_id":this.pv_un[c].offre.id, 
      }; 
    this.pv_all.push(formatpv);
      
    console.log("this.pv_all");
    console.log(this.pv_all);
         
    
} 
 
 
 
let uniqueData = [];
  let seenPvUn = [];
  let seenPvtroi=[];
  let seenPvdeux = [];
  // uniqueData=pv_all;
  for (let i = 0; i < this.pv_all.length; i++) {
    let item = this.pv_all[i];
    // if (!seenPvtroi.includes(item.pv_troi)) {
    //   uniqueData.push(item);
    //   seenPvtroi.push(item.pv_troi);
    //   seenPvUn.push(item.pv_un);

    // }
    // if (!seenPvdeux.includes(item.pv_deux) && !seenPvtroi.includes(item.pv_troi)) {
    //   uniqueData.push(item);
    //   seenPvdeux.push(item.pv_deux);
    //   seenPvUn.push(item.pv_un);

    // }

    // if (!(item.pv_deux) && !(item.pv_troi) &&  !seenPvUn.includes(item.pv_un)) {
    //   uniqueData.push(item);
    //   seenPvUn.push(item.pv_un);
    // }
    if (!seenPvUn.includes(item.pv_un)) {
      uniqueData.push(item);
      seenPvUn.push(item.pv_un);
    }
   
    
  }
  // for (let i = 0; i < this.pv_all.length; i++) {
  //   let item = this.pv_all[i];
  //   if (item.pv_deux) {
  //     uniqueData.push(item);
  //     seenPvUn.push(item.pv_un);
  //   }
  //   // if (!seenPvUn.includes(item.pv_un)) {
  //   //   uniqueData.push(item);
  //   //   seenPvUn.push(item.pv_un);
  //   // }
  // }


  this.pv_all=uniqueData;

 
          });
          });
         }).catch((error) => {
          console.error('Erreur lors de la récupération des processes verbal:', error);
        });


     
           
     },
    fetchdesicions() {
      if(this.search==''){
      this.getdataforshow(); 
      console.log("test"); 
        
      }

      else{
       this.getdataforshow();
        let pv_undata=[];
// 	for (let a = 0; a < this.pv_all.length; a++) { 
//  		if (this.pv_all[a].offre_num.indexOf(this.search) > -1) {
// 			pv_undata.push(this.pv_all[a]);
// }
    
//   } 
//  this.pv_all=[];
//       this.pv_all=pv_undata;   
//       console.log("this.pv_all");
//       console.log(this.pv_all);
     
// this.pv_all = this.pv_undata.filter(item =>
//         item.offre_num.includes(this.search)
//       );  
for (let i = 0; i < this.pv_all.length; i++) {
        if (this.pv_all[i].num_offre.includes(this.search)) {
          this.pv_undata.push(this.pv_all[i]);
        }
      } 
      this.pv_all=pv_undata;
} 



    
   },   
   deleteData(id) {
      const response = confirm("Etes Vous sure vous voulez supprimer cet item?");
      if (response) {
        axios.delete(URL.URL + 'pv_un/' + id)
          .then(() => {
            this.fetchdesicions();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
          });
      }
    },
    deleteDatapv(id){
      const response = confirm("Etes Vous sure vous voulez supprimer cet item (pv 2)?");
      if (response) {
        axios.delete(URL.URL + 'pv_deux/' + id)
          .then(() => {
            this.fetchdesicions();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
          });
      }
    },
    deleteDatapv3(id){
      const response = confirm("Etes Vous sure vous voulez supprimer cet item (pv 3)?");
      if (response) {
        axios.delete(URL.URL + 'pv_trois/' + id)
          .then(() => {
            this.fetchdesicions();  
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression:', error);
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
   <h2 class="form-label" for="datatable-search-input">Liste des processes verbal</h2>

	<h3>	 
		<router-link :to="{name: 'Ajouterpv_un'}"   class="btn btn-light">Ajouter Un processes verbal
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
<!-- {{ this.allpv_deux }} -->
<!--Table head-->
<thead>
  <tr> 
	<th>Num d'offre</th>
  <th>num d'avis</th>

 	<th>date d'ouverture</th>
	<th>  l'heur a partire de</th> 
	<th>  processe verbale N° 1 </th>
	<th>  processe verbale N° 2 </th>
	<th>  processe verbale N° 3</th>
  </tr>
</thead>
 <!--Table head-->
 <!--Table body--> 
<!-- {{ this.pv_troi[0]?.pv_deux }} -->
 <!-- {{ this.pv_all }} -->
<tbody    > 
 	<tr v-for="(item,id) in pv_all  " :key="item.id"  >  
		
 
 		   <td>{{ item.offre_num }}</td> 

          <td>{{ item.avis_num }}</td> 
          <td>{{ item.avis_date }}</td> 
          <td>{{ item.heure }}</td> 
           
	<td>
  <!-- <router-link :to="{ path: '/editdesicion', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editdesicion',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteData(item.pv_un)"><i class="fa-solid fa-trash"></i></a>
   <a href="#" class="link-secondary"  @click="getdataforprint(item.avis_id,item.pv_un,item.offre_num)"><i class="fa-solid fa-download"></i></a>
    
  </td> 
  <td v-if="item.pv_deux">
  <!-- <router-link :to="{ path: '/editdesicion', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editdesicion',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteDatapv(item.pv_deux)"><i class="fa-solid fa-trash"></i></a>
   <a href="#" class="link-secondary"  @click="getdatapv2forprint(item.pv_deux, item.avis_num)"><i class="fa-solid fa-download"></i></a>
    
  </td> 
  <td v-else>
  <!-- <router-link :to="{ path: '/editdesicion', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
   <!-- <router-link  :to="{path:'/editdesicion',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary" @click="roadto(item.avis_id,item.offre_id,item.pv_un)" ><i class="fa-solid fa-plus"></i></a> 
  </td>
  <td v-if="item.pv_troi">
  <!-- <router-link :to="{ path: '/editdesicion', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
  
  <!-- <router-link  :to="{path:'/editdesicion',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary"  @click="deleteDatapv3(item.pv_troi)"><i class="fa-solid fa-trash"></i></a>
   <a href="#" class="link-secondary"  @click="getdatapv3forprint(item.pv_troi, item.avis_id,item.offre_id,item.avis_date,item.avis_num,item.heure)"><i class="fa-solid fa-download"></i></a>
    
  </td> 
  <td v-else>
   <!-- <router-link :to="{ path: '/editdesicion', params: { id: item.id }} " class="link-secondary" ><i class="fa-solid fa-pen-to-square"></i></router-link> -->
   <!-- <router-link  :to="{path:'/editdesicion',query:{id: 1}}"> {{  item.id }}  </router-link> -->
   <a href="#" class="link-secondary" @click="roadtopv3(item.avis_id,item.offre_id,item.pv_deux)" ><i class="fa-solid fa-plus"></i></a> 
  </td> 
  


  </tr> 
</tbody>
<!--Table body-->
 </table>
 

</center>
		</div> 	
		
</template>


