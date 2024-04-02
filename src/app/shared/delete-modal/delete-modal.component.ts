import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Output() deleteItem = new EventEmitter<any>();
  @Output() toggleShowModal = new EventEmitter<any>();
  @Input() item: any
  @Input() valueToShow: string=''

  constructor() { }


  public emitDelete() {
    this.deleteItem.emit()
  }

  public hideModal() {
    this.toggleShowModal.emit()
  }

}
