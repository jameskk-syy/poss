import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {

  users: any = 0;
  teams: any = 0;
  departments: any = 0;
  subsidiaries: any = 0;
  meetingCategories: any = 0;
  actionTypes: any = 0;

  data: any;
  subscription!: Subscription;
  loaded: boolean = false;
  isdata:boolean=false

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;
  milkQuantity: number;
  damount: number;
  isLoading: boolean;
  dashboard: any;

  constructor(private service: DashboardService) {

  }

  // getAnalysis() {
  //   this.subscription = this.service.getDashboardWigetsAnalytics().subscribe(res => {
  //     this.data = res;
  //     if (this.data) {
        
  //       this.loaded = true;
  //       this.users = this.data.entity.users;
  //       this.teams = this.data.entity.teams;
  //       this.meetingCategories = this.data.entity.meetingCategeories;
  //       this.departments = this.data.entity.departments;
  //       this.actionTypes = this.data.entity.actionTypes;
  //       this.subsidiaries = this.data.entity.subsidiaries;
  //     }else{
  //       this.loaded = false;
  //       this.users = 0;
  //       this.teams = 0;
  //       this.meetingCategories =0;
  //       this.departments = 0;
  //       this.actionTypes =0;
  //       this.subsidiaries = 0;

  //     }
  //   });
  // }
  getDateSummary(date) {
    this.isLoading = true;
    this.milkQuantity = 0;
      this.damount = 0;
    this.subscription = this.dashboard.getTotalsCollectionByDate(date).subscribe(res => {
      this.data = res;
      if (this.data && this.data.entity.length > 0) {
        this.isLoading = false;
            let totalMilkQuantity = 0;
        let totalAmount = 0;
            for (const entity of this.data.entity) {
          totalMilkQuantity += entity.milkQuantity;
          totalAmount += entity.amount;
        }
            this.milkQuantity = totalMilkQuantity;
        this.damount = totalAmount;
      }
    });
  }
  
    getAllCollectionsSummary() {
      this.isLoading = true;
      this.milkQuantity = 0;
      this.damount = 0;
      this.subscription = this.dashboard.getAllAccumulations().subscribe(res => {
        this.data = res;
        if (this.data && this.data.entity.length > 0) {
          this.isLoading = false;
              let totalMilkQuantity = 0;
          let totalAmount = 0;
              for (const entity of this.data.entity) {
            totalMilkQuantity += entity.milkQuantity;
            totalAmount += entity.amount;
          }
              this.milkQuantity = totalMilkQuantity;
          this.damount = totalAmount;
        }
      });
    }


  ngOnInit() {
    // this.getAnalysis();
    this.smallChart2();
  }
  private smallChart2() {
    this.cardChart2 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart2Data = [
      {
        label: "New Clients",
        data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(253,126,20,.7)",
        pointBackgroundColor: "rgba(253,126,20,.2)",
        backgroundColor: "rgba(253,126,20,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart2Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }

}
