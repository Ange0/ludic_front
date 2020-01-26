import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Room } from './../../Models/Rooms';


import { Title } from '@angular/platform-browser';
import { AgentService } from './../../services/agent.service';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomsService } from 'src/app/services/rooms.service';
import { Agent } from 'src/app/Models/Agents';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  nbrAgent:number;
  rooms:Room[]=[];
  agents:Agent[]=[];
  showSpinner:boolean=false;
  showSpinnerForAddAgent:boolean=false;
  msgAgent:string;
  dateNaissAgent=new Date();
  formGroup:FormGroup;
  constructor(private _ags:AgentService,private titleService:Title,private _rs:RoomsService) { 
    this.titleService.setTitle("Agent");
  }

  ngOnInit() {
    this.getAllRoomsForAgent();
    this.getAllAgents();
   
  }
  //-----------------------------------------------

    // CREATION DU FORMULAIRE AVEC FORMGROUP

    //---------------------------------------------
    profileFormAgent = new FormGroup({
      matAgent:new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      ]),
      nameAgent: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        ]),
      roomAgent:new FormControl(''),
      dateNaissAgent:new FormControl('',
      [
        Validators.required,
        Validators.maxLength(10),
        ]),
      jobAgent:new FormControl(''),
      phoneAgent: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        ]),
      emailAgent:new FormControl('')
      
    });

        //---------------------------------------------
    profileFormSearchAgent = new FormGroup({
      searchAgent:new FormControl(''),  
    });
    

  onSearchAgent(){
  
    console.log(this.profileFormSearchAgent.value['searchAgent']);
    const criteria=this.profileFormSearchAgent.value['searchAgent'];
    if(criteria!=""){
      console.info("super!");
      this._ags.searchAgents(criteria).subscribe(
        (response)=>{
            if(response['status']){
              this.agents=response['data'];
            }else{
               this.agents=[];
            }
        }
      )

    }else{
      console.error("bad");
      this.getAllAgents();
    }
  }
 
  
  getAllRoomsForAgent(){
    this._rs.getAllRooms().subscribe(
      (response)=>{
        if(response['status']){
          console.log(response);
          this.rooms=response['data'];
        
        }else{
         
        }
        
      
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }

  getAllAgents(){
    this.showSpinnerForAddAgent=true;
    this._ags.getAllAgents().subscribe(
     (response)=>{
         console.log(response);
        if(response['status']){
            this.agents=response['data'];
            this.nbrAgent=response['total'];
            this.showSpinnerForAddAgent=false;
       }else{
            this.agents=[];
            this.showSpinnerForAddAgent=false;
            this.msgAgent="Aucun Agent trouvé !";
       }
      this.showSpinnerForAddAgent=false;
         this.msgAgent="Aucun Agent trouvé !";
       },
       (error:any)=>{
      this.showSpinnerForAddAgent=false;
         this.msgAgent="Aucun Agent trouvé !";
       console.log('error');
       }
     )
  }

  onAddAgent(){
    Swal.fire({
      title: 'Etes vous sûre?',
      text: "Voulez-vous Modifier cet Agent!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
      if (result.value) {
        this.showSpinnerForAddAgent=true
        // const target=e.target
        // const matAgent=target.querySelector('#matAgent').value;
        // const nameAgent=target.querySelector('#nameAgent').value;
        // const nameRoom=target.querySelector("#nameRoom").value;
        // const dateNaissAgent=(target.querySelector('#dateNaissAgent').value).split('-');
        // // var day=dateNaissAgent[2];
        // // var month=dateNaissAgent[1];
        // // var year=dateNaissAgent[0];
        // const jobAgent=target.querySelector('#jobAgent').value;
        // const telAgent=target.querySelector('#telAgent').value;
        // const emailAgent=target.querySelector('#emailAgent').value;



        
          const formsValues=this.profileFormAgent.value;
         // console.info(formsValues,this.convertToDate(this.dateNaissAgent));
          // console.info(formsValues['agentName']);
          //  console.log(formsValues['dateNaissAgent'],formsValues['agentName'],formsValues['nameRoom']);
          this.showSpinnerForAddAgent=false;
         // console.info(this.convertDate(formsValues['dateNaissAgent']))
            this._ags.addAgent(formsValues['matAgent'],formsValues['roomAgent'],formsValues['nameAgent'],this.convertDate(formsValues['dateNaissAgent']),formsValues['jobAgent'],formsValues['phoneAgent'],formsValues['emailAgent']).subscribe(
             (response:any)=>{
              if(response['status']){ // status=true
              
               Swal.fire(
                  'Ajouté!',
                 'L\'agent a été ajouté.',
                 'success'
                )
              
              this.showSpinnerForAddAgent=false;
             this.getAllAgents();
             
              }else{ // status=false
             Swal.fire({
                icon: 'error',
                title: 'Oops...',
                 text:response['message'],
                 footer: '<a href="#">Pourquoi cette erreur?</a>'
               })
               this.showSpinnerForAddAgent=false;
             }
           this.showSpinnerForAddAgent=false;
             },
            (error:any)=>{ //erreur
             Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text:'Veuillez contacter votre administrateur',
               footer: '<a href="#">Pourquoi cette erreur?</a>'
             })
             alert("erreur reponse"+error);
             this.showSpinnerForAddAgent=false;
            }
           );
          this.showSpinnerForAddAgent=false;
      }
    })
  }
  onUpdateAgent(datas){
    Swal.fire({
      title: 'Etes vous sûre?',
    text: "Voulez-vous modifier "+datas['agentName']+ " !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
       if (result.value) {
        
        this._ags.updateAgent(datas['matAgent'],datas['codeAgent'],datas['roomAgent'],datas['nameAgent'],datas['dateNaissAgent'],datas['jobAgent'],datas['phoneAgent'],datas['emailAgent']).subscribe(
           (response:any)=>{
            if(response['status']){ // status=true
              
              Swal.fire(
               'Modifié',
               'L\'agent a été modifié.',
                'success'
              )
            this.showSpinnerForAddAgent=false;
              this.getAllAgents();
            }else{ // status=false
             Swal.fire({
               icon: 'error',
             title: 'Oops...',
               text:response['message'],
               footer: '<a href="#">Pourquoi cette erreur?</a>'
              })
                  this.showSpinnerForAddAgent=false;
            }
            this.showSpinnerForAddAgent=false;
           },
           (error:any)=>{ //erreur
          Swal.fire({
                icon: 'error',
               title: 'Oops...',
             text:'Veuillez contacter votre administrateur',
              footer: '<a href="#">Pourquoi cette erreur?</a>'
             })
            alert("erreur reponse"+error);
           this.showSpinnerForAddAgent=false;
            }
         );
        this.showSpinnerForAddAgent=false;
        }
    })
  }
  onDeleteAgent(datas){
         Swal.fire({
          title: 'Etes vous sûre?',
        text: "Voulez-vous supprimer "+datas['nameAgent']+ " !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui,maintenant !'
        }).then((result) => {
           if (result.value) {
            this.showSpinnerForAddAgent=true;
            this._ags.delAgent(datas['codeAgent']).subscribe(
               (response:any)=>{
                if(response['status']){ // status=true
                  
                  Swal.fire(
                   'Supprimé',
                   'L\'agent a été supprimé.',
                    'success'
                  )
                this.showSpinnerForAddAgent=false;
                  this.getAllAgents();
                }else{ // status=false
                 Swal.fire({
                   icon: 'error',
                 title: 'Oops...',
                   text:response['message'],
                   footer: '<a href="#">Pourquoi cette erreur?</a>'
                  })
                      this.showSpinnerForAddAgent=false;
                }
                this.showSpinnerForAddAgent=false;
               },
               (error:any)=>{ //erreur
              Swal.fire({
                    icon: 'error',
                   title: 'Oops...',
                 text:'Veuillez contacter votre administrateur',
                  footer: '<a href="#">Pourquoi cette erreur?</a>'
                 })
                alert("erreur reponse"+error);
               this.showSpinnerForAddAgent=false;
                }
             );
            this.showSpinnerForAddAgent=false;
            }
        })
  }
    
  onInAgent(datas){
       Swal.fire({
        title: 'Etes vous sûre?',
      text: "Voulez-vous poiter l'entrée de  "+datas['nameAgent']+ " !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui,maintenant !'
      }).then((result) => {
         if (result.value) {
          this.showSpinnerForAddAgent=true;
          this._ags.inAgent(datas['codeAgent']).subscribe(
             (response:any)=>{
              if(response['status']){ // status=true
                
                Swal.fire(
                 'Entrée',
                 'L\' entrée de '+datas['nameAgent']+' a été effectué',
                  'success'
                )
              this.showSpinnerForAddAgent=false;
                this.getAllAgents();
              }else{ // status=false
               Swal.fire({
                 icon: 'error',
               title: 'Oops...',
                 text:response['message'],
                 footer: '<a href="#">Pourquoi cette erreur?</a>'
                })
                    this.showSpinnerForAddAgent=false;
              }
              this.showSpinnerForAddAgent=false;
             },
             (error:any)=>{ //erreur
            Swal.fire({
                  icon: 'error',
                 title: 'Oops...',
               text:'Veuillez contacter votre administrateur',
                footer: '<a href="#">Pourquoi cette erreur?</a>'
               })
              alert("erreur reponse"+error);
             this.showSpinnerForAddAgent=false;
              }
           );
          this.showSpinnerForAddAgent=false;
          }
      })
  }

