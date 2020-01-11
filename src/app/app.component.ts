import { Component, NgModule, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2'
//declare const myTest:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'my-app';
  constructor(private titleService:Title){}

  setDocTitle(title:string){
    console.info("current title + "+this.titleService.getTitle());
    this.titleService.setTitle(title)
  }

  // onClick(){
  //   myTest();
  // }
  // showModal(){
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'Something went wrong!',
  //     footer: '<a href>Why do I have this issue?</a>'
  //   });
  // }
  
}
