<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <el-input placeholder="请输入内容" size="mini"></el-input>
      <el-button type="primary" size="mini">查询</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dome"
  }
</script>

<style scoped>
.el-breadcrumb{
  font-size: 18px;

}
.ord-top{
  margin: 0 0 20px 0;

}

.ord-content{
  display: flex;
  width: 30%;
}

</style>