onOutAgent(datas){
   Swal.fire({
    title: 'Etes vous sûre?',
  text: "Voulez-vous pointer la sortie de  "+datas['nameAgent']+ " !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui,maintenant !'
  }).then((result) => {
     if (result.value) {
      this.showSpinnerForAddAgent=true;
      this._ags.outAgent(datas['codeAgent']).subscribe(
         (response:any)=>{
          if(response['status']){ // status=true
            
            Swal.fire(
             'Sortie',
             'la sortie  de '+datas['nameAgent']+'a été effectuée .',
              'success'
            )
          this.showSpinnerForAddAgent=false;
            this.getAllAgents();
          }else{ // status=false
           Swal.fire({
             icon: 'error',
           title: 'Oops...',
             text:response['message'],
             footer: '<a href="#">Pourquoi cette erreur?</a>'
            })
                this.showSpinnerForAddAgent=false;
          }
          this.showSpinnerForAddAgent=false;
         },
         (error:any)=>{ //erreur
        Swal.fire({
              icon: 'error',
             title: 'Oops...',
           text:'Veuillez contacter votre administrateur',
            footer: '<a href="#">Pourquoi cette erreur?</a>'
           })
          alert("erreur reponse"+error);
         this.showSpinnerForAddAgent=false;
          }
       );
      this.showSpinnerForAddAgent=false;
      }
  })
}

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth,date.getFullYear() ].join("/");
  }
 
  
   

}
