// Lógica Principal do Convite em JavaScript Puro (Vanilla JS)

let currentGiftsCategory = 'Todas';
let isGiftsOpen = false;
let selectedGiftItem = null;
let activeLocation = 'ceremony';

// Dados dos Locais
const LOCATIONS = {
  ceremony: {
    title: 'Cerimônia Religiosa & Votos',
    subtitle: 'O momento do Sim à beira-mar',
    time: '16h00',
    placeName: 'Praia do Sol',
    address: 'R. Três - Boqueirão',
    cityStateZip: 'São Pedro da Aldeia - RJ, 28940-000, Brasil',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Praia do Sol, R. Três - Boqueirão, São Pedro da Aldeia - RJ, 28940-000, Brasil'),
    wazeUrl: 'https://waze.com/ul?q=' + encodeURIComponent('Praia do Sol, R. Três, São Pedro da Aldeia RJ'),
    embedUrl: 'https://maps.google.com/maps?q=' + encodeURIComponent('Praia do Sol, R. Três, Boqueirão, São Pedro da Aldeia - RJ') + '&t=&z=15&ie=UTF8&iwloc=&output=embed',
    description: 'A cerimônia acontecerá ao ar livre, com a brisa do mar e a luz suave do entardecer. Recomendamos a chegada com 15 minutos de antecedência.'
  },
  reception: {
    title: 'Recepção & Celebração',
    subtitle: 'Brinde, banquete e festa',
    time: '19h00',
    placeName: 'Casa Rústica',
    address: 'Av. Copacabana, 166 - Praia Linda',
    cityStateZip: 'São Pedro da Aldeia - RJ, 28940-000, Brasil',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Casa Rústica, Av. Copacabana, 166 - Praia Linda, São Pedro da Aldeia - RJ, 28940-000, Brasil'),
    wazeUrl: 'https://waze.com/ul?q=' + encodeURIComponent('Casa Rústica, Av. Copacabana, 166, Praia Linda, São Pedro da Aldeia RJ'),
    embedUrl: 'https://maps.google.com/maps?q=' + encodeURIComponent('Casa Rústica, Av. Copacabana 166, Praia Linda, São Pedro da Aldeia - RJ') + '&t=&z=15&ie=UTF8&iwloc=&output=embed',
    description: 'Após os votos, vamos comemorar juntos em um ambiente acolhedor, com boa música, gastronomia e muita dança!'
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  // Inicializa ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Roteamento inteligente para /convidados e /mensagens
  handleDirectRoutes();

  // Inicia o contador
  startCountdown();

  // Renderiza locais
  renderLocationCard();

  try {
    await WeddingStorage.sync();
    WeddingStorage.subscribe(() => {
      if (isGiftsOpen) renderGiftsGrid();
    });
  } catch (error) {
    console.error(error);
    alert('Não foi possível conectar ao servidor compartilhado.');
  }

  // Mobile menu button
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMobileMenu);
  }
});

// Suporte para rotas no GitHub Pages e caminhos locais
function handleDirectRoutes() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.endsWith('/convidados') || hash === '#/convidados' || hash === '#convidados' || search.includes('p=convidados')) {
    window.location.replace('./convidados.html');
  } else if (path.endsWith('/mensagens') || hash === '#/mensagens' || hash === '#mensagens' || search.includes('p=mensagens')) {
    window.location.replace('./mensagens.html');
  }
}

// Menu Mobile
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Contagem Regressiva
function startCountdown() {
  const targetDate = new Date('2026-11-14T16:00:00-03:00').getTime();
  const container = document.getElementById('countdown-timer');
  if (!container) return;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      container.innerHTML = '<div class="text-sm font-semibold text-[#3D4C47]">O grande dia chegou!</div>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const items = [
      { val: days, label: 'Dias' },
      { val: hours, label: 'Horas' },
      { val: minutes, label: 'Min' },
      { val: seconds, label: 'Seg' }
    ];

    container.innerHTML = items.map(it => `
      <div class="flex flex-col items-center justify-center w-16 sm:w-20 py-2 sm:py-3 rounded-2xl bg-white/95 border border-[#EADBCA] shadow-sm">
        <span class="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2A3430]">
          ${String(it.val).padStart(2, '0')}
        </span>
        <span class="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8A7864] font-medium mt-0.5">
          ${it.label}
        </span>
      </div>
    `).join('');
  }

  update();
  setInterval(update, 1000);
}

