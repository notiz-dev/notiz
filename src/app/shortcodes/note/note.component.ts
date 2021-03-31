import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'niz-note',
  template: `
    <div [ngClass]="[type]" class="rounded-r-md p-4 border-l-4 my-2">
      <div class="flex">
        <div class="flex-shrink-0">
          <i class="material-icons">{{ icon }}</i>
        </div>
        <div class="ml-3">
          <div class="content" markdown>
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() type: 'success' | 'info' | 'warn' = 'info';
  @Input() icon: string;
  constructor() {}

  ngOnInit(): void {
    switch (this.type) {
      case 'info': {
        this.icon ||= 'lightbulb';
        break;
      }
      case 'success': {
        this.icon ||= 'task_alt';
        break;
      }
      case 'warn': {
        this.icon ||= 'warning';
        break;
      }
    }
  }
}
