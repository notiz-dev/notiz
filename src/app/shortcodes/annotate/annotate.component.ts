import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { annotate } from "rough-notation";
import {
  RoughAnnotation,
  RoughAnnotationConfig,
} from "rough-notation/lib/model";

@Component({
  selector: "app-annotate",
  template: `
    <span
      #el
      intersection
      (intersects)="mark(el);"
      (leave)="unmark();"
      ><ng-content></ng-content
    ></span>
  `,
  styles: [],
})
export class AnnotateComponent implements OnInit {
  @HostBinding("class") class = "relative";
  @Input() type:
    | "underline"
    | "box"
    | "circle"
    | "highlight"
    | "strike-through"
    | "crossed-off"
    | "bracket" = "highlight";
  private annotation: RoughAnnotation;
  private timeout: ReturnType<typeof setTimeout>;
  @Input() options: Partial<RoughAnnotationConfig> = {
    multiline: true,
    color: "#55b9f3",
  };
  constructor() {}

  ngOnInit(): void {}

  mark(el: HTMLElement) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.annotation = annotate(el, {
        type: this.type,
        ...this.options,
      });
      this.annotation.show();
    }, 500);
  }

  unmark() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.annotation?.remove();
  }
}
