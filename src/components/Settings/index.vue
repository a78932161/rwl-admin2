<template>
  <div>
    <div v-show="showFlag">
      <div class="ss-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>平台设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content2">
        <el-button type="primary" @click="goRecharge">充值奖励</el-button>
        <el-button type="primary" @click="goCommission">提成机制</el-button>
        <el-button type="primary" @click="goAdminer">管理员</el-button>
        <el-button type="primary" @click="goProblem">常见问题</el-button>
      </div>
    </div>
    <recharge v-show="isRecharge" @goIndex1="goIndex1"></recharge>
    <commission v-show="isCommission" @goIndex3="goIndex3"></commission>
    <problem v-show="isProblem" @goIndex2="goIndex2"></problem>
    <adminer v-show="isAdminer" @goIndex4="goIndex4"></adminer>
  </div>

</template>

<script>
  import recharge from '@/components/Settings/recharge'
  import commission from '@/components/Settings/commission'
  import problem from '@/components/Settings/problem'
  import adminer from '@/components/Settings/adminer/index'

  export default {
    components:{
      recharge,
      commission,
      problem,
      adminer
    },
    data(){
      return{
        showFlag:true,
        isRecharge:false,
        isCommission:false,
        isProblem:false,
        isAdminer:false,
      }
    },
    methods:{
      goRecharge(){
        this.showFlag=false;
        this.isRecharge=true;
      },
      goCommission(){
        this.showFlag=false;
        this.isCommission=true;
      },
      goProblem(){
        this.showFlag=false;
        this.isProblem=true;
      },
      goAdminer(){
        this.showFlag=false;
        this.isAdminer=true;
      },

      goIndex1(data){
        this.isRecharge=false;
        this.showFlag=data;
      },
      goIndex2(data){
        this.isProblem=false;
        this.showFlag=data;
      },
      goIndex3(data){
        this.isCommission=false;
        this.showFlag=data;
      },
      goIndex4(data){
        this.isAdminer=false;
        this.showFlag=data;
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ss-top {
    margin-bottom: 15%;
  }

  .ord-content2 {
    text-align: center;
  }

  .ord-content2 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
