<template>
  <div class='indexMain'
    id='messageSend'>
    <div class="module">
      <div class="titleCtn">
        <span class="title">发布通知</span>
      </div>
      <div class="editCtn">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">通知级别</span>
            </span>
            <span class="content row_item">
              <!-- <el-input placeholder="请输入标题"
                v-model="messageTitle"></el-input> -->
              <div class="status_tag"
                :class="{'active':message_type === '普通'}"
                @click="message_type='普通'">普通</div>
              <div class="status_tag warn"
                :class="{'active':message_type === '重要'}"
                @click="message_type='重要'">重要</div>
              <div class="status_tag error"
                :class="{'active':message_type === '紧急'}"
                @click="message_type='紧急'">紧急</div>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">通知标题</span>
            </span>
            <span class="content">
              <el-input placeholder="请输入标题"
                v-model="messageTitle"></el-input>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <div class="editMessageContent"
              ref="editMessageContent"></div>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">通知对象</span>
            <span class="content">
              <el-cascader v-model="sendMsgUser"
                :options="userArr"
                placeholder="请选择通知对象"
                :props="{multiple:true}"
                collapse-tags
                filterable
                :show-all-levels='false'
                clearable></el-cascader>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray">返回</div>
          <div class="btn btnBlue"
            @click="sendMessageToUsers">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { company, message } from '@/assets/js/api.js'
import { systemType } from '@/assets/js/common.js'
import E from 'wangeditor'
export default {
  data () {
    return {
      loading: true,
      messageTitle: '',
      sendMsgUser: [],
      message_type: '普通',
      userArr: systemType.map(itemM => {
        return {
          value: itemM.id,
          label: itemM.name,
          children: []
        }
      }),
      chooseUsers: [],
      userInnerInfo: {
        checkedAll: true,
        userArr: [],
        pages: 1,
        total: 1
      },
      wangeditor: null
    };
  },
  methods: {
    sendMessageToUsers () {
      let sendUsersData = this.sendMsgUser.map(item => item[1])
      let data = {
        title: this.messageTitle,
        type: this.message_type,
        // router_url: null,
        content: this.wangeditor.txt.html(),
        tag: '版本更新公告',
        receive_company: sendUsersData,
        // is_system: 1
      }
      message.create({
        ...data
      }).then(res => {
        if (res.data.status !== false) {
          this.$message.success('发送成功')
        }
      })
    }
  },
  created () {
    Promise.all([
      company.list()
    ]).then(res => {
      res[0].data.data.forEach(itemF => {
        const finded = this.userArr.find(itemFd => +itemFd.value === +itemF.type)
        if (finded) {
          finded.children.push({
            value: itemF.id,
            label: itemF.company_name
          })
        }
      })
      // this.userArr = res[0].data.data
    })
  },
  mounted () {
    this.wangeditor = new E(this.$refs.editMessageContent)
    this.wangeditor.customConfig.uploadImgShowBase64 = true
    this.wangeditor.create()
  },
};
</script>

<style lang="less">
.el-cascader__dropdown {
  z-index: 2021 !important;
}
</style>
<style lang="less" scoped>
@import "~@/assets/less/systemMsg/messageSend.less";
</style>
