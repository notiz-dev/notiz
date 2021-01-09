import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-newsletter-confirm',
  templateUrl: './newsletter-confirm.component.html',
  styleUrls: ['./newsletter-confirm.component.scss'],
})
export class NewsletterConfirmComponent implements OnInit {
  confirmed: boolean;
  error: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.queryParamMap.get('uuid');
    this.confirmSubscription(uuid);
  }

  confirmSubscription(uuid: string) {
    this.http
      .put(`${environment.api}/confirm`, { uuid })
      .pipe(first())
      .subscribe(
        () => {},
        (error) => {
          this.error = true;
        },
        () => {
          this.confirmed = true;
        }
      );
  }
}
