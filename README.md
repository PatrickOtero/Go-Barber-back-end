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
      4° - Clone este repositório para o seu computador, vá até a pasta clonada e execute seu terminal na mesma.
      5° - Execute o comando no diretório raíz (onde está localizada a pasta "src"): "npm i".
      6° - Espere o interpretador instalar todos os arquivos necessários para rodar o projeto.
      7° - Crie um arquivo ".env" na pasta raíz com a seguinte estrutura:
        DB_LOCAL_HOST=localhost
        DB_LOCAL_DATABASE=(nome do banco de dados)
        DB_LOCAL_USER=(username do servidor de banco de dados instalado)
        DB_LOCAL_PASSWORD=(senha do servidor de banco de dados instalado)
              
      8. Pegue as variáveis de ambiente acima e as use para preencher os seus respectivos campos no arquivo "knexfile.js",
pois no arquivo "connection.js" os campos já estão preenchidos.
      9° - Execute o comando no mesmo local: "npm run dev"
      10° - Aguarde a abertura do servidor Backend no seu terminal para começar a usar o front-end (interface) da aplicação.
 
#### - Comandos que deverão ser executados em ordem para que a api funcione:
                     
 ### Importante: Se os passos não forem efetuados corretamente, a aplicação não funcionará como deveria e talvez nem se quer funcione.
 ### Importante 2: É necessário banco de dados SQL.
 
 #### Se problemas persistirem, verifique se seu banco de dados é suportado pelo Knex.js.

 ### OBS: Serviço de recuperação de senha não funcionará localmente, pois é necessário o uso de credenciais de um servidor de e-mails para o "nodemailer.js".
 
