import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakPointsComponent } from './breakpoints.component';
import { ShortcodeModule } from '@notiz/shortcodes';
import { DescriptionModule } from '../components/description/description.module';
import { PreferencesComponent } from './preferences.component';
import { ResponsiveComponent } from './responsive.component';

@NgModule({
  declarations: [
    BreakPointsComponent,
    PreferencesComponent,
    ResponsiveComponent,
  ],
  imports: [
    CommonModule,
    DescriptionModule,
    ShortcodeModule.forChild([
      { shortcode: 'breakpoints', component: BreakPointsComponent },
      { shortcode: 'responsive', component: ResponsiveComponent },
      { shortcode: 'preferences', component: PreferencesComponent },
    ]),
  ],
})
export class MediaObservableModule {}
