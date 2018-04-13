<template>
  <div class="qaq">
    <div style="margin-bottom: 3%">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gojczl">基础资料</span></el-breadcrumb-item>
        <el-breadcrumb-item>充值奖励</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="font-size: 16px;margin-bottom: 3%">
      <label style="margin-right: 3%">选择广告模版 :</label>
      <el-radio v-model="radio" label="1">首页</el-radio>
      <el-radio v-model="radio" label="2">小让商城</el-radio>
    </div>
    <div style="width: 80%;margin-left:10% ">
      <el-form label-width="110px">
        <el-form-item label="设置轮播时间 :">
          <el-input v-model="value"  placeholder="请输入秒数"></el-input>
        </el-form-item>
        <el-form-item label="设置图片 :">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="图片地址 :">
          <el-input v-model="value"  placeholder="请输入秒数"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" >提交</el-button>
          <el-button >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        radio:'1',
        value:'',
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      gojczl(){
        this.$emit('gojczl',true);
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

    },

  }
</script>

<style>
  .el-breadcrumb {
    font-size: 18px;
  }
  .el-radio__label{
    font-size: 16px;
  }
</style>
