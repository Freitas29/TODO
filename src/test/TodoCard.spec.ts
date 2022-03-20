import TodoCard from "../components/TodoCard.vue"
import { flushPromises, mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from "vitest"
import { faker } from "@faker-js/faker"

const factory = (options: MountingOptions<any> = {}) => mount(TodoCard, {
   ...options,
})

const label = faker.lorem.words(2);


describe("Todo Card",  () => {
    it("Should show label",  () => {

        const wrapper =  factory({
            props: {
                label,
                checkValue: false
            }
        })

        const p = wrapper.find('[data-test="label"]')

        expect(p.text()).toBe(label)
    })


    it("Should emit event when click in checkbox", async () => {
        const wrapper = factory({
            props: {
                label,
                checkValue: false
            }
        })

        const checkbox = wrapper.find('[data-test="check"]')

        checkbox.trigger("click")

        await flushPromises()

        expect(wrapper.emitted()['update:checkValue'][0]).toEqual([true])
    })
})