<script setup>
import LogoItem from './layouts/LogoItem.vue';
import { ref } from 'vue';

const exchanges = [
	{ name: 'Binance', routes: [{ label: 'Margin', name: 'MarginBinance' }, { label: 'Spot', name: 'SpotBinance' }] },
	{ name: 'Bitget', routes: [{ label: 'Margin', name: 'MarginBitget' }, { label: 'Spot', name: 'SpotBitget' }] },
	{ name: 'Bybit', routes: [{ label: 'Margin', name: 'MarginBybit' }, { label: 'Spot', name: 'SpotBybit' }] },
];
</script>

<template>
	<div class="flex justify-between px-2 py-1">
		<div>
			<LogoItem />
		</div>
		<div class="">
			<div class="flex justify-between gap-1">
				<div class="">Margin</div>
				<div class="">
					<RouterLink :to="{ name: 'MarginBybit' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Bybit |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'MarginBybitRes' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
					</RouterLink>
				</div>
				<div class="">
					<RouterLink :to="{ name: 'MarginBinance' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Binance |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'MarginBinanceRes' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
					</RouterLink>
				</div>
				<div class="">
					<RouterLink :to="{ name: 'MarginBitget' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Bitget |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'MarginBitgetRes' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
					</RouterLink>
				</div>
			</div>
			<div class="flex gap-1 justify-between">
				<div class="">Spot</div>
				<div class="">
					<RouterLink :to="{ name: 'SpotBybit' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Bybit |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'SpotBybitRes' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
					</RouterLink>
				</div>
				<div class="">
					<RouterLink :to="{ name: 'SpotBinance' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Binance |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'SpotBinanceRes' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
					</RouterLink>
				</div>
				<div class="">
					<RouterLink :to="{ name: 'SpotBitget' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Bitget |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'SpotBitgetRes' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
	<hr class="border-green-600">
</template>