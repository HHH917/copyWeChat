<template>
	<!-- 导航栏 -->
	<view>
		<view  :class="getClass">
			<!-- 状态栏 -->
			<view :style="'height:' + statusBarHeight + 'px'"></view>
			<!-- 导航 -->
			<view class=" w-100 flex align-center justify-between" style="height: 90rpx;">
				<!-- 左边 -->
				<view class="flex align-center">
					<!-- 返回按钮 -->
					<free-icon-button v-if="showBack" @click="back" :icon="'\ue60d'"></free-icon-button>
					<!-- 标题 -->
					<text v-if="title" class="font-md ml-3">
						<!-- <slot name="title"></slot> -->
						{{getTitle}}
					</text>
				</view>
				<!-- 右边 -->
				<view class="flex align-center">
					<slot name="right">
						<free-icon-button @click="search" :icon="'\ue6e3'"></free-icon-button>
						<free-icon-button @click="openExtend" :icon="'\ue682'"></free-icon-button>
					</slot>
				</view>
			</view>
		</view>

		<!-- 占位 -->
		<view v-if="fixed" :style="fixedStyle"></view>
		<!-- 扩展菜单 -->
		<free-popup ref="extend" :bodyWidth="320" :bodyHeight="525" bodyBgColor="bg-dark" transformOrigin="right top">
			<view class="flex flex-column" style="width: 240rpx; height:525rpx;">
				<view class="flex-1 flex align-center" hover-class="bg-hover-dark" v-for="(item,index) in menus" :key="index"
				 @click="clickEvent(item.event)">
					<text class="iconfont pl-3 pr-2 font-md text-white">{{item.icon}}</text>
					<text class="font-md  text-white">{{item.name}}</text>
				</view>
			</view>
		</free-popup>
	</view>
</template>

<script>
	import freeIconButton from '@/components/free-ui/free-icon-button.vue'
	import freePopup from "@/components/free-ui/free-popup.vue"
	export default {
		props: {
			showBack:{
				type:Boolean,
				default:false
			},
			title: {
				type: [String, Boolean],
				default: false
			},
			fixed: {
				type: Boolean,
				default: true
			},
			noreadnum: {
				type: Number,
				default: 0
			},
			bgColor:{
				type:String,
				default:"bg-light"
			}
		},
		components: {
			freeIconButton,
			freePopup
		},
		data() {
			return {
				statusBarHeight: 0, //状态栏
				navBarHeight: 0, //导航栏高度
				menus: [{
						name: "发起群聊",
						event: "",
						icon: "\ue633"
						// icon: "&#xe633;"
					}, {
						name: "添加朋友",
						event: "",
						icon: "\ue65d"
					},
					{
						name: "扫一扫",
						event: "",
						icon: "\ue614"
					},
					{
						name: "收付款",
						event: "",
						icon: "\ue667"
					},
					{
						name: "帮助与反馈",
						event: "",
						icon: "\ue61c"
					},
				],
			}
		},
		mounted() {
			// #ifdef APP-PLUS-NVUE
			this.statusBarHeight = plus.navigator.getStatusbarHeight();
			console.log('this.statusBarHeight', this.statusBarHeight);
			// #endif
			this.navBarHeight = this.statusBarHeight + uni.upx2px(90);
		},
		computed: {
			fixedStyle() {
				return `height:${this.navBarHeight}px`
			},
			getTitle() {
				let noreadnum = this.noreadnum > 0 ? '(' + this.noreadnum + ')' : '';
				return this.title + noreadnum;
			},
			getClass() {
				let fixed = this.fixed ? 'fixed-top' : ''
				return `${fixed} ${this.bgColor}`;

			}
		},
		methods: {
			openExtend() {
				this.$refs.extend.show(uni.upx2px(415), uni.upx2px(150));
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
		// onLoad() {
		// 	// #ifdef APP-PLUS-NVUE
		// 	this.statusBarHeight = plus.navigator.getStatusbarHeight();
		// 	// console.log('this.statusBarHeight', this.statusBarHeight);
		// 	// #endif
		// }
	}
</script>

<style>
	@import '@/common/free.css';
	@import '@/common/common.css';
	/* #ifndef APP-PLUS-NVUE */
	@import '@/common/free-icon.css';
	/* #endif*/
</style>
