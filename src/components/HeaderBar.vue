<script setup>
</script>

<template>
	<div class="flex justify-between px-2 py-1">
		<div class="text-center">
			<p class="">Bybit</p>
			<div class="">
				<RouterLink :to="{ name: 'BybitMarginMM' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> MM |</span>
				</RouterLink>
				<RouterLink :to="{ name: 'BybitMarginResult' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Result</span>
				</RouterLink>
			</div>
		</div>
		<div class="text-center">
			<p class="">Bybit/Binance</p>
			<div class="">
				<RouterLink :to="{ name: 'GridOptions' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Grid</span>
				</RouterLink>
			</div>
		</div>
		<div class="text-center">
			<p class="">Bybit</p>
			<div class="">
				<RouterLink :to="{ name: 'BybitSpotResult' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Result</span>
				</RouterLink>
			</div>
		</div>
		<div class="text-center">
			<p class="">Binance</p>
			<div class="">
				<RouterLink :to="{ name: 'BinanceSpotResult' }" v-slot="{ isActive }">
					<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Result</span>
				</RouterLink>
			</div>
		</div>
	</div>
	<hr class="border-green-600">
</template>