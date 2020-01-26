import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string="http://localhost/w-stock-mini/index.php/product/";
  /*  url:string="http://ludic.wikeotel.com/index.php/room/"; */
  constructor(private cookie:CookieService,private http:HttpClient) { }
  getAllProducts():Observable<any[]>{
    console.info(+" this.cookie.get('code')"+ this.cookie.get('room'));
    let parametres = new HttpParams({
      fromObject: {
          usercode: this.cookie.get('code'),
         
      }
    });
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
     return this.http.get<any[]>(this.url+"showProducts",{headers:reqHeaders,params:parametres});
   }

  
}
