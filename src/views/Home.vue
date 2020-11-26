<!--
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-11-26 14:54:27
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/src/views/Home.vue
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
		</header>
		<!--  -->
		<section class="main" v-if="todos.length">
			<input class="toggle-all" type="checkbox" @change="toggleAll" />
			<label for="toggle-all" 
				>Mark all as complete</label
			>
			<ul class="todo-list">

				<div v-for="(todo, index) in todosInView">
					<todo-item
						:todo="todo"
						@toggleCompleted="toggleCompleted( todo )"
						@removeSelf="removeTodo(index)"
					/>
				</div>
			</ul>
		</section>
		<!--  -->
		<!-- <todo-footer
			v-if="todos.length"
			:itemsLeft="remaining.length"
			:currentView="currentView"
			:clearCompleted="clearCompleted"
		/> -->
	</section>
</template>

<script lang="ts">

import { Component, Provide , Emit, Ref, Vue } from 'vue-property-decorator';
import todoFooter from '@/components/Todo-footer.vue'; // @ is an alias to /src
import todoItem from '@/components/Todo-item.vue'; // @ is an alias to /src


// interface 声明数据格式 = 在函数形参位置进行声明格式 = 在变量声明处声明格式
interface Item {
	title: string;
	completed: boolean;
}

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
	
	private newTodoTitle = '';
	private todos: Item[] = [];

	private remaining = [];

	// 计算属性
	get todosInView() {
		return this.todos;
	}
	
	@Emit()
	protected createTodo() {
		
		this.todos.push({
			title: this.newTodoTitle,
			completed: false,			
		});
	}
	
	@Emit()
	protected toggleAll() {
		console.log('2222222');
	}
	
	@Emit()
	protected toggleCompleted(todo: Item) {
		todo.completed = !todo.completed;
	}

	@Emit()
	protected removeTodo(index: number) {		
		this.todos.splice(index, 1);
	}

}

</script>

<style lang="scss">

	.todoapp{

		background: #fff;
		margin: 130px 0 40px 0;
		position: relative;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);		
		
		input::placeholder {
			font-style: italic;
			font-weight: 300;
			color: #e6e6e6;
		}		
		h1{
			// background-color: #fff;
			position: absolute;
			top: -155px;
			width: 100%;
			font-size: 100px;
			font-weight: 100;
			text-align: center;
			color: rgba(175, 47, 47, 0.15);
		}

		.new-todo, .edit {
			position: relative;
			margin: 0;
			width: 100%;
			font-size: 24px;
			font-family: inherit;
			font-weight: inherit;
			line-height: 1.4em;
			border: 0;
			color: inherit;
			padding: 6px;
			border: 1px solid #999;
			box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
			box-sizing: border-box;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			outline: none;
		}	
		
		.new-todo {
			padding: 16px 16px 16px 60px;
			border: none;
			background: rgba(0, 0, 0, 0.003);
			box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
		}		

		.main {
			position: relative;
			z-index: 2;
			border-top: 1px solid #e6e6e6;
		}			

		.toggle-all, .todo-list li .toggle {
			background: none;
		}
		.toggle-all {
			text-align: center;
			border: none;
			opacity: 0;
			position: absolute;
		}	

		.toggle-all + label::before {
			content: '❯';
			font-size: 22px;
			color: #e6e6e6;
			padding: 10px 27px 10px 27px;
		}

		.toggle-all + label {
			width: 60px;
			height: 34px;
			font-size: 0;
			position: absolute;
			top: -52px;
			left: -13px;
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}	

		.todo-list {
			margin: 0;
			padding: 0;
			list-style: none;

			.todo-list li {
				position: relative;
				font-size: 24px;
				border-bottom: 1px solid #ededed;
			}			
		}			
						
	}	

	.todo-list li .toggle {
		height: 40px;
	}
	.toggle-all, .todo-list li .toggle {
		background: none;
	}
	.todo-list li .toggle {
		opacity: 0;
	}
	.todo-list li .toggle {
		text-align: center;
		width: 40px;
		height: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto 0;
		border: none;
		-webkit-appearance: none;
		appearance: none;
	}

	.todo-list li .toggle + label {
		background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: center left;
	}
	.todo-list li label {
		word-break: break-all;
		padding: 15px 15px 15px 60px;
		display: block;
		line-height: 1.2;
		transition: color 0.4s;
	}		

	.todo-list li .destroy {
		display: none;
		position: absolute;
		top: 0;
		right: 10px;
		bottom: 0;
		width: 40px;
		height: 40px;
		margin: auto 0;
			margin-bottom: auto;
		font-size: 30px;
		color: #cc9a9a;
		margin-bottom: 11px;
		transition: color 0.2s ease-out;
	}
	button {
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		font-size: 100%;
		vertical-align: baseline;
		font-family: inherit;
		font-weight: inherit;
		color: inherit;
		-webkit-appearance: none;
		appearance: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.todo-list li .destroy::after {
		content: '×';
	}

	// .todo-list li .edit {
	// 	display: none;
	// }
	.new-todo, .edit {
		position: relative;
		margin: 0;
		width: 100%;
		font-size: 24px;
		font-family: inherit;
		font-weight: inherit;
		line-height: 1.4em;
		border: 0;
		color: inherit;
		padding: 6px;
		border: 1px solid #999;
		box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}	

</style>
