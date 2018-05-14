<template>
  <div>
    <div v-show="dcShow">
      <div class="bc-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bc-content2">
        <el-button type="primary" @click="goAds">广告</el-button>
        <el-button type="primary" @click="goLaundry">洗衣</el-button>
        <el-button type="primary" @click="goFurniture">小让家具</el-button>
        <el-button type="primary" @click="goMall">小让商城</el-button>
        <el-button type="primary" @click="goDesigner">高端洗护</el-button>
      </div>
    </div>
    <ads v-if="isAds" @gojczl="gojczl"></ads>

  </div>
</template>

<script>
  import ads from '@/components/basic/advertising'

  export default {
    components: {
      ads
    },
    data() {
      return {
        dcShow: true,
        isAds: false,
      }
    },
    methods: {
      goAds(){
        this.dcShow=false;
        this.isAds=true;
      },
      gojczl(data){
        this.dcShow=data;
        this.isAds=false;
      },
      goLaundry(){
        this.$router.push('basicLaundry');
      },
      goFurniture(){
        this.$router.push('basicFurniture');
      },
      goMall(){
        this.$router.push('basicMall');
      },
      goDesigner(){
        this.$router.push('basicDesigner');
      },
    }
  }

</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .bc-top {
    margin-bottom: 15%;
  }

  .bc-content2 {
    text-align: center;
  }

  .bc-content2 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
