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
				<free-image
					v-else-if="
						item.type === 'emoticon' || item.type === 'image'
					"
					:src="item.data"
					imageClass="rounded"
					@click="preview(item.data)"
					:maxWidth="500"
					:maxHeight="500"
				></free-image>
				<!-- 音频 -->
				<view
					v-else-if="item.type === 'audio'"
					class="flex align-center"
					@click="openAudio"
				>
					<image
					v-if="isselft"
						:src="
							!audioPlaying
								? '/static/audio/audio3.png'
								: '/static/audio/play.gif'
						"
						style="width: 50rpx;height: 50rpx;"
						class="mx-1"
					></image>
					<text class="font">4'</text>
					<image
					v-if="!isselft"
						:src="
							!audioPlaying
								? '/static/audio/audio3.png'
								: '/static/audio/play.gif'
						"
						style="width: 50rpx;height: 50rpx;"
						class="mx-1"
					></image>
				</view>
				<!-- 视频 -->
				<view v-else-if="item.type ==='video'"
				class="position-relative rounded">
					<free-image
						:src="item.options.poster"
						imageClass="rounded"
						:maxWidth="500"
						:maxHeight="500"
						@load='loadPoster'
					></free-image>
					<text class="iconfont text-white position-absolute"
					 style="font-size: 80rpx; width: 80rpx;height: 80rpx;"
					 :style="posterIconStyle">&#xe737;</text>
				</view>
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
import freeImage from '@/components/free-ui/free-image.vue';
import $Time from '@/common/free-lib/time.js';
import { mapState, mapActions } from 'vuex';
// #ifdef APP-PLUS-NVUE
const animation = weex.requireModule('animation');
// #endif
export default {
	components: {
		freeAvater,
		freeImage
	},
	props: {
		item: Object,
		index: Number,
		// 上一条消息的时间戳
		pretime: [Number, String]
	},
	data() {
		return {
			innerAudioContext: null,
			audioPlaying: false,
			// 默认封面的宽高
			poster:{
				w:100,
				h:100
			}
		};
	},
	computed: {
		...mapState({
			ceshi: state => state.audio.ceshi
		}),
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
		hasLabelClass() {
			return this.item.type === 'text' || this.item.type === 'aduio';
		},
		// 气泡的样式
		labelClass() {
			let label = this.hasLabelClass ? 'bg-chat-item mr-3' : 'mr-3';
			return this.isselft ? label : 'bg-white ml-3';
		},
		// 短视频封面图标位置
		posterIconStyle(){
			let w = this.poster.w / 2 - uni.upx2px(80) / 2;
			let h = this.poster.h / 2 - uni.upx2px(80) / 2;
			return `left:${w}px;top:${h}px;`
		}
	},
	mounted() {
		// 注册全局事件
		if (this.item.type === 'audio') {
			this.audioOn(this.onPlayAudio);
		}
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
	// 组件销毁
	destroyed() {
		if (this.item.type === 'audio') {
			this.audioOff(this.onPlayAudio);
		}
		//销毁音频
		if (this.innerAudioContext) {
			this.innerAudioContext.destroy();
			this.innerAudioContext = null;
		}
	},
	methods: {
		...mapActions(['audioOn', 'audioEmit', 'audioOff']),
		// 加载封面
		loadPoster(e){
			this.poster.w = e.w;
			this.poster.h = e.h;
			
		},
		// 监听播放音频的全局事件
		onPlayAudio(index) {
			// 如果不是当前索引下的音频 停止播放
			if (this.innerAudioContext) {
				if (this.index !== index) {
					this.innerAudioContext.stop();
				}
			}
		},
		// 播放音频
		openAudio() {
			// 通知停止其他音频
			this.audioEmit(this.index);
			if (!this.innerAudioContext) {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.src = this.item.data;
				this.innerAudioContext.play();

				// 监听播放
				this.innerAudioContext.onPlay(() => {
					this.audioPlaying = true;
				});
				// 监听暂停
				this.innerAudioContext.onPause(() => {
					this.audioPlaying = false;
				});
				// 监听停止
				this.innerAudioContext.onStop(() => {
					this.audioPlaying = false;
				});
				// 监听错误
				this.innerAudioContext.onError(() => {
					this.audioPlaying = false;
				});
			} else {
				this.innerAudioContext.stop();
				this.innerAudioContext.play();
			}
		},
		// 预览图片
		preview(url) {
			this.$emit('preview', url);
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
