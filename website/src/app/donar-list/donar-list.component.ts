import { Component, OnInit } from '@angular/core';
import { BloodBankService } from '../blood-bank.service';
import{Router} from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-donar-list',
  templateUrl: './donar-list.component.html',
  styleUrls: ['./donar-list.component.css']
})
export class DonarListComponent implements OnInit {

  public Users = [];
  searchTerm : string;

  constructor(private _bloodBankService:BloodBankService,
     private _router: Router) { }

  ngOnInit() {
    this._bloodBankService.getUsers()
    .subscribe(data => this.Users = data);
  }


  deleteRow(_id){
    for(let i = 0; i < this.Users.length; i++){
        if (this.Users[i]._id === _id) {
            this.Users.splice(i,1);
        }
    }
}





}
