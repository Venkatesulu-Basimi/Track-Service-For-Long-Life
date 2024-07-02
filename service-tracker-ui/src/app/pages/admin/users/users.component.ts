import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceUser } from '../../../auth/auth';
import { LoaderComponent } from '../../../common/loader/loader.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NzTableModule, CommonModule, ReactiveFormsModule, LoaderComponent],

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  loading = false;
  isVisible = false;
  listOfData: any;
  editData: any = {};

  id: string | null = null;
  name: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  fetchUsers() {
    this.loading = true;
    this.http.get('http://localhost:3000/users').subscribe({
      next: (data: any) => {
        this.listOfData = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  formatDate(date: string, formatString: string = 'dd/MM/yyyy'): string {
    return format(new Date(date), formatString);
  }

  listOfColumn = [
    {
      title: 'Name',
    },
    {
      title: 'Email',
    },
    {
      title: 'Phone Number',
    },
    {
      title: 'Date Of Birth',
    },
    {
      title: 'Address',
    },
    {
      title: 'Country',
    },
    {
      title: 'Pincode',
    },
  ];
}
