<template>
  <div class="ord-content">
    <div class="ord-content1">
      <el-input placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
    </div>
    <div>
      <el-cascader
        placeholder="试试搜索：浙江"
        :options="options"
        filterable
        change-on-select
        clearable
        @change="cascader"
      ></el-cascader>
      <el-button type="primary" @click="getList()">查询</el-button>
    </div>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {xyinquire, jjinquire, scinquire} from "@/components/api/inquire";
  import {mapState} from "vuex"

  export default {
    name: "inquire",
    data() {
      return {
        options: CityInfo,
        province: '',
        city: '',
        zone: '',
        orderData:'',
      }
    },
    methods: {
      cascader(value) {
        this.options.forEach((value1) => {
          if (value[0] == value1.value) {
            this.province = value1.label;
            value1.children.forEach((value2) => {
              this.city = value2.label;
              if (value[1] == value2.value) {
                value2.children.forEach((value3) => {
                  if (value[2] == value3.value) {
                    this.zone = value3.label;
                  }
                })
              }
            })
          }
        });
      },
      getList() {
        if (this.province && this.city && this.zone) {
          let type = this.ieData.type;
          if (type === 1 || type === 2) {
            let a = {
              type: this.ieData.type,
              status: this.ieData.status,
              province: this.province,
              city: this.city,
              area: this.zone,
              size: this.ieData.size,
              page: this.ieData.page,
            };
            xyinquire(a).then((res) => {
              this.orderData=res.data.data;
            })

          } else if (type === 3) {
            let b = {
              status: this.ieData.status,
              province: this.province,
              city: this.city,
              area: this.zone,
              size: this.ieData.size,
              page: this.ieData.page,
            };
            jjinquire(b).then((res) => {
              this.orderData=res.data.data;
            })

          } else if (type === 4) {

            let c = {
              status: this.ieData.status,
              province: this.province,
              city: this.city,
              area: this.zone,
              size: this.ieData.size,
              page: this.ieData.page,
            };
            scinquire(c).then((res) => {
              this.orderData=res.data.data;
            })
          }
        }else{
          this.$message({
            message: '请选择地区',
            type: 'warning'
          });
        }
        this.$emit('orderData',this.orderData);

      }
    },
    computed: {
      ...mapState(['ieData'])
    }
  }
</script>


<style scoped>
  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 3% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }


</style>
