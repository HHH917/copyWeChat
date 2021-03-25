<template>
	<view hover-class="bg-hover-light"
	@click="$emit('click')"
	 class="flex align-center justify-center" 
	 style="height: 90rpx;width: 90rpx;">
	 <text class="iconfont font-md">{{icon}}</text>
	 </view>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: ''
		},
	},
};
</script>

<style></style>
