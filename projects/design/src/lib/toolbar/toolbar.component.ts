import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'niz-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class NizToolbar implements OnInit {
  @Output() toggledMenu = new EventEmitter<boolean>();

  isOpen: boolean;

  constructor() {}

  ngOnInit(): void {}

  toggleMobileMenu() {
    this.isOpen = !this.isOpen;
    this.toggledMenu.emit(this.isOpen);
  }
}
