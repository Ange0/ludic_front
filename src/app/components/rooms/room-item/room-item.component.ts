import { Room } from './../../../Models/Rooms';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css']
})
export class RoomItemComponent implements OnInit {
  @Input() room:Room; 
  @Output() sendRequestToData=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  sendToEventForDeleteRoom(){ // envoie de l'emmetteur
    this.sendRequestToData.emit(
      {'roomCode':this.room.room_code,'roomName':this.room.room_name}
    );
  }



}
