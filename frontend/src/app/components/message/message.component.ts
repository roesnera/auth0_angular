import { Component, OnInit } from '@angular/core';
import { concatMap, tap, map } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-message',
  template: `<div *ngIf="metadata">
    <pre>{{ metadata | json }}</pre>
  </div>`,
  styles: [],
})
export class MessageComponent implements OnInit {
  metadata = {};

  // Inject both AuthService and HttpClient
  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`http://localhost:8080/api/private`)
        )
      ),
      map((user: any) => user.user_metadata),
      tap((meta) => (this.metadata = meta))
    )
    .subscribe();
  }
}