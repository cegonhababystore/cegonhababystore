/* =========================================================
   CEGONHA BABY STORE
   COMO ADICIONAR NOVOS PRODUTOS NO FUTURO:
   1) Coloque a foto na mesma pasta do site.
   2) Copie UM objeto dentro da lista PRODUTOS abaixo.
   3) Troque id, nome, categoria, preço, imagem e descrição.
   ========================================================= */

const PRODUTOS_FALLBACK = [
    // ATENÇÃO: os preços abaixo são PROVISÓRIOS.
    // Troque o campo "preco" assim que você souber o valor real de cada peça.
    {
        id: 1,
        nome: "Conjunto Pijama Golfinhos Azul",
        categoria: "menino",
        categoriaLabel: "Menino",
        preco: 89.90,
        precoAntigo: 99.90,
        imagem: "./fotovitrine1m.webp",
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
        imagem: "./body-feminino-laranja-premium.webp",
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
        imagem: "./macacao-coracoes-rosa.webp",
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
        imagem: "./macacao-curto-rosa.webp",
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
        imagem: "./conjunto-batinha-xadrez.webp",
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
        imagem: "./conjunto-polo-jardineira-linho.webp",
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
        imagem: "./macacao-ursinho-soft.webp",
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
        imagem: "./romper-ciganinha-floral.webp",
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
        imagem: "./romper-dinossauros-chapeu.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Look divertido para dias quentes",
        avaliacoes: 6,
        descricao: "Romper verde sem mangas com estampa de dinossauros coloridos, botões frontais e fechamento entrepernas. A combinação com o chapéu estampado cria um look divertido para os dias quentes."
    },
    {
        id: 10,
        nome: "Conjunto Chuva de Amor Rosa e Cinza",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 89.90,
        precoAntigo: null,
        imagem: "./conjunto-chuva-de-amor-rosa-cinza.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Laços e babados em uma combinação delicada",
        avaliacoes: 0,
        descricao: "Conjunto infantil em rosa e cinza, com blusa de mangas com babados e laço frontal, acompanhado de peça inferior com suspensórios, babados e laços. A estampa de nuvens e pequenos corações deixa o visual ainda mais delicado."
    },
    {
        id: 11,
        nome: "Conjunto Azul com Calça Xadrez Preto e Branco",
        categoria: "menino",
        categoriaLabel: "Menino",
        preco: 119.90,
        precoAntigo: null,
        imagem: "./conjunto-azul-xadrez-preto-branco.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Visual moderno para os dias mais fresquinhos",
        avaliacoes: 0,
        descricao: "Conjunto infantil com blusa azul de manga longa, detalhe contrastante nos ombros e bolso frontal com aplicação divertida, acompanhado de calça xadrez em preto e branco."
    },
    {
        id: 12,
        nome: "Conjunto Moranguinhos Vermelho com Jardineira",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 99.90,
        precoAntigo: null,
        imagem: "./conjunto-moranguinhos-vermelho.webp",
        badge: "Destaque",
        tipoBadge: "sucesso",
        chamada: "Moranguinhos, laços e babados cheios de charme",
        avaliacoes: 0,
        descricao: "Conjunto infantil em vermelho e branco, com blusa de babados e jardineira estampada com morangos. Os laços vermelhos e as camadas de babados completam o visual delicado."
    },
    {
        id: 13,
        nome: "Romper Corações Terracota com Babados",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 89.90,
        precoAntigo: null,
        imagem: "./romper-coracoes-terracota.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Tons terrosos com um toque romântico",
        avaliacoes: 0,
        descricao: "Romper infantil em terracota e creme, com estampa de corações na parte superior, mangas com babados, suspensórios decorativos, laços frontais e saia em camadas."
    },
    {
        id: 14,
        nome: "Vestido Listrado Rosa com Laço",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 94.90,
        precoAntigo: null,
        imagem: "./vestido-listrado-rosa-laco.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Clássico, leve e delicado",
        avaliacoes: 0,
        descricao: "Vestido infantil rosa e branco com listras verticais, alças finas e laço grande na parte frontal. A saia ampla cria um visual clássico e delicado."
    },
    {
        id: 15,
        nome: "Macacão Bege com Detalhe Xadrez",
        categoria: "bebe",
        categoriaLabel: "Bebês",
        preco: 109.90,
        precoAntigo: null,
        imagem: "./macacao-bege-detalhe-xadrez.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Um modelo clássico em tons suaves",
        avaliacoes: 0,
        descricao: "Macacão longo bege com gola, fechamento frontal por botões e detalhes coloridos em estampa xadrez. Os pezinhos fechados e os acabamentos contrastantes completam o visual."
    },
    {
        id: 16,
        nome: "Romper Rosa Texturizado com Babados",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 84.90,
        precoAntigo: null,
        imagem: "./romper-rosa-texturizado-babados.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Delicadeza em cada babado",
        avaliacoes: 0,
        descricao: "Romper infantil rosa com textura marcada, mangas curtas com babados, três botões frontais e saia em camadas. O fechamento inferior facilita o uso no dia a dia."
    },
    {
        id: 17,
        nome: "Vestido Xadrez Azul com Laços Rosa",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 99.90,
        precoAntigo: null,
        imagem: "./vestido-xadrez-azul-lacos-rosa.webp",
        badge: "Destaque",
        tipoBadge: "sucesso",
        chamada: "Xadrez clássico com laços delicados",
        avaliacoes: 0,
        descricao: "Vestido infantil xadrez em azul e branco, com gola branca arredondada, mangas curtas e dois laços rosa na cintura. A saia ampla dá um acabamento clássico ao modelo."
    },
    {
        id: 18,
        nome: "Kit Macacão Ursinho Bege com Touca e Babador",
        categoria: "bebe",
        categoriaLabel: "Bebês",
        preco: 119.90,
        precoAntigo: null,
        imagem: "./kit-macacao-ursinho-bege.webp",
        badge: "Kit",
        tipoBadge: "sucesso",
        chamada: "Conjunto coordenado para os pequenos",
        avaliacoes: 0,
        descricao: "Kit infantil em bege e marrom com macacão de manga longa estampado com ursinho, acompanhado de touca com orelhinhas e babador coordenado."
    },
    {
        id: 19,
        nome: "Vestido Rosa Bordado com Babados",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 99.90,
        precoAntigo: null,
        imagem: "./vestido-rosa-bordado-babados.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Romântico e delicado para ocasiões especiais",
        avaliacoes: 0,
        descricao: "Vestido infantil rosa com detalhes vazados bordados, alças largas com babados e barra recortada. O modelo aparece de frente e de costas na imagem para destacar o acabamento."
    },
    {
        id: 20,
        nome: "Romper Floral Verde Jardim",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 89.90,
        precoAntigo: null,
        imagem: "./romper-floral-verde-jardim.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Flores suaves em uma combinação alegre",
        avaliacoes: 0,
        descricao: "Romper infantil verde com parte superior floral em tons de rosa e verde, mangas amplas com babados e laço frontal. O contraste entre o floral e o verde cria um visual leve e delicado."
    },
    {
        id: 21,
        nome: "Conjunto Pijama Cachorrinhos Rosa",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 79.90,
        precoAntigo: null,
        imagem: "./conjunto-pijama-cachorrinhos-rosa.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Conforto com estampa divertida",
        avaliacoes: 0,
        descricao: "Conjunto infantil rosa com camiseta de manga curta estampada com cachorrinhos e pequenas patinhas, acompanhado de short liso no mesmo tom."
    },
    {
        id: 22,
        nome: "Conjunto Batinha Creme com Flores Bordadas",
        categoria: "menina",
        categoriaLabel: "Menina",
        preco: 89.90,
        precoAntigo: null,
        imagem: "./conjunto-batinha-creme-flores.webp",
        badge: "Novo",
        tipoBadge: "novidade",
        chamada: "Flores bordadas em um visual delicado",
        avaliacoes: 0,
        descricao: "Conjunto infantil em creme com batinha de manga curta e bloomer coordenado. Os bordados florais em tons de laranja aparecem na parte superior e na peça inferior, acompanhados de acabamento delicado nas bordas."
    }
];

