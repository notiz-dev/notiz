import { Component, OnInit } from "@angular/core";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.generateTags();
  }
}
