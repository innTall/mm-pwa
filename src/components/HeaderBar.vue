<script setup>
import LogoItem from './layouts/LogoItem.vue';
</script>

<template>
	<div class="flex justify-between p-1">
		<div>
			<LogoItem />
		</div>
		<div class="flex justify-between gap-5 text-sm">
			<div class="text-center">
				<div class="">Binance</div>
				<RouterLink :to="{ name: 'MarginBinance' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Margin |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'SpotBinance' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Spot</span>
				</RouterLink>
			</div>
			<div class="text-center">
				<div class="">Bitget</div>
				<RouterLink :to="{ name: 'MarginBitget' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Margin |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'SpotBitget' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Spot</span>
				</RouterLink>
			</div>
			<div class="text-center">
				<div class="">Bybit</div>
				<RouterLink :to="{ name: 'MarginBybit' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Margin |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'SpotBybit' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Spot</span>
				</RouterLink>
			</div>
		</div>
	</div>
	<hr class="border-green-600">
</template>