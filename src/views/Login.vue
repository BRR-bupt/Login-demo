<template>
  <div class="login-container">
    <Header></Header>

    <div class="main" style="margin-top: 120px">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>

        <el-col :span="6">
          <div class="grid-contentl; bg-purple-light">
            <!-- <div class="login-box">
              <input type="text" placeholder="userName" v-model="userName" />
              <input type="password" placeholder="passWord" v-model="passWord" @keyup.enter="login" />
              <button @click="register">注册</button>
              <button @click="login">登录</button>
            </div> -->
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="账号">
                <el-input v-model="userName" placeholder="userName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="passWord" placeholder="passWord" show-password></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input v-model="security"></el-input>
              </el-form-item>
            </el-form>

            <!-- <div class="button-login">
              <el-link :underline="false" @click="register">还没账号？去注册</el-link>
              <el-button @click="login">登录</el-button>
            </div> -->

            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="10">
                <div class="grid-content bg-purple" style="display: flex; align-items: center">
                  <!-- <el-link :underline="false" @click="register">还没账号？去注册</el-link> -->
                  <el-button type="text" @click="dialogFormVisible = true">还没账号？去注册</el-button>
                </div>
              </el-col>
              <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-button @click="login" style="float: right">登 录</el-button>
                </div>
              </el-col>
            </el-row>

            <el-dialog title="注册表单" width="30%" :visible.sync="dialogFormVisible">
              <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="账号">
                  <el-input v-model="userName" placeholder="userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="passWord" placeholder="passWord" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input v-model="security"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="register" style="float: right">注 册</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>

        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/loginAPI.js'
import { registerAPI } from '@/api/registerAPI.js'
import bus from '@/components/eventBus.js'
import Header from '@/components/Header/Header.vue'

export default {
  name: 'Login',
  components: {
    Header
  },
  data() {
    return {
      userName: '',
      passWord: '',
      labelPosition: 'top',
      security: '',
      dialogFormVisible: false
    }
  },
  methods: {
    async register() {
      console.log('register')
      const { data: res } = await registerAPI(this.userName, this.passWord)
      alert(res.message)
      if (res.status === 0) {
        this.reset()
        this.dialogFormVisible = false
      }
    },
    async login() {
      console.log('login')
      // this.$router.push('/home')
      const { data: res } = await loginAPI(this.userName, this.passWord)
      console.log(res)
      if (res.status === 0) {
        bus.$emit('share', this.userName)
        localStorage.setItem('token', res.token)
        this.$router.push('/home')
      } else {
        alert(res.message)
      }
    },
    reset() {
      this.userName = ''
      this.passWord = ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #3d75b6;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #fff;
}
</style>
