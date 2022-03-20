import { defineStore  } from "pinia";

export interface ITodo {
    id: string
    name: string
    check: boolean
}

export interface ITodoStore {
    todos: ITodo[]
}


export const useTodoStore = defineStore('todo', {
 state: (): ITodoStore => ({
    todos: []
 }),
 actions: {
    addTodo(newTodo: ITodo) {
        this.todos = [...this.todos, newTodo]
    }
 },
 getters: {
     countTodo: (state): number => state.todos.length 
 }
})