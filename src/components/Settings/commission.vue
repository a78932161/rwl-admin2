<template>
  <div>
    <div class="re-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex3">平台设置</span> </el-breadcrumb-item>
        <el-breadcrumb-item>提成机制</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="re-top1">
      <div>
        <el-cascader
          placeholder="试试搜索：浙江"
          :options="options"
          filterable
          change-on-select
          clearable
        ></el-cascader>
        <el-button type="primary">查询</el-button>
      </div>
      <div>
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      </div>

    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="类目">
        </el-table-column>
        <el-table-column
          prop="name"
          label="代理商">
        </el-table-column>
        <el-table-column
          prop="name"
          label="物流众包">
        </el-table-column>
        <el-table-column
          prop="name"
          label="平台">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini" @click="dialogVisible1 = true">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加奖励金额"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="80px">
        <el-form-item label="代理商 :">
          <el-input type="age" v-model="value1"  placeholder="请输入比例"></el-input>
        </el-form-item>
        <el-form-item label="物流众包 :">
          <el-input type="age" v-model="value2"  placeholder="请输入比例"></el-input>
        </el-form-item>
        <el-form-item label="平台 :">
          <el-input type="age" v-model="value3"  placeholder="请输入比例"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加奖励金额"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="80px">
        <el-form-item label="代理商 :">
          <el-input type="age" v-model="value4" placeholder="请输入比例"></el-input>
        </el-form-item>
        <el-form-item label="物流众包 :">
          <el-input type="age" v-model="value5"  placeholder="请输入比例"></el-input>
        </el-form-item>
        <el-form-item label="平台 :">
          <el-input type="age" v-model="value6"  placeholder="请输入比例"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import "@/assets/js/city-data"

  export default {
    data() {
      return {
        options: CityInfo,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        dialogVisible: false,
        dialogVisible1: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      goIndex3(){
        this.$emit('goIndex3', true);
      },
    },

  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .re-top {
    margin-bottom: 3%;
  }

  .re-top1 {
    margin-bottom: 3%;
    display: flex;
    justify-content: space-between;
  }
</style>
