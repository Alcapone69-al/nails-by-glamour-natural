/* ==========================================================================
   CONFIGURAÇÃO DO SITE — Nails by Glamour Natural
   --------------------------------------------------------------------------
   Este é o ÚNICO ficheiro que precisa de editar para trocar números,
   serviços, preços, horários e imagens. Não é preciso mexer no resto do código.
   ========================================================================== */

/* 1) NÚMERO DE WHATSAPP
   Formato internacional, só dígitos, sem "+" nem espaços.
   Exemplo para Moçambique: "258841234567"
   Número retirado do Instagram oficial (@nails_byglamournatural).
   Se voltar a "258XXXXXXXXX", o site entra em MODO DEMONSTRAÇÃO. */
const WHATSAPP_NUMBER = "258847001353";

/* 2) DADOS DA MARCA */
const BUSINESS = {
  name: "Nails by Glamour Natural",
  instagramUrl: "https://www.instagram.com/nails_byglamournatural/",
  instagramHandle: "@nails_byglamournatural",
  phones: ["847001353", "871607779"],
  address: "Agostinho Neto, esquina com Karl Marx",
  city: "Maputo, Moçambique",
  // Horário oficial (Instagram). hoursIsDemo: false => sem etiqueta de demonstração.
  hours: [
    "Segunda a sexta · 09:00 – 21:00",
    "Sábado · 09:00 – 18:00"
  ],
  hoursIsDemo: false,
  walkIn: "Atendimento por ordem de chegada",
  currency: "MT"
};

/* 3) HORÁRIOS QUE A CLIENTE PODE ESCOLHER
   São horários DESEJADOS (a confirmação final é feita pelo WhatsApp). */
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
/* Ao sábado o atendimento termina às 18:00: último horário a pedir. Domingo fechado. */
const SATURDAY_LAST_SLOT = "17:00";
const CLOSED_WEEKDAYS = [0]; // 0 = domingo

/* 4) SERVIÇOS E PREÇOS (tabela oficial do Instagram, destaque "Preço")
   - id, name, description
   - price: número (sem moeda). null => "Sob consulta".
   - priceFrom: true => "desde 700 MT"
   - demo: true => mostra a etiqueta "demo" (não usada: preços reais). */
const SERVICES = [
  { id: "acrilicas", name: "Unhas acrílicas", description: "Com Gelish 850 MT · com pó colorido 800 MT.", price: 800, priceFrom: true },
  { id: "manut-acrilicas", name: "Manutenção de acrílicas", description: "Com Gelish 750 MT · com pó colorido 700 MT.", price: 700, priceFrom: true },
  { id: "overlay", name: "Overlay", description: "Com Gelish 750 MT · com pó colorido 700 MT.", price: 700, priceFrom: true },
  { id: "manut-overlay", name: "Manutenção de overlay", description: "Com Gelish 700 MT · com pó colorido 600 MT.", price: 600, priceFrom: true },
  { id: "gelish-maos", name: "Gelish nas mãos", description: "Cor e brilho em gel, com duração prolongada.", price: 400 },
  { id: "pedicure", name: "Pedicure", description: "Cuidado completo dos pés e das unhas.", price: 500 },
  { id: "gelish-pes", name: "Gelish nos pés", description: "Pintura em gel para pés bonitos por mais tempo.", price: 300 },
  { id: "unhas-pes", name: "Overlay e acrílico nos pés", description: "Overlay 700 MT · acrílico 800 MT. Unhas simples: 50 MT cada.", price: 700, priceFrom: true },
  { id: "francesinha", name: "Francesinha e base de vidro", description: "Francesinha 200 MT · base de vidro 200 MT.", price: 200 },
  { id: "degrade", name: "Degradé", description: "Efeito degradé suave e elegante.", price: 950 },
  { id: "nail-art", name: "Nail art", description: "Designs personalizados. O valor depende do desenho e do tamanho.", price: null },
  { id: "remocao", name: "Remoção", description: "Remoção de Gelish 100 MT · remoção de unhas 200 MT.", price: 100, priceFrom: true }
];

/* 5) GALERIA
   Para usar fotografias reais: ponha os ficheiros na pasta /images
   (ex.: images/trabalho-01.jpg) e troque o campo "src".
   category: "designs" | "manicure" | "closeup" | "premium"
   Fotografias reais de @nails_byglamournatural. */
const GALLERY_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "designs", label: "Nail designs" },
  { id: "manicure", label: "Manicure" },
  { id: "closeup", label: "Close-ups" },
  { id: "premium", label: "Trabalhos premium" }
];

const GALLERY = [
  { src: "images/foto-03.jpg", category: "manicure", alt: "Unhas quadradas em amarelo pastel" },
  { src: "images/foto-04.jpg", category: "designs",  alt: "Unhas com francesinha colorida e detalhes" },
  { src: "images/foto-05.jpg", category: "closeup",  alt: "Unhas longas em tom nude com acabamento brilhante" },
  { src: "images/foto-06.jpg", category: "designs",  alt: "Unhas finas com detalhes vermelhos delicados" },
  { src: "images/foto-07.jpg", category: "manicure", alt: "Unhas em rosa vivo, forma amêndoa" },
  { src: "images/foto-08.jpg", category: "premium",  alt: "Unhas em tom vinho com acabamento profissional" },
  { src: "images/foto-09.jpg", category: "manicure", alt: "Unhas curtas em azul claro, estilo clean" },
  { src: "images/foto-10.jpg", category: "closeup",  alt: "Unhas nude com acabamento minimalista" }
];
