<<<<<<< HEAD
const CANTEEN_WHATSAPP_NUMBER = "916264090161";

const menuItems = [
  {
    id: "tea",
    name: "Tea",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    description: "A comforting cup of chai brewed for a refreshing and warm start."
  },
  {
    id: "cheese-maggi",
    name: "Cheese Maggi",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    description: "Rich and cheesy instant noodles with a creamy, satisfying finish."
  },
  {
    id: "cheese-sandwich",
    name: "Cheese Sandwich",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    description: "Classic sandwich with fresh vegetables, cheese and special sauce."
  },
  {
    id: "coffee",
    name: "Coffee",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80",
    description: "Bold and aromatic coffee made for a quick energy boost."
  },
  {
    id: "cutlet",
    name: "Cutlet (3 pcs)",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    description: "Crispy golden cutlets served hot and perfectly spiced."
  },
  {
    id: "maggi-pasta",
    name: "Maggi Pasta",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    description: "Soft pasta-style Maggi tossed with delicious sauces and flavor."
  },
  {
    id: "masala-maggi",
    name: "Masala Maggi",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    description: "Spicy masala noodles with a nostalgic, homely taste."
  },
  {
    id: "noodles",
    name: "Noodles",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    description: "Stir-fried noodles with a rich blend of vegetables and spices."
  },
  {
    id: "normal-sandwich",
    name: "Normal Sandwich",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=900&q=80",
    description: "Freshly layered sandwich with crisp veggies and soft bread."
  },
  {
    id: "poha",
    name: "Poha",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1604908556858-5d7674d3825e?auto=format&fit=crop&w=900&q=80",
    description: "Light and savory flattened rice, tempered with spices and lemon."
  },
  {
    id: "rice-dana-vade",
    name: "Rice-dana Vade (2 pcs)",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1604908556858-5d7674d3825e?auto=format&fit=crop&w=900&q=80",
    description: "Crisp rice-dana vada with a comforting savory bite."
  },
  {
    id: "schezwan-maggi",
    name: "Schezwan Maggi",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    description: "Tangy Schezwan Maggi with a kick of chili and vibrant flavor."
  },
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1633945274409-ebe0d5720d53?auto=format&fit=crop&w=900&q=80",
    description: "Aromatic vegetable biryani layered with fragrant rice and spices."
  }
];

const STORAGE_KEYS = {
  cart: "amanBhaiyaCart",
  customerName: "amanBhaiyaName",
  department: "amanBhaiyaDepartment"
};

const state = {
  cart: {},
  menuSelections: {},
  activeScreen: "menu",
  selectedItemId: null,
  detailQuantity: 1
};

function safeLocalStorageGet(key) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) : null;
  } catch (error) {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    // Ignore localStorage issues gracefully.
  }
}

function safeLocalStorageRemove(key) {
  try {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    // Ignore localStorage issues gracefully.
  }
}

function loadPersistentData() {
  const savedCart = safeLocalStorageGet(STORAGE_KEYS.cart);
  const savedName = safeLocalStorageGet(STORAGE_KEYS.customerName);
  const savedDepartment = safeLocalStorageGet(STORAGE_KEYS.department);

  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (error) {
      state.cart = {};
    }
  }

  const nameInput = document.getElementById("customerName");
  const departmentSelect = document.getElementById("department");

  if (nameInput && savedName) {
    nameInput.value = savedName;
  }

  if (departmentSelect && savedDepartment) {
    departmentSelect.value = savedDepartment;
  }
}

function saveCartState() {
  safeLocalStorageSet(STORAGE_KEYS.cart, JSON.stringify(state.cart));
}

function saveCustomerData() {
  const customerName = document.getElementById("customerName");
  const department = document.getElementById("department");

  if (customerName) {
    safeLocalStorageSet(STORAGE_KEYS.customerName, customerName.value);
  }

  if (department) {
    safeLocalStorageSet(STORAGE_KEYS.department, department.value);
  }
}

function formatPrice(value) {
  return `₹${value}`;
}