// =========================================================
// SUPABASE - BASE DE DADOS DA LOJA
// A publishable key é própria para uso no navegador.
// A segurança de leitura/escrita continua sendo controlada pelo RLS.
// =========================================================
const SUPABASE_URL = "https://nridvmdmnejbanofavli.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iU8gK5XlJUUX0i_F3iZp4g_sDb5iAX_";

// Começamos com os dados locais para o site continuar funcionando mesmo
// se a internet ou o Supabase estiverem temporariamente indisponíveis.
let PRODUTOS = PRODUTOS_FALLBACK.map(produto => ({ ...produto }));
let supabaseClient = null;

function iniciarSupabaseLoja() {
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
        throw new Error("A biblioteca do Supabase não carregou.");
    }

    if (!supabaseClient) {
        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY,
            {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                    detectSessionInUrl: false
                }
            }
        );
    }

    return supabaseClient;
}

// V26: usa versões WebP menores para as imagens locais conhecidas.
// Imagens enviadas pelo painel/Supabase continuam funcionando normalmente.
const IMAGENS_LOCAIS_OTIMIZADAS = {
    "fotovitrine1m.jpeg": "./fotovitrine1m.webp",
    "Body Feminino Laranja Premium.jpeg": "./body-feminino-laranja-premium.webp",
    "macacão rosa com corações.jpeg": "./macacao-coracoes-rosa.webp",
    "macacão feminino bege.jpeg": "./macacao-curto-rosa.webp",
    "conjunto-batinha-xadrez.jpeg": "./conjunto-batinha-xadrez.webp",
    "conjunto-polo-jardineira-linho.jpeg": "./conjunto-polo-jardineira-linho.webp",
    "macacao-ursinho-soft.jpeg": "./macacao-ursinho-soft.webp",
    "romper-ciganinha-floral.jpeg.jpeg": "./romper-ciganinha-floral.webp",
    "romper-dinossauros-chapeu.jpeg": "./romper-dinossauros-chapeu.webp",
    "conjunto-chuva-de-amor-rosa-cinza.jpeg": "./conjunto-chuva-de-amor-rosa-cinza.webp",
    "conjunto-azul-xadrez-preto-branco.jpeg": "./conjunto-azul-xadrez-preto-branco.webp",
    "conjunto-moranguinhos-vermelho.jpeg": "./conjunto-moranguinhos-vermelho.webp",
    "romper-coracoes-terracota.jpeg": "./romper-coracoes-terracota.webp",
    "vestido-listrado-rosa-laco.jpeg": "./vestido-listrado-rosa-laco.webp",
    "macacao-bege-detalhe-xadrez.jpeg": "./macacao-bege-detalhe-xadrez.webp",
    "romper-rosa-texturizado-babados.jpeg": "./romper-rosa-texturizado-babados.webp",
    "vestido-xadrez-azul-lacos-rosa.jpeg": "./vestido-xadrez-azul-lacos-rosa.webp",
    "kit-macacao-ursinho-bege.jpeg": "./kit-macacao-ursinho-bege.webp",
    "vestido-rosa-bordado-babados.jpeg": "./vestido-rosa-bordado-babados.webp",
    "romper-floral-verde-jardim.jpeg": "./romper-floral-verde-jardim.webp",
    "conjunto-pijama-cachorrinhos-rosa.jpeg": "./conjunto-pijama-cachorrinhos-rosa.webp",
    "conjunto-batinha-creme-flores.jpeg": "./conjunto-batinha-creme-flores.webp"
};

