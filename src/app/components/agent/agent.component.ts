import { AgentService } from './../../services/agent.service';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private _ags:AgentService) { }

  ngOnInit() {

  }
  onAddAgent(e){
    e.preventDefault();

    const target=e.target;
    
    const matAgent=target.querySelector('#matAgent').value;
    const nameAgent=target.querySelector('#nameAgent').value;
    const dateNaissAgent=target.querySelector('#dateNaissAgent').value;
    const jobAgent=target.querySelector('#jobAgent').value;
    const telAgent=target.querySelector('#telAgent').value;
    const emailAgent=target.querySelector('#emailAgent').value;
    this._ags.addAgent(matAgent,nameAgent,dateNaissAgent,jobAgent,telAgent,emailAgent).subscribe(
      (datas:any)=>{
      console.info(datas);
      },
      (error:any)=>{
        alert("erreur reponse"+error);
      }
    );
    console.info(matAgent+ " "+ nameAgent+ " "+dateNaissAgent+ " "+ jobAgent + " "+ telAgent+ " "+ emailAgent)
  }

}
