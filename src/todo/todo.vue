<template>
    <section class="real-app">
      <!-- 按回车执行 addTodo -->
      <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么？"
      @keyup.enter="addTodo"
      >
      <!-- 向 item 子组件传递 todo -->
      <item 
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="deleteTodo"
      />
      <!-- 向 tabs 组件传递 filter 和 todos -->
      <tabs
       :filter="filter"
       :todos="todos"
       @toggle="toggleFilter"
       @clearAll="clearAllCompleted"
      />
    </section>
</template>


<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";

let id = 0;

export default {
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos() {
      //如果用户选择的为 all 就返回全部 todos 里面的内容
      if (this.filter === "all") {
        return this.todos;
      }
      const completed = this.filter === "completed";
      return this.todos.filter(todo => completed === todo.completed);
    }
  },
  methods: {
    //向 todos 中添加一个对象 并清空输入框
    addTodo(e) {
      if(e.target.value === "") return false;
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      });
      e.target.value = "";
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    },
    toggleFilter(state) {
      this.filter = state;
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>


