import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  BarChart :any;
  PieChart :any;

  constructor() { }

  ngOnInit() {


//pie chart 1
this.PieChart = new Chart('PieChart1' ,{
  type: 'pie' ,
  data:{
    labels:["مێ" ,"نێر" ],
    datasets: [{
      data: [100 ,60 ],
      backgroundColor: [
        'pink',
        'blue',
      ],
    }]
  },

options:{
  title:{
    text:" ڕێژەی خوێن بەخش بە پێی ڕەگەز",
    display:true
  },
}
});


//pie chart 2
this.PieChart = new Chart('PieChart2' ,{
  type: 'pie' ,
  data:{
    labels:["مێ" ,"نێر" ],
    datasets: [{
      data: [300 ,450 ],
      backgroundColor: [
        'red',
        'blue',
      ],
    }]
  },

options:{
  title:{
    text:"ڕێژەی نەخۆش بە پێی ڕەگەز",
    display:true
  },
}
});


//bar chart
this.BarChart = new Chart('barchart1' ,{
  type: 'bar' ,
  data:{
    labels:["18-25" ,"26-35" , "36-45" , "46 & Order"],
    datasets: [{
      label: ['خوێن بەخش'],
      data: [16 ,12,8 ,2,0],
      backgroundColor: [
        'blue',
        'pink',
        'gray',
        'Yellow',
      ],
    }]
  },
  options:{
    title:{
      text:"ڕێژەی خوێن بەخش بە پێی تەمەن",
      display:true
    },
  }
});


//bar chart
this.BarChart = new Chart('barchart2' ,{
  type: 'bar' ,
  data:{
    labels:["18-25" ,"26-35" , "36-45" , "46 & Order"],
    datasets: [{
      label: ['نەخۆش'],
      data: [16 ,12,8 ,2,0],
      backgroundColor: [
        'blue',
        'pink',
        'gray',
        'Yellow',
      ],
    }]
  },
  options:{
    title:{
      text:"ڕێژەی نەخۆش بە پێی تەمەن",
      display:true
    },
  }
});

/* third pie chart*/ 
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
    text:"جۆری خوێنی خوێن بەخش",
    display:true
  },
}
});


/* forth pie chart*/ 
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
    text:"جۆری خوێنی نەخۆش",
    display:true
  },
}
});

  }

}