<script setup>
import LogoItem from './layouts/LogoItem.vue';
</script>

<template>
	<div clas="">
		<div class="flex justify-between">
			<div>
				<LogoItem />
			</div>
			<div class="flex justify-between text-sm">
				<div class="text-center">
					<div class="">Bybit</div>
					<RouterLink :to="{ name: 'MarginTrade' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Margin |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'FullCode' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> CODE</span>
					</RouterLink>
				</div>
			</div>
		</div>
		<hr class="border-green-600 mt-2">
	</div>
</template>