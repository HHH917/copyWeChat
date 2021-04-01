<template>
	<view
		class="bg-white flex align-stretch"
		hover-class="bg-light"
		@click="onClick"
	>
		<view
			v-if="showLeftIcon"
			class="flex align-center justify-center py-2 pl-3"
		>
			<slot name="icon"></slot>
			<image
				v-if="cover"
				:src="cover"
				mode="widthFix"
				:style="coverStyle"
			></image>
		</view>

		<view
			class="flex-1 border-bottom flex align-center pr-3 py-3 pl-3 justify-between"
		>
			<slot>
				<text class="font-md text-dark">{{ title }}</text>
			</slot>
			<view class="flex align-center" v-if="showRight">
				<slot name="right"></slot>
				<!-- 右箭头 -->
				<text
					v-if="showRightIcon"
					class="iconfont text-light-muted font-md "
				>
					&#xe60c;
				</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 封面
		cover: {
			type: String,
			default: ''
		},
		// 封面大小
		coverSize: {
			type: [String, Number],
			default: 75
		},
		// 标题
		title: {
			type: String,
			default: ''
		},
		// 显示右边
		showRight: {
			type: Boolean,
			default: false
		},
		// 显示左边图标
		showLeftIcon: {
			type: Boolean,
			default: true
		},
		// 显示右边图标
		showRightIcon: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
			console.log('点击事件');
		}
	},
	computed: {
		coverStyle() {
			return `width: ${this.coverSize}rpx;height: ${this.coverSize}rpx;`;
		}
	}
};
</script>

<style>
@import '@/common/free.css';
@import '@/common/common.css';
/* #ifndef APP-PLUS-NVUE */
@import '@/common/free-icon.css';
/* #endif*/
</style>
