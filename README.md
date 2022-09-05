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
 
     1. Crie um arquivo ".env" na pasta raíz com a seguinte estrutura:

            - DB_LOCAL_HOST=localhost
              DB_LOCAL_DATABASE=(nome do banco de dados)
              DB_LOCAL_USER=(username do servidor de banco de dados instalado)
              DB_LOCAL_PASSWORD=(senha do servidor de banco de dados instalado)
              
     
     2. Pegue as variáveis de ambiente acima e as use para preencher os seus respectivos campos no arquivo "knexfile.js",
     pois no arquivo "connection.js" os campos já estão preenchidos.
 
 #### - Comandos que deverão ser executados em ordem para que a api funcione:
 
       - npm i ou yarn
       - npm run dev ou yarn dev
       - npm run migration:run ou yarn migration:run
       - npm run seed:run ou yarn seed:run
       
       
       
 ### Importante: Se os passos não forem efetuados corretamente, a aplicação não funcionará como deveria e talvez nem se quer funcione.
 ### Importante 2: É necessário banco de dados SQL.
 
 #### Se problemas persistirem, verifique se seu banco de dados é suportado pelo Knex.js.

 ### OBS: Serviço de recuperação de senha não funcionará localmente, pois é necessário o uso de credenciais de um servidor de e-mails para o "nodemailer.js".
 
