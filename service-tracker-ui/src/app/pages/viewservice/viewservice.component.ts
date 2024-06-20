import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface DataItem {
  Category: any;
  LineItem: any;
  SubCategory: any;
  createdAt: string;
  id: number;
  name: string;
  nextServiceDate: string;
  servicedBy: string;
  servicedContactNumber: string;
  servicedDate: string;
  servicedVendor: string;
  updatedAt: string;
  userId: number;
}

@Component({
  selector: 'app-viewservice',
  standalone: true,
  imports: [NzTableModule, CommonModule, ReactiveFormsModule, NzModalModule],
  templateUrl: './viewservice.component.html',
  styleUrl: './viewservice.component.scss',
})
export class ViewserviceComponent {
  loading = false;
  isVisible = false;
  listOfData: DataItem[] = [];
  editData: any = {};
  editServiceForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    this.editServiceForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      Category: [{ value: '', disabled: true }, Validators.required],
      subCategory: [{ value: '', disabled: true }, Validators.required],
      lineItemId: [{ value: '', disabled: true }, Validators.required],
      servicedDate: [''],
      nextServiceDate: [''],
      servicedContactNumber: [''],
      servicedBy: [''],
      servicedVendor: [''],
      notes: [''],
    });
  }

  handleDelete(id: number) {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http.delete(`http://localhost:3000/services/${id}`).subscribe({
      next: (data: any) => {
        console.log(data);
        // this.router.navigateByUrl('/view-service');
        this.toastr.success(data?.message, 'Success');
        this.fetchViewSerices();
        this.loading = false;
        this.isVisible = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.userStorage.handleErrors(err);
      },
    });
  }

  warning(id: number): void {
    this.modal.confirm({
      nzTitle: '<b style="color: red;">Alert</b>',
      nzContent: 'Are you sure you want to delete this ?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.handleDelete(id);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  editService() {
    this.loading = true;
    const values = this.editServiceForm.value;
    const userData = this.userStorage.getCurrentUser();
    console.log('values-<', values);
    const data = {
      userId: userData?.id || null,
      name: this.editData?.name || '',
      lineItemId: this.editData?.LineItem?.id || null,
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
      .put(`http://localhost:3000/services/${this.editData.id}`, data, {
        headers,
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          // this.router.navigateByUrl('/view-service');
          this.toastr.success(data?.message, 'Success');
          this.fetchViewSerices();
          this.loading = false;
          this.isVisible = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.userStorage.handleErrors(err);
        },
      });
  }

  submitForm() {
    if (this.editServiceForm.valid) {
      this.editService();
    }
  }

  showModal(data: any): void {
    this.isVisible = true;
    this.editData = data;
    this.editServiceForm.patchValue({
      name: this.editData.name,
      Category: this.editData.Category.id, // Assuming you want to set the ID
      subCategory: this.editData.SubCategory.id,
      lineItemId: this.editData.LineItem.id,
      servicedDate: new Date(this.editData.servicedDate)
        .toISOString()
        .split('T')[0], // Format date if needed
      nextServiceDate: new Date(this.editData.nextServiceDate)
        .toISOString()
        .split('T')[0], // Format date if needed
      servicedContactNumber: this.editData.servicedContactNumber,
      servicedBy: this.editData.servicedBy,
      servicedVendor: this.editData.servicedVendor,
      notes: this.editData.notes,
    });

    console.log('edit->', this.editData);
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    // this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  fetchViewSerices() {
    this.loading = true;
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `${window.localStorage.getItem('auth_token')}`
    // );
    this.http.get('http://localhost:3000/services').subscribe({
      next: (data: any) => {
        console.log(data);
        this.listOfData = data;
        // this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.fetchViewSerices();
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
      compare: (a: DataItem, b: DataItem) =>
        a.Category.name.localeCompare(b.Category.name),
      priority: false,
    },
    {
      title: 'Sub Category',
      compare: (a: DataItem, b: DataItem) =>
        a.SubCategory.name.localeCompare(b.SubCategory.name),
      priority: false,
    },

    {
      title: 'Line Item',
      compare: (a: DataItem, b: DataItem) =>
        a.LineItem.name.localeCompare(b.LineItem.name),
      priority: 3,
    },
    {
      title: 'Serviced Date',
      compare: (a: DataItem, b: DataItem) =>
        a.LineItem.name.localeCompare(b.LineItem.name),
      priority: 2,
    },
    {
      title: 'Next Serviced Date',
      compare: (a: DataItem, b: DataItem) =>
        a.LineItem.name.localeCompare(b.LineItem.name),
      priority: 2,
    },
    {
      title: 'Serviced By',
      compare: (a: DataItem, b: DataItem) =>
        a.LineItem.name.localeCompare(b.LineItem.name),
      priority: 1,
    },
    {
      title: 'Contact Number',
      compare: (a: DataItem, b: DataItem) =>
        a.LineItem.name.localeCompare(b.LineItem.name),
      priority: 1,
    },
    {
      title: 'Serviced Vendor',
      compare: (a: DataItem, b: DataItem) =>
        a.servicedVendor.localeCompare(b.servicedVendor),
      priority: 1,
    },
  ];

  deleteRow(id: string): void {
    console.log('delete');
  }
}
