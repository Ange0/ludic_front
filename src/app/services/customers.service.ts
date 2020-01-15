import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url:string="http://ludic.wikeotel.com/index.php/customer/";
  constructor(private cookie:CookieService,private http:HttpClient) { }
  
  addCustomer(PnameCustomer:string,PdateNaissCustomer:string,PnationCustomer:string,PnameRoom:string,PtelCustomer:string,PgenderCustomer:string,PtypeCustomer,PdietCustomer,PsmokeCustomer,PdrinkCustomer):Observable<any[]>{
   console.info(this.cookie.get('code')+" "+ this.cookie.get('room'));
    var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
    return this.http.post<any[]>(this.url+"addCustomer",{usercode:this.cookie.get('code'),name:PnameCustomer,datebirth:PdateNaissCustomer,nation:PnationCustomer,phone:PtelCustomer,room:PnameRoom,gender:PgenderCustomer,type:PtypeCustomer,diet:PdietCustomer,smoke:PsmokeCustomer,drink:PdrinkCustomer},{headers:reqHeaders});
  }
  
  getAllCustomers():Observable<any[]>{
    console.info(+" this.cookie.get('code')"+ this.cookie.get('room'));
    let parametres = new HttpParams({
      fromObject: {
          usercode: this.cookie.get('code'),
         
      }
    });
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')});
     return this.http.get<any[]>(this.url+"showCustomersList",{headers:reqHeaders,params:parametres});
   }

   delCustomer(PcodeCustomer:string):Observable<any[]>{
    console.info(this.cookie.get('code')+" "+ this.cookie.get('room'));
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')});
     return this.http.put<any[]>(this.url+"updateCustomerStatus",{usercode:this.cookie.get('code'),custcode:PcodeCustomer,status:105},{headers:reqHeaders});
   }

}

