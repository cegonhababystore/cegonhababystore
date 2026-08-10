const SUPABASE_URL = "https://nridvmdmnejbanofavli.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iU8gK5XlJUUX0i_F3iZp4g_sDb5iAX_";
const BUCKET_PRODUTOS = "produtos";

let adminSupabase = null;
let adminUser = null;
let produtosAdmin = [];
let avaliacoesAdmin = [];
let pedidosAdmin = [];
let pedidoItensAdmin = [];
let viewAdminAtual = "resumo";
let toastAdminTimer = null;

function iniciarSupabaseAdmin() {
    if (!window.supabase?.createClient) throw new Error("A biblioteca do Supabase não carregou.");
    if (!adminSupabase) {
        adminSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    }
    return adminSupabase;
}

function escaparHtml(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarMensagemLogin(texto = "", sucesso = false) {
    const el = document.getElementById("login-msg");
    if (!el) return;
    el.textContent = texto;
    el.classList.toggle("sucesso", sucesso);
}

function mostrarMensagemProduto(texto = "", sucesso = false) {
    const el = document.getElementById("produto-form-msg");
    if (!el) return;
    el.textContent = texto;
    el.classList.toggle("sucesso", sucesso);
}

function toastAdmin(texto, erro = false) {
    const toast = document.getElementById("toast-admin");
    if (!toast) return;
    toast.textContent = texto;
    toast.classList.toggle("erro", erro);
    toast.classList.add("ativo");
    clearTimeout(toastAdminTimer);
    toastAdminTimer = setTimeout(() => toast.classList.remove("ativo"), 2600);
}

async function usuarioEhAdmin(user) {
    if (!user?.id) return false;
    const { data, error } = await adminSupabase
        .from("administradores")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Erro ao verificar administrador:", error);
        return false;
    }
    return Boolean(data?.user_id);
}

async function exibirPainel(user) {
    adminUser = user;
    document.getElementById("login-view").hidden = true;
    document.getElementById("painel-view").hidden = false;
    document.getElementById("admin-email").textContent = user.email || "Administrador";
    await carregarProdutosAdmin();
    await carregarResumoAdmin();
}

function exibirLogin() {
    adminUser = null;
    document.getElementById("painel-view").hidden = true;
    document.getElementById("login-view").hidden = false;
}

async function processarSessao(session) {
    if (!session?.user) {
        exibirLogin();
        return;
    }

    const autorizado = await usuarioEhAdmin(session.user);
    if (!autorizado) {
        await adminSupabase.auth.signOut();
        exibirLogin();
        mostrarMensagemLogin("Essa conta existe, mas não possui permissão de administrador.");
        return;
    }

    await exibirPainel(session.user);
}

async function loginAdmin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-senha").value;
    const botao = document.getElementById("login-btn");

    mostrarMensagemLogin("");
    botao.disabled = true;
    botao.textContent = "Entrando...";

    try {
        const { data, error } = await adminSupabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await processarSessao(data.session);
    } catch (erro) {
        console.error(erro);
        mostrarMensagemLogin("Não foi possível entrar. Confira o e-mail, a senha e a configuração do administrador.");
    } finally {
        botao.disabled = false;
        botao.textContent = "Entrar no painel";
    }
}

async function sairAdmin() {
    try { await adminSupabase.auth.signOut(); } catch (_) {}
    produtosAdmin = [];
    avaliacoesAdmin = [];
    pedidosAdmin = [];
    pedidoItensAdmin = [];
    exibirLogin();
    mostrarMensagemLogin("Você saiu do painel.", true);
}

async function carregarProdutosAdmin() {
    const loading = document.getElementById("produtos-loading");
    if (loading) loading.hidden = false;

    try {
        const { data, error } = await adminSupabase
            .from("produtos")
            .select("id,created_at,nome,descricao,preco,categoria,estoque,imagem_principal,ativo")
            .order("id", { ascending: true });

        if (error) throw error;
        produtosAdmin = Array.isArray(data) ? data : [];
        atualizarResumo();
        renderizarListaProdutos();
        renderizarEstoque();
    } catch (erro) {
        console.error(erro);
        toastAdmin("Não foi possível carregar os produtos.", true);
        const vazio = document.getElementById("produtos-vazio");
        if (vazio) {
            vazio.textContent = "Erro ao carregar. Confira as políticas do Supabase.";
            vazio.hidden = false;
        }
    } finally {
        if (loading) loading.hidden = true;
    }
}

