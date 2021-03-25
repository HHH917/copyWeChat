<template>
	<text class="free-badge bg-danger text-white rounded-circle font-sm position-absolute" :style="badgeStyle" :class="badgeClass">{{num}}</text>
</template>

<script>
	export default {
		props: {
			badgeClass: {
				type: String,
				default: '',
			},
			badgeStyle: {
				type: String,
				default: "",
			},
			num: {
				type: [Number, String],
				default: 0,
			}
		},

	}
</script>

<style scoped>
	.free-badge {
		padding-left: 14rpx;
		padding-right: 14rpx;
		padding-bottom: 6rpx;
		padding-top: 6rpx;
	}
</style>
