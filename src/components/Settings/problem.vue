<template>
  <div>
    <div class="pm-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex2">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>更多编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="pm-top1">
    <el-radio-group v-model="radio" style="font-size: 20px">
      <el-radio :label="1">常见问题</el-radio>
      <el-radio :label="2">关于小让</el-radio>
      <el-radio :label="3">加盟小让</el-radio>
      <el-radio :label="4">用户协议</el-radio>
    </el-radio-group>

    </div>
    <div id="editorElem"></div>
    <div class="ititle1">
      <el-button type="primary" >提交</el-button>
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
        radio:1,
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
  .pm-top1 {
    margin-bottom: 3%;
    text-align: center;
  }
  .ititle1{
    text-align: center;
  }
  .ititle1 button{
    width: 100px;
    font-size: 16px;
  }

</style>
