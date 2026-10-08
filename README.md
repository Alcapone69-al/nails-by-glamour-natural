# Nails by Glamour Natural — site de demonstração

Site de uma página (HTML, CSS e JavaScript puro) onde a cliente vê os serviços e preços e envia um **pedido de agendamento** pelo WhatsApp, com a mensagem já escrita.

- Sem backend, sem base de dados, sem dependências, sem custos.
- Funciona no GitHub Pages tal como está.
- Pensado primeiro para telemóvel.

> **Importante:** o site faz uma *solicitação* de agendamento. Não verifica disponibilidade nem marca nada sozinho. A marcação só fica confirmada quando a proprietária responde no WhatsApp.

---

## Estrutura

```
nails-by-glamour-natural/
├── index.html          ← estrutura e textos (Sobre, Como funciona, etc.)
├── css/styles.css      ← aparência (cores no topo, em :root)
├── js/
│   ├── config.js       ← ★ número de WhatsApp, serviços, preços, horários, galeria
│   └── app.js          ← lógica (não precisa de editar)
├── images/             ← imagens (ilustrações de demonstração, em SVG)
│   ├── hero.svg, about.svg, gallery-1…8.svg
│   ├── favicon.svg, apple-touch-icon.png
│   └── og-image.png    ← imagem de pré-visualização nas redes sociais
└── README.md
```

**Quase tudo o que se altera está em `js/config.js`.**

---

## Como executar localmente

**Opção 1 (mais simples):** abra o ficheiro `index.html` com duplo clique. Funciona diretamente no navegador.

**Opção 2 (servidor local):** na pasta do projeto, execute

```bash
python3 -m http.server 8000
```

e abra <http://localhost:8000>.

> As fontes (Cormorant Garamond e DM Sans) vêm do Google Fonts e precisam de internet. Sem internet o site usa fontes de reserva parecidas e continua a funcionar.

---

## Como alterar o número de WhatsApp

Abra `js/config.js` e mude a **única** variável no topo:

```js
const WHATSAPP_NUMBER = "258841234567";
```

- Formato internacional, só dígitos, sem `+` nem espaços (Moçambique começa por `258`).
- Esse número é usado em todos os botões: o pedido de agendamento, o botão flutuante e o rodapé.
- Enquanto o valor for `"258XXXXXXXXX"`, o site está em **modo demonstração**: o WhatsApp abre com a mensagem pronta, mas sem destinatário (a pessoa escolhe o contacto). O resumo mostra um aviso a explicar isto, que desaparece sozinho quando o número é real.

---

## Como alterar os serviços

Em `js/config.js`, na lista `SERVICES`. Cada serviço é um bloco:

```js
{
  id: "gel",                  // identificador único, sem espaços
  name: "Gel",                // nome mostrado e enviado na mensagem
  description: "Esmaltagem em gel com brilho…",
  duration: "60 min",
  price: 800,
  demo: true
}
```

- **Adicionar:** copie um bloco, cole-o dentro da lista (não esqueça a vírgula entre blocos) e mude os dados. O cartão e a opção do formulário aparecem automaticamente.
- **Remover:** apague o bloco inteiro.
- **Reordenar:** mude a ordem dos blocos.

## Como alterar os preços

No mesmo bloco, mude o campo `price` (só o número; a moeda está em `BUSINESS.currency`, por defeito `MT`).

- `priceFrom: true` mostra "desde 300 MT".
- `price: null` mostra "Sob consulta".
- **Retirar a etiqueta "demo":** ponha `demo: false` (ou apague a linha) quando o preço for real. Apague também os avisos "Preços… de demonstração" em `index.html` (procure por `section-note`).

## Horários e dados da marca

Em `js/config.js`:

- `TIME_SLOTS` — horas que a cliente pode escolher no formulário.
- `BUSINESS.hours` — horário de atendimento mostrado no rodapé. Ponha `hoursIsDemo: false` quando for o horário real.
- `BUSINESS.instagramUrl` — ligação do Instagram.

## Como alterar as imagens

