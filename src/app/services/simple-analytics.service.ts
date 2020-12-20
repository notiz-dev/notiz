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
    eventName.replace('/', '_');
    if ((window as any).sa_event) {
      (window as any).sa_event(eventName);
    }
  }
}
