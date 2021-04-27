import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakPointsComponent } from './breakpoints.component';
import { ShortcodeModule } from '@notiz/shortcodes';
import { DescriptionModule } from '../components/description/description.module';
import { PreferencesComponent } from './preferences.component';

@NgModule({
  declarations: [BreakPointsComponent, PreferencesComponent],
  imports: [
    CommonModule,
    DescriptionModule,
    ShortcodeModule.forChild([
      { shortcode: 'breakpoints', component: BreakPointsComponent },
      { shortcode: 'preferences', component: PreferencesComponent },
    ]),
  ],
})
export class MediaObservableModule {}
