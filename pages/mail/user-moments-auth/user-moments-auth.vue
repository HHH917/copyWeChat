<template>
	<view class="page">
		<!-- 导航栏 -->
		<free-nav-bar title="设置朋友圈动态权限" showBack :showRight="false"></free-nav-bar>
		<free-list-item showRight :showLeftIcon="false" :showRightIcon="false" title="不让他看我">
			<switch slot="right" :checked="false" color="#08C060" @change="" />
		</free-list-item>
		<free-list-item showRight :showLeftIcon="false" :showRightIcon="false" title="不看他">
			<switch slot="right" :checked="false" color="#08C060" @change="" />
		</free-list-item>
	</view>
</template>

<script>
import freeNavBar from '@/components/free-ui/free-nav-bar.vue';
import freeListItem from '@/components/free-ui/free-list-item.vue';
export default {
	components: {
		freeNavBar,
		freeListItem
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
