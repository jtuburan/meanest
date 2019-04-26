import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserModel } from 'src/app/shared/user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() userInfo: UserModel;

  userList = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      this.userList = data;
      console.log(this.userInfo);
    })
  }
  
  ngOnChanges(){
    if(this.userInfo){
      this.userList.push(this.userInfo);
    }
  }

  displayUserInfo(user) {
    console.log(user);
  }

  delete(id: string) {
    this.userService.deleteUser(id).subscribe();
    for(var i=0; i < this.userList.length; i++) {
      if(this.userList[i]["_id"] == id){
        this.userList.splice(i, 1);
      }
    }
  }

}
