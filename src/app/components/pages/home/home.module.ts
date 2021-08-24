import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharactersCardModule } from '../characters/characters-card/characters-card.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CharactersCardModule
  ]
})
export class HomeModule { }
