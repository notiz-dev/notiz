import { SubscriptionService } from '@api/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { PlausibleEvent } from 'src/app/types/types';
import { PlausibleService } from '@notiz/ngx-plausible';

@Component({
  selector: 'app-newsletter-unsubscribe',
  templateUrl: './newsletter-unsubscribe.component.html',
})
export class NewsletterUnsubscribeComponent implements OnInit {
  unsubscribed: boolean;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private plausible: PlausibleService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.queryParamMap.get('uuid');
    this.unsubscribe(uuid);
  }

  unsubscribe(uuid: string) {
    this.subscriptionService
      .unsubscribe({ body: { uuid } })
      .pipe(first())
      .subscribe({
        error: () => {
          this.error = true;
        },
        complete: () => {
          this.plausible.event(PlausibleEvent.Newsletter, {
            props: { event: 'unsubscribed' },
          });
          this.unsubscribed = true;
        },
      });
  }
}
