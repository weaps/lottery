<template>
  <div class="select">
    <div class="inner"
         v-clickOut="test">
      <div class="inputWrapper"
           @click="showOptions = !showOptions">
        <input type="text"
               readonly
               placeholder="请选择菜品"
               :value="selected">
        <span class="iconfont icon-zhankaishangxia"></span>
      </div>
      <ul class="options"
          v-show="showOptions">
        <li v-for="(item, index) in options"
            :key="index"
            @click="choose(item.value)">{{item.value}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '西红柿鸡蛋'
        },
        {
          value: '青椒抱鸡蛋'
        },
        {
          value: '回锅肉'
        },
        {
          value: '宫保鸡丁'
        },
        {
          value: '地三鲜'
        }
      ],
      selected: '',
      showOptions: false
    }
  },
  methods: {
    choose(name) {
      this.showOptions = false
      if (name !== this.selected) {
        this.selected = name
        this.$emit('selected', name)
      }
    },
    outsideDirec() {
      this.showOptions = false
    },
    test() {
      debugger
      this.showOptions = false
    },
    example2() {
      return 'xxx'
    }
  },
  directives: {
    clickOut: {
      bind: function(el, binding) {
        function handler(e) {
          if (el.contains(e.target)) return false
          if (binding.expression) {
            binding.value()
          }
        }
        el.handler = handler
        document.addEventListener('click', el.handler)
      },
      unbind: function(el) {
        document.removeEventListener('click', el.handler)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$size: 14px;
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.ul,
ol,
li {
  list-style: none;
}
.inner {
  position: relative;
  margin: 0 auto;
  width: 200px;
  height: 30px;
  font-size: $size;
  border: 1px solid #dddee1;
  border-radius: 3px;
  .inputWrapper {
    width: 100%;
    height: 100%;
    > input {
      width: 85%;
      height: 100%;
      padding-left: 10px;
      border: none;
      cursor: pointer;
    }
  }
  > .options {
    position: absolute;
    left: 0;
    right: 0;
    top: 120%;
    padding: 10px 0;
    background-color: #fff;
    box-shadow: 0 0 4px #ddd;
    border-radius: 3px;
    overflow: auto;
    > li {
      padding: 3px 10px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>