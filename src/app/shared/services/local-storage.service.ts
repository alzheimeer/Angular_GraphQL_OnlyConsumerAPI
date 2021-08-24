import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Character } from './../interfaces/data.interfaces';

const MY_FAVORITES = 'myFavorites';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor() {
    this.initialStorage();
  }

  addorRemoveFavorite(character: Character): void {
    // Destructuramos el id del character
    const { id } = character;
    // Recuperamos la lista de personajes
    const currentsFav = this.getFavoriteCharacters();
    // find busca el primer elemento que cumpla con la condicion, si no encuentra devuelve "undefine"
    // !! casteamos hacia un booleano, si llega a ser undefined , null o 0 lo cambia por false, de lo contrario seria true
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    // y ya aca evaluamos si found es true o false
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      // Obtenemos los favoritos actuales
      const currentsFav = this.getFavoriteCharacters();
      // hacemos un merge de los fv actuales y el personaje que llego
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]));
      // Actualizamos el observable
      this.charactersFavSubject.next([...currentsFav, character]);
    } catch (error) {
      console.log('Error saving localStorage', error);
      alert('Error');
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      // Recuperamos los favoritos actuales
      const currentsFav = this.getFavoriteCharacters();
      // Filtramos, filter nos devuelve un array con todos los elementos que nos pasaron
      const characters = currentsFav.filter((item: any) => item.id != id);
      // guardamos la nueva lista de favoritos
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      // Actualizamos el observable
      this.charactersFavSubject.next([...characters]);
    } catch (error) {
           console.log('Error saving localStorage', error);
           alert('Error');
    }
  }

  getFavoriteCharacters(): any {
    try {
      // Recuperamoslos datos del localstorage
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES) || '0');
      // Almacenamos en nuestro subject lo que recuperamos del localstorage
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error)
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error limpiando el localStorage', error);
    }  
  }

  private initialStorage(): void {
    // Evalua si existe y si no crea un []
    const current = JSON.parse(localStorage.getItem(MY_FAVORITES) || '0');
    // Colocamos  || '0' para saltar la proteccion de ts y evitamos el null
    if (!current || current == 0) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoriteCharacters();
   }
}
