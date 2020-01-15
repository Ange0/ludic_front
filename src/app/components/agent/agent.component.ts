import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Room } from './../../Models/Rooms';


import { Title } from '@angular/platform-browser';
import { AgentService } from './../../services/agent.service';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomsService } from 'src/app/services/rooms.service';
import { Agent } from 'src/app/Models/Agents';




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
  dateNaissAgent:string;
  formGroup:FormGroup;
  constructor(private _ags:AgentService,private titleService:Title,private _rs:RoomsService) { 
    this.titleService.setTitle("Agent");
  }

  ngOnInit() {
    this.getAllRooms();
    this.getAllAgents();
  }

  getAllRooms(){
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
    this.showSpinner=true;
    this._ags.getAllAgents().subscribe(
     (response)=>{
         console.log(response);
        if(response['status']){
        this.agents=response['data'];
        this.nbrAgent=response['total'];
        this.showSpinner=false;
       }else{
        this.agents=[];
        this.showSpinner=false;
        this.msgAgent="Aucun Agent trouvé !";
       }
      this.showSpinner=false;
         this.msgAgent="Aucun Agent trouvé !";
       },
       (error:any)=>{
      this.showSpinner=false;
         this.msgAgent="Aucun Agent trouvé !";
       console.log('error');
       }
     )
    }

    onDeleteAgent(datas){
         Swal.fire({
          title: 'Etes vous sûre?',
        text: "Voulez-vous supprimer "+datas['agentName']+ " !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui,maintenant !'
        }).then((result) => {
           if (result.value) {
            
            this._ags.delAgent(datas['agentCode']).subscribe(
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
    
   //-----------------------------------------------

    // CREATION DU FORMULAIRE AVEC FORMGROUP

    //---------------------------------------------
    profileFormAgent = new FormGroup({
      matAgent:new FormControl(''),
      nameAgent: new FormControl(''),
      roomAgent:new FormControl(''),
      dateNaissAgent:new FormControl(''),
      jobAgent:new FormControl(''),
      phoneAgent: new FormControl(''),
      emailAgent:new FormControl('')
      
    });

  onAddAgent(){
    

    Swal.fire({
      title: 'Etes vous sûre?',
      text: "Voulez-vous ajouter cet Agent!",
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
          console.info(formsValues,this.dateNaissAgent);
          // console.info(formsValues['agentName']);
          //  console.log(formsValues['dateNaissAgent'],formsValues['agentName'],formsValues['nameRoom']);
          this.showSpinner=true;
           /*  this._ags.addAgent(matAgent,nameRoom,nameAgent,day+"/"+month+"/"+year,jobAgent,telAgent,emailAgent).subscribe(
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
           ); */
          this.showSpinnerForAddAgent=false;
      }
    })
  }
  
   

}
