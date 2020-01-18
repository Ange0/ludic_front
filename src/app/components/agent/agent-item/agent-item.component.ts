import { Room } from './../../../Models/Rooms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from './../../../Models/Agents';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-item',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.css']
})
export class AgentItemComponent implements OnInit {
  @Input() agent:Agent; 
  @Input() rooms:Room[]=[];
  

  @Output() sendRequestToData=new EventEmitter(); // emmetteur d'evenement
  @Output() sendRequestToDataForUpdate=new EventEmitter();
  @Output() sendRequestToDataForIn=new EventEmitter();
  @Output() sendRequestToDataForOut=new EventEmitter();
  closeResult: string;
  setNameAgent:string;
  dateNaissAgent:string;
  
  //nameAgent= new FormControl('');
  //nameAgent:string;
  formGroup:FormGroup;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder) {}

  ngOnInit() {
    
    console.log(this.rooms);
  
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
    dateNaissAgent:new FormControl('',[
      Validators.required,
     
      ]),
    jobAgent:new FormControl(''),
    phoneAgent: new FormControl(''),
    emailAgent:new FormControl(''),
    
  });

  updateProfileAgent() {

    this.profileFormAgent.patchValue({
      matAgent:this.agent.agt_mat,
      nameAgent: this.agent.agt_name,
      roomAgent:this.agent.agt_room,
      dateNaissAgent:this.agent.agt_date_birth,
      jobAgent:this.agent.agt_job,
      phoneAgent:this.agent.agt_phone,
      emailAgent:this.agent.agt_email,
    });
    console.info(this.profileFormAgent.get('dateNaissAgent').value);
    this.dateNaissAgent=this.agent.agt_date_birth;
    
    
  }

 

  sendToEventForDeleteAgent(){ // envoie de l'emmetteur
    this.sendRequestToData.emit(
      {'codeAgent':this.agent.agt_code,'nameAgent':this.agent.agt_name}
    );
  } 

  sendToEventForInAgent(){ // envoie de l'emmetteur
    this.sendRequestToDataForIn.emit(
      {'codeAgent':this.agent.agt_code,'nameAgent':this.agent.agt_name}
    );
  } 

  sendToEventForOutAgent(){ // envoie de l'emmetteur
  this.sendRequestToDataForOut.emit(
    {'codeAgent':this.agent.agt_code,'nameAgent':this.agent.agt_name}
  );
} 

//----------------------------------------------------------------------------
          //OUVERTURE MODALE POUR MODIFIER LES INFORMATION DE L'AGENT
//-----------------------------------------------------------------------------

  openModal(content) {
   
    this.updateProfileAgent();
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result);
      console.log(this.profileFormAgent.value['matAgent']);
      console.log(this.jjmmaaaa());

      this.sendRequestToDataForUpdate.emit(
        {'matAgent':this.profileFormAgent.value['matAgent'],'codeAgent':this.agent.agt_code,'nameAgent':this.profileFormAgent.value['nameAgent'],roomAgent:this.profileFormAgent.value['roomAgent'],dateNaissAgent:this.jjmmaaaa(),jobAgent:this.profileFormAgent.value['jobAgent'],phoneAgent:this.profileFormAgent.value['phoneAgent'],emailAgent:this.profileFormAgent.value['emailAgent']}
      );
    },
     (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  jjmmaaaa(){
    const Pdate=(this.profileFormAgent.value["dateNaissAgent"]).split('-');
    const day=Pdate[2];
    const month=Pdate[1];
    const year=Pdate[0];
    return day+"/"+month+"/"+year;
  }

}
