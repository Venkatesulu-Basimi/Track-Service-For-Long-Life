import { Component, Inject, OnInit } from '@angular/core';
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
import Chart from 'chart.js/auto';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  chart: any;

  barChartOptions = {
    title: {
      text: 'Total Impressions by Platforms',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: 'K',
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        yValueFormatString: '#,###K',
        dataPoints: [
          { label: 'Snapchat', y: 15 },
          { label: 'Instagram', y: 20 },
          { label: 'YouTube', y: 24 },
          { label: 'Twitter', y: 29 },
          { label: 'Facebook', y: 73 },
        ],
      },
    ],
  };

  chartOptions = {
    animationEnabled: true,
    title: {
      text: 'Sevices',
    },
    data: [
      {
        type: 'doughnut',
        yValueFormatString: "#,###.##'%'",
        indexLabel: '{name}',
        dataPoints: [
          { y: 28, name: 'Car Services' },
          { y: 10, name: 'Bike Services' },
          { y: 20, name: 'Auto Services' },
          { y: 15, name: 'Van Services' },
          { y: 23, name: 'Bus Services' },
        ],
      },
    ],
  };

  listOfColumn = [
    {
      title: 'Service Id',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
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
      title: 'Serivice Date',
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
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
}