function atualizarResumo() {
    const total = produtosAdmin.length;
    const ativos = produtosAdmin.filter(p => p.ativo !== false).length;
    const inativos = total - ativos;
    const baixo = produtosAdmin.filter(p => Number(p.estoque || 0) <= 2).length;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-ativos").textContent = ativos;
    document.getElementById("stat-inativos").textContent = inativos;
    document.getElementById("stat-baixo").textContent = baixo;
}

function produtosFiltradosAdmin() {
    const busca = (document.getElementById("busca-produto")?.value || "").trim().toLowerCase();
    const filtro = document.getElementById("filtro-status")?.value || "todos";

    return produtosAdmin.filter(produto => {
        const texto = `${produto.nome || ""} ${produto.categoria || ""}`.toLowerCase();
        const bateBusca = !busca || texto.includes(busca);
        const bateStatus = filtro === "todos" ||
            (filtro === "ativos" && produto.ativo !== false) ||
            (filtro === "inativos" && produto.ativo === false);
        return bateBusca && bateStatus;
    });
}

function renderizarListaProdutos() {
    const lista = document.getElementById("produtos-lista");
    const vazio = document.getElementById("produtos-vazio");
    if (!lista || !vazio) return;

    const filtrados = produtosFiltradosAdmin();
    if (!filtrados.length) {
        lista.hidden = true;
        vazio.hidden = false;
        vazio.textContent = produtosAdmin.length ? "Nenhum produto corresponde ao filtro." : "Nenhum produto cadastrado.";
        return;
    }

    vazio.hidden = true;
    lista.hidden = false;
    lista.innerHTML = `
        <div class="produto-admin-row cabecalho" aria-hidden="true">
            <span>Foto</span><span>Produto</span><span>Preço</span><span>Estoque</span><span>Categoria</span><span>Status</span><span>Ações</span>
        </div>
        ${filtrados.map(produto => `
            <article class="produto-admin-row">
                <img src="${escaparHtml(produto.imagem_principal || './logo.jpg')}" alt="" onerror="this.src='./logo.jpg'">
                <div class="produto-admin-nome">
                    <strong>${escaparHtml(produto.nome)}</strong>
                    <small>#${produto.id}</small>
                </div>
                <b>${formatarMoeda(produto.preco)}</b>
                <span>${Number(produto.estoque || 0)}</span>
                <span>${escaparHtml(produto.categoria || "-")}</span>
                <span class="status-pill ${produto.ativo !== false ? 'ativo' : 'inativo'}">${produto.ativo !== false ? 'Ativo' : 'Inativo'}</span>
                <div class="acoes-row">
                    <button class="btn-ghost" type="button" onclick="editarProduto(${produto.id})">Editar</button>
                    <button class="btn-danger" type="button" onclick="excluirProduto(${produto.id})">Excluir</button>
                </div>
            </article>
        `).join("")}
    `;
}

function renderizarEstoque() {
    const lista = document.getElementById("estoque-lista");
    if (!lista) return;

    if (!produtosAdmin.length) {
        lista.innerHTML = '<div class="estado-lista">Nenhum produto cadastrado.</div>';
        return;
    }

    const ordenados = [...produtosAdmin].sort((a, b) => Number(a.estoque || 0) - Number(b.estoque || 0));
    lista.innerHTML = ordenados.map(produto => {
        const estoque = Math.max(0, Number(produto.estoque || 0));
        return `
            <article class="estoque-item">
                <img src="${escaparHtml(produto.imagem_principal || './logo.jpg')}" alt="" onerror="this.src='./logo.jpg'">
                <div>
                    <strong>${escaparHtml(produto.nome)}</strong>
                    <small>${produto.ativo !== false ? 'Visível na loja' : 'Produto inativo'}</small>
                </div>
                <div class="estoque-controle">
                    <button type="button" onclick="alterarEstoque(${produto.id}, -1)" aria-label="Diminuir estoque">−</button>
                    <b class="${estoque <= 2 ? 'baixo' : ''}">${estoque}</b>
                    <button type="button" onclick="alterarEstoque(${produto.id}, 1)" aria-label="Aumentar estoque">+</button>
                </div>
            </article>
        `;
    }).join("");
}

