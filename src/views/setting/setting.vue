<template>
  <div id="setting"
    class="indexMain"
    v-loading='loading'>
    <div class="module">
      <div class="titleCtn">
        <div class="title">系统设置</div>
      </div>
      <div class="settingCtn">
        <div class="navFather">
          <div class="list"
            :class="{'active':pName===item}"
            v-for="(item,key) in nav"
            :key="key"
            @click="pName=item">{{item}}</div>
        </div>
        <div class="mainCtn">
          <template v-if="pName==='潘通色号管理'">
            <div class="flowerCtn">
              <div class="handleCtn">
                <div class="filterCtn">
                  <span class="label">筛选条件:</span>
                  <div class="inputCtn">
                    <el-input placeholder="请输入筛选条件"
                      v-model="colorKeyWord"
                      class="elInput" />
                    <div class="addBtn whiteBg">搜索</div>
                  </div>
                </div>
                <div class="addBtn"
                  @click="showPopup = true">添加潘通色号</div>
              </div>
              <div class="normalTb">
                <div class="thead">
                  <div class="trow">
                    <div class="tcolumn">潘通色号</div>
                    <div class="tcolumn middle">操作</div>
                  </div>
                </div>
                <div class="tbody">
                  <div class="trow"
                    v-for="(itemColor,indexColor) in  colorList[colorPage]"
                    :key="indexColor">
                    <div class="tcolumn">{{itemColor.name}}</div>
                    <div class="tcolumn">
                      <span class="trow middle handleBtnCtn">
                        <span class="blue">修改</span>
                        <span class="red">删除</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="1"
                  layout="prev, pager, next"
                  :total="colorTotal"
                  :current-page.sync="colorPage">
                </el-pagination>
              </div>
            </div>
          </template>
          <template v-if="pName==='产品品类管理'">
            <div class="flowerCtn">
              <el-tree :data="productTypeArr"
                node-key="id">
                <span class="custom-tree-node"
                  slot-scope="{ data }">
                  <span style="display:inline-block;width:5em">{{ data.name }}</span>
                  <span style="margin-left:20px">
                    <span class="el-icon-edit"
                      @click.stop="changeProductType(data)"></span>
                    <span class="el-icon-plus"
                      style="margin-left:8px"
                      v-if="data.canAdd"
                      @click.stop="addProductType(data)"></span>
                    <span class="el-icon-delete"
                      style="margin-left:8px"
                      @click.stop="deleteProductType(data)"></span>
                  </span>
                </span>
              </el-tree>
              <div class="btn btnWhiteBlue"
                style="width:4em;margin-top:20px"
                @click="showPopup = true">添加大类</div>
            </div>
          </template>
          <template v-if="pName==='品类单位管理'">
            <div class="flowerCtn">
              <!-- <div class="handleCtn">
                <div class="filterCtn">
                  <span class="label">筛选条件:</span>
                  <div class="inputCtn">
                    <el-input placeholder="请输入筛选条件"
                      v-model="materialKeyWord"
                      class="elInput" />
                    <div class="addBtn whiteBg">搜索</div>
                  </div>
                </div>
                <div class="addBtn"
                  @click="showPopup = true">添加辅料</div>
              </div> -->
              <div class="normalTb">
                <div class="thead">
                  <div class="trow">
                    <div class="tcolumn">品类名称</div>
                    <div class="tcolumn">单位</div>
                    <div class="tcolumn middle">操作</div>
                  </div>
                </div>
                <div class="tbody">
                  <div class="trow"
                    v-for="(itemCa,indexCa) in  categoryList[categoryPage-1]"
                    :key="indexCa">
                    <div class="tcolumn">{{itemCa.product_category}}</div>
                    <div class="tcolumn">{{itemCa.name}}</div>
                    <div class="tcolumn">
                      <span class="trow middle handleBtnCtn">
                        <span class="blue"
                          @click="changeCategoryUnit(itemCa)">修改</span>
                        <!-- <span class="red">删除</span> -->
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="1"
                  layout="prev, pager, next"
                  :total="categoryTotal"
                  :current-page.sync="categoryPage">
                </el-pagination>
              </div>
            </div>
          </template>
          <template v-if="pName==='纱线原料管理'">
            <div class="flowerCtn">
              <div class="handleCtn">
                <div class="filterCtn">
                  <span class="label">筛选条件:</span>
                  <div class="inputCtn">
                    <el-input placeholder="请输入筛选条件"
                      v-model="yarnKeyWord"
                      class="elInput" />
                    <div class="addBtn whiteBg">搜索</div>
                  </div>
                </div>
                <div class="addBtn"
                  @click="showPopup = true">添加纱线</div>
              </div>
              <div class="normalTb">
                <div class="thead">
                  <div class="trow">
                    <div class="tcolumn">纱线原料</div>
                    <div class="tcolumn middle">操作</div>
                  </div>
                </div>
                <div class="tbody">
                  <div class="trow"
                    v-for="(itemColor,indexColor) in  yarnList"
                    :key="indexColor">
                    <div class="tcolumn">{{itemColor.name}}</div>
                    <div class="tcolumn">
                      <span class="trow middle handleBtnCtn">
                        <span class="blue">修改</span>
                        <span class="red">删除</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="yarnTotal"
                  :current-page.sync="yarnPage">
                </el-pagination>
              </div>
            </div>
          </template>
          <template v-if="pName==='装饰辅料管理'">
            <div class="flowerCtn">
              <div class="handleCtn">
                <div class="filterCtn">
                  <span class="label">筛选条件:</span>
                  <div class="inputCtn">
                    <el-input placeholder="请输入筛选条件"
                      v-model="materialKeyWord"
                      class="elInput" />
                    <div class="addBtn whiteBg">搜索</div>
                  </div>
                </div>
                <div class="addBtn"
                  @click="showPopup = true">添加辅料</div>
              </div>
              <div class="normalTb">
                <div class="thead">
                  <div class="trow">
                    <div class="tcolumn">装饰辅料</div>
                    <div class="tcolumn">单位</div>
                    <div class="tcolumn middle">操作</div>
                  </div>
                </div>
                <div class="tbody">
                  <div class="trow"
                    v-for="(itemMa,indexMa) in  materialList"
                    :key="indexMa">
                    <div class="tcolumn">{{itemMa.name}}</div>
                    <div class="tcolumn">{{itemMa.unit}}</div>
                    <div class="tcolumn">
                      <span class="trow middle handleBtnCtn">
                        <span class="blue">修改</span>
                        <span class="red">删除</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="materialTotal"
                  :current-page.sync="materialPage">
                </el-pagination>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="popup"
      v-show="showPopup">
      <template v-if="pName==='潘通色号管理'">
        <div class="main">
          <div class="title">
            <div class="text">添加潘通色号</div>
            <i class="el-icon-close"
              @click="showPopup=false"></i>
          </div>
          <div class="content">
            <div class="row"
              v-for="(itemColor,indexColor) in editColorInfo"
              :key="indexColor">
              <div class="label">{{indexColor === 0 ? '潘通色号：' : ''}}</div>
              <div class="info">
                <el-input placeholder="请输入潘通色号"
                  v-model="itemColor.name"></el-input>
              </div>
              <div class="editBtn blue"
                v-if="indexColor === 0"
                @click="addItem(editColorInfo,'color')">添加</div>
              <div class="editBtn red"
                v-else
                @click="deleteItem(editColorInfo,indexColor)">删除</div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="showPopup=false">取消</div>
            <div class="btn btnBlue"
              @click="saveColor">确定</div>
          </div>
        </div>
      </template>
      <template v-if="pName === '纱线原料管理'">
        <div class="main"
          :style="{width:!yarnAddType ? '1100px' : ''}">
          <div class="title">
            <span class="text">添加纱线原料</span>
            <i class="el-icon-close"
              @click="showPopup=false"></i>
          </div>
          <div class="content">
            <div class="row">
              <span class="label">添加方式：</span>
              <div class="info"
                style="display:flex;align-items:center">
                <el-radio-group v-model="yarnAddType">
                  <el-radio :label="true">名称添加</el-radio>
                  <el-radio :label="false">格式添加</el-radio>
                </el-radio-group>
              </div>
            </div>
            <template v-if="yarnAddType">
              <div class="row"
                v-for="(itemYarn,indexYarn) in editYarnInfo"
                :key="indexYarn">
                <span class="label">{{indexYarn === 0 ? '名称添加：' : ''}}</span>
                <div class="info">
                  <el-input placeholder="请输入纱线名称"
                    v-model="itemYarn.name"></el-input>
                </div>
                <div class="editBtn blue"
                  v-if="indexYarn === 0"
                  @click="addItem(editYarnInfo,'yarn')">添加</div>
                <div class="editBtn red"
                  v-else
                  @click="deleteItem(editYarnInfo,indexYarn)">删除</div>
              </div>
            </template>
            <template v-else>
              <div class="row">
                <span class="label">格式添加：</span>
                <div class="info">
                  <el-input placeholder="取值阈值"
                    v-model="layoutData.thresholdValues"
                    class="elInput w100 hasMarginRight"
                    @change="buildYarnList"></el-input>
                  <el-input placeholder="取值"
                    v-model="layoutData.firstValue"
                    class="elInput w80"
                    @change="buildYarnList"></el-input>
                  -
                  <el-input placeholder="取值"
                    v-model="layoutData.lastValue"
                    class="elInput w80 hasMarginRight"
                    @change="buildYarnList"></el-input>
                  <el-select v-model="layoutData.unit"
                    class="elInput w100 hasMarginRight"
                    placeholder="支/cm/S/公分"
                    @change="buildYarnList">
                    <el-option v-for="item in layoutData.unitArr"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                  <el-input placeholder="纱线名称"
                    v-model="layoutData.yarnName"
                    class="elInput w150 hasMarginRight"
                    @change="buildYarnList"></el-input>
                  <el-input placeholder="#"
                    v-model="layoutData.colorCodeUnit"
                    class="elInput w50 hasMarginRight"
                    @change="buildYarnList"></el-input>
                  <el-input placeholder="色号"
                    v-model="layoutData.firstColorCode"
                    class="elInput w80"
                    @change="buildYarnList"></el-input>
                  -
                  <el-input placeholder="色号"
                    v-model="layoutData.lastColorCode"
                    class="elInput w80 hasMarginRight"
                    @change="buildYarnList"></el-input>
                </div>
              </div>
              <div class="row">
                <span class="label">名称预览：</span>
                <div class="info tagCtn">
                  <span class="yarnNameTag"
                    v-for="(itemYarn,indexYarn) in layoutData.yarnNameList"
                    :key="indexYarn">
                    <span class="name">{{itemYarn}}</span>
                    <span class="el-icon-close icon"
                      @click="deleteItem(layoutData.yarnNameList,indexYarn)"></span>
                  </span>
                </div>
              </div>
            </template>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="showPopup=false">取消</div>
            <div class="btn btnBlue"
              @click="saveYarn">确定</div>
          </div>
        </div>
      </template>
      <template v-if="pName === '装饰辅料管理'">
        <div class="main">
          <div class="title">
            <span class="text">添加装饰辅料</span>
            <i class="el-icon-close"
              @click="showPopup=false"></i>
          </div>
          <div class="content">
            <div class="row"
              v-for="(itemMa,indexMa) in editMaterialInfo"
              :key="indexMa">
              <span class="label">{{indexMa === 0 ? '辅料名称：' : ''}}</span>
              <div class="info"
                style="display:flex;align-items:center">
                <el-input placeholder="辅料名称"
                  v-model="itemMa.name"
                  class="elInput hasMarginRight" />
                <el-input placeholder="辅料单位"
                  v-model="itemMa.unit"
                  class="elInput hasMarginRight w150" />
              </div>
              <div class="editBtn blue"
                v-if="indexMa === 0"
                @click="addItem(editMaterialInfo,'material')">添加</div>
              <div class="editBtn red"
                v-else
                @click="deleteItem(editMaterialInfo,indexMa)">删除</div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="showPopup=false">取消</div>
            <div class="btn btnBlue"
              @click="saveMaterial">确定</div>
          </div>
        </div>
      </template>
      <template v-if="pName === '品类单位管理'">
        <div class="main">
          <div class="title">
            <span class="text">修改品类单位</span>
            <i class="el-icon-close"
              @click="showPopup=false"></i>
          </div>
          <div class="content">
            <div class="row">
              <span class="label">品类名称：</span>
              <div class="info"
                style="display:flex;align-items:center"> {{categoryUnitEditInfo.product_category}} </div>
            </div>
            <div class="row">
              <span class="label">品类单位：</span>
              <div class="info"
                style="display:flex;align-items:center">
                <el-input placeholder="辅料单位"
                  v-model="categoryUnitEditInfo.unit"
                  class="elInput" />
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="showPopup=false">取消</div>
            <div class="btn btnBlue"
              @click="saveCategoryUnit">确定</div>
          </div>
        </div>
      </template>
      <template v-if="pName === '产品品类管理'">
        <div class="main">
          <div class="title">
            <span class="text">添加品类</span>
            <i class="el-icon-close"
              @click="showPopup=false"></i>
          </div>
          <div class="content">
            <div class="row">
              <span class="label">品类名称：</span>
              <div class="info"
                style="display:flex;align-items:center">
                <el-input placeholder="请输入品类名称"
                  v-model="categoryEditInfo.product_category"
                  class="elInput" />
              </div>
            </div>
            <div class="row">
              <span class="label">品类单位：</span>
              <div class="info"
                style="display:flex;align-items:center">
                <el-input placeholder="请输入品类单位"
                  v-model="categoryEditInfo.unit"
                  class="elInput" />
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="showPopup=false">取消</div>
            <div class="btn btnBlue"
              @click="saveProductCategory">确定</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { setting, categoryType } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      showPopup: false,
      // '潘通色号管理','品类单位管理',
      nav: ['产品品类管理', '纱线原料管理', '装饰辅料管理'],
      pName: '',
      colorKeyWord: '',
      colorList: [],
      colorTotal: 1,
      colorPage: 1,
      editColorInfo: [{ name: '' }],
      productTypeArr: [],
      categoryEditInfo: {
        product_category: '',
        unit: ''
      },
      categoryList: [],
      categoryTotal: 1,
      categoryPage: 1,
      categoryUnitEditInfo: {
        id: '',
        category_id: '',
        product_category: '',
        unit: ''
      },
      yarnKeyWord: '',
      yarnList: [],
      yarnTotal: 1,
      yarnPage: 1,
      yarnAddType: true,
      layoutData: {
        thresholdValues: '',
        firstValue: '',
        lastValue: '',
        unit: '',
        unitArr: [{ name: '支' }, { name: 'cm' }, { name: 'S' }, { name: '公分' }],
        yarnName: '',
        colorCodeUnit: '',
        firstColorCode: '',
        lastColorCode: '',
        yarnNameList: [],
      },
      editYarnInfo: [{ name: '' }],
      materialKeyWord: '',
      materialList: [],
      materialTotal: 1,
      materialPage: 1,
      editMaterialInfo: [{ name: '', unit: '' }]
    }
  },
  watch: {
    pName (val) {
      if (val === '潘通色号管理') {
        this.getColour()
      } else if (val === '产品品类管理') {
        this.getProductType()
      } else if (val === '品类单位管理') {
        this.getCategoryUnit()
      } else if (val === '纱线原料管理') {
        this.getYarn()
      } else if (val === '装饰辅料管理') {
        this.getMaterial()
      }
    }
  },
  methods: {
    addItem (data, type) {
      if (type === 'color' || type === 'yarn') {
        data.push({ name: '' })
      } else if (type === 'material') {
        data.push({ name: '', unit: '' })
      }
    },
    deleteItem (data, index) {
      data.splice(index, 1)
    },
    saveColor () {

    },
    buildYarnList () {
      this.layoutData.yarnNameList = []
      let thresholdValues = Number(this.layoutData.thresholdValues)
      let fixedNum = thresholdValues.toString().split('.')[1].length
      let firstValue = Number(this.layoutData.firstValue)
      let lastValue = Number(this.layoutData.lastValue)
      let unit = this.layoutData.unit
      let yarnName = this.layoutData.yarnName
      let colorCodeUnit = this.layoutData.colorCodeUnit
      let firstColorCode = Number(this.layoutData.firstColorCode)
      let lastColorCode = Number(this.layoutData.lastColorCode)
      if (thresholdValues && (firstValue || firstValue === 0) && lastValue && unit && yarnName) {
        for (let i = firstValue; lastValue >= i;) {
          if (colorCodeUnit && (firstColorCode || firstColorCode === 0) && lastColorCode) {
            for (let j = firstColorCode; lastColorCode >= j; j++) {
              this.layoutData.yarnNameList.push([i.toFixed(fixedNum), unit, yarnName, colorCodeUnit, j].join(''))
            }
          } else {
            this.layoutData.yarnNameList.push([i.toFixed(fixedNum), unit, yarnName].join(''))
          }
          i += thresholdValues
        }
      }
    },
    saveYarn () {

    },
    saveMaterial () {

    },
    // 获取潘通色号列表
    getColour () {
      this.loading = true
      setting.pantong.list().then(res => {
        if (res.data.status !== false) {
          this.colorList = this.$newSplice(res.data.data, 5)
          this.colorTotal = this.colorList.length
        }
        this.loading = false
      })
    },
    // 获取产品品类列表
    getProductType () {
      this.loading = true
      categoryType.list().then(res => {
        if (res.data.status !== false) {
          this.productTypeArr = res.data.data.map(item => {
            return {
              id: item.id,
              name: item.name,
              pid: item.pid,
              canAdd: true,
              children: item.child.map(itemType => {
                return {
                  id: itemType.id,
                  name: itemType.name,
                  pid: itemType.pid,
                  canAdd: true,
                  children: itemType.child.map(itemStyle => {
                    return {
                      id: itemStyle.id,
                      pid: itemStyle.pid,
                      name: itemStyle.name
                    }
                  })
                }
              })
            }
          })
          // this.productTypeArr.push({
          //   id: 0,
          //   canAdd: true,
          //   name: '添加大类'
          // })
        }
        this.loading = false
      })
    },
    // 添加产品品类
    addProductType (data) {
      this.$prompt('请输入添加的品类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.loading = true
        categoryType.create({
          pid: data.id,
          name: value
        }).then(res => {
          if (res.data.status !== false) {
            this.$message.success('添加成功')
            this.getProductType()
          } else {
            this.loading = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消'
        })
      })
    },
    saveProductCategory () {
      if (!this.categoryEditInfo.product_category) {
        this.$message.error('请输入添加的品类名称')
        return
      }
      if (!this.categoryEditInfo.unit) {
        this.$message.error('请输入添加品类的单位')
        return
      }
      categoryType.create({
        pid: 0,
        name: this.categoryEditInfo.product_category,
        unit: this.categoryEditInfo.unit
      }).then(res => {
        if (res.data.status !== false) {
          this.$message.success('添加成功')
          this.getProductType()
          this.showPopup = false
        }
      })
    },
    // 删除产品品类
    deleteProductType (data) {
      this.$confirm('此操作将永久删除该品类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        categoryType.delete({
          id: data.id
        }).then(res => {
          if (res.data.status !== false) {
            this.$message.success('删除成功')
            this.getProductType()
          } else {
            this.loading = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      // this.$message.warning('暂未开放')
    },
    // 修改品类
    changeProductType (data) {
      this.$prompt('请输入修改的名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.loading = true
        categoryType.create({
          id: data.id,
          pid: data.pid,
          name: value
        }).then(res => {
          if (res.data.status !== false) {
            this.$message.success('修改成功')
            this.getProductType()
          } else {
            this.loading = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消'
        })
      })
    },
    // 获取品类单位列表
    getCategoryUnit () {
      categoryType.unitList().then(res => {
        this.categoryList = this.$newSplice(res.data, 5)
        this.categoryTotal = this.categoryList.length
        this.loading = false
      })
    },
    // 修改品类单位
    changeCategoryUnit (item) {
      this.categoryUnitEditInfo = {
        id: item.id,
        category_id: item.category_id,
        product_category: item.product_category,
        unit: item.name
      }
      this.showPopup = true
    },
    // 修改品类单位
    saveCategoryUnit () {
      categoryType.settingUnit({
        id: this.categoryUnitEditInfo.id,
        category_id: this.categoryUnitEditInfo.category_id,
        name: this.categoryUnitEditInfo.unit
      }).then(res => {
        if (res.data.status !== false) {
          this.$message.success('修改成功')
          this.showPopup = false
          this.getCategoryUnit()
        }
      })
    },
    // 获取纱线原料列表
    getYarn () {
    },
    // 获取装饰辅料列表
    getMaterial () {

    }
  },
  created () {
    this.pName = '产品品类管理'
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/setting/setting.less";
</style>
<style lang="less">
#setting {
  .el-input__inner {
    height: 32px;
  }
}
</style>
