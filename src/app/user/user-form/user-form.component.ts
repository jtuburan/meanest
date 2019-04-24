import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/user-model';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: UserModel[];

  studentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl('')
  });

  constructor(private userService: UserService) { }

  ngOnInit() {

  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.studentForm.value);
     this.userService.addUserInfo(this.studentForm.value)
      .subscribe();  
    // console.log(this.studentForm.value);
    //this.studentInfo.emit(this.studentForm.value);    
  }

}
