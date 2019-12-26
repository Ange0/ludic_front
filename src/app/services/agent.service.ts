import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private cookie:CookieService,private http:HttpClient) { }

  addAgent(PmatAgent:string,PnameAgent:string,PdateNaissAgent:string,PjobAgent:string,PtelAgent:string,PemailAgent:string):Observable<any[]>{
   var reqHeaders= new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Authorization': ' Bearer ' +this.cookie.get('token')})
    return this.http.post<any[]>("http://localhost/w-stock-mini/index.php/agent/addagent",{usercode:this.cookie.get('code'),matricule:PmatAgent,name:PnameAgent,datebirth:PdateNaissAgent,job:PjobAgent,phone:PtelAgent,email:PemailAgent,roomcode:this.cookie.get('room')},{headers:reqHeaders});
  }
}
