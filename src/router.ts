/*
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-11-30 11:07:45
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/src/router.ts
 */
import Vue from 'vue'
import Router from 'vue-router'
import Todo from './views/Todo.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',

	base: process.env.BASE_URL,
	routes: [
		{
			path: '/:id',
			name: 'todo',
			component: Todo,
		},
		{
			path: '/',
			redirect: '/all',
		},
	],
})
