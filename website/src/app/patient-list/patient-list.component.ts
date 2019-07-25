import { Component, OnInit } from '@angular/core';
import { BloodBankService } from '../blood-bank.service';
import{Router} from '@angular/router';
import { Ipatient } from '../patient';
import { FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  public Patient = [];
  searchTerm : string;
  productForm:any;
  
  constructor(private _bloodBankService:BloodBankService,
             private _router: Router,
             private formBuilder: FormBuilder) { }
  
             ngOnInit() {
              this.productForm = this.formBuilder.group({
                  _id: ''
              });
              this._bloodBankService.getUsers()
              .subscribe(data => this.Patient = data);
            }

  delete(event: any) {
          this._bloodBankService.deleteUsers(this.productForm.value._id).toPromise().then(
              res => {
                alert('Success');
              },
              error => {
                console.log(error);
              }
          );
      }
}