function calculateTotal() {
  return menuItems.reduce((total, item) => {
    const quantity = state.cart[item.id] || 0;
    return total + item.price * quantity;
  }, 0);
}

function getCartItemCount() {
  return Object.values(state.cart).reduce((total, quantity) => total + quantity, 0);
}

function getSelectedItems() {
  return menuItems
    .filter((item) => (state.cart[item.id] || 0) > 0)
    .map((item) => ({
      item,
      quantity: state.cart[item.id],
      total: item.price * state.cart[item.id]
    }));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function isOrderingOpen(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= 11 * 60 && minutes < 18 * 60;
}

function updateOrderingStatus() {
  const badge = document.getElementById("orderingStatusBadge");
  const hoursLabel = document.getElementById("workingHoursLabel");
  const isOpen = isOrderingOpen();

  if (badge) {
    badge.textContent = isOpen ? "OPEN" : "CLOSED";
    badge.classList.toggle("status-open", isOpen);
    badge.classList.toggle("status-closed", !isOpen);
  }

  if (hoursLabel) {
    hoursLabel.textContent = isOpen
      ? "Ordering is open now: 11:00 AM to 6:00 PM"
      : "Ordering hours: 11:00 AM to 6:00 PM";
  }
}

function enforceOrderingHours() {
  if (isOrderingOpen()) {
    return true;
  }

  showToast("Canteen ordering is currently closed. Ordering hours are 11:00 AM to 6:00 PM.");
  return false;
}

function hidePreview() {
  const previewOverlay = document.getElementById("previewOverlay");
  if (previewOverlay) {
    previewOverlay.classList.add("hidden");
  }
}

function setScreen(screenName) {
  const screenMap = {
    menu: "menuScreen",
    order: "orderScreen",
    contact: "contactScreen",
    detail: "detailScreen",
    success: "successScreen"
  };

  const targetId = screenMap[screenName];

  if (!targetId) return;

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === targetId);
  });

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenName);
  });

  state.activeScreen = screenName;

  if (screenName !== "detail") {
    hidePreview();
  }
}

function updateQuantity(itemId, direction) {
  const currentQty = state.menuSelections[itemId] || 0;
  const nextQty = Math.max(0, currentQty + direction);
  state.menuSelections[itemId] = nextQty;
  renderMenu();
}

function renderMenuOrderSummary() {
  const indicator = document.getElementById("menuOrderIndicator");
  const totalPill = document.getElementById("menuTotalPill");
  const totalItems = getCartItemCount();
  const totalAmount = calculateTotal();

  if (indicator) {
    indicator.innerHTML = `🛒 Your Order (${totalItems})`;
  }

  if (totalPill) {
    totalPill.textContent = formatPrice(totalAmount);
  }
}

function addToOrder(itemId) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  const selectedQty = state.menuSelections[itemId] || 0;

  if (!item) return;

  if (selectedQty <= 0) {
    showToast("Please select quantity first.");
    return;
  }

  state.cart[itemId] = (state.cart[itemId] || 0) + selectedQty;
  state.menuSelections[itemId] = 0;
  saveCartState();
  renderMenu();
  renderCart();
  showToast(`${item.name} added to your order.`);
}

