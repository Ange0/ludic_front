import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    
})
export class LoginComponent implements OnInit {
  showSpinner: boolean = false;
  constructor(private _as:AuthService,private router:Router,private cookie:CookieService) { }

  ngOnInit() {
  }
   // A la soumission du formulaire
  //  login(e){
  //   e.preventDefault();
  //   const target=e.target;
  //   //recuperation du nom
  //   const email=target.querySelector('#useremail').value;
  //   //recuperation du password
  //   const password=target.querySelector('#userpassword').value;
    
  //   console.info("E-mail : "+email + " Password : "+password);
  //   // const response=this._as.login(name,password);
  //   // console.log(response);
  //   // alert(response.message);
  //   // if(response.status===200){
  //   //   this.router.navigateByUrl('task');
  //   //   return;
  //   // }else{

  //   // }
  // }
   //a la soumission du formulaire
   onSignIn(e){
    e.preventDefault();
    const target=e.target;
    //recuperation du nom
    const email=target.querySelector('#useremail').value;
    //recuperation du password
    const password=target.querySelector('#userpassword').value;
    if(email==""|| password==""){
      Swal.fire({
        icon: 'error',
        backdrop: `
        rgba(255,0,10,0.4)
        url("/images/nyan-cat.gif")
        center left
        no-repeat
      `,
        title: 'Desolé...',
        text: 'Informations manquantes ',
        footer: '<a href>Veuillez remplir correctement les champs</a>'
      });
    }else{
      this._as.signIn(email,password).subscribe((datas)=>{
         this.showSpinner=true;
          if(datas['token']){
        //   console.info("Informations compatible");
        //   Swal.fire({
        //      icon: 'success',
        //      title: 'Oops...',
        //      text: 'Something went wrong!',
        //      footer: '<a href>Why do I have this issue?</a>'
        //    });
        const dtExpire = new Date();
        dtExpire.setTime(dtExpire.getTime() + (3600 * 1000)*2);
        // setCookie('user', usercode, dtExpire, '/', '', '');
				// 	setCookie('level', level, dtExpire, '/', '', '');
				// 	setCookie('token', token, dtExpire, '/', '', '');
				// 	setCookie('route', route, dtExpire, '/', '', '');
				// 	setCookie('room', room, dtExpire, '/', '', '');
        this.cookie.set('token',datas['token'],dtExpire);
        this.cookie.set('code',datas['code'],dtExpire);
        this.cookie.set('route',datas['route'],dtExpire);
        this.cookie.set('level',datas['level']),dtExpire;
        this.cookie.set('room',datas['room'],dtExpire);
        alert(this.cookie.get('code'));
        this.showSpinner=false;
        this.router.navigateByUrl('dashboard');
         //window.location='dashboard'; // a GERER aprés
          //this.router.navigate(['dashboard']);
        }else{
          console.error("information erronées ");
          this.showSpinner=false;
          Swal.fire({
            icon: 'warning',
            backdrop: `
            rgba(200,205,20,0.4)
            url("/images/nyan-cat.gif")
            center left
            no-repeat
          `,
            title: 'Desolé...',
            text: 'L\'utilisateur est introuvable',
            footer: '<a href>Veuillez contacter votre administrateur</a>'
          });
        }
        //this.title="";
        //this.formSubmitted=false; 
        //mise a jour automatiquement
        //this._ms.setMessage('something happen');
      });
    }
   

  }

}
