import { NewsletterService } from '@api/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-newsletter-unsubscribe',
  templateUrl: './newsletter-unsubscribe.component.html',
  styleUrls: ['./newsletter-unsubscribe.component.scss'],
})
export class NewsletterUnsubscribeComponent implements OnInit {
  unsubscribed: boolean;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.queryParamMap.get('uuid');
    this.unsubscribe(uuid);
  }

  unsubscribe(uuid: string) {
    this.newsletterService
      .unsubscribe({ body: { uuid } })
      .pipe(first())
      .subscribe({
        error: () => {
          this.error = true;
        },
        complete: () => {
          this.unsubscribed = true;
        },
      });
  }
}
