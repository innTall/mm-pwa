import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMarginBinanceStore = defineStore("marginBinance", () => {
  // State
  const buyFee = 0.02;
  const sellFee = 0.055;
  const deposit = ref(236);
  const leverage = ref(10);
  const riskMargin = ref(5);
  const coefNextOrderCost = ref(20);
  const takeProfit = ref(5);
  const stopLoss = ref(2);
  const amount = ref(null);
  const symbol = ref("");
  const buyPrice = ref(null);
  const tpPrice = ref(null);
  const slPrice = ref(null);
  const open = ref(null);
  const close = ref(null);
  const nr = ref(1);
  const selectedSwitch = ref(null); // "tp" or "sl"

  // Computed properties
  const margin = computed(() =>
    ((deposit.value * riskMargin.value) / 100).toFixed(2)
  );
  const tpCost = computed(() =>
    ((deposit.value * takeProfit.value) / 100).toFixed(2)
  );
  const slCost = computed(() =>
    ((deposit.value * stopLoss.value) / 100).toFixed(2)
  );
  const buyOrderMath = computed(() =>
    (leverage.value * margin.value).toFixed(2)
  );
  const buyOrder = computed(() => (buyPrice.value * amount.value).toFixed(2));

  const digits = computed(() => {
    const priceValue = buyPrice.value;
    if (priceValue >= 10000) return 1;
    if (priceValue >= 1000) return 2;
    if (priceValue >= 100) return 2;
    if (priceValue >= 10) return 3;
    if (priceValue >= 1) return 3;
    if (priceValue >= 0.1) return 4;
    return 5;
  });

  const digits_lote = computed(() => {
    const digitsPrice = digits.value;
    if (digitsPrice === 1) return 3;
    if (digitsPrice === 2) return 2;
    if (digitsPrice === 3) return 1;
    if (digitsPrice >= 4) return 0;
  });

  const amountMath = computed(() => {
    if (!buyPrice.value || buyPrice.value <= 0) return 0;
    return +((leverage.value * margin.value) / buyPrice.value).toFixed(
      digits_lote.value
    );
  });

  const slPriceMath = computed(() => {
    const buy = parseFloat(buyPrice.value);
    const amt = parseFloat(amount.value);
    const slCostVal = parseFloat(slCost.value);
    if (!buy || !amt || amt <= 0) return null;
    return (((slCostVal - buy * amt) * -1) / amt).toFixed(digits.value);
  });

  const tpPriceMath = computed(() => {
    const buy = parseFloat(buyPrice.value);
    const amt = parseFloat(amount.value);
    const tpCostVal = parseFloat(tpCost.value);
    if (!buy || !amt || amt <= 0) return null;
    return ((tpCostVal + buy * amt) / amt).toFixed(digits.value);
  });

  const feeBuy = computed(() => (buyOrder * buyFee) / 100);
  const feeTP = computed(() => (tpPrice.value * amount.value * sellFee) / 100);
  const feeSL = computed(() => (slPrice.value * amount.value * sellFee) / 100);

  const sl = computed(() => {
    const buy = parseFloat(buyPrice.value);
    const slP = parseFloat(slPrice.value);
    const amt = parseFloat(amount.value);
    const feeB = parseFloat(feeBuy.value || 0);
    const feeS = parseFloat(feeSL.value || 0);
    if (isNaN(buy) || isNaN(slP) || isNaN(amt)) return null;
    return ((buy - slP) * amt + feeB + feeS).toFixed(2);
  });

  const tp = computed(() => {
    const buy = parseFloat(buyPrice.value);
    const tpP = parseFloat(tpPrice.value);
    const amt = parseFloat(amount.value);
    const feeB = parseFloat(feeBuy.value || 0);
    const feeT = parseFloat(feeTP.value || 0);
    if (isNaN(buy) || isNaN(tpP) || isNaN(amt)) return null;
    return ((tpP - buy) * amt - feeB - feeT).toFixed(2);
  });

  return {
    deposit,
    leverage,
    riskMargin,
    coefNextOrderCost,
    takeProfit,
    stopLoss,
    amount,
    symbol,
    buyPrice,
    tpPrice,
    slPrice,
    open,
    close,
    nr,
    selectedSwitch,
    margin,
    tpCost,
    slCost,
    buyOrderMath,
    buyOrder,
    digits,
    digits_lote,
    amountMath,
    slPriceMath,
    tpPriceMath,
    feeBuy,
    feeTP,
    feeSL,
    sl,
    tp,
  };
},
	{persist: false}
);