function renderMenu() {
  const menuList = document.getElementById("menuList");
  if (!menuList) return;

  menuList.innerHTML = menuItems
    .map((item) => {
      const quantity = state.menuSelections[item.id] || 0;
      return `
        <article class="food-card" data-id="${item.id}" tabindex="0" aria-label="${item.name} card">
          <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80';"
          />
          <div class="food-details">
            <h3 class="food-name">${item.name}</h3>
            <div class="food-price">${formatPrice(item.price)}</div>
            <div class="quantity-row">
              <div class="stepper" aria-label="Quantity controls for ${item.name}">
                <button class="qty-btn quantity-minus" type="button" data-id="${item.id}" data-action="minus" aria-label="Decrease ${item.name}">−</button>
                <span class="qty-value">${quantity}</span>
                <button class="qty-btn quantity-plus" type="button" data-id="${item.id}" data-action="plus" aria-label="Increase ${item.name}">+</button>
              </div>
            </div>
            <button class="menu-add-btn" type="button" data-id="${item.id}" data-action="add">ADD TO ORDER</button>
          </div>
        </article>
      `;
    })
    .join("");

  menuList.querySelectorAll(".quantity-minus, .quantity-plus").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const itemId = button.dataset.id;
      const action = button.dataset.action;
      updateQuantity(itemId, action === "plus" ? 1 : -1);
    });
  });

  menuList.querySelectorAll(".menu-add-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addToOrder(button.dataset.id);
    });
  });

  menuList.querySelectorAll(".food-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".qty-btn") || event.target.closest(".menu-add-btn")) {
        return;
      }

      openDetail(card.dataset.id);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail(card.dataset.id);
      }
    });
  });

  renderMenuOrderSummary();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  const items = getSelectedItems();

  if (!items.length) {
    cartItems.innerHTML = '<div class="empty-order">Your cart is empty. Pick a tasty bite from the menu.</div>';
    renderMenuOrderSummary();
    return;
  }

  const total = calculateTotal();

  cartItems.innerHTML = `
    ${items
      .map(
        ({ item, quantity, total: itemTotal }) => `
          <div class="order-item">
            <div>
              <h4>${item.name}</h4>
              <div class="order-meta">${formatPrice(item.price)} × ${quantity}</div>
            </div>
            <div class="order-price">${formatPrice(itemTotal)}</div>
            <button class="remove-item" type="button" data-id="${item.id}" aria-label="Remove ${item.name}">🗑️</button>
          </div>
        `
      )
      .join("")}
    <div class="order-total">
      <span>Total Amount</span>
      <span>${formatPrice(total)}</span>
    </div>
  `;

  cartItems.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.id);
    });
  });

  renderMenuOrderSummary();
}

function removeFromCart(itemId) {
  delete state.cart[itemId];
  saveCartState();
  renderMenu();
  renderCart();
  showToast("Item removed from your order.");
}

function openDetail(itemId) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  if (!item) return;

  state.selectedItemId = itemId;
  state.detailQuantity = 1;
  renderDetail();
  setScreen("detail");
}

function renderDetail() {
  const item = menuItems.find((menuItem) => menuItem.id === state.selectedItemId);
  if (!item) return;

  const detailImage = document.getElementById("detailImage");
  const detailName = document.getElementById("detailName");
  const detailPrice = document.getElementById("detailPrice");
  const detailDescription = document.getElementById("detailDescription");
  const detailQty = document.getElementById("detailQty");
  const addToOrderBtn = document.getElementById("addToOrderBtn");

  if (detailImage) {
    detailImage.src = item.image;
    detailImage.alt = item.name;
  }

  if (detailName) detailName.textContent = item.name;
  if (detailPrice) detailPrice.textContent = formatPrice(item.price);
  if (detailDescription) detailDescription.textContent = item.description;
  if (detailQty) detailQty.textContent = state.detailQuantity;
  if (addToOrderBtn) {
    addToOrderBtn.textContent = `Add to Order · ${formatPrice(item.price * state.detailQuantity)}`;
  }
}

function addDetailToCart() {
  const selectedItem = menuItems.find((item) => item.id === state.selectedItemId);
  if (!selectedItem) return;

  const currentQty = state.cart[selectedItem.id] || 0;
  state.cart[selectedItem.id] = currentQty + state.detailQuantity;

  saveCartState();
  renderMenu();
  renderCart();
  showToast(`${selectedItem.name} added to your order.`);
  setScreen("menu");
}

function validateCustomerDetails() {
  const name = document.getElementById("customerName").value.trim();
  const department = document.getElementById("department").value;

  if (!name) {
    showToast("Please enter your name.");
    return false;
  }

  if (!department) {
    showToast("Please select your department.");
    return false;
  }

  if (!getSelectedItems().length) {
    showToast("Please select at least one item.");
    return false;
  }

  return true;
}

