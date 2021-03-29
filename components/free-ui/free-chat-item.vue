<template>
	<div @longpress="long">
		<!-- 时间 -->
		<view
			v-if="showTime"
			class="flex align-center justify-center pb-4 pt-2"
		>
			<text class="font-sm text-light-muted">{{ showTime }}</text>
		</view>
		<!-- 撤回消息 -->
		<view
			v-if="item.isremove"
			ref="isremove"
			class="flex align-center justify-center pb-4 pt-1 chat-animate"
		>
			<text class="font-sm text-light-muted">你撤回了一条信息</text>
		</view>
		<!-- 气泡 -->
		<view
			v-else
			:class="!isselft ? 'justify-start' : 'justify-end'"
			class="flex align-start  position-relative mb-3"
		>
			<!-- 好友 -->
			<template v-if="!isselft">
				<free-avater size="70" :src="item.avatar"></free-avater>
				<text
				v-if="hasLabelClass"
					class="iconfont text-white font-md position-absolute chat-left-icon"
				>
					&#xe609;
				</text>
			</template>

			<div
				:class="labelClass"
				class=" p-2 rounded "
				style="max-width:500rpx"
			>
				<!-- 文字 -->
				<text v-if="item.type === 'text'" class="font-md">
					{{ item.data }}
				</text>
				<!-- 表情包 | 图片 -->
				<image
					v-else-if="item.type === 'emoticon' || item.type === 'image'"
					:src="item.data"
					lazy-load
					style="width: 300rpx; height: 300rpx;"
					mode="widthFix"
					class="rounded"
					@click="preview(item.data)"
				></image>
			</div>
			<!-- 本人 -->
			<template v-if="isselft">
				<text
				v-if="hasLabelClass"
					class="iconfont text-chat-item font-md position-absolute chat-right-icon"
				>
					&#xe640;
				</text>
				<free-avater size="70" :src="item.avatar"></free-avater>
			</template>
		</view>
	</div>
</template>

<script>
import freeAvater from '@/components/free-ui/free-avater.vue';
import $Time from '@/common/free-lib/time.js';
// #ifdef APP-PLUS-NVUE
const animation = weex.requireModule('animation');
// #endif
export default {
	components: {
		freeAvater
	},
	props: {
		item: Object,
		index: Number,
		// 上一条消息的时间戳
		pretime: [Number, String]
	},
	computed: {
		//是否是本人
		isselft() {
			// 获取本人id (假设拿到了)
			let id = 1;
			return this.item.user_id === id;
		},
		// 显示的时间
		showTime() {
			return $Time.getChatTime(this.item.create_time, this.pretime);
		},
		//是否需要气泡样式
		hasLabelClass(){
			return this.item.type === 'text' || this.item.type === "aduio";
		},
		// 气泡的样式
		labelClass(){
			let label = this.hasLabelClass? 'bg-chat-item mr-3':'mr-3'
			return this.isselft ? label : 'bg-white ml-3'
		}
	},
	mounted() {
		this.$watch('item.isremove', (newVal, oldVal) => {
			if (newVal) {
				// #ifdef APP-PLUS-NVUE
				this.$nextTick(() => {
					animation.transition(
						this.$refs.isremove,
						{
							styles: {
								opacity: 1
							},
							duration: 100, //ms
							timingFunction: 'ease',
							delay: 0 //ms
						},
						function() {
							console.log('动画执行结束');
						}
					);
				});
				// #endif
			}
		});
	},
	methods: {
		// 预览图片
		preview(url){
			this.$emit('preview',url);
			// uni.previewImage({
			// 	current:url,
			// 	urls:[url]
			// })
		},
		// 长按事件
		long(e) {
			let x = 0;
			let y = 0;
			// #ifdef APP-PLUS-NVUE
			if (
				Array.isArray(e.changedTouches) &&
				e.changedTouches.length > 0
			) {
				x = e.changedTouches[0].screenX;
				y = e.changedTouches[0].screenY;
			}
			// #endif
			// #ifdef H5
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
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
};
</script>

<style scoped>
.chat-left-icon {
	left: 80rpx;
	top: 20rpx;
}

.chat-right-icon {
	right: 80rpx;
	top: 20rpx;
}
.chat-animate {
	/* #ifdef APP-NVUE */
	opacity: 0;
	/* #endif */
}
</style>
