import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
    }
  );
  userList;
  searchValue = '';
  sortBy = '';
  isEditMode = false;
  editObj: any;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe(users => {
      this.userList = users;
    });
  }

  addUserToList() {
    this.userService.addUser(this.userForm.value).subscribe(users => {
      if (users) {
        this.resetUserForm();
        this.getUserList();
        alert('User added successfully');
      }
    });
  }

  editUserInList() {
    this.userService.editUser(this.editObj._id, this.userForm.value).subscribe(users => {
      if (users) {
        this.resetUserForm();
        this.getUserList();
        alert('User updated successfully');
      }
    });
  }

  deleteUserFromList(id) {
    this.userService.deleteUser(id).subscribe(users => {
      this.getUserList();
    });
  }

  onSubmit() {
    if (this.userForm.status === 'INVALID') {
      alert('Please fill all the fields');
    } else {
      this.isEditMode ? this.editUserInList() : this.addUserToList();
    }
  }

  resetUserForm() {
    this.userForm.setValue({
      firstName: '',
      lastName: '',
      employeeId: '',
    });
    this.isEditMode = false;
    this.editObj = null;
  }

  onClickSort(key) {
    if (key === this.sortBy) {
      this.sortBy = null;
    } else {
      this.sortBy = key;
    }
  }

  enableUserEdit(user) {
    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId,
    });
    this.isEditMode = true;
    this.editObj = user;
  }
}
