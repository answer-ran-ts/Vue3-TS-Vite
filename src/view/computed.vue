<template>
    <div>
        <input type="text" v-model="firstName">
        <input type="text" v-model="lastName">
        {{ allName }}
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
const firstName = ref('Michael')
const lastName = ref('Jordan')

const allName = computed(() => {
    return firstName.value + '.' + lastName.value
})
// interface Props {
//     msg?: string
//     labels?: string[]
// }
// const props = withDefaults(defineProps<Props>(), {
//     msg: 'hello',
//     labels: () => ['one', 'two']
// })
</script>


<style lang="scss" scoped>

</style>
