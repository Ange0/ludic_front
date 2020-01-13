import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from './../../../Models/Agents';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  nameAgent:string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {

  }
  sendToEventForDeleteAgent(){ // envoie de l'emmetteur
    this.sendRequestToData.emit(
      {'agentCode':this.agent.agt_code,'agentName':this.agent.agt_name}
    );
  }

  openModal(content) {
   
    console.log(this.agent.agt_name);
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',size: 'lg'})
    .result.then((result) => {
      this.setNameAgent=this.nameAgent;
      console.log(this.setNameAgent);
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
