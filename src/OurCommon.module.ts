import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClipboardModule } from 'ngx-clipboard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { StatusColorPipe } from './pipes/status-color.pipe';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    StatusColorPipe,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FullCalendarModule,
    ClipboardModule,
    InfiniteScrollModule,
    NgMultiSelectDropDownModule,
  ],
  exports: [
    ClipboardModule,
    InfiniteScrollModule,
    StatusColorPipe,
    NgMultiSelectDropDownModule,
  ],
})
export class OurCommonModule { }
