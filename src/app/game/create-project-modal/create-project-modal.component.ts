import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../services/game.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {
  @Output() toggleShowCreateProjectModal = new EventEmitter<any>();
  @Output() updateProjects = new EventEmitter<any>();


  private userId: string | null = ''
  public projectForm: FormGroup;

  //create a foirmBuilder to save projectName & projectDescription
  constructor(private gameService: GameService, private formBuilder: FormBuilder) {
    // Initialize the form with empty values
    this.projectForm = this.formBuilder.group({
      project_name: '',
      description: ''
    });
  }


  ngOnInit(): void {
    this.userId = localStorage.getItem('user') || '';
  }

  get projectName() {
    return this.projectForm.get('projectName')?.value;
  }

  get projectDescription() {
    return this.projectForm.get('projectDescription')?.value;
  }

  public hideModal() {
    this.toggleShowCreateProjectModal.emit()
  }

  public createProject() {
    let body = this.projectForm.value

    body.user_id = this.userId,


      console.log(this.projectName)
    this.gameService.createProject(body)
      .subscribe(
        (res) => {
          this.updateProjects.emit()
          this.toggleShowCreateProjectModal.emit()
        }
      );
  }


}
