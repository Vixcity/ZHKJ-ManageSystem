<template>
  <div class="indexMain"
    v-loading='loading'
    id="tutorialSystemList">
    <div class="module">
      <div class="inputCtn_page">
        <!-- <el-input v-model="searchString"
          placeholder="请输入描述"
          class="searchInput">
          <span slot="append"
            class="btn btnBlue el-icon-search"
            @click="search">搜索</span>
        </el-input> -->
        <el-autocomplete v-model="searchString"
          class="searchInput"
          :fetch-suggestions="querySearch"
          placeholder="请输入搜索内容"
          @select="handleSelect"></el-autocomplete>
      </div>
      <div class="tutorialCtn">
        <el-collapse v-model="activeName"
          accordion>
          <el-collapse-item v-for="(item,index) in tutorialModule"
            :key="index"
            :name="item.id">
            <div class="collapse_title"
              slot="title">
              <span>{{item.module}}({{item.module_info ? item.module_info.length : 0}})</span>
              <div class="btn noBorder"
                @click="$router.push('/tutorialSystem/tutorialSystemCreate?module_id=' + item.id)">添加新教程</div>
            </div>
            <div class="collapse__inner_item"
              v-for="(value,key) in item.module_info || []"
              :key="key">
              <span class="text"
                @click="$router.push('/tutorialSystem/tutorialSystemDetail/' + value.id)">{{value.title}}</span>
              <div class="btnCtn_collapse">
                <span class="handle_btn orange"
                  @click="$router.push('/tutorialSystem/tutorialSystemUpdate/' + value.id)">修改</span>
                <span class="handle_btn red"
                  @click="deleteTutorial(value.id)">删除</span>
              </div>
            </div>
            <div class="collapse__inner_item"
              v-if="!item.module_info || item.module_info.length === 0">
              <span class="text orange">该模块暂无教程</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import { permissions } from '@/assets/js/staticData.js'
import { tutorial } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchString: '',
      tutorialModule: permissions,
      activeName: ''
    }
  },
  methods: {
    deleteTutorial (id) {
      this.$confirm('此操作将永久删除该教程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tutorial.delete({
          id: id
        }).then(res => {
          if (res.data.status !== false) {
            this.$message.success('删除成功')
            this.$router.push('/tutorialSystem/tutorialSystemList')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    querySearch (queryString, cb) {
      let beforeReturnInfo = this.tutorialModule.map(item => item.module_info || []).reduce((a, b) => {
        return a.concat(b)
      }).map(item => {
        return {
          value: item.title,
          id: item.id
        }
      })
      cb(queryString ? beforeReturnInfo.filter(item => item.value.indexOf(queryString) !== -1) : beforeReturnInfo)
    },
    handleSelect (event) {
      this.$router.push('/tutorialSystem/tutorialSystemDetail/' + event.id)
    },
    init () {
      this.tutorialModule.forEach(item => {
        item.module_info = []
      })
      Promise.all([
        tutorial.list()
      ]).then(res => {
        let tutorialDetail = res[0].data.data || []
        tutorialDetail.forEach(item => {
          let moduleFlag = this.tutorialModule.find(val => val.id === item.module_id)
          if (moduleFlag) {
            if (!moduleFlag.module_info) {
              moduleFlag.module_info = [item]
            } else {
              moduleFlag.module_info.push(item)
            }
          }
        })
        this.loading = false
      }).catch(res => {
        this.$message.error('未知错误，请刷新重试，如还未解决，请联系管理员')
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/tutorialSystem/tutorialSystemList.less";
</style>
<style lang="less">
#tutorialSystemList {
  .el-input-group__append {
    padding: 0;
  }
  .tutorialCtn {
    .el-collapse-item__header {
      padding: 0 60px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      font-weight: bold;
      &.is-active {
        background: rgba(24, 144, 255, 0.1);
      }
    }
    .el-collapse-item__content {
      padding: 0 100px;
    }
  }
}
</style>
