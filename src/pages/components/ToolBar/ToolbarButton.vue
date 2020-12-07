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
          case 'or':
          case 'any':{
            //1.开始、结束、组不参与(isOut，维修不参与)
            console.info('组合判断')
            let findgroup = selected.filter(t=>t?.data?.category == 1 || t?.data?.category==0 || t?.data?.parent || t?.data?.isOut || !(t?.data?.nodeType>=0))
            let nodeType=[]
            let groupIds=[]
            let disObject=false
            if(findgroup.length>0){
              this.newGroupEnabled=true
              return
            }
            else if(selected.length<2){
              this.newGroupEnabled=true
              return
            }
            //2.复杂判断TODO(同类型节点方可参与)
            selected.map(node => {
              if(nodeType.length>0 && nodeType.indexOf(node?.data?.nodeType)<0){
                disObject=true
              }
              else {
                 nodeType.push(node?.data?.nodeType)
              }
              if(node.groupType!=undefined && node.groupType<100){
                if(groupIds.length>0 && groupIds.indexOf(node.parent)<0 && node.parent!=undefined){
                  disObject=true
                } else {
                  groupIds.push(node.parent)
                }
              }
              else if(groupIds.length>0 && groupIds.indexOf('-1')<0){
                if(node.parent!=undefined){
                  if(groupIds.indexOf(node.parent)<0){
                    disObject=true
                  }
                }
                else {
                  disObject=true
                }
              }
              else if(node.parent==undefined){
                groupIds.push('-1')
              }
              else {
                if(groupIds.length>0 && groupIds.indexOf(node.parent)<0 && node.parent!=undefined){
                  disObject=true
                } else {
                  groupIds.push(node.parent)
                }
              }
              if(groupIds.length>0 && groupIds.indexOf('-1')<0){
                if(node.parent!=undefined){
                  if(groupIds.indexOf(node.parent)<0){
                    disObject=true
                  }
                }
                else if(groupIds[0]!=undefined){
                  disObject=true
                }
              }
            })
            this.newGroupEnabled=disObject
            break
          }
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
      case 'or':{
        let parentId=generateUUID();
        //1.添加群组,横向排布
        let width = 20;
        let height =20;
        let point_x =0,point_y=0;
        let items_point_x=0;
        for(let m=0;m<selectedItems.length;m++){
          if(m==0){
            point_x = selectedItems[m].getPosition().x
            point_y = selectedItems[m].getPosition().y
            items_point_x+=point_x+selectedItems[m].getSize().width+30
          }
          else{
            //改变其余节点相对第一个的位置
            selectedItems[m].setPosition({x:items_point_x,y:point_y})
            items_point_x+=selectedItems[m].getSize().width+30
          }
          selectedItems[m].setData({...selectedItems[m].getData(),groupType:100})
          if(m==selectedItems.length-1){
            width+=selectedItems[m].getSize().width+20;
          }else{
            width+=selectedItems[m].getSize().width+40;
          }
          if(selectedItems[m].getSize().height+40>height){
            height=selectedItems[m].getSize().height+60;
          }
        }
        let group = new NodeGroup({
           attrs: {
             text: {
              text: 'OR模式',
             },
           },
          data: {
           parent: true,
           maxHeight:height,
          },
          id:parentId,
          groupType:0,
          x:point_x-30,
          y:point_y-40,
          collapsed:false,
          width:width,
          zIndex:1
        });
        let parentNode = graph.addNode(group)
        //2.删除节点的连线
        let edges = graph.getEdges().filter(t=>ids.indexOf(t.source.cell)>=0 || ids.indexOf(t.target.cell)>=0);
        graph.removeCells(edges)
        //2.添加群组关系
        selectedItems.forEach(item=>{
          parentNode.addChild(item)
        })
        graph.cleanSelection();
        break
        }
      case 'any':
        {
        let parentId=generateUUID();
        //1.添加群组,横向排布
        let width = 20;
        let height =20;
        let point_x =0,point_y=0;
        let items_point_y=0;
        for(let m=0;m<selectedItems.length;m++){
          if(m==0){
            point_x = selectedItems[m].getPosition().x
            point_y = selectedItems[m].getPosition().y
            items_point_y+=point_y+selectedItems[m].getSize().height+30
          }
          else{
            //改变其余节点相对第一个的位置
            selectedItems[m].setPosition({x:point_x,y:items_point_y})
            items_point_y+=selectedItems[m].getSize().height+30
          }
          selectedItems[m].setData({...selectedItems[m].getData(),groupType:100})
          if(m==selectedItems.length-1){
            height+=selectedItems[m].getSize().height+20;
          }else{
            height+=selectedItems[m].getSize().height+40;
          }
          if(selectedItems[m].getSize().width+60>width){
            width=selectedItems[m].getSize().width+60;
          }
        }
        let group = new NodeGroup({
           attrs: {
             text: {
              text: 'ANY模式',
             },
           },
          data: {
           parent: true,
           maxHeight:height,
           maxWidth:width,
          },
          id:parentId,
          groupType:0,
          x:point_x-30,
          y:point_y-30,
          collapsed:false,
          zIndex:1
        });
        let parentNode = graph.addNode(group)
        //2.删除节点的连线
        let edges = graph.getEdges().filter(t=>ids.indexOf(t.source.cell)>=0 || ids.indexOf(t.target.cell)>=0);
        graph.removeCells(edges)
        //2.添加群组关系
        selectedItems.forEach(item=>{
          parentNode.addChild(item)
        })
        //3. 节点之间添加连线
        for (let k = 0; k < selectedItems.length - 1; k++) {
            graph.addEdge(new EdgeTwoArrows({source: { cell: selectedItems[k].id, port: selectedItems[k].getPorts().find(t=>t.group=='bottom')?.id },
              target: { cell: selectedItems[k+1].id, port: selectedItems[k+1].getPorts().find(t=>t.group=='top')?.id},data:{lineType:101}}))
        }
        graph.cleanSelection();
        break
        }
        break
      case 'ungroup':{
        //1.解除群组内关系
        let ids=[]
        selectedItems.forEach(t=>{
          t.children.forEach(m=>{
            ids.push(m.id)
            m.setParent(null)
            m.setData({...m.getData(),groupType:100})
          })
          t.setChildren([])
          //3.删除群组
          graph.removeCell(t)
        })
        //2.删除连线
        let edges = graph.getEdges().filter(t=>ids.indexOf(t.source.cell)>=0 || ids.indexOf(t.target.cell)>=0);
        graph.removeCells(edges)
      }
        break
      case 'zoomToFit':
        graph.zoomToFit()
        break
      case 'print':
        graph.printPreview()
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
