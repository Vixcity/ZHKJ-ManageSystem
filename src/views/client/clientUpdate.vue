<template>
  <div class="indexMain"
    id="clientCreate"
    v-loading='loading'>
    <div class="module">
      <div class="titleCtn">
        <div class="title">客户信息</div>
      </div>
      <div class="editCtn">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">企业名称</span>
            </div>
            <div class="content">
              <el-input v-model="client_name"
                placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">企业营业执照号</span>
            </div>
            <div class="content">
              <el-input v-model="client_business_license_num"
                placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">企业简称</span>
            </div>
            <div class="content">
              <el-input v-model="client_alias"
                placeholder="请输入简称"></el-input>
            </div>
          </div>
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">订单前缀</span>
            </div>
            <div class="content">
              <el-input v-model="client_prefix"
                placeholder="请输入前缀"></el-input>
            </div>
          </div>
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">系统类型</span>
            </div>
            <div class="content">
              <el-select v-model="system_type"
                placeholder="请选择系统类型">
                <el-option v-for="item in systemTypeArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <div class="label">
              <span class="text">企业地址</span>
            </div>
            <div class="content">
              <el-input v-model="client_address"
                placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">企业联系人</span>
            </div>
            <div class="content">
              <el-input v-model="client_linkman"
                placeholder="请输入企业联系人名称"></el-input>
            </div>
          </div>
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">联系人电话</span>
            </div>
            <div class="content">
              <el-input v-model="linkman_tel"
                placeholder="请输入联系人电话"></el-input>
            </div>
          </div>
          <!-- <div class="colCtn flex3">
            <div class="label">
              <span class="text">登录账号</span>
            </div>
            <div class="content">
              <el-input v-model="account_number"
                placeholder="请输入登录账号"></el-input>
            </div>
          </div> -->
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">购买时间</span>
            </div>
            <div class="content">
              <el-date-picker v-model="order_time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择购买日期">
              </el-date-picker>
            </div>
          </div>
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">到期日期</span>
            </div>
            <div class="content">
              <el-date-picker v-model="failure_time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择到期日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">合计金额</span>
            </div>
            <div class="content">
              <el-input v-model="total_price"
                placeholder="合计金额">
                <template slot="append">元</template>
              </el-input>
            </div>
          </div>
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">已付金额</span>
            </div>
            <div class="content">
              <el-input v-model="pay_price"
                placeholder="已付金额">
                <template slot="append">元</template>
              </el-input>
            </div>
          </div>
          <div class="colCtn flex3">
            <div class="label">
              <span class="text">待付金额</span>
            </div>
            <div class="content">
              <el-input v-model="wait_pay_price"
                placeholder="待付金额">
                <template slot="append">元</template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <div class="btn btnBlue"
            @click="saveAll">提交</div>
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
      client_name: '',
      client_business_license_num: '',
      // client_legal_person: '',
      client_address: '',
      client_linkman: '',
      linkman_tel: '',
      order_time: this.$getTime(),
      failure_time: '',
      total_price: '',
      pay_price: '',
      wait_pay_price: '',
      client_prefix: '',
      client_alias: '',
      account_number: '',
      system_type: '',
      systemTypeArr: systemType
    }
  },
  methods: {
    saveAll () {
      if (!this.client_name) {
        this.$message.error('请填写企业名称')
        return
      }
      if (!this.client_prefix) {
        this.$message.error('请填写订单前缀')
        return
      }
      if (!this.system_type) {
        this.$message.error('请选择系统类型')
        return
      }
      // if (!this.account_number) {
      //   this.$message.error('请填写登录账号')
      //   return
      // }
      let data = {
        id: this.$route.params.id,
        company_name: this.client_name,
        business_license: this.client_business_license_num,
        address: this.client_address,
        end_time: this.failure_time,
        contacts: this.client_linkman,
        phone: this.linkman_tel,
        prefix: this.client_prefix,
        total_price: this.total_price,
        left_price: this.wait_pay_price,
        pay_price: this.pay_price,
        start_time: this.order_time,
        alias: this.client_alias,
        // user_name: this.account_number,
        type: this.system_type
      }
      company.create({
        ...data
      }).then(res => {
        if (res.data.status !== false) {
          this.$message.success('修改成功')
          this.$router.push('/client/clientDetail/' + this.$route.params.id)
        }
      })
    }
  },
  watch: {
    total_price (newVal) {
      if (+this.pay_price) {
        this.wait_pay_price = newVal - this.pay_price
      }
    },
    pay_price (newVal) {
      if (+this.total_price) {
        this.wait_pay_price = this.total_price - newVal
      }
    }
  },
  created () {
    company.detail({
      id: this.$route.params.id
    }).then(res => {
      if (res.data.status !== false) {
        let data = res.data.data
        this.client_name = data.company_name
        this.client_business_license_num = data.business_license
        this.client_address = data.address
        // this.client_legal_person = data.legal_person
        this.order_time = data.start_time
        this.client_linkman = data.contacts
        this.linkman_tel = data.phone
        this.failure_time = data.end_time
        this.total_price = data.total_price
        this.pay_price = data.pay_price
        this.wait_pay_price = data.left_price
        this.client_prefix = data.prefix
        this.client_alias = data.alias
        this.system_type = data.type
        this.loading = false
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/client/clientCreate.less";
</style>