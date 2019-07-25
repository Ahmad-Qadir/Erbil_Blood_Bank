import { Component, OnInit } from '@angular/core';
import { BloodBankService } from '../blood-bank.service';
import{Router} from '@angular/router';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  
  public Patient = [];
  searchTerm : string;
  
  constructor(private _bloodBankService:BloodBankService,
    private _router: Router) { }
  
  ngOnInit() {
    this._bloodBankService.getPatient()
    .subscribe(data => this.Patient = data);
    
  }



  deleteRow(_id){
    
    for(let i = 0; i < this.Patient.length; i++){
        if (this.Patient[i]._id === _id) {
            this.Patient.splice(i,1);
        }
    }
}
}












