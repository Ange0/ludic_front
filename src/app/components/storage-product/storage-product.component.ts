import { Product } from './../../Models/products';
import { ProductService } from './../../services/product.service';

import { RoomsService } from 'src/app/services/rooms.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from './../../Models/Rooms';
import { StorageProductService } from './../../services/storage-product.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AgentService } from './../../services/agent.service';
import Swal  from 'sweetalert2';
import { Stock } from 'src/app/Models/Stocks';



@Component({
  selector: 'app-storage-product',
  templateUrl: './storage-product.component.html',
  styleUrls: ['./storage-product.component.css']
})
export class StorageProductComponent implements OnInit {

  nbrStock:number;
  rooms:Room[]=[];
  products:Product[]=[];
  listProdLocaux=[];
  listProdToSendOnServeur:any[]=[];
  listProdToSendOnServeurr:string;
  listProdTemoin:any[]=[];
  Stocks:Stock[]=[];
  showSpinner:boolean=false;
  showSpinnerForAddStock:boolean=false;
  msgStock:string;
  dateNaissStock=new Date();
  formGroup:FormGroup;
  constructor(private titleService:Title,private _rs:RoomsService,private _ss:StorageProductService,private _ps:ProductService) { 
    this.titleService.setTitle("Stock");
  }

  ngOnInit() {
   /*  this.getAllRooms();
    this.getAllStocks(); */
    this.getAllRoomsForStock();
    this.getAllProductsForStock();
   
  }
  //-----------------------------------------------

    // CREATION DU FORMULAIRE AVEC FORMGROUP

    //---------------------------------------------
    profileFormStock= new FormGroup({
     
        roomStock: new FormControl('',[
            Validators.required
        ]),
        dateStock :new FormControl('',
        [
        Validators.required,
        Validators.maxLength(10),
        ]),
        codeProduct:new FormControl('',
            [
              Validators.required,
            ]
         ),
         qteProduct:new FormControl('',
            [
              Validators.required
            ]
         )
      
    });

