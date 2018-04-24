<template>
  <div class="qaq">
    <div style="margin-bottom: 3%">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gojczl">基础资料</span></el-breadcrumb-item>
        <el-breadcrumb-item>广告设置</el-breadcrumb-item>
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
          <el-input v-model="value1" placeholder="请输入秒数"></el-input>
        </el-form-item>
        <el-form-item label="设置图片 :">
          <el-upload
            action="http://rtest.rwlai.cn/rwlmall/rwlmall/file/uploadimage"
            :limit="5"
            list-type="picture-card"
            :headers="headers"
            :on-preview="handlePictureCardPreview"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in fileList"
          :label="'图片地址' + index + ' :'"
          :key="domain.key"
        >
          <el-input v-model="domain.value"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button v-show="" type="primary">提交</el-button>
          <el-button v-show="" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getAd} from "@/components/api/basicad";

  export default {
    data() {
      return {
        radio: '1',
        value1: '',
        domains: [{
          value: ''
        }],
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        isok: true,
        isok1: false,
      }
    },
    methods: {
      gojczl() {
        this.$emit('gojczl', true);
      },

      getlist(index) {
        let a = {
          type: index,
        };
        getAd(a).then((res) => {
          console.log(res);
          if (res.data.data != null) {
            this.value1 = res.data.data.time;

          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(file, fileList) {
        this.fileList = fileList;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    },
    computed: {
      headers() {
        return {
          'x-auth-token': localStorage.getItem('token'),
        }
      }
    },
    mounted() {
      if (this.radio == '1') {
        this.getlist(1);

      }

    }
  }
</script>

<style>
  .el-breadcrumb {
    font-size: 18px;
  }

  .el-radio__label {
    font-size: 16px;
  }
</style>
