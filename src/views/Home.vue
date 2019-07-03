<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"/>
    <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  data() {
    return {
      obj: {
        name: 'yee',
        age: 30,
        sex: 'male',
        waif: {
          name: 'zhang',
          age: 28
        }
      }
    }
  },
  mounted() {
    localStorage.setItem('info', JSON.stringify(this.obj))
    window.console.log(JSON.parse(localStorage.getItem('info')))
  },
  components: {
    HelloWorld
  }
}
</script>
