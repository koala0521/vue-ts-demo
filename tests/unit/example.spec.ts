/*
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-12-03 17:47:27
 * @LastEditTime: 2020-12-03 19:30:28
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/tests/unit/example.spec.ts
 */
import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
	it('props.itemsLeft ', () => {
		const wrapper = shallowMount(Footer, {
			propsData: {
				itemsLeft: 2,
				currentView: 'all',
			},
			stubs: ['router-link'],
		})

		// expect( wrapper.find('strong').text()).toEqual(2)
		expect(wrapper.props().itemsLeft).toBe(2)
	})
})
