/* =========================================================
   CEGONHA BABY STORE
   COMO ADICIONAR NOVOS PRODUTOS NO FUTURO:
   1) Coloque a foto na mesma pasta do site.
   2) Copie UM objeto dentro da lista PRODUTOS abaixo.
   3) Troque id, nome, categoria, preço, imagem e descrição.
   ========================================================= */

const PRODUTOS = [
    // ATENÇÃO: os preços abaixo são PROVISÓRIOS.
    // Troque o campo "preco" assim que você souber o valor real de cada peça.
    {
        id: 1,
        nome: "Conjunto Pijama Golfinhos Azul",
        categoria: "menino",
        categoriaLabel: "Menino",
        preco: 89.90,
        precoAntigo: 99.90,
        imagem: "./fotovitrine1m.jpeg",
        badge: "Mais vendido",
        tipoBadge: "sucesso",
        chamada: "Peça queridinha da semana",
        avaliacoes: 12,
        descricao: "Conjunto de pijama infantil em azul-claro, com blusa de manga longa e calça estampadas com golfinhos e estrelas. O contraste azul-marinho na gola, nos punhos e nas barras deixa o visual ainda mais charmoso."
    },
    {
        id: 2,
        nome: "Romper Babados Mostarda com Renda",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 79.90,
        precoAntigo: 89.90,
        imagem: "./Body Feminino Laranja Premium.jpeg",
        badge: "Oferta",
        tipoBadge: "oferta",
        chamada: "Romântico e delicado",
        avaliacoes: 8,
        descricao: "Romper infantil em tom mostarda com alças de babados, acabamento delicado de renda branca e camadas franzidas. Uma peça charmosa para passeios, fotos e ocasiões especiais."
    },
    {
        id: 3,
        nome: "Pijama Macacão Corações Rosa",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 129.90,
        precoAntigo: 149.90,
        imagem: "./macacão rosa com corações.jpeg",
        badge: "Aconchego",
        tipoBadge: "novidade",
        chamada: "Perfeito para dias mais fresquinhos",
        avaliacoes: 6,
        descricao: "Macacão longo rosa com estampa de corações em tom vinho, fechamento frontal e punhos ajustados. Um visual divertido e aconchegante para os momentos de descanso."
    },
    {
        id: 4,
        nome: "Macacão Curto Rosa Clássico",
        categoria: "bebe",
        categoriaLabel: "Bebês",
        preco: 79.90,
        precoAntigo: null,
        imagem: "./macacão feminino bege.jpeg",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Modelo clássico e delicado",
        avaliacoes: 5,
        descricao: "Macacão curto em rosa-claro com gola arredondada, botões frontais, bolsinho e acabamento contrastante. O estilo clássico combina conforto visual e delicadeza para o dia a dia."
    },
    {
        id: 5,
        nome: "Conjunto Batinha Bordada Xadrez Rosa",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 109.90,
        precoAntigo: 119.90,
        imagem: "./conjunto-batinha-xadrez.jpeg",
        badge: "Destaque",
        tipoBadge: "sucesso",
        chamada: "Encanta em fotos e passeios",
        avaliacoes: 10,
        descricao: "Conjunto delicado com batinha branca de bordado vazado, barra franzida e laço xadrez, acompanhado de short estilo bloomer xadrez rosa com babados e laços laterais."
    },
    {
        id: 6,
        nome: "Conjunto Polo Amarelo e Jardineira Xadrez",
        categoria: "menino",
        categoriaLabel: "Menino",
        preco: 149.90,
        precoAntigo: 169.90,
        imagem: "./conjunto-polo-jardineira-linho.jpeg",
        badge: "Elegante",
        tipoBadge: "oferta",
        chamada: "Ideal para ocasiões especiais",
        avaliacoes: 7,
        descricao: "Look infantil com body polo amarelo de gola clássica e jardineira xadrez em tons claros, com alças e botões marrons. Uma combinação arrumadinha e versátil para passeios e eventos."
    },
    {
        id: 7,
        nome: "Macacão Jardineira Ursinho",
        categoria: "bebe",
        categoriaLabel: "Bebês",
        preco: 99.90,
        precoAntigo: null,
        imagem: "./macacao-ursinho-soft.jpeg",
        badge: "Fofo demais",
        tipoBadge: "sucesso",
        chamada: "Uma das peças mais adoráveis da loja",
        avaliacoes: 9,
        descricao: "Macacão estilo jardineira em tons bege e creme, com xadrez suave, estampa de ursinhos e detalhe aplicado no peitoral. Os acabamentos claros deixam a peça ainda mais delicada."
    },
    {
        id: 8,
        nome: "Romper Ciganinha Floral Preto",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 74.90,
        precoAntigo: 84.90,
        imagem: "./romper-ciganinha-floral.jpeg.jpeg",
        badge: "Últimas unidades",
        tipoBadge: "urgencia",
        chamada: "Visual floral com muito charme",
        avaliacoes: 4,
        descricao: "Romper preto com estampa de flores rosadas, alças finas, mangas amplas estilo ciganinha e cintura franzida. Um modelo alegre e cheio de personalidade."
    },
    {
        id: 9,
        nome: "Romper Dinossauros Verde com Chapéu",
        categoria: "menino",
        categoriaLabel: "Menino",
        preco: 89.90,
        precoAntigo: null,
        imagem: "./romper-dinossauros-chapeu.jpeg",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Look divertido para dias quentes",
        avaliacoes: 6,
        descricao: "Romper verde sem mangas com estampa de dinossauros coloridos, botões frontais e fechamento entrepernas. A combinação com o chapéu estampado cria um look divertido para os dias quentes."
    }
];

