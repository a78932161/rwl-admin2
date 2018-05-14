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
          :total="total">
        </el-pagination>
      </div>
      <el-dialog
        title="添加代理商"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <el-form label-width="100px" :model="tableList" ref="tableList" :rules="rules">
          <el-form-item label="账户名 :">
            <el-input placeholder="请输入账户名"></el-input>
          </el-form-item>
          <el-form-item label="代理商 :">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="地区负责人 :" prop="people">
            <el-input v-model="tableList.people" placeholder="请输入地区负责人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话 :" prop="phone">
            <el-input v-model="tableList.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="QQ :" prop="qq">
            <el-input v-model="tableList.qq" placeholder="请输入qq"></el-input>
          </el-form-item>
          <el-form-item label="办公地址 :" prop="address">
            <el-input v-model="tableList.address" placeholder="请输入办公地址"></el-input>
          </el-form-item>
          <el-form-item label="办公时间 :" prop="workTime">
            <el-input v-model="tableList.workTime" placeholder="请输入办公时间"></el-input>
          </el-form-item>
          <el-form-item label="区域分配 :">
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
          <el-form-item label="可收区域 :">
            <el-checkbox-group
              v-model="checkedCities1">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addAs">新 增</el-button>
          <el-button @click="cancel">取 消</el-button>
      </span>
      </el-dialog>
    </div>
    <store v-if="isStore" @goIndex6="goIndex6"></store>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import store from '@/components/Settings/adminer/store'
  import {getAgents, addAgents, upAgents} from "@/components/api/agents";

  export default {
    components: {
      store,
    },
    data() {
      return {
        options: CityInfo,
        radio: this.$store.state.radio1,
        tableList: {
          phone: '',
          people: '',
          address: '',
          qq: '',
          workTime: '',
          regionDistribution: '',
          region: '',
        },
        dialogVisible: false,
        selectedOptions: [],
        checkedCities1: [],
        allocation: [],
        cities: [],
        isStore: false,
        showFlag2: true,
        size: 5,
        page: 1,
        total: 10,
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
        }],
        rules: {
          people: [
            {required: true, message: '请输入负责人', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
          ],
          qq: [
            {required: true, message: '请输入qq', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'},
          ],
          workTime: [
            {required: true, message: '请输入办公时间', trigger: 'blur'},
          ],

        },
      }
    },
    methods: {
      getList() {
        let a = {
          size: this.size,
          page: this.page,
        };
        getAgents(a).then((res) => {
          console.log(res);
        })
      },
      cancel(){
        this.dialogVisible=false;
        this.resetForm('tableList');
      },

      goIndex() {
        this.$router.go(0);
      },
      goIndex5() {
        this.$emit('goIndex5', true);
      },
      goIndex6(data) {
        this.showFlag2 = data;
        this.isStore = false;
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
        this.$store.commit('changeRadio1', '2');
        this.$emit('goIndex6', true);
      },

      handleChange(value) {
        this.cities = [];
        this.allocation = [];
        this.options.forEach((value1) => {
          if (value[0] == value1.value) {
            value1.children.forEach((value2) => {
              if (value[1] == value2.value) {
                this.allocation.push(value1.label);
                this.allocation.push(value2.label);
                value2.children.forEach((value3) => {
                  this.cities.push(value3.label);
                })
              }
            })
          }
        });
      },
      addAs() {
        if (this.tableList.phone && this.tableList.people && this.tableList.address && this.tableList.qq
          && this.tableList.workTime && this.allocation && this.cities) {
          this.tableList.regionDistribution = this.allocation.join(',');
          this.tableList.region = this.cities.join(',');
          addAgents(this.tableList).then((res) => {
            console.log(res);
          })
        } else {
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
        }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goStore() {
        this.isStore = true;
        this.showFlag2 = false;
      }
    },
    mounted() {
      this.getList();
    }
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
