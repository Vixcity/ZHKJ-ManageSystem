<template>
  <div id="productFlowCode" class="indexMain" v-loading="loading">
    <div class="module">
      <div class="titleCtn">
        <div class="title">生产流转码管理</div>
      </div>
      <div class="productFlowCodeCtn">
        <div class="navFather">
          <div
            class="list"
            :class="{ active: pName === item }"
            v-for="(item, key) in nav"
            :key="key"
            @click="pName = item"
          >
            {{ item }}
          </div>
        </div>
        <div class="mainCtn">
          <template v-if="pName === '生产流转码列表'">
            <div class="flowerCtn">
              <div class="handleCtn">
                <div class="filterCtn">
                  <span class="label">筛选条件:</span>
                  <div class="inputCtn">
                    <el-input
                      placeholder="工厂名 / 代码"
                      v-model="keyWord"
                      class="elInput"
                      @keydown.enter.native="changeScreen"
                    />
                  </div>
                </div>
                <div class="addBtn" @click="showPopup = true">批量生成</div>
              </div>
              <div class="normalTb">
                <div class="thead">
                  <div class="trow">
                    <div class="tcolumn middle">创建时间</div>
                    <div class="tcolumn middle">工厂（代号）</div>
                    <div class="tcolumn middle">操作人</div>
                    <div class="tcolumn middle">生成数量</div>
                    <div class="tcolumn middle">使用数量</div>
                  </div>
                </div>
                <div class="tbody">
                  <div
                    class="trow"
                    v-for="(item, index) in productFlowCodeList"
                    :key="index"
                  >
                    <div class="tcolumn middle">{{ item.created_at }}</div>
                    <div class="tcolumn middle">{{ item.company_name }}</div>
                    <div class="tcolumn middle">{{ item.user_name }}</div>
                    <div class="tcolumn middle">{{ item.number }}</div>
                    <div class="tcolumn middle">{{ item.use_number }}</div>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination
                  background
                  :page-size="10"
                  layout="prev, pager, next"
                  :total="total"
                  :current-page.sync="page"
                  @current-change="changeScreen"
                >
                </el-pagination>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="popup" v-show="showPopup">
      <template v-if="pName === '生产流转码列表'">
        <div class="main" style="width: 70%">
          <div class="title">
            <span class="text">生成生产流转码</span>
            <i class="el-icon-close" @click="showPopup = false"></i>
          </div>
          <div class="content" style="max-height: unset">
            <div class="explainCtn">
              <span class="green"
                >选择公司后，再输入本次生成数量，即可完成！</span
              >
            </div>
            <div style="display: flex">
              <div style="width: 40%">
                <div
                  class="info inputCtn"
                  style="display: flex; align-items: center"
                >
                  <span class="label" style="width: 20%">目标工厂</span>
                  <el-autocomplete
                    v-model="searchUser"
                    style="width: 60%"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="搜索客户目标"
                    @select="confirmUserTarget"
                    class="elInput hasMarginRight"
                  ></el-autocomplete>
                </div>
                <div
                  class="info inputCtn"
                  style="display: flex; align-items: center; position: relative"
                >
                  <span class="label" style="width: 20%">本次生成数</span>
                  <el-input
                    style="width: 60%"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    placeholder="多少"
                    v-model="createNumber"
                    class="elInput hasMarginRight"
                  />
                  <span style="position: absolute; right: 23%">张</span>
                </div>
              </div>
              <div style="width: 60%">
                <div class="info">目标工厂信息</div>
                <div class="info" style="display: flex; align-items: center">
                  <div style="width: 15%">工厂信息</div>
                  <div>{{ targetFactoryInfo.company.company_name }}</div>
                </div>
                <div class="info" style="display: flex; align-items: center">
                  <div style="width: 15%">已生成数</div>
                  <div>{{ targetFactoryInfo.number }}</div>
                </div>
                <div class="info" style="display: flex; align-items: center">
                  <div style="width: 15%">已使用数</div>
                  <div>{{ targetFactoryInfo.use_number }}</div>
                </div>
                <div style="margin-top: 200px"></div>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray" @click="showPopup = false">取消</div>
            <div class="btn btnBlue" @click="printConfirm">确定</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { productFlowCode, company } from "@/assets/js/api.js";
export default {
  data() {
    return {
      loading: true,
      showPopup: false,
      nav: ["生产流转码列表"],
      pName: "",
      keyWord: "",
      createNumber: "",
      searchUser: "",
      productFlowCodeList: [],
      total: 1,
      page: 1,
      targetFactoryList: [],
      targetFactoryInfo: {
        company: {
          company_name: "",
        },
        number: "",
        use_number: "",
      },
    };
  },
  watch: {
    pName(val) {
      if (val === "生产流转码列表") {
        this.changeScreen();
      }
    },
  },
  methods: {
    // 异步请求数据
    querySearchAsync(queryString, cb) {
      company
        .list({
          keyword: queryString,
        })
        .then((res) => {
          if (res.data.status !== false) {
            res.data.data.forEach((item) => {
              item.value = item.company_name;
            });
            cb(res.data.data);
          }
        });
    },

    // 选中工厂
    confirmUserTarget(item) {
      productFlowCode
        .statistics({
          company_id: item.company_uuid,
        })
        .then((res) => {
          if (res.data.status !== false) {
            res.data.data.company_id = item.company_uuid;
            this.targetFactoryInfo = res.data.data;
          }
        });
    },

    // 点击确认
    printConfirm() {
      if (this.searchUser === "" || this.createNumber === "") {
        this.$message.error("目标工厂和本次生成数不能为空");
        return;
      }

      productFlowCode
        .save({
          id: "",
          company_id: this.targetFactoryInfo.company_id,
          number: this.createNumber,
        })
        .then((res) => {
            console.log(this.targetFactoryInfo)
          if (res.data.status !== false) {
            this.$openUrl('/productFlowCode/print?company_id=' + this.targetFactoryInfo.company_id + '&number=' + this.createNumber + '&id=' + res.data.data + '&company_name=' + this.targetFactoryInfo.company.company_name)
            this.showPopup = false
            return;
          }
        });
    },

    // 格式化时间
    rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(+new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },

    // 筛选 ==> 工厂名 / 代码
    changeScreen() {
      this.loading = true;
      productFlowCode
        .list({
          limit: 10,
          keyword: this.keyWord,
          page: this.page,
        })
        .then((res) => {
          if (res.data.status !== false) {
            let arr = [];

            res.data.data.data.forEach((item) => {
              item.user_name = item.admin_user.user_name;
              item.created_at = this.rTime(item.created_at);
              item.company_name = item.company.company_name;
              arr.push(item);
            });
            this.productFlowCodeList = arr;
            this.total = res.data.data.total;
            this.loading = false;
          }
        });
    },
  },
  created() {
    this.pName = "生产流转码列表";
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/productFlowCode/productFlowCode.less";
</style>

<style lang="less">
#productFlowCode {
  .el-input__inner {
    height: 32px;
  }
}
</style>
