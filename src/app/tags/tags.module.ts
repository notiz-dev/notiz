import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ScullyLibModule } from "@scullyio/ng-lib";
import { TagsRoutingModule} from "./tags-routing.module";
import { TagsComponent } from "./tags.component";
import { IonicModule } from "@ionic/angular";

import { PipesModule } from "../pipes/pipes.module";
import { ComponentsModule } from "../components/components.module";
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [TagsComponent, TagComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    PipesModule
  ]
})
export class TagsModule {}
