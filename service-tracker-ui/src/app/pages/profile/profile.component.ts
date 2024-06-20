import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NzAvatarModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'], // Corrected styleUrl to styleUrls
})
export class ProfileComponent implements OnInit {
  loading = false;
  profileData: any = {
    userName: '',
    email: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    pinCode: '',
    createdAt: '',
    id: '',
    role: '',
    updatedAt: '',
  };
  profileForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Corrected async validator issue
      phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      country: [''],
      dateOfBirth: [''],
      pinCode: [''],
    });
  }

  handleProfileData(data: any) {
    this.profileForm.patchValue({
      userName: data.userName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString().split('T')[0]
        : '',
      country: data.country,
      pinCode: data.pincode,
    });
    this.loading = false;
  }

  editProfileData(data: any) {
    this.http
      .put(`http://localhost:3000/profile`, {
        ...data,
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.toastr.success(response?.message, 'Success');
          this.fetchProfile();
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
    console.log('data->');
    const data = this.profileForm.value; // Corrected to get the form value
    console.log('data->', data);
    if (this.profileForm.valid) {
      this.editProfileData(data);
    }
  }

  fetchProfile() {
    this.loading = true;
    const user = this.userStorage.getCurrentUser();
    this.http.get(`http://localhost:3000/profile?userId=${user.id}`).subscribe({
      next: (data: any) => {
        this.profileData = data;
        console.log('profileData->', this.profileData);
        this.handleProfileData(data);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.fetchProfile();
  }
}
