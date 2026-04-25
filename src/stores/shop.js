import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { defaultAddress, products } from '../data/mock';

const money = (value) => Number(value.toFixed(2));
const cloneAddress = (value) => ({ ...value });

export const useShopStore = defineStore('shop', () => {
  const cart = ref([]);
  const checkoutItems = ref([]);
  const checkoutSource = ref(null);
  const latestOrder = ref(null);
  const address = ref(cloneAddress(defaultAddress));

  const getProduct = (id) => products.find((product) => product.id === id);

  const normalizeQuantity = (quantity) => {
    const numericQuantity = Number(quantity);
    return Number.isFinite(numericQuantity) ? Math.floor(numericQuantity) : 1;
  };
  const clampQuantity = (product, quantity) => Math.min(product.stock, Math.max(1, normalizeQuantity(quantity)));

  const hydrateItems = (items) =>
    items
      .map((item) => {
        const product = getProduct(item.productId);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean);

  const cartItems = computed(() => hydrateItems(cart.value));
  const selectedCartItems = computed(() => cartItems.value.filter((item) => item.selected));
  const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0));
  const allSelected = computed(() => cart.value.length > 0 && cart.value.every((item) => item.selected));

  const activeCheckoutItems = computed(() => hydrateItems(checkoutItems.value));
  const checkoutSubtotal = computed(() =>
    money(activeCheckoutItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)),
  );
  const checkoutDiscount = computed(() => {
    const hasCampaign = activeCheckoutItems.value.some((item) => item.product.campaign);
    const thresholdDiscount = checkoutSubtotal.value >= 59 ? 8 : 0;
    return money((hasCampaign ? 3 : 0) + thresholdDiscount);
  });
  const checkoutShipping = computed(() => 0);
  const checkoutTotal = computed(() =>
    money(Math.max(0, checkoutSubtotal.value - checkoutDiscount.value + checkoutShipping.value)),
  );

  function addToCart(productId, spec, quantity) {
    const product = getProduct(productId);
    if (!product) return;

    const existing = cart.value.find((item) => item.productId === productId && item.spec === spec);
    if (existing) {
      existing.quantity = clampQuantity(product, existing.quantity + normalizeQuantity(quantity));
      existing.selected = true;
      return;
    }

    cart.value.push({
      productId,
      spec,
      quantity: clampQuantity(product, quantity),
      selected: true,
    });
  }

  function setCartSelected(productId, spec, selected) {
    const item = cart.value.find((entry) => entry.productId === productId && entry.spec === spec);
    if (item) item.selected = selected;
  }

  function setAllCartSelected(selected) {
    cart.value.forEach((item) => {
      item.selected = selected;
    });
  }

  function setCartQuantity(productId, spec, quantity) {
    const product = getProduct(productId);
    const item = cart.value.find((entry) => entry.productId === productId && entry.spec === spec);
    if (item && product) item.quantity = clampQuantity(product, quantity);
  }

  function removeCartItem(productId, spec) {
    cart.value = cart.value.filter((item) => !(item.productId === productId && item.spec === spec));
  }

  function checkoutFromCart() {
    checkoutItems.value = selectedCartItems.value.map(({ productId, spec, quantity }) => ({
      productId,
      spec,
      quantity,
    }));
    checkoutSource.value = 'cart';
  }

  function checkoutNow(productId, spec, quantity) {
    const product = getProduct(productId);
    if (!product) return;

    checkoutItems.value = [{ productId, spec, quantity: clampQuantity(product, quantity) }];
    checkoutSource.value = 'direct';
  }

  function submitOrder() {
    if (activeCheckoutItems.value.length === 0) return null;

    const order = {
      orderNo: `DD${Date.now().toString().slice(-10)}`,
      items: activeCheckoutItems.value.map(({ productId, spec, quantity, product }) => ({
        productId,
        spec,
        quantity,
        title: product.title,
        price: product.price,
      })),
      address: cloneAddress(address.value),
      subtotal: checkoutSubtotal.value,
      discount: checkoutDiscount.value,
      shipping: checkoutShipping.value,
      total: checkoutTotal.value,
      createdAt: new Date().toISOString(),
    };

    latestOrder.value = order;
    if (checkoutSource.value === 'cart') {
      const orderedKeys = new Set(checkoutItems.value.map((item) => `${item.productId}:${item.spec}`));
      cart.value = cart.value.filter((item) => !orderedKeys.has(`${item.productId}:${item.spec}`));
    }
    checkoutItems.value = [];
    checkoutSource.value = null;
    return order;
  }

  return {
    cart,
    checkoutItems,
    checkoutSource,
    latestOrder,
    address,
    cartItems,
    selectedCartItems,
    cartCount,
    allSelected,
    activeCheckoutItems,
    checkoutSubtotal,
    checkoutDiscount,
    checkoutShipping,
    checkoutTotal,
    getProduct,
    addToCart,
    setCartSelected,
    setAllCartSelected,
    setCartQuantity,
    removeCartItem,
    checkoutFromCart,
    checkoutNow,
    submitOrder,
  };
});
