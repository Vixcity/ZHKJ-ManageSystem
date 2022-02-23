<template>
  <div id="login">
    <img class="rightTop"
      :src="require('../assets/image/login/圆圈.png')" />
    <img class="leftBottom"
      :src="require('../assets/image/login/圆圈.png')" />
    <img class="atCenter"
      :src="require('../assets/image/login/线条.png')" />
    <div class="main">
      <div class="title">
        <img :src="require('../assets/image/login/标题.png')" />
      </div>
      <div class="btnList">
        <div class="btn active">登陆</div>
        <div class="btn"
          @click="noOpr">注册</div>
      </div>
      <div class="userName">
        <el-input placeholder="请输入账号"
          v-model="user_name"
          @keydown.enter="goLogin">
          <template slot="prepend">
            <i class="icons el-icon-user"></i>
          </template>
        </el-input>
      </div>
      <div class="password">
        <el-input type="password"
          placeholder="请输入密码"
          v-model="password"
          @keydown.enter="goLogin">
          <template slot="prepend">
            <i class="icons el-icon-lock"></i>
          </template>
        </el-input>
      </div>
      <div class="psdOp">
        <el-checkbox v-model="remPsd">记住密码</el-checkbox>
        <div class="fogotPsd"
          @click="$router.push('/changePsd')">忘记密码？</div>
      </div>
      <div class="subBtn"
        @click="goLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { login } from '@/assets/js/api.js'
export default {
  name: 'home',
  data () {
    return {
      user_name: window.localStorage.getItem('zhBMSUsername') || '',
      password: window.localStorage.getItem('zhBMSPassword') || '',
      remPsd: true
    }
  },
  methods: {
    noOpr () {
      this.$message.warning('暂无注册功能，请联系管理员添加账号')
    },
    // 登录
    goLogin () {
      let _this = this
      login({
        user_name: _this.user_name,
        password: _this.password
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success({
            message: '登录成功',
            duration: 1000
          })
          window.sessionStorage.setItem('zhbms_token', res.data.data.token_type + ' ' + res.data.data.access_token)
          // window.sessionStorage.setItem('user_id', res.data.data.user_id)
          // window.sessionStorage.setItem('user_name', res.data.data.user_name)
          window.localStorage.setItem('zhBMSUsername', _this.user_name)
          if (_this.remPsd) {
            window.localStorage.setItem('zhBMSPassword', _this.password)
          }
          if (_this.$route.query.nextUrl) {
            _this.$router.push(_this.$route.query.nextUrl)
          } else {
            _this.$router.push('/index')
          }
        } else {
          this.$message.error({
            message: res.data.message
          })
          _this.password = ''
        }
      })
    },
    // 注册
    goRegister () {
      this.$message.warning({
        message: '注册功能暂不开放'
      })
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/login.less";
</style>
