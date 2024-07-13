import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordManagerService } from '../../services/password-manager.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  siteForm = new FormGroup({
    siteName: new FormControl('', Validators.required),
    siteUrl: new FormControl('', Validators.required),
    siteImgUrl: new FormControl('', Validators.required),
  });
  formState: string = 'Add New';
  // Properties for two-way binding
  siteName: string = '';
  siteUrl: string = '';
  siteImgUrl: string = '';

  isSuccess :boolean = false;
  successMsg :string = '';

  allSites!: Observable<Array<any>>;
  siteId!: string;

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  showAlert(message: string){
    this.isSuccess = true;
    this.successMsg = message;
  }

  onSubmit() {
    if (this.formState == 'Add New') {
      this.passwordManagerService
        .addSite(this.siteForm.value)
        .then(() => {
          this.showAlert("Data Saved Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, this.siteForm.value)
        .then(() => {
          this.showAlert("Data Edited Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.siteForm.reset();
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(
    siteName: string,
    siteUrl: string,
    siteImgUrl: string,
    siteId: string
  ) {
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImgUrl = siteImgUrl;
    this.siteId = siteId;
    this.formState = 'Edit';
  }

  deleteSite(siteId: string) {
    this.passwordManagerService
      .deleteSite(siteId)
      .then(() => {
        this.showAlert("Data Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  reset() {
    this.siteForm.reset();
    this.formState = 'Add New';
  }
}
