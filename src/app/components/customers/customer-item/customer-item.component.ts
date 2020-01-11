import { Customer } from './../../../Models/Customers';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent implements OnInit {
  @Input() customer:Customer; 
  @Output() sendRequestToDataForDeleteCustomer=new EventEmitter(); // emmetteur d'evenement
  constructor() {}

  ngOnInit() {

  }
  sendToEventForDeleteCustomer(){ // envoie de l'emmetteur
    this.sendRequestToDataForDeleteCustomer.emit(
      {'customerCode':this.customer.cust_code,'customerName':this.customer.cust_name}
    );
  }

}
