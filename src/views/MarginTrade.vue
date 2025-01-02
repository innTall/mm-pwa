<script setup>
import OptionsBar from '../components/OptionsBar.vue';
import MarginSymbols from '../components/MarginSymbols.vue';
import OrdersBlock from '../components/OrdersBlock.vue';
import ChartSettings from '../components/ChartSettings.vue';
import CandlesChart from '../components/CandlesChart.vue';
</script>

<template>
	<div class="flex flex-col h-full">
		<OptionsBar />
		<MarginSymbols class="overflow-x-auto" />
		<OrdersBlock class="overflow-y-auto" />
		<ChartSettings class="" />
		<div class="flex-1">
			<CandlesChart />
		</div>
	</div>
</template>
<style scoped></style>