function generateWhatsAppMessage() {
  const customerName = document.getElementById("customerName").value.trim();
  const department = document.getElementById("department").value;
  const selectedItems = getSelectedItems();
  const total = calculateTotal();

  const orderLines = selectedItems
    .map(({ item, quantity, total: itemTotal }) => `• ${item.name} × ${quantity} - ${formatPrice(itemTotal)}`)
    .join("\n");

  return `🍽️ AMAN BHAIYA CANTEEN - NEW ORDER\n\n👤 Name: ${customerName}\n🏢 Department: ${department}\n\n🛒 ORDER:\n${orderLines}\n\n💰 TOTAL: ${formatPrice(total)}\n\nPlease prepare the order.\nThank you! 🙏`;
}

function showOrderPreview() {
  const name = document.getElementById("customerName").value.trim();
  const department = document.getElementById("department").value;
  const previewName = document.getElementById("previewName");
  const previewDepartment = document.getElementById("previewDepartment");
  const previewItems = document.getElementById("previewItems");
  const previewTotal = document.getElementById("previewTotal");
  const previewOverlay = document.getElementById("previewOverlay");

  if (!previewOverlay || !previewName || !previewDepartment || !previewItems || !previewTotal) return;

  previewName.textContent = name;
  previewDepartment.textContent = department;
  previewItems.innerHTML = getSelectedItems()
    .map(({ item, quantity, total: itemTotal }) => `<li>${item.name} × ${quantity} - ${formatPrice(itemTotal)}</li>`)
    .join("");
  previewTotal.textContent = formatPrice(calculateTotal());

  previewOverlay.classList.remove("hidden");
}

function openWhatsApp() {
  if (!enforceOrderingHours()) {
    return;
  }

  const whatsappUrl = `https://wa.me/${CANTEEN_WHATSAPP_NUMBER}?text=${encodeURIComponent(generateWhatsAppMessage())}`;
  const previewOverlay = document.getElementById("previewOverlay");

  if (previewOverlay) {
    previewOverlay.classList.add("hidden");
  }

  window.open(whatsappUrl, "_blank");
  setScreen("success");
}

function clearCartAndReset() {
  state.cart = {};
  state.menuSelections = {};
  safeLocalStorageRemove(STORAGE_KEYS.cart);
  renderMenu();
  renderCart();
  showToast("Order cleared successfully.");
}

function clearCurrentOrder() {
  const hasItems = getSelectedItems().length > 0;

  if (!hasItems) {
    showToast("Your order is already empty.");
    return;
  }

  const confirmed = window.confirm("Are you sure you want to clear your current order?");
  if (!confirmed) {
    return;
  }

  clearCartAndReset();
}

function handlePlaceOrder() {
  if (!enforceOrderingHours()) {
    return;
  }

  if (!validateCustomerDetails()) {
    return;
  }

  showOrderPreview();
}

function bindEvents() {
  document.querySelector(".hamburger").addEventListener("click", () => {
    setScreen("menu");
  });

  const menuOrderIndicator = document.getElementById("menuOrderIndicator");
  if (menuOrderIndicator) {
    menuOrderIndicator.addEventListener("click", () => {
      setScreen("order");
    });
  }

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setScreen(button.dataset.screen);
    });
  });

  document.querySelectorAll(".back-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.screen;
      setScreen(target);
    });
  });

  document.getElementById("customerName").addEventListener("input", saveCustomerData);
  document.getElementById("department").addEventListener("change", saveCustomerData);

  document.getElementById("clearOrderBtn").addEventListener("click", clearCurrentOrder);
  document.getElementById("placeOrderBtn").addEventListener("click", handlePlaceOrder);
  document.getElementById("openWhatsAppBtn").addEventListener("click", openWhatsApp);
  document.getElementById("backToOrderBtn").addEventListener("click", () => {
    setScreen("order");
  });

  document.getElementById("orderAgainBtn").addEventListener("click", () => {
    clearCartAndReset();
    setScreen("menu");
  });

  document.getElementById("backToMenuBtn").addEventListener("click", () => {
    setScreen("menu");
  });

  document.getElementById("detailMinus").addEventListener("click", () => {
    state.detailQuantity = Math.max(1, state.detailQuantity - 1);
    renderDetail();
  });

  document.getElementById("detailPlus").addEventListener("click", () => {
    state.detailQuantity += 1;
    renderDetail();
  });

  document.getElementById("addToOrderBtn").addEventListener("click", addDetailToCart);
}

