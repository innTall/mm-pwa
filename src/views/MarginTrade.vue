<script setup>
import OptionsBar from '../components/OptionsBar.vue';
import MarginSymbols from '../components/MarginSymbols.vue';
import OrdersBlock from '../components/OrdersBlock.vue';
import MarginTrade from '../components/MarginOrder.vue';
</script>

<template>
	<div class="">
		<OptionsBar />
		<MarginSymbols />
		<OrdersBlock />
		<MarginTrade />
	</div>
</template>
<style scoped></style>