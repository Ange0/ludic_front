import  Swal  from 'sweetalert2';
import { RoomsService } from 'src/app/services/rooms.service';
import { Title } from '@angular/platform-browser';
import { CustomerService } from './../../services/customers.service';
import { Customer } from './../../Models/Customers';
import { Room } from './../../Models/Rooms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  nbrCustomer:number;
  rooms:Room[]=[];
  customers:Customer[]=[];
  //products:Product[]=[];
  showSpinner:boolean=false;
  showSpinnerForAddCustomer:boolean=false;
  msgCustomer:string;
  displayModal:string="none";
  constructor(private _cs:CustomerService,private titleService:Title,private _rs:RoomsService) { 
    this.titleService.setTitle("Customer");
  }

  ngOnInit() {
    
    this.getAllRooms();
    this.getAllCustomers();
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

  //ajout d'un client
  onAddCustomer(e){
    e.preventDefault();

    Swal.fire({
      title: 'Etes vous sûre?',
      text: "Voulez-vous ajouter cet Customer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
      if (result.value) {
        this.showSpinnerForAddCustomer=true
        const target=e.target
        const nameCustomer=target.querySelector('#nameCustomer').value;
        const nameRoom=target.querySelector("#nameRoom").value;
        const dateNaissCustomer=(target.querySelector('#dateNaissCustomer').value).split('-');
        var day=dateNaissCustomer[2];
        var month=dateNaissCustomer[1];
        var year=dateNaissCustomer[0];
        const nationCustomer=target.querySelector('#nationCustomer').value;
        const phoneCustomer=target.querySelector('#phoneCustomer').value;
        const emailCustomer=target.querySelector('#genderCustomer').value;
        const genderCustomer=target.querySelector('#emailCustomer').value;
        const typeCustomer=target.querySelector('#typeCustomer').value;
        const drinkCustomer=target.querySelector('#drinkCustomer').value;
        const smokeCustomer=target.querySelector('#smokeCustomer').value;
        const dietCustomer=target.querySelector('#dietCustomer').value;
        this.showSpinner=true;
        this._cs.addCustomer(nameCustomer,day+"/"+month+"/"+year,nationCustomer,nameRoom,phoneCustomer,genderCustomer,typeCustomer,dietCustomer,smokeCustomer,drinkCustomer).subscribe(
           (response:any)=>{
            if(response['status']){ // status=true
              
              Swal.fire(
                'Ajouté!',
                'Le client a été ajouté.',
                'success'
              )
              this.showSpinnerForAddCustomer=false;
             // this.getAllCustomers();
            }else{ // status=false
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:response['message'],
                footer: '<a href="#">Pourquoi cette erreur?</a>'
              })
              this.showSpinnerForAddCustomer=false;
            }
            this.showSpinnerForAddCustomer=false;
           },
           (error:any)=>{ //erreur
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:'Veuillez contacter votre administrateur',
              footer: '<a href="#">Pourquoi cette erreur?</a>'
            })
            alert("erreur reponse"+error);
            this.showSpinnerForAddCustomer=false;
          }
        );
        this.showSpinnerForAddCustomer=false;
      }
    })
  }

  onDeleteCustomer(datas){
    Swal.fire({
      title: 'Etes vous sûre?',
      text: "Voulez-vous supprimer "+datas['customerName']+ " !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
      if (result.value) {
        
        this._cs.delCustomer(datas['customerCode']).subscribe(
           (response:any)=>{
            if(response['status']){ // status=true
              
              Swal.fire(
                'Supprimé',
                'Le client a été supprimé.',
                'success'
              )
              this.showSpinnerForAddCustomer=false;
              this.getAllCustomers();
            }else{ // status=false
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:response['message'],
                footer: '<a href="#">Pourquoi cette erreur?</a>'
              })
              this.showSpinnerForAddCustomer=false;
            }
            this.showSpinnerForAddCustomer=false;
           },
           (error:any)=>{ //erreur
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:'Veuillez contacter votre administrateur',
              footer: '<a href="#">Pourquoi cette erreur?</a>'
            })
            alert("erreur reponse"+error);
            this.showSpinnerForAddCustomer=false;
          }
        );
        this.showSpinnerForAddCustomer=false;
      }
    })
  }

/*
  onUpdateCustomer(datas){
    console.info('yiii');
    this.displayModal="block"
  }
  */


  getAllCustomers(){
    this.showSpinner=true;
    this._cs.getAllCustomers().subscribe(
      (response)=>{
        console.log(response);
       if(response['status']){
        this.customers=response['data'];
        this.nbrCustomer=response['total'];
        this.showSpinner=false;
       }else{
        this.customers=[];
        this.showSpinner=false;
        this.msgCustomer="Aucun Client trouvé !";
       }
       this.showSpinner=false;
       this.msgCustomer="Aucun Client trouvé !";
      },
      (error:any)=>{
        this.showSpinner=false;
        this.msgCustomer="Aucun Client trouvé !";
        console.log('error');
      }
    )
    
  }
  
  

}