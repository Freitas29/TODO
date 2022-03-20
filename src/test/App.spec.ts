import { flushPromises, mount, MountingOptions, VueWrapper } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import App from "../App.vue"
import { createTestingPinia } from '@pinia/testing'
import { useTodoStore } from "../stores/todo"
import { faker } from "@faker-js/faker"

describe("App", () => {
    const factory =  (options: MountingOptions<any> = {}) => mount(App, {
        global: {
            plugins: [createTestingPinia()],            
        },
        ...options,
     })

     const findTodoList = (wrapper: VueWrapper<any>) => wrapper.findAllComponents('[data-test="todo"]')

     const findInput = (wrapper: VueWrapper<any>) => wrapper.find('[data-test="task"]')

     const findSend = (wrapper: VueWrapper<any>)  =>  wrapper.find('[data-test="send"]')

    it("Should show todo list", async () => {
        const wrapper = factory()

        const store = useTodoStore()

        const todos = findTodoList(wrapper)

        expect(todos).toHaveLength(0)

        store.todos = [{
            check: false,
            id: faker.datatype.uuid(),
            name: faker.lorem.words(2)
        }]

        await flushPromises()

        expect(findTodoList(wrapper)).toHaveLength(1)
    })

    it("Should create a todo typing in input", async () => {
        const wrapper = factory()
        
        const store = useTodoStore()

        const todos = findTodoList(wrapper)
        
        expect(todos).toHaveLength(0)

        const input = findInput(wrapper)

        const newTaskName = faker.lorem.word()

        input.setValue(newTaskName)

        await flushPromises()

       findSend(wrapper).trigger("click")
        
        await flushPromises()     

        expect(store.addTodo).toHaveBeenCalledTimes(1)

        expect(store.addTodo).toHaveBeenLastCalledWith({
            id: "1",
            name: newTaskName,
            check: false
        })
    })

    it("Should show message error when input is empty", async () => {
        const wrapper = factory()

        const store = useTodoStore()

        findSend(wrapper).trigger("click")

        await flushPromises()

        expect(store.addTodo).toHaveBeenCalledTimes(0)

        expect(findInput(wrapper).classes()).toContain('p-invalid')
    })
})