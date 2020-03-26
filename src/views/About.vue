<template>
  <div class="container">
    <a-card>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-statistic-countdown
            title="Countdown"
            :value="deadline"
            @finish="onFinish"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="12">
          <a-statistic-countdown
            title="Million Seconds"
            :value="deadline"
            format="HH:mm:ss:SSS"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="24" style="margin-top: 32px;">
          <a-statistic-countdown title="Day Level" :value="deadline" format="D 天 H 时 m 分 s 秒" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        deadline: Date.now() + 1000 * 30,
      };
    },
    methods: {
      onFinish() {
        console.log('finished!');
      }
    },
  };
</script>
<style scoped>
.container {
  width: 400px;
  margin: 0 auto;
}
</style>