// V28: os cards usam WebP leve, mas os detalhes/zoom usam o arquivo original.
// Para imagens novas hospedadas no Supabase Storage, a mesma URL é usada nos dois casos.
const IMAGENS_LOCAIS_ORIGINAIS_POR_OTIMIZADA = Object.fromEntries(
    Object.entries(IMAGENS_LOCAIS_OTIMIZADAS).map(([original, otimizada]) => [
        otimizada.replace(/^\.?\//, ""),
        `./${original}`
    ])
);

function normalizarImagemLoja(url) {
    const valor = String(url || "").trim();
    if (!valor) return "";
    if (/^(https?:|data:|blob:)/i.test(valor)) return valor;

    const chave = valor.replace(/^\.?\//, "");
    return IMAGENS_LOCAIS_OTIMIZADAS[chave] || valor;
}

function normalizarImagemOriginal(url) {
    const valor = String(url || "").trim();
    if (!valor) return "";
    if (/^(https?:|data:|blob:)/i.test(valor)) return valor;

    const chave = valor.replace(/^\.?\//, "");
    if (IMAGENS_LOCAIS_OTIMIZADAS[chave]) return `./${chave}`;
    return IMAGENS_LOCAIS_ORIGINAIS_POR_OTIMIZADA[chave] || valor;
}

function categoriaLabelDoBanco(categoria) {
    const mapa = {
        bebe: "Bebês",
        menina: "Menina",
        menino: "Menino"
    };
    return mapa[categoria] || "Infantil";
}

function mesclarProdutoDoBanco(registro) {
    const id = Number(registro.id);
    const nomeBanco = String(registro.nome || "").trim().toLocaleLowerCase("pt-BR");
    const imagemBanco = String(registro.imagem_principal || "").replace(/^\.?\//, "").trim().toLocaleLowerCase("pt-BR");
    const visualLocal = PRODUTOS_FALLBACK.find(produto => {
        if (Number(produto.id) === id) return true;
        const nomeLocal = String(produto.nome || "").trim().toLocaleLowerCase("pt-BR");
        const imagemLocalOriginal = String(normalizarImagemOriginal(produto.imagemOriginal || produto.imagem || ""))
            .replace(/^\.?\//, "")
            .trim()
            .toLocaleLowerCase("pt-BR");
        return (nomeBanco && nomeLocal === nomeBanco) || (imagemBanco && imagemLocalOriginal === imagemBanco);
    }) || {};
    const precoBanco = normalizarPreco(registro.preco);

    return {
        ...visualLocal,
        id,
        nome: registro.nome || visualLocal.nome || "Produto",
        categoria: registro.categoria || visualLocal.categoria || "bebe",
        categoriaLabel: categoriaLabelDoBanco(registro.categoria || visualLocal.categoria),
        preco: Number.isFinite(precoBanco) ? precoBanco : normalizarPreco(visualLocal.preco),
        imagem: normalizarImagemLoja(registro.imagem_principal || visualLocal.imagem || ""),
        imagemOriginal: normalizarImagemOriginal(registro.imagem_principal || visualLocal.imagemOriginal || visualLocal.imagem || ""),
        descricao: registro.descricao || visualLocal.descricao || "",
        estoque: Math.max(0, Number.parseInt(registro.estoque ?? 0, 10) || 0),
        ativo: registro.ativo !== false
    };
}

function sincronizarCarrinhoComProdutos() {
    if (!Array.isArray(carrinho)) return;

    carrinho = carrinho.map(item => {
        const produto = PRODUTOS.find(p => Number(p.id) === Number(item.id));
        if (!produto) return item;

        return {
            ...item,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem
        };
    });

    salvarCarrinho();
}

async function carregarProdutosDoSupabase() {
    try {
        try {
            iniciarSupabaseLoja();
        } catch (erro) {
            console.warn("Supabase JS não carregou. Usando catálogo local de segurança.");
            return false;
        }

        const { data, error } = await supabaseClient
            .from("produtos")
            .select("id,nome,descricao,preco,categoria,estoque,imagem_principal,ativo")
            .eq("ativo", true)
            .order("id", { ascending: true });

        if (error) throw error;
        if (!Array.isArray(data)) {
            console.warn("Supabase retornou uma resposta inesperada. Mantendo catálogo local de segurança.");
            return false;
        }

        // Resposta vazia sem erro é válida: significa que não há produtos ativos.
        // Não usamos o fallback nesse caso, pois isso faria produtos desativados reaparecerem.
        PRODUTOS = data
            .map(mesclarProdutoDoBanco)
            .filter(produto => Number.isFinite(produto.id) && produto.ativo);

        sincronizarCarrinhoComProdutos();
        console.info(`Cegonha Baby Store: ${PRODUTOS.length} produtos carregados do Supabase.`);
        return true;
    } catch (erro) {
        console.error("Não foi possível carregar os produtos do Supabase:", erro);
        console.info("O site continuará usando o catálogo local de segurança.");
        return false;
    }
}

const NUMERO_WHATSAPP = "5597984154273";
const CHAVE_CARRINHO = "cegonhaBabyStoreCarrinho";
const CHAVE_FAVORITOS = "cegonhaBabyStoreFavoritos";
const CHAVE_AVALIACOES = "cegonhaBabyStoreAvaliacoes";
const CHAVE_CLIENTE_AVALIACAO = "cegonhaBabyStoreClienteAvaliacao";
const CHAVE_DADOS_PEDIDO = "cegonhaBabyStoreDadosPedido";

let carrinho = carregarCarrinho();
let favoritos = carregarFavoritos();
let avaliacoesClientes = carregarAvaliacoes();
let clienteAvaliacaoId = obterClienteAvaliacaoId();
let notaSelecionada = 0;
let categoriaAtual = "todos";
let modoFavoritos = false;
let termoBuscaAtual = "";
let mouseArrastou = false;
let pedidoTokenAtual = null;

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

async function carregarAvaliacoesDoSupabase() {
    try {
        iniciarSupabaseLoja();

        const [publicasResposta, minhasResposta] = await Promise.all([
            supabaseClient.rpc("listar_avaliacoes_publicas"),
            supabaseClient.rpc("listar_minhas_avaliacoes", { p_cliente_id: clienteAvaliacaoId })
        ]);

        if (publicasResposta.error) throw publicasResposta.error;
        if (minhasResposta.error) throw minhasResposta.error;

        const mapa = {};
        const publicas = Array.isArray(publicasResposta.data) ? publicasResposta.data : [];
        const minhas = Array.isArray(minhasResposta.data) ? minhasResposta.data : [];

        publicas.forEach(registro => {
            const produtoId = Number(registro.produto_id);
            if (!Number.isFinite(produtoId)) return;
            const chave = String(produtoId);
            if (!mapa[chave]) mapa[chave] = [];
            mapa[chave].push({
                id: Number(registro.id),
                clienteId: null,
                nota: Number(registro.nota) || 0,
                nome: registro.nome || "",
                comentario: registro.comentario || "",
                criadoEm: Date.parse(registro.created_at || "") || Date.now(),
                atualizadoEm: Date.parse(registro.updated_at || "") || 0
            });
        });

        minhas.forEach(registro => {
            const produtoId = Number(registro.produto_id);
            if (!Number.isFinite(produtoId)) return;
            const chave = String(produtoId);
            if (!mapa[chave]) mapa[chave] = [];
            const id = Number(registro.id);
            const existente = mapa[chave].find(item => Number(item.id) === id);
            if (existente) {
                existente.clienteId = clienteAvaliacaoId;
            } else {
                mapa[chave].push({
                    id,
                    clienteId: clienteAvaliacaoId,
                    nota: Number(registro.nota) || 0,
                    nome: registro.nome || "",
                    comentario: registro.comentario || "",
                    criadoEm: Date.parse(registro.created_at || "") || Date.now(),
                    atualizadoEm: Date.parse(registro.updated_at || "") || 0
                });
            }
        });

        avaliacoesClientes = mapa;
        salvarAvaliacoes();
        return true;
    } catch (erro) {
        console.error("Não foi possível carregar as avaliações compartilhadas:", erro);
        return false;
    }
}

async function publicarAvaliacaoNoSupabase(produtoId, nota, nome, comentario) {
    iniciarSupabaseLoja();
    const { data, error } = await supabaseClient.rpc("salvar_avaliacao", {
        p_produto_id: Number(produtoId),
        p_cliente_id: clienteAvaliacaoId,
        p_nome: nome || null,
        p_nota: Number(nota),
        p_comentario: comentario || null
    });
    if (error) throw error;
    return data;
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


function normalizarTextoBusca(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function pesquisarProdutos(valor) {
    termoBuscaAtual = normalizarTextoBusca(valor);
    const limpar = document.getElementById("limpar-busca-produtos");
    if (limpar) limpar.hidden = !termoBuscaAtual;
    renderizarProdutos(categoriaAtual);
}

function limparBuscaProdutos() {
    termoBuscaAtual = "";
    const campo = document.getElementById("busca-produtos");
    const limpar = document.getElementById("limpar-busca-produtos");
    if (campo) {
        campo.value = "";
        campo.focus();
    }
    if (limpar) limpar.hidden = true;
    renderizarProdutos(categoriaAtual);
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

    if (termoBuscaAtual) {
        produtosFiltrados = produtosFiltrados.filter(produto => {
            const texto = normalizarTextoBusca([
                produto.nome,
                produto.descricao,
                produto.categoria,
                produto.categoriaLabel,
                produto.chamada
            ].filter(Boolean).join(" "));
            return texto.includes(termoBuscaAtual);
        });
    }

    const resultadoBusca = document.getElementById("resultado-busca-produtos");
    if (resultadoBusca) {
        const total = produtosFiltrados.length;
        resultadoBusca.textContent = termoBuscaAtual
            ? `${total} ${total === 1 ? "produto encontrado" : "produtos encontrados"}`
            : "";
    }

    if (produtosFiltrados.length === 0) {
        const mensagem = termoBuscaAtual
            ? 'Nenhum produto combina com sua busca.'
            : (modoFavoritos ? 'Você ainda não salvou favoritos.' : 'Nenhum produto encontrado nesta categoria.');
        lista.innerHTML = `<div class="sem-produtos">${mensagem}</div>`;
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
                        decoding="async"
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

function restaurarCatalogoCompleto() {
    // Reset TOTAL do estado da vitrine. Não depende do valor atual de modoFavoritos.
    modoFavoritos = false;
    categoriaAtual = "todos";
    termoBuscaAtual = "";

    document.querySelectorAll(".btn-filtro").forEach(btn => btn.classList.remove("ativo"));
    const btnTodos = document.querySelector('.btn-filtro[data-categoria="todos"]');
    if (btnTodos) btnTodos.classList.add("ativo");

    const campoBusca = document.getElementById("busca-produtos");
    const botaoLimpar = document.getElementById("limpar-busca-produtos");
    const resultadoBusca = document.getElementById("resultado-busca-produtos");
    if (campoBusca) campoBusca.value = "";
    if (botaoLimpar) botaoLimpar.hidden = true;
    if (resultadoBusca) resultadoBusca.textContent = "";

    renderizarProdutos("todos");
}

function mostrarTodosProdutosMobile(elementoMobile) {
    // O botão Produtos sempre força o catálogo completo, mesmo se o estado visual
    // e a variável modoFavoritos tiverem ficado fora de sincronia.
    restaurarCatalogoCompleto();
    setNavMobileAtivo(elementoMobile);

    const linkDesktop = document.querySelector('header nav a[href="#produtos"]');
    if (linkDesktop) gerenciarMenuAtivo(linkDesktop);

    const ancora = document.getElementById("categorias");
    if (ancora) ancora.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ativarMenuPorHref(href, elementoMobile) {
    // Início também sai de Favoritos e restaura o catálogo completo.
    restaurarCatalogoCompleto();

    const linkDesktop = document.querySelector(`header nav a[href="${href}"]`);
    if (linkDesktop) gerenciarMenuAtivo(linkDesktop);
    setNavMobileAtivo(elementoMobile);
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

function carregarDadosPedidoSalvos() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_DADOS_PEDIDO) || "{}");
        return dados && typeof dados === "object" ? dados : {};
    } catch (_) {
        return {};
    }
}

function salvarDadosPedidoLocal(nome, telefone) {
    try {
        localStorage.setItem(CHAVE_DADOS_PEDIDO, JSON.stringify({ nome, telefone }));
    } catch (_) {}
}

function gerarTokenPedido() {
    if (window.crypto?.randomUUID) return crypto.randomUUID();
    return `pedido-${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function totalCarrinhoAtual() {
    return carrinho.reduce((soma, item) => soma + (normalizarPreco(item.preco) || 0) * (Number(item.quantidade) || 1), 0);
}

function abrirPedidoModal() {
    const modal = document.getElementById("pedido-modal");
    if (!modal || carrinho.length === 0) return;

    const dados = carregarDadosPedidoSalvos();
    const nome = document.getElementById("pedido-cliente-nome");
    const telefone = document.getElementById("pedido-cliente-telefone");
    const observacao = document.getElementById("pedido-observacao");
    const msg = document.getElementById("pedido-form-msg");
    const total = document.getElementById("pedido-modal-total");

    pedidoTokenAtual = gerarTokenPedido();
    if (nome) nome.value = dados.nome || "";
    if (telefone) telefone.value = dados.telefone || "";
    if (observacao) observacao.value = "";
    if (msg) msg.textContent = "";
    if (total) total.textContent = moeda(totalCarrinhoAtual());

    alternarCarrinho(false, true);

    if (estadoHistoricoUI() === "carrinho") {
        const estadoAtual = (history.state && typeof history.state === "object") ? history.state : {};
        history.replaceState({ ...estadoAtual, [CHAVE_HISTORICO_UI]: "pedido" }, "", window.location.href);
    } else {
        empilharHistoricoUI("pedido");
    }

    modal.classList.add("ativo");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => (nome || telefone)?.focus(), 50);
}

function fecharPedidoModal(vindoDoHistorico = false) {
    const modal = document.getElementById("pedido-modal");
    if (!modal) return;

    if (!vindoDoHistorico && voltarHistoricoSeFor("pedido")) return;

    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    pedidoTokenAtual = null;
}

function fecharPedidoAoClicarFora(event) {
    if (event.target?.id === "pedido-modal") fecharPedidoModal();
}

function enviarPedidoWhatsApp(event) {
    if (event) event.preventDefault();
    if (carrinho.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }
    abrirPedidoModal();
}

function montarMensagemPedidoWhatsApp({ codigo, nome, telefone, observacao, total }) {
    let texto = `*Pedido ${codigo || "Cegonha Baby Store"}*\n\n`;
    texto += `Cliente: *${nome}*\n`;
    texto += `Contato: ${telefone}\n\n`;
    texto += "Gostaria de finalizar as seguintes peças:\n\n";

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        texto += `• *${item.quantidade}x* ${item.nome} — ${moeda(subtotal)}\n`;
    });

    texto += `\n*Total do pedido:* ${moeda(total)}`;
    if (observacao) texto += `\n\n*Observação:* ${observacao}`;
    texto += "\n\nO pedido já foi registrado no site. Aguardo as instruções para finalizar.";
    return texto;
}

async function confirmarPedidoWhatsApp(event) {
    if (event) event.preventDefault();
    if (carrinho.length === 0) {
        mostrarToast("Sua sacola está vazia.");
        fecharPedidoModal();
        return;
    }

    const nome = document.getElementById("pedido-cliente-nome")?.value.trim() || "";
    const telefone = document.getElementById("pedido-cliente-telefone")?.value.trim() || "";
    const observacao = document.getElementById("pedido-observacao")?.value.trim() || "";
    const msg = document.getElementById("pedido-form-msg");
    const botao = document.getElementById("pedido-confirmar-btn");
    const telefoneDigitos = telefone.replace(/\D/g, "");

    if (nome.length < 2) {
        if (msg) msg.textContent = "Informe seu nome.";
        return;
    }
    if (telefoneDigitos.length < 8) {
        if (msg) msg.textContent = "Informe um telefone/WhatsApp válido.";
        return;
    }

    if (!pedidoTokenAtual) pedidoTokenAtual = gerarTokenPedido();
    salvarDadosPedidoLocal(nome, telefone);

    // Abrimos a nova guia durante o clique para evitar bloqueio de pop-up após a chamada assíncrona.
    let janelaWhats = null;
    try {
        janelaWhats = window.open("about:blank", "_blank");
        if (janelaWhats) janelaWhats.opener = null;
    } catch (_) {}

    if (botao) {
        botao.disabled = true;
        botao.textContent = "Registrando...";
    }
    if (msg) msg.textContent = "Registrando seu pedido...";

    try {
        iniciarSupabaseLoja();
        const itens = carrinho.map(item => ({
            produto_id: Number(item.id),
            quantidade: Math.max(1, Number.parseInt(item.quantidade, 10) || 1)
        }));

        const { data, error } = await supabaseClient.rpc("criar_pedido", {
            p_token: pedidoTokenAtual,
            p_cliente_id: clienteAvaliacaoId,
            p_cliente_nome: nome,
            p_cliente_telefone: telefone,
            p_observacao: observacao,
            p_itens: itens
        });
        if (error) throw error;

        const registro = Array.isArray(data) ? data[0] : data;
        const codigo = registro?.codigo || "CEGONHA";
        const totalServidor = normalizarPreco(registro?.total);
        const total = Number.isFinite(totalServidor) ? totalServidor : totalCarrinhoAtual();
        const texto = montarMensagemPedidoWhatsApp({ codigo, nome, telefone, observacao, total });
        const linkFinal = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

        carrinho = [];
        salvarCarrinho();
        atualizarInterfaceCarrinho();
        atualizarContadoresMobile();

        fecharPedidoModal(true);
        if (estadoHistoricoUI() === "pedido") {
            const estadoAtual = (history.state && typeof history.state === "object") ? history.state : {};
            history.replaceState({ ...estadoAtual, [CHAVE_HISTORICO_UI]: null }, "", window.location.href);
        }
        mostrarToast(`Pedido ${codigo} registrado com sucesso.`);

        if (janelaWhats && !janelaWhats.closed) {
            janelaWhats.location.href = linkFinal;
        } else {
            window.location.href = linkFinal;
        }
    } catch (erro) {
        console.error("Falha ao registrar pedido:", erro);
        if (janelaWhats && !janelaWhats.closed) janelaWhats.close();
        if (msg) msg.textContent = "Não foi possível registrar agora. Tente novamente em instantes.";

        const continuar = window.confirm("Não conseguimos registrar o pedido no banco agora. Deseja abrir o WhatsApp mesmo assim?");
        if (continuar) {
            const texto = montarMensagemPedidoWhatsApp({
                codigo: "Cegonha Baby Store",
                nome,
                telefone,
                observacao,
                total: totalCarrinhoAtual()
            });
            const linkFinal = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
            window.location.href = linkFinal;
        }
    } finally {
        if (botao) {
            botao.disabled = false;
            botao.textContent = "Registrar e abrir WhatsApp";
        }
    }
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
        listaEl.innerHTML = '<div class="avaliacoes-vazio">Ainda não há avaliações desta peça.</div>';
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

async function enviarAvaliacao(event) {
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
    const jaExistia = obterAvaliacoesProduto(produtoId).some(item => item.clienteId === clienteAvaliacaoId);
    const botao = document.getElementById("btn-enviar-avaliacao");

    if (botao) {
        botao.disabled = true;
        botao.textContent = "Publicando...";
    }

    try {
        await publicarAvaliacaoNoSupabase(produtoId, notaSelecionada, nome, comentario);
        await carregarAvaliacoesDoSupabase();
        renderizarAvaliacoesModal(produtoId);
        renderizarProdutos(categoriaAtual, { preservarScroll: true });
        mostrarToast(jaExistia ? "Sua avaliação foi atualizada." : "Obrigado pela sua avaliação!");
    } catch (erro) {
        console.error(erro);
        mostrarToast("Não foi possível publicar a avaliação agora. Tente novamente.");
    } finally {
        if (botao) {
            botao.disabled = false;
            botao.textContent = "Enviar avaliação";
        }
    }
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
    // Detalhes e visualizador recebem a foto original em qualidade máxima.
    // A vitrine continua usando a versão WebP mais leve.
    img.src = normalizarImagemOriginal(produto.imagemOriginal || produto.imagem);
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
    carregarAvaliacoesDoSupabase().then(carregou => {
        if (!carregou) return;
        const modalAtual = document.getElementById("modal-detalhes");
        if (Number(modalAtual?.dataset.produtoId) === Number(produto.id)) {
            renderizarAvaliacoesModal(produto.id);
            renderizarProdutos(categoriaAtual, { preservarScroll: true });
        }
    });
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
        const pedido = document.getElementById("pedido-modal");
        if (pedido?.classList.contains("ativo")) {
            fecharPedidoModal();
            return;
        }
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
    const pedido = document.getElementById("pedido-modal");
    if (pedido?.classList.contains("ativo")) {
        fecharPedidoModal(true);
        return;
    }

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

document.addEventListener("DOMContentLoaded", async () => {
    // Renderiza imediatamente o catálogo local e, em seguida, sincroniza com o banco.
    renderizarProdutos("todos");
    atualizarInterfaceCarrinho();
    ativarArrasteComMouse();
    salvarCarrinho();
    salvarFavoritos();
    atualizarContadoresMobile();
    const primeiroLinkMobile = document.querySelector(".bottom-nav-mobile a");
    if (primeiroLinkMobile) primeiroLinkMobile.classList.add("ativo");
    ativarGestosVisualizador();

    const carregouBanco = await carregarProdutosDoSupabase();
    if (carregouBanco) {
        renderizarProdutos("todos");
        atualizarInterfaceCarrinho();
        atualizarContadoresMobile();
    }

    const carregouAvaliacoes = await carregarAvaliacoesDoSupabase();
    if (carregouAvaliacoes) {
        renderizarProdutos("todos");
    }

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
