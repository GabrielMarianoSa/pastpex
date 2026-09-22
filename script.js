const chaveEstoque = "luBabyEstoque";
let produtos = JSON.parse(localStorage.getItem(chaveEstoque) || "[]");

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const estadoVazio = document.getElementById("estadoVazio");
const pesquisa = document.getElementById("pesquisa");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const campos = {
        nome: document.getElementById("produto").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        preco: Number(document.getElementById("preco").value),
        quantidade: Number(document.getElementById("quantidade").value)
    };

    if (!campos.nome || !campos.categoria || campos.preco < 0 || campos.quantidade < 0) return;
    produtos.push(campos);
    salvarERenderizar();
    form.reset();
    document.getElementById("produto").focus();
});

pesquisa.addEventListener("input", renderizar);

function salvarERenderizar() {
    localStorage.setItem(chaveEstoque, JSON.stringify(produtos));
    renderizar();
}

function renderizar() {
    const termo = pesquisa.value.toLowerCase().trim();
    const filtrados = produtos.map((produto, indice) => ({ produto, indice })).filter(({ produto }) =>
        `${produto.nome} ${produto.categoria}`.toLowerCase().includes(termo)
    );

    lista.innerHTML = filtrados.map(({ produto, indice }) => `
        <tr>
            <td>${escapar(produto.nome)}</td>
            <td>${escapar(produto.categoria)}</td>
            <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
            <td><span class="badge ${produto.quantidade <= 3 ? "baixo" : ""}">${produto.quantidade}${produto.quantidade <= 3 ? " · baixo" : ""}</span></td>
            <td class="acoes">
                <button class="acao vender" data-acao="vender" data-indice="${indice}" type="button" ${produto.quantidade === 0 ? "disabled" : ""}>Registrar venda</button>
                <button class="acao" data-acao="editar" data-indice="${indice}" type="button">Editar qtd.</button>
                <button class="acao excluir" data-acao="excluir" data-indice="${indice}" type="button">Excluir</button>
            </td>
        </tr>
    `).join("");

    estadoVazio.hidden = filtrados.length > 0;
    atualizarResumo();
}

lista.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button");
    if (!botao) return;
    const indice = Number(botao.dataset.indice);

    if (botao.dataset.acao === "vender" && produtos[indice].quantidade > 0) {
        produtos[indice].quantidade -= 1;
        salvarERenderizar();
    }

    if (botao.dataset.acao === "excluir") {
        produtos.splice(indice, 1);
        salvarERenderizar();
    }

    if (botao.dataset.acao === "editar") {
        const novaQuantidade = prompt(`Nova quantidade para ${produtos[indice].nome}:`, produtos[indice].quantidade);
        if (novaQuantidade !== null && Number.isInteger(Number(novaQuantidade)) && Number(novaQuantidade) >= 0) {
            produtos[indice].quantidade = Number(novaQuantidade);
            salvarERenderizar();
        }
    }
});

function atualizarResumo() {
    document.getElementById("totalProdutos").textContent = produtos.length;
    document.getElementById("totalUnidades").textContent = produtos.reduce((total, produto) => total + produto.quantidade, 0);
    document.getElementById("totalBaixo").textContent = produtos.filter((produto) => produto.quantidade <= 3).length;
}

function escapar(texto) {
    return texto.replace(/[&<>"']/g, (caractere) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[caractere]));
}

renderizar();
