import Swal  from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { Room } from './../../Models/Rooms';
import { RoomsService } from './../../services/rooms.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms:Room[]=[];
  nbrRoom:number;
  showSpinner:boolean=false;
  msgRoom:string;
  constructor(private titleService:Title,private _rs:RoomsService) { 
    this.titleService.setTitle("Les salles");
  }

  ngOnInit() {
    this.getAllRooms();
    
  }

  getAllRooms(){
    this.showSpinner=true;
    this._rs.getAllRooms().subscribe(
      (response)=>{
        if(response['status']){
          console.log(response);
          this.rooms=response['data'];
          this.nbrRoom=response['total'];
          this.showSpinner=false;
        }else{
          this.rooms=[];
          this.showSpinner=false;
          this.msgRoom="Aucune salle trouvée !";
        }
        this.showSpinner=false;
        this.msgRoom="Aucune salle trouvée !";
       
      },
      (error:any)=>{
        this.showSpinner=false;
        this.msgRoom="Aucune salle trouvée !";
       
        console.log(error);
      }
    )
  }
  
  onAddRoom(e){
    e.preventDefault();
    Swal.fire({
      title: 'Etes vous sûre?',
      text: "Voulez-vous ajouter cette Salle!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
      if (result.value) {
        this.showSpinner=true;
        const target=e.target;
        const nameRoom=target.querySelector('#roomName').value;
        const typeRoom=target.querySelector('#roomType').value;
        const townRoom=target.querySelector('#roomTown').value;
        const cityRoom=target.querySelector('#roomCity').value;
        const addrRoom=target.querySelector('#roomAdrr').value;
        const phoneRoom=target.querySelector("#roomPhone").value;
        const emailRoom=target.querySelector("#roomEmail").value;
        this._rs.addRoom(nameRoom,typeRoom,cityRoom,townRoom,addrRoom,phoneRoom,emailRoom).subscribe(
          
          (response:any)=>{
         
          if(response['status']){

            Swal.fire(
              'Ajouté!',
              'La salle a été ajouté.',
              'success'
            )
            this.showSpinner=false;
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:response['message'],
              footer: '<a href="#">Pourquoi cette erreur?</a>'
            })
            this.showSpinner=false;
          }
          this.getAllRooms();
          this.showSpinner=false;
          },
          (error:any)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:'Veuillez contacter votre administrateur',
              footer: '<a href="#">Pourquoi cette erreur?</a>'
            })
          alert("erreur reponse"+error);
          this.showSpinner=false;
        }
      );
       
      }
    })
    
//   console.info(matRoom+ " "+ nameRoom+ " "+dateNaissRoom+ " "+ jobRoom + " "+ telRoom+ " "+ emailRoom)
  }
  onDeleteRooms(datas){
    Swal.fire({
      title: 'Etes vous sûre?',
      text: "Voulez-vous supprimer "+datas['roomName']+ " !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
      if (result.value) {
        
        this._rs.delRoom(datas['roomCode']).subscribe(
           (response:any)=>{
            if(response['status']){ // status=true
              
              Swal.fire(
                'Supprimé',
                'La salle a été supprimé.',
                'success'
              )
              this.showSpinner=false;
              this.getAllRooms();
            }else{ // status=false
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:response['message'],
                footer: '<a href="#">Pourquoi cette erreur?</a>'
              })
              this.showSpinner=false;
            }
            this.showSpinner=false;
           },
           (error:any)=>{ //erreur
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:'Veuillez contacter votre administrateur',
              footer: '<a href="#">Pourquoi cette erreur?</a>'
            })
            alert("erreur reponse"+error);
            this.showSpinner=false;
          }
        );
        this.showSpinner=false;
      }
    })
  }


 
}
