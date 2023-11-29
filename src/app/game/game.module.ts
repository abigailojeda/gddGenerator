import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import { GameItemComponent } from './game-item/game-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';


@NgModule({
  declarations: [
    GamePageComponent,
    GameItemComponent,
    CreateProjectModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GameRoutingModule,
    SharedModule  ]
})
export class GameModule { }
