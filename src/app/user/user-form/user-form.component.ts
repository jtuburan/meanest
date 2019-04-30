import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/shared/user-model';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Output() userInfo = new EventEmitter<UserModel>();
  user: UserModel[];
  editmode: boolean = false;
  userIdToEdit: string;
  constructor(private userService: UserService) { }

  studentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl('')
  });


  ngOnInit() {
    this.userService._studentInfo.subscribe(data => {
      this.editmode = true; 
      this.userIdToEdit = data._id;
      this.studentForm.patchValue({
          name: data.name,
          email: data.email,
          contact: data.contact
        })
    })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.studentForm.value);
    // this.userService.addUserInfo(this.studentForm.value)
     //SS .subscribe();  
    //console.log(this.studentForm.value);
    //this.studentInfo.emit(this.studentForm.value);    
    if(!this.editmode){
      this.userInfo.emit(this.studentForm.value);
    } else {
       let editedUser = new UserModel(
          this.userIdToEdit,
          this.studentForm.value.name,
          this.studentForm.value.email,
          this.studentForm.value.contact
        )
        console.log(editedUser);
      this.userService.putUser(editedUser).subscribe();
        
    }
  }

}
