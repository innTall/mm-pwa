<script setup>
</script>

<template>
	<div class="flex justify-between px-2 py-1">
		<div class="text-center">
			<p class="">Bybit</p>
			<div class="">
				<RouterLink :to="{ name: 'BybitMarginMM' }"> MM |</RouterLink>
				<RouterLink :to="{ name: 'BybitMarginResult' }"> Result |</RouterLink>
			</div>
		</div>
	</div>
</template>