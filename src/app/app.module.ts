
import { AgentModalComponent } from './components/agent/agent-modal/agent-modal.component';
import { CustomerItemComponent } from './components/customers/customer-item/customer-item.component';
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
import { AgentItemComponent } from './components/agent/agent-item/agent-item.component';
import { RoomItemComponent } from './components/rooms/room-item/room-item.component';
import { UsersComponent } from './components/users/users.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatNativeDateModule, MatDateFormats, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';








export const MY_FORMAT: MatDateFormats = {
  parse: {
  dateInput: 'DD/MM/YYYY',
  },
  display: {
  dateInput: 'DD/MM/YYYY',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'DD/MM/YYYY',
  monthYearA11yLabel: 'MMMM YYYY',
  },
  };



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
    LoadingSpinnerComponent,
    AgentItemComponent,
    RoomItemComponent,
    UsersComponent,
    CustomerItemComponent,
    AgentModalComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [
    Title,
    CookieService,
    DatePipe
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
