<template>
  <div>
    <top></top>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="3" class="aside">
        <div class="NavMenu">
          <ul>
            <li style="font-size: 20px">商品列表</li>
            <div v-for="(item,index) in list" >
              <a @click="NavMenuok(index)">
                <li :class="['item', bgSelected(index)]">{{item.name}}</li>
              </a>
              <div v-if="NavMenu[index]" class="NavMenudiv">
                11<br>
                12
              </div>
            </div>
          </ul>
        </div>
      </el-col>
      <el-col :span="15" class="main">
        <div class="ly-top">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/basic'}">基础资料</el-breadcrumb-item>
            <el-breadcrumb-item>小让家具</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="ly-content">
          <label style="font-size: 20px">商品信息</label>
          <el-form class="demo-ruleForm" label-position="right" label-width="120px">
            <el-form-item label="单品名称 :">
              <el-input placeholder="请输入名称" style="width: 40%;"></el-input>
            </el-form-item>
            <el-form-item label="原价 :">
              <el-input placeholder="请输入名称" style="width: 40%;"></el-input>
            </el-form-item>
            <el-form-item label="现价 :">
              <el-input placeholder="请输入名称" style="width: 40%;"></el-input>
            </el-form-item>
            <el-form-item label="商品首图 :">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-form-item>

            <el-form-item label="商品详情图 :">
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
            <el-form-item label="商品描述标题 :">
              <el-input placeholder="请输入名称" style="width: 40%;"></el-input>
            </el-form-item>
            <el-form-item label="商品描述详情 :">
              <el-input type="textarea" placeholder="请输入名称" style="width: 40%;"
                        :autosize="{ minRows: 4, maxRows: 8}"></el-input>
            </el-form-item>

            <el-form-item label="商品库存数目 :">
              <el-input placeholder="商品的库存数" style="width: 40%"></el-input>
              <label>不填则默认为：9999999</label>
            </el-form-item>
            <el-form-item label="商品生效日期 :">
              <el-date-picker
                type="datetime"
                style="width: 40%"
                placeholder="选择日期时间">
              </el-date-picker>
              <label>产品的有效日期不能早于创建当天的o点</label>
            </el-form-item>
            <el-form-item label="商品排序  :">
              <el-input placeholder="商品顺序权重" style="width: 40%"></el-input>
              <label>必须是整数，不传默认为o，权重数字越大越靠前</label>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-right: 3% ">保存</el-button>
              <el-button>上架</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import top from '@/assets/vue/top'

  export default {
    components: {
      top,
    },
    data() {
      return {
        NavMenu: {},
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: '',
        list: [
          {name: '家具类', value: '1'},
        ],
      }
    },
    methods: {
      bgSelected(index) {
        return this.NavMenu[index] ? 'bg-selected' : '';
      },
      NavMenuok(index) {
        if (this.NavMenu[index] == true) {
          this.NavMenu = {};
          this.NavMenu[index] = false;
        } else {
          this.NavMenu = {};
          this.NavMenu[index] = true;
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .bg-selected {
    background: rgb(56, 200, 243);
    color: white;
  }

  .aside {
    padding: 20px 100px 0 50px;
  }

  .router-link-active {
    background: rebeccapurple;
  }

  .NavMenu a:hover {
    background: rgb(56, 200, 243);
    color: white;
    display: block;
  }

  .NavMenu ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .NavMenu li {
    padding: 20px 0 0 0;
    border: 1px solid rgb(205, 210, 212);
    width: 160px;
    height: 40px;
    text-align: center;
  }

  .NavMenu a {
    text-decoration: none;
    color: rgb(106, 119, 127);
    cursor: pointer;
  }

  .NavMenudiv {
    border: 1px solid rgb(205, 210, 212);
    text-align: center;
    line-height: 30px;
    font-size: 16px;
  }

  .ly-content {
    text-align: center;
    margin: auto;
  }

  .demo-ruleForm label {
    font-size: 14px;
    margin: 0 0 0 15px;
    color: red;
  }

  .demo-ruleForm {
    width: 80%;
    margin-top: 3%;
    margin-left: 25%;
    text-align: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>
