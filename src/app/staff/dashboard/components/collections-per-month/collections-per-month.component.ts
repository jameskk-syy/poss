import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-collections-per-month',
  templateUrl: './collections-per-month.component.html',
  styleUrls: ['./collections-per-month.component.sass']
})
export class CollectionsPerMonthComponent implements OnInit {
  chartDispType: number[] = [2020, 2022, 2023, 2024, 2025];

  monthsArray: any = [
    { name: "January", value: 1 },
    { name: "February", value : 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "Novembar", value: 11  },
    { name: "December", value: 12 },
  ];

  isLoading: boolean = true;
  chartParametersForm: FormGroup;
  needYear = false;
  needMonth = false;
  poneedYear = false;
  poneedMonth = false;
  month: any;
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  currentEmail: any;
  currentMeeting: any;
  years: Object;
  meetingYears: any[] = [];
  year: any;

  meetings: any[] = [];
  meetingsExist: boolean = false;
  meetingTitle: string

  public doughnutChartLabels: string[] = ["Session 1", "Session 2", "Session 3"];
  public doughnutChartData: number[] = [];
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#22714D", "#FFA500", "#800080", "#22714D"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };

  sessionOne:number = 0;
  sessionTwo: number = 0;
  sessionThree: number = 0;
  collectors: any[] = [];
  
  constructor(
    private analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    // super();
  }

  ngOnInit(): void {

    this.chartParametersForm = this.createChartParamtersForm();
    this.getCollectorSessionData()
   
  }

  createChartParamtersForm() {
    return this.fb.group({
      year: [this.currentYear],
      month: [this.currentMonth.value],
    });
  }


  onSelectYear(event: any){
    this.getCollectorSessionData()
  }

  onSelectMonth(event: any){
    this.getCollectorSessionData()
  }


 groupBy(array:any[], property:any) {
    return array.reduce((result, obj) => {
      const key = obj[property];
            if (!result[key]) {
        result[key] = [];
      }
  
      result[key].push(obj);
  
      return result;
    }, {});
  }
  getCollectorSessionData() {
    this.isLoading = true;

    let sessionOne: any[] = [];
    let sessionTwo: any[] = [];
    let sessionThree: any[] = [];
    this.sessionOne = 0;
    this.sessionTwo = 0;
    this.sessionThree = 0;


    this.analyticsService
      .fetchMonthlyCollectionsPerSession(this.chartParametersForm.value.year,this.chartParametersForm.value.month)
      .subscribe(
        (res) => {
          this.doughnutChartData = [];
          if (res.entity && res.entity.length>0) {

          res.entity.forEach((item) => {

            if(item.x == "Session 1"){
              sessionOne.push(item.y)
              
              this.sessionOne += parseInt(item.y);

            }else if(item.x == "Session 2"){
              sessionTwo.push(item.y);
            
              this.sessionTwo += parseInt(item.y);

            }else if(item.x == "Session 3"){
              sessionThree.push(item.y);

              this.sessionThree += parseInt(item.y);

            }
          });
          this.doughnutChartData.push(this.sessionOne)
          this.doughnutChartData.push(this.sessionTwo)
          this.doughnutChartData.push(this.sessionThree)
          }
       
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false
        }
      );
  }

  getAllUsers(){
    this.userService.fetchAllActiveAccounts().subscribe(res => {
      let users = res.userData;

      users.forEach(user => {
        if(user.roles[0].name == "ROLE_COLLECTOR"){
          this.collectors.push(user);
        }
      })


      if(this.collectors.length > 0){
        this.chartParametersForm.patchValue({
          collectorId: this.collectors[0].id
        })

        this.getCollectorSessionData();
      }
    }, err => {
      this.isLoading = false
      console.log(err)
    })
  }
}

