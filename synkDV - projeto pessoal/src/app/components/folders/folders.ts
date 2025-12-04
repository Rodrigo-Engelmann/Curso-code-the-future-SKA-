import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';


// sistema de import do formulário genérico (popup)
import { GenericForm } from '../generic-form/generic-form';


import { UserService } from '../../services/user/user.service';
import { TeamsService, Team } from '../../services/team/teams.service';
import { Router } from '@angular/router';

import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';

import FilesAndFolders from '../../../assets/files/folders-page/files-and-folders/files-and-folders.json';
import gameAndAreas from '../../../assets/files/folders-page/game-and-areas/game-and-areas.json';


interface UserTeam {
  id: number;
  name: string;
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface User {
  id: number;
  username?: string;
  email?: string;
  profile_picture?: string;
  // outros campos se precisar
}


@Component({
  selector: 'app-folders',
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    GenericForm,
    ReactiveFormsModule
  ],
  templateUrl: './folders.html',
  styleUrl: './folders.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Folders {
  readonly panelOpenState = signal(true);

  profile_picture!: SafeResourceUrl | null;
  teams: Team[] = [];
  userId!: number; 
  hasConfirmBtn: boolean = false;
  static hasConfirmBtn: boolean;
  teamMembers: User[] = [];
  exibedMembersTeam: number | undefined;
  myTeams: Team[] = [];
  games: any[] = [];
  panelOpenStateMap: Map<number, boolean> = new Map();
  panelOpenStates: boolean[] = [];



  constructor(private userService: UserService, private router: Router,private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer, private teamsService: TeamsService,) {
    this.dataSource.data = EXAMPLE_DATA;
  }


  ngOnInit() {
    this.games = gameAndAreas;
    this.panelOpenStates = this.games.map(() => true);


    this.getTeamsFromUserID();

    this.userService.getProfile().subscribe(res => {
      if (res?.user?.profile_picture) {
        const fullUrl = `http://localhost:3000${res.user.profile_picture}`;

        this.profile_picture = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
      } else {
        this.profile_picture = null;
      }

      this.cdr.detectChanges();
    });


    // pega o usuário logado (façõ isso pra usar, em seguida, no upload de novos times, colocando o usuário como owner daquele time)
    this.userService.getProfile().subscribe({
      next: (res) => {
        if (res?.user?.id) {
          this.userId = res.user.id;
          this.findAllTeams();
        } else {
          console.error('User ID não encontrado no profile:', res);
        }
      },
      error: (err) => {
        console.error('Erro ao obter profile:', err);
      }
    });

    this.findAllTeams();

    // sistema json dos jogos + áreas
    this.games = gameAndAreas;
  }

  // sistema pra encontrar todos os times pela rota get e armazenas na variável global "teams"
  findAllTeams() {
    this.teamsService.findAll().subscribe(res => {
      this.teams = res;
      this.findTeamsByUser()
    });
  }
  
  // sistema pra encontrar os times que o usuário pertence
  findTeamsByUser() {
    const temp: Team[] = [];

    this.teams.forEach(team => {
      if (team.users?.some(user => user.id === this.userId)) {
        temp[temp.length] = team; // substituto do push()
      }
    });

    this.myTeams = [...temp]; // força nova referência
    console.log(this.myTeams);
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

  // tree
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  // sistema de link (pros arquivos)
  openLink(url: string) {
    window.open(url, '_blank');
  }

  disableContainerFatherPriority(event: MouseEvent) {
    event.stopPropagation();
  }


  // sistema de folder genérico (teste)
  popupOpen = false;
  currentPopup = '';
  openPopup(id: string) {
    this.popupOpen = true;
    this.currentPopup = id;

    if (this.currentPopup === 'addTeam' || this.currentPopup === 'addMembers') {
      this.hasConfirmBtn = true;
    } else if (this.currentPopup === 'teamList') {
      this.hasConfirmBtn = false;
    }
  }
  closePopup() {
    this.popupOpen = false;
  }

  saveGame() {
    console.log('salvou!');
    this.popupOpen = false;
  }



  getTeamsFromUserID(){
    this.userService.getProfile().subscribe({
      next: (res: { user: { id: number; teams: UserTeam[] } }) => {
        this.userId = res.user.id;


      },
      error: (err) => console.error('Erro ao buscar pelo usuário:', err)
    });
  }



  loadTeams() {
    this.teamsService.findAll().subscribe({
      next: (res) => {
        this.teams = res;
      },
      error: (err) => console.error('Erro ao carregar times:', err)
    });
  }


  teamForm = new FormGroup({
    name: new FormControl('', { nonNullable: true })
  });

  onConfirm() {
    // if (this.currentPopup === 'addTeam') {
    //   document.querySelector('.formPopup')?.dispatchEvent(
    //     new Event('submit', { cancelable: true, bubbles: true })
    //   );
    // }

    switch (this.currentPopup) {
      case 'addTeam':
        document.querySelector('.formPopup')?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );
        break;
      
      case 'teamList':
        console.log('Confirmou a aba de lista');
        break;
      
      case 'addMembers':
        this.findUserByEmail();
        break;
    }
  }



  createTeam() {
    if (!this.userId) {
      console.error('User ID não definido');
      return;
    }

    const name = this.teamForm.value.name?.trim();
    if (!name) {
      console.error('Nome do time é obrigatório');
      return;
    }

    // Payload incluindo o dono como um dos membros
    const payload = {
      name: name,
      owner: { id: this.userId },
      users: [{ id: this.userId }]
    };

    this.teamsService.register(payload).subscribe({
      next: (team) => {
        console.log('Time criado', team);

        // Atualiza a lista de times e abre o popup
        this.teamsService.findAll().subscribe({
          next: (res) => {
            this.teams = res || [];
            this.findAllTeams();
            setTimeout(() => {
              this.teamForm.reset();
              this.openPopup('teamList');
            }, 10);

          },
          error: (err) => console.error('Erro ao carregar times:', err)
        });
      },
      error: (err) => console.error('Erro ao criar time:', err)
    });
  }



  deleteTeam(id: any) {
    if (!confirm("Tem certeza que quer deletar este time?")) {
      return; // usuário cancelou
    }

    console.log(`Deletar o time: ${id}`);

    this.teamsService.delete(id).subscribe({
      next: () => {
        console.log("Time deletado com sucesso!");
        // remove localmente
        this.teams = this.teams.filter(team => team.id !== id);
        // recarregar a lista de times + voltar pro teamslist
        this.findAllTeams();
        setTimeout(() => {
          this.teamForm.reset();
          this.openPopup('teamList');
        }, 10);
      },
      error: (err) => console.error('Erro ao deletar time:', err)
    });
  }

  loadTeamMembers(teamId: number) {
    this.teamsService.findAll().subscribe({
      next: (teams: Team[]) => {
        // Busca o time pelo ID
        const team = teams.find(t => t.id === teamId);

        if (team) {
          // Pega os usuários do time
          this.teamMembers = team.users || [];
          this.exibedMembersTeam = team.id;

        } else {
          console.log(`Time com ID ${teamId} não encontrado`);
          this.teamMembers = [];
        }

        if (!team?.users || team.users.length === 0) {
          this.deleteTeam(this.exibedMembersTeam);
        }
      },
      error: (err) => console.error('Erro ao carregar times:', err)
    });
  }

  // sistema de remover um usuário de um time
  removeUser(userId: number) {
    this.teamsService.removeUserFromTeam(this.exibedMembersTeam!, userId).subscribe({
      next: (res) => {
        console.log('Usuário removido do time', res);
        // remove o time caso ele não tenha membros mais
        this.loadTeamMembers(this.exibedMembersTeam!);

        // atualiza tudo da lista
        this.findAllTeams();
        setTimeout(() => {
          this.teamForm.reset();
          this.openPopup('teamList');
        }, 10);
      },
      error: (err) => {
        console.error('Erro ao remover usuário do time', err);
      }
    });
  }



  searchEmail: string = '';

  // encontra o usuário pelo email
  findUserByEmail() {
    // this.userFound = null;
    console.log("click" + this.searchEmail)

    this.userService.getUserByEmail(this.searchEmail).subscribe({
      next: (user) => {
        // this.userFound = user;
        alert("Usuário adicionado com sucesso")
        this.addUserToTeam(this.exibedMembersTeam!,user.id)
      },
      error: (err) => {
        if (err.status === 404) {
          alert('Usuário não encontrado.');
        } else {
          console.error('Erro ao buscar usuário.');
        }
      }
    });
  }


  // adiciona usuário pra equipe (especificando o id da equipe e do usuário)
  addUserToTeam(teamId: number, userId: number) {
    this.teamsService.addUserToTeam(teamId, userId).subscribe({
      next: (res) => {
        console.log('Usuário adicionado com sucesso:', res);

        this.loadTeams?.();
      },
      error: (err) => {
        console.error('Erro ao adicionar usuário:', err);
      }
    });
  }


  // sistema de exibição de jogos e áreas por meio do .json e *ngFor no html

  getPanelState(id: number): boolean {
    return this.panelOpenStateMap.get(id) || false;
  }

  togglePanel(i: number, isOpen: boolean) {
    this.panelOpenStates[i] = isOpen;
    this.panelOpenStates = [...this.panelOpenStates];
  }
  

  // sistema de rota para a página de tarefas (futuramente, com backend, virá o id da área no parâmetro da função, mas por enquanto posso deixar mais simples)
  goToTasks() {
    this.router.navigate(['/tasks']);
  }



}

// obs.: cada "name: 'exemplo'" é um novo "cadastro" de documento/pasta, daí é definido qual será caso haja children ou não
const EXAMPLE_DATA: FoodNode[] = FilesAndFolders
