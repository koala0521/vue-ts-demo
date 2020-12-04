/*
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-12-03 17:47:27
 * @LastEditTime: 2020-12-04 18:36:28
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/tests/unit/example.spec.ts
 */
import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {

	// 现在挂载组件，你便得到了这个包裹器

	const wrapper = shallowMount(Footer, {
		propsData: {
			itemsLeft: 2,
			currentView: 'all',
		},
		stubs: ['router-link'],
	})	

	it('组件参数 temsLeft 值测试 ', async () => {
		
		// 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
		// const vm = wrapper.vm		

		await expect(wrapper.props().itemsLeft).toBe(2)

	})

	it('组件渲染 itemsLeft 测试', async () => {

		await expect(wrapper.html()).toContain('<strong>2</strong>')
	})	


	it('组件参数 currentView 值', async () => {
		await expect(wrapper.props().currentView).toBe('all')
	})

	it('组件参数 currentView 对应的选中状态', async () => {

		const button = await wrapper.findAll('router-link-stub').at(0)
		expect(button.classes('selected')).toBe(true)
	})	
	
})
