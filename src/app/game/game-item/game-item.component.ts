import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() moodColor:string='#d9d1f1'
  @Input() item:any

  constructor() { }

  ngOnInit(): void {
  }

}
