<template>
  <div>
    <div class="cr-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex6">代理商</span></el-breadcrumb-item>
        <el-breadcrumb-item>角色</el-breadcrumb-item>
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
        ></el-cascader>
        <el-button type="primary">查询</el-button>
      </div>
      <el-radio v-model="radio" label="1" border @change="qaq">新增门店</el-radio>
      <el-radio v-model="radio" label="2" border>新增角色</el-radio>
      <el-button type="primary" @click="dialogVisible= true">添加角色<i class="el-icon-plus"></i></el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="szqx(scope.row)">设置权限
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row)">删除角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center;margin: 5% 0 5% 0;">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="添加新角色"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
      <el-form label-width="100px" :model="tableList" :rules="rules" ref="tableList">
        <el-form-item label="用户名 :" prop="username">
          <el-input v-model="tableList.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="部门 :" prop="department">
          <el-input v-model="tableList.department" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="联系电话 :" prop="phone">
          <el-input v-model="tableList.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="password">
          <el-input v-model="tableList.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" prop="dbpassword">
          <el-input v-model="tableList.dbpassword" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('tableList')">重 置</el-button>
    <el-button type="primary" @click="submitForm('tableList')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改权限"
      :visible.sync="dialogVisible2"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">A1.1-订单管理
        </el-checkbox>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">D1.1-财务管理
        </el-checkbox>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
            <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="authority()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {upPurview, findPurview} from "@/components/api/adminer";
  import {getProxyList, addProxy, delProxy} from "@/components/api/proxy";

  const cityOptions = ['A1-洗衣', 'A2-高端洗护', 'A3-小让家居', 'A5-订单分析'];
  const cityOptions3 = ['D2-商户管理'];
  export default {
    data() {
      let psw = (rule, value, callback) => {
        if (value !== this.tableList.password) {
          callback(new Error('两次密码不一样!'));
        }
        else {
          callback();
        }
      };
      return {
        options: CityInfo,
        radio: this.$store.state.radio2,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        size: 10,
        page: 1,
        total: 10,
        tableList: {
          username: '',
          password: '',
          dbpassword: '',
          department: '',
          phone: '',
        },
        tableList1: {
          username: '',
          password: '',
          dbpassword: '',
        },
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: false,
        checkAll3: false,
        checkedCities3: [],
        cities3: cityOptions3,
        isIndeterminate3: false,
        tableData: [],
        checkData: [],
        user: '',
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          dbpassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: psw, trigger: 'blur'}
          ],
          department: [
            {required: true, message: '请输入部门', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入手机', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      goIndex6() {
        this.$emit('goIndex6', true);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckAllChange3(val) {
        this.checkedCities3 = val ? cityOptions3 : [];
        this.isIndeterminate3 = false;
      },
      handleCheckedCitiesChange3(value) {
        let checkedCount = value.length;
        this.checkAll3 = checkedCount === this.cities3.length;
        this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities3.length;
      },
      qaq() {
        this.$store.commit('changeRadio2', '1');
        this.$emit('goIndex9', true);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getList() {
        let b = JSON.parse(localStorage.getItem("info"));
        let a = {
          page: this.page,
          size: this.size,
          number: 5,
          accountid: b.accountId,
        };
        getProxyList(a).then((res) => {
          if (res.data.data) {
            this.tableData = res.data.data.object;
            this.total = res.data.data.totalSize;
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let b = JSON.parse(localStorage.getItem("info"));
            let a = {
              username: this.tableList.username,
              password: this.tableList.password,
              department: this.tableList.department,
              phone: this.tableList.phone,
              accountId: b.accountId,
            };
            addProxy(a).then((res) => {
              if (res.data.code === 0) {
                this.dialogVisible = false;
                this.resetForm('tableList');
                this.getList();
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'warning'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写完整!',
              type: 'warning'
            });
            return false;
          }
        });
      },
      del(row) {
        this.$confirm('此操作将永久删除是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            username: row.username,
          };
          delProxy(a).then((res) => {
            this.$message({
              message: `${res.data.msg}`,
              type: 'success'
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      authority() {
        this.checkData = [];
        if (this.checkedCities.length > 0) {
          this.checkedCities.forEach((value) => {
            this.checkData.push(value.substring(2, 0));
          })
        }
        if (this.checkedCities3.length > 0) {
          this.checkedCities3.forEach((value) => {
            this.checkData.push(value.substring(2, 0));
          })
        }
        let a = {
          username: this.user,
          permission: this.checkData.join(','),
        };
        upPurview(a).then((res) => {
          if (res.data.code === 0) {
            this.dialogVisible2 = false;
            this.$message({
              message: `${res.data.msg}`,
              type: 'success'
            });
          } else {
            this.$message({
              message: `${res.data.msg}`,
              type: 'warning'
            });
          }
        })
      },
      szqx(row) {
        this.user = row.username;
        this.checkedCities = [];
        this.checkedCities3 = [];
        let a = {
          roleid: row.id,
        };
        findPurview(a).then((res) => {
          if (res.data.data.functionAuthority) {
            res.data.data.functionAuthority.split(',').forEach((value) => {
              switch (value.substring(1, 0)) {
                case 'A': {
                  cityOptions.forEach((value1) => {
                    if (value1.indexOf(value) > -1) {
                      this.checkedCities.push(value1);
                    }
                  })
                }
                  break;
                case 'B': {
                  cityOptions1.forEach((value1) => {
                    if (value1.indexOf(value) > -1) {
                      this.checkedCities1.push(value1);
                    }
                  })
                }
                  break;
                case 'C': {
                  cityOptions2.forEach((value1) => {
                    if (value1.indexOf(value) > -1) {
                      this.checkedCities2.push(value1);
                    }
                  })
                }
                  break;
                case 'D': {
                  cityOptions3.forEach((value1) => {
                    if (value1.indexOf(value) > -1) {
                      this.checkedCities3.push(value1);
                    }
                  })
                }
                  break;
                case 'E': {
                  cityOptions4.forEach((value1) => {
                    if (value1.indexOf(value) > -1) {
                      this.checkedCities4.push(value1);
                    }
                  })
                }
                  break;
              }
            });

          }
          this.dialogVisible2 = true;
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
    },
    mounted() {
      this.getList();
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

  .cr-top1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3%;
  }
</style>
