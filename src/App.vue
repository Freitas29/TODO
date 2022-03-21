<template>
  <div class="todo">
    <main class="todo__body">

    <div class="todo__virtual_scroll">

      <TodoCard v-for="todo in todoList" :label="todo.name" v-model:checkValue="todo.check" data-test="todo"/>

    </div>
      <form class="todo__form">
        <div class="todo__footer">
          <div class="todo_footer-input">
            <InputText data-test="task" :class="{'p-invalid': v$.taskName.$error}" id="task" type="text" v-model="taskName" class="todo__input" @keydown.enter.prevent="handleAddTodo" />
          </div>
          <Button data-test="send" @click="handleAddTodo" label="Submit" icon="pi pi-send" iconPos="right" />
        </div>
       
      </form>
      
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive,  toRefs, UnwrapRef } from 'vue'
import Button from 'primevue/button';
import InputText from "primevue/inputtext"
import Divider from 'primevue/divider';

import { useTodoStore } from './stores/todo';
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import TodoCard from './components/TodoCard.vue';

interface IModel {
  taskName: string
}

export default defineComponent({
  components: {
    Button,
    InputText,
    Divider,
    TodoCard
},
  setup() {
    
    const model: UnwrapRef<IModel> = reactive({
      taskName: ""
    })

     const rules: Record<keyof IModel, any> = {
      taskName: { required, minLength: minLength(1) }
    }

     const v$ = useVuelidate(rules, model)


    const todoStore = useTodoStore()

    const addTodo = todoStore.addTodo

    const countTodo = todoStore.countTodo

    const todoList = computed(() => todoStore.todos)

    const resetValidation = () => v$.value.$reset()

    const invalidForm = computed(() => v$.value.$invalid)

    const handleAddTodo = () => {
      if(invalidForm.value) {
        v$.value.$touch()
        return
      }

      addTodo({
        id: (countTodo + 1).toString(),
        check: false,
        name: model.taskName
      })

      model.taskName = ""

      resetValidation()
    }

    return {
      ...toRefs(model),
      handleAddTodo,
      todoList,
      v$
    }
  }
})
</script>
<style lang="less">
* {
  font-family: var(--font-family);
}
body {
 margin: 0;
 padding: 0;
  background-color: var(--surface-200);
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--surface-300);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--surface-400);
}

.todo {
  height: 100vh;
  padding: 16px 60px;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
 

  .todo__body {
    background-color: var(--surface-50);
    width: 80%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 9px 12px 19px 13px var(--surface-300);
    padding: 16px;
    position: relative;
    

    .todo__virtual_scroll {
      display: grid;
      grid-auto-rows: 90px;
      gap: 16px;
      height: 80vh;
      overflow-y: auto;
      padding: 8px;
    }


    .todo__form {
      height: 20%;
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      padding: 16px;
      display: flex;
      align-items: end;


      .todo__footer {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 130px;
        gap: 8px;
      }

      .todo__input {
        width: 100%;
      }
    }
  }
}
</style>
