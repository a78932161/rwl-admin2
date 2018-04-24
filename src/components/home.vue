<template>
  <div>
    <top></top>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="3" class="aside">
        <div class="NavMenu">
          <ul>
            <router-link to="/orders"><li>订单管理</li></router-link>
            <router-link to="/vip"><li>会员管理</li></router-link>
            <router-link to="/basic"><li>基础资料</li></router-link>
            <router-link to="/financial"><li>财务管理</li></router-link>
            <router-link to="/settings"><li>平台设置</li></router-link>
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
  import top from '@/assets/vue/top'

  export default {
    components:{
      top,
    },
    data(){
      return{

      }
    },
    methods:{

    },

  }
</script>

<style scoped>

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

