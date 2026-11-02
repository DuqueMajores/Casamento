// Lista de presentes inicial
const INITIAL_GIFTS = [
 {
    id: 'gift-eletro-1',
    title: 'Coifa ou Depurador Preto',
    category: 'Eletrodomésticos',
    price: 775,
    reserved: false, // Indica se já foi reservado
    linkConferir: "https://meli.la/2zvguwB", // Link editável individual
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_769777-MLA88217679048_072025-F.webp',
    description: 'Design moderno em preto para manter nossa cozinha sempre limpa e aconchegante.'
  },
  {
    id: 'gift-eletro-2',
    title: 'Máquina de Lavar Louça (Brastemp 11 Serviços)',
    category: 'Eletrodomésticos',
    price: 4179.05,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_848945-MLA84844614157_052025-F.webp',
    description: 'O sonho de consumo dos noivos para os jantares em família e recepção de amigos.',
    linkConferir: 'https://meli.la/2pXwcXf'
  },
  {
    id: 'gift-eletro-3',
    title: 'Robô Aspirador Inteligente',
    category: 'Eletrodomésticos',
    price: 1287.00,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_711881-MLA113674409005_062026-F.webp',
    description: 'Praticidade diária para manter nossa casa sempre impecável e cheirosa.',
    linkConferir: 'https://meli.la/2suGQSf'
  },
  {
    id: 'gift-eletro-4',
    title: 'Airfryer 12L',
    category: 'Eletrodomésticos',
    price: 632.46,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_654188-MLA110122213881_042026-L.webp',
    description: 'Refeições práticas, crocantes e saudáveis para a nossa rotina a dois.',
    linkConferir: 'https://meli.la/2TfX7bB'
  },
  {
    id: 'gift-eletro-5',
    title: 'Multiprocessador 3L',
    category: 'Eletrodomésticos',
    price: 78.99,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_868686-MLB116670449725_082026-L-multiprocessador-alimento-moedor-triturador-eletrico-2l-inox.webp',
    description: 'Perfeito para sucos matinais, vitaminas e receitas de bolos e tortas.',
    linkConferir: 'https://meli.la/13Dd8BB'
  },
  {
    id: 'gift-eletro-6',
    title: 'Ferro de Passar à Vapor',
    category: 'Eletrodomésticos',
    price: 107.88,
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_823108-MLA99554953858_122025-F.webp',
    description: 'Cuidado e carinho para roupas sempre alinhadas em ocasiões especiais.',
    linkConferir: 'https://meli.la/1JELZxZ'
  },
  {
    id: 'gift-casa-1',
    title: 'Jogo de Panelas Rochedo',
    category: 'Casa & Cozinha',
    price: 427.50,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_604523-MLA101062134781_122025-B.webp',
    description: 'Conjunto completo de alta durabilidade para preparar pratos deliciosos.',
    linkConferir: 'https://meli.la/1tyTeML'
  },
  {
    id: 'gift-casa-2',
    title: 'Jogo de Panela para Cozimento',
    category: 'Casa & Cozinha',
    price: 487.89,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_660078-MLA95500981072_102025-B.webp',
    description: 'Louças finas e elegantes para receber quem amamos em nossa nova casa.',
    linkConferir: 'https://meli.la/2LWFtUz'
  },
  {
    id: 'gift-casa-3',
    title: 'Faqueiro Inox Tramontina Pacific',
    category: 'Casa & Cozinha',
    price: 414.00,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_986391-MLU74479104233_022024-B.webp',
    description: 'Talheres refinados com brilho impecável para nossa mesa posta.',
    linkConferir: 'https://meli.la/2TNoQV8'
  },
  {
    id: 'gift-casa-4',
    title: 'Jogo de Taça Drinks',
    category: 'Casa & Cozinha',
    price: 201.80,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_846808-MLB51788271468_102022-B-6-tacas-gin-620ml-bohemia-cristal-com-titanium.webp',
    description: 'Para brindar as datas comemorativas, vitórias e aniversários de casamento.',
    linkConferir: 'https://meli.la/13TxNsD'
  },
  {
    id: 'gift-casa-5',
    title: 'Jogo de Lençol Cama Box King Size',
    category: 'Cama & Banho',
    price: 264.61,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_925124-MLA95403846246_102025-B.webp',
    description: 'Toque acetinado e noites de sono tranquilas e aconchegantes.',
    linkConferir: 'https://meli.la/1iDAsuT'
  },
  {
    id: 'gift-casa-6',
    title: 'Toalha de Banho Teka Premium',
    category: 'Cama & Banho',
    price: 59.84,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_875609-MLA110264433576_052026-B.webp',
    description: 'Absorção superior e aconchego de hotel para nosso banheiro.',
    linkConferir: 'https://meli.la/1VK3Z5g'
  },
  {
    id: 'gift-casa-7',
    title: 'Jogo de Fondue',
    category: 'Casa & Cozinha',
    price: 170,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_896878-MLA95647449330_102025-B.webp',
    description: 'Ideal para família e amigos se reunirem!',
    linkConferir: 'https://meli.la/1MqVygG'
  },
  {
    id: 'gift-casa-8',
    title: 'Extratora Portátil Sofá',
    category: 'Eletrodomésticos',
    price: 507.12,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_945436-MLA100025553119_122025-B.webp',
    description: 'Sempre deixe sua casa limpa e arrumada para receber seus amigos.',
    linkConferir: 'https://meli.la/1VCUeQX'
  },
  {
    id: 'gift-casa-9',
    title: 'Máquina de Café Expresso Dolce Gusto Nescafé',
    category: 'Eletrodomésticos',
    price: 650.98,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_709668-MLA116658963171_082026-B.webp',
    description: 'Um café quentinho não tem preço!',
    linkConferir: 'https://meli.la/1Eo46sJ'
  },
  {
    id: 'gift-casa-10',
    title: 'Batedeira Arno Planetária',
    category: 'Eletrodomésticos',
    price: 399.00,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_972624-MLA110796440578_052026-B.webp',
    description: 'Imagina você chegar e ter um bolo bem quentinho a sua espera!',
    linkConferir: 'https://meli.la/2LQjwoR'
  },
  {
    id: 'gift-casa-11',
    title: 'Panela de Pressão Rochedo',
    category: 'Casa & Cozinha',
    price: 349.19,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_876782-MLA109275156648_042026-B.webp',
    description: 'Uma cozinha mais elegante e tecnológica, essa panela vai comandar o nosso almoço!',
    linkConferir: 'https://meli.la/1mPm6VZ'
  },
  {
    id: 'gift-casa-12',
    title: 'Jogo 6 Pratos para Pizza',
    category: 'Casa & Cozinha',
    price: 47.41,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_817327-MLA100069525361_122025-B.webp',
    description: 'Um design moderno, pertence a uma completa linha de utensílios que garante beleza e harmonia na cozinha.',
    linkConferir: 'https://meli.la/1MMPy3A'
  },
  {
    id: 'gift-casa-13',
    title: 'Kit Tijela Bowl Cambuca de Percelana',
    category: 'Casa & Cozinha',
    price: 157.83,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_683988-MLB116869816409_082026-B-kit-10-jogo-cumbuca-500ml-porcelana-branca-capri-media-novo.webp',
    description: 'Perfeito junção de qualidade e praticidade, deixando seu mise en place profissional.',
    linkConferir: 'https://meli.la/1e6mroW'
  },
  {
    id: 'gift-casa-14',
    title: 'Conjunto Sobremesa de Vidro 12 Peças Egito',
    category: 'Casa & Cozinha',
    price: 51.90,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_710242-MLB111039997633_042026-B-jogo-de-pratos-fundos-egipcio-12-estrela-transparente-vidro.webp',
    description: 'Qualidade e sofisticação do Egito em nossa mesa.',
    linkConferir: 'https://meli.la/2MVe3um'
  },
  {
    id: 'gift-casa-15',
    title: 'Boleira Tamanho M',
    category: 'Casa & Cozinha',
    price: 59.79,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_924163-MLA96079187221_102025-B.webp',
    description: 'Uma peça essencial para apreciadores de combinação perfeita de elegância e funcionalidade',
    linkConferir: 'https://meli.la/1436oJ8'
  },
  {
    id: 'gift-casa-16',
    title: 'Boleira Tamanho G s/pé',
    category: 'Casa & Cozinha',
    price: 58.90,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_929439-MLA95973585902_102025-B.webp',
    description: 'Para decorar sua festa, aniversário ou até mesmo sua mesa para receber seus amigos.',
    linkConferir: 'https://meli.la/1mr2LCB'
  },
  {
    id: 'gift-casa-17',
    title: 'Soundbars',
    category: 'Eletrodomésticos',
    price: 979.00,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_982600-MLA96151189893_102025-B.webp',
    description: 'Soundbar que completa perfeitamente o seu ambiente e sua experiência sonora.',
    linkConferir: 'https://meli.la/2EseVWu'
  },
  {
    id: 'gift-casa-18',
    title: 'Máquina de Gelo',
    category: 'Eletrodomésticos',
    price: 529.90,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_805788-MLA109786302373_032026-B.webp',
    description: 'Feita para quem quer praticidade e gelo sempre disponível no dia a dia.',
    linkConferir: 'https://meli.la/23aHs3v'
  },
  {
    id: 'gift-casa-19',
    title: 'Cortina Corta Luz Cores Neutras',
    category: 'Casa & Sala',
    price: 112.76,
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_689584-MLB48126957682_112021-F-cortina-blackout-tecido-2m-x-2m-altura-blecaute-corta-luz.webp',
    description: 'Produto de qualidade, marca conceituada no mercado.',
    linkConferir: 'https://meli.la/2fzgwA2'
  },
  {
    id: 'gift-casa-20',
    title: 'Panela de Pipoca Tramontina',
    category: 'Casa & Cozinha',
    price: 175.40,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_790907-MLA95504165482_102025-B.webp',
    description: 'Versátil, lavável em máquina, as noites de filmes nunca mais vão ser as mesmas!',
    linkConferir: 'https://meli.la/2EtT13N'
  },
  {
    id: 'gift-casa-21',
    title: 'Frutadeira de Chão',
    category: 'Casa & Cozinha',
    price: 113.98,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_808202-MLB74459971525_022024-B-fruteira-de-chao-preto-fosco-em-aco-mdf-amadeirado.webp',
    description: 'Pode ser utilizada em vários ambientes facilitando o dia-a-dia.',
    linkConferir: 'https://meli.la/1ioJi4y'
  },
  {
    id: 'gift-casa-22',
    title: 'Mixer Eletrolux 3 em 1 ',
    category: 'Casa & Cozinha',
    price: 326.36,
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_938109-MLB96085451366_102025-B-mixer-3-em-1-electrolux-cinza-600w-haste-inox-truflow-eib20.webp',
    description: 'Triturar grãos, preparar vitaminas e outros ingredientes para cozinhar será uma tarefa simples a partir de agora.',
    linkConferir: 'https://meli.la/2Rq6EUD'
  },
];

