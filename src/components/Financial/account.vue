<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gofinancial">财务管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <div class="ord-content1">
        <el-input placeholder="请输入内容"></el-input>
        <el-button type="primary">查询</el-button>
      </div>
      <div>
        <el-date-picker
          v-model="value1"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
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
    </div>
    <div class="ord-content2">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="转账类型 :" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="导卡"></el-radio>
            <el-radio label="退款"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="莫好克卡号 :" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="会员卡类型 :" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="折扣卡" value="shanghai"></el-option>
            <el-option label="无折扣卡" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额 :" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="实际存转金额 :" prop="name">
          <label>$0.00</label>
        </el-form-item>
        <el-form-item label="持卡人姓名 :" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="持卡人手机 :" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="注册手机号 :" prop="name">
          <el-input v-model="ruleForm.name" style="width: 70%"></el-input>
          <el-button type="primary">读取</el-button>
        </el-form-item>
        <el-form-item label="备注 :" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认转存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ord-content3">
      <div><label>转存记录</label></div>
      <div style="text-align: right;">
        <label>转存记录查询 :</label>
        <el-input placeholder="请输入内容" style="width: 52%"></el-input>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="ord-content3">
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="name"
          label="转出卡号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="转存金额">
        </el-table-column>
        <el-table-column
          prop="name"
          label="转入账号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="godetail">详情</el-button>
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
  </div>
</template>

<script>
  import "@/assets/js/city-data"


  export default {
    components: {},
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        options: CityInfo,
        value1: '',
        a: 10,
        showFlag: true,
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      godetail() {
        this.$emit('mmp', true);
      },
      gofinancial(){
        this.$emit('mmp1', true);
      }
    },


  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin: 0 0 3% 0;
    text-align: center;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 5% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }

  .demo-ruleForm {
    width: 40%;
    margin: auto;
  }

  .ord-content3 {
    margin-bottom: 3%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
