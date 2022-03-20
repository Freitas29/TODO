<template>
    <div class="todo__card">
        <div class="todo__check">
          <Checkbox v-model="check" :binary="true" />
          <p>{{label}}</p>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Checkbox from 'primevue/checkbox';

interface IProps {
    label: string
    checkValue: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits<{
    (e: "update:checkValue", value: boolean): void
}>()


const check = ref(props.checkValue)

watch(() => check.value, () => {
    emit("update:checkValue", check.value)
})

watch(() => props.checkValue, () => {
    check.value = props.checkValue
})
    
</script>
<style lang="less" scoped>
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
</style>