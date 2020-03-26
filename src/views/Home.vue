<template>
  <div style="padding: 100px">
    <el-calendar v-model="value"
                 v-on:click="test"></el-calendar>
    <el-row :gutter="20">
      <el-col :span="8">1</el-col>
      <el-col :span="8">
        <span v-text="getCurrentDate.year"></span>
        <span v-text="`-${getCurrentDate.month > 10 ? getCurrentDate.month + 1 : `0${getCurrentDate.month + 1}`}`"></span>
      </el-col>
      <el-col :span="8"
              style="text-align: right">
        <el-button-group size="mini">
          <el-button size="mini"
                     type="default"
                     @click="setMonth('prev')">上个月</el-button>
          <el-button size="mini"
                     type="default"
                     @click="setMonth('next')">下个月</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <div class="el-calendar">
      <ul class="header flex">
        <li v-for="(day, i) of 7"
            :key="i"
            v-text="day"
            class="item"></li>
      </ul>
      <ul class="el-calendar__row flex">
        <li
          v-for="(day, sub) of visibleDay"
          :key="sub"
          :class="['item', currentMonthStyle(day)]"
          @click="consoles(day)"
        >
          <!-- <el-button icon="el-icon-plus" circle size="mini" class="add"></el-button> -->
          <el-link icon="el-icon-plus" class="add" :underline="false"></el-link>
          <p>{{new Date(day).getDate()}}</p>
          <ol class="task-list" ref="wrapper">
            <li v-for="(item, i) of 10"
              :key="i" class="task-item">asdfas</li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import utils from '@/utils/base'
import GeminiScrollbar from 'vue-gemini-scrollbar'
Vue.use(GeminiScrollbar)
export default {
  data() {
    return {
      value: new Date(),
      data: 42,
      getCurrentDate: {},
      ops: {
        vuescroll: {
          mode: 'slide',
          sizeStrategy: 'percent',
          detectResize: false
        },
        scrollPanel: {
          initialScrollY: true,
          initialScrollX: true,
          scrollingX: false,
          scrollingY: true,
          speed: 100,
          easing: undefined,
          verticalNativeBarPos: 'right',
          maxHeight: 54
        },
        bar: {
          background: '#c1c1c1'
        },
        scroller: {
          // bouncing: false,
          /** Enable locking to the main axis if user moves only slightly on one of them at start */
          locking: true,
          maxZoom: 1
        }
      }
    }
  },
  computed: {
    visibleDay() {
      let { year, month } = utils.getYearMonthDay(
        utils.getDate(
          this.getCurrentDate.year,
          this.getCurrentDate.month,
          this.getCurrentDate.day
        )
      )
      // 通过当前年，月获取当前月的第一天
      let currentMonthFirstDay = utils.getDate(year, month, 1)
      // 获取当前月第一天是星期几
      // debugger
      let weekDay = currentMonthFirstDay.getDay() || 7
      let startDay = currentMonthFirstDay - (weekDay - 1) * 1000 * 60 * 60 * 24
      let arr = []
      // 循环42天
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    }
  },
  created() {
    this.getCurrentDate = utils.getYearMonthDay()
  },
  mounted() {
    let arrArr = this.$refs.wrapper
    this.arr = []
    arrArr.map(el => {
      this.arr.push(new Vue.$geminiScrollbar({
        element: el,
        autoshow: true
      }).create())
    })
  },
  methods: {
    test(a) {
      console.log(a)
    },
    calendar(a) {
      console.log(a)
    },
    consoles(day) {
      this.getCurrentDate = utils.getYearMonthDay(day)
    },
    setMonth(type) {
      let date = utils.getDate(
        this.getCurrentDate.year,
        this.getCurrentDate.month,
        this.getCurrentDate.day
      )
      if (type === 'next') {
        date.setMonth(date.getMonth() + 1)
      } else {
        date.setMonth(date.getMonth() - 1)
      }
      this.getCurrentDate = utils.getYearMonthDay(date)
    },
    currentMonthStyle(date) {
      // debugger
      let { year: cy, month: cm, day: cd } = utils.getYearMonthDay(
        utils.getDate(
          this.getCurrentDate.year,
          this.getCurrentDate.month,
          this.getCurrentDate.day
        )
      )
      let { year, month, day } = utils.getYearMonthDay(date)
      return cy === year && cm === month ? 'current-mon' : 'disabled'
    }
  }
}
</script>
<style lang="scss" scoped>
.el-calendar {
  width: 100%;
  .header {
    li {
      padding: 20px 0;
    }
  }
  .el-calendar__row {
    border: 1px solid #ebeef5;
    & > li {
      height: 85px;
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      padding: 0 8px;
      &:nth-of-type(7n) {
        border-right: none;
      }
      &:nth-last-child(1),
      &:nth-last-child(2),
      &:nth-last-child(3),
      &:nth-last-child(4),
      &:nth-last-child(5),
      &:nth-last-child(6),
      &:nth-last-child(7) {
        border-bottom: none;
      }
      p {
        padding: 5px 10px;
        margin: 0;
      }
      &.disabled {
        p {
          color: #c0c4cc;
        }
      }
      &.item {
        position: relative;
      }
      .add {
        display: none;
        position: absolute;
        top: 5px;
        right: 5px;
      }
      &:hover {
        .add {
          display: block;
        }
      }
      &.disabled {
        &:hover {
          .add {
            display: none;
          }
        }
      }
      .task-list {
        max-height: 44px;
        padding: 0;
        overflow-y: auto;
        .task-item {
          background: #eaf7ff;
          list-style-type: none;
          cursor: pointer;
          &:hover {
            background: #c1e9fe;
          }
          & + li {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
.flex {
  font-size: 0;
  margin: 0;
  padding: 0;
  .item {
    display: inline-block;
    width: 14.28571428571429%;
    font-size: 14px;
  }
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
