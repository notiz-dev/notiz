import { PlausibleService } from 'ngx-plausible';
import { SubscriptionService } from '@api/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { PlausibleEvent } from 'src/app/types/types';

@Component({
  selector: 'app-newsletter-confirm',
  templateUrl: './newsletter-confirm.component.html',
  styleUrls: ['./newsletter-confirm.component.scss'],
})
export class NewsletterConfirmComponent implements OnInit {
  confirmed: boolean;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private plausible: PlausibleService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.queryParamMap.get('uuid');
    this.confirmSubscription(uuid);
  }

  confirmSubscription(uuid: string) {
    this.subscriptionService
      .confirm({ body: { uuid } })
      .pipe(first())
      .subscribe({
        error: () => {
          this.error = true;
        },
        complete: () => {
          this.plausible.event(PlausibleEvent.Newsletter, {
            props: { event: 'confirmed' },
          });
          this.confirmed = true;
        },
      });
  }
}
