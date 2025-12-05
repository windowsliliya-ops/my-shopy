// Данные товаров
const products = [
  {
    id: 1,
    name: "Разделочная доска",
    description: "Экологичная бамбуковая доска для кухни.",
    price: 1290,
    image: "media/pic1.jpg",
    imageWebp: "media/pic1.jpg"
  },
  {
    id: 2,
    name: "Чайник керамический",
    description: "Стильный чайник на 1 литр, ручная работа.",
    price: 2450,
    image: "media/pic2.jpg",
    imageWebp: "media/pic2.jpg"
  },
  {
    id: 3,
    name: "Набор кухонных полотенец",
    description: "100% хлопок, 4 шт. в упаковке.",
    price: 590,
    image: "media/pic3.jpg",
    imageWebp: "media/pic3.jpg"
  },
];

// Состояние корзины
let cart = []; 

// DOM-элементы
const productsContainer = document.getElementById('products-container');
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

// Функция отображения каталога
function renderCatalog() {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <picture>
        <source srcset="${product.imageWebp}" type="image/webp">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </picture>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price.toLocaleString('ru-RU')} ₽</p>
      <button onclick="addToCart(${product.id})">В корзину</button>
    `;
    productsContainer.appendChild(card);
  });
}

// Добавление в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCartUI();
}

// Обновление интерфейса корзины
function updateCartUI() {
  // Обновляем счётчик
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;

// Обновляем содержимое модального окна (если открыто)
  renderCartItems();
  updateTotalPrice();
}

function renderCartItems() {
  if (!cartModal.classList.contains('hidden')) {
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Корзина пуста</p>';
    } else {
      cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <span>${item.product.name} × ${item.quantity}</span>
          <span>${(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
        </div>
      `).join('');
    }
  }
}

function updateTotalPrice() {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  totalPriceEl.textContent = `${total.toLocaleString('ru-RU')} ₽`;
}

// Управление модальным окном
cartBtn.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
  renderCartItems();
  updateTotalPrice();
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Закрытие по клику вне окна
window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.add('hidden');
  }
});

// Оформление заказа
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Ваша корзина пуста!');
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  alert(`Заказ на сумму ${total.toLocaleString('ru-RU')} ₽ успешно оформлен!`);
  cart = [];
  updateCartUI();
  cartModal.classList.add('hidden');
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartUI();
});