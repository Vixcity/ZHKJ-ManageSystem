<template>
  <div id="tutorialSystemCreate"
    class="indexMain">
    <div class="module">
      <div class="titleCtn">
        <div class="title">系统教程修改</div>
      </div>
      <div class="editCtn hasBorderTop">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">管理模块</span>
            </span>
            <span class="content">
              <el-select v-model="moduleId"
                filterable
                placeholder="请选择管理模块">
                <el-option v-for="item in moduleArr"
                  :key="item.id"
                  :label="item.module"
                  :value="item.id">
                </el-option>
              </el-select>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex2">
            <span class="label">
              <span class="text">教程标题</span>
            </span>
            <span class="content">
              <el-input v-model="questionTitle"
                placeholder="请输入问题标题" />
            </span>
          </div>
        </div>
        <template v-for="(item,index) in stepsInfo">
          <div class="rowCtn"
            :key="index + 'text'">
            <div class="colCtn flex2">
              <span class="label">
                <span class="text">第{{chinaNum[index]}}步</span>
              </span>
              <span class="content"
                style="height:auto">
                <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入步骤描述"
                  v-model="item.text">
                </el-input>
              </span>
              <span class="editBtn">
                <div class="btn noBorder"
                  @click="addItem"
                  v-if="index === 0">添加步骤</div>
                <div class="btn noBorder red"
                  @click="deleteItem(index)"
                  v-if="index !== 0">删除步骤</div>
              </span>
            </div>
          </div>
          <div class="rowCtn"
            :key="index + 'image'">
            <div class="colCtn flex2">
              <div class="content"
                style="height:auto">
                <el-upload action="https://upload.qiniup.com/"
                  drag
                  :before-upload="beforeAvatarUpload"
                  :before-remove="beforeRemove"
                  :data="postData"
                  :file-list="item.file_data"
                  list-type="picture-card"
                  ref="uploada_image">
                  <i class="el-icon-plus"
                    slot="default"
                    style="font-size:30px;">
                    <br />
                    <span style="font-size:14px">点击上传图片描述</span>
                  </i>
                </el-upload>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <div class="btn btnBlue"
            @click="saveAll">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { permissions, chinaNum } from '@/assets/js/staticData.js'
import { getToken, deleteFile, tutorial } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      chinaNum: chinaNum,
      moduleId: '',
      moduleArr: permissions,
      questionTitle: '',
      stepsInfo: [
        {
          text: ''
        }
      ],
      postData: { token: '' },
      fileArr: [],
      lock: true
    }
  },
  methods: {
    beforeAvatarUpload (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 10MB!')
        return false
      }
    },
    beforeRemove (file, fileList) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deleteIndex = 0
        fileList.forEach((item, index) => {
          if (file.response) {
            if (item.response && (item.response.key === file.response.key)) {
              deleteIndex = index
            }
          } else {
            if (item.url === file.url) {
              deleteIndex = index
            }
          }
        })
        fileList.splice(deleteIndex, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // deleteFile({
        //   id: file.id || null,
        //   file_name: file.response ? file.response.key : file.url.split('https://file.zwyknit.com/')[1]
        // }).then((res) => {
        //   if (res.data.status) {
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // return false 禁用自带的删除功能
      return false
    },
    addItem () {
      this.stepsInfo.push({
        text: ''
      })
    },
    deleteItem (key) {
      this.stepsInfo.splice(key, 1)
    },
    saveAll () {
      if (!this.lock) {
        this.$message.warning('请勿频繁点击')
        return
      }
      let flag = {
        describe: true,
        img: true
      }
      let stepData = this.stepsInfo.map((itemStep, indexStep) => {
        let imageUrl = this.$refs.uploada_image[indexStep].uploadFiles.map((item) => { return (item.response ? 'https://file.zwyknit.com/' + item.response.key : item.url) })
        if (!itemStep.text) {
          flag.describe = false
        }
        if (imageUrl.length === 0) {
          flag.img = false
        }
        return {
          describe: itemStep.text,
          file_data: imageUrl,
          step: indexStep
        }
      })
      if (!this.moduleId) {
        this.$message.error('请选择教程模块')
        return
      }
      if (!this.questionTitle) {
        this.$message.error('请输入教程标题')
        return
      }
      if (!flag.describe && !flag.img) {
        this.$message.error('请输入步骤描述或添加图片描述(最少存有一种描述方式)')
        return
      }
      this.lock = false
      tutorial.create({
        id: this.$route.params.id,
        module_id: this.moduleId,
        title: this.questionTitle,
        content: JSON.stringify(stepData)
      }).then(res => {
        if (res.data.status !== false) {
          this.$message.success('修改成功')
          this.$router.push('/tutorialSystem/tutorialSystemDetail/' + this.$route.params.id)
        }
        this.lock = true
      })
    }
  },
  created () {
    if (this.$route.query.module_id) {
      this.moduleId = +this.$route.query.module_id
    }
    Promise.all([
      getToken(),
      tutorial.detail({
        id: this.$route.params.id
      })
    ]).then((res) => {
      this.postData.token = res[0].data.data
      let tutorialInfo = res[1].data.data
      this.moduleId = tutorialInfo.module_id
      this.questionTitle = tutorialInfo.title
      this.stepsInfo = JSON.parse(tutorialInfo.content).map(item => {
        return {
          text: item.describe,
          file_data: item.file_data.map(itemImg => {
            return {
              url: itemImg
            }
          })
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/tutorialSystem/tutorialSystemCreate.less";
</style>
<style lang="less">
#tutorialSystemCreate {
  .el-upload--picture-card {
    border: none;
    height: auto;
    width: auto;
    .el-upload-dragger {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .red {
    color: #f5222d;
  }
}
</style>
