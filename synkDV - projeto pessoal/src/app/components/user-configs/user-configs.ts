import { 
  Component, 
  EventEmitter, 
  OnInit, 
  Output 
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-user-configs',
  imports: [    
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './user-configs.html',
  styleUrl: './user-configs.scss',
})
export class UserConfigs implements OnInit {
  @Output() fileSelected = new EventEmitter<FileList>();

  // Campos do formulário
  db_user_name: string = '';
  db_email: string = '';
  profile_picture: string = 'assets/images/profile-picture-placeholder.jpg';
  selectedFile?: File;
  previewImage: string | null = null;

  editName: string = '';
  editEmail: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {

    this.userService.getProfile().subscribe({
      next: (res) => {
        this.db_user_name = res.user.username;
        this.db_email = res.user.email;

        const name_input = document.getElementsByClassName('mat-input-0')[0] as HTMLInputElement;
        const email_input = document.getElementById('mat-input-1') as HTMLInputElement;
        
        this.profile_picture = 'http://localhost:3000' + res.user.profile_picture;
      }
    });
  


    this.userService.getProfile().subscribe({
      next: (res) => {

        this.db_user_name = res.user.username;
        this.db_email = res.user.email;
        // nunca traga a senha real do backend! (inseguro demais)
        // this.db_password = res.user.password;

        const name_input = document.getElementsByClassName('mat-input-0')[0] as HTMLInputElement;
        const email_input = document.getElementById('mat-input-1') as HTMLInputElement;
        // const password_input = document.getElementsByClassName('mat-input-2')[0] as HTMLImageElement;

      },
      error: (err) => {
        console.error("Erro ao buscar perfil:", err);

        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });

  }


  

  handleFile(event: Event) {
    this.onFilesSelected(event);
  }

  // Abrir diálogo do file input
  openFileDialog(input: HTMLInputElement) {
    input.click();
  }

  // Selecionar imagem e criar preview
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Enviar dados para atualização
  saveChanges() {
    const formData = new FormData();
    formData.append('name', this.db_user_name);
    formData.append('email', this.db_email);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.userService.updateUser(formData).subscribe({
      next: (res) => {
        //alert('Dados atualizados com sucesso!');
        if (res.profile_picture) {
          // Atualiza preview da foto
          this.profile_picture = `http://localhost:3000${res.profile_picture}`;
        }
        // Atualiza campos locais com dados atualizados
        this.db_user_name = res.username;
        this.db_email = res.email;

        this.getBackToHome();
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        alert('Erro ao salvar mudanças.');
      },
    });
  }

  getBackToHome(){
    this.router.navigate(['/folders']);
  }
  
  deleteAccount() {
    if (!confirm("Tem certeza que deseja deletar sua conta? Isso é permanente!")) {
      return;
    }
    

    this.userService.deleteAccount().subscribe({
      next: (res) => {
        console.log("Conta deletada:", res);
        alert("Sua conta foi removida.");

        // desloga o usuário
        localStorage.removeItem('token');
      },
      error: (err) => {
        console.error("Erro ao deletar conta:", err);
        alert("Erro ao excluir conta.");
      }
    });

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



  getProfile() { 
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.profile_picture = res.user.profile_picture;
        this.db_user_name = res.user.username;
        this.db_email = res.user.email;
        // this.db_password = res.user.password;

        console.log(`Profile_picture: ${this.profile_picture}\nname ${this.db_user_name}\nemail: ${this.db_email}`);
        
        if (res.profile_picture) {
          this.profile_picture = 'http://localhost:3000' + res.profile_picture;
          this.previewImage = null; // limpa a preview, mostra foto final
        }

      }
    });
  }
}