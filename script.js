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
const CHAVE_AVALIACOES = "cegonhaBabyStoreAvaliacoes";
const CHAVE_CLIENTE_AVALIACAO = "cegonhaBabyStoreClienteAvaliacao";

let carrinho = carregarCarrinho();
let favoritos = carregarFavoritos();
let avaliacoesClientes = carregarAvaliacoes();
let clienteAvaliacaoId = obterClienteAvaliacaoId();
let notaSelecionada = 0;
let categoriaAtual = "todos";
let modoFavoritos = false;
let mouseArrastou = false;

// Integra modais e sacola com o botão VOLTAR do celular/navegador.
const CHAVE_HISTORICO_UI = "cegonhaUI";

function estadoHistoricoUI() {
    return history.state?.[CHAVE_HISTORICO_UI] || null;
}

function empilharHistoricoUI(tipo) {
    if (estadoHistoricoUI() === tipo) return;
    const estadoAtual = (history.state && typeof history.state === "object") ? history.state : {};
    history.pushState({ ...estadoAtual, [CHAVE_HISTORICO_UI]: tipo }, "", window.location.href);
}

function voltarHistoricoSeFor(tipo) {
    if (estadoHistoricoUI() === tipo) {
        history.back();
        return true;
    }
    return false;
}
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

function carregarAvaliacoes() {
    try {
        const salvo = localStorage.getItem(CHAVE_AVALIACOES);
        const dados = JSON.parse(salvo || "{}");
        return dados && typeof dados === "object" && !Array.isArray(dados) ? dados : {};
    } catch (_) {
        return {};
    }
}

function salvarAvaliacoes() {
    try {
        localStorage.setItem(CHAVE_AVALIACOES, JSON.stringify(avaliacoesClientes));
    } catch (_) {}
}

