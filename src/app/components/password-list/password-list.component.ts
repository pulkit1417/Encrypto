import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../../services/password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {
  passwordForm = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  passwordList!: Observable<any[]>;
  email!:string;
  username!:string;
  password!:string;
  passwordId!: string

  formState : string = "Add New";

  isSuccess :boolean = false;
  successMsg :string = '';
  showAlert(message: string){
    this.isSuccess = true;
    this.successMsg = message;
  }
  resetForm(){
    this.passwordForm.reset();
    this.formState = "Add New";
    this.passwordId = "";
  }

  siteId!: string;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl!: string;
  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService){
    this.route.queryParams.subscribe((val: any) =>{
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImgUrl = val.siteImgUrl;
    });
    this.loadPasswords();
  }

  onSubmit(){
    if(this.formState == "Add New"){
      this.passwordManagerService.addPassword(this.passwordForm.value, this.siteId)
      .then(()=>{
        this.showAlert("Data Saved Successfully");
        this.resetForm();
      }).catch(err =>{
        console.log(err);
      })
    } else if(this.formState == "Edit"){
      this.passwordManagerService.editPassword(this.siteId, this.passwordId, this.passwordForm.value)
      .then(()=>{
        this.showAlert("Data Edited Successfully");
        this.resetForm();
      }).catch(err =>{
        console.log(err);
      })
    }
   
  }

  loadPasswords(){
   this.passwordList = this.passwordManagerService.loadPasswords(this.siteId);
  }

  editPassword(passwordId:string, email:string, username:string, password:string){
    this.passwordId = passwordId;
    this.email= email;;
    this.username = username;
    this.password = password;
    this.formState = "Edit"
  }

  deletePassword(passwordId: string){
    this.passwordManagerService.deletePassword(this.siteId,passwordId)
    .then(() => {
      this.showAlert("Data Deleted Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
