import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordManagerService } from '../../services/password-manager.service';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {
  siteName = new FormControl('', Validators.required);
  siteUrl = new FormControl('', Validators.required);
  siteImgUrl = new FormControl('', Validators.required);
  siteForm = new FormGroup({
    siteName: this.siteName,
    siteUrl: this.siteUrl,
    siteImgUrl: this.siteImgUrl
  });

  constructor(private passwordManagerService: PasswordManagerService) {}

  onSubmit() {
    this.passwordManagerService.addSite(this.siteForm.value)
      .then(() => {
        console.log('Data saved successfully');
      }).catch(err => {
        console.log(err);
      });
  }

  cancel() {
    this.siteForm.reset();
  }
}
