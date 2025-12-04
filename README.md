# Curso-code-the-future-SKA-
Tarefas e projetos desenvolvidos durante o curso [Code The Future - SKA Senac](https://github.com/CodeTheFuture-SKA-Senac).

Inclui figmas, códigos do projeto final e atividades realizadas em aula.


SOBRE O PROJETO SYNKDV - dependências
Eu usei o nome 10.9.4 (dependendo do caso pode fazer as APIs utilizadas para o backend não funcionarem corretamente)

 - COMO RODAR O FRONTEND:
    - Basta abir o bash na pasta raíz do projeto e rodar: 
    1 - npm install
    2 - npm start

 - COMO RODAR O BACKEND:
    - Esse processo é um pouco mais complexo:
    Aviso: o frontend e o backend são localhosts diferentes, para acessar o site final (front+back) basta simplesmente abrir o projeto pelo localhost do front (o do angular).
    1 - baixar mysql workbench
        - criar um novo projeto
            - rodar o código "CREATE DATABASE synkDV_db;"
                AVISO: como o backend acessa o database pegando as infomações de acesso para o workbench, dependendo do contexto, ao baixar essa ferramenta, ela esteja com a senha ou inexistente ou diferente de 'root'. Como corrigir: tu deve ir até o app.module.ts, no backend, e alterar o "password" para:
                 - '' caso tu não tenha senha ou
                 - 'sua senha' caso tu tenha uma senha só que difernete de 'root'.
    2 - ao baixar o workbench e criar uma database, agora, basta somente entrar no git bash na pasta raíz do projeto e rodar os seguintes comandos:
        - npm install
        - npm run start:dev


O QUE TEM DE BACKEND NO PROJETO?
 - eu tive tempo somente para fazer o sistema do usuário (cadastro, login, edição de prifle, logout, deletar conta) e o sistema de times (ícone ao lado da foto de perfil na página de arquivos: criar time, deletar time, visualizar membros, remover membros, etc.)
   - O resto eu fiz utilizando .json.

Caso estejam com problemas e/ou dúvidas ao rodar o projeto, podem me mandar mensagem pelo Teams.
