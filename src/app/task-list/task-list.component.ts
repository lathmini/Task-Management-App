import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '' };
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  addTask(): void {
    if (!this.newTask.title.trim()) { return; }
    this.taskService.addTask(this.newTask)
      .subscribe((task: Task) => {
        this.tasks.push(task);
        this.newTask = { title: '', description: '' };
      });
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe();
    }
  }

  editTask(task: Task): void {
    this.editingTask = { ...task };
  }

  saveTask(): void {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask)
        .subscribe(() => {
          const index = this.tasks.findIndex(task => task.id === this.editingTask?.id);
          if (index !== -1) {
            this.tasks[index] = { ...this.editingTask! };
          }
          this.cancelEdit();
        });
    }
  }

  cancelEdit(): void {
    this.editingTask = null;
  }
}
