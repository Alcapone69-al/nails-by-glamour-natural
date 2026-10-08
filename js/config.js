/* ==========================================================================
   CONFIGURAÇÃO DO SITE — Nails by Glamour Natural
   --------------------------------------------------------------------------
   Este é o ÚNICO ficheiro que precisa de editar para trocar números,
   serviços, preços, horários e imagens. Não é preciso mexer no resto do código.
   ========================================================================== */

/* 1) NÚMERO DE WHATSAPP
   Formato internacional, só dígitos, sem "+" nem espaços.
   Exemplo para Moçambique: "258841234567"
   Enquanto estiver "258XXXXXXXXX" o site funciona em MODO DEMONSTRAÇÃO:
   o WhatsApp abre com a mensagem pronta, mas sem destinatário definido. */
const WHATSAPP_NUMBER = "258XXXXXXXXX";

/* 2) DADOS DA MARCA */
const BUSINESS = {
  name: "Nails by Glamour Natural",
  instagramUrl: "https://www.instagram.com/nails_byglamournatural/",
  instagramHandle: "@nails_byglamournatural",
  // Horário de atendimento. Quando tiver o horário real, troque o texto
  // e ponha hoursIsDemo: false para remover a etiqueta "demonstração".
  hours: "Segunda a sábado · 09:00 – 18:00",
  hoursIsDemo: true,
  currency: "MT"
};

/* 3) HORÁRIOS QUE A CLIENTE PODE ESCOLHER
   São horários DESEJADOS (a confirmação final é feita pelo WhatsApp). */
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

/* 4) SERVIÇOS E PREÇOS
   - id:        identificador único (sem espaços)
   - name:      nome mostrado no cartão e enviado na mensagem
   - description: frase curta
   - duration:  duração estimada (texto livre)
   - price:     número (sem moeda). Use null para "sob consulta".
   - priceFrom: true => aparece "desde 200 MT"
   - demo:      true => mostra a etiqueta "demo". Ponha false (ou apague)
                quando o preço for o real.
*/
const SERVICES = [
  {
    id: "manicure",
    name: "Manicure",
    description: "Limpeza, forma e cuidado das cutículas, com acabamento à sua escolha.",
    duration: "45 min",
    price: 500,
    demo: true
  },
  {
    id: "gel",
    name: "Gel",
    description: "Esmaltagem em gel com brilho e cor que se mantêm por mais tempo.",
    duration: "60 min",
    price: 800,
    demo: true
  },
  {
    id: "gel-extension",
    name: "Gel Extension",
    description: "Alongamento em gel, com o comprimento e a forma que preferir.",
    duration: "2 h",
    price: 1500,
    demo: true
  },
  {
    id: "nail-art",
    name: "Nail Art",
    description: "Detalhes e designs personalizados para tornar as suas unhas únicas.",
    duration: "30 min+",
    price: 300,
    priceFrom: true,
    demo: true
  },
  {
    id: "pedicure",
    name: "Pedicure",
    description: "Cuidado completo dos pés e das unhas, com acabamento delicado.",
    duration: "60 min",
    price: 700,
    demo: true
  },
  {
    id: "manutencao",
    name: "Manutenção",
    description: "Reposição e retoque de um trabalho já feito, para manter tudo impecável.",
    duration: "75 min",
    price: 1000,
    demo: true
  }
];

/* 5) GALERIA
   Para usar fotografias reais: ponha os ficheiros na pasta /images
   (ex.: images/trabalho-01.jpg) e troque o campo "src".
   category: "designs" | "manicure" | "closeup" | "premium"
   Imagens atuais = ilustrações de DEMONSTRAÇÃO. */
const GALLERY_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "designs", label: "Nail designs" },
  { id: "manicure", label: "Manicure" },
  { id: "closeup", label: "Close-ups" },
  { id: "premium", label: "Trabalhos premium" }
];

const GALLERY = [
  { src: "images/gallery-1.svg", category: "designs",  alt: "Unhas com detalhes florais e pontos delicados" },
  { src: "images/gallery-2.svg", category: "manicure", alt: "Manicure em tom nude, acabamento limpo" },
  { src: "images/gallery-3.svg", category: "closeup",  alt: "Pormenor de unhas com francesinha" },
  { src: "images/gallery-4.svg", category: "premium",  alt: "Unhas em tom pérola com fio dourado fino" },
  { src: "images/gallery-5.svg", category: "designs",  alt: "Unhas em tons terrosos com pontos brancos" },
  { src: "images/gallery-6.svg", category: "manicure", alt: "Manicure em branco leitoso, unhas curtas" },
  { src: "images/gallery-7.svg", category: "closeup",  alt: "Close-up de uma unha amêndoa com brilho" },
  { src: "images/gallery-8.svg", category: "premium",  alt: "Unhas em tom vinho suave com detalhe dourado" }
];
