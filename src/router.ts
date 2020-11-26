/*
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-11-26 18:05:11
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/src/router.ts
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',

	base: process.env.BASE_URL,
	routes: [
		{
			path: '/:id',
			name: 'home',
			component: Home,
		},
		// {
		//   path: '/about',
		//   name: 'about',
		//   // route level code-splitting
		//   // this generates a separate chunk (about.[hash].js) for this route
		//   // which is lazy-loaded when the route is visited.
		//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
		// },
	],
});
