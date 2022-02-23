<template>
  <div id='clientList'
    class='indexMain'
    v-loading='loading'>
    <div class="module">
      <div class="listCtn">
        <div class="filterCtn">
          <div class="leftCtn">
            <span class="label">筛选条件：</span>
            <el-input class="inputs"
              v-model="keyword"
              placeholder="输入企业按回车键查询">
            </el-input>
            <el-input class="inputs"
              v-model="keyword"
              placeholder="输入企业联系人按回车键查询">
            </el-input>
            <div class="btn btnGray"
              style="margin-left:0"
              @click="reset">重置</div>
          </div>
        </div>
        <div class="list">
          <div class="title">
            <div class="col flex15">
              <span class="text">企业名称</span>
            </div>
            <div class="col">
              <span class="text">联系人</span>
            </div>
            <div class="col">
              <span class="text">联系人电话</span>
            </div>
            <div class="col">
              <span class="text">购买时间</span>
            </div>
            <div class="col">
              <span class="text">到期时间</span>
            </div>
            <div class="col">
              <span class="text">当前状态</span>
            </div>
            <div class="col">
              <span class="text">系统类型</span>
            </div>
            <div class="col middle flex15">
              <span class="text">操作</span>
            </div>
          </div>
          <div class="row"
            v-for="(itemClient,indexClient) in list"
            :key="indexClient">
            <div class="col flex15">{{itemClient.company_name}}</div>
            <div class="col">{{itemClient.contacts}}</div>
            <div class="col">{{itemClient.phone}}</div>
            <div class="col">{{itemClient.start_time ? $getTime(itemClient.start_time) : '∞'}}</div>
            <div class="col">{{itemClient.end_time ? $getTime(itemClient.end_time) : '∞'}}</div>
            <div class="col"
              :class="itemClient.status === 1 ? 'blue' : 'red'">{{itemClient.status_name}}</div>
            <div class="col">{{itemClient.type_name}}</div>
            <div class="col middle flex15">
              <span class="opr blue"
                @click="$router.push('/client/clientDetail/' + itemClient.id)">详情</span>
              <span class="opr change"
                @click="$router.push('/client/clientUpdate/' + itemClient.id)">修改</span>
              <span class="opr delete"
                @click="banClient(itemClient.id)">禁用</span>
            </div>
          </div>
        </div>
        <div class="pageCtn">
          <el-pagination background
            :page-size="10"
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="pages"
            @current-change="getClientList">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { company } from '@/assets/js/api.js'
import { systemType } from '@/assets/js/common.js'
export default {
  data () {
    return {
      loading: true,
      list: [],
      keyword: '',
      pages: 1,
      total: 0
    }
  },
  methods: {
    getClientList () {
      this.loading = true
      company.list({
        page: this.pages,
        limit: 10
      }).then(res => {
        if (res.data.status !== false) {
          this.list = res.data.data.map(item => {
            let systemTypeArr = systemType
            item.type_name = systemTypeArr.find(itemF => itemF.id === +item.type).name || item.type
            item.status_name = item.status === 1 ? '使用中' : '已失效'
            return item
          })
          this.total = res.data.meta.total
        }
        this.loading = false
      })
    },
    reset () {

    },
    banClient (id) {

    }
  },
  created () {
    this.getClientList()
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/less/client/clientList.less";
</style>