    getAllRoomsForStock(){
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
    getAllProductsForStock(){
      this._ps.getAllProducts().subscribe(
        (response)=>{
          if(response['status']){
            console.log(response);
            this.products=response['data'];
          
          }else{
           
          }
        
        },
        (error:any)=>{
          console.log(error);
        }
      )

    }
/*         //---------------------------------------------
    profileFormSearchStock= new FormGroup({
      searchStock:new FormControl(''),  
    });
     */
/* 
  onSearchStock(){
  
    console.log(this.profileFormSearchStock.value['searchStock']);
    const criteria=this.profileFormSearchStock.value['searchStock'];
    if(criteria!=""){
      console.info("super!");
      this._ags.searchStocks(criteria).subscribe(
        (response)=>{
            if(response['status']){
              this.Stocks=response['data'];
            }else{
               this.Stocks=[];
            }
        }
      )

    }else{
      console.error("bad");
      this.getAllStocks();
    }
  } */
 
  
  /* getAllRooms(){
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
 */
 /*  getAllStocks(){
    this.showSpinnerForAddStock=true;
    this._ags.getAllStocks().subscribe(
     (response)=>{
         console.log(response);
        if(response['status']){
            this.Stocks=response['data'];
            this.nbrStock=response['total'];
            this.showSpinnerForAddStock=false;
       }else{
            this.Stocks=[];
            this.showSpinnerForAddStock=false;
            this.msgStock="Aucun Stocktrouvé !";
       }
      this.showSpinnerForAddStock=false;
         this.msgStock="Aucun Stocktrouvé !";
       },
       (error:any)=>{
      this.showSpinnerForAddStock=false;
         this.msgStock="Aucun Stocktrouvé !";
       console.log('error');
       }
     )
  } */

  onAddStock(){
    Swal.fire({
      title: 'Etes vous sûre?',
      text: "Voulez-vous confirmer ce reaprovisionnement !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
      if (result.value) {
        this.showSpinnerForAddStock=true
        // const target=e.target
        // const matStock=target.querySelector('#matStock').value;
        // const nameStock=target.querySelector('#nameStock').value;
        // const nameRoom=target.querySelector("#nameRoom").value;
        // const dateNaissStock=(target.querySelector('#dateNaissStock').value).split('-');
        // // var day=dateNaissStock[2];
        // // var month=dateNaissStock[1];
        // // var year=dateNaissStock[0];
        // const jobStock=target.querySelector('#jobStock').value;
        // const telStock=target.querySelector('#telStock').value;
        // const emailStock=target.querySelector('#emailStock').value;



        
          const formsValues=this.profileFormStock.value;
          this.showSpinnerForAddStock=false;
         // console.info(this.convertDate(formsValues['dateNaissStock']))
         console.info(formsValues['roomStock']);
             this._ss.addInStock(formsValues['roomStock'],this.listProdToSendOnServeurr,this.convertDate(formsValues['dateStock'])).subscribe(
             (response:any)=>{
              if(response['status']){ // status=true
              
               Swal.fire(
                  'Ajouté!',
                 'L\'Stocka été ajouté.',
                 'success'
                )
              
              this.showSpinnerForAddStock=false;
           //  this.getAllStocks();
             
              }else{ // status=false
             Swal.fire({
                icon: 'error',
                title: 'Oops...',
                 text:response['message'],
                 footer: '<a href="#">Pourquoi cette erreur?</a>'
               })
               this.showSpinnerForAddStock=false;
             }
           this.showSpinnerForAddStock=false;
             },
            (error:any)=>{ //erreur
             Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text:'Veuillez contacter votre administrateur',
               footer: '<a href="#">Pourquoi cette erreur?</a>'
             })
             alert("erreur reponse"+error);
             this.showSpinnerForAddStock=false;
            }
           ); 
          this.showSpinnerForAddStock=false;
      }
    })
  } 
 /*  onUpdateStock(datas){
    Swal.fire({
      title: 'Etes vous sûre?',
    text: "Voulez-vous modifier "+datas['StockName']+ " !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,maintenant !'
    }).then((result) => {
       if (result.value) {
        
        this._ags.updateStock(datas['matStock'],datas['codeStock'],datas['roomStock'],datas['nameStock'],datas['dateNaissStock'],datas['jobStock'],datas['phoneStock'],datas['emailStock']).subscribe(
           (response:any)=>{
            if(response['status']){ // status=true
              
              Swal.fire(
               'Modifié',
               'L\'Stocka été modifié.',
                'success'
              )
            this.showSpinnerForAddStock=false;
              this.getAllStocks();
            }else{ // status=false
             Swal.fire({
               icon: 'error',
             title: 'Oops...',
               text:response['message'],
               footer: '<a href="#">Pourquoi cette erreur?</a>'
              })
                  this.showSpinnerForAddStock=false;
            }
            this.showSpinnerForAddStock=false;
           },
           (error:any)=>{ //erreur
          Swal.fire({
                icon: 'error',
               title: 'Oops...',
             text:'Veuillez contacter votre administrateur',
              footer: '<a href="#">Pourquoi cette erreur?</a>'
             })
            alert("erreur reponse"+error);
           this.showSpinnerForAddStock=false;
            }
         );
        this.showSpinnerForAddStock=false;
        }
    })
  } */
 /*  onDeleteStock(datas){
         Swal.fire({
          title: 'Etes vous sûre?',
        text: "Voulez-vous supprimer "+datas['nameStock']+ " !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui,maintenant !'
        }).then((result) => {
           if (result.value) {
            this.showSpinnerForAddStock=true;
            this._ags.delStock(datas['codeStock']).subscribe(
               (response:any)=>{
                if(response['status']){ // status=true
                  
                  Swal.fire(
                   'Supprimé',
                   'L\'Stocka été supprimé.',
                    'success'
                  )
                this.showSpinnerForAddStock=false;
                  this.getAllStocks();
                }else{ // status=false
                 Swal.fire({
                   icon: 'error',
                 title: 'Oops...',
                   text:response['message'],
                   footer: '<a href="#">Pourquoi cette erreur?</a>'
                  })
                      this.showSpinnerForAddStock=false;
                }
                this.showSpinnerForAddStock=false;
               },
               (error:any)=>{ //erreur
              Swal.fire({
                    icon: 'error',
                   title: 'Oops...',
                 text:'Veuillez contacter votre administrateur',
                  footer: '<a href="#">Pourquoi cette erreur?</a>'
                 })
                alert("erreur reponse"+error);
               this.showSpinnerForAddStock=false;
                }
             );
            this.showSpinnerForAddStock=false;
            }
        })
  } */
    


