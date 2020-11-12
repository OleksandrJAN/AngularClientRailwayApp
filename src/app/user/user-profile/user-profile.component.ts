import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/_service';
import { UserProfile } from 'src/app/_domain';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile;
  userProfileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // init user profile data
    this.userService.getUserProfile().subscribe(
      (userProfile: UserProfile) => {
        this.userProfile = userProfile;
      }
    );

    // init reactive forms
    this.userProfileForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      patronymic: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['']
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: [''],
      newPasswordConfirm: ['']
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.userProfileForm.controls;
  }

  hasError(controlName: string, errorName: string) {
    return this.formControls[controlName].hasError(errorName);
  }

  onSubmit() {
    console.log(this.userProfileForm.value);
    // stop here if form is invalid
    if (this.userProfileForm.invalid) {
      return;
    }


  }

  onPasswordSubmit() {
    console.log(this.passwordForm.value);
  }

}
