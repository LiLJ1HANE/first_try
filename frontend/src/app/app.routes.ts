import { Routes } from '@angular/router';
import { RoomComponent } from './room/room.component'; // Chemin corrigé

export const routes: Routes = [
  { path: '', component: RoomComponent },
  { path: 'rooms', component: RoomComponent }
];