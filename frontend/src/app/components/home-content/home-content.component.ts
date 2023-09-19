import { Component } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {
  faLink = faLink;
  publicResponseJson: string;
  hasApiError: boolean;

  constructor(private api: ApiService) {}

  pingPublicApiEndpoint() {
    this.api.pingPublic$().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.publicResponseJson = JSON.stringify(res, null, 2).trim();
      },
      error: () => {
        this.hasApiError = true},
    });
  }
}
