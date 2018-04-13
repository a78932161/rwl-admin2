<template>
  <div>
    <el-col :span="24" class="top">
      <el-col :span="6" :offset="4" class="logo">
        <div class="logo1"><img src="../img/logo.png"></div>
        <div class="logo2"><label>全国管理中心</label></div>
      </el-col>
      <el-col :span="4" :offset="10">
        <el-button type="text" class="logo3" @click="zhuxiao">注销</el-button>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import {removeToken} from "@/auth";
  export default {
    name: "top",
    methods:{
      zhuxiao(){
        this.$confirm('确认注销 吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          removeToken();
          this.$router.push({path: '/login'});
          this.$message({
            message: '注销成功!',
            type: 'success'
          });
        }).catch(() => {
        });
      }
    }
  }
</script>

<style scoped>
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

  .logo3 {
    font-size: 16px;
  }
</style>
