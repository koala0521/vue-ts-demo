<!--
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 18:03:00
 * @LastEditTime: 2020-11-26 20:05:38
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

<script >

// import { Component, Provide , Emit, Vue } from 'vue-property-decorator';

export default {
  props: ['todo'],
  data() {
      return {
        edit: false,
      };
  },
  methods: {
    dbclick() {

        this.edit = true;
        this.$nextTick(function() {
            // DOM 现在更新了 
            this.$refs.input.focus();
        });         
    },
    editTodo(ev) {
		this.edit = false;     

		this.$nextTick(function() {
			// DOM 现在更新了 
			this.$refs.input.blur();
		});    		
		this.$emit('edit', ev.target.value);
    },
    toggleCheck(ev) {
        this.$emit('toggleCompleted');
    },
    
  },
};
</script>

<style lang="scss">


    .todo-list li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
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
        left: 0;
		top: 0;
		bottom: 0;
		margin: auto 0;
		border: none;
		-webkit-appearance: none;
		appearance: none;
        background-color: #333;
	}

	.todo-list li .toggle + label {
		background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: center left;
	}

    .todo-list li .toggle:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
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

    .todo-list li:hover .destroy {
        display: block;
    }


	.todo-list li .edit {
		display: none;
	}

	.todo-list li.editing label{
		display: none;
	}    

    .todo-list li.editing .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }    

</style>