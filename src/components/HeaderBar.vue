<script setup>
import LogoItem from './layouts/LogoItem.vue';
</script>

<template>
	<div class="flex justify-between px-2 py-1">
		<div>
			<LogoItem />
		</div>
		<div class="text-center">
			<p class="text-xs">Bybit</p>
			<div class="text-sm">
				<RouterLink :to="{ name: 'MarginBybit' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> MM |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'MarginBybitResult' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
				</RouterLink>
			</div>
		</div>
		<div class="text-center">
			<p class="text-xs">Binance</p>
			<div class="text-sm">
				<RouterLink :to="{ name: 'MarginBinance' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> MM |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'MarginBinanceResult' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
				</RouterLink>
			</div>
		</div>
		<div class="text-center">
			<p class="text-xs">Binance</p>
			<div class="text-sm">
				<RouterLink :to="{ name: 'GridBinance' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Grid |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'GridBinanceResult' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
				</RouterLink>
			</div>
		</div>
		<div class="text-center">
			<p class="text-xs">Bybit</p>
			<div class="text-sm">
				<RouterLink :to="{ name: 'GridBybit' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Grid |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'GridBybitResult' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Res</span>
				</RouterLink>
			</div>
		</div>
	</div>
	<hr class="border-green-600">
</template>