(() => {
    const id = String(window.CEGONHA_GA_ID || "").trim();
    const idValido = /^G-[A-Z0-9]+$/i.test(id) && !id.includes("COLE_SEU_ID");
    let iniciado = false;
    let buscaTimer = null;
    let ultimaBusca = "";

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }

    function iniciar() {
        if (iniciado || !idValido) {
            if (!idValido) {
                console.info("Cegonha Analytics: aguardando o ID de medição do GA4 em analytics-config.js.");
            }
            return;
        }

        iniciado = true;
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
        document.head.appendChild(script);

        gtag("js", new Date());
        gtag("config", id, {
            send_page_view: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
    }

    function evento(nome, parametros = {}) {
        if (!idValido) return;
        if (!iniciado) iniciar();
        gtag("event", nome, parametros);
    }

    function precoSeguro(valor) {
        const numero = Number(valor);
        return Number.isFinite(numero) ? numero : 0;
    }

    function itemProduto(produto, quantidade = 1) {
        if (!produto) return null;
        return {
            item_id: String(produto.id ?? ""),
            item_name: String(produto.nome || "Produto"),
            item_category: String(produto.categoriaLabel || produto.categoria || "Produto"),
            price: precoSeguro(produto.preco),
            quantity: Math.max(1, Number.parseInt(quantidade, 10) || 1)
        };
    }

    function itensCarrinho(carrinho = []) {
        return carrinho.map(item => itemProduto(item, item.quantidade)).filter(Boolean);
    }

    function valorCarrinho(carrinho = []) {
        return carrinho.reduce((total, item) => {
            return total + (precoSeguro(item.preco) * Math.max(1, Number.parseInt(item.quantidade, 10) || 1));
        }, 0);
    }

    function registrarBusca(valor) {
        const termo = String(valor || "").trim();
        clearTimeout(buscaTimer);
        if (termo.length < 2) return;
        buscaTimer = setTimeout(() => {
            const normalizado = termo.toLowerCase();
            if (normalizado === ultimaBusca) return;
            ultimaBusca = normalizado;
            evento("search", { search_term: termo });
        }, 700);
    }

    function visualizarProduto(produto) {
        const item = itemProduto(produto);
        if (!item) return;
        evento("view_item", {
            currency: "BRL",
            value: item.price,
            items: [item]
        });
    }

    function adicionarCarrinho(produto, quantidade = 1) {
        const item = itemProduto(produto, quantidade);
        if (!item) return;
        evento("add_to_cart", {
            currency: "BRL",
            value: item.price * item.quantity,
            items: [item]
        });
    }

    function removerCarrinho(produto, quantidade = 1) {
        const item = itemProduto(produto, quantidade);
        if (!item) return;
        evento("remove_from_cart", {
            currency: "BRL",
            value: item.price * item.quantity,
            items: [item]
        });
    }

    function adicionarFavorito(produto) {
        const item = itemProduto(produto);
        if (!item) return;
        evento("add_to_wishlist", {
            currency: "BRL",
            value: item.price,
            items: [item]
        });
    }

    function visualizarCarrinho(carrinho = []) {
        if (!Array.isArray(carrinho) || !carrinho.length) return;
        evento("view_cart", {
            currency: "BRL",
            value: valorCarrinho(carrinho),
            items: itensCarrinho(carrinho)
        });
    }

    function iniciarCheckout(carrinho = []) {
        if (!Array.isArray(carrinho) || !carrinho.length) return;
        evento("begin_checkout", {
            currency: "BRL",
            value: valorCarrinho(carrinho),
            items: itensCarrinho(carrinho)
        });
    }

    function gerarLeadPedido(codigo, total, carrinho = []) {
        evento("generate_lead", {
            currency: "BRL",
            value: precoSeguro(total),
            lead_source: "whatsapp_checkout",
            order_code: String(codigo || ""),
            items_count: Array.isArray(carrinho)
                ? carrinho.reduce((soma, item) => soma + Math.max(1, Number.parseInt(item.quantidade, 10) || 1), 0)
                : 0
        });
    }

    function contatoProduto(produto) {
        const item = itemProduto(produto);
        evento("contact_product_whatsapp", {
            item_id: item?.item_id || "",
            item_name: item?.item_name || "",
            value: item?.price || 0,
            currency: "BRL"
        });
    }

    function contatoLoja() {
        evento("contact_whatsapp", { contact_location: "floating_button" });
    }

    window.CegonhaAnalytics = {
        ativo: idValido,
        registrarBusca,
        visualizarProduto,
        adicionarCarrinho,
        removerCarrinho,
        adicionarFavorito,
        visualizarCarrinho,
        iniciarCheckout,
        gerarLeadPedido,
        contatoProduto,
        contatoLoja
    };

    iniciar();
})();