async function alterarEstoque(id, delta) {
    const produto = produtosAdmin.find(p => Number(p.id) === Number(id));
    if (!produto) return;
    const novoEstoque = Math.max(0, Number(produto.estoque || 0) + Number(delta || 0));

    try {
        const { error } = await adminSupabase
            .from("produtos")
            .update({ estoque: novoEstoque })
            .eq("id", Number(id));
        if (error) throw error;
        produto.estoque = novoEstoque;
        atualizarResumo();
        renderizarListaProdutos();
        renderizarEstoque();
    } catch (erro) {
        console.error(erro);
        toastAdmin("Não foi possível atualizar o estoque.", true);
    }
}

function nomeProdutoDaAvaliacao(produtoId) {
    return produtosAdmin.find(p => Number(p.id) === Number(produtoId))?.nome || `Produto #${produtoId}`;
}

async function carregarAvaliacoesAdmin() {
    const loading = document.getElementById("avaliacoes-loading");
    if (loading) loading.hidden = false;

    try {
        const { data, error } = await adminSupabase.rpc("listar_avaliacoes_publicas");
        if (error) throw error;
        avaliacoesAdmin = Array.isArray(data) ? data : [];
        atualizarResumoAvaliacoes();
        renderizarAvaliacoesAdmin();
    } catch (erro) {
        console.error(erro);
        toastAdmin("Não foi possível carregar as avaliações.", true);
        const vazio = document.getElementById("avaliacoes-vazio");
        if (vazio) {
            vazio.textContent = "Erro ao carregar avaliações. Execute a configuração V22 no Supabase.";
            vazio.hidden = false;
        }
    } finally {
        if (loading) loading.hidden = true;
    }
}

function atualizarResumoAvaliacoes() {
    const total = avaliacoesAdmin.length;
    const soma = avaliacoesAdmin.reduce((acc, item) => acc + Number(item.nota || 0), 0);
    const media = total ? soma / total : 0;
    const cinco = avaliacoesAdmin.filter(item => Number(item.nota) === 5).length;
    const comentarios = avaliacoesAdmin.filter(item => String(item.comentario || "").trim()).length;

    const totalEl = document.getElementById("stat-avaliacoes-total");
    const mediaEl = document.getElementById("stat-avaliacoes-media");
    const cincoEl = document.getElementById("stat-avaliacoes-cinco");
    const comentarioEl = document.getElementById("stat-avaliacoes-comentario");
    if (totalEl) totalEl.textContent = total;
    if (mediaEl) mediaEl.textContent = total ? media.toFixed(1).replace(".", ",") : "—";
    if (cincoEl) cincoEl.textContent = cinco;
    if (comentarioEl) comentarioEl.textContent = comentarios;
}

function avaliacoesFiltradasAdmin() {
    const busca = (document.getElementById("busca-avaliacao")?.value || "").trim().toLowerCase();
    const notaFiltro = document.getElementById("filtro-nota")?.value || "todas";

    return avaliacoesAdmin.filter(item => {
        const produto = nomeProdutoDaAvaliacao(item.produto_id);
        const texto = `${produto} ${item.nome || ""} ${item.comentario || ""}`.toLowerCase();
        const passaBusca = !busca || texto.includes(busca);
        const passaNota = notaFiltro === "todas" || Number(item.nota) === Number(notaFiltro);
        return passaBusca && passaNota;
    });
}

