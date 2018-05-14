<template>
  <div>
    <div v-show="isDiv">
      <div class="vipTop">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item ><span @click="goIndex">会员管理</span></el-breadcrumb-item>
          <el-breadcrumb-item>消费统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content">
        <div style="margin-right: 20%">
          <el-cascader
            placeholder="试试搜索：浙江"
            :options="options"
            filterable
            change-on-select
            clearable
          ></el-cascader>
          <el-button type="primary">查询</el-button>
        </div>
        <div>
          <el-date-picker
            v-model="value1"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>

      </div>
      <div class="vipRadio">
        <el-radio v-model="radio" label="1" border size="medium">洗衣</el-radio>
        <el-radio v-model="radio" label="2" border size="medium">高端洗护</el-radio>
        <el-radio v-model="radio" label="3" border size="medium">小让家具</el-radio>
        <el-radio v-model="radio" label="4" border size="medium">小让商城</el-radio>
      </div>
      <div class="vipyw">
        <div></div>
        衣物 TOP10
      </div>
      <div style="display: flex">
        <div id="myChart" :style="{width: '500px', height: '450px'}"></div>
        <el-card style="width: 100%;line-height: 30px">
          <div style="display: flex;justify-content: space-between">
            <label class="vip1">1 西装上衣</label>
            <label class="vip2">60%</label>
            <label class="vip3">12213</label>
          </div>

          <div style="text-align: center">
            <el-button type="primary" size="mini" @click="gocdl">查看详情</el-button>
          </div>

        </el-card>

      </div>
      <div class="vipyw">
        <div></div>
        消费次数
      </div>
      <div class="viptable">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="次数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="人数">
          </el-table-column>
        </el-table>
      </div>
      <div class="vipyw">
        <div></div>
        消费次数
      </div>
      <div class="viptable">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="次数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="人数">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <cdl v-show="isCdl" @goIndex1="goIndex1"></cdl>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import echarts from 'echarts'
  import cdl from '@/components/vipManage/clothingDetail'
  export default {
    components:{
      cdl
    },
    data() {
      return {
        isCdl:false,
        isDiv:true,
        charts: '',
        options: CityInfo,
        value1: '',
        radio: '1',
        opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        opinionData: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.opinion,
          },
          series: [
            {
              name: '莫好克',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.opinionData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      gocdl(){
        this.isDiv=false;
        this.isCdl=true;
      },
      goIndex(){
        this.$emit('goIndex2',true);
      },
      goIndex1(data){
        this.isDiv=data;
        this.isCdl=false;
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .vipTop {
    margin-bottom: 3%;
  }

  .ord-content {
    display: flex;
    margin: 0 0 3% 0;
  }

  .vipRadio {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3%;
  }

  .vipRadio label {
    margin-right: 3%;
  }

  /*.vip1{*/
  /*margin-right: 30%;*/
  /*}*/
  /*.vip2{*/
  /*margin-right: 30%;*/
  /*}*/
  .vipyw {
    border-bottom: 1px solid rgb(20, 190, 240);
    width: 20%;
    display: flex;
    color: rgb(20, 190, 240);
    font-weight: bolder;
    margin-bottom: 3%;
    letter-spacing: 1px;
  }

  .vipyw div {
    width: 25px;
    height: 25px;
    background: rgb(20, 190, 240);
    margin: 0 5% -1px 0;
  }

  .viptable {
    margin-bottom: 3%;
  }
</style>
