import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { UserService } from 'src/app/data/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from 'src/app/data/services/utils';


@Component({
  selector: 'app-collections-per-day',
  templateUrl: './collections-per-day.component.html',
  styleUrls: ['./collections-per-day.component.sass']
})
export class CollectionsPerDayComponent implements OnInit {
  isLoading: boolean = false;
  chartParametersForm: FormGroup;
  meetings: any[] = [];
  selectedDate: string='';
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

  sessionOne: number = 0;
  sessionTwo: number = 0;
  sessionThree: number = 0;
  datesArray: string[];
 
  
  
  constructor(
    private analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    
  ) {}

  ngOnInit(): void {
    this.chartParametersForm = this.createChartParamtersForm();
    this.selectedDate = this.chartParametersForm.value.date
    
    this.generateDatesArray(); 
    this.fetchAllCollections();

  }
  generateDatesArray(): void {
    const selectedDate = new Date(this.chartParametersForm.value.date);

    if (!isNaN(selectedDate.getTime())) {
      this.datesArray = [formatDate(selectedDate,'')];
    } else {
      this.datesArray = [];
    }
  }
  onSelectDate(): void {
    this.selectedDate = formatDate(this.chartParametersForm.value.date,'')
   this.fetchAllCollections();
  }
  createChartParamtersForm() {
    const currentDate = new Date().toISOString().slice(0, 10); 
    return this.fb.group({
      date: [currentDate], 
    
    });
  }

  fetchAllCollections() {
      this.isLoading = true;
  
      let sessionOne: any[] = [];
      let sessionTwo: any[] = [];
      let sessionThree: any[] = [];
      this.sessionOne = 0;
      this.sessionTwo = 0;
      this.sessionThree = 0;
  
  
      this.analyticsService
        .fetchMonthlyCollectionsPerDay(this.selectedDate).subscribe(res => {
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
  
   
  
}
