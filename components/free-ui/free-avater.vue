<template>
	<image
		:style="getStyle"
		:class="type"
		:src="src"
		mode="widthFix"
		@click="clickEvent"
	></image>
</template>

<script>
export default {
	props: {
		size: {
			type: [String, Number],
			default: 90
		},
		src: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'rounded'
		},
		clickType: {
			type: String,
			default: 'none'
		}
	},
	computed: {
		getStyle() {
			return `width: ${this.size}rpx; height:  ${this.size}rpx;`;
		}
	},
	methods: {
		clickEvent() {
			switch (this.clickType) {
				case 'navigate':
					uni.navigateTo({
						url: '/pages/mail/user-base/user-base'
					});
					break;
				default:
					this.$emit('click');
					break;
			}
		}
	}
};
</script>

<style></style>
