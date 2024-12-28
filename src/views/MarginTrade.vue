<script setup>
import OptionsBar from '../components/OptionsBar.vue';
import MarginSymbols from '../components/MarginSymbols.vue';
import OrdersBlock from '../components/OrdersBlock.vue';
import KlinesBybit from '../api/KlinesBybit.vue';
import CandlesChart from '../components/CandlesChart.vue';
</script>

<template>
	<div class="flex flex-col h-full">
		<OptionsBar />
		<MarginSymbols class="flex-shrink-0" />
		<OrdersBlock class="" />
		<KlinesBybit class="flex-shrink-0" />
		<div class="flex-1">
			<CandlesChart />
		</div>
	</div>
</template>
<style scoped></style>