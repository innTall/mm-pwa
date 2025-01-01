<script setup>
import LogoItem from './layouts/LogoItem.vue';
import html2canvas from "html2canvas";
const captureScreenshot = async () => {
	try {
		// Select the area to capture (entire body in this case)
		const screenshotElement = document.body;

		// Capture the screenshot
		const canvas = await html2canvas(screenshotElement);
		const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

		// Send the image to the Telegram channel
		await sendScreenshotToTelegram(imageBlob);
	} catch (error) {
		console.error("Error capturing screenshot:", error);
	}
};

const sendScreenshotToTelegram = async (imageBlob) => {
	const botToken = "7892152117:AAGg6Dfh47y8pFlV-iHI2xa3gi0Vrbrwe6g";
	const chatId = "@mtradelong"; // Include the "@" symbol for channels
	const formData = new FormData();

	formData.append("chat_id", chatId);
	formData.append("photo", imageBlob, "screenshot.png");

	try {
		const response = await fetch(
			`https://api.telegram.org/bot${botToken}/sendPhoto`,
			{
				method: "POST",
				body: formData,
			}
		);

		if (!response.ok) {
			throw new Error("Failed to send screenshot to Telegram.");
		}
		console.log("Screenshot sent to Telegram successfully.");
	} catch (error) {
		console.error("Error sending screenshot:", error);
	}
};
</script>

<template>
	<div clas="">
		<div class="flex justify-between">
			<div>
				<LogoItem />
			</div>
			<div class="flex gap-3 ">
				<button @click="captureScreenshot" class="bg-gray-700 text-blue-500 px-2 text-sm rounded shadow hover:bg-gray-500">
					Scr
				</button>
				<div class="flex justify-between text-sm">
					<div class="text-center">
						<div class="">Bybit</div>
						<RouterLink :to="{ name: 'MarginTrade' }" v-slot="{ isActive }">
							<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Margin </span>
						</RouterLink>
					</div>
				</div>
			</div>
		</div>
		<hr class="border-green-600 mt-2">
	</div>
</template>