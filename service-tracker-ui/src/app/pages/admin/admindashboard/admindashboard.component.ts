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

import {
  ChartComponent,
  ApexAxisChartSeries,
  NgApexchartsModule,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
} from 'ng-apexcharts';
import { StorageServiceUser } from '../../../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { LoaderComponent } from '../../../common/loader/loader.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-admindashboard',
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
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss',
})
export class AdmindashboardComponent {
  loading = false;
  totalDashData: any;
  chartOptions: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'basic',
          data: [0, 0, 0, 0, 0],
        },
      ],
      chart: {
        type: 'bar',
        height: 550,
      },
      colors: [
        '#F44F5E',
        '#E55A89',
        '#D863B1',
        '#CA6CD8',
        '#B57BED',
        '#8D95EB',
        '#62ACEA',
        '#4BC3E6',
      ],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'Bike Services',
          'Car Services',
          'Electronics Maintenance',
          'Home/Office Building Maintenance',
          'Garden Maintenance',
        ],
      },
    };
  }

  fetchDashboardDetails() {
    this.loading = true;
    const user = this.userStorage.getCurrentUser();
    this.http.get(`http://localhost:3000/totalCountUsers`).subscribe({
      next: (data: any) => {
        this.totalDashData = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  fetchCategoryDetails() {
    this.loading = true;
    this.http.get(`http://localhost:3000/getDataCategoriesWise`).subscribe({
      next: (data: any) => {
        const series: any = [];
        const xaxis: any = [];
        const dataNew = {
          'Bike Services': 0,
          'Car Services': 0,
          'Electronics Maintenance': 0,
          'Home/Office Building Maintenance': 0,
          'Garden Maintenance': 0,
        };
        Object.values(data).forEach((item: any) => {
          series.push(Number(item.totalAmount || 0));
          xaxis.push(item.categoryName);
        });
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'basic',
              data: series,
            },
          ],
          xaxis: { categories: xaxis },
        };
        this.loading = false;
        // this.totalDashData = data;
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
    this.fetchCategoryDetails();
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
