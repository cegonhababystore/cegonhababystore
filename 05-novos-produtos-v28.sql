-- CEGONHA BABY STORE - V28
-- 13 novos produtos baseados nas imagens enviadas.
-- Os preços abaixo são PROVISÓRIOS e podem ser alterados depois no painel admin.
-- Este script pode ser executado novamente sem duplicar produtos com o mesmo nome.

insert into public.produtos
    (nome, descricao, preco, categoria, estoque, imagem_principal, ativo)
select
    v.nome,
    v.descricao,
    v.preco,
    v.categoria,
    v.estoque,
    v.imagem_principal,
    v.ativo
from (
    values
        ('Conjunto Chuva de Amor Rosa e Cinza', 'Conjunto infantil em rosa e cinza, com blusa de mangas com babados e laço frontal, acompanhado de peça inferior com suspensórios, babados e laços. A estampa de nuvens e pequenos corações deixa o visual ainda mais delicado.', 89.90, 'menina', 0, './conjunto-chuva-de-amor-rosa-cinza.jpeg', true),
        ('Conjunto Azul com Calça Xadrez Preto e Branco', 'Conjunto infantil com blusa azul de manga longa, detalhe contrastante nos ombros e bolso frontal com aplicação divertida, acompanhado de calça xadrez em preto e branco.', 119.90, 'menino', 0, './conjunto-azul-xadrez-preto-branco.jpeg', true),
        ('Conjunto Moranguinhos Vermelho com Jardineira', 'Conjunto infantil em vermelho e branco, com blusa de babados e jardineira estampada com morangos. Os laços vermelhos e as camadas de babados completam o visual delicado.', 99.90, 'menina', 0, './conjunto-moranguinhos-vermelho.jpeg', true),
        ('Romper Corações Terracota com Babados', 'Romper infantil em terracota e creme, com estampa de corações na parte superior, mangas com babados, suspensórios decorativos, laços frontais e saia em camadas.', 89.90, 'menina', 0, './romper-coracoes-terracota.jpeg', true),
        ('Vestido Listrado Rosa com Laço', 'Vestido infantil rosa e branco com listras verticais, alças finas e laço grande na parte frontal. A saia ampla cria um visual clássico e delicado.', 94.90, 'menina', 0, './vestido-listrado-rosa-laco.jpeg', true),
        ('Macacão Bege com Detalhe Xadrez', 'Macacão longo bege com gola, fechamento frontal por botões e detalhes coloridos em estampa xadrez. Os pezinhos fechados e os acabamentos contrastantes completam o visual.', 109.90, 'bebe', 0, './macacao-bege-detalhe-xadrez.jpeg', true),
        ('Romper Rosa Texturizado com Babados', 'Romper infantil rosa com textura marcada, mangas curtas com babados, três botões frontais e saia em camadas. O fechamento inferior facilita o uso no dia a dia.', 84.90, 'menina', 0, './romper-rosa-texturizado-babados.jpeg', true),
        ('Vestido Xadrez Azul com Laços Rosa', 'Vestido infantil xadrez em azul e branco, com gola branca arredondada, mangas curtas e dois laços rosa na cintura. A saia ampla dá um acabamento clássico ao modelo.', 99.90, 'menina', 0, './vestido-xadrez-azul-lacos-rosa.jpeg', true),
        ('Kit Macacão Ursinho Bege com Touca e Babador', 'Kit infantil em bege e marrom com macacão de manga longa estampado com ursinho, acompanhado de touca com orelhinhas e babador coordenado.', 119.90, 'bebe', 0, './kit-macacao-ursinho-bege.jpeg', true),
        ('Vestido Rosa Bordado com Babados', 'Vestido infantil rosa com detalhes vazados bordados, alças largas com babados e barra recortada. O modelo aparece de frente e de costas na imagem para destacar o acabamento.', 99.90, 'menina', 0, './vestido-rosa-bordado-babados.jpeg', true),
        ('Romper Floral Verde Jardim', 'Romper infantil verde com parte superior floral em tons de rosa e verde, mangas amplas com babados e laço frontal. O contraste entre o floral e o verde cria um visual leve e delicado.', 89.90, 'menina', 0, './romper-floral-verde-jardim.jpeg', true),
        ('Conjunto Pijama Cachorrinhos Rosa', 'Conjunto infantil rosa com camiseta de manga curta estampada com cachorrinhos e pequenas patinhas, acompanhado de short liso no mesmo tom.', 79.90, 'menina', 0, './conjunto-pijama-cachorrinhos-rosa.jpeg', true),
        ('Conjunto Batinha Creme com Flores Bordadas', 'Conjunto infantil em creme com batinha de manga curta e bloomer coordenado. Os bordados florais em tons de laranja aparecem na parte superior e na peça inferior, acompanhados de acabamento delicado nas bordas.', 89.90, 'menina', 0, './conjunto-batinha-creme-flores.jpeg', true)
) as v(nome, descricao, preco, categoria, estoque, imagem_principal, ativo)
where not exists (
    select 1
    from public.produtos p
    where lower(trim(p.nome)) = lower(trim(v.nome))
);

-- Conferência rápida dos produtos desta versão:
select id, nome, preco, categoria, estoque, imagem_principal, ativo
from public.produtos
where nome in (
    'Conjunto Chuva de Amor Rosa e Cinza',
    'Conjunto Azul com Calça Xadrez Preto e Branco',
    'Conjunto Moranguinhos Vermelho com Jardineira',
    'Romper Corações Terracota com Babados',
    'Vestido Listrado Rosa com Laço',
    'Macacão Bege com Detalhe Xadrez',
    'Romper Rosa Texturizado com Babados',
    'Vestido Xadrez Azul com Laços Rosa',
    'Kit Macacão Ursinho Bege com Touca e Babador',
    'Vestido Rosa Bordado com Babados',
    'Romper Floral Verde Jardim',
    'Conjunto Pijama Cachorrinhos Rosa',
    'Conjunto Batinha Creme com Flores Bordadas'
)
order by id;
