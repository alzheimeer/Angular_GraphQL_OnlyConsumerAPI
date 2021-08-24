import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Character } from '@app/shared/interfaces/data.interfaces';

import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent implements OnInit {
  @Input() character!: Character;
  constructor(private localStorageSvc: LocalStorageService) { }

  ngOnInit(): void {
  }

  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
  toggleFavorite(): void {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStorageSvc.addorRemoveFavorite(this.character);
  }
}
