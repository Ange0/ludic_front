import { Agent } from './../../../Models/Agents';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agent-item',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.css']
})
export class AgentItemComponent implements OnInit {
  @Input() agent:Agent; 
  @Output() sendRequestToData=new EventEmitter(); // emmetteur d'evenement
  constructor() {}

  ngOnInit() {

  }
  sendToEventForDeleteAgent(){ // envoie de l'emmetteur
    this.sendRequestToData.emit(
      {'agentCode':this.agent.agt_code,'agentName':this.agent.agt_name}
    );
  }

}
