import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { map } from 'rxjs/operators';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { TaskItem } from '../tasks/task-item.model';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-async-pipe',
  templateUrl: './async-pipe.component.html',
  styleUrls: ['./async-pipe.component.scss'],
  standalone: true,
  imports: [
    MarkdownRendererComponent,
    MatCardModule,
    MatProgressBarModule,
    AsyncPipe,
    JsonPipe
  ],
})
export class AsyncPipeComponent implements OnInit {
  ts = inject(TaskService);

  // Imperative Approach using subscribe
  tasks: TaskItem[] = [];
  completedTasks: TaskItem[] = [];

  ngOnInit() {
    this.ts.getTasks().subscribe((data) => {
      this.tasks = data;
      this.completedTasks = this.tasks.filter((task) => task.completed === true);
    });
  }

  // Declarative Reactive Approach using async pipe
  tasks$ = this.ts.getTasks();
  completed$ = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.completed === true)
    )
  );
}