const NUMERO_WHATSAPP = "5597984154273";
const CHAVE_CARRINHO = "cegonhaBabyStoreCarrinho";
const CHAVE_FAVORITOS = "cegonhaBabyStoreFavoritos";

let carrinho = carregarCarrinho();
let favoritos = carregarFavoritos();
let categoriaAtual = "todos";
let mouseArrastou = false;
let toastTimer = null;

function normalizarPreco(valor) {
    if (typeof valor === "number") return Number.isFinite(valor) ? valor : NaN;
    if (typeof valor !== "string") return NaN;

    let texto = valor.replace(/R\$/gi, "").replace(/\s/g, "").trim();
    if (!texto) return NaN;

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
    return seguro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function carregarCarrinho() {
    try {
        const salvo = localStorage.getItem(CHAVE_CARRINHO);
        if (!salvo) return [];
        const dados = JSON.parse(salvo);
        if (!Array.isArray(dados)) return [];

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
    } catch (_) {}
}

function carregarFavoritos() {
    try {
        const salvo = localStorage.getItem(CHAVE_FAVORITOS);
        const dados = JSON.parse(salvo || "[]");
        return Array.isArray(dados) ? dados.map(Number).filter(Number.isFinite) : [];
    } catch (_) {
        return [];
    }
}

function salvarFavoritos() {
    try {
        localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
    } catch (_) {}
}

function encontrarProduto(id) {
    return PRODUTOS.find(produto => produto.id === Number(id));
}

function badgeClass(tipo) {
    const mapa = {
        desconto: "produto-badge-desconto",
        novidade: "produto-badge-novidade",
        oferta: "produto-badge-oferta",
        urgencia: "produto-badge-urgencia",
        sucesso: "produto-badge-sucesso"
    };
    return mapa[tipo] || "produto-badge-novidade";
}

function escaparTexto(texto) {
    return String(texto).replace(/'/g, "&#39;");
}

function isFavorito(id) {
    return favoritos.includes(Number(id));
}

function renderizarProdutos(categoria = categoriaAtual, opcoes = {}) {
    categoriaAtual = categoria;
    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    const { preservarScroll = false } = opcoes;
    const scrollAtual = lista.scrollLeft;

    const produtosFiltrados = categoria === "todos"
        ? PRODUTOS
        : PRODUTOS.filter(produto => produto.categoria === categoria);

    if (produtosFiltrados.length === 0) {
        lista.innerHTML = '<div class="sem-produtos">Nenhum produto encontrado nesta categoria.</div>';
        return;
    }

    lista.innerHTML = produtosFiltrados.map(produto => {
        const precoAntigo = produto.precoAntigo
            ? `<span class="preco-antigo">${moeda(produto.precoAntigo)}</span>`
            : "";
        const favoritoAtivo = isFavorito(produto.id);

        return `
            <article class="produto-card" data-categoria="${produto.categoria}">
                ${produto.badge ? `<div class="${badgeClass(produto.tipoBadge)}">${produto.badge}</div>` : ""}
                <button class="btn-favorito ${favoritoAtivo ? "ativo" : ""}" type="button" onclick="alternarFavorito(${produto.id}, event)" aria-label="${favoritoAtivo ? "Remover dos favoritos" : "Adicionar aos favoritos"}">
                    ${favoritoAtivo ? "❤" : "♡"}
                </button>

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
                    <div class="produto-estrelas">${produto.avaliacoes > 0 ? `★★★★★ (${produto.avaliacoes})` : "Novo produto ✨"}</div>

                    ${produto.chamada ? `<p class="produto-chamada">${produto.chamada}</p>` : ""}

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

    if (preservarScroll) {
        lista.scrollLeft = scrollAtual;
    } else {
        lista.scrollTo({ left: 0, behavior: "smooth" });
    }
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

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast-carrinho");
    if (!toast) return;

    toast.textContent = mensagem;
    toast.classList.add("ativo");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("ativo");
    }, 2400);
}

function alternarCarrinho(abrir) {
    const lateral = document.getElementById("carrinho-lateral");
    const overlay = document.getElementById("carrinho-overlay");
    if (!lateral || !overlay) return;

    lateral.classList.toggle("aberto", abrir);
    overlay.classList.toggle("aberto", abrir);
    document.body.classList.toggle("carrinho-aberto", abrir);
    document.body.style.overflow = abrir ? "hidden" : "";
}

function gerenciarMenuAtivo(elemento) {
    document.querySelectorAll("header nav a").forEach(link => link.classList.remove("ativo"));
    if (elemento) elemento.classList.add("ativo");
}

function alternarFavorito(id, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const numeroId = Number(id);
    if (isFavorito(numeroId)) {
        favoritos = favoritos.filter(item => item !== numeroId);
        mostrarToast("Removido dos favoritos 💔");
    } else {
        favoritos.push(numeroId);
        mostrarToast("Adicionado aos favoritos ❤️");
    }

    salvarFavoritos();
    renderizarProdutos(categoriaAtual, { preservarScroll: true });
}

function adicionarProduto(id, nomeAntigo, precoAntigo, imagemAntiga) {
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
    mostrarToast(`${produto.nome} foi adicionado à sacola 🛍️`);
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
    mostrarToast("Produto removido da sacola.");
}

function atualizarInterfaceCarrinho() {
    const conteinerItens = document.getElementById("carrinho-itens");
    const contadorSacola = document.getElementById("contador-carrinho");
    const totalSacola = document.getElementById("carrinho-total");
    if (!conteinerItens || !contadorSacola || !totalSacola) return;

    carrinho = carrinho.map(item => {
        const produtoAtual = encontrarProduto(item.id);
        const preco = produtoAtual ? normalizarPreco(produtoAtual.preco) : normalizarPreco(item.preco);

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
    lista.scrollBy({ left: distancia * direcao, behavior: "smooth" });
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

function abrirContato() {
    const modalContato = document.getElementById("modal-contato");
    if (!modalContato) return;
    modalContato.classList.add("ativo");
    document.body.style.overflow = "hidden";
    const fechar = modalContato.querySelector(".btn-fechar-contato");
    if (fechar) fechar.focus();
}

function fecharContato() {
    const modalContato = document.getElementById("modal-contato");
    if (!modalContato) return;
    modalContato.classList.remove("ativo");
    document.body.style.overflow = "";
}

function fecharContatoAoClicarFora(event) {
    if (event.target.id === "modal-contato") fecharContato();
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        fecharDetalhes();
        fecharContato();
        alternarCarrinho(false);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos("todos");
    atualizarInterfaceCarrinho();
    ativarArrasteComMouse();
    salvarCarrinho();
    salvarFavoritos();

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
});
