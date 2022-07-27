<h1>NICK</h1>
<p>Documentação com todas as informações necessárias para qualquer dev React.</p>
<h5>Tecnologias utilizadas</h5>
<small>O código é todo desenvolvido em NextJS (React) tanto o frontend, quanto backend. O lado backend fica localizado dentro da pasta API em SRC/PAGES. Para frontend está sendo usado CHAKRA UI. Para gestão do banco de dados, está sendo utilizado PRISMA.</small>
<h5>Gerar registros necessários</h5>
<small>Após configurar o banco em .env, para ser usado em PRISMA/schema.prisma e fazer o push, rode as url abaixo em seu navegador para o sistema criar alguns registros nas tabelas. Obs: A rota só vai funcionar uma vez, pois o único propósito é criar os registros. E para editar, é só entrar nas pastas com o mesmo nome dos arquivos em SRC/PAGES.</small><br />
<small>/api/roles/generate (gera os níveis de acesso, sobre o que cada usuário pode ver no painel como admin, lojista, entregador, etc...)</small><br />
<small>/api/users/generate/store (gera 1 loja, o e-mail e senha se encontram nesse arquivo)</small><br />


<h5>Cores e Temas da Loja</h5>
<small>O sistema suporta formato ecommerce ou marketplace (onde as lojas são geradas pelo acesso master). Para alterar esse formato, edite o arquivo:</small><br />
<small>/src/pages/api/storethemes/edit/index.ts</small>