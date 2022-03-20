import { setActivePinia, createPinia } from 'pinia'
import { ITodo, useTodoStore } from "./todo"
import { faker } from "@faker-js/faker"

import { expect, describe, beforeEach, it } from 'vitest'

const todoList: ITodo[] = [...Array(2)].map(() => ({ 
    check: false,
    id: faker.datatype.uuid(),
    name: faker.lorem.words(2)
 }))

describe("Todo Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it("Should add a todo", () => {
        const store = useTodoStore()

        expect(store.todos).toHaveLength(0)

        store.addTodo({
            id: faker.datatype.uuid(),
            check: false,
            name: faker.lorem.words(2)
        })

        expect(store.todos).toHaveLength(1)
    })

    it("Should count todo list", () => {
        const store = useTodoStore()

        store.todos = todoList

        expect(store.countTodo).toBe(2)
    })

    it("Should create a todo in sequence", () => {
        const store = useTodoStore()

        store.todos = todoList

        expect(store.countTodo).toBe(2)

        const newTodo = {
            id: faker.datatype.uuid(),
            check: false,
            name: faker.lorem.words(2)
        }

        store.addTodo(newTodo)

        expect(store.todos).toEqual([...todoList, newTodo])
    })
})