document.addEventListener("DOMContentLoaded", () => {
  loadPersistentData();
  updateOrderingStatus();
  renderMenu();
  renderCart();
  bindEvents();
  setScreen("menu");
});
=======
const CANTEEN_WHATSAPP_NUMBER = "916264090161";

const menuItems = [
  {
    id: "tea",
    name: "Tea",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    description: "A comforting cup of chai brewed for a refreshing and warm start."
  },
  {
    id: "cheese-maggi",
    name: "Cheese Maggi",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    description: "Rich and cheesy instant noodles with a creamy, satisfying finish."
  },
  {
    id: "cheese-sandwich",
    name: "Cheese Sandwich",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    description: "Classic sandwich with fresh vegetables, cheese and special sauce."
  },
  {
    id: "coffee",
    name: "Coffee",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80",
    description: "Bold and aromatic coffee made for a quick energy boost."
  },
  {
    id: "cutlet",
    name: "Cutlet (3 pcs)",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80",
    description: "Crispy golden cutlets served hot and perfectly spiced."
  },
  {
    id: "maggi-pasta",
    name: "Maggi Pasta",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    description: "Soft pasta-style Maggi tossed with delicious sauces and flavor."
  },
  {
    id: "masala-maggi",
    name: "Masala Maggi",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    description: "Spicy masala noodles with a nostalgic, homely taste."
  },
  {
    id: "noodles",
    name: "Noodles",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    description: "Stir-fried noodles with a rich blend of vegetables and spices."
  },
  {
    id: "normal-sandwich",
    name: "Normal Sandwich",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=900&q=80",
    description: "Freshly layered sandwich with crisp veggies and soft bread."
  },
  {
    id: "poha",
    name: "Poha",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
    description: "Light and savory flattened rice, tempered with spices and lemon."
  },
  {
    id: "rice-dana-vade",
    name: "Rice-dana Vade (2 pcs)",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1604908556858-5d7674d3825e?auto=format&fit=crop&w=900&q=80",
    description: "Crisp rice-dana vada with a comforting savory bite."
  },
  {
    id: "schezwan-maggi",
    name: "Schezwan Maggi",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    description: "Tangy Schezwan Maggi with a kick of chili and vibrant flavor."
  },
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1633945274409-ebe0d5720d53?auto=format&fit=crop&w=900&q=80",
    description: "Aromatic vegetable biryani layered with fragrant rice and spices."
  }
];

const STORAGE_KEYS = {
  cart: "amanBhaiyaCart",
  customerName: "amanBhaiyaName",
  department: "amanBhaiyaDepartment"
};

const state = {
  cart: {},
  menuSelections: {},
  activeScreen: "menu",
  selectedItemId: null,
  detailQuantity: 1
};

function safeLocalStorageGet(key) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) : null;
  } catch (error) {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    // Ignore localStorage issues gracefully.
  }
}

function safeLocalStorageRemove(key) {
  try {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    // Ignore localStorage issues gracefully.
  }
}

function loadPersistentData() {
  const savedCart = safeLocalStorageGet(STORAGE_KEYS.cart);
  const savedName = safeLocalStorageGet(STORAGE_KEYS.customerName);
  const savedDepartment = safeLocalStorageGet(STORAGE_KEYS.department);

  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (error) {
      state.cart = {};
    }
  }

  const nameInput = document.getElementById("customerName");
  const departmentSelect = document.getElementById("department");

  if (nameInput && savedName) {
    nameInput.value = savedName;
  }

  if (departmentSelect && savedDepartment) {
    departmentSelect.value = savedDepartment;
  }
}

