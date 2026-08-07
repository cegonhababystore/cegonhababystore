/* =========================================================
   CEGONHA BABY STORE
   =========================================================

   COMO ADICIONAR NOVOS PRODUTOS NO FUTURO:
   1) Coloque a foto na mesma pasta do site.
   2) Copie UM objeto dentro da lista PRODUTOS abaixo.
   3) Troque id, nome, categoria, preço, imagem e descrição.

   Categorias aceitas atualmente:
   "bebe", "menina" e "menino".

   Exemplo:
   {
       id: 5,
       nome: "Body Infantil Rosa",
       categoria: "bebe",
       categoriaLabel: "Bebês",
       preco: 59.90,
       precoAntigo: 69.90,
       imagem: "./body-rosa.jpeg",
       badge: "Novo 💕",
       tipoBadge: "novidade",
       avaliacoes: 0,
       descricao: "Body infantil macio e confortável."
   },
   ========================================================= */

const PRODUTOS = [
    {
        id: 1,
        nome: "Conjunto Pijama Infantil Masculino",
        categoria: "menino",
        categoriaLabel: "Menino",
        preco: 89.90,
        precoAntigo: 105.90,
        imagem: "./fotovitrine1m.jpeg",
        badge: "15% OFF",
        tipoBadge: "desconto",
        avaliacoes: 24,
        descricao: "Conjunto de pijama masculino infantil confeccionado em algodão premium, extremamente macio e confortável."
    },
    {
        id: 2,
        nome: "Body Feminino Laranja Premium",
        categoria: "bebe",
        categoriaLabel: "Bebês",
        preco: 68.90,
        precoAntigo: null,
        imagem: "./body feminino laranja.jpeg",
        badge: "Destaque ✨",
        tipoBadge: "novidade",
        avaliacoes: 14,
        descricao: "Lindo body feminino na cor laranja, confeccionado em tecido de toque macio e confortável para o dia a dia."
    },
    {
        id: 3,
        nome: "Pijama Macacão Plush Corações",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 129.90,
        precoAntigo: null,
        imagem: "./macacão rosa com corações.jpeg",
        badge: "Fofura 💕",
        tipoBadge: "novidade",
        avaliacoes: 28,
        descricao: "Aconchegante macacão longo infantil, perfeito para dias mais amenos e noites confortáveis."
    },
    {
        id: 4,
        nome: "Macacão Infantil Feminino Bege",
        categoria: "bebe",
        categoriaLabel: "Bebês",
        preco: 115.00,
        precoAntigo: null,
        imagem: "./macacão feminino bege.jpeg",
        badge: "Novo 🧸",
        tipoBadge: "novidade",
        avaliacoes: 19,
        descricao: "Elegante macacão infantil feminino confeccionado em malha de toque suave, ideal para conforto e estilo."
    }
];

const NUMERO_WHATSAPP = "5597984154273";
const CHAVE_CARRINHO = "cegonhaBabyStoreCarrinho";

let carrinho = carregarCarrinho();
let categoriaAtual = "todos";
let mouseArrastou = false;

function normalizarPreco(valor) {
    if (typeof valor === "number") {
        return Number.isFinite(valor) ? valor : NaN;
    }

    if (typeof valor !== "string") return NaN;

    let texto = valor
        .replace(/R\$/gi, "")
        .replace(/\s/g, "")
        .trim();

    if (!texto) return NaN;

    // Aceita formatos como 89.90, 89,90, R$ 89,90 e 1.299,90.
    if (texto.includes(",") && texto.includes(".")) {
        texto = texto.replace(/\./g, "").replace(",", ".");
    } else if (texto.includes(",")) {
        texto = texto.replace(",", ".");
    }

    const numero = Number(texto);
    return Number.isFinite(numero) ? numero : NaN;
}

