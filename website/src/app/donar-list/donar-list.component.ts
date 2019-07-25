import { Component, OnInit } from '@angular/core';
import { BloodBankService } from '../blood-bank.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { IBloodBank } from '../blood';
import { FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-donar-list',
  templateUrl: './donar-list.component.html',
  styleUrls: ['./donar-list.component.css']
})
export class DonarListComponent implements OnInit {

  public Users = [];
  searchTerm: string;
  productForm: any;

  constructor(private _bloodBankService: BloodBankService,
    private _router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      _id: ''
    });

    this._bloodBankService.getUsers()
      .subscribe(data => this.Users = data);


  }

  deleteUsers(_id) {
    this._bloodBankService.deleteUsers(_id).toPromise().then(
      res => {
        alert('Success');
      },
      error => {
        console.log("naby coz " + this.productForm.value_id);
      }
    );
  }
}