function obterClienteAvaliacaoId() {
    try {
        let id = localStorage.getItem(CHAVE_CLIENTE_AVALIACAO);
        if (!id) {
            id = (window.crypto && crypto.randomUUID)
                ? crypto.randomUUID()
                : `cliente-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(CHAVE_CLIENTE_AVALIACAO, id);
        }
        return id;
    } catch (_) {
        return `cliente-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
}

function obterAvaliacoesProduto(id) {
    const lista = avaliacoesClientes[String(Number(id))];
    return Array.isArray(lista) ? lista : [];
}

function mediaAvaliacoes(id) {
    const lista = obterAvaliacoesProduto(id);
    if (!lista.length) return 0;
    const soma = lista.reduce((total, item) => total + Number(item.nota || 0), 0);
    return soma / lista.length;
}

function estrelasDaMedia(media) {
    const cheias = Math.max(0, Math.min(5, Math.round(Number(media) || 0)));
    return "★".repeat(cheias) + "☆".repeat(5 - cheias);
}

function escaparHtml(texto) {
    return String(texto ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
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

    let produtosFiltrados = categoria === "todos"
        ? PRODUTOS
        : PRODUTOS.filter(produto => produto.categoria === categoria);

    if (modoFavoritos) {
        produtosFiltrados = produtosFiltrados.filter(produto => isFavorito(produto.id));
    }

    if (produtosFiltrados.length === 0) {
        lista.innerHTML = modoFavoritos
            ? '<div class="sem-produtos">Você ainda não salvou favoritos.</div>'
            : '<div class="sem-produtos">Nenhum produto encontrado nesta categoria.</div>';
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
                    <div class="avaliacao-canto" title="Avaliação dos clientes" aria-label="Avaliação dos clientes: ${obterAvaliacoesProduto(produto.id).length ? mediaAvaliacoes(produto.id).toFixed(1) + ' de 5' : 'ainda sem avaliações'}">
                        ${estrelasDaMedia(mediaAvaliacoes(produto.id))}
                    </div>
                </div>

                <div class="produto-info">
                    <span class="produto-categoria">${produto.categoriaLabel}</span>
                    <h3>${produto.nome}</h3>

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

function atualizarContadoresMobile() {
    const contadorFavoritos = document.getElementById("contador-favoritos-mobile");
    const contadorSacolaMobile = document.getElementById("contador-sacola-mobile");
    if (contadorFavoritos) contadorFavoritos.textContent = favoritos.length;
    if (contadorSacolaMobile) contadorSacolaMobile.textContent = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
}

function setNavMobileAtivo(elemento) {
    document.querySelectorAll(".bottom-nav-mobile a").forEach(link => link.classList.remove("ativo"));
    if (elemento) elemento.classList.add("ativo");
}

function abrirFavoritosMobile(elemento) {
    modoFavoritos = true;
    setNavMobileAtivo(elemento);
    document.querySelectorAll(".btn-filtro").forEach(btn => btn.classList.remove("ativo"));
    const btnTodos = document.querySelector('.btn-filtro[data-categoria="todos"]');
    if (btnTodos) btnTodos.classList.add("ativo");
    renderizarProdutos("todos");
    const ancora = document.getElementById("categorias");
    if (ancora) ancora.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <span class="fallback-foto-icone">•</span>
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

function alternarCarrinho(abrir, vindoDoHistorico = false) {
    const lateral = document.getElementById("carrinho-lateral");
    const overlay = document.getElementById("carrinho-overlay");
    if (!lateral || !overlay) return;

    if (abrir) {
        lateral.classList.add("aberto");
        overlay.classList.add("aberto");
        document.body.classList.add("carrinho-aberto");
        document.body.style.overflow = "hidden";
        if (!vindoDoHistorico) empilharHistoricoUI("carrinho");
        return;
    }

    if (!vindoDoHistorico && voltarHistoricoSeFor("carrinho")) return;

    lateral.classList.remove("aberto");
    overlay.classList.remove("aberto");
    document.body.classList.remove("carrinho-aberto");
    document.body.style.overflow = "";
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
        mostrarToast("Removido dos favoritos.");
    } else {
        favoritos.push(numeroId);
        mostrarToast("Adicionado aos favoritos.");
    }

    salvarFavoritos();
    atualizarContadoresMobile();
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
    mostrarToast(`${produto.nome} foi adicionado à sacola.`);
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
    atualizarContadoresMobile();

    if (carrinho.length === 0) {
        conteinerItens.innerHTML = '<p class="carrinho-vazio">Sua sacola está vazia.</p>';
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
    modoFavoritos = false;
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

    let texto = "*Novo Pedido - Cegonha Baby Store*\n\n";
    texto += "Olá! Gostaria de encomendar as seguintes peças:\n\n";

    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        texto += `• *${item.quantidade}x* ${item.nome} — ${moeda(subtotal)}\n`;
    });

    texto += `\n*Total do pedido:* ${moeda(total)}`;
    texto += "\n\nAguardo as instruções para finalizar.";

    const linkFinal = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(linkFinal, "_blank", "noopener,noreferrer");
}

function selecionarNota(nota) {
    notaSelecionada = Math.max(0, Math.min(5, Number(nota) || 0));
    document.querySelectorAll("#avaliacao-estrelas-escolha button").forEach(botao => {
        const valor = Number(botao.dataset.nota);
        botao.classList.toggle("ativo", valor <= notaSelecionada);
        botao.setAttribute("aria-checked", valor === notaSelecionada ? "true" : "false");
    });
}

function renderizarAvaliacoesModal(id) {
    const produtoId = Number(id);
    const lista = obterAvaliacoesProduto(produtoId);
    const media = mediaAvaliacoes(produtoId);
    const resumo = document.getElementById("avaliacoes-media");
    const listaEl = document.getElementById("lista-avaliacoes");
    const nomeInput = document.getElementById("avaliacao-nome");
    const comentarioInput = document.getElementById("avaliacao-comentario");

    if (resumo) {
        resumo.innerHTML = lista.length
            ? `<strong>${media.toFixed(1)}</strong><span>${estrelasDaMedia(media)}</span><small>${lista.length} ${lista.length === 1 ? "avaliação" : "avaliações"}</small>`
            : `<strong>—</strong><span>☆☆☆☆☆</span><small>Seja o primeiro a avaliar</small>`;
    }

    const minha = lista.find(item => item.clienteId === clienteAvaliacaoId);
    notaSelecionada = minha ? Number(minha.nota) : 0;
    selecionarNota(notaSelecionada || 0);
    if (!notaSelecionada) {
        document.querySelectorAll("#avaliacao-estrelas-escolha button").forEach(botao => {
            botao.classList.remove("ativo");
            botao.setAttribute("aria-checked", "false");
        });
    }
    if (nomeInput) nomeInput.value = minha?.nome || "";
    if (comentarioInput) comentarioInput.value = minha?.comentario || "";

    if (!listaEl) return;
    if (!lista.length) {
        listaEl.innerHTML = '<div class="avaliacoes-vazio">Ainda não há avaliações desta peça. ⭐</div>';
        return;
    }

    const ordenadas = [...lista].sort((a, b) => Number(b.criadoEm || 0) - Number(a.criadoEm || 0));
    listaEl.innerHTML = ordenadas.slice(0, 6).map(item => `
        <article class="avaliacao-item">
            <div class="avaliacao-item-topo">
                <strong>${escaparHtml(item.nome || "Cliente")}</strong>
                <span>${"★".repeat(Number(item.nota) || 0)}${"☆".repeat(5 - (Number(item.nota) || 0))}</span>
            </div>
            ${item.comentario ? `<p>${escaparHtml(item.comentario)}</p>` : ""}
        </article>
    `).join("");
}

function enviarAvaliacao(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById("modal-detalhes");
    const produtoId = Number(modal?.dataset.produtoId);
    if (!Number.isFinite(produtoId)) return;

    if (!notaSelecionada) {
        mostrarToast("Escolha de 1 a 5 estrelas para avaliar.");
        return;
    }

    const nome = document.getElementById("avaliacao-nome")?.value.trim().slice(0, 40) || "";
    const comentario = document.getElementById("avaliacao-comentario")?.value.trim().slice(0, 300) || "";
    const chave = String(produtoId);
    const lista = obterAvaliacoesProduto(produtoId);
    const indiceExistente = lista.findIndex(item => item.clienteId === clienteAvaliacaoId);

    const avaliacao = {
        clienteId: clienteAvaliacaoId,
        nota: notaSelecionada,
        nome,
        comentario,
        criadoEm: Date.now()
    };

    if (indiceExistente >= 0) {
        lista[indiceExistente] = avaliacao;
        mostrarToast("Sua avaliação foi atualizada.");
    } else {
        lista.push(avaliacao);
        mostrarToast("Obrigado pela sua avaliação!");
    }

    avaliacoesClientes[chave] = lista;
    salvarAvaliacoes();
    renderizarAvaliacoesModal(produtoId);
    renderizarProdutos(categoriaAtual, { preservarScroll: true });
}


function alternarSecaoMobile(idConteudo, botao) {
    const conteudo = document.getElementById(idConteudo);
    if (!conteudo) return;
    const abriu = conteudo.classList.toggle("aberto");

    if (botao) {
        const mapa = {
            "secao-por-que": ["Ver mais informações", "Ocultar informações"],
            "secao-personalizados": ["Abrir personalizados", "Fechar personalizados"],
            "secao-instagram": ["Abrir Instagram", "Fechar Instagram"]
        };
        const [fechado, aberto] = mapa[idConteudo] || ["Abrir", "Fechar"];
        botao.textContent = abriu ? aberto : fechado;
        botao.classList.toggle("ativo", abriu);
    }
}

function alternarAvaliacoesMobile() {
    const bloco = document.getElementById("avaliacoes-modal");
    const botao = document.querySelector(".btn-toggle-avaliacoes-mobile");
    if (!bloco || !botao) return;
    const abriu = bloco.classList.toggle("aberto-mobile");
    botao.textContent = abriu ? "Ocultar avaliações" : "Ver avaliações e avaliar";
    botao.classList.toggle("ativo", abriu);
}

// =========================================================
// VISUALIZADOR DE IMAGEM: ampliar, arrastar e usar pinça
// =========================================================
let visualizadorEscala = 1;
let visualizadorX = 0;
let visualizadorY = 0;
let visualizadorDistanciaInicial = 0;
let visualizadorEscalaInicial = 1;
const visualizadorPonteiros = new Map();

function aplicarTransformacaoVisualizador() {
    const img = document.getElementById("visualizador-img");
    if (!img) return;
    img.style.transform = `translate3d(${visualizadorX}px, ${visualizadorY}px, 0) scale(${visualizadorEscala})`;

    const reset = document.querySelector(".visualizador-reset");
    if (reset) reset.textContent = `${Math.round(visualizadorEscala * 100)}%`;
}

function limitarPanVisualizador() {
    const area = document.getElementById("visualizador-area");
    const img = document.getElementById("visualizador-img");
    if (!area || !img) return;

    if (visualizadorEscala <= 1) {
        visualizadorX = 0;
        visualizadorY = 0;
        return;
    }

    const larguraBase = img.offsetWidth || area.clientWidth;
    const alturaBase = img.offsetHeight || area.clientHeight;
    const maxX = Math.max(0, (larguraBase * visualizadorEscala - area.clientWidth) / 2 + 20);
    const maxY = Math.max(0, (alturaBase * visualizadorEscala - area.clientHeight) / 2 + 20);

    visualizadorX = Math.max(-maxX, Math.min(maxX, visualizadorX));
    visualizadorY = Math.max(-maxY, Math.min(maxY, visualizadorY));
}

function resetarVisualizadorImagem() {
    visualizadorEscala = 1;
    visualizadorX = 0;
    visualizadorY = 0;
    visualizadorPonteiros.clear();
    aplicarTransformacaoVisualizador();
}

function alterarZoomImagem(delta) {
    visualizadorEscala = Math.max(1, Math.min(4, visualizadorEscala + Number(delta || 0)));
    limitarPanVisualizador();
    aplicarTransformacaoVisualizador();
}

function abrirVisualizadorImagem() {
    const imagemModal = document.getElementById("modal-img");
    const viewer = document.getElementById("visualizador-imagem");
    const imagemViewer = document.getElementById("visualizador-img");
    const nomeViewer = document.getElementById("visualizador-nome");
    const nomeProduto = document.getElementById("modal-titulo")?.textContent || "Detalhes da peça";

    if (!imagemModal || !viewer || !imagemViewer || !imagemModal.src || imagemModal.style.display === "none") return;

    resetarVisualizadorImagem();
    imagemViewer.src = imagemModal.currentSrc || imagemModal.src;
    imagemViewer.alt = imagemModal.alt || nomeProduto;
    if (nomeViewer) nomeViewer.textContent = nomeProduto;

    viewer.classList.add("ativo");
    viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    empilharHistoricoUI("visualizador");

    imagemViewer.onload = () => {
        resetarVisualizadorImagem();
    };
}

function fecharVisualizadorImagem(vindoDoHistorico = false) {
    const viewer = document.getElementById("visualizador-imagem");
    if (!viewer) return;

    if (!vindoDoHistorico && voltarHistoricoSeFor("visualizador")) return;

    viewer.classList.remove("ativo");
    viewer.setAttribute("aria-hidden", "true");
    visualizadorPonteiros.clear();
    resetarVisualizadorImagem();

    const detalhesAberto = document.getElementById("modal-detalhes")?.classList.contains("ativo");
    document.body.style.overflow = detalhesAberto ? "hidden" : "";
}

function distanciaEntrePonteiros() {
    const pontos = [...visualizadorPonteiros.values()];
    if (pontos.length < 2) return 0;
    const dx = pontos[0].x - pontos[1].x;
    const dy = pontos[0].y - pontos[1].y;
    return Math.hypot(dx, dy);
}

function ativarGestosVisualizador() {
    const area = document.getElementById("visualizador-area");
    const img = document.getElementById("visualizador-img");
    if (!area || !img) return;

    area.addEventListener("pointerdown", event => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        visualizadorPonteiros.set(event.pointerId, { x: event.clientX, y: event.clientY });
        try { area.setPointerCapture(event.pointerId); } catch (_) {}

        if (visualizadorPonteiros.size === 2) {
            visualizadorDistanciaInicial = distanciaEntrePonteiros();
            visualizadorEscalaInicial = visualizadorEscala;
        }
        area.classList.add("arrastando");
    });

    area.addEventListener("pointermove", event => {
        const anterior = visualizadorPonteiros.get(event.pointerId);
        if (!anterior) return;

        visualizadorPonteiros.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (visualizadorPonteiros.size >= 2) {
            const distanciaAtual = distanciaEntrePonteiros();
            if (visualizadorDistanciaInicial > 0) {
                visualizadorEscala = Math.max(1, Math.min(4, visualizadorEscalaInicial * (distanciaAtual / visualizadorDistanciaInicial)));
            }
        } else if (visualizadorEscala > 1) {
            visualizadorX += event.clientX - anterior.x;
            visualizadorY += event.clientY - anterior.y;
        }

        limitarPanVisualizador();
        aplicarTransformacaoVisualizador();
    });

    const finalizarPonteiro = event => {
        visualizadorPonteiros.delete(event.pointerId);
        if (visualizadorPonteiros.size < 2) {
            visualizadorDistanciaInicial = 0;
            visualizadorEscalaInicial = visualizadorEscala;
        }
        if (visualizadorPonteiros.size === 0) area.classList.remove("arrastando");
    };

    area.addEventListener("pointerup", finalizarPonteiro);
    area.addEventListener("pointercancel", finalizarPonteiro);

    area.addEventListener("wheel", event => {
        event.preventDefault();
        alterarZoomImagem(event.deltaY < 0 ? 0.25 : -0.25);
    }, { passive: false });

    area.addEventListener("dblclick", event => {
        event.preventDefault();
        visualizadorEscala = visualizadorEscala > 1 ? 1 : 2;
        if (visualizadorEscala === 1) {
            visualizadorX = 0;
            visualizadorY = 0;
        }
        limitarPanVisualizador();
        aplicarTransformacaoVisualizador();
    });

    img.addEventListener("dragstart", event => event.preventDefault());
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
    modal.dataset.produtoId = String(produto.id);

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
    const btnWhatsModal = document.getElementById("modal-btn-whatsapp");
    const blocoAvaliacoes = document.getElementById("avaliacoes-modal");
    const botaoAvaliacoesMobile = document.querySelector(".btn-toggle-avaliacoes-mobile");

    btnComprarModal.onclick = () => {
        // Troca o estado "detalhes" pelo estado "carrinho" sem criar um passo fantasma no botão Voltar.
        fecharDetalhes(true);
        if (estadoHistoricoUI() === "detalhes") {
            const estadoAtual = (history.state && typeof history.state === "object") ? history.state : {};
            history.replaceState({ ...estadoAtual, [CHAVE_HISTORICO_UI]: "carrinho" }, "", window.location.href);
        }
        adicionarProduto(produto.id, produto.nome, produto.preco, produto.imagem);
    };

    if (btnWhatsModal) {
        const textoWhats = `Olá! Vim pelo site da Cegonha Baby Store e gostaria de saber mais sobre o produto: ${produto.nome}.`;
        btnWhatsModal.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoWhats)}`;
    }

    if (blocoAvaliacoes) blocoAvaliacoes.classList.remove("aberto-mobile");
    if (botaoAvaliacoesMobile) {
        botaoAvaliacoesMobile.textContent = "Ver avaliações e avaliar";
        botaoAvaliacoesMobile.classList.remove("ativo");
    }

    renderizarAvaliacoesModal(produto.id);
    modal.classList.add("ativo");
    document.body.style.overflow = "hidden";
    empilharHistoricoUI("detalhes");
}

function fecharDetalhes(vindoDoHistorico = false) {
    const modal = document.getElementById("modal-detalhes");
    if (!modal) return;

    if (!vindoDoHistorico && voltarHistoricoSeFor("detalhes")) return;

    modal.classList.remove("ativo");
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
    empilharHistoricoUI("contato");
    const fechar = modalContato.querySelector(".btn-fechar-contato");
    if (fechar) fechar.focus();
}

function fecharContato(vindoDoHistorico = false) {
    const modalContato = document.getElementById("modal-contato");
    if (!modalContato) return;

    if (!vindoDoHistorico && voltarHistoricoSeFor("contato")) return;

    modalContato.classList.remove("ativo");
    document.body.style.overflow = "";
}

function fecharContatoAoClicarFora(event) {
    if (event.target.id === "modal-contato") fecharContato();
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        const viewer = document.getElementById("visualizador-imagem");
        if (viewer?.classList.contains("ativo")) {
            fecharVisualizadorImagem();
            return;
        }
        fecharDetalhes();
        fecharContato();
        alternarCarrinho(false);
    }
});

window.addEventListener("popstate", () => {
    const viewer = document.getElementById("visualizador-imagem");
    if (viewer?.classList.contains("ativo")) {
        fecharVisualizadorImagem(true);
        return;
    }

    const detalhes = document.getElementById("modal-detalhes");
    if (detalhes?.classList.contains("ativo")) {
        fecharDetalhes(true);
        return;
    }

    const contato = document.getElementById("modal-contato");
    if (contato?.classList.contains("ativo")) {
        fecharContato(true);
        return;
    }

    const carrinho = document.getElementById("carrinho-lateral");
    if (carrinho?.classList.contains("aberto")) {
        alternarCarrinho(false, true);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos("todos");
    atualizarInterfaceCarrinho();
    ativarArrasteComMouse();
    salvarCarrinho();
    salvarFavoritos();
    atualizarContadoresMobile();
    const primeiroLinkMobile = document.querySelector(".bottom-nav-mobile a");
    if (primeiroLinkMobile) primeiroLinkMobile.classList.add("ativo");
    salvarAvaliacoes();
    ativarGestosVisualizador();

    const fotoModal = document.getElementById("modal-foto-bloco");
    if (fotoModal) {
        fotoModal.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                abrirVisualizadorImagem();
            }
        });
    }

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
