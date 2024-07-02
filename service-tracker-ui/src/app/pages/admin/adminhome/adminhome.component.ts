import { Component } from '@angular/core';
import { StorageServiceUser } from '../../../auth/auth';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-adminhome',
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
    RouterOutlet,
    RouterModule,
    NzDropDownModule,
    BsDropdownModule,
  ],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss',
})
export class AdminhomeComponent {
  userDetails;
  constructor(
    private userStorage: StorageServiceUser,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userDetails = this.userStorage.getCurrentUser();
  }
  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }

  logout() {
    this.userStorage.logOut();
    this.router.navigateByUrl('/login');
  }
  listOfColumn = [
    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Chinese Score',
      compare: (a: DataItem, b: DataItem) => a.chinese - b.chinese,
      priority: 3,
    },
    {
      title: 'Math Score',
      compare: (a: DataItem, b: DataItem) => a.math - b.math,
      priority: 2,
    },
    {
      title: 'English Score',
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
