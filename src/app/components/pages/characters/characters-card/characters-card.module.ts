import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CharactersCardComponent } from './characters-card.component';



@NgModule({
  declarations: [CharactersCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [CharactersCardComponent],
})
export class CharactersCardModule {}
