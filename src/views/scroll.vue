<template>
  <div class="container">
    <div v-for="(item, index) of 42" :key="index" class="my-scroll-bar">
      <ul>
        <li v-for="(item, i) of 100" v-bind:key="i">{{i}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import GeminiScrollbar from 'vue-gemini-scrollbar'
Vue.use(GeminiScrollbar)
export default {
  name: 'scroll',
  mounted() {
    let dom = document.querySelectorAll('.my-scroll-bar')
    this.arr = []
    Array.from(dom).forEach(el => {
      this.arr.push(new Vue.$geminiScrollbar({
        element: el,
        autoshow: true,
        onReady: () => {
          console.log('onResize')
        },
        ready() {
          console.log('ready')
        }
      }).create())
    })
  },
  props: {
    autoCreate: {
      type: Boolean,
      default: true
    },
    autoshow: {
      type: Boolean,
      default: false
    },
    forceGemini: {
      type: Boolean,
      default: false
    },
    minThumbSize: {
      type: Number,
      default: 20
    }
  },
  beforeDestroy() {
    this.arr.forEach((el, i) => {
      if (el) {
        el.destroy()
      }
    })
    this.arr = null
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  font-size: 0;
}
.my-scroll-bar {
  display: inline-block;
  max-width: 25%;
  border: 1px solid #ddeedd;
  height: 200px;
  margin: 0 20px;
  font-size: 14px;
}
.gm-scrollbar.-vertical {
  background-color: #f0f0f0
}

/* horizontal scrollbar track */
.gm-scrollbar.-horizontal {
  background-color: transparent;
}

/* scrollbar thumb */
.gm-scrollbar .thumb {
  background-color: rebeccapurple;
}
.gm-scrollbar .thumb:hover {
  background-color: fuchsia;
}
</style>
