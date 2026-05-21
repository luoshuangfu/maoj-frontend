<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                  title="判题条件"
                  :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''"></MdViewer>
              <template #extra>
                <a-space wrap>
                  <a-tag
                      v-for="(tag, index) of question.tags"
                      :key="index"
                      color="green"
                      closable
                  >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <CodeEditor></CodeEditor>
        <a-divider size="0"></a-divider>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
        >提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const router = useRouter();
const question = ref<QuestionVO>();
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

interface Props {
  id: string;
}

const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.doQuestionSumitUsingPost(
      form.value
  );
  if (res.code === 0) {
    Message.success("提交成功");
  } else {
    Message.error("提交失败");
  }
};
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
      props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    Message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
</script>
<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>