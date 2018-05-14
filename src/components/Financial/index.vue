<template>
  <div>
    <div v-show="showFlag">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="ord-content2">
          <el-button type="primary" @click="goAccount" >账号管理</el-button>
          <el-button type="primary" @click="goclearing">商户结算</el-button>
      </div>
    </div>
    <account v-if="isAccount" @mmp="godetails" @mmp1="godetails1"></account>
    <Details v-if="isDetails" @mp="godetails1" @mp1="godetails2"></Details>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import Account from '@/components/Financial/account'
  import Details from '@/components/Financial/details'

  export default {
    components: {
      Account,
      Details
    },
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
        isAccount: false,
        isDetails:false,
      }
    },
    methods: {
      goAccount() {
        this.showFlag = false;
        this.isAccount = true;
      },
      godetails(data){
        this.isDetails=data;
        this.isAccount = false;
      },
      godetails1(data){
        this.showFlag=data;
        this.isAccount = false;
        this.isDetails=false;
      },
      godetails2(data){
        this.showFlag=false;
        this.isAccount = data;
        this.isDetails=false;
      },


      goclearing(){
        this.$router.push('/clearing')
      }
    },

  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin-bottom: 15%;
    text-align: center;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 11% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }

  .ord-content2 {
    display: flex;
    justify-content: space-around;

  }

  .ord-content2 button {
    width: 250px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
