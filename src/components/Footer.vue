<!--
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-11-27 17:02:03
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/src/components/Footer.vue
-->
<template>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ itemsLeft }}</strong> left
      </span>
      <ul class="filters">
        <li><router-link to="/all" :class="{ selected: currentView == 'all'}">All</router-link></li>
        <li><router-link to="/active" :class="{ selected: currentView == 'active'}">Active</router-link></li>
        <li><router-link to="/completed" :class="{ selected: currentView == 'completed'}">Completed</router-link></li>
      </ul>
      <button class="clear-completed" @click="$emit('clearCompleted')" >Clear completed</button>
    </footer>
</template>

<script>

export default {
	props: ['itemsLeft', 'currentView'],
}
</script>
