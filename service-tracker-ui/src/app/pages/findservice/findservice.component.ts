import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { StorageServiceUser } from '../../auth/auth';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../../common/loader/loader.component';

@Component({
  selector: 'app-findservice',
  standalone: true,
  imports: [
    NzCardModule,
    NzTableModule,
    ReactiveFormsModule,
    LoaderComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],

  templateUrl: './findservice.component.html',
  styleUrl: './findservice.component.scss',
})
export class FindserviceComponent {
  loading = false;
  totalData: any;
  filterData: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser
  ) {
    this.filterData = new FormGroup({
      searchText: new FormControl(''),
      location: new FormControl(''),
    });
  }

  fetchLocalServices(values: any) {
    this.loading = true;
    let params = '';
    if (values?.location && values?.searchText) {
      params = `?location=${values?.location || ''}&searchText=${
        values?.searchText || ''
      }`;
    } else if (values?.location) {
      params = `?location=${values?.location}`;
    } else if (values?.searchText) {
      params = `?searchText=${values?.searchText}`;
    }
    this.http.get(`http://localhost:3000/getLocalServices${params}`).subscribe({
      next: (data: any) => {
        console.log('profileData->', data);
        this.totalData = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
  ngOnInit() {
    this.fetchLocalServices({});
  }
  submitForm() {
    if (this.filterData.valid) {
      const values = this.filterData.value;
      this.fetchLocalServices(values);
    }
    console.log('first->', this.filterData);
  }
}
