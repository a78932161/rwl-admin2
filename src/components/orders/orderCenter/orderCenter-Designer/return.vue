<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">高端洗护</el-breadcrumb-item>
        <el-breadcrumb-item>送还订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <div class="ord-content1">
        <el-input placeholder="请输入内容"></el-input>
        <el-button type="primary">查询</el-button>
      </div>
      <div class="ord-content3">
        <label class="ord-content3-l">昨天订单:<b>{{a}}</b>单</label>
        <label>今天订单:<b>{{a}}</b>单</label>
      </div>
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
    </div>
    <div class="ord-content5">
      <div>
        <el-cascader
          placeholder="试试搜索：门店"
          :options="options"
          filterable
          change-on-select
          clearable
        ></el-cascader>
        <el-button type="primary" disabled>立即派送</el-button>
        <el-button type="primary" disabled>已派订单</el-button>
        <el-button type="primary" disabled>入站订单</el-button>
        <el-button type="primary" disabled>取消订单</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData5"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="用户地址">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="预约时间">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="套餐选择">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="已付金额">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="收件人员">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="送件人员">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item style="display: flex; justify-content:center;width:100%">
                <el-button type="primary">查看详情</el-button>
                <el-button type="primary">完结订单</el-button>

              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="全选"
          prop="id">
        </el-table-column>
        <el-table-column
          label="派单时间"
          prop="id">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="id">
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
  </div>
</template>

<script>
  import "@/assets/js/city-data"

  export default {
    data() {
      return {
        a: 10,
        options: CityInfo,
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
    },
    methods: {
      aa() {
        this.$router.go(0)
      },
      goLaundry() {
        this.$router.push('/orderIndex');
      },
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin: 0 0 3% 0;
    text-align: center;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 3% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }

  .ord-content3 {
    margin: 10px auto;
  }

  .ord-content3-l {
    margin: 0 10px 0 0;
  }

  .ord-content5 button {
    width: 100px;
    height: 50px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }


</style>
