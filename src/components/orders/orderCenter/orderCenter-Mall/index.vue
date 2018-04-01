<template>
  <div>
    <el-col :span="24" class="top">
      <el-col :span="6" :offset="4" class="logo">
        <div class="logo1"><img src="../../../../assets/img/logo.png"></div>
        <div class="logo2"><label>全国管理中心</label></div>
      </el-col>
      <el-col :span="4" :offset="10">
        <el-button type="text" class="logo3">注销</el-button>
      </el-col>
    </el-col>
    <el-col :span="24" class="o-container">
      <el-col :span="4" :offset="3" class="o-aside">
        <div class="o-aside-l">
          <label >订单中心</label>
        </div>
        <div class="NavMenu">
          <router-link to="/newMall"><span>|</span>新订单</router-link>
          <router-link to="/sentMall"><span>|</span>已派订单</router-link>
          <router-link to="/endMall"><span>|</span>完结订单</router-link>
          <router-link to="/cancelMall"><span>|</span>取消订单</router-link>
        </div>
      </el-col>
      <el-col :span="15" class="o-main">
        <router-view>
        </router-view>
      </el-col>
    </el-col>

  </div>
</template>

<script>

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
  .o-aside{
    text-align: center;
  }
  .o-aside-l {
    font-size: 26px;
    letter-spacing: 2px;
    color: rgb(20, 190, 240);
    margin:  0 0 10% 0;
  }

  .NavMenu {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;


  }

  .NavMenu a {
    text-decoration: none;
    color: rgb(106, 119, 127);
    font-size: 20px;
  }
  .NavMenu span {
    font-size: 20px;
    font-weight: bolder;
    color: rgb(20, 190, 240);
    line-height: 50px;
    margin: 0 10px 0 0;
  }
  .NavMenu a:hover  {
    color: rgb(56,200,243);
  }
  a.router-link-active {
    color: rgb(56,200,243);
  }




</style>