function moeda(valor) {
    const numero = normalizarPreco(valor);
    const seguro = Number.isFinite(numero) ? numero : 0;

    return seguro.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function carregarCarrinho() {
    try {
        const salvo = localStorage.getItem(CHAVE_CARRINHO);
        if (!salvo) return [];

        const dados = JSON.parse(salvo);
        if (!Array.isArray(dados)) return [];

        // Corrige automaticamente carrinhos salvos por versões antigas do site.
        return dados.map(item => {
            const id = Number(item.id);
            const produtoAtual = encontrarProduto(id);
            const precoSalvo = normalizarPreco(item.preco ?? item.price ?? item.valor);
            const preco = produtoAtual ? normalizarPreco(produtoAtual.preco) : precoSalvo;
            const quantidade = Math.max(1, parseInt(item.quantidade ?? item.qty ?? 1, 10) || 1);

            return {
                id,
                nome: produtoAtual?.nome || item.nome || item.name || "Produto",
                preco,
                imagem: produtoAtual?.imagem || item.imagem || item.image || "",
                quantidade
            };
        }).filter(item => Number.isFinite(item.id) && Number.isFinite(item.preco));
    } catch (_) {
        return [];
    }
}

function salvarCarrinho() {
    try {
        localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
    } catch (_) {
        // O site continua funcionando mesmo se o navegador bloquear o localStorage.
    }
}

function encontrarProduto(id) {
    return PRODUTOS.find(produto => produto.id === Number(id));
}

function renderizarProdutos(categoria = categoriaAtual) {
    categoriaAtual = categoria;
    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    const produtosFiltrados = categoria === "todos"
        ? PRODUTOS
        : PRODUTOS.filter(produto => produto.categoria === categoria);

    if (produtosFiltrados.length === 0) {
        lista.innerHTML = '<div class="sem-produtos">Nenhum produto encontrado nesta categoria.</div>';
        return;
    }

    lista.innerHTML = produtosFiltrados.map(produto => {
        const classeBadge = produto.tipoBadge === "desconto"
            ? "produto-badge-desconto"
            : "produto-badge-novidade";

        const precoAntigo = produto.precoAntigo
            ? `<span class="preco-antigo">${moeda(produto.precoAntigo)}</span>`
            : "";

        return `
            <article class="produto-card" data-categoria="${produto.categoria}">
                ${produto.badge ? `<div class="${classeBadge}">${produto.badge}</div>` : ""}

                <div class="produto-imagem" data-produto-id="${produto.id}" onclick="abrirDetalhes(${produto.id})" role="button" tabindex="0" aria-label="Ver detalhes de ${escaparTexto(produto.nome)}">
                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        loading="lazy"
                        draggable="false"
                        onerror="imagemComErro(this, '${escaparTexto(produto.nome)}')"
                    >
                </div>

                <div class="produto-info">
                    <span class="produto-categoria">${produto.categoriaLabel}</span>
                    <h3>${produto.nome}</h3>
                    <div class="produto-estrelas">★★★★★ (${produto.avaliacoes})</div>

                    <div class="produto-preco-bloco">
                        <span class="preco-atual">${moeda(produto.preco)}</span>
                        ${precoAntigo}
                    </div>
                    <small class="parcelamento">ou 6x de ${moeda(produto.preco / 6)} sem juros</small>

                    <button class="btn-comprar" type="button" onclick="adicionarProduto(${produto.id})">
                        Adicionar à Sacola
                    </button>
                </div>
            </article>
        `;
    }).join("");

    lista.scrollTo({ left: 0, behavior: "smooth" });
}

function escaparTexto(texto) {
    return String(texto).replace(/'/g, "&#39;");
}

function imagemComErro(img, nomeProduto = "Produto") {
    if (!img || img.dataset.erroTratado === "sim") return;
    img.dataset.erroTratado = "sim";
    img.style.display = "none";

    const bloco = img.parentElement;
    if (!bloco || bloco.querySelector(".fallback-foto")) return;

    const fallback = document.createElement("div");
    fallback.className = "fallback-foto";
    fallback.innerHTML = `
        <span style="font-size:34px">🧸</span>
        <strong>Foto não encontrada</strong>
        <span>${nomeProduto}</span>
    `;
    bloco.appendChild(fallback);
}

function alternarCarrinho(abrir) {
    const lateral = document.getElementById("carrinho-lateral");
    const overlay = document.getElementById("carrinho-overlay");
    if (!lateral || !overlay) return;

    lateral.classList.toggle("aberto", abrir);
    overlay.classList.toggle("aberto", abrir);
    document.body.style.overflow = abrir ? "hidden" : "";
}

function gerenciarMenuAtivo(elemento) {
    document.querySelectorAll("header nav a").forEach(link => link.classList.remove("ativo"));
    if (elemento) elemento.classList.add("ativo");
}

function adicionarProduto(id, nomeAntigo, precoAntigo, imagemAntiga) {
    // Compatível tanto com o novo formato adicionarProduto(id)
    // quanto com o formato antigo adicionarProduto(id, nome, preco, imagem).
    const produtoEncontrado = encontrarProduto(id);
    const produto = produtoEncontrado || {
        id: Number(id),
        nome: nomeAntigo,
        preco: normalizarPreco(precoAntigo),
        imagem: imagemAntiga
    };

    const precoSeguro = normalizarPreco(produto.preco);
    if (!produto || !produto.nome || !Number.isFinite(precoSeguro)) return;

    const itemExistente = carrinho.find(item => item.id === Number(produto.id));
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: Number(produto.id),
            nome: produto.nome,
            preco: precoSeguro,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarInterfaceCarrinho();
    alternarCarrinho(true);
}

function alterarQuantidade(id, diferenca) {
    const item = carrinho.find(item => item.id === Number(id));
    if (!item) return;

    item.quantidade += diferenca;
    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.id !== Number(id));
    }

    salvarCarrinho();
    atualizarInterfaceCarrinho();
}

