import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/loginView.vue'
import offresView from '../views/offresView.vue'
import avisView from '../views/avisView.vue'
import CPSView from '../views/CPSView.vue'
import convocationView from '../views/convocationView.vue'
import decisionView from '../views/decisionView.vue'
import journauxView from '../views/journauxView.vue'
import juryView from '../views/juryView.vue'
import processverbalView from '../views/processverbalView.vue'
import reglementView from '../views/reglementView.vue'
import userView from '../views/userView.vue'
import ajouteroffreView from '../views/ajouteroffreView.vue'
import ajouteruserView from '../views/ajouteruserView.vue'
import EditoffreView from '../views/editoffreView.vue'
import ajouterjurieView from '../views/ajouterjurieView.vue'
import AjouterjournalView from '../views/AjouterjournalView.vue'
 import AjouteravisView  from '../views/AjouteravisView.vue'
 import AjouterdesicionView  from '../views/AjouterdesicionView.vue'
 import concurentsVIew  from '../views/concurentsVIew.vue'
 import Ajouterconcurent_listView  from '../views/Ajouterconcurent_listView.vue'
 import etatenaementView  from '../views/etatenaementView.vue'
 import Ajouterprocessveerball_unView  from '../views/Ajouterprocessveerball_unView.vue'
 import Ajouterpv2View  from '../views/Ajouterpv2View.vue'
 import AjouterpvtroisView  from '../views/AjouterpvtroisView.vue'
 import editconcurrentlistView  from '../views/editconcurrentlistView.vue'
 import editjuryView  from '../views/editjuryView.vue'
import editjournalView from '../views/editjournalView.vue'
import edituserView from '../views/edituserView.vue'
import editavis from '../views/editavis.vue'
 
 const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: loginView
    }, {
      path: '/offres',
      name: 'offres',
      component: offresView
    },{
      path: '/ajouteroffre',
      name: 'ajouteroffre',
      component: ajouteroffreView
    },{
      path: '/editoffre/:id',
      name: 'editoffre',
      component: EditoffreView
    },{
      path: '/ajouteruser',
      name: 'ajouteruser',
      component: ajouteruserView
    },{
      path: '/avis',
      name: 'avis',
      component: avisView
    },
    {
      path: '/editavis/:id',
      name: 'editavis',
      component: editavis
    },{
      path: '/Ajouteravi',
      name: 'Ajouteravi',
      component: AjouteravisView
    },{
      path: '/CPS',
      name: 'CPS',
      component: CPSView
    },{
      path: '/Convocation',
      name: 'Convocation',
      component: convocationView
    },{
      path: '/journaux',
      name: 'journaux',
      component: journauxView
    },{
      path: '/concurents',
      name: 'concurents',
      component: concurentsVIew
    },{
      path: '/ajouterconcurent_list',
      name: 'ajouterconcurent_list',
      component: Ajouterconcurent_listView
    },{
      path: '/editerconcurent_list/:id',
      name: 'editerconcurent_list',
      component: editconcurrentlistView
    },
     {
      path: '/ajouterjournal',
      name: 'ajouterjournal',
      component: AjouterjournalView
    },
    {
      path: '/editjournal/:id',
      name: 'editjournal',
      component: editjournalView
    },
    {
      path: '/decision',
      name: 'decision',
      component: decisionView
    },{
      path: '/Ajouterdesicion',
      name: 'Ajouterdesicion',
      component: AjouterdesicionView
    },{
      path: '/jury',
      name: 'jury',
      component: juryView
    },{
      path: '/ajouterjurie',
      name: 'ajouterjurie',
      component: ajouterjurieView
    },
    {
      path: '/editjury/:id',
      name: 'editjury',
      component:  editjuryView
    },{
      path: '/processverbal',
      name: 'processverbal',
      component: processverbalView
    },{
      path: '/Ajouterpv_un',
      name: 'Ajouterpv_un',
      component: Ajouterprocessveerball_unView
    },{
      path: '/Ajouterpv_deux/:idoffre/:idavis/:pv_un',
      name: 'Ajouterpv_deux/:idoffre/:idavis/:pv_un',
      component: Ajouterpv2View
    },{
      path: '/Ajouterpv_trois/:idoffre/:idavis/:pv_deux',
      name: 'Ajouterpv_trois/:idoffre/:idavis/:pv_deux',
      component: AjouterpvtroisView
    },{
      path: '/reglement',
      name: 'reglement',
      component: reglementView
    },{
      path: '/etatenaement',
      name: 'etatenaement',
      component: etatenaementView
    },
    {
      path: '/user',
      name: 'user',
      component: userView
    },
    {
      path: '/edituser/:id',
      name: 'edituser',
      component: edituserView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
