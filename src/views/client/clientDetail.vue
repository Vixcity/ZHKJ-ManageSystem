<template>
  <div class='indexMain'
    id='clientDetail'
    v-loading='loading'>
    <div class="module">
      <div class="titleCtn">
        <span class="title">客户信息</span>
      </div>
      <div class="detailCtn">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">企业名称：</span>
            <span class="text">{{companyInfo.company_name}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">营业执照：</span>
            <span class="text">{{companyInfo.business_license}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">工厂类型：</span>
            <span class="text">
              <span class="btn noBorder"
                @click="showSettingTypePopup = true">设置</span>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">企业简称：</span>
            <span class="text">{{companyInfo.alias}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">订单前缀：</span>
            <span class="text">{{companyInfo.prefix}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">企业地址：</span>
            <span class="text">{{companyInfo.address}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">联系人：</span>
            <span class="text">{{companyInfo.contacts}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">联系号码：</span>
            <span class="text">{{companyInfo.phone}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">登录账号：</span>
            <span class="text">{{companyInfo.user_name}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">购买时间：</span>
            <span class="text">{{$getTime(companyInfo.start_time) || '∞'}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">到期时间：</span>
            <span class="text">{{$getTime(companyInfo.end_time) || '∞'}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">合计金额：</span>
            <span class="text">{{companyInfo.total_price || 0}}元</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">已付金额：</span>
            <span class="text">{{companyInfo.pay_price || 0}}元</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">待付金额：</span>
            <span class="text">{{companyInfo.left_price || 0}}元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">客户用户列表</span>
      </div>
      <div class="listCtn">
        <div class="tableCtnLv2 minHeight5">
          <div class="tb_header">
            <div class="tb_row">姓名</div>
            <div class="tb_row">岗位</div>
            <div class="tb_row">分组</div>
            <div class="tb_row">手机号</div>
            <div class="tb_row middle">操作</div>
          </div>
          <div class="tb_content"
            v-for="(item,index) in companyInfo.user_list[user_pages - 1]"
            :key="index">
            <div class="tb_row">{{item.name}}</div>
            <div class="tb_row">{{item.station_name}}</div>
            <div class="tb_row">{{item.group}}</div>
            <div class="tb_row">{{item.telephone}}</div>
            <div class="tb_row middle">
              <span class="tb_handle_btn orange">修改</span>
              <span class="tb_handle_btn red">禁用</span>
            </div>
          </div>
        </div>
        <el-pagination background
          :page-size="5"
          :current-page.sync="user_pages"
          layout="prev, pager, next"
          :total="user_total">
        </el-pagination>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <div class="btn btnOrange"
            @click="$router.push('/client/clientUpdate/' + $route.params.id)">修改</div>
        </div>
      </div>
    </div>
    <div class="popup"
      v-if="showSettingTypePopup">
      <div class="main">
        <div class="title">
          <span class="text">设置工厂类型</span>
          <span class="el-icon-close"
            @click="showSettingTypePopup = false"></span>
        </div>
        <div class="content">
          <div class="row">
            <span class="label">选择类型：</span>
            <span class="info">
              <el-select v-model="companyType"
                multiple
                placeholder="请选择类型">
                <el-option v-for="item in companyTypeArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </span>
          </div>
        </div>
        <div class="opr">
          <div class="btn btnGray"
            @click="showSettingTypePopup = false">取消</div>
          <div class="btn btnBlue"
            @click="setType">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { company, categoryType } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      companyInfo: {
        user_list: []
      },
      user_pages: 1,
      user_total: 1,
      companyType: '',
      companyTypeArr: [],
      showSettingTypePopup: false
    };
  },
  methods: {
    getDetail () {
      this.loading = true
      company.detail({
        id: this.$route.params.id
      }).then(res => {
        this.companyInfo = res.data.data
        this.user_total = this.companyInfo.user_list.length
        this.companyInfo.user_list = this.$newSplice(this.$clone(this.companyInfo.user_list), 5)
        this.companyType = this.companyInfo.category_list.map(item => item.id + '')
        this.loading = false
      })
    },
    setType () {
      company.setType({
        company_id: this.companyInfo.company_uuid,
        data: this.companyType
      }).then(res => {
        if (res.data.status !== false) {
          this.$message.success('设置成功')
          this.showSettingTypePopup = false
          this.companyType = ''
          this.getDetail()
        }
      })
    }
  },
  created () {
    Promise.all([
      company.detail({
        id: this.$route.params.id
      }),
      categoryType.list()
    ]).then(res => {
      this.companyInfo = res[0].data.data
      this.user_total = this.companyInfo.user_list.length
      this.companyInfo.user_list = this.$newSplice(this.$clone(this.companyInfo.user_list), 5)
      this.companyType = this.companyInfo.category_list.map(item => item.id + '')
      this.companyTypeArr = res[1].data.data.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
      this.loading = false
    })
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/client/clientDetail";
</style>
