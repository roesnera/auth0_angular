import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthClientConfig } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css'],
})
export class ExternalApiComponent {
  publicResponseJson: string;
  privateResponseJson: string;
  protectedResponseJson: string;
  audience: string | undefined;
  hasApiError = false;
  errorMessage: string | undefined;

  constructor(
    private api: ApiService,
    private configFactory: AuthClientConfig
  ) {
    this.audience = this.configFactory.get()?.authorizationParams.audience;
  }

  pingProtectedApiEndpoint() {
    this.api.pingProtected$().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.protectedResponseJson = JSON.stringify(res, null, 2).trim();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `${error.status}`
        this.hasApiError = true},
    });
  }

  pingPrivateApiEndpoint() {
    this.api.pingPrivate$().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.privateResponseJson = JSON.stringify(res, null, 2).trim();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `${error.status}`
        this.hasApiError = true},
    });
  }

  pingPublicApiEndpoint() {
    this.api.pingPublic$().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.publicResponseJson = JSON.stringify(res, null, 2).trim();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `${error.status}`
        this.hasApiError = true},
    });
  }
}
