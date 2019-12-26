import { HeaderTopComponent } from './components/_partials/header-top/header-top.component';
import { HeaderBottomComponent } from './components/_partials/header-bottom/header-bottom.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AgentComponent } from './components/agent/agent.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { StorageProductComponent } from './components/storage-product/storage-product.component';
import { RepportsComponent } from './components/repports/repports.component';
import { FooterComponent } from './components/_partials/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loaders/loading-spinner/loading-spinner.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MyAccountComponent,
    AgentComponent,
    CustomersComponent,
    RoomsComponent,
    StorageProductComponent,
    RepportsComponent,
    FooterComponent,
    HeaderBottomComponent,
    HeaderTopComponent,
    LoadingSpinnerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  
  ],
  providers: [
    Title,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
