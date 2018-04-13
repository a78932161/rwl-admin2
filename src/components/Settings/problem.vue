<template>
  <div>
    <div class="pm-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex2">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>常见问题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ititle"><el-input v-model="input" placeholder="请输入标题"></el-input></div>

    <div id="editorElem"></div>
    <div class="ititle1">
      <el-button type="primary" >提交</el-button>
      <el-button type="primary" >修改</el-button>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'editor',
    data() {
      return {
        editorContent: '',
        input:'',
      }
    },
    methods: {
      goIndex2(){
        this.$emit('goIndex2', true);
      }


    },
    mounted() {
      let editor = new E('#editorElem');
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      };
      editor.create();
    }
  }
</script>

<style scoped>
  .pm-top {
    margin-bottom: 3%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }
  #editorElem{
    margin-bottom: 3%;
  }
  .ititle{
    margin-bottom: 3%;
  }
  .ititle1{
    text-align: center;
  }
  .ititle1 button{
    width: 100px;
    font-size: 16px;
  }

</style>
