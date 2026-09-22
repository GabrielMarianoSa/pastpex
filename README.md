# Sistema de Estoque Lu Baby

Sistema simples de controle de estoque feito com HTML, CSS e JavaScript. Ele funciona diretamente no navegador, sem instalar programas ou usar banco de dados.

## Como abrir no VS Code

1. Abra a pasta `pastpex` no VS Code.
2. Abra o arquivo `index.html` no navegador com duplo clique.
3. Cadastre um produto preenchendo nome, categoria, preco e quantidade.
4. Use `Editar qtd.` para alterar a quantidade e `Excluir` para remover um produto.
5. Quando houver uma venda, clique em `Registrar venda`: uma unidade sera retirada automaticamente.
6. Feche e abra a pagina novamente: os dados continuam salvos neste navegador.

O estoque e considerado baixo quando tem 3 unidades ou menos.

## Como entregar o PEX com um link

A opcao mais simples e usar o GitHub Pages:

1. Crie uma conta em `github.com` e um repositorio publico chamado `pastpex`.
2. No repositorio, clique em `Add file` e envie `index.html`, `style.css`, `script.js` e `README.md`.
3. Abra `Settings` > `Pages`.
4. Em `Source`, escolha `Deploy from a branch`, selecione `main` e a pasta `/ (root)`.
5. Salve e aguarde alguns minutos. O GitHub vai mostrar o link publico do projeto.

Envie esse link na entrega do PEX. Para uma demonstracao, cadastre produtos antes de apresentar no mesmo navegador.

Este prototipo salva os dados apenas no navegador usando `localStorage`. Para varias pessoas compartilharem o mesmo estoque, a proxima evolucao seria usar um banco de dados e login.
