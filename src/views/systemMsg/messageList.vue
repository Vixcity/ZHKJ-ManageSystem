<template>
  <div class='indexMain'
    id='messageList'>
    <div class="module">
      <div class="titleCtn">
        <span class="title">通知列表</span>
      </div>
      <div class="listCtn">
        <div class="filterCtn">
          <div class="leftCtn">
            <span class="label">筛选条件：</span>
            <el-date-picker v-model="date"
              style="width:300px!important"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div class="btn btnGray">重置</div>
          </div>
          <div class="rightCtn">
            <!-- <div class="btn noBorder red noMargin">删除</div>
            <div class="btn noBorder noMargin">清空</div> -->
            <!-- <div class="btn btnWhiteBlue noMargin">管理</div> -->
            <div class="btn btnBlue"
              @click="$router.push('/systemMsg/systemMsgSend')">发布通知</div>
          </div>
        </div>
        <div class="listCtn_page">
          <!-- <div class="row_line"
            v-for="(item,key) in messageList"
            :key="key">
            <div class="row_inner_line"
              @click="goMessageDetail(item)">
              <span class="title"> {{item.title}} </span>
              <span class="info right">{{$getTime(item.created_at)}}</span>
            </div>
            <div class="row_inner_line"
              @click="goMessageDetail(item)">
              <span class="info">{{item.content|filterContent}}</span>
              <span class="info right">{{item.user_name}}</span>
            </div>
          </div> -->
          <el-collapse v-model="activeNames">
            <el-collapse-item title="一致性 Consistency"
              v-for="(item,index) in messageList"
              :key="index"
              :name="item.id">
              <div class="row_line"
                slot="title">
                <!-- <el-checkbox class="checkbox"
                  @click.stop="()=>false"></el-checkbox> -->
                <div class="row_inner_line">
                  <span class="title"> {{item.title}} </span>
                  <span class="info right">{{$getTime(item.created_at)}}</span>
                </div>
                <div class="row_inner_line">
                  <span class="info">{{item.content|filterContent}}</span>
                  <span class="info right">{{item.user_name}}</span>
                </div>
              </div>
              <div class="message_inner_content"
                v-html="item.content"></div>
              <div class="message_inner_notify_users"
                v-for="(itemCom,indexCom) in item.receive_user"
                :key="indexCom">
                <div class="company_name">{{itemCom.company_name}}</div>
                <div class="user_list">
                  <span class="tag_page"
                    v-for="(itemU,indexU) in itemCom.user_list"
                    :key="indexU">
                    {{itemU.user_name}}
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="row_line tip"
            v-if="pages < total/10">
            <span @click="getMessageList">加载更多<em class="el-icon-arrow-down"></em></span>
          </div>
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
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      activeNames: '',
      messageList: [],
      pages: 0,
      total: 1
    };
  },
  methods: {
    getMessageList () {
      this.pages++
      message.list({
        limit: 10,
        page: this.pages,
        start_time: this.date ? this.date[0] : '',
        end_time: this.date ? this.date[1] : ''
      }).then(res => {
        res.data.data.forEach(item => {
          item.receive_user = this.$mergeData(item.receive_user, { mainRule: 'company_name', childrenName: 'user_list' })
        })
        this.messageList.push(...res.data.data)
        this.total = res.data.meta
      })
    },
    goMessageDetail (item) {
      this.$router.push('/systemMsg/systemMsgDetail/' + item.id)
    }
  },
  created () {
    this.getMessageList()
  },
  filters: {
    filterContent (text) {
      if (!text) {
        return ''
      }
      let data = text.split('>').map(item => {
        return item.split('<')
      }).map(item => item[0]).join('')
      return data
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/systemMsg/messageList.less";
</style>
<style lang="less">
#messageList {
  .el-collapse-item__header {
    height: 60px;
  }
}
</style>
