import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { defaultAddress, products } from '../data/mock';

const money = (value) => Number(value.toFixed(2));

export const useShopStore = defineStore('shop', () => {
  const cart = ref([]);
  const checkoutItems = ref([]);
  const latestOrder = ref(null);
  const address = ref(defaultAddress);

  const getProduct = (id) => products.find((product) => product.id === id);

  const clampQuantity = (product, quantity) => Math.min(product.stock, Math.max(1, quantity));

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
  const checkoutShipping = computed(() => (checkoutSubtotal.value > 0 ? 0 : 0));
  const checkoutTotal = computed(() =>
    money(Math.max(0, checkoutSubtotal.value - checkoutDiscount.value + checkoutShipping.value)),
  );

  function addToCart(productId, spec, quantity) {
    const product = getProduct(productId);
    if (!product) return;

    const existing = cart.value.find((item) => item.productId === productId && item.spec === spec);
    if (existing) {
      existing.quantity = clampQuantity(product, existing.quantity + quantity);
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
  }

  function checkoutNow(productId, spec, quantity) {
    const product = getProduct(productId);
    if (!product) return;

    checkoutItems.value = [{ productId, spec, quantity: clampQuantity(product, quantity) }];
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
      address: address.value,
      subtotal: checkoutSubtotal.value,
      discount: checkoutDiscount.value,
      shipping: checkoutShipping.value,
      total: checkoutTotal.value,
      createdAt: new Date().toISOString(),
    };

    latestOrder.value = order;
    const orderedKeys = new Set(checkoutItems.value.map((item) => `${item.productId}:${item.spec}`));
    cart.value = cart.value.filter((item) => !orderedKeys.has(`${item.productId}:${item.spec}`));
    checkoutItems.value = [];
    return order;
  }

  return {
    cart,
    checkoutItems,
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
