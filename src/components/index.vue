<template>
  <div>
    <el-col :span="24" class="top">
      <el-col :span="6" :offset="4" class="logo">
        <div class="logo1"><img src="../assets/img/logo.png"></div>
        <div class="logo2"><label>全国管理中心</label></div>
      </el-col>
      <el-col :span="4" :offset="10">
        <el-button type="text" class="logo3">注销</el-button>
      </el-col>
    </el-col>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="3" class="aside">
        <div class="NavMenu">
          <ul>
            <router-link to="/orders"><li>订单管理</li></router-link>
            <router-link to="/dome"><li>会员管理</li></router-link>
            <router-link to="/dome2"><li>基础资料</li></router-link>
            <router-link to="/dome3"><li>财务管理</li></router-link>
            <router-link to="/dome4"><li>平台设置</li></router-link>
          </ul>
        </div>
      </el-col>
      <el-col :span="15" class="main">
         <router-view>
         </router-view>
      </el-col>
    </el-col>
  </div>

</template>

<script>
  export default {
    name: "index"
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
  .logo1 img{
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
  .aside{
    padding: 20px 100px 0 50px ;
  }

  .NavMenu ul{
    list-style: none;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
  }
  .NavMenu li {
    padding: 20px 0 0 0;
    border: 1px solid rgb(205,210,212);
    width: 160px;
    height: 40px;
    text-align: center;
  }

  .NavMenu a{
    text-decoration:none;
    color:rgb(106,119,127) ;
  }
  .NavMenu ul>a:hover  {
    background: rgb(56,200,243);
    color: white;
  }


   a.router-link-active {
    color: white;
    background: rgb(56,200,243);
  }



</style>

