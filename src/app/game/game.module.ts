import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import { GameItemComponent } from './game-item/game-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';


@NgModule({
  declarations: [
    GamePageComponent,
    GameItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GameRoutingModule
  ]
})
export class GameModule { }
