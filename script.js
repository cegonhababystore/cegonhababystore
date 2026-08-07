<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cegonha Baby Store | Moda Infantil Premium</title>
    <link rel="preconnect" href="https://googleapis.com">
    <link rel="preconnect" href="https://gstatic.com" crossorigin>
    <link href="https://googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <div class="topo-alerta">
        🎉 FRETE GRÁTIS em compras acima de R$ 199 | Até 6x sem juros no cartão!
    </div>

    <header>
        <div class="logo-container">
            <img src="./logo.jpg" alt="Cegonha Baby Store" class="logo-img">
        </div>
        <nav>
            <a href="#" class="ativo" onclick="gerenciarMenuAtivo(this)">Início</a>
            <a href="#produtos" onclick="gerenciarMenuAtivo(this)">Novidades</a>
            <a href="#personalizados">Bordados ✨</a>
        </nav>
        <div class="carrinho" onclick="alternarCarrinho(true)">
            🛍️ Sacola (<span id="contador-carrinho">0</span>)
        </div>
    </header>

    <div id="carrinho-lateral" class="carrinho-lateral">
        <div class="carrinho-cabecalho">
            <h3>Sua Sacola 🛍️</h3>
            <button class="btn-fechar" onclick="alternarCarrinho(false)">✕</button>
        </div>
        <div id="carrinho-itens" class="carrinho-itens">
            <p class="carrinho-vazio">Sua sacola está vazia... 🥺</p>
        </div>
        <div class="carrinho-rodape">
            <div class="total-bloco">
                <span>Total:</span>
                <span id="carrinho-total">R$ 0,00</span>
            </div>
            <a href="https://wa.me" id="botao-finalizar-link" target="_blank" class="btn-finalizar" style="text-decoration: none; display: block; text-align: center;">Finalizar Pedido via WhatsApp 💬</a>
        </div>
    </div>
    <div id="carrinho-overlay" class="carrinho-overlay" onclick="alternarCarrinho(false)"></div>

    <section class="hero">
        <div class="hero-container">
            <div class="hero-texto">
                <h1>O conforto que seu pequeno merece, com o estilo que você ama!</h1>
                <p>Roupas infantis premium feitas com algodão 100% hipoalergênico. Peças duráveis, macias e cheias de afeto para acompanhar todas as discoveries.</p>
                <div class="hero-botoes">
                    <a href="#produtos" class="btn-principal">Ver Coleção</a>
                </div>
            </div>
        </div>
    </section>

    <section class="filtros-secao">
        <button class="btn-filtro ativo" onclick="filtrarProdutos('todos')">Todos os Looks</button>
        <button class="btn-filtro" onclick="filtrarProdutos('bebe')">Bebês</button>
        <button class="btn-filtro" onclick="filtrarProdutos('menina')">Meninas</button>
        <button class="btn-filtro" onclick="filtrarProdutos('menino')">Meninos</button>
    </section>

    <main id="produtos" class="vitrine-container">
        <div class="secao-cabecalho">
            <h2>Destaques Imperdíveis ✨</h2>
            <p>Looks selecionados com amor para todas as ocasiões</p>
        </div>
        
        <div class="grade-produtos">
            <!-- PRODUTO 1 -->
            <div class="produto-card" data-categoria="menino">
                <div class="produto-badge-desconto">15% OFF</div>
                <div class="produto-imagem" onclick="abrirDetalhes(1, 'Conjunto Pijama Infantil Masculino', 'R$ 89,90', './fotovitrine1m.jpeg', 'Conjunto de pijama masculino infantil confeccionado em algodão premium extremamente macio.')">
                    <img src="./fotovitrine1m.jpeg" alt="Conjunto Pijama Infantil Masculino">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Menino</span>
                    <h3>Conjunto Pijama Infantil Masculino</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (24)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 89,90</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 2 -->
            <div class="produto-card" data-categoria="bebe">
                <div class="produto-badge-novidade">Destaque ✨</div>
                <div class="produto-imagem" onclick="abrirDetalhes(2, 'Body Feminino Laranja Premium', 'R$ 68,90', './body feminino laranja.jpeg', 'Lindo body feminino na cor laranja vibrante, feito com malha de toque macio.')">
                    <img src="./body feminino laranja.jpeg" alt="Body Feminino Laranja Premium">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Bebês</span>
                    <h3>Body Feminino Laranja Premium</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (14)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 68,90</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 3 -->
            <div class="produto-card" data-categoria="menina">
                <div class="produto-badge-novidade">Fofura 💕</div>
                <div class="produto-imagem" onclick="abrirDetalhes(3, 'Pijama Macacão Plush Corações', 'R$ 129,90', './macacão rosa com corações.jpeg', 'Aconchegante macacão longo infantil de plush premium.')">
                    <img src="./macacão rosa com corações.jpeg" alt="Pijama Macacão Plush Corações">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Menina</span>
                    <h3>Pijama Macacão Plush Corações</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (28)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 129,90</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 4 -->
            <div class="produto-card" data-categoria="bebe">
                <div class="produto-badge-novidade">Novo 🧸</div>
                <div class="produto-imagem" onclick="abrirDetalhes(4, 'Macacão Infantil Feminino Bege', 'R$ 115,00', './macacao-bege.jpeg', 'Elegante macacão infantil em malha de toque macio.')">
                    <img src="./macacao-bege.jpeg" alt="Macacão Infantil Feminino Bege">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Bebês</span>
                    <h3>Macacão Infantil Feminino Bege</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (19)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 115,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>
            <!-- PRODUTO 5 -->
            <div class="produto-card" data-categoria="bebe">
                <div class="produto-badge-novidade">Destaque ✨</div>
                <div class="produto-imagem" onclick="abrirDetalhes(5, 'Romper Jardineira Mostarda Rendada', 'R$ 98,00', './romper-mostarda-renda.jpeg', 'Romper estilo jardineira em algodão leve com babados charmosos.')">
                    <img src="./romper-mostarda-renda.jpeg" alt="Romper Jardineira Mostarda Rendada">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Bebês</span>
                    <h3>Romper Jardineira Mostarda Rendada</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (12)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 98,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 6 -->
            <div class="produto-card" data-categoria="menina">
                <div class="produto-badge-novidade">Lookinho 💕</div>
                <div class="produto-imagem" onclick="abrirDetalhes(6, 'Conjunto Shorts Xadrez e Batinha Lesie', 'R$ 115,00', './conjunto-batinha-xadrez.jpeg', 'Batinha branca em lese e shorts xadrez rosa e branco.')">
                    <img src="./conjunto-batinha-xadrez.jpeg" alt="Conjunto Shorts Xadrez e Batinha Lesie">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Meninas</span>
                    <h3>Conjunto Shorts Xadrez e Batinha Lesie</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (18)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 115,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 7 -->
            <div class="produto-card" data-categoria="menino">
                <div class="produto-badge-desconto">Quentinho ❄️</div>
                <div class="produto-imagem" onclick="abrirDetalhes(7, 'Pijama Soft Masculino Golfinhos', 'R$ 89,90', './pijama-soft-golfinhos.jpeg', 'Pijama infantil longo em tecido soft térmico com estampa de golfinhos.')">
                    <img src="./pijama-soft-golfinhos.jpeg" alt="Pijama Soft Masculino Golfinhos">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Meninos</span>
                    <h3>Pijama Soft Masculino Golfinhos</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (22)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 89,90</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 8 -->
            <div class="produto-card" data-categoria="bebe">
                <div class="produto-badge-novidade">Fofura 🧸</div>
                <div class="produto-imagem" onclick="abrirDetalhes(8, 'Macacão Plush Rosa com Pantufas', 'R$ 135,00', './macacao-plush-pantufas.jpeg', 'Macacão curto em plush premium com pantufas de corações.')">
                    <img src="./macacao-plush-pantufas.jpeg" alt="Macacão Plush Rosa com Pantufas">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Bebês</span>
                    <h3>Macacão Plush Rosa com Pantufas</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (31)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 135,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 9 -->
            <div class="produto-card" data-categoria="menina">
                <div class="produto-badge-novidade">Inverno ❄️</div>
                <div class="produto-imagem" onclick="abrirDetalhes(9, 'Pijama Macacão Teddy Corações', 'R$ 125,00', './pijama-teddy-coracoes.jpeg', 'Macacão longo infantil em fleece felpudo com estampa de corações.')">
                    <img src="./pijama-teddy-coracoes.jpeg" alt="Pijama Macacão Teddy Corações">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Meninas</span>
                    <h3>Pijama Macacão Teddy Corações</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (42)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 125,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>
            <!-- PRODUTO 10 -->
            <div class="produto-card" data-categoria="bebe">
                <div class="produto-badge-novidade">Premium 🧸</div>
                <div class="produto-imagem" onclick="abrirDetalhes(10, 'Macacão Jardineira Ursinho Soft', 'R$ 145,00', './macacao-ursinho-soft.jpeg', 'Macacão imitando jardineira xadrez com lindo aplique de ursinho.')">
                    <img src="./macacao-ursinho-soft.jpeg" alt="Macacão Jardineira Ursinho Soft">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Bebês</span>
                    <h3>Macacão Jardineira Ursinho Soft</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (26)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 145,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 11 -->
            <div class="produto-card" data-categoria="menino">
                <div class="produto-badge-novidade">Estilo ✨</div>
                <div class="produto-imagem" onclick="abrirDetalhes(11, 'Conjunto Body Polo e Jardineira Linho', 'R$ 159,00', './conjunto-polo-jardineira-linho.jpeg', 'Body gola polo amarela e jardineira imitando linho xadrez.')">
                    <img src="./conjunto-polo-jardineira-linho.jpeg" alt="Conjunto Body Polo e Jardineira Linho">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Meninos</span>
                    <h3>Conjunto Body Polo e Jardineira Linho</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (15)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 159,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 12 -->
            <div class="produto-card" data-categoria="menina">
                <div class="produto-badge-novidade">Fofura ✨</div>
                <div class="produto-imagem" onclick="abrirDetalhes(12, 'Romper Ciganinha Floral Black', 'R$ 88,00', './romper-ciganinha-floral.jpeg', 'Romper infantil feminino com estampa maxi floral de rosas.')">
                    <img src="./romper-ciganinha-floral.jpeg" alt="Romper Ciganinha Floral Black">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Meninas</span>
                    <h3>Romper Ciganinha Floral Black</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (19)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 88,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>

            <!-- PRODUTO 13 -->
            <div class="produto-card" data-categoria="bebe">
                <div class="produto-badge-novidade">Kit 🌴</div>
                <div class="produto-imagem" onclick="abrirDetalhes(13, 'Romper Canelado Dinossauros com Chapéu', 'R$ 110,00', './romper-dinossauros-chapeu.jpeg', 'Romper regata em malha canelada verde com chapéu bucket.')">
                    <img src="./romper-dinossauros-chapeu.jpeg" alt="Romper Canelado Dinossauros com Chapéu">
                </div>
                <div class="produto-info">
                    <span class="produto-categoria">Bebês</span>
                    <h3>Romper Canelado Dinossauros com Chapéu</h3>
                    <div class="produto-estrelas">⭐⭐⭐⭐⭐ (25)</div>
                    <div class="produto-preco-bloco"><span class="preco-atual">R$ 110,00</span></div>
                    <a href="https://wa.me" target="_blank" class="btn-comprar">Comprar via WhatsApp 💬</a>
                </div>
            </div>
        </div>
    </main>

    <section id="personalizados" class="personalizados-secao" style="background-color: #fcf8f5; padding: 60px 20px; text-align: center; border-radius: 20px; margin: 40px auto; max-width: 1200px; border: 1px dashed #e6ccb2;">
        <div style="max-width: 800px; margin: 0 auto;">
            <span style="font-size: 24px;">🪡✨</span>
            <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; color: #4a3e3d; font-size: 28px; margin-top: 10px; margin-bottom: 15px; font-weight: 700;">Peças Bordadas & Personalizadas</h2>
            <p style="font-family: 'Plus Jakarta Sans', sans-serif; color: #6e5a58; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Quer deixar o enxoval do seu pequeno ainda mais exclusivo? Nós produzimos mantas, bodys, rompers e fraldinhas com o nome do bebê ou o desenho que você escolher!</p>
            <a href="https://wa.me" target="_blank" style="display: inline-block; background-color: #d4a373; color: white; padding: 15px 35px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 50px; box-shadow: 0 4px 15px rgba(212, 163, 115, 0.3); font-family: 'Plus Jakarta Sans', sans-serif;">Encomendar Peça Personalizada via WhatsApp 💬</a>
        </div>
    </section>

    <div id="modal-detalhes" class="modal-detalhes">
        <div class="modal-conteudo">
            <button class="btn-fechar-modal" onclick="fecharDetalhes()">✕</button>
            <div class="modal-foto-bloco">
                <img id="modal-img" src="" alt="Produto Expandido">
            </div>
            <div class="modal-info-bloco">
                <h2 id="modal-titulo">Nome do Produto</h2>
                <div id="modal-preco" class="modal-preco">R$ 0,00</div>
                <p id="modal-descricao" class="modal-descricao">Descrição detalhada...</p>
            </div>
        </div>
    </div>

    <footer>
        <p>&copy; 2026 Cegonha Baby Store - Todos os direitos reservados.</p>
    </footer>

    <a href="https://whatsapp.com" target="_blank" class="whatsapp-flutuante" aria-label="WhatsApp"></a>

    <script src="./script.js"></script>
</body>
</html>
