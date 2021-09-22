import { NgModule } from '@angular/core';

import { IntersectionDirective } from './intersection.directive';

@NgModule({
  exports: [IntersectionDirective],
  declarations: [IntersectionDirective],
})
export class IntersectionModule {}
