<script setup>
import OptionsBar from '../components/OptionsBar.vue';
import MarginSymbols from '../components/MarginSymbols.vue';
import OrdersBlock from '../components/OrdersBlock.vue';
import KlinesBybit from '../api/KlinesBybit.vue';
</script>

<template>
	<div class="">
		<OptionsBar />
		<MarginSymbols />
		<OrdersBlock />
		<KlinesBybit />
	</div>
</template>
<style scoped></style>