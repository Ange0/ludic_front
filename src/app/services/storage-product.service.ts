import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageProductService {
  /*  url:string="http://ludic.wikeotel.com/index.php/agent/"; */
  url:string=" http://localhost/w-stock-mini/index.php/stock/"
  constructor(private cookie:CookieService,private http:HttpClient) { }

  showStocks():Observable<any[]>{
    return 
  }

  addInStock(ProomCode:string,PstockList:string,PstockDate):Observable<any[]>{
    console.info(this.cookie.get('code')+" "+ this.cookie.get('room'));
    var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
    return this.http.post<any[]>(this.url+"inStock",{usercode:this.cookie.get('code'),roomcode:ProomCode,stocklist:PstockList,stockdate:PstockDate},{headers:reqHeaders});
  }
}
