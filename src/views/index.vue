<template>
  <div id="index">
    <div class="header">
      <div class="navCtn">
        <div class="leftCtn">
          <div class="companyCtn">
            <div class="logo">
              <img :src="logo" />
            </div>
            <div class="name">织为云后台</div>
          </div>
          <zh-nav :data="navData"
            maxLength="7">
          </zh-nav>
        </div>
        <div class="rightCtn">
          <div class="selectCtn">
            <el-dropdown @command="commondHandler"
              trigger="click">
              <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="sendMsg">发布通知</el-dropdown-item> -->
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                <!-- divided -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="breadCtn">
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) in breadUrl"
            :key="index"><span class="breadText"
              @click="goBack(index)">{{item}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div> -->
    <div class="titleCtn">
      <div class="title">
        {{$route.name}}
      </div>
    </div>
    <div class="body">
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: require('@/assets/image/logo/logo.png'),
      total: 0,
      changePasPopupFlag: false,
      oldPasd: '',
      firstPasd: '',
      lastPasd: '',
      navData: [
        {
          name: '客户管理',
          children: [
            {
              name: '添加客户',
              url: '/client/clientCreate'
            },
            {
              name: '客户列表',
              url: '/client/clientList'
            }
          ]
        },
        {
          name: '生产流转码',
          url: '/productFlowCode/productFlowCode'
        },
        {
          name: '数据统计',
          url: '/dataInfo/dataInfoDetail'
        },
        {
          name: '系统设置',
          url: '/setting/settingMeau'
        },
        {
          name: '系统通知',
          children: [
            {
              name: '发布通知',
              url: '/systemMsg/systemMsgSend'
            },
            {
              name: '通知列表',
              url: '/systemMsg/systemMsgList'
            }
          ]
        },
        {
          name: '使用教程',
          url: '/tutorialSystem/tutorialSystemList'
        }
      ]
    }
  },
  methods: {
    commondHandler (cmd) {
      if (cmd === 'sendMsg') {
        this.$router.push('/other/sendMsg')
      } else if (cmd === 'logout') {
        // logout().then((res) => {
        //   if (res.data.status) {
        //     window.sessionStorage.setItem('zhbms_token', '')
        //     window.sessionStorage.setItem('user_id', '')
        //     window.sessionStorage.setItem('company_id', '')
        //     window.localStorage.setItem('zhUsername', '')
        //     this.$message.success('已退出登录')
        //   } else {
        //     this.$message.error(res.data.message)
        //   }
        //   this.$router.push('/login')
        // })
        // } else if (cmd === 'sendMsg') {

        // } else if (cmd === 'changePas') {
        //   this.changePasPopupFlag = true
        this.$router.push('/login')
        window.sessionStorage.setItem('zhbms_token', '')
      }
    },
    goBack (index) {
      if (index < (this.breadUrl.length - 1)) {
        if (index === 0) {

        } else {
          this.$router.go(index - (this.breadUrl.length - 1))
        }
      }
    },
    closePopup () {
      this.changePasPopupFlag = false
    },
    changePasd () {
      if (!this.oldPasd) {
        this.$message.error('请输入原密码')
        return
      }
      if (!this.firstPasd || !this.lastPasd) {
        this.$message.error('请输入新密码')
        return
      }
      if (this.firstPasd !== this.lastPasd) {
        this.$message.warning('请确认输入的密码一致')
      } else {
        changeUserPasd({
          old_pass: this.oldPasd,
          new_pass: this.firstPasd
        }).then(res => {
          if (res.data.status !== false) {
            this.$message.success('修改密码成功，请重新登录')
            // this.commondHandler('logout')
            this.$router.push('/login')
          }
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/index.less";
</style>
