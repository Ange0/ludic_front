import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //server:string="";
  //headers:HttpHeaders;
  constructor(private http:HttpClient) {
    //   this.headers.append('enctype','multipart/form-data');
	  //  this.headers.append('Content-type','application/json');
	  //  this.headers.append('X-Requested-With','XMLHttpRequest');
    //  this.options=new RequestOptions({headers:this.headers});
    // const optionRequete={
    //   headers:new HttpHeaders({
    //     'Access-Control-Allow-Origin':'*',
        
    //   })
    // }
   }
  signIn(Pemail:string,Ppassword:string):Observable<any[]>
  {
    return this.http.post<any[]>("http://localhost/w-stock-mini/index.php/auth/login",{agentemail:Pemail,agentpass:Ppassword});
  }

}