import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import * as Chart from 'chart.js';
 

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  BarChart :any;
  PieChart :any;
 
  
  constructor () { }


  ngOnInit () {
     
    //pie chart 1 for gender
    this.PieChart = new Chart('PieChart1' ,{
      type: 'pie' ,
      data:{
        labels:["مێ" ,"نێر"],
        datasets: [{
          data: [700 ,300],
          backgroundColor: [
            'blue',
            'Yellow',
          ],
        }]
      },

    options:{
      title:{
        text:"Doner by age",
        display:true
      },
    }
  });




  this.PieChart = new Chart('PieChart2' ,{
    type: 'pie' ,
    data:{
      labels:["مێ" ,"نێر"],
      datasets: [{
        data: [100 ,300],
        backgroundColor: [
          'blue',
          'Yellow',
        ],
      }]
    },

  options:{
    title:{
      text:"Patient by age",
      display:true
    },
  }
});
    
this.BarChart = new Chart('Barchart1' ,{
  type: 'bar' ,
  data:{
    labels:["18-25" ,"26-35" , "36-45" , "46-Order"],
    datasets: [{
      label:'Doner',
      data: [50 ,27 ,40,19],
      backgroundColor: [
        'blue',
        'Yellow',
        'green',
        'red'
      ],
    }]
  },

options:{
  title:{
    text:"Doner by age",
    display:true
  },
}
});




this.BarChart = new Chart('Barchart2' ,{
  type: 'bar' ,
  data:{
    labels:["18-25" ,"26-35" , "36-45" , "46-Order"],
    datasets: [{
      label:'patient',
      data: [50 ,27 ,40,19],
      backgroundColor: [
        'blue',
        'Yellow',
        'green',
        'red'
      ],
    }]
  },

options:{
  title:{
    text:"Patient by age",
    display:true
  },
}
});



this.PieChart = new Chart('PieChart3' ,{
  type: 'pie' ,
  data:{
    labels:["A+" ,"O+" , "AB+" , "B-" ,"A-" ,"O-","AB-" ,"B+"],

    datasets: [{
      label:'Doner',
      data: [50 ,27 ,40,19 ,6,30,8,13],
      backgroundColor: [
        'blue',
        'Yellow',
        'green',
        'red',
        'pink',
        'black',
        'Olive',
        'Maroon'
      ],
    }]
  },

options:{
  title:{
    text:"Doner by TypeBlood",
    display:true
  },
}
});



this.PieChart = new Chart('PieChart4' ,{
  type: 'pie' ,
  data:{
    labels:["A+" ,"O+" , "AB+" , "B-" ,"A-" ,"O-","AB-" ,"B+"],

    datasets: [{
      label:'Patient',
      data: [20 ,2 ,4,1 ,6,30,12,9],
      backgroundColor: [
        'blue',
        'Yellow',
        'green',
        'red',
        'pink',
        'black',
        'Olive',
        'Maroon'
      ],
    }]
  },

options:{
  title:{
    text:"Patient by TypeBlood",
    display:true
  },
}
});




  }

  
}

 

