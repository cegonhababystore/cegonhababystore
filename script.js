let carrinho = [];

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

function gerenciarMenuAtivo(elemento) {
    const links = document.querySelectorAll('header nav a');
    links.forEach(link => link.classList.remove('ativo'));
    elemento.classList.add('ativo');
}

function adicionarProduto(id, nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
    }
    atualizarInterfaceCarrinho();
    alternarCarrinho(true);
}

function removerProduto(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarInterfaceCarrinho();
}

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
                <div class="item-carrinho" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <img src="${item.imagem}" alt="${item.nome}" style="width: 50px; border-radius: 5px;">
                    <div style="flex: 1;">
                        <h5 style="margin: 0; font-size: 14px;">${item.nome}</h5>
                        <p style="margin: 0; font-size: 12px;">${item.quantidade}x - R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                        <button onclick="removerProduto(${item.id})" style="color: red; border: none; background: none; cursor: pointer; font-size: 11px;">Remover</button>
                    </div>
                </div>`;
        });
        if (totalSacola) totalSacola.innerText = `R$ ${valorTotalGeral.toFixed(2).replace('.', ',')}`;
    }
}

function filtrarProdutos(categoria) {
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    
    const cards = document.querySelectorAll('.produto-card');
    cards.forEach(card => {
        if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function abrirDetalhes(id, nome, precoTexto, imagem, descricao) {
    const modal = document.getElementById('modal-detalhes');
    if (modal) {
        document.getElementById('modal-titulo').innerText = nome;
        document.getElementById('modal-preco').innerText = precoTexto;
        document.getElementById('modal-descricao').innerText = descricao;
        document.getElementById('modal-img').src = imagem;
        
        const precoNumero = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());
        const btnComprarModal = document.getElementById('modal-btn-comprar');
        
        if (btnComprarModal) {
            btnComprarModal.onclick = function() {
                adicionarProduto(id, nome, precoNumero, imagem);
                fecharDetalhes();
            };
        }
        modal.classList.add('ativo');
    }
}

function fecharDetalhes() {
    const modal = document.getElementById('modal-detalhes');
    if (modal) modal.classList.remove('ativo');
}
