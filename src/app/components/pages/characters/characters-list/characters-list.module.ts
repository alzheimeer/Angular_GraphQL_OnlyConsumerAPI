import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharactersCardModule } from '../characters-card/characters-card.module';
import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersListComponent } from './characters-list.component';


@NgModule({
  declarations: [
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    CharactersListRoutingModule,
    CharactersCardModule
  ]
})
export class CharactersListModule { }
