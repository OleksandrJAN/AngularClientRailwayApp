import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/_service';
import { UserProfile } from 'src/app/_domain';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (userProfile: UserProfile) => {
        this.userProfile = userProfile;
      }
    );
  }

}