// Lista de convidados inicial (62 convidados reais)
const INITIAL_GUESTS = [
  {
    "id": "1",
    "name": "Davi Alves",
    "invitationGroup": "Mariana Alves",
    "type": "Criança",
    "status": "Pendente",
    "phone": "+5521964585612"
  },
  {
    "id": "2",
    "name": "Théo Alves",
    "invitationGroup": "Mariana Alves",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "3",
    "name": "Mariana Alves",
    "invitationGroup": "Mariana Alves",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "4",
    "name": "Juliete Simões",
    "invitationGroup": "Juliete Simões",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522992725945"
  },
  {
    "id": "5",
    "name": "Renato Simões",
    "invitationGroup": "Juliete Simões",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "6",
    "name": "Arthur Simões",
    "invitationGroup": "Juliete Simões",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "7",
    "name": "Beatriz Simões",
    "invitationGroup": "Juliete Simões",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "8",
    "name": "Liete Souza",
    "invitationGroup": "Liete Souza",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521966042096"
  },
  {
    "id": "9",
    "name": "Rodolfo Souza",
    "invitationGroup": "Rodolfo Souza",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522992294094"
  },
  {
    "id": "10",
    "name": "Glaucia Queiroz",
    "invitationGroup": "Glaucia Queiroz",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521985838775"
  },
  {
    "id": "11",
    "name": "Sabrina Anelle",
    "invitationGroup": "Sabrina Anelle",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521964579568"
  },
  {
    "id": "12",
    "name": "Luiza Anelle",
    "invitationGroup": "Sabrina Anelle",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "13",
    "name": "Margarete Souza",
    "invitationGroup": "Margarete Souza",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521993602624"
  },
  {
    "id": "14",
    "name": "Silvana Dias",
    "invitationGroup": "Silvana Dias",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521991344350"
  },
  {
    "id": "15",
    "name": "Jeferson Trindade",
    "invitationGroup": "Silvana Dias",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "16",
    "name": "Adnei Dias",
    "invitationGroup": "Adnei Dias",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522992258285"
  },
  {
    "id": "17",
    "name": "Solange Oliveira",
    "invitationGroup": "Solange Oliveira",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521973214489"
  },
  {
    "id": "18",
    "name": "Bel Dias",
    "invitationGroup": "Bel Dias",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521975313823"
  },
  {
    "id": "19",
    "name": "Adriano Dias",
    "invitationGroup": "Bel Dias",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "20",
    "name": "Igor de Oliveira",
    "invitationGroup": "Igor de Oliveira",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521987691964"
  },
  {
    "id": "21",
    "name": "Lorran de Oliveira",
    "invitationGroup": "Igor de Oliveira",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "22",
    "name": "Ana Paula Pate",
    "invitationGroup": "Ana Paula Pate",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521964487182"
  },
  {
    "id": "23",
    "name": "Marcelo Pate",
    "invitationGroup": "Ana Paula Pate",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "24",
    "name": "Daniela Dias",
    "invitationGroup": "Daniela Dias",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521972680354"
  },
  {
    "id": "25",
    "name": "Marcos Alves",
    "invitationGroup": "Daniela Dias",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "26",
    "name": "Luana Dias",
    "invitationGroup": "Luana Dias",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521964798332"
  },
  {
    "id": "27",
    "name": "Moisés Damasceno",
    "invitationGroup": "Luana Dias",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "28",
    "name": "Thaynara Oliveira",
    "invitationGroup": "Thaynara Oliveira",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521991706680"
  },
  {
    "id": "29",
    "name": "Daniel Monteiro",
    "invitationGroup": "Thaynara Oliveira",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "30",
    "name": "Bruce Oliveira",
    "invitationGroup": "Thaynara Oliveira",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "31",
    "name": "Flávia Alves",
    "invitationGroup": "Flávia Alves",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521965687471"
  },
  {
    "id": "32",
    "name": "Maria Luiza Alves",
    "invitationGroup": "Flávia Alves",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "33",
    "name": "Edna Santos",
    "invitationGroup": "Edna Santos",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522998172334"
  },
  {
    "id": "34",
    "name": "André Santos",
    "invitationGroup": "Edna Santos",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "35",
    "name": "Caio Santos",
    "invitationGroup": "Edna Santos",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "36",
    "name": "Pedro Santos",
    "invitationGroup": "Pedro Santos",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522988002786"
  },
  {
    "id": "37",
    "name": "Evelyn dos Santos",
    "invitationGroup": "Evelyn dos Santos",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522996073092"
  },
  {
    "id": "38",
    "name": "Felipe Santos",
    "invitationGroup": "Evelyn dos Santos",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "39",
    "name": "Andréa Almeida",
    "invitationGroup": "Andrea Almeida",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522997572446"
  },
  {
    "id": "40",
    "name": "Helena Santos",
    "invitationGroup": "Andrea Almeida",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "41",
    "name": "Elizama Almeida",
    "invitationGroup": "Andrea Almeida",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "42",
    "name": "André Luiz Pessanha",
    "invitationGroup": "Andrea Almeida",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "43",
    "name": "Jarlita Francisca",
    "invitationGroup": "Jarlita Francisca",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521997419504"
  },
  {
    "id": "44",
    "name": "Islãm Francisco",
    "invitationGroup": "Jarlita Francisca",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "45",
    "name": "Cirene dos Santos",
    "invitationGroup": "Cirene dos Santos",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522997386929"
  },
  {
    "id": "46",
    "name": "Fernanda Ribeiro",
    "invitationGroup": "Fernanda Ribeiro",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522999456121"
  },
  {
    "id": "47",
    "name": "Gabriela Ribeiro",
    "invitationGroup": "Fernanda Ribeiro",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "48",
    "name": "Sophia Ribeiro",
    "invitationGroup": "Fernanda Ribeiro",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "49",
    "name": "Tarraya Rabelo",
    "invitationGroup": "Fernanda Ribeiro",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "50",
    "name": "Júlio Ribeiro",
    "invitationGroup": "Fernanda Ribeiro",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "51",
    "name": "Geisiane da Silva",
    "invitationGroup": "Geisiane da Silva",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521999923810"
  },
  {
    "id": "52",
    "name": "Lúcio Gomes",
    "invitationGroup": "Geisiane da Silva",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "53",
    "name": "Renata Esteves",
    "invitationGroup": "Renata Esteves",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521970165808"
  },
  {
    "id": "54",
    "name": "Diogo Tavares",
    "invitationGroup": "Renata Esteves",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "63",
    "name": "Elis Esteves",
    "invitationGroup": "Renata Esteves",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "64",
    "name": "Delizete Monteiro",
    "invitationGroup": "Delizete Monteiro",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522998287976"
  },
  {
    "id": "65",
    "name": "Alex Alves",
    "invitationGroup": "Delizete Monteiro",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "66",
    "name": "Lívia Monteiro",
    "invitationGroup": "Delizete Monteiro",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "67",
    "name": "Marcela Alves",
    "invitationGroup": "Marcela Alves",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521964585613"
  },
  {
    "id": "68",
    "name": "Karine Costa",
    "invitationGroup": "Karine Costa",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521970220975"
  },
  {
    "id": "69",
    "name": "Maria Eduarda Costa",
    "invitationGroup": "Karine Costa",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "70",
    "name": "Enzo Costa",
    "invitationGroup": "Karine Costa",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "71",
    "name": "Andressa Souza",
    "invitationGroup": "Andressa Souza",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521976849166"
  },
  {
    "id": "72",
    "name": "Sandy Shawyen",
    "invitationGroup": "Andressa Souza",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "73",
    "name": "Rosangêla Souza",
    "invitationGroup": "Rosangêla Souza",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521969362731"
  },
  {
    "id": "74",
    "name": "Nivaldo Almeida",
    "invitationGroup": "Rosangêla Souza",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "75",
    "name": "Wancler Dias",
    "invitationGroup": "Wancler Dias",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521974065273"
  },
  {
    "id": "76",
    "name": "Elisana Dias",
    "invitationGroup": "Wancler Dias",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "77",
    "name": "Luzia Fátima",
    "invitationGroup": "Wancler Dias",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "78",
    "name": "Isaac Dias",
    "invitationGroup": "Wancler Dias",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "79",
    "name": "Késia Dias",
    "invitationGroup": "Wancler Dias",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "80",
    "name": "Rogéria Pacheco",
    "invitationGroup": "Rogéria Pacheco",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522999767258"
  },
  {
    "id": "81",
    "name": "Cristiano Pacheco",
    "invitationGroup": "Rogéria Pacheco",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "82",
    "name": "Pedro Pacheco",
    "invitationGroup": "Rogéria Pacheco",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "83",
    "name": "Thais Pereira",
    "invitationGroup": "Thaís Pereira",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521980584840"
  },
  {
    "id": "84",
    "name": "Pablo Silva",
    "invitationGroup": "Thaís Pereira",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "85",
    "name": "Carol Almeida",
    "invitationGroup": "Carol Almeida",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522988033021"
  },
  {
    "id": "86",
    "name": "Wesley Soares",
    "invitationGroup": "Carol Almeida",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "87",
    "name": "Melissa Alves",
    "invitationGroup": "Carol Almeida",
    "type": "Criança",
    "status": "Pendente"
  },
  {
    "id": "88",
    "name": "Jhenifer Florêncio",
    "invitationGroup": "Jhenifer Florêncio",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522998904638"
  },
  {
    "id": "89",
    "name": "Sandro Silva",
    "invitationGroup": "Sandro Silva",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522996106102"
  },
  {
    "id": "90",
    "name": "Nilce Serpa",
    "invitationGroup": "Nilce Serpa",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522988725851"
  },
  {
    "id": "91",
    "name": "Luiz Alves",
    "invitationGroup": "Nilce Serpa",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "92",
    "name": "Fernando Souza",
    "invitationGroup": "Fernando Souza",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522998546120"
  },
  {
    "id": "93",
    "name": "Luana Viana",
    "invitationGroup": "Fernando Souza",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "94",
    "name": "Luiza Viana",
    "invitationGroup": "Fernando Souza",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "95",
    "name": "Lucas Viana",
    "invitationGroup": "Fernando Souza",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "96",
    "name": "João Paulo",
    "invitationGroup": "João Paulo",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521969159593"
  },
  {
    "id": "97",
    "name": "Márcia Martins",
    "invitationGroup": "Márcia Martins",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521975939107"
  },
  {
    "id": "98",
    "name": "Paulo Santos",
    "invitationGroup": "Paulo Santos",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522988002538"
  },
  {
    "id": "99",
    "name": "Elisa Dias",
    "invitationGroup": "Matheus Santos",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5522999444844"
  },
  {
    "id": "100",
    "name": "Sérgio Sebastião",
    "invitationGroup": "Matheus Santos",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "101",
    "name": "Matheus Santos",
    "invitationGroup": "Matheus Santos",
    "type": "Adulto",
    "status": "Pendente"
  },
  {
    "id": "102",
    "name": "Carla Martins",
    "invitationGroup": "Carla Martins",
    "type": "Adulto",
    "status": "Pendente",
    "phone": "+5521991866563"
  }
];

