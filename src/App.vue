<template>
  <div class="todo">
    <main class="todo__body">

      <div class="todo__card" v-for="todo in todoList" :key="todo.id">
        <div class="todo__check">
          <Checkbox v-model="todo.check" :binary="true" />
          <p>{{todo.name}}</p>
        </div>
        
      </div>

      <Divider />
       
      <form class="todo__form">
        <div class="todo__footer">
          <div class="todo_footer-input">
            <InputText :class="{'p-invalid': v$.taskName.$error}" id="task" type="text" v-model="taskName" class="todo__input" @keydown.enter.prevent="handleAddTodo" />
          </div>
          <Button @click="handleAddTodo" label="Submit" icon="pi pi-send" iconPos="right" />
        </div>
       
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, UnwrapRef } from 'vue'
import Button from 'primevue/button';
import InputText from "primevue/inputtext"
import Divider from 'primevue/divider';
import Checkbox from 'primevue/checkbox';
import { useTodoStore } from './stores/todo';
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

interface IModel {
  taskName: string
}

export default defineComponent({
  components: {
    Button,
    InputText,
    Divider,
    Checkbox
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
    display: grid;
    grid-auto-rows: 90px;
    gap: 16px;

    .todo__card {
      padding: 16px;
      background: var(--surface-200);
      border-radius: 10px;
      box-shadow: 3px 3px 6px -1px var(--surface-300);

      .todo__check {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;
       
        color: var(--text-color);

        p {
          font-family: var(--font-family);
          color: var(--text-color);
          font-weight: 600;
          font-size: 14px;
        }
      }
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