function saveCartState() {
  safeLocalStorageSet(STORAGE_KEYS.cart, JSON.stringify(state.cart));
}

function saveCustomerData() {
  const customerName = document.getElementById("customerName");
  const department = document.getElementById("department");

  if (customerName) {
    safeLocalStorageSet(STORAGE_KEYS.customerName, customerName.value);
  }

  if (department) {
    safeLocalStorageSet(STORAGE_KEYS.department, department.value);
  }
}

function formatPrice(value) {
  return `₹${value}`;
}

function calculateTotal() {
  return menuItems.reduce((total, item) => {
    const quantity = state.cart[item.id] || 0;
    return total + item.price * quantity;
  }, 0);
}

function getCartItemCount() {
  return Object.values(state.cart).reduce((total, quantity) => total + quantity, 0);
}

function getSelectedItems() {
  return menuItems
    .filter((item) => (state.cart[item.id] || 0) > 0)
    .map((item) => ({
      item,
      quantity: state.cart[item.id],
      total: item.price * state.cart[item.id]
    }));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function hidePreview() {
  const previewOverlay = document.getElementById("previewOverlay");
  if (previewOverlay) {
    previewOverlay.classList.add("hidden");
  }
}

function setScreen(screenName) {
  const screenMap = {
    menu: "menuScreen",
    order: "orderScreen",
    contact: "contactScreen",
    detail: "detailScreen",
    success: "successScreen"
  };

  const targetId = screenMap[screenName];

  if (!targetId) return;

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === targetId);
  });

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenName);
  });

  state.activeScreen = screenName;

  if (screenName !== "detail") {
    hidePreview();
  }
}

function updateQuantity(itemId, direction) {
  const currentQty = state.menuSelections[itemId] || 0;
  const nextQty = Math.max(0, currentQty + direction);
  state.menuSelections[itemId] = nextQty;
  renderMenu();
}

function renderMenuOrderSummary() {
  const indicator = document.getElementById("menuOrderIndicator");
  const totalPill = document.getElementById("menuTotalPill");
  const totalItems = getCartItemCount();
  const totalAmount = calculateTotal();

  if (indicator) {
    indicator.innerHTML = `🛒 Your Order (${totalItems})`;
  }

  if (totalPill) {
    totalPill.textContent = formatPrice(totalAmount);
  }
}

function addToOrder(itemId) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  const selectedQty = state.menuSelections[itemId] || 0;

  if (!item) return;

  if (selectedQty <= 0) {
    showToast("Please select quantity first.");
    return;
  }

  state.cart[itemId] = (state.cart[itemId] || 0) + selectedQty;
  state.menuSelections[itemId] = 0;
  saveCartState();
  renderMenu();
  renderCart();
  showToast(`${item.name} added to your order.`);
}

