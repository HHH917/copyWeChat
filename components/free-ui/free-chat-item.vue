<template>
	<view :class="!isselft ? 'justify-start' : 'justify-end'" class="flex align-start  position-relative mb-3">
		<!-- 好友 -->
		<template v-if="!isselft">
			<free-avater size="70" :src="item.avatar"></free-avater>
			<text class="iconfont text-white font-md position-absolute chat-left-icon">&#xe609;</text>
		</template>

		<div :class="isselft ? 'bg-chat-item mr-3' : 'bg-white ml-3'" class=" p-2 rounded " style="max-width:500rpx">
			<text class="font-md">{{ item.data }}</text>
		</div>
		<!-- 本人 -->
		<template v-if="isselft">
			<text class="iconfont text-chat-item font-md position-absolute chat-right-icon">&#xe640;</text>
			<free-avater size="70" :src="item.avatar"></free-avater>
		</template>
	</view>
</template>

<script>
import freeAvater from '@/components/free-ui/free-avater.vue';
export default {
	components: {
		freeAvater
	},
	props: {
		item: Object,
		index: Number
	},
	computed: {
		//是否是本人
		isselft() {
			// 获取本人id (假设拿到了)
			let id = 1;
			return this.item.user_id === id;
		}
	}
};
</script>

<style>
.chat-left-icon {
	left: 80rpx;
	top: 20rpx;
}
.chat-right-icon {
	right: 80rpx;
	top: 20rpx;
}
</style>
