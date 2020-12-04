<!--
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 18:03:00
 * @LastEditTime: 2020-12-04 18:37:09
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/src/components/Item.vue
-->
<template>
  <li :class="{ completed: todo.completed, editing: edit }">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.completed" @change="toggleCheck">
      <label @dblclick="dbclick" >{{todo.title}}</label>
      <button class="destroy" @click="$emit('removeSelf')"></button>
    </div>
    <input ref="input" class="edit" :value="todo.title" @blur="editTodo"  @keyup.enter="editTodo" />
  </li>
</template>

<script lang="ts" >
import { Component, Provide , Emit, Prop, Ref, Vue } from 'vue-property-decorator'


@Component
export default class Item extends Vue {

	//   @Prop(Object) readonly todo!: object

	@Prop({ default: {title: '', complleted: false} }) private readonly todo!: object

	// 相当于 data内部定义的变量
	private edit: boolean = false
	
	// 相当于 Vue 的 ref 语法
	@Ref('input') private readonly input!: HTMLInputElement

	// 相当于 method 内部定义的方法
	@Emit()
    private dbclick() {

        this.edit = true
        this.$nextTick(function() {
            // DOM 现在更新了 
            this.input.focus()
        })         
	}	
	
	@Emit()
    private editTodo(ev: {target: HTMLInputElement}) {
		this.edit = false     

		this.$nextTick(function() {
			// DOM 现在更新了 
			this.input.blur()
		})    		
		this.$emit('edit', (ev.target as any).value)
	}
	
	@Emit()
    private toggleCheck() {
        this.$emit('toggleCompleted')
    }
}
</script>
