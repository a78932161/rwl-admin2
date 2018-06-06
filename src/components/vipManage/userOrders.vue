<template>
  <div>
    <top></top>
    <el-col :span="6" :offset="5" class="vipAside">
      <div class="vipTop">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/vip' }">会员管理</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goye">用户余额</span></el-breadcrumb-item>
          <el-breadcrumb-item>用户订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>

    <el-col :span="17" :offset="4" class="el1">
      <el-steps :active="active" align-center>
        <el-step title="新订单" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="派单" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="收单" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="入站" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="上挂" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="送还" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="完结" description="这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>
    </el-col>
    <el-col :span="24">
      <el-col :span="5" :offset="4">
        <div class="el2-1">订单详情</div>
        <div class="el2-2">
          <div><label>客户备注 : {{xqData.remark}} </label></div>
          <div><label>注册电话 : {{xqData.phone}}</label></div>
          <div><label>预约单号 : {{xqData.number}}</label></div>
          <div><label>用户名 : {{xqData.name}}</label></div>
          <div><label>联系电话 : {{xqData.phone}}</label></div>
          <div><label>物流入站备注 : {{xqData.inboundRemark}}</label></div>
          <div><label>省市区 : {{xqData.province}}{{xqData.city}}{{xqData.area}}</label></div>
          <div><label>收衣地址 : {{xqData.address}}</label></div>
          <div><label>预约时间 : {{xqData.deliveryDate}}</label></div>
          <div><label>衣物总数 : {{dataLength}}</label></div>
          <div><label>订单价格 : {{xqData.amount}}</label></div>
          <div><label>付款方式 : {{xqData.payMode}}</label></div>
          <div><label>付款状态 : {{xqData.payStatus}}</label></div>
          <div><label>服务类型 : {{xqData.type}}</label></div>
          <div><label>收单人员 : </label></div>
          <div><label>服务商户 : {{xqData.serviceStore}}</label></div>
        </div>
      </el-col>
      <el-col :span="11" :offset="1">
        <div class="el3">
          <div class="el3-1">已收衣物</div>
          <div class="el3-2">
            <div class="el3-2-1" v-for="data in imgData" @click="goDetails(data)">
              <div style="position: relative">
                <img class="listImg" :src="data.src">
                <div class="listImg1">
                  <label style="color: white;letter-spacing: 1px;">问题需注意</label>
                </div>
              </div>
              <div>
                <label>{{data.name}}</label>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import top from '@/assets/vue/top'
  import {getfinid, getfinid1, getfinid2} from "@/components/api/vipss";

  export default {
    components: {
      top,
    },
    data() {
      return {
        listData: [],
        xqData: [],
        imgData: [],
        active: 0,
        imgUrl: 'http://p8wunmyz8.bkt.clouddn.com/',
        dataLength: '',
      }
    },
    methods: {
      getList() {
        this.listData=[];
        let a = this.$route.query.id;
        if (a.substr(a.length - 2, 2) == '03') {
          let b = {
            orderid: a,
          };
          getfinid(b).then((res) => {
            if (res.data.code === 0) {
              this.listData = res.data.data.items;
              this.listData.forEach((value) => {
                value.laundryProduct.logo = `${this.imgUrl}${value.laundryProduct.logo}`;
                this.imgData.push({
                  src: value.laundryProduct.logo,
                  id: value.laundryProduct.id,
                  name: value.laundryProduct.name
                });
              });
              this.xqData = res.data.data;
              this.dataLength = res.data.data.items.length;
              this.active = res.data.data.status;
            }
          })
        } else if (a.substr(a.length - 2, 2) == '10') {
          let b = {
            orderid: a,
          };
          getfinid1(b).then((res) => {
            if (res.data.code === 0) {
              this.listData = res.data.data.items;
              this.listData.forEach((value) => {
                value.laundryProduct.logo = `${this.imgUrl}${value.laundryProduct.logo}`;
                this.imgData.push({
                  src: value.laundryProduct.logo,
                  id: value.laundryProduct.id,
                  name: value.laundryProduct.name
                });
              });
              this.xqData = res.data.data;
              this.dataLength = res.data.data.items.length;
              this.active = res.data.data.status;
            }

          })
        } else if (a.substr(a.length - 2, 2) == '13') {
          let b = {
            orderid: a,
          };
          getfinid2(b).then((res) => {
            if (res.data.code === 0) {
              this.listData = res.data.data.items;
              this.listData.forEach((value) => {
                value.laundryProduct.logo = `${this.imgUrl}${value.laundryProduct.logo}`;
                this.imgData.push({
                  src: value.laundryProduct.logo,
                  id: value.laundryProduct.id,
                  name: value.laundryProduct.name
                });
              });
              this.xqData = res.data.data;
              this.dataLength = res.data.data.items.length;
              this.active = res.data.data.status;
            }
          })
        }
      },
      goDetails(data) {
        console.log(data);
        //this.$router.push('details');

      },
      goye() {
        this.$router.go(-1);
      },
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped>


  .el-breadcrumb {
    font-size: 18px;
  }

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .vipTop {
    margin: 0 0 10% 0;
  }

  .el1 {
    margin-bottom: 3%;

  }

  .el2-1 {
    height: 35px;
    background: rgb(20, 190, 240);
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
    text-indent: 20px;
  }

  .el2-2 {
    word-wrap: break-word;
    color: rgb(106, 119, 127);
    border: 1px solid rgb(20, 190, 240);
    padding: 0 0 5% 20px;
    line-height: 40px;
    margin: 0 0 5% 0;
  }

  .el2-2 div {
    width: 95%;
  }

  .el2-2 label {
    margin: 0 20px 0 0;
  }

  .el3-1 {
    height: 35px;
    background: rgb(20, 190, 240);
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
    text-indent: 20px;
    margin-bottom: 1%;
  }

  .el3-2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .el3-2-1 {
    text-align: center;
  }

  .listImg {
    width: 150px;
    height: 150px;
  }

  .listImg1 {
    background: rgba(255, 0, 0, 0.5);
    width: 100%;
    height: 25%;
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
