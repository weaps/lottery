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
      <ul class="el-calendar__row flex"
          v-loading="calendarLoading">
        <li v-for="(day, sub) of visibleDay"
            :key="sub"
            :class="['calendar__item item', currentMonthStyle(day), {'active': currentActive === sub}]"
            @click="consoles(day)">
          <el-tooltip
            class="item"
            effect="dark"
            content="Top Left 提示文字"
            placement="top">
            <el-link
              icon="el-icon-plus"
              class="add"
              :underline="false"
              @click="addCalendarTask(day)"
            ></el-link>
          </el-tooltip>
          <p>{{new Date(day).getDate()}}</p>
          <ol class="task-list" ref="wrapper">
            <li
              v-for="
                (item, i) of calendarTaskObj[day.getFullYear()] &&
                calendarTaskObj[day.getFullYear()][day.getMonth()] &&
                calendarTaskObj[day.getFullYear()][day.getMonth()][day.getDate()]
              "
              :key="i"
              class="task-item"
            >
              {{item.name}}
            </li>
            <li
              v-if="calendarTaskObj[day.getFullYear()] &&
              calendarTaskObj[day.getFullYear()][day.getMonth()] &&
              calendarTaskObj[day.getFullYear()][day.getMonth()][day.getDate()] &&
              calendarTaskObj[day.getFullYear()][day.getMonth()][day.getDate()].length > 2"
              class="more-task"
              @click="moreTask($event, sub)"
            ><i class="el-icon-more"></i></li>
          </ol>
          <div v-if="currentActive === sub" :class="['more-container', directionStyle]" v-moreTask="closeMoreTask">
            <h3 v-text="new Date(day).getDate()"></h3>
            <ul class="more-container-ul">
              <li
                v-for="
                  (item, i) of calendarTaskObj[day.getFullYear()] &&
                  calendarTaskObj[day.getFullYear()][day.getMonth()] &&
                  calendarTaskObj[day.getFullYear()][day.getMonth()][day.getDate()]
                "
                :key="i"
                class="more-container-item"
              >
                <span v-text="item.name"></span>
                <span class="options">
                  <i class="edit el-icon-edit-outline"></i>
                  <i class="del el-icon-delete"></i>
                </span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!-- 弹框 -->
    <el-dialog title="新建日程" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" size="medium">
        <el-form-item label="日程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="日程时间" :label-width="formLabelWidth">
          <el-time-select
            style="width: 100%"
            v-model="form.time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="选择时间"
            :editable="false"
          >
          </el-time-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="saveCalendarData" size="medium">确 定</el-button>
      </div>
    </el-dialog>
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
      calendarTaskObj: {
        '2020': {
          2: {
            28: [{name: 'test 1'}]
          }
        }
      },
      form: {
        name: '',
        time: ''
      },
      formLabelWidth: '90px',
      dialogFormVisible: false,
      createDate: {},
      calendarLoading: false,
      currentActive: null,
      directionStyle: '',
      el: null,
      styleObject: {}
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
    // let arrArr = this.$refs.wrapper
    // this.arr = []
    // arrArr.map(el => {
    //   this.arr.push(new Vue.$geminiScrollbar({
    //     element: el,
    //     autoshow: true
    //   }).create())
    // })
  },
  directives: {
    moreTask: {
      bind(el, binding) {
        // debugger
        function handler(e) {
          debugger
          if (el.contains(e.target)) return false
          if (binding.expression) {
            binding.value()
          }
        }
        el.handler = handler
        document.addEventListener('click', el.handler)
      },
      unbind(el) {
        document.removeEventListener('click', el.handler)
      }
    }
  },
  methods: {
    closeMoreTask() {
      console.log('closeMoreTask')
      this.currentActive = null
      // debugger
    },
    moreTask(e, index) {
      this.currentActive = index
      let clientY = e.clientY,
          innerHeight = window.innerHeight
      this.directionStyle = innerHeight - clientY > 300 ? 'top' : 'bottom'
      // more-container-ul
      
      this.$nextTick(() => {
        let s = new Vue.$geminiScrollbar({
          element: document.querySelector('.more-container-ul'),
          autoshow: true
        }).create()
      })
      // this.getLiElement(e.target.parentNode)
      // console.log(this.el.clientHeight, e)
      // if (innerHeight - clientY > 300) {
      //   this.styleObject = {
      //     top: `${this.el.clientHeight}px`
      //   }
      // } else {
      //   this.styleObject = {
      //     bottom: `${this.el.clientHeight}px`
      //   }
      // }
    },
    getLiElement(el) {
      if (el.className.includes('calendar__item')) {
        this.el = el
        return false
      }
      this.getLiElement(el.parentNode)
    },
    isShowMoreTask(day) {
      let data = this.returnCalendarTaskData(day)
      console.log(data);
      
    },
    returnCalendarTaskData(day) {
      let arr = []
      let yearData = this.calendarTaskObj[day.getFullYear()]
      if (yearData) {
        let monthData = yearData[day.getMonth()]
        if (monthData) {
          let dayData = monthData[day.getDate()]
          if (dayData) {
            arr = this.calendarTaskObj[day.getFullYear()][day.getMonth()]
          }
        }
      }
      return arr
    },
    addCalendarTask(day) {
      this.dialogFormVisible = true
      let [y, m, d] = [day.getFullYear(), day.getMonth(), day.getDate()]
      this.createDate = { y, m, d }
    },
    saveCalendarData() {
      this.calendarLoading = true
      let [name, time] = [this.form.name.trim(), this.form.time.trim()]
      if (this.calendarTaskObj[this.createDate.y][this.createDate.m][this.createDate.d]) {
        this.calendarTaskObj[this.createDate.y][this.createDate.m][this.createDate.d].unshift({name, time})
      } else {
        this.calendarTaskObj[this.createDate.y][this.createDate.m][this.createDate.d] = [{ name, time }]
      }
      for(let key in this.form) {
        this.form[key] = ''
      }
      this.$nextTick(() => {
        this.calendarLoading = false
        this.dialogFormVisible = false
      })
      console.log(this.calendarTaskObj)
    },
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
    & > .calendar__item {
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
        // font-weight: bold;
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
      &.active {
        background-color: #F2F8FE;
        .task-list {
          .more-task {
            background: #F2F8FE;
          }
        }
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
        position: relative;
        max-height: 58px;
        padding: 0;
        overflow: hidden;
        .task-item {
          background: #eaf7ff;
          list-style-type: none;
          padding: 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          &:hover {
            background: #c1e9fe;
          }
          & + li {
            margin-top: 2px;
          }
        }
        .more-task {
          position: absolute;
          left: 0;
          bottom: 0;
          content: '';
          width: 100%;
          height: 12px;
          line-height: 12px;
          background: #fff;
          z-index: 10;
          text-align: center;
          & > i {
            color: #999;
            font-size: 12px;
            &:hover {
              cursor: pointer;
              color: #409EFF;
            }
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
    float: left;
    width: 14.28571428571429%;
    list-style-type: none;
    font-size: 14px;
    box-sizing: border-box;
  }
  &::after,
  &::before {
    display: table;
    content: '';
  }
  &::after {
    clear: both;
  }
}
.gm-scrollbar.-vertical {
  background-color: #f0f0f0;
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
