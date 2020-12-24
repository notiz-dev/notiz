import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SimpleAnalyticsService {
  constructor() {}

  /**
   *
   * Read for valid eventName https://docs.simpleanalytics.com/events#valid-event-names
   *
   * @param eventName limited to 200 characters
   */
  event(eventName: string) {
    eventName = eventName.substring(0, 200);
    eventName = eventName.replace('/', '_');
    if ((window as any).sa_event) {
      (window as any).sa_event(eventName);
    }
  }

  outboundLink(url: string) {
    url = url.replace(/[\/.\:]/g, '_');
    if ((window as any).sa_event) {
      (window as any).sa_event(`outbound_link_click_${url}`);
    }
  }
}
