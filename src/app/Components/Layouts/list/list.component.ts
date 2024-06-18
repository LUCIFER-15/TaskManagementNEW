import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../Models/task.model';
import { TaskService } from '../../Services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'priority', 'actions'];
  editingTaskIds: Set<number> = new Set<number>();
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // Add MatSort
  
  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Task>(this.tasks);
  }

  ngOnInit(): void {
    this.loadTasks();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Assign sort to dataSource
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.dataSource.data = tasks;
    });
  }

  isEditing(taskId: number): boolean {
    return this.editingTaskIds.has(taskId);
  }

  toggleEdit(taskId: number): void {
    if (this.isEditing(taskId)) {
      this.editingTaskIds.delete(taskId);
      this.saveTask(taskId);
    } else {
      this.editingTaskIds.add(taskId);
    }
  }

  saveTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      this.taskService.updateTask(task).subscribe(updatedTask => {
        this.snackBar.open('Task Updated successfully.', 'Close', {
          duration: 2000,
        });
      });
    }
  }

  onDelete(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.dataSource.data = this.tasks;
      this.snackBar.open('Task deleted Successfully.', 'Close', {
        duration: 2000,
      });
    });
  }

  onStatusChange(task: Task, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    task.completed = selectElement.value === 'true';
  }
}