function renderMenu() {
  const menuList = document.getElementById("menuList");
  if (!menuList) return;

  menuList.innerHTML = menuItems
    .map((item) => {
      const quantity = state.menuSelections[item.id] || 0;
      return `
        <article class="food-card" data-id="${item.id}" tabindex="0" aria-label="${item.name} card">
          <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80';"
          />
          <div class="food-details">
            <h3 class="food-name">${item.name}</h3>
            <div class="food-price">${formatPrice(item.price)}</div>
            <div class="quantity-row">
              <div class="stepper" aria-label="Quantity controls for ${item.name}">
                <button class="qty-btn quantity-minus" type="button" data-id="${item.id}" data-action="minus" aria-label="Decrease ${item.name}">−</button>
                <span class="qty-value">${quantity}</span>
                <button class="qty-btn quantity-plus" type="button" data-id="${item.id}" data-action="plus" aria-label="Increase ${item.name}">+</button>
              </div>
            </div>
            <button class="menu-add-btn" type="button" data-id="${item.id}" data-action="add">ADD TO ORDER</button>
          </div>
        </article>
      `;
    })
    .join("");

  menuList.querySelectorAll(".quantity-minus, .quantity-plus").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const itemId = button.dataset.id;
      const action = button.dataset.action;
      updateQuantity(itemId, action === "plus" ? 1 : -1);
    });
  });

  menuList.querySelectorAll(".menu-add-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addToOrder(button.dataset.id);
    });
  });

  menuList.querySelectorAll(".food-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".qty-btn") || event.target.closest(".menu-add-btn")) {
        return;
      }

      openDetail(card.dataset.id);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail(card.dataset.id);
      }
    });
  });

  renderMenuOrderSummary();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  const items = getSelectedItems();

  if (!items.length) {
    cartItems.innerHTML = '<div class="empty-order">Your cart is empty. Pick a tasty bite from the menu.</div>';
    renderMenuOrderSummary();
    return;
  }

  const total = calculateTotal();

  cartItems.innerHTML = `
    ${items
      .map(
        ({ item, quantity, total: itemTotal }) => `
          <div class="order-item">
            <div>
              <h4>${item.name}</h4>
              <div class="order-meta">${formatPrice(item.price)} × ${quantity}</div>
            </div>
            <div class="order-price">${formatPrice(itemTotal)}</div>
            <button class="remove-item" type="button" data-id="${item.id}" aria-label="Remove ${item.name}">🗑️</button>
          </div>
        `
      )
      .join("")}
    <div class="order-total">
      <span>Total Amount</span>
      <span>${formatPrice(total)}</span>
    </div>
  `;

  cartItems.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.id);
    });
  });

  renderMenuOrderSummary();
}

function removeFromCart(itemId) {
  delete state.cart[itemId];
  saveCartState();
  renderMenu();
  renderCart();
  showToast("Item removed from your order.");
}

function openDetail(itemId) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  if (!item) return;

  state.selectedItemId = itemId;
  state.detailQuantity = 1;
  renderDetail();
  setScreen("detail");
}

function renderDetail() {
  const item = menuItems.find((menuItem) => menuItem.id === state.selectedItemId);
  if (!item) return;

  const detailImage = document.getElementById("detailImage");
  const detailName = document.getElementById("detailName");
  const detailPrice = document.getElementById("detailPrice");
  const detailDescription = document.getElementById("detailDescription");
  const detailQty = document.getElementById("detailQty");
  const addToOrderBtn = document.getElementById("addToOrderBtn");

  if (detailImage) {
    detailImage.src = item.image;
    detailImage.alt = item.name;
  }

  if (detailName) detailName.textContent = item.name;
  if (detailPrice) detailPrice.textContent = formatPrice(item.price);
  if (detailDescription) detailDescription.textContent = item.description;
  if (detailQty) detailQty.textContent = state.detailQuantity;
  if (addToOrderBtn) {
    addToOrderBtn.textContent = `Add to Order · ${formatPrice(item.price * state.detailQuantity)}`;
  }
}

function addDetailToCart() {
  const selectedItem = menuItems.find((item) => item.id === state.selectedItemId);
  if (!selectedItem) return;

  const currentQty = state.cart[selectedItem.id] || 0;
  state.cart[selectedItem.id] = currentQty + state.detailQuantity;

  saveCartState();
  renderMenu();
  renderCart();
  showToast(`${selectedItem.name} added to your order.`);
  setScreen("menu");
}

function validateCustomerDetails() {
  const name = document.getElementById("customerName").value.trim();
  const department = document.getElementById("department").value;

  if (!name) {
    showToast("Please enter your name.");
    return false;
  }

  if (!department) {
    showToast("Please select your department.");
    return false;
  }

  if (!getSelectedItems().length) {
    showToast("Please select at least one item.");
    return false;
  }

  return true;
}

function generateWhatsAppMessage() {
  const customerName = document.getElementById("customerName").value.trim();
  const department = document.getElementById("department").value;
  const selectedItems = getSelectedItems();
  const total = calculateTotal();

  const orderLines = selectedItems
    .map(({ item, quantity, total: itemTotal }) => `• ${item.name} × ${quantity} - ${formatPrice(itemTotal)}`)
    .join("\n");

  return `🍽️ AMAN BHAIYA CANTEEN - NEW ORDER\n\n👤 Name: ${customerName}\n🏢 Department: ${department}\n\n🛒 ORDER:\n${orderLines}\n\n💰 TOTAL: ${formatPrice(total)}\n\nPlease prepare the order.\nThank you! 🙏`;
}

