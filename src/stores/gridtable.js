import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMinmaxStore } from "@/stores/minmax.js";
import { useGridStore } from "@/stores/gridcost.js";
//* ------------------
//* <<< input data >>>
//* ------------------
const { minPrice, maxPrice, gridSize, firstBuyLevel, buyLevelsCoef } =
  storeToRefs(useMinmaxStore());
const {
  numOfOrder,
  coefNextOrderCost,
  firstOrderCost,
} = storeToRefs(useGridStore());

export const useTableStore = defineStore(
  "table",
  () => {
    let numOfOrderKeys = ref([]);
    let buyLimitLevels = ref([]);
    let buyOrdersArray = ref([]);
    let sumBuyOrders = ref([]);
    let amountBuyOrders = ref([]);
    let sumAmountOrders = ref([]);
    let buyZeroLevels = ref([]);
    let sellLevelsArray = ref([]);
    let totalProfit = ref([]);
    const savedTables = ref([]);

    // Adjust the `digits` computed property to return the required decimal places
    const priceRound = computed(() => {
      const priceValue = minPrice.value;
      if (priceValue >= 10000) return 1;
      if (priceValue >= 1000) return 2;
      if (priceValue >= 100) return 2;
      if (priceValue >= 10) return 3;
      if (priceValue >= 1) return 3;
      if (priceValue >= 0.1) return 4;
      return 5;
    });

    // Computed property for formatted lote with decimal places
    const loteRound = computed(() => {
      const digitsPrice = priceRound.value;
      if (digitsPrice == 1) return 3;
      if (digitsPrice == 2) return 2;
      if (digitsPrice == 3) return 1;
      if (digitsPrice >= 4) return 0;
    });

    //* ----------------------------------
    //* <<< base level coef and values >>>
    //* ----------------------------------
    const gridFrequence = computed(() =>
      (gridSize.value / numOfOrder.value).toFixed(2)
    );
    const minGridDeposit = computed(() =>
      Math.ceil(
        (firstOrderCost.value *
          (1 - coefNextOrderCost.value ** numOfOrder.value)) /
          (1 - coefNextOrderCost.value)
      )
    );
    const firstBuyLevelTicks = computed(() =>
      (
        maxPrice.value -
        minPrice.value -
        (maxPrice.value - minPrice.value) * firstBuyLevel.value
      ).toFixed(priceRound.value)
    );
    const buyFirstLevel = computed(() =>
      (maxPrice.value - firstBuyLevelTicks.value).toFixed(priceRound.value)
    );
    const tradeMinPrice = computed(() =>
      (minPrice.value - (minPrice.value * gridFrequence.value) / 100).toFixed(
        priceRound.value
      )
    );
    const gridSizeTick = computed(() =>
      (maxPrice.value - minPrice.value).toFixed(priceRound.value)
    );
    const buyLevelsDiffCoef = computed(() =>
      (
        (tradeMinPrice.value / buyFirstLevel.value) **
        (1 / (numOfOrder.value - 1))
      ).toFixed(4)
    );

    //* ----------------------
    //* <<< buy order keys >>>
    //* ----------------------
    numOfOrderKeys = computed(() =>
      Array.from({ length: numOfOrder.value }, (_, index) => index + 1)
    );
    //* --------------------------------------------
    //* <<< difference entre buy levels in ticks >>>
    //* --------------------------------------------
    const coefLevels = {
      3: { start: 0.95, end: 1.05 },
      4: { start: 0.9, end: 1.1 },
      5: { start: 0.85, end: 1.15 },
      6: { start: 0.8, end: 1.2 },
      7: { start: 0.75, end: 1.25 },
      8: { start: 0.7, end: 1.3 },
      9: { start: 0.65, end: 1.35 },
      10: { start: 0.6, end: 1.4 },
      11: { start: 0.55, end: 1.45 },
      12: { start: 0.5, end: 1.5 },
      13: { start: 0.45, end: 1.55 },
      14: { start: 0.4, end: 1.6 },
      15: { start: 0.35, end: 1.65 },
    };

    let startCoefBuyLevels;
    let endCoefBuyLevels;

    if (numOfOrder.value >= 3 && numOfOrder.value <= 15) {
      const levels = coefLevels[numOfOrder.value];
      startCoefBuyLevels = levels.start;
      endCoefBuyLevels = levels.end;
    }

    const getBaseBuyLevels = (
      end,
      start = buyFirstLevel.value,
      step = buyLevelsDiffCoef.value
    ) =>
      Array.from({
        length: Math.floor(Math.log(end / start) / Math.log(step)) + 2,
      }).map((_, i) => start * step ** i);
    const baseBuyLevels = getBaseBuyLevels(tradeMinPrice.value);

    let baseDiffDirect = [];
    let j; //! fixed bugs of number orders
    if (baseBuyLevels.length !== numOfOrder.value) {
      j = 1;
    } else {
      j = 0;
    }
    for (let i = j; i < baseBuyLevels.length - 1; i++)
      baseDiffDirect[i] = (baseBuyLevels[i] - baseBuyLevels[i + 1]).toFixed(
        priceRound.value
      );

    let baseDiffReverce = baseDiffDirect.reverse();
    baseDiffDirect.push();

    const getCoefBuyLevelsArray = (start, stop, step) =>
      Array.from({ length: (stop - start) / step + 1 }, (value, index) =>
        (start + index * step).toFixed(2)
      );
    const coefBuyLevelsArray = getCoefBuyLevelsArray(
      startCoefBuyLevels,
      endCoefBuyLevels + 0.1,
      buyLevelsCoef.value
    );

    const finalDiffBuyLevels = baseDiffReverce.map(function (number, index) {
      return (number * Number(coefBuyLevelsArray[index])).toFixed(
        priceRound.value
      );
    });

    //* ---------------------------------
    //* <<< BUY-limit-LEVELS >>> RESULT[]
    //* ---------------------------------
    const x = finalDiffBuyLevels;
    const y = buyFirstLevel.value;
    buyLimitLevels = [];
    function currentSubtr(x) {
      x.reduce((subtr, current, i) => {
        return (buyLimitLevels[i] = (subtr - current).toFixed(
          priceRound.value
        ));
      }, y);
    }
    currentSubtr(x);
    buyLimitLevels.unshift(buyFirstLevel.value);

    //* -------------------------------
    //* <<< BUY-order-$ >>> BUYLIMIT []
    //* -------------------------------
    const buyOrderNext = (
      firstOrderCost.value *
      coefNextOrderCost.value ** numOfOrder.value
    ).toFixed(2);

    const xBuyOrders = (
      end,
      start = firstOrderCost.value,
      step = coefNextOrderCost.value
    ) =>
      Array.from({
        length: Math.floor(Math.log(end / start) / Math.log(step)),
      }).map((_, numOfOrder) => start * step ** numOfOrder);
    let xBuyOrdersArray = xBuyOrders(buyOrderNext);
    xBuyOrdersArray = xBuyOrdersArray.map(function (each_element) {
      return Number(each_element.toFixed(2));
    });

    let k; //! fixed bugs of number orders
    if (xBuyOrdersArray.length !== numOfOrder.value) {
      k = 1;
    } else {
      k = 0;
    }
    const buyOrders = (
      end,
      start = firstOrderCost.value,
      step = coefNextOrderCost.value
    ) =>
      Array.from({
        length: Math.floor(Math.log(end / start) / Math.log(step)) + k,
      }).map((_, numOfOrder) => start * step ** numOfOrder);
    buyOrdersArray = buyOrders(buyOrderNext);
    buyOrdersArray = buyOrdersArray.map(function (each_element) {
      return Number((each_element * 1.001).toFixed(2)); //! * 1.001 ??
    });

    //* ------------------------------------
    //* <<< BUY-order-$ SUM $ >>> Buy$SUM []
    //* ------------------------------------
    const s = buyOrdersArray;
    sumBuyOrders;
    let sumBuyOrdersList;
    function currentSum(s) {
      sumBuyOrders = [];
      s.reduce((sum, current, i) => {
        return (sumBuyOrders[i] = sum + current);
      }, 0);
      sumBuyOrders = sumBuyOrders.map(function (each_element) {
        return Number(each_element.toFixed(2));
      });
      sumBuyOrdersList = sumBuyOrders.join(" ");
    }
    currentSum(s);

    //* ----------------------------------
    //* <<< amountOrder >>> AMOUNTORDER []
    //* ----------------------------------
    amountBuyOrders = buyOrdersArray.map(function (number, index) {
      return +(number / Number(buyLimitLevels[index])).toFixed(
        loteRound.value
      );
    });

    //* -------------------------------------
    //* <<< Amount orders SUM >>> Amnt SUM []
    //* -------------------------------------
    const a = amountBuyOrders;
    sumAmountOrders;
    function amountSum(a) {
      sumAmountOrders = [];
      a.reduce((sum, current, i) => {
        return (sumAmountOrders[i] = sum + current);
      }, 0);
      sumAmountOrders = sumAmountOrders.map(function (each_element) {
        return Number(each_element.toFixed(3));
      });
    }
    amountSum(a);

    //* -------------------------------
    //* <<< Buy Zero levels >>> Zero []
    //* -------------------------------
    buyZeroLevels = sumBuyOrders.map(function (number, index) {
      return +(number / sumAmountOrders[index]).toFixed(priceRound.value);
    });

    //* -------------------------------------
    //* <<< SELL-order-levels >>> LEVELFIX []
    //* -------------------------------------
    let sellLevels = [];
    for (let i = 0; i < numOfOrder.value; i++) {
      sellLevels.push(buyZeroLevels[i] * (gridSize.value / 100));
    }
    sellLevelsArray = buyZeroLevels.map(function (number, index) {
      return +(number + sellLevels[index]).toFixed(priceRound.value);
    });

    //* -----------------------------------
    //* <<< Take profit - $ >>> PROFIT $ []
    //* -----------------------------------
    const totalSellOrders = sellLevelsArray.map(function (number, index) {
      return (number * Number(sumAmountOrders[index])).toFixed(2);
    });

    totalProfit = totalSellOrders.map(function (number, index) {
      return +(number - Number(sumBuyOrders[index])).toFixed(2);
    });

    function saveTable(date, symbol) {
      const table = {
        date,
        symbol,
        data: {
          numOfOrderKeys: [...numOfOrderKeys.value],
          buyLimitLevels: [...buyLimitLevels.value],
          buyOrdersArray: [...buyOrdersArray.value],
          sumBuyOrders: [...sumBuyOrders.value],
          amountBuyOrders: [...amountBuyOrders.value],
          sumAmountOrders: [...sumAmountOrders.value],
          buyZeroLevels: [...buyZeroLevels.value],
          sellLevelsArray: [...sellLevelsArray.value],
          totalProfit: [...totalProfit.value],
        },
      };
      savedTables.value.push(table);

      // Clear current table after saving
      numOfOrderKeys.value = [];
      buyLimitLevels.value = [];
      buyOrdersArray.value = [];
      sumBuyOrders.value = [];
      amountBuyOrders.value = [];
      sumAmountOrders.value = [];
      buyZeroLevels.value = [];
      sellLevelsArray.value = [];
      totalProfit.value = [];
    }

    function deleteTable(index) {
      savedTables.value.splice(index, 1);
    }

    return {
      gridFrequence,
      minGridDeposit,
      firstBuyLevelTicks,
      buyFirstLevel,
      tradeMinPrice,
      gridSizeTick,
      buyLevelsDiffCoef,
      numOfOrderKeys,
      baseBuyLevels,
      baseDiffDirect,
      baseDiffReverce,
      coefBuyLevelsArray,
      finalDiffBuyLevels,
      buyLimitLevels,
      buyOrderNext,
      xBuyOrdersArray,
      buyOrdersArray,
      sumBuyOrders,
      amountBuyOrders,
      sumAmountOrders,
      buyZeroLevels,
      sellLevelsArray,
      totalSellOrders,
      totalProfit,
      saveTable,
      deleteTable,
    };
  },
  { persist: true }
);
