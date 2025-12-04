import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnInit, ChangeDetectorRef  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';  // <-- precisa disso para ngFor/ngIf

interface Task {
  title: string;
  description: string;
  term: string;
  priority: number;
  responsable: string;
  time: string;
  image: string;
}

interface Milestone {
  title: string;
  priority: number;
  inQueueTasks: Task[];
  finishedTasks: Task[];
}

@Component({
  selector: 'app-card',
  imports: [MatIconModule,CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
  @Input() milestone!: Milestone;
}