/* onOutStock(datas){
   Swal.fire({
    title: 'Etes vous sûre?',
  text: "Voulez-vous pointer la sortie de  "+datas['nameStock']+ " !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui,maintenant !'
  }).then((result) => {
     if (result.value) {
      this.showSpinnerForAddStock=true;
      this._ags.outStock(datas['codeStock']).subscribe(
         (response:any)=>{
          if(response['status']){ // status=true
            
            Swal.fire(
             'Sortie',
             'la sortie  de '+datas['nameStock']+'a été effectuée .',
              'success'
            )
          this.showSpinnerForAddStock=false;
            this.getAllStocks();
          }else{ // status=false
           Swal.fire({
             icon: 'error',
           title: 'Oops...',
             text:response['message'],
             footer: '<a href="#">Pourquoi cette erreur?</a>'
            })
                this.showSpinnerForAddStock=false;
          }
          this.showSpinnerForAddStock=false;
         },
         (error:any)=>{ //erreur
        Swal.fire({
              icon: 'error',
             title: 'Oops...',
           text:'Veuillez contacter votre administrateur',
            footer: '<a href="#">Pourquoi cette erreur?</a>'
           })
          alert("erreur reponse"+error);
         this.showSpinnerForAddStock=false;
          }
       );
      this.showSpinnerForAddStock=false;
      }
  })
} */

    addProduct(){
      const formsValues=this.profileFormStock.value;
      const codeProduct=formsValues['codeProduct'];
      const qteProduct=formsValues['qteProduct'];
      console.log(codeProduct+ "fghjk "+ qteProduct);
      
    /*   console.info(this.listProdLocaux);
     if(this.listProdLocaux.find(x => x.name==codeProduct)){
       // this.listProdLocaux.push({qte:qteProduct});
        this.listProdLocaux.splice(codeProduct,1);
        console.log('wep ');
      }else{
        console.info('no');
        this.listProdLocaux.push({"name":codeProduct,qte:qteProduct});
      }  */
     /* $ */
      

      console.info(codeProduct);
      if(qteProduct!="" && codeProduct!=""){ // verifiaction du code et de la quantité
        for(var i in this.products){ // parcour du tableau de produit
         console.info(this.products[i]['prod_name']);
         const codeProductSearch= this.products[i]['prod_code']; // recuperation du code produit
         console.log(codeProductSearch);
        
         if(codeProductSearch==codeProduct){ // verification du code depuis le tamplate au niveau du tableau des local des produit
          var index=this.listProdTemoin.indexOf(codeProduct);
          console.info(this.listProdTemoin);
            if(index > -1){ // verification de l'existance d'un produit dejà selectionné
              console.log("trouvee");
              var obj = {};
              obj["name"] =this.products[i]['prod_name'];
              obj["qte"] = qteProduct;
              this.listProdLocaux.splice(index,1,obj);
              this.listProdToSendOnServeur.splice(index,1,codeProduct+"="+qteProduct);
              console.log(this.listProdLocaux);
              console.info("Server:"+this.listProdToSendOnServeur);
              break
            }else{
              console.log("Pas trouvee");
              //this.listProdToSendOnServeur.push(codeProduct);
              var obj = {};
              obj["name"] =this.products[i]['prod_name'];
              obj["qte"] = qteProduct;
              this.listProdLocaux.push(obj);
              this.listProdToSendOnServeur.push(codeProduct+"="+qteProduct);
              this.listProdTemoin.push(codeProduct);
              console.log(this.listProdLocaux);
             
              this.listProdToSendOnServeurr=this.listProdToSendOnServeur.join("=");
              console.info("Server:"+this.listProdToSendOnServeurr);

              break
            }
            
          }
           
        } 
      }else{
        console.log("veuillez remplir correctement ");
      }
      
    
    /* nietos.push(obj);
     console.info(nietos[0]); */
     /*  if(index > -1){ //si tu trouve le produit
        this.listProdToSendOnServeur.splice(index,1,codeProduct+"="+qteProduct);
        console.log(this.listProdToSendOnServeur);
        console.log(this.products);
        
        }else{ // si  tu n'a pas trouvé le produit
        this.listProdToSendOnServeur.push(codeProduct+"="+qteProduct); 
        console.log(this.listProdToSendOnServeur);
        this.listProdLocaux.push(codeProduct);
      } */

    }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth,date.getFullYear() ].join("/");
  }
 
  
   
}
