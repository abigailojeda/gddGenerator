import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {
  @Output() toggleShowCreateProjectModal = new EventEmitter<any>();
  @Output() updateProjects = new EventEmitter<any>();

  public projectName = ''
  public projectDescription = ''
  private userId: string | null = ''
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user') || '';
  }

  public hideModal() {
    this.toggleShowCreateProjectModal.emit()
  }

  public createProject() {
    let body = {
      user_id: this.userId,
      project_name: this.projectName,
      description: this.projectDescription
    }

    console.log(this.projectName)
    this.gameService.createProject(body)
      .subscribe(
        (res) => {
          console.log(res)
          this.updateProjects.emit()
          this.toggleShowCreateProjectModal.emit()
        }
      );
  }
}
