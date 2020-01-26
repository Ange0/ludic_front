import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {
  emailUser:string;
  constructor(private router:Router,private cookie:CookieService) { }

  ngOnInit() {
    this.emailUser=this.cookie.get('email');
  }

  onSignOut(){
    this.router.navigateByUrl("/login");
  }

}
