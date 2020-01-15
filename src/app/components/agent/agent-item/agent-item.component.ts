import { Room } from './../../../Models/Rooms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from './../../../Models/Agents';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agent-item',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.css']
})
export class AgentItemComponent implements OnInit {
  @Input() agent:Agent; 
  @Input() rooms:Room[]=[];

  @Output() sendRequestToData=new EventEmitter(); // emmetteur d'evenement
  closeResult: string;
  setNameAgent:string;
  
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
    matAgent:new FormControl(''),
    nameAgent: new FormControl(''),
    roomAgent:new FormControl(''),
    birthAgent:new FormControl(''),
    jobAgent:new FormControl(''),
    phoneAgent: new FormControl(''),
    emailAgent:new FormControl('')
    
  });

  updateProfileAgent() {

    this.profileFormAgent.patchValue({
      matAgent:this.agent.agt_mat,
      nameAgent: this.agent.agt_name,
      roomAgent:this.agent.agt_room,
      birthAgent:this.agent.agt_date_birth,
      jobAgent:this.agent.agt_job,
      phoneAgent:this.agent.agt_phone,
      emailAgent:this.agent.agt_email,
    });
  }

  onSubmitForUpdate(){
    const formsValues=this.formGroup.value;
    console.info(formsValues['agentName']);
  }
  sendToEventForDeleteAgent(){ // envoie de l'emmetteur
    this.sendRequestToData.emit(
      {'agentCode':this.agent.agt_code,'agentName':this.agent.agt_name}
    );
  } 

//----------------------------------------------------------------------------
          //OUVERTURE MODALE POUR MODIFIER LES INFORMATION DE L'AGENT
//-----------------------------------------------------------------------------

  openModal(content) {
  
    this.updateProfileAgent();
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',size: 'lg'})
    .result.then((result) => {
      console.log(result);
      console.log(this.profileFormAgent.value['nameAgent']);
      this.closeResult = `Closed with: ${result}`;
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

}
