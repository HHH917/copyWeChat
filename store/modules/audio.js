export  default {
	state:{
		// 存放全局事件
		events:[]
	},
	mutations:{
		//注册全局事件
		regEvent(state,event){
			console.log('注册全局事件');
			state.events.push(event);
		},
		// 执行全局事件
		doEvent(state,params){
			console.log('执行全局事件');
			state.events.forEach(e=>{
				e(params);
			})
		},
		// 注销事件
		removeEvent(state,event){
			let index = state.events.findIndex(item =>{
				return item === event
			});
			if(index !== -1){
				state.events.splice(index,1);
			}
		}
	},
	actions:{
		// 分发注册全局事件
		audioOn({commit},event){
			commit('regEvent',event)
		},
		// 分发执行全局事件
		audioEmit({commit},params){
			commit('doEvent',params);
		},
		audioOff({commit},event){
			commit('removeEvent',event);
		}
	}
}