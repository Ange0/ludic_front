import { RepportsComponent } from './components/repports/repports.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AgentComponent } from './components/agent/agent.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StorageProductComponent } from './components/storage-product/storage-product.component';

const routes: Routes = [
  { path: '', component:LoginComponent , data:{title:'About'}},
  { path: 'login', component:LoginComponent , data:{title:'About'}},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'my-account', component:MyAccountComponent },
  { path: 'agents', component:AgentComponent },
  { path: 'customers', component:CustomersComponent},
  { path: 'rooms', component:RoomsComponent},
  { path: 'storage-products', component:StorageProductComponent},
  {path:'repports',component:RepportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
