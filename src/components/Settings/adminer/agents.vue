<template>
  <div>
    <div v-show="showFlag2">
      <div class="cr-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex">平台设置</span></el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex5">管理员</span></el-breadcrumb-item>
          <el-breadcrumb-item>代理商</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="cr-top1">
        <div>
          <el-cascader
            placeholder="试试搜索：浙江"
            :options="options"
            filterable
            change-on-select
            clearable
            v-model="selectedOptions"
          ></el-cascader>
          <el-button type="primary">查询</el-button>
        </div>
        <el-radio v-model="radio" label="1" border>新增代理商</el-radio>
      <el-radio v-model="radio" label="2" border @change="qaq">新增角色</el-radio>
      <el-button type="primary" @click="dialogVisible= true">添加代理商<i class="el-icon-plus"></i></el-button>
    </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="name"
            label="区域">
          </el-table-column>
          <el-table-column label="操作" width="210">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary" @click="goStore">查看门店
              </el-button>
              <el-button
                size="mini"
                type="mini">修改代理商
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;margin: 5% 0 5% 0;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <el-dialog
        title="添加代理商"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <el-form label-width="100px">
          <el-form-item label="账户名 :">
            <el-input type="age" v-model="value1" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="代理商 :">
            <el-input type="age" v-model="value2" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="地区负责人 :">
            <el-input type="age" v-model="value3" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="联系电话 :">
            <el-input type="age" v-model="value4" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="QQ :">
            <el-input type="age" v-model="value5" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="办公地址 :">
            <el-input type="age" v-model="value5" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="办公时间 :">
            <el-input type="age" v-model="value5" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="选择地区 :">
            <el-cascader
              placeholder="试试搜索：浙江"
              :options="options"
              filterable
              change-on-select
              clearable
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="选择区域 :">
            <el-checkbox-group
              v-model="checkedCities1">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <store v-show="isStore" @goIndex6="goIndex6"></store>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import store from '@/components/Settings/adminer/store'

  export default {
    components: {
      store,
    },
    data() {
      return {
        options: CityInfo,
        radio: this.$store.state.radio1,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        dialogVisible: false,
        selectedOptions: [],
        checkedCities1: [],
        cities: [],
        isStore:false,
        showFlag2:true,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      goIndex() {
        this.$router.go(0);
      },
      goIndex5() {
        this.$emit('goIndex5', true);
      },
      goIndex6(data){
        this.showFlag2=data;
        this.isStore=false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      qaq() {
        this.$store.commit('changeRadio1','2');
        this.$emit('goIndex6', true);
        console.log(this.$store.state.radio1);
      },

      handleChange(value) {
        console.log(value);
        this.cities = [];
        this.options.forEach((value1) => {
          if (value[0] == value1.value) {
            value1.children.forEach((value2) => {
              if (value[1] == value2.value) {
                value2.children.forEach((value3) => {
                  this.cities.push(value3.label);
                })
              }
            })
          }
        });
      },
      goStore(){
        this.isStore=true;
        this.showFlag2=false;
      }
    },

  }
</script>

<style scoped>
  .cr-top {
    margin-bottom: 3%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }

  .el-checkbox__label {
    font-size: 16px;
  }

  .el-checkbox {
    margin-left: 30px;
  }

  .cr-top1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3%;
  }
</style>