1. Copie as fotografias para a pasta `images/` (por exemplo `images/trabalho-01.jpg`).
2. **Galeria:** em `js/config.js`, na lista `GALLERY`, troque o `src` e o `alt` (descrição para leitores de ecrã) de cada item. A `category` pode ser `designs`, `manicure`, `closeup` ou `premium`.
3. **Imagem principal:** em `index.html`, procure `images/hero.svg` e troque pelo novo ficheiro. Faça o mesmo para `images/about.svg` na secção "Sobre".
4. **Pré-visualização nas redes sociais:** substitua `images/og-image.png` por uma imagem de **1200×630 px**.

Dicas para as fotografias reais:

- Formato vertical 4:5 funciona melhor (o site recorta automaticamente para esse formato).
- Reduza o tamanho antes de enviar: JPG ou WebP, largura entre 800 e 1200 px, idealmente abaixo de 200 KB cada. Ferramentas gratuitas: [squoosh.app](https://squoosh.app).
- Escreva sempre um `alt` curto e descritivo.

## Textos (Sobre, frases)

Os textos fixos estão em `index.html`. Procure por `Sobre a Nails by Glamour Natural` e substitua o parágrafo provisório pelo texto real da proprietária. Remova a etiqueta `<span class="demo-tag">Demo</span>` quando o texto for definitivo.

## Cores

No topo de `css/styles.css`, no bloco `:root`, estão todas as cores (`--ivory`, `--sand`, `--nude`, `--clay`, `--cocoa`…). Alterar ali muda o site inteiro.

---

## Como publicar no GitHub Pages

1. Crie uma conta em <https://github.com> (gratuita).
2. Clique em **New repository**, dê um nome (por exemplo `nails-by-glamour-natural`), deixe **Public** e crie.
3. Envie os ficheiros:
   - **Pelo site:** em **Add file → Upload files**, arraste **o conteúdo da pasta** (`index.html`, `css`, `js`, `images`, `README.md`) e faça **Commit changes**; ou
   - **Pelo terminal:**
     ```bash
     cd nails-by-glamour-natural
     git init
     git add .
     git commit -m "Site de demonstração"
     git branch -M main
     git remote add origin https://github.com/SEU-UTILIZADOR/nails-by-glamour-natural.git
     git push -u origin main
     ```
4. No repositório, vá a **Settings → Pages**.
5. Em **Build and deployment → Source**, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)**, e clique **Save**.
6. Ao fim de 1 a 2 minutos o site fica em  
   `https://SEU-UTILIZADOR.github.io/nails-by-glamour-natural/`

Todos os caminhos do projeto são relativos, por isso funcionam num endereço com subpasta como este.

### Depois de publicar: pré-visualização nas redes sociais

Para a imagem aparecer quando o link é partilhado (WhatsApp, Facebook…), as redes exigem o endereço completo. Em `index.html`, troque

```html
<meta property="og:image" content="images/og-image.png">
```

por

```html
<meta property="og:image" content="https://SEU-UTILIZADOR.github.io/nails-by-glamour-natural/images/og-image.png">
```

Pode também acrescentar `<meta property="og:url" content="https://…">` com o endereço do site.

---

## Acessibilidade e SEO

- HTML semântico (`header`, `main`, `section`, `footer`, `nav`), link "Saltar para o conteúdo" e foco visível em todos os controlos.
- A janela de agendamento usa `<dialog>` nativo: o foco fica dentro dela e a tecla Esc fecha.
- Contrastes de texto e botões verificados para WCAG AA.
- Respeita a preferência "reduzir movimento" do sistema.
- `title`, `meta description`, Open Graph, favicon e ícone para iPhone incluídos.

## Fluxo testado

Serviço → Data → Horário → Nome → Resumo → WhatsApp:

- O formulário não avança sem serviço, data (de hoje em diante), horário e nome.
- O resumo mostra "Seu pedido de agendamento" e o botão **Confirmar pelo WhatsApp** abre o WhatsApp com esta mensagem:

```
Olá! Gostaria de solicitar um agendamento na Nails by Glamour Natural.

Serviço: …
Data: …
Horário: …
Nome: …
Observação: …

Aguardo a confirmação. Obrigada!
```

Se o WhatsApp não abrir (por exemplo num computador sem a aplicação), há o botão **Copiar mensagem**.
