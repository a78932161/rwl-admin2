<template>
  <div>
    <top></top>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="3" class="aside">
        <div class="NavMenu">
          <ul>
            <li style="font-size: 20px">商品列表</li>
            <div v-for="(item,index) in list">
              <a @click="NavMenuok(index)">
                <li :class="['item', bgSelected(index)]">{{item.name}}</li>
              </a>
              <div v-if="NavMenu[index]" class="NavMenudiv">
                <div v-for="(item1,index1) in title" style="text-align: center;text-overflow: ellipsis">
                  <span v-if="title1[index1]" class="el-icon-caret-right"></span>
                  <el-button type="text" style="color: rgb(106, 119, 127)" @click="goodsUp(index1,item1)">
                    {{item1.name}}
                  </el-button>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </el-col>
      <el-col :span="15" class="main" v-show="isok">
        <div class="ly-top">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/basic'}">基础资料</el-breadcrumb-item>
            <el-breadcrumb-item>高端洗护</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="ly-content">
          <label style="font-size: 20px">商品信息</label>
          <el-form class="demo-ruleForm" label-position="right" label-width="120px" :model="tableList" ref="tableList"
                   :rules="rules">
            <el-form-item label="单品名称 :" prop="name">
              <el-input placeholder="请输入名称" v-model="tableList.name" style="width: 40%;"></el-input>
            </el-form-item>
            <el-form-item label="原价 :" prop="old_price">
              <el-input placeholder="请输入名称" v-model="tableList.old_price" style="width: 40%;"></el-input>
            </el-form-item>
            <el-form-item label="现价 :" prop="price">
              <el-input placeholder="请输入名称" v-model="tableList.price" style="width: 40%;"></el-input>
            </el-form-item>
            <el-form-item label="设置图片 :">
              <el-upload
                action="http://rtest.rwlai.cn/rwlmall/rwlmall/file/uploadimage"
                :limit="1"
                list-type="picture-card"
                :headers="headers"
                :on-preview="handlePictureCardPreview"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="商品库存数目 :" prop="stock">
              <el-input placeholder="商品的库存数" v-model="tableList.stock" style="width: 40%"></el-input>
              <label>不填则默认为：9999999</label>
            </el-form-item>
            <el-form-item label="商品生效日期 :" prop="date">
              <el-date-picker
                v-model="tableList.date"
                type="datetime"
                style="width: 40%"
                @blur="ipchange"
                placeholder="选择日期时间">
              </el-date-picker>
              <label>产品的有效日期不能早于创建当天的o点</label>
            </el-form-item>
            <el-form-item label="商品排序  :" prop="sort">
              <el-input placeholder="商品顺序权重" style="width: 40%" v-model="tableList.sort"></el-input>
              <label>必须是整数，不传默认为o，权重数字越大越靠前</label>
            </el-form-item>
            <el-form-item>
              <el-button v-show="isadd" type="primary" style="margin-right: 3% " @click="goodsAdd()">新增</el-button>
              <el-button v-show="isadd1" type="primary" style="margin-right: 3% " @click="goodsAdd1()">保存</el-button>
              <el-button v-show="isadd" @click="resetForm('tableList')">重置</el-button>
              <el-button v-show="isadd1" @click="shelf1">{{shelf}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import top from '@/assets/vue/top'
  import {laundryAdd, laundryselect, selectId, shelf, laundryUp} from '@/components/api/basiclaundry'
  import {getToken} from '@/auth'

  export default {
    components: {
      top,
    },
    data() {
      let oldprice = (rule, value, callback) => {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false) {
          callback(new Error('必须是正数'));
        } else {
          callback();
        }
      };
      let price = (rule, value, callback) => {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false) {
          callback(new Error('必须是正数'));
        } else if (value > this.tableList.oldPrice) {
          callback(new Error('现价不能高于原价'));
        }
        else {
          callback();
        }
      };
      let stock = (rule, value, callback) => {
        if (/^[1-9]\d*$/.test(value) === false) {
          callback(new Error('必须是正整数'));
        } else if (value > 9999999) {
          callback(new Error('不能超过9999999'));
        }
        else {
          callback();
        }
      };
      let sort = (rule, value, callback) => {
        if (/^[0-9]\d*$/.test(value) === false) {
          callback(new Error('必须是正整数'));
        } else if (value > 9999999) {
          callback(new Error('不能超过9999'));
        }
        else {
          callback();
        }
      };

      return {
        NavMenu: {},
        dialogImageUrl: '',
        dialogVisible: false,
        isok: false,
        isadd: true,
        isadd1: false,
        title: '',
        title1: {},
        shelf: '',
        goodsId: {},
        category: '',
        fileList: [],
        imgUrl: 'http://rtest.rwlai.cn/rwlmall/rwlmall/images/',
        list: [
          {name: '上衣类', value: '1'},
          {name: '裤裙类', value: '2'},
          {name: '装饰类', value: '3'},
          {name: '皮草类', value: '4'},
          {name: '鞋包类', value: '5'},
        ],
        tableList: {
          name: '',
          old_price: '',
          price: '',
          logo: '',
          stock: '',
          date: '',
          sort: '',
          category: '',
          type: 2,
          status: 1,
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          old_price: [
            {required: true, message: '请输入原价',},
            {validator: oldprice, trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入现价',},
            {validator: price, trigger: 'blur'}
          ],
          stock: [
            {required: true, message: '请输入库存',},
            {validator: stock, trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入权重',},
            {validator: sort, trigger: 'blur'}
          ],
          date: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
        },


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
          this.isok = false;
        } else {
          this.NavMenu = {};
          this.NavMenu[index] = true;
          this.isok = true;
          this.goodsSelect(index);
          this.title1 = {};
          this.tableList = {
            name: '',
            old_price: '',
            price: '',
            logo: '',
            stock: '',
            date: '',
            sort: '',
            category: '',
            type: 2,
            status: 1,
          };
          this.fileList = [];
          this.isadd = true;
          this.isadd1 = false;
          this.resetForm('tableList');
          this.category = index;

        }
      },
      goodsAdd() {
        if (this.tableList.name != '' || this.tableList.old_price != '' || this.tableList.price != '' ||
          this.tableList.stock != '' || this.tableList.date != '' || this.tableList.stock != '') {

          let a = {
            name: this.tableList.name,
            old_price: this.tableList.old_price * 100,
            price: this.tableList.price * 100,
            logo: this.tableList.img,
            stock: this.tableList.stock,
            date: this.tableList.date.getTime(),
            sort: this.tableList.stock,
            category: this.category,
            type: 2,
            status: 1,
          };
          laundryAdd(a).then((res) => {
            this.goodsSelect(this.category);
            this.$message({
              message: '添加成功!',
              type: 'success'
            });
            this.tableList = {
              name: '',
              old_price: '',
              price: '',
              logo: '',
              stock: '',
              date: '',
              sort: '',
              category: '',
              type: 2,
              status: 1,
            };
            this.resetForm('tableList');
          })
        } else {
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
        }
      },
      goodsAdd1() {
        if (this.tableList.name != '' || this.tableList.old_price != '' || this.tableList.price != '' ||
          this.tableList.stock != '' || this.tableList.date != '' || this.tableList.stock != '') {
          let a = {
            name: this.tableList.name,
            old_price: this.tableList.old_price * 100,
            price: this.tableList.price * 100,
            logo: this.tableList.img,
            stock: this.tableList.stock,
            date: this.tableList.date,
            sort: this.tableList.stock,
            category: this.category,
            type: 2,
            status: this.tableList.status,
          };
          let b = {
            productid: this.tableList.id,
          };

          laundryUp(b, a).then((res) => {
            this.goodsSelect(this.category);
            this.$message({
              message: '修改成功!',
              type: 'success'
            });
            this.goodsUp(this.goodsId.index1, this.goodsId.item1);
          })
        } else {
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
        }

      },
      goodsSelect(category) {
        let a = {
          type: 2,
          category: category,
        };
        laundryselect(a).then((res) => {
          this.title = res.data.data;
        })
      },
      goodsUp(index1, item1) {
        this.title1 = {};
        this.title1[index1] = true;
        this.goodsId = {
          index1,
          item1,
        };
        let a = {
          number: item1.number
        };
        selectId(a).then((res) => {
          this.resetForm('tableList');
          this.tableList = res.data.data;
          this.tableList.old_price = (this.tableList.old_price / 100);
          this.tableList.price = (this.tableList.price / 100);

          this.fileList = [];
          if (res.data.data.logo != null) {
            let a = {
              name: res.data.data.logo,
              url: `${this.imgUrl}${res.data.data.logo}`,
            };
            this.fileList.push(a);
          }

          this.isadd1 = true;
          this.isadd = false;
          if (this.tableList.status == 0) {
            this.shelf = '下架';
          } else if (this.tableList.status == 1) {
            this.shelf = '上架';
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      shelf1() {
        let a = {
          productid: this.tableList.id
        };
        shelf(a).then((res) => {
          if (res.data.msg == '成功') {
            this.goodsUp(this.goodsId.index1, this.goodsId.item1);
            this.$message({
              message: '操作成功!',
              type: 'success'
            });
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.tableList.img = '';
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = `${this.imgUrl}${file.response.data}`;
        this.dialogVisible = true;
      },
      handleChange(file, fileList) {
        if (file.response != undefined) {

          this.tableList.img = file.response.data;
        }
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
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      ipchange(){
          this.tableList.date=this.tableList.date.getTime();
      }
    },
    computed: {
      headers() {
        return {
          'x-auth-token': localStorage.getItem('token'),
        }
      }
    },
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
</style>