function formatarDataAvaliacao(valor) {
    const data = new Date(valor || "");
    if (Number.isNaN(data.getTime())) return "";
    return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function renderizarAvaliacoesAdmin() {
    const lista = document.getElementById("avaliacoes-admin-lista");
    const vazio = document.getElementById("avaliacoes-vazio");
    if (!lista || !vazio) return;

    const filtradas = avaliacoesFiltradasAdmin();
    vazio.hidden = filtradas.length > 0;
    lista.hidden = filtradas.length === 0;

    if (!filtradas.length) {
        vazio.textContent = avaliacoesAdmin.length ? "Nenhuma avaliação corresponde ao filtro." : "Ainda não há avaliações publicadas.";
        lista.innerHTML = "";
        return;
    }

    lista.innerHTML = filtradas.map(item => {
        const nota = Math.max(1, Math.min(5, Number(item.nota) || 1));
        const estrelas = "★".repeat(nota) + "☆".repeat(5 - nota);
        const produto = nomeProdutoDaAvaliacao(item.produto_id);
        const cliente = String(item.nome || "").trim() || "Cliente";
        const comentario = String(item.comentario || "").trim();
        return `
            <article class="avaliacao-admin-item">
                <div class="avaliacao-admin-topo">
                    <div>
                        <strong>${escaparHtml(produto)}</strong>
                        <span class="avaliacao-admin-estrelas" aria-label="${nota} de 5 estrelas">${estrelas}</span>
                    </div>
                    <button class="btn-danger" type="button" onclick="excluirAvaliacaoAdmin(${Number(item.id)})">Excluir</button>
                </div>
                <div class="avaliacao-admin-meta">
                    <span>${escaparHtml(cliente)}</span>
                    <span>${formatarDataAvaliacao(item.created_at)}</span>
                </div>
                ${comentario ? `<p>${escaparHtml(comentario)}</p>` : '<p class="sem-comentario">Sem comentário escrito.</p>'}
            </article>
        `;
    }).join("");
}

async function excluirAvaliacaoAdmin(id) {
    const avaliacao = avaliacoesAdmin.find(item => Number(item.id) === Number(id));
    if (!avaliacao) return;
    const produto = nomeProdutoDaAvaliacao(avaliacao.produto_id);
    const confirmou = window.confirm(`Excluir esta avaliação de “${produto}”?`);
    if (!confirmou) return;

    try {
        const { error } = await adminSupabase.rpc("admin_excluir_avaliacao", { p_avaliacao_id: Number(id) });
        if (error) throw error;
        toastAdmin("Avaliação excluída.");
        await carregarAvaliacoesAdmin();
    } catch (erro) {
        console.error(erro);
        toastAdmin("Não foi possível excluir a avaliação.", true);
    }
}


function labelStatusPedido(status) {
    const mapa = {
        novo: "Novo",
        confirmado: "Confirmado",
        preparando: "Preparando",
        entregue: "Entregue",
        cancelado: "Cancelado"
    };
    return mapa[status] || "Novo";
}

function intervaloHojeISO() {
    const agora = new Date();
    const inicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), 0, 0, 0, 0);
    const fim = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1, 0, 0, 0, 0);
    return { inicio: inicio.toISOString(), fim: fim.toISOString() };
}

async function carregarResumoAdmin() {
    const loading = document.getElementById("dashboard-loading");
    const lista = document.getElementById("dashboard-pedidos-lista");
    const vazio = document.getElementById("dashboard-pedidos-vazio");
    if (loading) loading.hidden = false;
    if (lista) lista.hidden = true;
    if (vazio) vazio.hidden = true;

    try {
        const { inicio, fim } = intervaloHojeISO();
        const [hojeResp, recentesResp, novosResp] = await Promise.all([
            adminSupabase
                .from("pedidos")
                .select("id,total,status,created_at")
                .gte("created_at", inicio)
                .lt("created_at", fim),
            adminSupabase
                .from("pedidos")
                .select("id,codigo,cliente_nome,total,status,created_at")
                .order("created_at", { ascending: false })
                .limit(5),
            adminSupabase
                .from("pedidos")
                .select("id", { count: "exact", head: true })
                .eq("status", "novo")
        ]);

        if (hojeResp.error) throw hojeResp.error;
        if (recentesResp.error) throw recentesResp.error;
        if (novosResp.error) throw novosResp.error;

        const pedidosHoje = Array.isArray(hojeResp.data) ? hojeResp.data : [];
        const recentes = Array.isArray(recentesResp.data) ? recentesResp.data : [];
        const valorHoje = pedidosHoje
            .filter(p => p.status !== "cancelado")
            .reduce((soma, p) => soma + Number(p.total || 0), 0);
        const estoqueBaixo = produtosAdmin.filter(p => Number(p.estoque || 0) <= 2).length;

        const mapa = {
            "dash-pedidos-hoje": pedidosHoje.length,
            "dash-pedidos-novos": Number(novosResp.count || 0),
            "dash-valor-hoje": formatarMoeda(valorHoje),
            "dash-estoque-baixo": estoqueBaixo
        };
        Object.entries(mapa).forEach(([id, valor]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = valor;
        });

        renderizarResumoPedidosRecentes(recentes);
    } catch (erro) {
        console.error("Erro ao carregar resumo:", erro);
        toastAdmin("Não foi possível atualizar o resumo.", true);
        if (vazio) {
            vazio.textContent = "Não foi possível carregar os pedidos do resumo.";
            vazio.hidden = false;
        }
    } finally {
        if (loading) loading.hidden = true;
    }
}

