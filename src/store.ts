/*
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-11-30 12:32:10
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/src/store.ts
 */
import Vue from 'vue'
import Vuex, { ActionContext, ActionTree, MutationTree } from 'vuex'

Vue.use(Vuex)

// interface 声明数据格式
interface Item {
	title: string
	completed: boolean
}

interface State {
	todos: Item[]
	// newTodoTitle: string
	currentView: string
}

const state: State = {
	todos: [],
	// newTodoTitle: '',
	currentView: '',
}

const mutations: MutationTree<State> | undefined = {
	createTodo(states: State, payload: string) {
		if (!payload) return

		states.todos.push({
			title: payload,
			completed: false,
		})
		// states.newTodoTitle = ''
	},

	toggleAll(states: State, payload: boolean) {
		states.todos.forEach((el) => {
			el.completed = !payload
		})
	},

	toggleCompleted(states: State, payload: number) {
		states.todos[payload].completed = !states.todos[payload].completed
	},

	editTodo(states: State, payload: { index: number; newVal: string }) {
		states.todos[payload.index].title = payload.newVal
	},

	removeTodo(states: State, payload: number) {
		states.todos.splice(payload, 1)
	},

	clearCompleteds(states: State) {
		states.todos = states.todos.filter((el) => !el.completed)
	},
	changeCurrentView(states: State, payload: string) {
		states.currentView = payload
	},
}


const actions: ActionTree<any, State> = {
	doCreate(ctx: any, payload: string) {
		ctx.commit('createTodo', payload)
	},
	doToggleAll(ctx: any, payload: boolean) {
		ctx.commit('toggleAll', payload)
	},
	doToggleCompleted(ctx: ActionContext<any, State>, payload: number) {
		ctx.commit('toggleCompleted', payload)
	},
	doEditTodo(
		ctx: ActionContext<any, State>,
		payload: { index: number; newVal: string }
	) {
		ctx.commit('editTodo', payload)
	},
	doRemoveTodo(ctx: ActionContext<any, State>, payload: number) {
		ctx.commit('removeTodo', payload)
	},
	doClearCompleteds(ctx: ActionContext<any, State>) {
		ctx.commit('clearCompleteds')
	},
	doChangeCurrentView(ctx: ActionContext<any, State>, payload: string) {
		ctx.commit('changeCurrentView', payload)
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
