<template>
  <div>
    <h1>login success --- {{ userName }}</h1>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
import bus from '@/components/eventBus.js'

export default {
  name: 'Home',
  data() {
    return {
      userName: '11'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    initUserInfo() {
      // console.log('yes')
      bus.$on('share', val => {
        console.log(val)
        console.log(this.userName)
        this.userName = val
        console.log(this.userName)
        console.log(val + '1')
      })
    }
  },

  created() {
    this.initUserInfo()
  }
}
</script>

<style lang="less" scoped></style>
