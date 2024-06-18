import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Models/task.model';
import { TaskService } from '../../Services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  editMode = false;

  constructor(private taskService: TaskService,
              private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // duration in milliseconds
    });
  }

  enableEdit() {
    this.editMode = true;
  }

  saveTask() {
    this.taskService.updateTask(this.task).subscribe(updatedTask => {
      this.taskUpdated.emit(updatedTask);
      this.editMode = false; // Exit edit mode after saving
      this.openSnackBar('Task Updated successfully.', 'Close');
    });
  }

  cancelEdit() {
    this.editMode = false;
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.taskDeleted.emit(this.task.id);
      this.openSnackBar('Task deleted successfully.', 'Close');
    });
  }

  toggleComplete() {
    this.taskService.updateTask(this.task).subscribe(updatedTask => {
      this.taskUpdated.emit(updatedTask);
      this.openSnackBar(`Task marked as ${this.task.completed ? 'Complete' : 'Pending'}.`, 'Close');
    });
  }
}
