import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useMarginSettingsStore } from "@/stores/marginSettings.js";
import { useMarginOptionsStore } from "@/stores/marginOptions.js";

export const useMarginOrdersStore = defineStore(
  "marginOrders",
  () => {
    const { leverage } = storeToRefs(useMarginSettingsStore());
    const { margin, tpCost, slCost } = storeToRefs(useMarginOptionsStore());
    const buyFee = 0.02;
    const sellFee = 0.055;

    // Orders array initialized with a default order
    const orders = ref([
      {
        buyPrice: null,
        amount: null,
        calcBuyOrder: 0,
        calcSl: 0,
        calcTp: 0,
        infoAmount: 0,
        infoSlPrice: 0,
        infoTpPrice: 0,
      },
    ]);

    // Reactive inputs
    const buyPrice = ref(null);
    const amount = ref(null);
    const slPrice = ref(null);
    const tpPrice = ref(null);
    const selectedSwitch = ref(null);

    // Computed properties for calculations
    const calcBuyOrder = computed(() => {
      return buyPrice.value && amount.value
        ? (buyPrice.value * amount.value).toFixed(2)
        : 0;
    });

    const feeBuy = computed(() => (calcBuyOrder.value * buyFee) / 100);

    const feeSL = computed(() => {
      return slPrice.value && amount.value
        ? (slPrice.value * amount.value * sellFee) / 100
        : 0;
    });

    const feeTP = computed(() => {
      return tpPrice.value && amount.value
        ? (tpPrice.value * amount.value * sellFee) / 100
        : 0;
    });

    const calcSl = computed(() => {
      return buyPrice.value && slPrice.value && amount.value
        ? (
            (slPrice.value - buyPrice.value) * amount.value -
            feeBuy.value -
            feeSL.value
          ).toFixed(2)
        : 0;
    });

    const calcTp = computed(() => {
      return buyPrice.value && tpPrice.value && amount.value
        ? (
            (tpPrice.value - buyPrice.value) * amount.value -
            feeBuy.value -
            feeTP.value
          ).toFixed(2)
        : 0;
    });

    // Helper functions for digit calculation
    function calculateDigits(price) {
      if (price >= 10000) return 0;
      if (price >= 1000) return 1;
      if (price >= 100) return 2;
      if (price >= 10) return 2;
      if (price >= 1) return 3;
      if (price >= 0.1) return 4;
      return 5;
    }

    function calculateDigitsLote(digits) {
      if (digits === 0) return 4;
      if (digits === 1) return 3;
      if (digits === 2) return 2;
      if (digits === 3) return 1;
      if (digits >= 4) return 0;
    }

    // Derived digits for price and lot
    const digits = computed(() => calculateDigits(buyPrice.value || 0));
    const digitsLote = computed(() => calculateDigitsLote(digits.value));

    // Info calculations
    const infoAmount = computed(() => {
      return buyPrice.value && leverage.value && margin.value
        ? +((leverage.value * margin.value) / buyPrice.value).toFixed(
            digitsLote.value
          )
        : 0;
    });

    const infoSlPrice = computed(() => {
      return amount.value && slCost.value && buyPrice.value
        ? +(
            ((slCost.value - buyPrice.value * amount.value) * -1) /
            amount.value
          ).toFixed(digits.value)
        : 0;
    });

    const infoTpPrice = computed(() => {
      return amount.value && tpCost.value && buyPrice.value
        ? +(
            (tpCost.value + buyPrice.value * amount.value) /
            amount.value
          ).toFixed(digits.value)
        : 0;
    });

    // Functions to manage orders
    function addOrder() {
      // Add an order to the orders array
      orders.value.push({
        buyPrice: buyPrice.value,
        amount: amount.value,
        calcBuyOrder: calcBuyOrder.value,
        calcSl: calcSl.value,
        calcTp: calcTp.value,
        infoAmount: infoAmount.value,
        infoSlPrice: infoSlPrice.value,
        infoTpPrice: infoTpPrice.value,
      });

      // Reset inputs
      buyPrice.value = null;
      amount.value = null;
      slPrice.value = null;
      tpPrice.value = null;
      selectedSwitch.value = null;
    }

    function removeOrder(index) {
      // Prevent removing the last remaining order
      if (orders.value.length > 1) {
        orders.value.splice(index, 1);
      }
    }

    return {
      orders,
      buyPrice,
      amount,
      slPrice,
      tpPrice,
      selectedSwitch,
      calcBuyOrder,
      calcSl,
      calcTp,
      infoAmount,
      infoSlPrice,
      infoTpPrice,
      addOrder,
      removeOrder,
    };
  },
  { persist: false }
);
