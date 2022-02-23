<template>
  <div class='indexMain'
    id='messageDetail'>
    <div class="module">
      <div class="titleCtn">
        <span class="title">通知详情</span>
      </div>
      <div class="detailCtn">
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">通知内容：</span>
            <span class="text">
              <span class="title_msg">标题</span>
              <span class="content_msg">fjaiojfokdaj;lfjakf;djla<br />fkdaljflka</span>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">通知时间：</span>
            <span class="text">2019-03-23</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">通知人：</span>
            <span class="text">后台管理员</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">通知对象：</span>
            <span class="text">
              <template v-for="(item,index) in detail">
                <span class="client_name"
                  :key="index + 'client'">{{item.client_name}}</span>
                <span class="userCtn"
                  :key="index + 'user'">
                  <span class="tag_page"
                    v-for="(itemU,indexU) in item.user"
                    :key="indexU">
                    {{itemU}}
                  </span>
                </span>
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from '@/assets/js/api.js'
export default {
  data () {
    return {
      detail: {
        receive_user: []
      }
    };
  },
  created () {
    message.detail({
      id: this.$route.params.id
    }).then(res => {
      if (res.data.status !== false) {
        this.detail = res.data.data
      }
    })
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/systemMsg/messageDetail.less";
</style>