function removerProduto(id) {
    carrinho = carrinho.filter(item => item.id !== Number(id));
    salvarCarrinho();
    atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
    const conteinerItens = document.getElementById("carrinho-itens");
    const contadorSacola = document.getElementById("contador-carrinho");
    const totalSacola = document.getElementById("carrinho-total");

    if (!conteinerItens || !contadorSacola || !totalSacola) return;

    // Revalida os preços antes de desenhar o carrinho para nunca mostrar NaN.
    carrinho = carrinho.map(item => {
        const produtoAtual = encontrarProduto(item.id);
        const preco = produtoAtual
            ? normalizarPreco(produtoAtual.preco)
            : normalizarPreco(item.preco);

        return {
            ...item,
            nome: produtoAtual?.nome || item.nome,
            imagem: produtoAtual?.imagem || item.imagem,
            preco,
            quantidade: Math.max(1, parseInt(item.quantidade, 10) || 1)
        };
    }).filter(item => Number.isFinite(item.preco));

    salvarCarrinho();

    const totalPecas = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    const valorTotal = carrinho.reduce((soma, item) => soma + (normalizarPreco(item.preco) * item.quantidade), 0);

    contadorSacola.textContent = totalPecas;
    totalSacola.textContent = moeda(valorTotal);

    if (carrinho.length === 0) {
        conteinerItens.innerHTML = '<p class="carrinho-vazio">Sua sacola está vazia... 🥺</p>';
        return;
    }

    conteinerItens.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">
            <img src="${item.imagem}" alt="${item.nome}" onerror="this.style.visibility='hidden'">
            <div class="item-info">
                <h5>${item.nome}</h5>
                <p>${moeda(item.preco)} cada</p>
                <div class="item-acoes">
                    <button class="btn-quantidade" type="button" onclick="alterarQuantidade(${item.id}, -1)" aria-label="Diminuir quantidade">−</button>
                    <strong>${item.quantidade}</strong>
                    <button class="btn-quantidade" type="button" onclick="alterarQuantidade(${item.id}, 1)" aria-label="Aumentar quantidade">+</button>
                    <button class="btn-remover" type="button" onclick="removerProduto(${item.id})">Remover</button>
                </div>
            </div>
        </div>
    `).join("");
}

function filtrarProdutos(categoria, botao) {
    document.querySelectorAll(".btn-filtro").forEach(btn => btn.classList.remove("ativo"));
    if (botao) botao.classList.add("ativo");
    renderizarProdutos(categoria);
}

function rolarProdutos(direcao) {
    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    const card = lista.querySelector(".produto-card");
    const distancia = card ? card.getBoundingClientRect().width + 22 : 300;

    lista.scrollBy({
        left: distancia * direcao,
        behavior: "smooth"
    });
}

function ativarArrasteComMouse() {
    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    let pressionado = false;
    let inicioX = 0;
    let scrollInicial = 0;

    lista.addEventListener("mousedown", event => {
        if (event.button !== 0 || event.target.closest("button")) return;
        pressionado = true;
        mouseArrastou = false;
        inicioX = event.pageX;
        scrollInicial = lista.scrollLeft;
        lista.classList.add("arrastando");
    });

    window.addEventListener("mousemove", event => {
        if (!pressionado) return;
        const deslocamento = event.pageX - inicioX;
        if (Math.abs(deslocamento) > 5) mouseArrastou = true;
        lista.scrollLeft = scrollInicial - deslocamento;
    });

    window.addEventListener("mouseup", () => {
        if (!pressionado) return;
        pressionado = false;
        lista.classList.remove("arrastando");
        setTimeout(() => { mouseArrastou = false; }, 0);
    });

    lista.addEventListener("click", event => {
        if (mouseArrastou) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);

    lista.addEventListener("dragstart", event => event.preventDefault());
}

function enviarPedidoWhatsApp(event) {
    if (event) event.preventDefault();

    if (carrinho.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }

    let texto = "👶 *Novo Pedido - Cegonha Baby Store*\n\n";
    texto += "Olá! Gostaria de encomendar as seguintes peças:\n\n";

    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        texto += `• *${item.quantidade}x* ${item.nome} — ${moeda(subtotal)}\n`;
    });

    texto += `\n💰 *Total do pedido:* ${moeda(total)}`;
    texto += "\n\nAguardo as instruções para finalizar. ✨";

    const linkFinal = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(linkFinal, "_blank", "noopener,noreferrer");
}

function abrirDetalhes(id, nomeAntigo, precoTextoAntigo, imagemAntiga, descricaoAntiga) {
    if (mouseArrastou) return;

    const produtoNovo = encontrarProduto(id);
    const produto = produtoNovo || {
        id: Number(id),
        nome: nomeAntigo,
        preco: parseFloat(String(precoTextoAntigo || "0").replace("R$", "").replace(".", "").replace(",", ".").trim()),
        imagem: imagemAntiga,
        descricao: descricaoAntiga,
        categoriaLabel: "Produto"
    };

    if (!produto || !produto.nome) return;

    const modal = document.getElementById("modal-detalhes");
    const img = document.getElementById("modal-img");
    const fotoBloco = document.getElementById("modal-foto-bloco");

    document.getElementById("modal-titulo").textContent = produto.nome;
    document.getElementById("modal-preco").textContent = moeda(produto.preco);
    document.getElementById("modal-descricao").textContent = produto.descricao || "Descrição não informada para este produto.";
    document.getElementById("modal-categoria").textContent = produto.categoriaLabel || "Produto";

    fotoBloco.querySelectorAll(".fallback-foto").forEach(el => el.remove());
    img.style.display = "block";
    img.dataset.erroTratado = "nao";
    img.src = produto.imagem;
    img.alt = produto.nome;
    img.onerror = () => imagemComErro(img, produto.nome);

    const btnComprarModal = document.getElementById("modal-btn-comprar");
    btnComprarModal.onclick = () => {
        adicionarProduto(produto.id, produto.nome, produto.preco, produto.imagem);
        fecharDetalhes();
    };

    modal.classList.add("ativo");
    document.body.style.overflow = "hidden";
}

function fecharDetalhes() {
    const modal = document.getElementById("modal-detalhes");
    if (modal) modal.classList.remove("ativo");
    document.body.style.overflow = "";
}

function fecharModalAoClicarFora(event) {
    if (event.target.id === "modal-detalhes") fecharDetalhes();
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        fecharDetalhes();
        alternarCarrinho(false);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos("todos");
    atualizarInterfaceCarrinho();
    ativarArrasteComMouse();

    const lista = document.getElementById("lista-produtos");
    if (lista) {
        lista.addEventListener("keydown", event => {
            const alvo = event.target.closest(".produto-imagem[data-produto-id]");
            if (!alvo) return;

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                abrirDetalhes(Number(alvo.dataset.produtoId));
            }
        });
    }

    // Regrava o carrinho já corrigido, caso tenha vindo de uma versão antiga.
    salvarCarrinho();
});
