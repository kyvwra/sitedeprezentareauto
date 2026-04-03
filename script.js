let cart = {};

function updateQty(id, change) {
  const qtySpan = document.getElementById(`qty-${id}`);
  if (!qtySpan) return;
  let currentQty = parseInt(qtySpan.innerText);
  currentQty += change;
  if (currentQty < 1) currentQty = 1;
  qtySpan.innerText = currentQty;
}

function addToCart(id, name, price) {
  const qtySpan = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtySpan.innerText);
  if (cart[id]) { cart[id].qty += qty; } 
  else { cart[id] = { name: name, price: price, qty: qty }; }
  qtySpan.innerText = "1";
  renderCart();
  openCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const countSpan = document.getElementById('cartCount');
  const totalSpan = document.getElementById('cartTotalValue');
  if (!container) return;
  
  container.innerHTML = '';
  let total = 0;
  let itemsCount = 0;
  const keys = Object.keys(cart);

  if (keys.length === 0) {
    container.innerHTML = '<p style="text-align:center; margin-top:40px; color:var(--text-dim); font-size:12px; font-weight:600; letter-spacing:1px;">DEVIZUL ESTE GOL</p>';
  } else {
    keys.forEach(id => {
      const item = cart[id];
      const subtotal = item.price * item.qty;
      total += subtotal;
      itemsCount += item.qty;
      
      container.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.qty} x ${item.price} RON</p>
            <button class="remove-item" onclick="removeFromCart('${id}')">ELIMINĂ</button>
          </div>
          <div class="cart-item-price">${subtotal} <small style="font-size:10px; font-weight:500; color:var(--text-dim);">RON</small></div>
        </div>`;
    });
  }
  countSpan.innerText = itemsCount;
  totalSpan.innerHTML = `${total} <small>RON</small>`;
}

const overlay = document.getElementById('cartOverlay');
const panel = document.getElementById('cartPanel');

function openCart() { 
  if(overlay && panel) {
    overlay.style.display = 'block'; 
    setTimeout(() => { 
      overlay.style.opacity = '1'; 
      panel.classList.add('active'); 
    }, 10);
  }
}

function closeCart() { 
  if(overlay && panel) {
    panel.classList.remove('active'); 
    overlay.style.opacity = '0'; 
    setTimeout(() => { overlay.style.display = 'none'; }, 400); 
  }
}

document.getElementById('openCartBtn')?.addEventListener('click', openCart);
document.getElementById('closeCartBtn')?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);

document.getElementById('confirmBookingBtn')?.addEventListener('click', () => {
  const keys = Object.keys(cart);
  if (keys.length === 0) return alert("Vă rugăm să adăugați servicii în deviz!");
  
  let text = "Salut! Doresc o programare în service pentru următoarele operațiuni:%0A%0A";
  keys.forEach(id => { text += `- ${cart[id].qty}x ${cart[id].name}%0A`; });
  
  window.open(`https://wa.me/40700000000?text=${text}`, '_blank');
});

// Animații la Scroll
function handleScroll() {
  document.querySelectorAll(".scroll-appear").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add("visible");
  });
}
window.addEventListener("scroll", handleScroll);
window.addEventListener("DOMContentLoaded", handleScroll);