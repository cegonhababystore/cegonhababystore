let carrinho = [];

// Função que abre e fecha a sacola lateral deslizante
function alternarCarrinho(abrir) {
    const lateral = document.getElementById('carrinho-lateral');
    const overlay = document.getElementById('carrinho-overlay');
    if (lateral && overlay) {
        if (abrir) {
            lateral.classList.add('aberto');
            overlay.classList.add('aberto');
        } else {
            lateral.classList.remove('aberto');
            overlay.classList.remove('aberto');
        }
    }
}

// Controla o visual ativo dos menus do topo
function gerenciarMenuAtivo(elemento) {
    const links = document.querySelectorAll('header nav a');
    links.forEach(link => link.classList.remove('ativo'));
    elemento.classList.add('ativo');
}

// Adiciona a roupinha dentro da sacola e calcula as quantidades
function adicionarProduto(id, nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
    }
    atualizarInterfaceCarrinho();
    alternarCarrinho(true); // Abre a sacola para mostrar que o produto entrou
}

// Remove o item da sacola
function removerProduto(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarInterfaceCarrinho();
}

// Atualiza os valores, contador e lista visual de itens na sacola
function atualizarInterfaceCarrinho() {
    const conteinerItens = document.getElementById('carrinho-itens');
    const contadorSacola = document.getElementById('contador-carrinho');
    const totalSacola = document.getElementById('carrinho-total');

    const totalPecas = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    if (contadorSacola) contadorSacola.innerText = totalPecas;

    if (carrinho.length === 0) {
        if (conteinerItens) conteinerItens.innerHTML = '<p class="carrinho-vazio">Sua sacola está vazia... 🥺</p>';
        if (totalSacola) totalSacola.innerText = 'R$ 0,00';
        return;
    }

    if (conteinerItens) {
        conteinerItens.innerHTML = '';
        let valorTotalGeral = 0;

        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            valorTotalGeral += subtotal;
            conteinerItens.innerHTML += `
                <div class="item-carrinho">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="item-info">
                        <h5>${item.nome}</h5>
                        <p>${item.quantidade}x - R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                        <button class="btn-remover" onclick="removerProduto(${item.id})">Remover</button>
                    </div>
                </div>`;
        });
        if (totalSacola) totalSacola.innerText = `R$ ${valorTotalGeral.toFixed(2).replace('.', ',')}`;
    }
}

// Sistema de filtros por botões (Bebês, Meninas, Meninos)
function filtrarProdutos(categoria) {
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    
    // Destaca o botão clicado
    if (event && event.target) {
        event.target.classList.add('ativo');
    }

    const cards = document.querySelectorAll('.produto-card');
    cards.forEach(card => {
        if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 🔥 A FUNÇÃO CHAVE QUE ESTAVA FALTANDO! Clica na foto e joga as informações na janela preta
function abrirDetalhes(id, nome, precoTexto, imagem, descricao) {
    const modal = document.getElementById('modal-detalhes');
    if (modal) {
        // Encontra os campos do HTML e injeta os textos reais da roupinha clicada
        document.getElementById('modal-titulo').innerText = nome;
        document.getElementById('modal-preco').innerText = precoTexto;
        document.getElementById('modal-descricao').innerText = descricao;
        document.getElementById('modal-img').src = imagem;
        
        // Limpa o sinal "R$" e converte o preço em número para o carrinho conseguir somar
        const precoNumero = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());
        
        // Captura o botão interno "Adicionar à Sacola" do modal
        const btnComprarModal = document.querySelector('.modal-info-bloco .btn-comprar') || document.getElementById('modal-btn-comprar');
        
        // Se o botão existir, ativa a função de clique dele para jogar o produto na sacola
        if (btnComprarModal) {
            btnComprarModal.onclick = function() {
                adicionarProduto(id, nome, precoNumero, imagem);
                fecharDetalhes(); // Fecha a janelinha após colocar na sacola
            };
        }
        
        modal.classList.add('ativo'); // Abre a janela na tela
    }
}

// Fecha a janela de detalhes
function fecharDetalhes() {
    const modal = document.getElementById('modal-detalhes');
    if (modal) modal.classList.remove('ativo');
}
