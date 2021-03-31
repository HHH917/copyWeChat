<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS-NVUE
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
			    'fontFamily': "iconfont",
			    'src': "url('https://at.alicdn.com/t/font_1365296_vumpzwvr0z.ttf')"
			});
			// #endif
			// 初始化录音管理器
			this.$store.commit('initRECORD');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style >
	/*每个页面公共css */
	@import "./common/free.css";
	@import "@/common/common.css";
	/* #ifndef APP-PLUS-NVUE */
	@import "@/common/free-icon.css"
	/* #endif*/
</style>
