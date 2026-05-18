<template>
  <Editor
    :value="value"
    :plugins="plugins"
    @change="handleChange"
    :mode="mode"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { ref, defineProps, withDefaults } from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
  //添加mode变量
  mode?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  //向父级组件也提交mode变量
  mode: () => "",
  handleChange(v: string) {
    console.log(v);
  },
});

const plugins = [gfm(), highlight()];
//暂时注释掉
// const value = ref("");
// const handleChange = (v: string) => {
//   value.value = v;
// };
</script>
<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
