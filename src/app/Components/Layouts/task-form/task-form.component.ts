import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../Models/task.model';
import { TaskService } from '../../Services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  newTask: Task = { id: 0, title: '', description: '', completed: false, priority: 'Medium', };

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private taskService: TaskService,private snackBar: MatSnackBar) {}

  addTask(form: NgForm) {
    if (form.invalid) {
      form.controls['title'].markAsTouched();
      form.controls['description'].markAsTouched();
      return;
    }

    this.taskService.addTask(this.newTask).subscribe(task => {
      this.taskAdded.emit(task);
      this.newTask = { id: 0, title: '', description: '', completed: false, priority: 'Medium', }; // Reset the form
      form.resetForm(); // Reset form state
      
      // Show snackbar
      this.snackBar.open('Task added successfully!', 'Close', {
        duration: 2000, // Duration in milliseconds
      });
    });
  }
}
