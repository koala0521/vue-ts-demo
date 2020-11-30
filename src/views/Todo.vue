<!--
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-11-30 11:08:44
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
						@toggleCompleted="toggleCompleted(todo)"
						@removeSelf="removeTodo(index)"
						@edit="editTodo($event, todo)"
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
	private todos: Item[] = []

	private curTodos: Item[] = []
	private currentView: string = 'all'


	// get 标识计算属性
	// 全选状态
	get checkedAll() {
		return !!this.todos.length && this.todos.every((el) => el.completed)
	}	
	// 未完成任务
	get remaining() {
		return this.todos.filter((el) => !el.completed)
	}

	@Emit()
	protected createTodo() {

		if ( !this.newTodoTitle.trim() ) {
			return
		}
		
		this.todos.push({
			title: this.newTodoTitle,
			completed: false,			
		})
		this.newTodoTitle = ''
	}
	
	@Emit()
	protected toggleAll() {
		
		const state = this.checkedAll

		this.todos.forEach((el) => {
			el.completed = !state
		})
	}
	
	@Emit()
	protected toggleCompleted(todo: Item) {
		todo.completed = !todo.completed
	}

	@Emit()
	protected editTodo( val: string, todo: Item) {
		todo.title = val
	}
	
	@Emit()	// 删除任务
	protected removeTodo(index: number) {		
		this.todos.splice(index, 1)
	}

	@Emit() // 清除已完成
	protected clearCompleteds() {	
		this.todos = this.todos.filter((el) => !el.completed )
		this.filterTodos(this.currentView)
	}	

	@Emit()
 	private filterTodos(id: string) {

		switch (id) {
			case 'active':

			this.curTodos = this.todos.filter((el) => !el.completed)
			break
			case 'completed':

			this.curTodos = this.todos.filter((el) => el.completed)
			break

			default:

			this.curTodos = this.todos
			break
		}
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
	
		this.currentView = id
		this.filterTodos(this.currentView)
	}		

}
</script>


