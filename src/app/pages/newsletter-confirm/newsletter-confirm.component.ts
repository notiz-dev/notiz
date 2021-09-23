import { NewsletterService } from '@api/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

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
    private newsletterService: NewsletterService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.queryParamMap.get('uuid');
    this.confirmSubscription(uuid);
  }

  confirmSubscription(uuid: string) {
    this.newsletterService
      .confirm({ body: { uuid } })
      .pipe(first())
      .subscribe({
        error: () => {
          this.error = true;
        },
        complete: () => {
          this.confirmed = true;
        },
      });
  }
}
