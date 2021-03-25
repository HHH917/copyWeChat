<template>
	<!-- #ifdef APP-NVUE -->
	<view :class="item.istop?'bg-light' :'bg-white'" hover-class="bg-light">
		<!-- #endif -->
		<!-- #ifndef APP-PLUS -->
		<view :class="item.istop?'bg-light' :''" hover-class="bg-light">
			<!-- #endif -->
			<div class="flex align-stretch" hover-class="bg-light" @click="onClick" @longpress="long">
				<view style="width: 145rpx;" class="flex align-center justify-center position-relative">
					<free-avater :src='item.avatar' size='92'></free-avater>
					<!-- 消息提示红点 -->
					<free-badge v-if="item.noreadnum >0" :num="item.noreadnum" badgeClass="position-absolute" badgeStyle="top:0rpx;right:15rpx"></free-badge>
				</view>
				<view class="flex flex-column border-bottom flex-1 py-1 pr-3 border-light-secondary">
					<view class="flex align-center justify-between mb-1">
						<text class="font-md">{{item.nickName}}</text>
						<text class="font-sm text-light-muted">{{item.update_time | formatTime}}</text>
					</view>
					<text class="font  text-ellipsis text-light-muted">{{item.data}}</text>
				</view>
			</div>
		</view>

</template>

<script>
	import freeBase from '@/common/mixin/free-base.js'
	import freeAvater from '@/components/free-ui/free-avater.vue'
	import freeBadge from '@/components/free-ui/free-badge.vue'
	export default {
		mixins: [freeBase],
		components: {
			freeAvater,
			freeBadge
		},
		props: {
			item: Object,
			index: Number
		},
		methods: {
			onClick() {
				// this.$emit('click');
				console.log('点击事件')
				uni.navigateTo({
					url:'/pages/chat/chat/chat',
				})
			},
			long(e) {
				let x = 0;
				let y = 0;
				// #ifdef APP-PLUS-NVUE
				if (Array.isArray(e.changedTouches) && e.changedTouches.length > 0) {
					x = e.changedTouches[0].screenX;
					y = e.changedTouches[0].screenY;
				}
				// #endif
				// #ifdef H5
				x = e.changedTouches[0].pageX
				y = e.changedTouches[0].pageY
				// #endif
				// #ifdef  MP
				x = e.detail.x;
				y = e.detail.y;
				// #endif
				this.$emit('long', {
					x,
					y,
					index: this.index
				});
				console.log(e);
			}
		}
	}
</script>

<style>
	@import '@/common/free.css';
	@import '@/common/common.css';
	/* #ifndef APP-PLUS-NVUE */
	@import '@/common/free-icon.css';
	/* #endif*/
</style>
