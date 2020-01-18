import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  url:string=" http://localhost/w-stock-mini/index.php/room/";
  constructor(private cookie:CookieService,private http:HttpClient) { }


  addRoom(ProomName:string,ProomType:string,ProomCity:string,ProomTown:string,ProomAdrr:string,ProomPhone:string,ProomEmail:string):Observable<any[]>{
    console.info(this.cookie.get('code')+" "+ this.cookie.get('room'));
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
     return this.http.post<any[]>(this.url+"addRoom",{usercode:this.cookie.get('code'),roomname:ProomName,roomtype:ProomType,roomcity:ProomCity,roomtown:ProomTown,roomaddr:ProomAdrr,roomphone:ProomPhone,roomemail:ProomEmail},{headers:reqHeaders});
   }
  getAllRooms():Observable<any[]>{
    console.info(+" this.cookie.get('code')"+ this.cookie.get('room'));
    let parametres = new HttpParams({
      fromObject: {
          usercode: this.cookie.get('code'),
         
      }
    });
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
     return this.http.get<any[]>(this.url+"showRoomsList",{headers:reqHeaders,params:parametres});
   }
   delRoom(PcodeRoom:string):Observable<any[]>{
    console.info(this.cookie.get('code')+" "+ this.cookie.get('room'));
     var reqHeaders= new HttpHeaders({'Content-Type': 'application/json','Authorization': ' Bearer ' +this.cookie.get('token')})
     return this.http.put<any[]>(this.url+"updateRoomStatus",{usercode:this.cookie.get('code'),roomcode:PcodeRoom,status:200},{headers:reqHeaders});
   }
}
