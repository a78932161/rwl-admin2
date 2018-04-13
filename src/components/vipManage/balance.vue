<template>
  <div>
    <top></top>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="4" class="vipAside">
        <div class="vipTop">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/vip' }">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户余额</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card class="vipInfo">
          <div><label>姓名 :</label></div>
          <div><label>会员ID :</label></div>
          <div><label>手机 :11111111111</label></div>
        </el-card>

      </el-col>
      <el-col :span="14" class="vipMain">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="类目"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="账号余额">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="110">
            <template slot-scope="scope">
              <el-button  type="text" size="small" @click="goUserOrders" >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin: 5% 0 5% 0;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import top from '@/assets/vue/top'
  export default {
    components:{
      top,
    },
    data() {
      return {
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
    methods:{
      goUserOrders(){
        this.$router.push('userOrders')
      }
    }
  }
</script>

<style scoped>


  .el-breadcrumb {
    font-size: 18px;
  }

  .top {
    height: 50px;
    border-bottom: 1px solid rgb(20, 190, 240);
    display: flex;
    align-items: center;
    margin: 0 0 30px 0;
  }

  .logo {
    display: flex;
  }

  .logo1 {
    margin: 0 10px 0 0;
  }

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .logo2 {
    color: rgb(20, 190, 240);
    font-size: 20px;
    letter-spacing: 2px;
    margin: 5px 0 0 0;
  }
  .vipAside{

  }
  .vipTop {
    margin: 0 0 10% 0;
  }

  .vipInfo {
    width: 80%;
    padding: 5px;
    font-size: 20px;
    line-height: 40px;

  }

  .vipMain {
  margin: 2% 0 0 0;

  }
</style>