// Persistência local do navegador: o site funciona sem servidor ou API.
// Cada navegador mantém suas próprias confirmações, mensagens e reservas.
const STORAGE_KEY = 'casamento-elisa-sergio-state-v1';

function createLocalId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readBrowserState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : {};
    return {
      gifts: Array.isArray(state.gifts) && state.gifts.length ? state.gifts : INITIAL_GIFTS.map(gift => ({ ...gift })),
      messages: Array.isArray(state.messages) ? state.messages : [],
      guests: Array.isArray(state.guests) && state.guests.length ? state.guests : INITIAL_GUESTS.map(guest => ({ ...guest }))
    };
  } catch (error) {
    console.warn('Não foi possível ler o armazenamento local; usando os dados iniciais.', error);
    return { gifts: INITIAL_GIFTS.map(gift => ({ ...gift })), messages: [], guests: INITIAL_GUESTS.map(guest => ({ ...guest })) };
  }
}

const WeddingStorage = {
  ...readBrowserState(),
  syncError: null,
  listeners: new Set(),

  persist() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ gifts: this.gifts, messages: this.messages, guests: this.guests }));
    } catch (error) {
      console.warn('Não foi possível salvar os dados neste navegador.', error);
    }
  },

  async sync() {
    const state = readBrowserState();
    this.gifts = state.gifts;
    this.messages = state.messages;
    this.guests = state.guests;
    this.syncError = null;
    this.notify();
    return this;
  },

  notify() {
    this.persist();
    this.listeners.forEach(listener => listener({ gifts: this.gifts, messages: this.messages, guests: this.guests }));
  },

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },

  getGuests() { return this.guests; },

  async saveRsvp(payload) {
    const name = String(payload.name || '').trim();
    const now = new Date().toISOString();
    const index = this.guests.findIndex(guest => String(guest.name).toLowerCase() === name.toLowerCase());
    const guest = index >= 0
      ? { ...this.guests[index], status: payload.status, email: payload.email || '', rsvpNotes: payload.rsvpNotes || '', updatedAt: now }
      : { id: createLocalId('guest'), name, invitationGroup: name, type: 'Adulto', email: payload.email || '', rsvpNotes: payload.rsvpNotes || '', status: payload.status, updatedAt: now };
    if (index >= 0) this.guests[index] = guest;
    else this.guests.push(guest);
    this.notify();
    return guest;
  },

  async saveGuests(guests) {
    this.guests = guests;
    this.notify();
  },

  getGifts() { return this.gifts; },
  saveGifts(gifts) { this.gifts = gifts; this.notify(); },
  getMessages() { return this.messages; },
  saveMessages(messages) { this.messages = messages; this.notify(); },

  async addMessage(messageObj) {
    const message = { ...messageObj, id: createLocalId('message'), createdAt: new Date().toISOString() };
    this.messages = [message, ...this.messages];
    this.notify();
    return message;
  },

  async createGiftIntent(payload) {
    const gift = this.gifts.find(item => item.id === payload.giftId);
    if (!gift) throw new Error('Presente não encontrado.');
    if (gift.reserved) throw new Error('Este presente já está reservado neste navegador.');
    const message = await this.addMessage({
      authorName: payload.authorName || 'Convidado',
      message: payload.message || 'Presente selecionado com muito carinho para os noivos.',
      source: 'gift',
      sourceLabel: `Presente: ${payload.giftTitle || gift.title}`,
      giftId: gift.id,
      giftTitle: payload.giftTitle || gift.title,
      giftPrice: Number(payload.giftPrice || gift.price) || 0,
      giftCategory: payload.giftCategory || gift.category,
      status: 'pendente'
    });
    const reservedGift = { ...gift, reserved: true, reservedByMessageId: message.id };
    this.gifts = this.gifts.map(item => item.id === gift.id ? reservedGift : item);
    this.notify();
    return { message, gift: reservedGift };
  },

  async deleteMessage(id) {
    const message = this.messages.find(item => item.id === id);
    this.messages = this.messages.filter(item => item.id !== id);
    if (message?.source === 'gift' && message.giftId) {
      this.gifts = this.gifts.map(gift => gift.id === message.giftId
        ? { ...gift, reserved: false, reservedByMessageId: undefined }
        : gift);
    }
    this.notify();
    return { ok: true };
  },

  formatCurrency(val) {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
};

window.addEventListener('storage', event => {
  if (event.key === STORAGE_KEY) WeddingStorage.sync();
});
