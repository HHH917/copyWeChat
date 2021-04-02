<template>
	<view class="main-bg-color  rounded mr-3 px-2 py-1" hover-class="" @click="$emit('click')">
		<text class="font text-white ">{{ name }}</text>
	</view>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: ''
		}
	}
};
</script>

<style></style>
