<script setup>

</script>

<template>
	<hr class="border-green-600">
	<div class="text-sm">
		<div class="">
			<RouterLink :to="{ name: 'DepositBinance' }" v-slot="{ isActive }">
				<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']">Deposit</span>
			</RouterLink>
		</div>
	</div>
</template>
<style scoped></style>