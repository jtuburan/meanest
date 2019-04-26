import { Component, OnInit, OnChanges } from '@angular/core';
import { UserModel } from '../shared/user-model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userInfo: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
  } 

  displayUserInfo(user: UserModel){
    this.userService.addUserInfo(user).subscribe(
      data => {
        console.log(data);
        this.userInfo = data;
      }
    )
  }
}
