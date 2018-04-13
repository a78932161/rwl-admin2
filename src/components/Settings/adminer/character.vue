<template>
  <div>
    <div class="cr-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex2">管理员</span></el-breadcrumb-item>
        <el-breadcrumb-item>角色</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="cr-top1">
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
      <el-radio v-model="radio" label="1" border @change="qaq" >新增代理商</el-radio>
      <el-radio v-model="radio" label="2" border >新增角色</el-radio>
      <el-button type="primary" @click="dialogVisible= true">添加新角色<i class="el-icon-plus"></i></el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="部门">
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="dialogVisible2 =true">设置权限
            </el-button>
            <el-button
              size="mini"
              type="mini"
              @click="dialogVisible1 = true">更改密码
            </el-button>
            <el-button
              size="mini"
              type="mini"
              @click="dialogVisible1 = true">修改角色
            </el-button>
            <el-button
              size="mini"
              type="danger">删除角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center;margin: 5% 0 5% 0;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="添加新角色"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
      <el-form label-width="80px">
        <el-form-item label="姓名 :">
          <el-input type="age" v-model="value1" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="部门 :">
          <el-input type="age" v-model="value2" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="密码 :">
          <el-input type="age" v-model="value3" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :">
          <el-input type="age" v-model="value4" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="联系电话 :">
          <el-input type="age" v-model="value5" placeholder="请输入电话"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="更改密码"
      :visible.sync="dialogVisible1"
      width="35%"
      :before-close="handleClose">
      <el-form label-width="80px">
        <el-form-item label="账户名 :">
          <el-input type="age" v-model="value1" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :">
          <el-input type="age" v-model="value2" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :">
          <el-input type="age" v-model="value3" placeholder="请输入密码"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改权限"
      :visible.sync="dialogVisible2"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">A1.1-订单管理</el-checkbox>
        <div style="margin: 15px 0;">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">B1.1-会员管理</el-checkbox>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
            <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">C1.1-基础资料</el-checkbox>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
            <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">D1.1-财务管理</el-checkbox>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
            <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAll4" @change="handleCheckAllChange4">E1.1-平台设置</el-checkbox>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedCities4" @change="handleCheckedCitiesChange4">
            <el-checkbox v-for="city in cities4" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import "@/assets/js/city-data"

  const cityOptions = ['A01-省市', 'A02-洗衣', 'A05-小让商城', 'A06-高端洗护','A08-小让家具','A09-订单分析'];
  const cityOptions1= ['B01-全部会员','B02-已消费会员','B03-未消费会员','B04-已储值会员','B05-消费统计'];
  const cityOptions2= ['C01-洗衣设置','C02-小让家具设置','C03-小让商城设置','C04-高端洗护设置','C05-广告设置'];
  const cityOptions3= ['D01-账户管理','D02-商户管理','D03-收支汇总'];
  const cityOptions4= ['E01-新增门店','E02-新增角色','E03-提成管理'];


  export default {

    data() {
      return {
        options: CityInfo,
        radio: '2',
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2:false,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: false,
        checkAll1: false,
        checkedCities1: [],
        cities1: cityOptions1,
        isIndeterminate1: false,
        checkAll2: false,
        checkedCities2: [],
        cities2: cityOptions2,
        isIndeterminate2: false,
        checkAll3: false,
        checkedCities3: [],
        cities3: cityOptions3,
        isIndeterminate3: false,
        checkAll4: false,
        checkedCities4: [],
        cities4: cityOptions4,
        isIndeterminate4: false,
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
      goIndex() {
        this.$router.go(0);
      },
      goIndex2() {
        this.$emit('goIndex2', true);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckAllChange1(val) {
        this.checkedCities1 = val ? cityOptions1 : [];
        this.isIndeterminate1 = false;
      },
      handleCheckedCitiesChange1(value) {
        let checkedCount = value.length;
        this.checkAll1 = checkedCount === this.cities1.length;
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities1.length;
      },
      handleCheckAllChange2(val) {
        this.checkedCities2 = val ? cityOptions2 : [];
        this.isIndeterminate2 = false;
      },
      handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.cities2.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities2.length;
      },
      handleCheckAllChange3(val) {
        this.checkedCities3 = val ? cityOptions3 : [];
        this.isIndeterminate3 = false;
      },
      handleCheckedCitiesChange3(value) {
        let checkedCount = value.length;
        this.checkAll3 = checkedCount === this.cities3.length;
        this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities3.length;
      },
      handleCheckAllChange4(val) {
        this.checkedCities4 = val ? cityOptions4 : [];
        this.isIndeterminate4 = false;
      },
      handleCheckedCitiesChange4(value) {
        let checkedCount = value.length;
        this.checkAll4 = checkedCount === this.cities4.length;
        this.isIndeterminate4 = checkedCount > 0 && checkedCount < this.cities4.length;
      },
      qaq(){
        this.$emit('goIndex3',true);
      }
    },

  }
</script>

<style scoped>
  .cr-top {
    margin-bottom: 3%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }
  .el-checkbox__label{
    font-size: 16px;
  }
  .cr-top1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3%;
  }
</style>