function renderizarResumoPedidosRecentes(recentes = []) {
    const lista = document.getElementById("dashboard-pedidos-lista");
    const vazio = document.getElementById("dashboard-pedidos-vazio");
    if (!lista || !vazio) return;

    vazio.hidden = recentes.length > 0;
    lista.hidden = recentes.length === 0;
    if (!recentes.length) {
        lista.innerHTML = "";
        return;
    }

    lista.innerHTML = recentes.map(pedido => `
        <button class="dashboard-pedido-item" type="button" onclick="abrirViewAdmin('pedidos')">
            <div>
                <strong>${escaparHtml(pedido.codigo || `Pedido #${pedido.id}`)}</strong>
                <span>${escaparHtml(pedido.cliente_nome || "Cliente")}</span>
                <small>${escaparHtml(formatarDataPedido(pedido.created_at))}</small>
            </div>
            <div class="dashboard-pedido-direita">
                <span class="dashboard-status status-${escaparHtml(pedido.status)}">${escaparHtml(labelStatusPedido(pedido.status))}</span>
                <strong>${formatarMoeda(pedido.total)}</strong>
            </div>
        </button>`).join("");
}

function abrirViewAdmin(view) {
    const botao = document.querySelector(`.admin-nav .nav-item[data-view="${view}"]`);
    trocarViewAdmin(view, botao);
}

function telefonePedidoWhatsapp(telefone) {
    let digitos = String(telefone || "").replace(/\D/g, "");
    if ((digitos.length === 10 || digitos.length === 11) && !digitos.startsWith("55")) digitos = `55${digitos}`;
    return digitos;
}

function formatarDataPedido(valor) {
    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) return "—";
    return data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function itensDoPedido(pedidoId) {
    return pedidoItensAdmin.filter(item => Number(item.pedido_id) === Number(pedidoId));
}

async function carregarPedidosAdmin() {
    const loading = document.getElementById("pedidos-loading");
    if (loading) loading.hidden = false;

    try {
        const [pedidosResp, itensResp] = await Promise.all([
            adminSupabase
                .from("pedidos")
                .select("id,created_at,updated_at,codigo,cliente_nome,cliente_telefone,observacao,total,status,origem")
                .order("created_at", { ascending: false }),
            adminSupabase
                .from("pedido_itens")
                .select("id,pedido_id,produto_id,nome_produto,preco_unitario,quantidade,subtotal")
                .order("id", { ascending: true })
        ]);

        if (pedidosResp.error) throw pedidosResp.error;
        if (itensResp.error) throw itensResp.error;

        pedidosAdmin = Array.isArray(pedidosResp.data) ? pedidosResp.data : [];
        pedidoItensAdmin = Array.isArray(itensResp.data) ? itensResp.data : [];
        atualizarResumoPedidos();
        renderizarPedidosAdmin();
    } catch (erro) {
        console.error("Erro ao carregar pedidos:", erro);
        toastAdmin("Não foi possível carregar os pedidos.", true);
        const vazio = document.getElementById("pedidos-vazio");
        if (vazio) {
            vazio.textContent = "Erro ao carregar pedidos. Confira se o SQL da V24 foi executado.";
            vazio.hidden = false;
        }
    } finally {
        if (loading) loading.hidden = true;
    }
}

function atualizarResumoPedidos() {
    const total = pedidosAdmin.length;
    const novos = pedidosAdmin.filter(p => p.status === "novo").length;
    const andamento = pedidosAdmin.filter(p => p.status === "confirmado" || p.status === "preparando").length;
    const valor = pedidosAdmin
        .filter(p => p.status !== "cancelado")
        .reduce((soma, p) => soma + Number(p.total || 0), 0);

    const mapa = {
        "stat-pedidos-total": total,
        "stat-pedidos-novos": novos,
        "stat-pedidos-andamento": andamento,
        "stat-pedidos-valor": formatarMoeda(valor)
    };
    Object.entries(mapa).forEach(([id, valorEl]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valorEl;
    });
}

function pedidosFiltradosAdmin() {
    const busca = (document.getElementById("busca-pedido")?.value || "").trim().toLowerCase();
    const status = document.getElementById("filtro-pedido-status")?.value || "todos";

    return pedidosAdmin.filter(pedido => {
        const bateStatus = status === "todos" || pedido.status === status;
        const texto = `${pedido.codigo || ""} ${pedido.cliente_nome || ""} ${pedido.cliente_telefone || ""}`.toLowerCase();
        const bateBusca = !busca || texto.includes(busca);
        return bateStatus && bateBusca;
    });
}

function renderizarPedidosAdmin() {
    const lista = document.getElementById("pedidos-admin-lista");
    const vazio = document.getElementById("pedidos-vazio");
    if (!lista || !vazio) return;

    const filtrados = pedidosFiltradosAdmin();
    vazio.hidden = filtrados.length > 0;
    if (!filtrados.length) {
        vazio.textContent = pedidosAdmin.length ? "Nenhum pedido corresponde ao filtro." : "Ainda não há pedidos registrados.";
        lista.innerHTML = "";
        return;
    }

    lista.innerHTML = filtrados.map(pedido => {
        const itens = itensDoPedido(pedido.id);
        const telefoneWa = telefonePedidoWhatsapp(pedido.cliente_telefone);
        const itensHtml = itens.length
            ? itens.map(item => `
                <div class="pedido-item-linha">
                    <span>${escaparHtml(item.quantidade)}x ${escaparHtml(item.nome_produto)}</span>
                    <strong>${formatarMoeda(item.subtotal)}</strong>
                </div>`).join("")
            : '<div class="pedido-item-linha pedido-sem-itens">Itens não disponíveis.</div>';
        const observacao = String(pedido.observacao || "").trim();

        return `
            <article class="pedido-admin-card status-${escaparHtml(pedido.status)}">
                <div class="pedido-admin-topo">
                    <div>
                        <span class="pedido-codigo">${escaparHtml(pedido.codigo || `Pedido #${pedido.id}`)}</span>
                        <strong>${escaparHtml(pedido.cliente_nome)}</strong>
                        <small>${escaparHtml(formatarDataPedido(pedido.created_at))}</small>
                    </div>
                    <select class="pedido-status-select" aria-label="Status do pedido ${escaparHtml(pedido.codigo || pedido.id)}" onchange="alterarStatusPedido(${Number(pedido.id)}, this.value, this)">
                        ${["novo","confirmado","preparando","entregue","cancelado"].map(status => `<option value="${status}" ${pedido.status === status ? "selected" : ""}>${labelStatusPedido(status)}</option>`).join("")}
                    </select>
                </div>

                <div class="pedido-admin-contato">
                    <span>${escaparHtml(pedido.cliente_telefone)}</span>
                    ${telefoneWa ? `<a href="https://wa.me/${telefoneWa}" target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>` : ""}
                </div>

                <div class="pedido-admin-itens">${itensHtml}</div>
                ${observacao ? `<p class="pedido-observacao"><strong>Observação:</strong> ${escaparHtml(observacao)}</p>` : ""}

                <div class="pedido-admin-total">
                    <span>${itens.length} ${itens.length === 1 ? "item" : "itens"}</span>
                    <strong>${formatarMoeda(pedido.total)}</strong>
                </div>
            </article>`;
    }).join("");
}

async function alterarStatusPedido(id, novoStatus, selectEl) {
    const pedido = pedidosAdmin.find(p => Number(p.id) === Number(id));
    if (!pedido) return;
    const statusAnterior = pedido.status;

    if (selectEl) selectEl.disabled = true;
    try {
        const { error } = await adminSupabase
            .from("pedidos")
            .update({ status: novoStatus, updated_at: new Date().toISOString() })
            .eq("id", Number(id));
        if (error) throw error;

        pedido.status = novoStatus;
        atualizarResumoPedidos();
        renderizarPedidosAdmin();
        toastAdmin(`Pedido ${pedido.codigo || id}: ${labelStatusPedido(novoStatus)}.`);
    } catch (erro) {
        console.error("Erro ao alterar status do pedido:", erro);
        pedido.status = statusAnterior;
        if (selectEl) selectEl.value = statusAnterior;
        toastAdmin("Não foi possível alterar o status do pedido.", true);
    } finally {
        if (selectEl) selectEl.disabled = false;
    }
}

function trocarViewAdmin(view, botao) {
    viewAdminAtual = view;
    document.querySelectorAll(".admin-nav .nav-item:not(.desabilitado)").forEach(item => item.classList.remove("ativo"));
    if (botao) botao.classList.add("ativo");

    const resumo = document.getElementById("conteudo-resumo");
    const produtos = document.getElementById("conteudo-produtos");
    const estoque = document.getElementById("conteudo-estoque");
    const pedidos = document.getElementById("conteudo-pedidos");
    const avaliacoes = document.getElementById("conteudo-avaliacoes");
    if (resumo) resumo.hidden = view !== "resumo";
    if (produtos) produtos.hidden = view !== "produtos";
    if (estoque) estoque.hidden = view !== "estoque";
    if (pedidos) pedidos.hidden = view !== "pedidos";
    if (avaliacoes) avaliacoes.hidden = view !== "avaliacoes";

    const titulos = {
        resumo: "Resumo",
        produtos: "Produtos",
        estoque: "Estoque",
        pedidos: "Pedidos",
        avaliacoes: "Avaliações"
    };
    document.getElementById("titulo-view").textContent = titulos[view] || "Resumo";
    document.body.classList.remove("menu-admin-aberto");

    if (view === "resumo") carregarResumoAdmin();
    if (view === "pedidos") carregarPedidosAdmin();
    if (view === "avaliacoes") carregarAvaliacoesAdmin();
}

function alternarMenuAdmin() {
    document.body.classList.toggle("menu-admin-aberto");
}

function limparFormProduto() {
    document.getElementById("produto-form").reset();
    document.getElementById("produto-id").value = "";
    document.getElementById("produto-imagem-atual").value = "";
    document.getElementById("produto-imagem-url").value = "";
    document.getElementById("produto-preview").src = "./logo.jpg";
    document.getElementById("produto-ativo").checked = true;
    document.getElementById("produto-estoque").value = "0";
    mostrarMensagemProduto("");
}

function abrirFormProduto(produto = null) {
    limparFormProduto();
    const modal = document.getElementById("produto-modal");
    modal.classList.add("ativo");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (!produto) {
        document.getElementById("form-titulo").textContent = "Adicionar produto";
        setTimeout(() => document.getElementById("produto-nome").focus(), 60);
        return;
    }

    document.getElementById("form-titulo").textContent = "Editar produto";
    document.getElementById("produto-id").value = produto.id;
    document.getElementById("produto-nome").value = produto.nome || "";
    document.getElementById("produto-preco").value = Number(produto.preco || 0).toFixed(2);
    document.getElementById("produto-categoria").value = produto.categoria || "bebe";
    document.getElementById("produto-estoque").value = Math.max(0, Number(produto.estoque || 0));
    document.getElementById("produto-descricao").value = produto.descricao || "";
    document.getElementById("produto-ativo").checked = produto.ativo !== false;
    document.getElementById("produto-imagem-atual").value = produto.imagem_principal || "";
    document.getElementById("produto-imagem-url").value = produto.imagem_principal || "";
    document.getElementById("produto-preview").src = produto.imagem_principal || "./logo.jpg";
}

function editarProduto(id) {
    const produto = produtosAdmin.find(p => Number(p.id) === Number(id));
    if (produto) abrirFormProduto(produto);
}

function fecharFormProduto() {
    const modal = document.getElementById("produto-modal");
    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function slugArquivo(texto) {
    return String(texto || "produto")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 55) || "produto";
}

async function enviarImagemProduto(file, nomeProduto) {
    if (!file) return "";
    if (!file.type.startsWith("image/")) throw new Error("Escolha um arquivo de imagem.");
    if (file.size > 5 * 1024 * 1024) throw new Error("A imagem precisa ter no máximo 5 MB.");

    const extensaoOriginal = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const extensao = ["jpg", "jpeg", "png", "webp"].includes(extensaoOriginal) ? extensaoOriginal : "jpg";
    const token = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const caminho = `${slugArquivo(nomeProduto)}-${token}.${extensao}`;

    const { error } = await adminSupabase.storage
        .from(BUCKET_PRODUTOS)
        .upload(caminho, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (error) throw error;

    const { data } = adminSupabase.storage.from(BUCKET_PRODUTOS).getPublicUrl(caminho);
    if (!data?.publicUrl) throw new Error("Não foi possível gerar o endereço público da imagem.");
    return data.publicUrl;
}

async function salvarProduto(event) {
    event.preventDefault();
    const botao = document.getElementById("produto-salvar");
    const id = Number(document.getElementById("produto-id").value || 0);
    const nome = document.getElementById("produto-nome").value.trim();
    const preco = Number(document.getElementById("produto-preco").value);
    const categoria = document.getElementById("produto-categoria").value;
    const estoque = Math.max(0, parseInt(document.getElementById("produto-estoque").value || "0", 10) || 0);
    const descricao = document.getElementById("produto-descricao").value.trim();
    const ativo = document.getElementById("produto-ativo").checked;
    const arquivo = document.getElementById("produto-imagem").files?.[0] || null;
    const imagemAtual = document.getElementById("produto-imagem-atual").value.trim();
    const imagemDigitada = document.getElementById("produto-imagem-url").value.trim();

    if (!nome || !Number.isFinite(preco) || preco < 0) {
        mostrarMensagemProduto("Preencha nome e preço corretamente.");
        return;
    }

    botao.disabled = true;
    botao.textContent = arquivo ? "Enviando foto..." : "Salvando...";
    mostrarMensagemProduto("");

    try {
        let imagem = imagemDigitada || imagemAtual;
        if (arquivo) imagem = await enviarImagemProduto(arquivo, nome);
        if (!imagem) throw new Error("Escolha uma foto ou informe o endereço de uma imagem.");

        const payload = {
            nome,
            descricao,
            preco: Number(preco.toFixed(2)),
            categoria,
            estoque,
            imagem_principal: imagem,
            ativo
        };

        if (id) {
            const { error } = await adminSupabase.from("produtos").update(payload).eq("id", id);
            if (error) throw error;
            toastAdmin("Produto atualizado.");
        } else {
            const { error } = await adminSupabase.from("produtos").insert(payload);
            if (error) throw error;
            toastAdmin("Produto cadastrado.");
        }

        fecharFormProduto();
        await carregarProdutosAdmin();
    } catch (erro) {
        console.error(erro);
        const mensagem = erro?.message ? `Não foi possível salvar: ${erro.message}` : "Não foi possível salvar o produto.";
        mostrarMensagemProduto(mensagem);
    } finally {
        botao.disabled = false;
        botao.textContent = "Salvar produto";
    }
}

async function excluirProduto(id) {
    const produto = produtosAdmin.find(p => Number(p.id) === Number(id));
    if (!produto) return;
    const confirmou = window.confirm(`Excluir “${produto.nome}”?\n\nEssa ação remove o produto do banco.`);
    if (!confirmou) return;

    try {
        const { error } = await adminSupabase.from("produtos").delete().eq("id", Number(id));
        if (error) throw error;
        toastAdmin("Produto excluído.");
        await carregarProdutosAdmin();
    } catch (erro) {
        console.error(erro);
        toastAdmin("Não foi possível excluir o produto.", true);
    }
}

function prepararPreviewImagem() {
    const input = document.getElementById("produto-imagem");
    const url = document.getElementById("produto-imagem-url");
    const preview = document.getElementById("produto-preview");

    input.addEventListener("change", () => {
        const arquivo = input.files?.[0];
        if (!arquivo) return;
        const reader = new FileReader();
        reader.onload = () => { preview.src = String(reader.result || "./logo.jpg"); };
        reader.readAsDataURL(arquivo);
    });

    url.addEventListener("input", () => {
        if (!input.files?.length && url.value.trim()) preview.src = url.value.trim();
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.getElementById("produto-modal")?.classList.contains("ativo")) {
        fecharFormProduto();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        iniciarSupabaseAdmin();
        document.getElementById("login-form").addEventListener("submit", loginAdmin);
        document.getElementById("produto-form").addEventListener("submit", salvarProduto);
        prepararPreviewImagem();

        const { data: { session } } = await adminSupabase.auth.getSession();
        await processarSessao(session);

        adminSupabase.auth.onAuthStateChange((event, novaSessao) => {
            if (event === "SIGNED_OUT") exibirLogin();
            if (event === "TOKEN_REFRESHED" && novaSessao?.user) adminUser = novaSessao.user;
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagemLogin("Não foi possível iniciar o painel administrativo.");
    }
});
