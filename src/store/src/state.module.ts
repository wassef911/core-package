import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { environment } from 'src/environments/environment';

import { ManagerEffects } from './user/manager.effects';
import { UserEffects } from './user/user.effects';

import { reducers } from '.';
@NgModule({
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    (environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 })),
    EffectsModule.forRoot([UserEffects, ManagerEffects]),
  ],
  declarations: [],
})
export class StateModule { }
