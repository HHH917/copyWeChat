<template>
	<image
		:src="src"
		lazy-load
		:style="imageStyle"
		class="rounded"
		:class="imageClass"
		@click="$emit('click')"
		@load="loadImage"
	></image>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default: ''
		},
		imageClass: {
			type: String,
			default: ''
		},
		maxWidth: {
			type: Number,
			default: 500 //rpx
		},
		maxHeight: {
			type: Number,
			default: 500 //rpx
		}
	},
	data() {
		return {
			h: 100,
			w: 100
		};
	},
	computed: {
		imageStyle() {
			return `width:${this.w}rpx;height:${this.h}rpx;`;
		}
	},
	methods: {
		// 加载图片
		loadImage(e) {
			let w = e.detail.width;
			let h = e.detail.height;
			// 最大宽度 px;
			let maxW = uni.upx2px(this.maxWidth);

			// if (w <= maxW) {
			// 	// 用原来的宽高
			// 	this.w = w;
			// 	this.h = h;
			// 	return;
			// }
			// this.w = maxW;
			// this.h = maxW * (h / w);
			// 最大高度
			let maxH = uni.upx2px(this.maxHeight);
			if (h <= maxH) {
				// 用原来的宽高
				this.w = w <= maxW ? w : maxW;
				this.h = h;
				this.$emit('load', {
					w: this.w,
					h: this.h
				});
				return;
			}
			this.h = maxH;
			let w2 = maxH * (w / h);
			this.w = w2 <= maxW ? w2 : maxW;
			this.$emit('load', {
				w: this.w,
				h: this.h
			});
		}
	}
};
</script>

<style></style>
