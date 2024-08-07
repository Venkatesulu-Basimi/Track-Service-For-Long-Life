import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
} from 'ng-apexcharts';
import { StorageServiceUser } from '../../../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { LoaderComponent } from '../../../common/loader/loader.component';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzDrawerModule,
    NzAvatarModule,
    NzDropDownModule,
    NzTableModule,
    CanvasJSAngularChartsModule,
    NgApexchartsModule,
    LoaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  loading = false;
  totalDashData: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser
  ) {}

  fetchDashboardDetails() {
    this.loading = true;
    const user = this.userStorage.getCurrentUser();
    this.http.get(`http://localhost:3000/totalCountUsers`).subscribe({
      next: (data: any) => {
        // this.profileData = data;
        console.log('profileData->', data);
        this.totalDashData = data;
        this.loading = false;
        // this.handleProfileData(data);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
  ngOnInit() {
    this.fetchDashboardDetails();
  }

  formatDate(date: string, formatString: string = 'dd/MM/yyyy'): string {
    return format(new Date(date), formatString);
  }

  listOfColumn = [
    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Category',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },

    {
      title: 'Line Item',
      compare: (a: DataItem, b: DataItem) => a.chinese - b.chinese,
      priority: 3,
    },
    {
      title: 'Service Date',
      compare: (a: DataItem, b: DataItem) => a.math - b.math,
      priority: 2,
    },
    {
      title: 'Serviced By',
      compare: (a: DataItem, b: DataItem) => a.english - b.english,
      priority: 1,
    },
    {
      title: 'Contact Number',
      compare: (a: DataItem, b: DataItem) => a.english - b.english,
      priority: 1,
    },
    {
      title: 'Serviced Vendor',
      compare: (a: DataItem, b: DataItem) => a.english - b.english,
      priority: 1,
    },
  ];
}
