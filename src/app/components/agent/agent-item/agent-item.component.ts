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
  @Output() sendRequestToData=new EventEmitter(); // emmetteur d'evenement
  closeResult: string;
  setNameAgent:string;

  //nameAgent= new FormControl('');
  //nameAgent:string;
  formGroup:FormGroup;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder) {}

  ngOnInit() {
   
  }

  profileFormAgent = new FormGroup({
    nameAgent: new FormControl(''),
    
  });

  updateProfile() {

    this.profileFormAgent.patchValue({
      nameAgent: this.agent.agt_name,
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

  openModal(content) {
    //this.nameAgent.setValue(this.agent.agt_name);
    this.updateProfile();
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',size: 'lg'})
    .result.then((result) => {
      //alert(this.);
     // this.setNameAgent=this.nameAgent;
     //this.nameAgent.setValue(this.agent.agt_name);
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
