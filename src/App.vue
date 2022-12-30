

<template>
  {{ test }}
  {{ name }}
  {{ age }}
  <button @click="change">修改</button>
  <HelloWorld msg="Vite + Vue" />
  <Computed />
</template>

<script setup lang="ts">
import { ref, toRef, reactive } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Computed from '@/view/computed.vue'
const test = reactive({
  name: "test",
  age: 20
})
const change = () => {
  test.name = "change"
}
const toRefs = <T extends object>(object: T) => {
  const map: any = {}
  for (const key in object) {
    map[key] = toRef(object, key)
  }
  return map
}
const { name, age } = toRefs(test)
console.log(name, age);

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
