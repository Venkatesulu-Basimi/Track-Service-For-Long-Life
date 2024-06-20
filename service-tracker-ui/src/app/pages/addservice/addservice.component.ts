import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { LoaderComponent } from '../../common/loader/loader.component';
import { NgxLoadingConfig, NgxLoadingModule } from 'ngx-loading';
import { ToastrService } from 'ngx-toastr';
import { StorageServiceUser } from '../../auth/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addservice',
  standalone: true,
  imports: [
    NzTableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    LoaderComponent,
    NgxLoadingModule,
  ],
  templateUrl: './addservice.component.html',
  styleUrl: './addservice.component.scss',
})
export class AddserviceComponent {
  addServiceForm: FormGroup;
  httpClient = inject(HttpClient);
  loading = false;
  dynamicClass = 'disable-button';
  categories: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  }[] = [];

  subCategory: {
    categoryId: number;
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  }[] = [];

  lineItems: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
    subCategoryId: number;
  }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {
    this.addServiceForm = new FormGroup({
      Category: new FormControl('', [Validators.required]),
      subCategory: new FormControl('', [Validators.required]),
      lineItemId: new FormControl('', [Validators.required]),
      servicedDate: new FormControl(null, [Validators.required]),
      servicedBy: new FormControl(null),
      servicedContactNumber: new FormControl('', [
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      servicedVendor: new FormControl(''),
      nextServiceDate: new FormControl(''),
      notes: new FormControl(''),
      name: new FormControl('', [Validators.required]),
    });

    this.addServiceForm.valueChanges.subscribe(() => {
      if (this.addServiceForm.valid) {
        this.dynamicClass = '';
      } else {
        this.dynamicClass = 'disable-button';
      }
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    if (selectedCategoryId) {
      this.fetchCategoryDetails(selectedCategoryId);
    }
  }
  onSubCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    if (selectedCategoryId) {
      this.fetchSubCategoryDetails(selectedCategoryId);
    }
  }

  fetchSubCategoryDetails(subCategoryId: number) {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/lineItems?subCategoryId=${subCategoryId}`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          this.lineItems = data;
          console.log('Selected category data:', data);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  fetchCategoryDetails(categoryId: number) {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/subCategories?categoryId=${categoryId}`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          this.subCategory = data;
          console.log('Selected category data:', this.subCategory);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  handleCategories() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http.get('http://localhost:3000/categories', { headers }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.handleCategories();
  }

  addService() {
    this.loading = true;
    const values = this.addServiceForm.value;
    const userData = this.userStorage.getCurrentUser();
    const data = {
      userId: userData?.id || null,
      name: values?.name || '',
      lineItemId: values?.lineItemId || null,
      servicedDate: values?.servicedDate || '',
      servicedBy: values?.servicedBy || '',
      servicedContactNumber: values?.servicedContactNumber || null,
      servicedVendor: values?.servicedVendor || '',
      nextServiceDate: values?.nextServiceDate || '',
    };
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .post('http://localhost:3000/services', data, { headers })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigateByUrl('/view-service');
          this.toastr.success(data?.message, 'Success');
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.userStorage.handleErrors(err);
        },
      });
  }

  submitForm() {
    if (this.addServiceForm.valid) {
      this.addService();
    }
    console.log('first->', this.addServiceForm);
  }
}
