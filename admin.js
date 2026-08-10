const SUPABASE_URL = "https://nridvmdmnejbanofavli.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iU8gK5XlJUUX0i_F3iZp4g_sDb5iAX_";
const BUCKET_PRODUTOS = "produtos";

let adminSupabase = null;
let adminUser = null;
let produtosAdmin = [];
let viewAdminAtual = "produtos";
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

function trocarViewAdmin(view, botao) {
    viewAdminAtual = view;
    document.querySelectorAll(".admin-nav .nav-item:not(.desabilitado)").forEach(item => item.classList.remove("ativo"));
    if (botao) botao.classList.add("ativo");

    const produtos = document.getElementById("conteudo-produtos");
    const estoque = document.getElementById("conteudo-estoque");
    produtos.hidden = view !== "produtos";
    estoque.hidden = view !== "estoque";
    document.getElementById("titulo-view").textContent = view === "estoque" ? "Estoque" : "Produtos";
    document.body.classList.remove("menu-admin-aberto");
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
