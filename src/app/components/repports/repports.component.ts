import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/myStyles/js/jquery.min';

@Component({
  selector: 'app-repports',
  templateUrl: './repports.component.html',
  styleUrls: ['./repports.component.css']
})
export class RepportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(()=>{
        $("#jquery").click(function(){
          alert("Salut Jquery");
        });
    });
  }


}
