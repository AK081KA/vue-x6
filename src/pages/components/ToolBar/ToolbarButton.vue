<template>
  <div style="cursor:pointer;height: 54px;" :disabled="newGroupEnabled" @click="handleClick(command)">
    <!-- <icon :type="iconType" :title="text" /> -->
    <span class="iconfont-editor" v-html="text"></span>
    <span class="label">{{ label }}</span>
  </div>

</template>

<script>
import FlowGraph from '../../Graph'
import { FlowChartRect, FlowChartImageRect, FlowChartTitleRect, FlowChartAnimateText, NodeGroup,EdgeTwoArrows } from '../../Graph/shape'
import { generateUUID } from '../../../common/uuid'

export default {
  name: 'ToolbarButton',
  props: ['command', 'text', 'label'],
  computed: {
  },
  data(){
   return {
     newGroupEnabled:true
   }
  },
  components: {

  },
  created(){
    this.$nextTick(()=>{
      const { graph } = FlowGraph
      graph.on('selection:changed', ({ selected }) => {
        console.info('selection:changed',selected)
        switch(this.command){
          case 'delete':{
            //1. 开始、结束不能删除，data.category
            let findStartEnd = selected.filter(t=>t?.data?.category == 1 || t?.data?.category==0)
            if(findStartEnd.length>0){
              this.newGroupEnabled=true
              return
            }
            this.newGroupEnabled=selected.length<=0
            break}
          case 'ungroup':{
            let findStartEnd = selected.filter(t=>t?.data?.parent)
            if(findStartEnd.length!=1){
              this.newGroupEnabled=true
              return
            }
            else{
              this.newGroupEnabled=false
              return
            }
            break
          }
          default:
           break
        }
      })
      switch (this.command) {
        case 'zoomToFit':
        case 'save':
        case 'cancle':
        case 'zoomIn':
        case 'zoomOut':
          this.newGroupEnabled=false
          break
          default:
          break
      }
    })
  },
  methods:{
    handleClick(commandName){
      console.info('commandName',commandName)
      const { graph } = FlowGraph
      let selectedItems = graph.getSelectedCells();
      let ids=[]
      selectedItems.forEach(t=>{
        ids.push(t.id)
      })
      switch (commandName) {
      case 'undo':
        graph.history.undo()
        break
      case 'redo':
        graph.history.redo()
        break
      case 'delete':
        graph.removeCells(graph.getSelectedCells())
        break
      case 'zoomToFit':
        graph.zoomToFit()
        break
      case 'print':
        graph.printPreview()
        break
      case 'zoomIn':
        graph.zoom(0.1)
        break
      case 'zoomOut':
        graph.zoom(-0.1)
        break
      default:
        break
      }
      this.$emit('handleEvent');
    }
  }
}
</script>
<style lang="less" scoped>
.label{
  font-size: 12px;
  color:#fff;
}
.iconfont-editor{
  font-size: 20px;
  width: 100%;
    float: left;
    height: 20px;
    margin-top: -8px;
}
div[disabled] span{
  color:#ffffff80;
}
</style>
