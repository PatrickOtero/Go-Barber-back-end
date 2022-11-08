# Go-barber-API

#### Link para o repositório de front-end da aplicação: https://github.com/PatrickOtero/Go-Barber-front-end

### - Api REST express para o web-app feito apenas com Javascript.

#### - Tecnologias utilizadas: 
 - Node
 - Javascript
 - PostgreSQL
 - Express
 - Knex
 - Nodemailer
 - Handlebars
 - Bcrypt
 - Jsonwebtoken
 - Yup
 - Date-fns
 
 #### - O que precisa ser feito para que a api funcione?
 
      1° - Baixe a engine (motor) que interpretará as funcionalidades das dependências em javascript, o Node, através deste link: https://nodejs.org/en/download/
      2° - Selecione o instalador de acordo com o seu sistema operacional e arquitetura (32-bit ou 64-bit)
      3° - Ao abrir o instalador do Node, pressione o botão "next" até aparecer a opção de instalar um software chamado "Chocolatey". Não instale ele e prossiga até o final.
      4° - Baixe e instale um banco de dados SQL, eu recomendo o PostgreSQL. Link de um tutorial atualizado e simples: https://www.hashtagtreinamentos.com/instalacao-do-postgresql-sql.
      5° - Clone este repositório para o seu computador, vá até a pasta clonada e execute seu terminal na mesma.
      6° - Execute o comando no diretório raíz (onde está localizada a pasta "src"): "npm i".
      7° - Espere o interpretador instalar todos os arquivos necessários para rodar o projeto.
      8° - Crie um arquivo ".env" na pasta raíz com a seguinte estrutura:
        DB_LOCAL_HOST=localhost
        DB_LOCAL_DATABASE=(nome do banco de dados)
        DB_LOCAL_USER=(username do servidor de banco de dados instalado)
        DB_LOCAL_PASSWORD=(senha do servidor de banco de dados instalado)
              
      9° - Pegue as variáveis de ambiente acima e as use para preencher os seus respectivos campos no arquivo "knexfile.js",
      pois no arquivo "connection.js" os campos já estão preenchidos.
      10° - Execute no seu terminal o comando: "npm run migration:run".
      11° - Execute no seu terminal o comando: "npm run seed:run".
      12° - Execute o comando no mesmo local: "npm run dev".
      13° - Aguarde a abertura do servidor Backend no seu terminal para começar a usar o front-end (interface) da aplicação.
                     
 ### Importante: Se os passos não forem efetuados corretamente, a aplicação não funcionará.

 ### OBS: Serviço de recuperação de senha não funcionará localmente, pois é necessário o uso de credenciais de um servidor de e-mails para o arquivo "nodemailer.js".
 
