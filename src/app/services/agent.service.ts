import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  url:string="http://localhost/w-stock-mini/index.php/agent/";
  constructor(private cookie:CookieService,private http:HttpClient) { }
  
  addAgent(PmatAgent:string,PnameRoom:string,PnameAgent:string,PdateNaissAgent:string,PjobAgent:string,PtelAgent:string,PemailAgent:string):Observable<any[]>{
   console.info(this.cookie.get('code')+" "+ this.cookie.get('room'));
    var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
    return this.http.post<any[]>(this.url+"addAgent",{usercode:this.cookie.get('code'),matricule:PmatAgent,roomcode:PnameRoom,name:PnameAgent,datebirth:PdateNaissAgent,job:PjobAgent,phone:PtelAgent,email:PemailAgent},{headers:reqHeaders});
  }
  getAllAgents():Observable<any[]>{
    console.info(+" this.cookie.get('code')"+ this.cookie.get('room'));
    let parametres = new HttpParams({
      fromObject: {
          usercode: this.cookie.get('code'),
         
      }
    });
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
     return this.http.get<any[]>(this.url+"showAgents",{headers:reqHeaders,params:parametres});
   }

   delAgent(PcodeAgent:string):Observable<any[]>{
    console.info(this.cookie.get('code')+" "+ this.cookie.get('room'));
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
     return this.http.put<any[]>(this.url+"deleteAgent",{usercode:this.cookie.get('code'),agentcode:PcodeAgent},{headers:reqHeaders});
   }

}
