/* ==========================================================================
   Nails by Glamour Natural — lógica do site
   Depende de js/config.js (WHATSAPP_NUMBER, BUSINESS, TIME_SLOTS, SERVICES, GALLERY).
   Sem backend: o pedido de agendamento é enviado por link do WhatsApp.
   ========================================================================== */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- WhatsApp ---------- */
  const waDigits = String(WHATSAPP_NUMBER).replace(/\D/g, '');
  const waConfigured = !/x/i.test(WHATSAPP_NUMBER) && /^\d{9,15}$/.test(waDigits);

  function waLink(text) {
    const base = waConfigured ? `https://wa.me/${waDigits}` : 'https://wa.me/';
    return `${base}?text=${encodeURIComponent(text)}`;
  }

  /* ---------- Utilitários ---------- */
  const pad = (n) => String(n).padStart(2, '0');
  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  // Converte "2026-10-10" em "sexta-feira, 10 de outubro de 2026" sem deslocamento de fuso horário.
  function formatDate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  }
  function formatPrice(s) {
    if (s.price == null) return { prefix: '', value: 'Sob consulta' };
    return { prefix: s.priceFrom ? 'desde ' : '', value: `${s.price.toLocaleString('pt-PT')} ${BUSINESS.currency}` };
  }
  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (v !== undefined && v !== null) node.setAttribute(k, v);
    });
    [].concat(children).forEach((c) => c && node.append(c));
    return node;
  };

  /* ---------- Serviços ---------- */
  function renderServices() {
    const grid = $('#services-grid');
    grid.replaceChildren();
    SERVICES.forEach((s) => {
      const price = formatPrice(s);
      const priceEl = el('span', { class: 'service-price' }, [
        price.prefix ? el('small', { text: price.prefix }) : null,
        document.createTextNode(price.value),
        s.demo ? el('span', { class: 'demo-tag', text: 'demo' }) : null
      ]);
      const btn = el('button', { type: 'button', class: 'btn btn-dark', 'data-service': s.id, 'aria-label': `Agendar ${s.name}`, text: 'Agendar' });
      const card = el('article', { class: 'service-card reveal' }, [
        el('h3', { text: s.name }),
        el('p', { text: s.description }),
        el('div', { class: 'service-meta' }, [s.duration ? el('span', { class: 'service-duration', text: `⏱ ${s.duration}` }) : el('span'), priceEl]),
        btn
      ]);
      grid.append(card);
    });
  }

  /* ---------- Galeria ---------- */
  function renderGallery() {
    const grid = $('#gallery-grid');
    const filters = $('#gallery-filters');
    const labelOf = (id) => (GALLERY_CATEGORIES.find((c) => c.id === id) || {}).label || '';

    GALLERY.forEach((g) => {
      const img = el('img', { src: g.src, alt: g.alt, width: 600, height: 750, loading: 'lazy' });
      const fig = el('figure', { class: 'gallery-item reveal', 'data-category': g.category }, [
        el('div', { class: 'gallery-frame' }, img),
        el('figcaption', { text: labelOf(g.category) })
      ]);
      grid.append(fig);
    });

    GALLERY_CATEGORIES.forEach((c, i) => {
      const b = el('button', { type: 'button', class: 'filter-btn', 'data-filter': c.id, 'aria-pressed': i === 0 ? 'true' : 'false', text: c.label });
      filters.append(b);
    });
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('.filter-btn');
      if (!b) return;
      $$('.filter-btn', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const f = b.dataset.filter;
      $$('.gallery-item', grid).forEach((item) => item.classList.toggle('is-hidden', f !== 'all' && item.dataset.category !== f));
    });
  }

  /* ---------- Rodapé e botão flutuante ---------- */
  function setupContacts() {
    const generic = `Olá! Gostaria de mais informações sobre os serviços da ${BUSINESS.name}.`;
    $('#wa-float').href = waLink(generic);
    const footerWa = $('#footer-whatsapp');
    footerWa.href = waLink(generic);
    if (!waConfigured) $('#footer-wa-note').textContent = '(número de demonstração)';
    const hours = $('#footer-hours');
    hours.replaceChildren();
    [].concat(BUSINESS.hours).forEach((h, i) => {
      if (i) hours.append(document.createElement('br'));
      hours.append(document.createTextNode(h));
    });
    if (BUSINESS.hoursIsDemo) hours.append(' ', el('span', { class: 'demo-tag', text: 'demonstração' }));
    if (BUSINESS.walkIn) hours.append(document.createElement('br'), el('span', { class: 'footer-muted', text: BUSINESS.walkIn }));
    const phones = $('#footer-phones');
    if (phones) BUSINESS.phones.forEach((p, i) => {
      if (i) phones.append(' · ');
      phones.append(el('a', { href: `tel:+258${p}`, text: p }));
    });
    const addr = $('#footer-address');
    if (addr) addr.textContent = `${BUSINESS.address}, ${BUSINESS.city}`;
    $('#year').textContent = new Date().getFullYear();
  }

  /* ---------- Menu mobile ---------- */
  function setupMenu() {
    const toggle = $('#menu-toggle');
    const nav = $('#main-nav');
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); } });
  }

  /* ---------- Agendamento ---------- */
  function setupBooking() {
    const dialog = $('#booking');
    const form = $('#booking-form');
    const summary = $('#booking-summary');
    const stepLabel = $('#booking-step-label');
    const fService = $('#f-service');
    const fDate = $('#f-date');
    const fName = $('#f-name');
    const fNote = $('#f-note');
    const slots = $('#slots');
    const errors = {
      service: $('#err-service'), date: $('#err-date'), time: $('#err-time'), name: $('#err-name')
    };
    let lastMessage = '';

    // Opções do serviço
    fService.append(el('option', { value: '', text: 'Escolha um serviço' }));
    SERVICES.forEach((s) => fService.append(el('option', { value: s.id, text: s.name })));

    // Horários
    TIME_SLOTS.forEach((t) => {
      const input = el('input', { type: 'radio', name: 'time', value: t, id: `slot-${t.replace(':', '')}` });
      const label = el('label', { class: 'slot', for: input.id }, [input, el('span', { text: t })]);
      slots.append(label);
    });

    fDate.min = todayISO();

    function weekdayOf(iso) {
      const [y, m, d] = iso.split('-').map(Number);
      return new Date(y, m - 1, d).getDay();
    }
    // Ao sábado o salão fecha às 18:00: desativa os horários mais tardios.
    function refreshSlots() {
      const sat = fDate.value && weekdayOf(fDate.value) === 6;
      $$('input', slots).forEach((inp) => {
        const off = sat && inp.value > SATURDAY_LAST_SLOT;
        inp.disabled = off;
        inp.closest('label').classList.toggle('is-disabled', off);
        if (off && inp.checked) inp.checked = false;
      });
    }

    function showStep(n) {
      form.hidden = n !== 1;
      summary.hidden = n !== 2;
      stepLabel.textContent = `Passo ${n} de 2`;
      dialog.scrollTo({ top: 0 });
    }

    function open(serviceId) {
      if (serviceId) fService.value = serviceId;
      fDate.min = todayISO();
      showStep(1);
      clearErrors();
      $('#copy-feedback').textContent = '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      document.body.classList.add('modal-open');
    }
    function close() {
      if (dialog.open) dialog.close();
    }
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
    // Fechar ao clicar no fundo escurecido
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
    $('#booking-close').addEventListener('click', close);

    // Abrir pelos botões gerais e pelos cartões de serviço
    document.addEventListener('click', (e) => {
      const generic = e.target.closest('[data-open-booking]');
      if (generic) { open(); return; }
      const svc = e.target.closest('[data-service]');
      if (svc) open(svc.dataset.service);
    });

    /* Validação */
    function clearErrors() {
      Object.values(errors).forEach((p) => (p.textContent = ''));
      [fService, fDate, fName].forEach((f) => f.removeAttribute('aria-invalid'));
    }
    function setError(key, input, message) {
      errors[key].textContent = message;
      if (input) input.setAttribute('aria-invalid', 'true');
    }
    function selectedTime() {
      const c = form.querySelector('input[name="time"]:checked');
      return c ? c.value : '';
    }
    function validate() {
      clearErrors();
      const problems = [];
      if (!fService.value) problems.push(['service', fService, 'Escolha um serviço.']);
      if (!fDate.value) problems.push(['date', fDate, 'Escolha a data desejada.']);
      else if (fDate.value < todayISO()) problems.push(['date', fDate, 'Escolha uma data a partir de hoje.']);
      else if (CLOSED_WEEKDAYS.includes(weekdayOf(fDate.value))) problems.push(['date', fDate, 'Ao domingo não há atendimento. Escolha outro dia.']);
      if (!selectedTime()) problems.push(['time', slots.querySelector('input:not(:disabled)'), 'Escolha um horário.']);
      if (fName.value.trim().length < 2) problems.push(['name', fName, 'Escreva o seu nome.']);
      problems.forEach(([key, input, msg]) => setError(key, key === 'time' ? null : input, msg));
      if (problems.length) problems[0][1].focus();
      return problems.length === 0;
    }
    // Limpar o erro de um campo ao corrigi-lo
    fService.addEventListener('change', () => { errors.service.textContent = ''; fService.removeAttribute('aria-invalid'); });
    fDate.addEventListener('change', () => { errors.date.textContent = ''; fDate.removeAttribute('aria-invalid'); refreshSlots(); });
    fName.addEventListener('input', () => { errors.name.textContent = ''; fName.removeAttribute('aria-invalid'); });
    slots.addEventListener('change', () => { errors.time.textContent = ''; });

    /* Mensagem para o WhatsApp */
    function buildMessage(data) {
      return [
        `Olá! Gostaria de solicitar um agendamento na ${BUSINESS.name}.`,
        '',
        `Serviço: ${data.service}`,
        `Data: ${data.date}`,
        `Horário: ${data.time}`,
        `Nome: ${data.name}`,
        `Observação: ${data.note || 'Nenhuma'}`,
        '',
        'Aguardo a confirmação. Obrigada!'
      ].join('\n');
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      const service = SERVICES.find((s) => s.id === fService.value);
      const data = {
        service: service.name,
        date: formatDate(fDate.value),
        time: selectedTime(),
        name: fName.value.trim(),
        note: fNote.value.trim()
      };

      $('#s-service').textContent = data.service;
      $('#s-date').textContent = data.date;
      $('#s-time').textContent = data.time;
      $('#s-name').textContent = data.name;
      $('#s-note').textContent = data.note;
      $('#s-note-row').hidden = !data.note;
      $('#s-demo-note').hidden = waConfigured;

      lastMessage = buildMessage(data);
      $('#confirm-wa').href = waLink(lastMessage);
      $('#copy-feedback').textContent = '';
      showStep(2);
      $('#confirm-wa').focus({ preventScroll: true });
    });

    $('#edit-request').addEventListener('click', () => { showStep(1); fService.focus(); });

    $('#copy-message').addEventListener('click', async () => {
      const fb = $('#copy-feedback');
      try {
        await navigator.clipboard.writeText(lastMessage);
        fb.textContent = 'Mensagem copiada.';
      } catch {
        fb.textContent = 'Não foi possível copiar automaticamente.';
      }
    });
  }

  /* ---------- Animação ao rolar ---------- */
  function setupReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((i) => io.observe(i));
  }

  /* ---------- Início ---------- */
  renderServices();
  renderGallery();
  setupContacts();
  setupMenu();
  setupBooking();
  setupReveal();
})();
