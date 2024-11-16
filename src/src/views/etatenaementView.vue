<script  >
 import SideBare from '../components/SideBare.vue';
 import axios from 'axios';
 import URL from './config.js'
 
import docxtemplater from 'docxtemplater';
  import JSZip from 'jszip';
  import JSzipUtils from 'jszip-utils';
  import  saveAs  from 'file-saver';
export default {
  data() {
    return {
      item: {
        art:'',
num_marche:'',
montant_marchers: '',
lign:'',
yc_sav:'',
num_etat_engagemnt:'',
montant_credit_cp:'',
parg:'',
montant_credit_ce:''
       },
       URL:URL,
       success:false,
       eror:false,
    };
  },
  components:{
    SideBare,
  },
  methods: {
  
    getDoc() {
      this.createAndSaveDocument();
    },
    loadFile(url,callback){
        JSzipUtils.getBinaryContent(url,callback);
    },
   async createAndSaveDocument(){ 
    
        if(this.item != null){
           let   dataset = {"etat": this.item};
       console.log(this.item)
          this.loadFile('./etat_engagement.docx',function(error,content){
            if (error) { 
              throw error
            };
            let zip = new JSZip(content);
            let doc = new docxtemplater().loadZip(zip)
            if(dataset!=null){
            doc.setData(dataset)
          }else{
            getDoc();
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
  #FORM{
    /* float: right; */
    /* margin-left: 20%; */
    width: 50%;
  }
</style>
<template> 
<div   id="body-pd"  > 
   <SideBare />
   <h2 class="form-label" for="datatable-search-input"> 
Etat d'engagement
</h2>

	 
<center>   
   <div class="alert alert-success" role="alert" v-if="success">
    ce élément est ajouté avec succès
</div>
<div class="alert alert-danger" role="alert"  v-if="eror">
  ce élément n'est pas  ajouté  essaye une autre fois
</div> 
  <form @submit.prevent="addItem" id="FORM">
    
{{ this.item }}
    <div class="row">
        <div class="col">
<label> choisir le numero d'article  </label>
<br>
<select class="form-control" reuired="" v-model="item.art">
                                  <option selected="" value="" >N° Article</option>
                                    <option value="900">900</option>
                                    <option value="901">901</option>
                                    <option value="902">902</option>
                                    <option value="912">912</option>
                                                                     </select>
                                                                    </div>
<div class="col">
<label> Entrer le numéro de marché  </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num" placeholder="numéro de marché "  v-model="item.num_marche" required="">
</div>
 
</div>
<div class="row">
        <div class="col">
<label> choisir le numero de paragraphe  </label>
<br>
<select class="form-control" reuired="" v-model="item.parg">
   <option  selected="" value="" >N° Parg</option>
                                    <option value="10">10</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="50">50</option>
                                    <option value="51">51</option>
                                    <option value="60">60</option>
                                    <option value="61">61</option>
                                    <option value="71">71</option>
                                                                    </select></div>
<div class="col">
<label>Entrer le montant du marché</label>
<br>
<input type="number" class="form-control" aria-describedby="emailHelp"  placeholder="montant du marché" v-model="item.montant_marchers" required="">
</div>
 
</div>
<div class="row">
        <div class="col">
<label> choisir le numero de ligne  </label>
<br>
<select class="form-control" reuired="" name="lign" v-model="item.lign">
                             <option  selected="" value="" >N° Ligne</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="41">41</option>
                                                                    </select></div>
<div class="col">
<label> Entrer le montant du marché YC/ S.A.V  </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num" placeholder="montant du marché YC/ S.A.V " v-model="item.yc_sav" required="">
</div>
 
</div>
<div class="row">
        <div class="col">
<label>Entrer le numéro d'etat d'engagement</label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num" placeholder=" numéro d'etat d'engagement"  v-model="item.num_etat_engagemnt" required="">
</div>
<div class="col">
<label> Entrer le montant de crédit engagé (CP) </label>
<br>
<input type="number" class="form-control" aria-describedby="emailHelp" name="num"  placeholder="montant de crédit engagé (CP)"  v-model="item.montant_credit_cp" required="">
</div>
 
</div>
<div class="row">
        <div class="col">
<label> Entrer le montant de crédit engagé (CE)) </label>
<br>
<input type="text" class="form-control" aria-describedby="emailHelp" name="num" placeholder="CE" v-model="item.montant_credit_ce" required="">
</div>
 
</div>
 
<div class="row"> 
 
 </div><div class="row"> 
<div class="col"> 
<button   class="btn btn-light">Imprimer </button> 

</div>
</div>
 
 
 </form>

</center>
		</div> 	
		
</template>
