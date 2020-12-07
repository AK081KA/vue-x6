<template>
  <div style="display: flex;flex-direction: row;height: 54px;">
    <div style="display: flex;flex-direction: row;flex: 1;height: 54px;"> 

    </div>
    <div style=" display: flex;flex: 3;">
     
      <ToolbarButton  command="delete"  label="删除" text="&#xe624;"  @handleEvent="()=>{this.$emit('delFunc')}"/>
      <ToolbarButton   label="放大" text="&#xe62b;" />
      <ToolbarButton   label="缩小" text="&#xe62e;"  />
      <ToolbarButton   label="全屏" text="&#xe629;"  />
      <ToolbarButton   label="原大小" text="&#xe627;"  />
      <ToolbarButton  command="zoomToFit" label="自适应" text="&#xe625;" />
    </div>
    <div class="pull-right">
      
    </div>
  </div>
</template>
<script>
import ToolbarButton from './ToolbarButton'
import FlowGraph from '../../Graph'
export default {
  name: 'FlowToolbar',
  components:{
    ToolbarButton
  },
  data(){
    return {
      shapeContext: '&#xe631;'
    }
  },
  props: ["title",'chartData',  'readOnly','allowCopyPaste',
    'allowReUndo',"allowOrAnyGroup","allowAnyGroup","allowOrGroup","allowClear","allowGroup","allowUnGroup"],
  methods:{

  }
}
</script>
<style lang="less">
@font-face {
  font-family: 'iconfont-editor';
  src: url('../../../assets/iconfont/t_iconfont.eot'); /* IE9*/
  src: url('../../../assets/iconfont/t_iconfont.eot#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../../../assets/iconfont/t_iconfont.woff') format('woff'),
    /* chrome, firefox */ url('../../../assets/iconfont/t_iconfont.woff2')
      format('woff2'),
    /* chrome, firefox */ url('../../../assets/iconfont/t_iconfont.ttf')
      format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url('../../../assets/iconfont/t_iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont-editor {
  font-family: 'iconfont-editor' !important;
  font-size: 19px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  color: #fff;
}
</style>