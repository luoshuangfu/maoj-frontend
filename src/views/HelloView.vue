<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";

const value = ref("");
const onChange = (v: string) => {
  value.value = v;
};
</script>

<template>
  <MdEditor :value="value" :handle-change="onChange" />
  <div id="helloworld">114514神秘代码</div>
</template>

<style scoped></style>
