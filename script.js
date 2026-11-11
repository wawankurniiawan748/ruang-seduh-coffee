/* =========================================================
   PENGATURAN USAHA — Ubah bagian ini sesuai data coffee shop.
   Nomor WhatsApp gunakan format internasional tanpa + atau 0 di depan.
   Contoh: 6281234567890
   ========================================================= */
const SHOP_CONFIG = {
  name: 'Ruang Senja Coffee',
  whatsapp: '628314077813', // GANTI dengan nomor WhatsApp bisnis Anda
  address: '[Jl. AMD CIBENTANG KEC.CISEENG-BOGOR]',
  hours: 'Setiap hari · 09.00–22.00 WIB',
  phoneDisplay: '[628314077813]',
  mapsUrl: 'https://maps.google.com/?q=coffee+shop', // GANTI dengan tautan Google Maps usaha Anda
  instagramUrl: 'https://instagram.com' // GANTI dengan tautan Instagram usaha Anda
};

const rupiah = value => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
const cart = new Map();
const products = [...document.querySelectorAll('.product-card')];
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const toast = document.getElementById('toast');
let toastTimer;

// Sinkronkan informasi usaha dari konfigurasi ke halaman.
document.title = `${SHOP_CONFIG.name} | Temukan Ritme, Nikmati Kopi`;
document.querySelectorAll('.brand-name').forEach(el => { el.childNodes[0].textContent = SHOP_CONFIG.name.toUpperCase().replace(' COFFEE', ''); });
document.getElementById('addressText').textContent = SHOP_CONFIG.address;
document.getElementById('hoursText').textContent = SHOP_CONFIG.hours;
document.getElementById('phoneText').textContent = SHOP_CONFIG.phoneDisplay;
document.getElementById('mapLink').href = SHOP_CONFIG.mapsUrl;
document.getElementById('instagramLink').href = SHOP_CONFIG.instagramUrl;
document.getElementById('whatsappFooter').href = `https://wa.me/${SHOP_CONFIG.whatsapp}`;
document.getElementById('year').textContent = new Date().getFullYear();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addToCart(card) {
  const id = card.dataset.id;
  const existing = cart.get(id);
  cart.set(id, {
    id,
    name: card.dataset.name,
    price: Number(card.dataset.price),
    qty: existing ? existing.qty + 1 : 1
  });
  renderCart();
  showToast(`${card.dataset.name} ditambahkan ke keranjang`);
}

products.forEach(card => {
  card.querySelector('.quick-add').addEventListener('click', () => addToCart(card));
});

// Filter kategori menu.
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    products.forEach(card => card.classList.toggle('hide', filter !== 'all' && card.dataset.category !== filter));
  });
});

function renderCart() {
  const items = [...cart.values()];
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartCount.textContent = count;
  cartTotal.textContent = rupiah(total);

  if (!items.length) {
    cartItems.innerHTML = '<div class="empty-cart"><span>☕</span><p>Keranjangmu masih kosong.</p><small>Yuk, pilih minuman favoritmu.</small></div>';
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-item">
      <div><h4>${escapeHTML(item.name)}</h4><small>${rupiah(item.price)} · ${rupiah(item.price * item.qty)}</small></div>
      <div class="qty-control">
        <button type="button" data-action="minus" data-id="${item.id}" aria-label="Kurangi ${escapeHTML(item.name)}">−</button>
        <span>${item.qty}</span>
        <button type="button" data-action="plus" data-id="${item.id}" aria-label="Tambah ${escapeHTML(item.name)}">+</button>
      </div>
    </div>`).join('');
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

cartItems.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const item = cart.get(button.dataset.id);
  if (!item) return;
  if (button.dataset.action === 'plus') item.qty += 1;
  if (button.dataset.action === 'minus') item.qty -= 1;
  if (item.qty <= 0) cart.delete(item.id);
  renderCart();
});

function openCart() {
  cartOverlay.classList.add('open');
  cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  document.getElementById('closeCart').focus();
}
function closeCart() {
  cartOverlay.classList.remove('open');
  cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}
document.getElementById('openCart').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', event => { if (event.target === cartOverlay) closeCart(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const items = [...cart.values()];
  if (!items.length) {
    showToast('Keranjang masih kosong. Pilih menu terlebih dahulu.');
    return;
  }
  if (!/^\d{10,15}$/.test(SHOP_CONFIG.whatsapp)) {
    showToast('Atur nomor WhatsApp bisnis di file script.js terlebih dahulu.');
    return;
  }
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const lines = items.map(item => `• ${item.name} x${item.qty} — ${rupiah(item.price * item.qty)}`);
  const message = `Halo ${SHOP_CONFIG.name}, saya ingin memesan:\n\n${lines.join('\n')}\n\nTotal: ${rupiah(total)}\n\nNama pemesan: \nCatatan: \n\nMohon konfirmasi pesanan saya. Terima kasih!`;
  window.open(`https://wa.me/${SHOP_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

// Navigasi seluler.
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
}));

renderCart();
