import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'niz-note',
  template: `
    <ng-container *ngIf="type === 'info'">
      <ng-container
        *ngTemplateOutlet="
          note;
          context: {
            $implicit: [
              'bg-blue-50',
              'text-blue-800',
              'text-blue-700',
              'lightbulb',
              'border-blue-700',
            ]
          }
        "
      ></ng-container>
    </ng-container>
    <ng-container *ngIf="type === 'success'">
      <ng-container
        *ngTemplateOutlet="
          note;
          context: {
            $implicit: [
              'bg-green-50',
              'text-green-800',
              'text-green-700',
              'task_alt',
              'border-green-700'
            ]
          }
        "
      ></ng-container>
    </ng-container>
    <ng-container *ngIf="type === 'warn'">
      <ng-container
        *ngTemplateOutlet="
          note;
          context: {
            $implicit: [
              'bg-yellow-50',
              'text-yellow-800',
              'text-yellow-700',
              'warning',
              'border-yellow-700',
            ]
          }
        "
      ></ng-container>
    </ng-container>

    <ng-template let-values #note>
      <div
        [ngClass]="[values[0], values[4]]"
        class="rounded-r-md p-4 border-l-4 my-2"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="material-icons" [ngClass]="[values[2]]">{{
              values[3]
            }}</i>
          </div>
          <div class="ml-3">
            <h3
              *ngIf="title"
              [ngClass]="[values[1]]"
              class="text-sm font-medium"
            >
              {{ title }}
            </h3>
            <div class="mt-2 text-sm">
              <p [ngClass]="[values[2]]">
                <ng-content></ng-content>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class NoteComponent implements OnInit {
  @Input() type: 'success' | 'info' | 'warn' = 'info';
  @Input() title: string;
  constructor() {}

  ngOnInit(): void {}
}
