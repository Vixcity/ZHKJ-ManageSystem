<template>
  <div
    class="printContainer"
    id="productFlowCodePrint"
    @click="showMenu = false"
    @click.right="handleClickRight"
    v-loading="loading"
  >
    <div
      class="pmain"
      style="text-align: center"
      v-for="(item, index) in printList"
      :key="index"
    >
      <div class="pbody" style="margin-left:20px">
        <div class="pageOne">
          <div class="module">
            <img :src="item.url" width="150px" />
          </div>
          <div style="font-size: 20px">scode:{{ item.scode }}</div>
          <div style="font-size: 20px">{{ item.company_name }}</div>
        </div>
      </div>
    </div>
    <div
      class="setting_sign_style"
      v-if="showMenu"
      :style="`left:${X_position || 0}px;top:${Y_position}px`"
      @click.stop
    >
      <div class="setting_item" @click="windowMethod(1)">刷新</div>
      <div class="setting_item" @click="windowMethod(2)">打印</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      company_name: window.sessionStorage.getItem("company_name"),
      qrCodeUrl: "",
      showMenu: false,
      X_position: 0,
      Y_position: 0,
      routerQuery: {},
      printList: [],
      loading: false,
    };
  },
  methods: {
    handleClickRight(e, type = true) {
      this.showMenu = type;
      this.X_position = e.clientX;
      this.Y_position = e.clientY;
      e.preventDefault();
      e.stopPropagation();
    },
    windowMethod(type) {
      this.showMenu = false;
      window.requestAnimationFrame(() => {
        if (type === 1) {
          window.location.reload();
        } else if (type === 2) {
          window.print();
        }
      });
    },
  },
  mounted() {
    this.loading = true;
    let _this = this;
    this.routerQuery = this.$route.query;
    const QRCode = require("qrcode");

    for (let i = 0; i < this.routerQuery.number; i++) {
      let a =
        "https://knit-m-beta.zwyknit.com/bindOrder?company_id=" +
        this.routerQuery.company_id +
        "&hash=LZ" +
        this.routerQuery.id +
        i;

      // 生成二维码
      QRCode.toDataURL(a)
        .then((url) => {
          _this.printList.push({
            scode: "LZ" + _this.routerQuery.id + i,
            company_name: _this.routerQuery.company_name,
            company_id: _this.routerQuery.company_id,
            url,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    this.loading = false;
    window.print();
  },
});
</script>
<style lang="less" scoped>
@import "~@/assets/less/productFlowCode/print.less";
</style>