// Troca de Abas dos Locais
function switchLocationTab(tab) {
  activeLocation = tab;
  const btnCeremony = document.getElementById('tab-btn-ceremony');
  const btnReception = document.getElementById('tab-btn-reception');

  if (tab === 'ceremony') {
    btnCeremony.className = "flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-sans-clean font-medium transition-all duration-300 bg-[#404F4A] text-[#FAF8F5] shadow-md";
    btnReception.className = "flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-sans-clean font-medium transition-all duration-300 text-[#5C6763] hover:text-[#2C3437]";
  } else {
    btnCeremony.className = "flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-sans-clean font-medium transition-all duration-300 text-[#5C6763] hover:text-[#2C3437]";
    btnReception.className = "flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-sans-clean font-medium transition-all duration-300 bg-[#404F4A] text-[#FAF8F5] shadow-md";
  }

  renderLocationCard();
}

function renderLocationCard() {
  const container = document.getElementById('location-card');
  if (!container) return;

  const loc = LOCATIONS[activeLocation];

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-6 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#E3D4C0] text-[#866946] text-xs font-semibold">
          <i data-lucide="clock" class="w-3.5 h-3.5"></i>
          <span>Horário: ${loc.time}</span>
        </div>

        <h3 class="font-serif-luxury text-2xl sm:text-3xl text-[#2A3430] font-bold">
          ${loc.title}
        </h3>
        <p class="text-xs sm:text-sm text-[#A67C52] font-medium font-sans-clean">
          ${loc.subtitle}
        </p>

        <p class="text-xs sm:text-sm text-[#5B6B67] leading-relaxed font-sans-clean">
          ${loc.description}
        </p>

        <!-- Endereço e Copiar -->
        <div class="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E9DFD0] space-y-2">
          <div class="flex items-start gap-3">
            <i data-lucide="map-pin" class="w-4 h-4 text-[#8C6F4E] mt-0.5 shrink-0"></i>
            <div>
              <p class="text-xs sm:text-sm font-bold text-[#2A3430]">${loc.placeName}</p>
              <p class="text-xs text-[#5E6D69]">${loc.address}</p>
              <p class="text-[11px] text-[#7A8A85]">${loc.cityStateZip}</p>
            </div>
          </div>

          <div class="pt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onclick="copyLocationAddress('${loc.address}, ${loc.cityStateZip}')"
              class="px-3 py-1.5 rounded-lg border border-[#D5C7B2] bg-white hover:bg-[#FAF5ED] text-xs font-medium text-[#46392B] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span id="copy-addr-label">Copiar Endereço</span>
            </button>
          </div>
        </div>

        <!-- Botões de Rotas (Google Maps e Waze) -->
        <div class="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="${loc.googleMapsUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3D4C47] hover:bg-[#2A3733] text-white text-xs sm:text-sm font-medium transition-all shadow-sm"
          >
            <i data-lucide="external-link" class="w-4 h-4"></i>
            <span>Abrir no Google Maps</span>
          </a>

          <a
            href="${loc.wazeUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF5EB] hover:bg-[#F2E8D8] border border-[#D8C7B0] text-[#473B2E] text-xs sm:text-sm font-medium transition-all shadow-xs"
          >
            <i data-lucide="navigation" class="w-4 h-4 text-[#8C6D4A]"></i>
            <span>Traçar Rota no Waze</span>
          </a>
        </div>
      </div>

      <!-- Mapa Iframe Interativo -->
      <div class="lg:col-span-6">
        <div class="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border-2 border-[#E7D6BD] shadow-inner bg-[#EFE9DF]">
          <iframe
            src="${loc.embedUrl}"
            width="100%"
            height="100%"
            style="border: 0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function copyLocationAddress(fullAddress) {
  navigator.clipboard.writeText(fullAddress);
  const label = document.getElementById('copy-addr-label');
  if (label) {
    label.innerText = 'Copiado!';
    setTimeout(() => {
      label.innerText = 'Copiar Endereço';
    }, 2500);
  }
}

// RSVP
function handleRsvpNameInput(val) {
  const suggestionsBox = document.getElementById('rsvp-suggestions');
  if (!suggestionsBox) return;

  if (!val || val.trim().length < 2) {
    suggestionsBox.classList.add('hidden');
    return;
  }

  const allGuests = WeddingStorage.getGuests();
  const term = val.toLowerCase();
  const matched = allGuests.filter(g => g.name.toLowerCase().includes(term)).slice(0, 5);

  if (matched.length === 0) {
    suggestionsBox.classList.add('hidden');
    return;
  }

  suggestionsBox.innerHTML = matched.map(g => `
    <button
      type="button"
      onclick="selectRsvpGuest('${g.name}', '${g.id}')"
      class="w-full text-left px-4 py-2.5 hover:bg-[#F6EFE5] transition-colors flex items-center justify-between text-xs"
    >
      <span class="font-medium text-[#2C3437]">${g.name}</span>
      <span class="text-[10px] text-[#866D52] bg-[#FAF5EB] px-2 py-0.5 rounded-full border border-[#E3D3BE]">
        ${g.invitationGroup} (${g.type})
      </span>
    </button>
  `).join('');

  suggestionsBox.classList.remove('hidden');
}

function selectRsvpGuest(name, id) {
  const input = document.getElementById('rsvp-name');
  if (input) input.value = name;
  const suggestionsBox = document.getElementById('rsvp-suggestions');
  if (suggestionsBox) suggestionsBox.classList.add('hidden');
}

async function submitRsvp(e) {
  e.preventDefault();
  const nameInput = document.getElementById('rsvp-name');
  const emailInput = document.getElementById('rsvp-email');
  const msgInput = document.getElementById('rsvp-message');
  const attendingVal = document.querySelector('input[name="rsvp-attending"]:checked').value;
  const errorBox = document.getElementById('rsvp-error');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const personalMsg = msgInput ? msgInput.value.trim() : '';

  if (!name) {
    errorBox.innerText = 'Por favor, informe seu nome completo.';
    errorBox.classList.remove('hidden');
    return;
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    errorBox.innerText = 'Por favor, insira um e-mail válido.';
    errorBox.classList.remove('hidden');
    return;
  }

  errorBox.classList.add('hidden');

  // Atualiza no localStorage
  const guests = WeddingStorage.getGuests();
  const isAttending = attendingVal === 'yes';
  const status = isAttending ? 'Confirmado' : 'Ausente';

  const existingGuest = guests.find(g => g.name.toLowerCase() === name.toLowerCase());
  if (existingGuest) {
    existingGuest.status = status;
    existingGuest.email = email;
    existingGuest.rsvpNotes = personalMsg || undefined;
    existingGuest.updatedAt = new Date().toISOString();
  } else {
    guests.push({
      id: String(Date.now()),
      name: name,
      invitationGroup: name,
      type: 'Adulto',
      email: email,
      status: status,
      rsvpNotes: personalMsg || undefined,
      updatedAt: new Date().toISOString()
    });
  }
  WeddingStorage.saveGuests(guests);

  // Registra mensagem se preenchida
  if (personalMsg) {
    await WeddingStorage.addMessage({
      authorName: name,
      authorEmail: email,
      message: personalMsg,
      source: 'rsvp',
      sourceLabel: isAttending ? 'Confirmação de Presença' : 'Votos de Felicidade',
      status: 'pendente'
    });
  }

  // Sucesso na tela
  document.getElementById('rsvp-form').classList.add('hidden');
  const successBox = document.getElementById('rsvp-success-box');
  successBox.classList.remove('hidden');

  const successMsg = document.getElementById('rsvp-success-msg');
  if (successMsg) {
    successMsg.innerHTML = isAttending
      ? `Que alegria ter você conosco, <strong>${name}</strong>! Enviamos a confirmação e lembretes para <strong>${email}</strong>.`
      : `Sentiremos sua falta, <strong>${name}</strong>! Agradecemos imensamente pelo seu carinho e mensagem de votos aos noivos.`;
  }

  if (window.lucide) window.lucide.createIcons();
}

function resetRsvpForm() {
  document.getElementById('rsvp-form').reset();
  document.getElementById('rsvp-form').classList.remove('hidden');
  document.getElementById('rsvp-success-box').classList.add('hidden');
}

// CATÁLOGO DE PRESENTES
function toggleGiftsCatalog() {
  isGiftsOpen = !isGiftsOpen;
  const container = document.getElementById('gifts-catalog-container');
  const label = document.getElementById('gifts-toggle-label');
  const icon = document.getElementById('gifts-toggle-icon');

  if (isGiftsOpen) {
    container.classList.remove('hidden');
    label.innerText = 'Ocultar Lista de Presentes';
    if (icon) icon.classList.add('rotate-180');
    renderGiftsGrid();
  } else {
    container.classList.add('hidden');
    label.innerText = 'Abrir Lista de Presentes';
    if (icon) icon.classList.remove('rotate-180');
  }

  if (window.lucide) window.lucide.createIcons();
}

function openGiftsCatalog() {
  if (!isGiftsOpen) {
    toggleGiftsCatalog();
  }
}

function filterGiftsCategory(cat) {
  currentGiftsCategory = cat;

  // Atualiza estilo dos botões
  const buttons = document.querySelectorAll('.cat-pill');
  buttons.forEach(btn => {
    if (btn.innerText.trim() === cat) {
      btn.className = "cat-pill px-4 py-2 rounded-full border border-[#D5C7B2] bg-[#3D4C47] text-white font-semibold shadow-xs cursor-pointer";
    } else {
      btn.className = "cat-pill px-4 py-2 rounded-full border border-[#D5C7B2] bg-white text-[#56493A] hover:bg-[#FAF6F0] font-medium shadow-xs cursor-pointer";
    }
  });

  renderGiftsGrid();
}

function renderGiftsGrid() {
  const grid = document.getElementById('gifts-grid');
  if (!grid) return;

  const searchInput = document.getElementById('gift-search-input');
  const term = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const gifts = WeddingStorage.getGifts();

  const filtered = gifts.filter(g => {
    const matchCat = currentGiftsCategory === 'Todas' || g.category === currentGiftsCategory;
    const matchTerm = !term || g.title.toLowerCase().includes(term) || (g.description && g.description.toLowerCase().includes(term));
    return matchCat && matchTerm;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-3xl border border-[#E9DFD0] p-8">
        <i data-lucide="gift" class="w-10 h-10 text-[#C4B29B] mx-auto mb-2"></i>
        <p class="text-sm font-semibold text-[#3D4C47]">Nenhum presente encontrado nesta categoria.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="group bg-white rounded-3xl border-2 ${item.reserved ? 'border-amber-200' : 'border-[#E9DFD0]'} overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      <div>
        <div class="relative w-full h-44 overflow-hidden bg-[#FAF6F0]">
          <img
            src="${item.imageUrl}"
            alt="${item.title}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#E0D4C3] text-[10px] font-sans-clean font-bold uppercase tracking-wider text-[#8A6F4E] shadow-2xs">
              ${item.category}
            </span>
          </div>
        </div>

        <div class="p-5 space-y-2">
          <h3 class="font-serif-luxury text-xl font-bold text-[#2A3430] leading-snug line-clamp-2">
            ${item.title}
          </h3>
          <p class="text-xs text-[#6B7974] line-clamp-2 leading-relaxed">
            ${item.description || ''}
          </p>
        </div>
      </div>

      <div class="p-5 pt-0">
        <div class="pt-3 border-t border-[#EFE7DC] flex items-center justify-between">
          <div>
            <span class="text-[10px] text-[#8C765C] uppercase tracking-wider font-semibold block">Valor</span>
            <span class="font-sans-clean font-bold text-base text-[#3D4C47]">
              ${WeddingStorage.formatCurrency(item.price)}
            </span>
          </div>

          ${item.reserved ? `
            <span class="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5">
              <i data-lucide="lock-keyhole" class="w-3.5 h-3.5"></i>
              <span>Reservado</span>
            </span>
          ` : `
            <button
              type="button"
              onclick="openGiftModal('${item.id}')"
              class="px-4 py-2 rounded-xl bg-[#3D4C47] hover:bg-[#2B3833] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i data-lucide="gift" class="w-3.5 h-3.5 text-[#E6CDAC]"></i>
              <span>Presentear</span>
            </button>
          `}
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openGiftModal(giftId) {
  const gifts = WeddingStorage.getGifts();
  selectedGiftItem = gifts.find(g => g.id === giftId);
  if (!selectedGiftItem) return;

  if (selectedGiftItem.reserved) {
    alert('Este giftcard já está reservado. A intenção só poderá ser registrada novamente depois que a mensagem for excluída.');
    return;
  }

  const modal = document.getElementById('gift-modal');
  const content = document.getElementById('gift-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <img
          src="${selectedGiftItem.imageUrl}"
          alt="${selectedGiftItem.title}"
          class="w-20 h-20 rounded-2xl object-cover border border-[#E9DFD0] shrink-0"
        />
        <div>
          <span class="text-[10px] uppercase tracking-wider font-bold text-[#8C6D48]">${selectedGiftItem.category}</span>
          <h3 class="font-serif-luxury text-2xl font-bold text-[#2A3430] leading-tight">${selectedGiftItem.title}</h3>
          <p class="text-base font-bold text-[#3D4C47] mt-1">${WeddingStorage.formatCurrency(selectedGiftItem.price)}</p>
        </div>
      </div>

      <div class="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E2D5C2] space-y-2">
        <div class="flex items-center justify-between text-xs font-semibold text-[#485753]">
          <span>Chave Pix dos Noivos:</span>
          <span class="text-[10px] text-[#866F56]">Sem taxas adicionais</span>
        </div>
        <div class="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#D5C7B2]">
          <code class="text-xs font-mono text-[#2B3532] truncate">elisadiasrj011016@gmail.com</code>
          <button
            type="button"
            onclick="copyPixKeyModal()"
            class="px-3 py-1 rounded-lg bg-[#3D4C47] text-white text-xs font-medium cursor-pointer"
          >
            <span id="modal-pix-label">Copiar</span>
          </button>
        </div>
      </div>

      <form onsubmit="confirmGiftDonation(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[#4A3D2F] uppercase tracking-wider mb-1">
            Seu Nome Completo *
          </label>
          <input
            id="gifter-name"
            type="text"
            placeholder="Ex: Juliete Simões"
            required
            class="w-full px-3.5 py-2.5 rounded-xl border border-[#D8C7B0] bg-[#FAF8F5] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D4C47]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#4A3D2F] uppercase tracking-wider mb-1">
            Mensagem de Carinho aos Noivos (Opcional)
          </label>
          <textarea
            id="gifter-message"
            rows="2"
            placeholder="Deixe um recado afetuoso para Elisa e Sérgio..."
            class="w-full px-3.5 py-2.5 rounded-xl border border-[#D8C7B0] bg-[#FAF8F5] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D4C47]"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full py-3.5 rounded-2xl bg-[#3D4C47] hover:bg-[#2A3733] text-white font-semibold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <i data-lucide="check" class="w-4 h-4 text-[#E6CDAC]"></i>
          <span>Registrar Intenção de Presente</span>
        </button>
      </form>
    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeGiftModal() {
  const modal = document.getElementById('gift-modal');
  if (modal) modal.classList.add('hidden');
}

async function confirmGiftDonation(e) {
  e.preventDefault();
  if (!selectedGiftItem) return;

  // O servidor valida a reserva dentro de uma transação, inclusive contra outra aba.
  const gifts = WeddingStorage.getGifts();
  const gift = gifts.find(item => item.id === selectedGiftItem.id);
  if (!gift || gift.reserved) {
    closeGiftModal();
    renderGiftsGrid();
    alert('Este giftcard acabou de ser reservado por outro convidado. Escolha outro presente.');
    return;
  }

  const nameInput = document.getElementById('gifter-name');
  const msgInput = document.getElementById('gifter-message');

  const donorName = nameInput ? nameInput.value.trim() : 'Convidado';
  const donorMsg = msgInput ? msgInput.value.trim() : '';
  const externalWindow = gift.linkConferir ? window.open('about:blank', '_blank') : null;

  let result;
  try {
    result = await WeddingStorage.createGiftIntent({
      authorName: donorName,
      message: donorMsg || 'Presente selecionado com muito carinho para os noivos.',
      giftId: selectedGiftItem.id
    });
  } catch (error) {
    renderGiftsGrid();
    alert(error.message);
    return;
  }

  // Abre o link individual configurado no giftcard após o registro.
  if (result.gift.linkConferir) {
    if (externalWindow) externalWindow.location.href = result.gift.linkConferir;
    else window.open(result.gift.linkConferir, '_blank', 'noopener,noreferrer');
  }

  selectedGiftItem = result.gift;
  renderGiftsGrid();

  const content = document.getElementById('gift-modal-content');
  if (content) {
    content.innerHTML = `
      <div class="py-6 text-center space-y-4">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <i data-lucide="heart" class="w-8 h-8 fill-current"></i>
        </div>
        <h3 class="font-serif-luxury text-2xl text-[#2B3532] font-bold">
          Solicitação Registrada!
        </h3>
        <p class="text-xs sm:text-sm text-[#54625E] font-sans-clean leading-relaxed max-w-sm mx-auto">
          Sua intenção de presentear <strong>${selectedGiftItem.title}</strong> foi enviada para Elisa & Sérgio. Agradecemos imensamente por esse gesto de carinho!
        </p>
        <button
          type="button"
          onclick="closeGiftModal()"
          class="px-6 py-2.5 rounded-full bg-[#3D4C47] text-white text-xs font-semibold shadow-sm cursor-pointer"
        >
          Fechar
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
}

function copyPixKey() {
  navigator.clipboard.writeText('duque.majores@gmail.com');
  const label = document.getElementById('copy-pix-label');
  if (label) {
    label.innerText = 'Copiado!';
    setTimeout(() => {
      label.innerText = 'Copiar Chave';
    }, 2500);
  }
}

function copyPixKeyModal() {
  navigator.clipboard.writeText('duque.majores@gmail.com');
  const label = document.getElementById('modal-pix-label');
  if (label) {
    label.innerText = 'Copiado!';
    setTimeout(() => {
      label.innerText = 'Copiar';
    }, 2500);
  }
}

function copyDeliveryAddress() {
  const fullAddress = 'Aos cuidados de Elisa & Sérgio\nAv. Copacabana, 166 - Praia Linda\nSão Pedro da Aldeia - RJ, CEP: 28940-000';
  navigator.clipboard.writeText(fullAddress);
  alert('Endereço de entrega copiado para a área de transferência!');
}
