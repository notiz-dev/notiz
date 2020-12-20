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
    console.log('sa event', eventName);
    if ((window as any).sa_event) {
      console.warn('sa_event available');
      (window as any).sa_event(eventName);
    }
  }
}
