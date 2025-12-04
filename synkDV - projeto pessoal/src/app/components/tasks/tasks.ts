import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Card } from '../card/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TasksFooter } from '../tasks-footer/tasks-footer';

import milestonesAndTasksData from '../../../assets/files/tasks-page/milestones-and-tasks/milestones-and-tasks.json';
import { UserService } from '../../services/user/user.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import tabsData from '../../../assets/files/tasks-page/tabs/tabs.json';
import { Tab } from '../../../../common/tasks-page/tabs/tabs';


@Component({
  selector: 'app-tasks',
  imports: [MatIconModule,MatMenuModule,MatProgressBarModule,Card,TasksFooter,CommonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tasks {
  constructor(private cdr: ChangeDetectorRef,private userService: UserService,private sanitizer: DomSanitizer,private router: Router){}

  profile_picture!: SafeResourceUrl | null;
  tabs: Tab[] = [];

  ngOnInit() {
    this.tabs = tabsData.map(p => new Tab(p.title));
    // força renderização imediata por causa do OnPush
    this.cdr.detectChanges();

    
    this.userService.getProfile().subscribe(res => {
      if (res?.user?.profile_picture) {
        const fullUrl = `http://localhost:3000${res.user.profile_picture}`;

        this.profile_picture = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
      } else {
        this.profile_picture = null;
      }

      this.cdr.detectChanges();
    });

  }

  Configuracoes() {
    console.log("Usuário clicou em configurações");
    this.router.navigate(['/userConfigs']);
  }

  Logout() {
    this.userService.logout().subscribe({
      next: () => {
        console.log("Logout realizado com sucesso!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Erro ao fazer logout:", err);
      }
    });
  }


  // sistema de animação para o search input aparecer
  isOpen = false;
  milestones = milestonesAndTasksData.map(m => ({
    ...m,
    inQueueTasks: (m.inQueueTasks || []).map(t => ({ ...t })),
    finishedTasks: (m.finishedTasks || []).map(t => ({ ...t }))
  }));


  toggleSearch() {
    this.isOpen = !this.isOpen;

    const searchInput = document.getElementById("search-input")!;
    const searchLabel = document.getElementById("search-label")!;
    const searchInputText = document.getElementById("search-input-text")!;
    
    let inputDelayAnimation: any;

    if (this.isOpen) {
      searchLabel.style.display = "block";
      searchInputText.style.display = "block";
      searchInput.style.display = "block";
      inputDelayAnimation = setTimeout(() => {
        searchInput.style.opacity = "100%";
        searchInput.style.transitionDuration = "0.2s";
      }, 100);
    } else {
      clearTimeout(inputDelayAnimation);
      searchInput.style.opacity = "0%";
      searchInput.style.transitionDuration = "0s";
      searchLabel.style.display = "none";
      searchInputText.style.display = "none";
      searchInput.style.display = "none";
    }
  }

  logoNavigate(){
    this.router.navigate(['/folders']);
  }

}
