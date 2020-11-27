<!--
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-11-27 18:47:36
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/src/views/Todo.vue
-->
<template>
	<section class="todoapp">
		<header class="header">
			<h1>todos</h1>
			<input
				class="new-todo"
				v-model="newTodoTitle"
				@keyup.enter="createTodo()"
				placeholder="What needs to be done?"
				autofocus
			/>
			<input class="toggle-all" type="checkbox" :checked="checkedAll" />
			<label for="toggle-all" @click="toggleAll"
				>Mark all as complete</label
			>			
		</header>
		<!--  -->
		<section class="main" v-show="todos.length">

			<ul class="todo-list">

				<template v-for="(todo, index) in curTodos">
					<todo-item
						:todo="todo"
						@toggleCompleted="toggleCompleted(index)"
						@removeSelf="removeTodo(index)"
						@edit="editTodo($event, index)"
					/>
				</template>
			</ul>
		</section>
		<!-- 底部 -->
		<template v-show="todos.length" >
			<todo-footer
				v-if="todos.length"
				:itemsLeft="remaining.length"
				:currentView.sync="currentView"
				@clearCompleted="clearCompleteds"
			/>
		</template>

	</section>
</template>

<script lang="ts">
import { Component, Provide , Emit, Ref, Watch, Vue } from 'vue-property-decorator'
import { mapMutations, Action } from 'vuex'
import todoFooter from '@/components/Footer.vue' // @ is an alias to /src
import todoItem from '@/components/Item.vue' // @ is an alias to /src


// interface 声明数据格式 = 在函数形参位置进行声明格式 = 在变量声明处声明格式
interface Item {
	title: string
	completed: boolean
}
const IDS: ReadonlyArray <string> = ['all', 'active', 'completed']

@Component({
	components: {
		todoFooter,
		todoItem,
	},
})

// *  TypeScript的默认访问修饰符是 public。
// * 	1）public声明的属性和方法在类的内部和外部均能访问到。
// * 	2）protected声明的方法和属性只能在类的内部和其子类能访问。
// * 	3）private 声明的方法和属性只能在其类的内部访问。

export default class Home extends Vue {
	
	private newTodoTitle: string = ''

	// get修饰符 ：表示计算属性
	
	get todos() {
		return this.$store.state.todos
	}

	get currentView() {
		return this.$store.state.currentView
	}

	get curTodos() {
		let cur: [] = []
		
		switch (this.currentView) {
			case 'active':

			cur = this.todos.filter((el: Item) => !el.completed)
			break
			case 'completed':

			cur = this.todos.filter((el: Item) => el.completed)
			break

			default:
			cur = this.todos
			break
		}		
		return cur
	}
	// 全选状态
	get checkedAll() {
		return !!this.todos.length && this.todos.every((el: Item) => el.completed)
	}	
	// 未完成任务
	get remaining() {
		return this.todos.filter((el: Item) => !el.completed)
	}

	@Emit()
	protected createTodo() {
		if ( !this.newTodoTitle.trim() ) {
			return
		}
		this.$store.dispatch('doCreate', this.newTodoTitle)
		this.newTodoTitle = ''
	}
	
	@Emit()
	protected toggleAll() {
		
		const state = this.checkedAll
		this.$store.dispatch('doToggleAll', state)
	}
	
	@Emit()
	protected toggleCompleted(index: number) {
		this.$store.dispatch('doToggleCompleted', index)
	}

	@Emit()
	protected editTodo( val: string, index: number) {

		this.$store.dispatch('doEditTodo', {
			index,
			newVal: val,
		})
	}
	
	@Emit()	// 删除任务
	protected removeTodo(index: number) {		
		this.$store.dispatch('doRemoveTodo', index)
	}

	@Emit() // 清除已完成
	protected clearCompleteds() {	

		this.$store.dispatch('doClearCompleteds')
	}		

	// 监听变化
	@Watch('$route', { immediate: true, deep: true })
	private onRouteChange() {
		
		const id = this.$route.params.id
		
		// 检查 id 是否正确
		if ( !IDS.find((el) => el === id )) {
			this.$router.push({
				path: '/all',
			})
			return
		}

		this.$store.dispatch('doChangeCurrentView', id)
	}		

}
</script>