function showOrderPreview() {
  const name = document.getElementById("customerName").value.trim();
  const department = document.getElementById("department").value;
  const previewName = document.getElementById("previewName");
  const previewDepartment = document.getElementById("previewDepartment");
  const previewItems = document.getElementById("previewItems");
  const previewTotal = document.getElementById("previewTotal");
  const previewOverlay = document.getElementById("previewOverlay");

  if (!previewOverlay || !previewName || !previewDepartment || !previewItems || !previewTotal) return;

  previewName.textContent = name;
  previewDepartment.textContent = department;
  previewItems.innerHTML = getSelectedItems()
    .map(({ item, quantity, total: itemTotal }) => `<li>${item.name} × ${quantity} - ${formatPrice(itemTotal)}</li>`)
    .join("");
  previewTotal.textContent = formatPrice(calculateTotal());

  previewOverlay.classList.remove("hidden");
}

function openWhatsApp() {
  const whatsappUrl = `https://wa.me/${CANTEEN_WHATSAPP_NUMBER}?text=${encodeURIComponent(generateWhatsAppMessage())}`;
  const previewOverlay = document.getElementById("previewOverlay");

  if (previewOverlay) {
    previewOverlay.classList.add("hidden");
  }

  window.open(whatsappUrl, "_blank");
  setScreen("success");
}

function clearCartAndReset() {
  state.cart = {};
  state.menuSelections = {};
  saveCartState();
  renderMenu();
  renderCart();

  const customerName = document.getElementById("customerName");
  const department = document.getElementById("department");

  if (customerName) {
    customerName.value = "";
    safeLocalStorageRemove(STORAGE_KEYS.customerName);
  }

  if (department) {
    department.value = "";
    safeLocalStorageRemove(STORAGE_KEYS.department);
  }
}

function handlePlaceOrder() {
  if (!validateCustomerDetails()) {
    return;
  }

  showOrderPreview();
}

function bindEvents() {
  document.querySelector(".hamburger").addEventListener("click", () => {
    setScreen("menu");
  });

  const menuOrderIndicator = document.getElementById("menuOrderIndicator");
  if (menuOrderIndicator) {
    menuOrderIndicator.addEventListener("click", () => {
      setScreen("order");
    });
  }

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setScreen(button.dataset.screen);
    });
  });

  document.querySelectorAll(".back-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.screen;
      setScreen(target);
    });
  });

  document.getElementById("customerName").addEventListener("input", saveCustomerData);
  document.getElementById("department").addEventListener("change", saveCustomerData);

  document.getElementById("placeOrderBtn").addEventListener("click", handlePlaceOrder);
  document.getElementById("openWhatsAppBtn").addEventListener("click", openWhatsApp);
  document.getElementById("backToOrderBtn").addEventListener("click", () => {
    setScreen("order");
  });

  document.getElementById("orderAgainBtn").addEventListener("click", () => {
    clearCartAndReset();
    setScreen("menu");
  });

  document.getElementById("backToMenuBtn").addEventListener("click", () => {
    setScreen("menu");
  });

  document.getElementById("detailMinus").addEventListener("click", () => {
    state.detailQuantity = Math.max(1, state.detailQuantity - 1);
    renderDetail();
  });

  document.getElementById("detailPlus").addEventListener("click", () => {
    state.detailQuantity += 1;
    renderDetail();
  });

  document.getElementById("addToOrderBtn").addEventListener("click", addDetailToCart);
}

document.addEventListener("DOMContentLoaded", () => {
  loadPersistentData();
  renderMenu();
  renderCart();
  bindEvents();
  setScreen("menu");
});
>>>>>>> fea3aefae9b7bffd67d7a793bce7cea5d46f0f4b
