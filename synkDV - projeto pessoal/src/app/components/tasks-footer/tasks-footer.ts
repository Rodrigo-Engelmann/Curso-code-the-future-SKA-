import {ChangeDetectionStrategy, Component, signal, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import inProgressTaskData from '../../../assets/files/tasks-page/in-progress-task/in-progress-task.json';


interface InProgressTask {
  title: string;
  term: string;
  description: string;
  priority: number;
  responsable: string;
  time: string;
  image: string;
  consultants: string;
  approvers: string;
}

@Component({
  selector: 'app-tasks-footer',
  imports: [MatExpansionModule,MatProgressBarModule,MatIconModule],
  templateUrl: './tasks-footer.html',
  styleUrl: './tasks-footer.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFooter {
  constructor(private cdr: ChangeDetectorRef){}
  
  // valor que será transcrito para a barra de progresso
  value = 75;
  personalValue = 25;
  inProgressTask: InProgressTask = inProgressTaskData[0];

  ngOnInit() {
    this.inProgressTask = inProgressTaskData[0];
    this.cdr.detectChanges();
  }

  getColorPercent(value: number): string {
    value = Math.max(0, Math.min(100, value));

    const color0 = { r: 0xF6, g: 0x79, b: 0x7B };
    const color50 = { r: 0xF6, g: 0xB8, b: 0x79 };
    const color100 = { r: 0x8D, g: 0xCC, b: 0x67 };

    let start, end, percent;

    if (value <= 50) {
      start = color0;
      end = color50;
      percent = value / 50;
    } else {
      start = color50;
      end = color100;
      percent = (value - 50) / 50;
    }

    const r = Math.round(start.r + (end.r - start.r) * percent);
    const g = Math.round(start.g + (end.g - start.g) * percent);
    const b = Math.round(start.b + (end.b - start.b) * percent);

    return `#${r.toString(16).padStart(2, '0')}` + `${g.toString(16).padStart(2, '0')}` + `${b.toString(16).padStart(2, '0')}`;
  }


  getBorderRadius(value: number): string {
    const normalized = value / 100;

    // tentativa de balancear um bom valor mínimo e máximo: é impossível de fazer perfeitamente, já que o border-radius responde diferente dependendo do width
    const minRadius = 4;
    const maxRadius = 2;

    // cálculo interpolado: semelhante ao que eu fiz lá pra função que define a cor a partir do "value"
    const radius = minRadius + (maxRadius - minRadius) * normalized;

    return `${radius}px`;
  }

  getProgressTextLeftValue(value: number): string {
    const normalized = value / 100;
    
    // estimativas do valor de começo "7%" e final "100%"
    const start = 55.5;
    const end = 89.5;

    const leftPosition = start + (end - start) * normalized;


    if (value < 7) {
      return '71,75vw';
    }

    return `${leftPosition}vw`;
  }

  getProgressTextColor(value: number): string {
    if (value < 7) {
      return this.getColorPercent(value);
    }

    return '#232227';
  }

}
