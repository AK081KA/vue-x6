<template>

    <a-layout id='app' class="wrap" style="height:100%">
      <a-layout-header class="header">
         <div class="toolbar">
            <ToolBar :title="flow_title" :allowCopyPaste="flow_allowCopyPaste" :allowReUndo="flow_allowReUndo" 
        :allowClear="flow_allowClear" :allowItemAddGroup="flow_allowItemAddGroup" :allowAddChild="flow_allowAddChild"
        :allowOrAnyGroup="flow_allowOrAnyGroup" :allowGroupOrAny="flow_allowGroupOrAny" :allowAnyGroup="flow_allowAnyGroup" :allowUnGroup="flow_allowUnGroup" :allowGroup="flow_allowGroup" :allowOrGroup="flow_allowOrGroup"
        @flowSaveFunc="flowSaveFunc" @flowCancleFunc="flowCancleFunc" @orFunc="orFunc"/>
          </div>
      </a-layout-header>
      <a-layout style="display: flex;">
        <a-layout-sider :width="leftMenu?280:0" style="background: #fff;">
           <EditorItemPanel :dnd="dnd" style="height:100%;"/>
        </a-layout-sider>
        <a-layout style="height:100%;" ref="graph_content">
         <a-layout-content  :style="{ background: '#E0E6EF',  margin: 0, minHeight: '280px',display:'flex' }">
           <!-- padding: '24px', -->
           <div ref="leftSideBtn" style="top:0;bottom:0;height:90px;width:12px;margin:auto 0;z-index:10;"
            @click="collapsedLeftMenu()" >
            <div style="height:60px;width:13px;cursor:pointer;" class="flexHorilanLayout" >
              <img :src="leftMenu?require('../src/assets/flow/left.png'):require('../src/assets/flow/right.png')" style="height:60px;width:13px;"/>
            </div>
           </div>
           <div id="container" class="x6-graph" style="width:100% !important;height:100% !important"/>
           <div ref="rightSideBtn" style="top:0;bottom:0;height:90px;width:12px;margin:auto 0;z-index:10;" @click="collapsedRightMenu()" >
            <div style="height:60px;width:13px;cursor:pointer;" class="flexHorilanLayout" >
              <img :src="rightMenu?require('../src/assets/flow/right.png'):require('../src/assets/flow/left.png')" style="height:60px;width:13px;"/>
            </div>
           </div>
         </a-layout-content>
        </a-layout>
         <a-layout-sider :width="rightMenu?280:0" style="background: #fff;">
           <EditorDetailPanel style="height:100%;"/>
        </a-layout-sider>
      </a-layout>
    </a-layout>
</template>

<script>
import FlowGraph from './pages/Graph'
import ToolBar from './pages/components/ToolBar/index'
import EditorItemPanel from './pages/components/Tree/ItemPanel'
import { Graph, Addon, Shape,Edge } from '@antv/x6'

import '../src/global.css'
import './pages/index.less'
import 'ant-design-vue/dist/antd.less'
import { FlowChartRect, FlowChartImageRect, FlowChartTitleRect, FlowChartAnimateText, NodeGroup,EdgeArrow } from './pages/Graph/shape'
import { EmbeddedImage } from '@antv/x6/lib/shape/standard'
import { generateUUID } from './common/uuid'
import EditorDetailPanel from './pages/components/ConfigPanel/index'
const { Dnd } = Addon
export default {
  name: 'App',
  components: {
    EditorItemPanel,
    ToolBar,
    EditorDetailPanel
  },
  props: [
    'readOnly',
    'toggleReadOnly',
    'chartData',
    'chartDataNodeItems',
    'allowUnLinked',
    'allowLinkSelf',
    'allowCopyPaste',
    'allowReUndo',
    'allowOrAnyGroup',
    'allowGroupOrAny',
    'allowOrGroup',
    "allowGroup",
    'allowAnyGroup',
    'allowItemRemoveGroup',
    'allowItemAddGroup',
    'showToolbar',
    'showMiniMap',
    'leftwidth',
    'rightwidth',
    'canvaswidth',
    'isNeedStart',
    'isNeedEnd',
    'isNeedSort',
    'allowAdd',
    'allowClear',
    'allowLinkMore',
    'title',
    'allowUnCommonGroup',
    'allowUnGroup',
    'allowAddChild',
    'transform'
  ],
  data(){
    return{
      leftMenu:true,
      rightMenu:true,
      graph:null,
      dnd:null,
      flow_title:this.title===undefined?'流程设计':this.title,
      flow_isNeedStart: this.isNeedStart,
      flow_isNeedEnd: this.isNeedStart,
      flow_allowUnLinked:this.allowUnLinked,
      flow_allowLinkSelf:this.allowLinkSelf,
      flow_allowCopyPaste:this.allowCopyPaste,
      flow_allowReUndo:this.allowReUndo,
      flow_showToolbar:this.showToolbar,
      flow_showMiniMap:this.showMiniMap,
      flow_allowOrAnyGroup:this.allowOrAnyGroup,
      flow_allowGroupOrAny:this.allowGroupOrAny==undefined?false:this.allowGroupOrAny,
      flow_allowOrGroup:this.allowOrGroup,
      flow_allowGroup:this.allowGroup,
      flow_allowAnyGroup:this.allowAnyGroup,
      flow_allowUnGroup:this.allowUnGroup===undefined?true:this.allowUnGroup,
      flow_allowAddChild:this.allowAddChild===undefined?true:this.allowAddChild,
      flow_allowItemRemoveGroup:this.allowItemRemoveGroup,
      flow_allowItemAddGroup:this.allowItemAddGroup,
      flow_canvaswidth:this.canvaswidth,
      flow_isNeedSort:this.isNeedSort,
      flow_allowAdd:this.allowAdd,
      flow_allowClear:this.allowClear,
      flow_allowLinkMore:this.allowLinkMore===undefined?false:this.allowLinkMore,
      flow_allowUnCommonGroup:this.allowUnCommonGroup===undefined?false:this.allowUnCommonGroup,
    }
  },

  created(){
    //console.info('1231213')
     this.$nextTick(()=>{
       this.graph = FlowGraph.init();
       this.dnd = new Dnd({ target: this.graph, animation: true,validateNode:this.validate,getDropNode:this.dragNode})
       
       this.graph.on('edge:connected',(item)=>{
          console.info('item>>>',item);
          //edge
          if(item.edge){
             //1. 处理模式
             //a. 获取节点目标终节点
             //item.edge.target.cell
             let target = this.graph.getCell(item.edge.target?.cell);
             let source = this.graph.getCell(item.edge.source?.cell);
             if(!target || !source) return
             console.info('添加完成');
             //目标为or模式
             if(target.getData()?.groupType==100){
               //1.设置当前lineType
               item.edge.setData({...item.edge.getData(),lineType:100})
               //or模式，需要自动添加其他组内连接点
               let groupNodes = this.graph.getNodes().filter(t=>t.parent == target.parent && t.id!=target.id)
               groupNodes.forEach(item=>{
                 let findEdge = this.graph.getEdges().filter(p=>p.source.cell ==source.id && p.target.cell == item.id)
                 if(findEdge.length<=0){
                  let tedge = this.graph.addEdge(new EdgeArrow({source: { cell: source.id, port: source.getPorts().find(t=>t.group=='bottom')?.id },
              target: { cell: item.id, port: item.getPorts().find(t=>t.group=='top')?.id},data:{lineType:100}}))
                 }
               })
             }
             //源为or模式
             else if(source.getData()?.groupType==100){
               //1.设置当前lineType
               item.edge.setData({...item.edge.getData(),lineType:100})
               //or模式，需要自动添加其他组内连接点
               let groupNodes = this.graph.getNodes().filter(t=>t.parent == source.parent && t.id!=source.id)
               groupNodes.forEach(item=>{
                 let findEdge = this.graph.getEdges().filter(p=>p.source.cell ==item.id && p.target.cell == target.id)
                 if(findEdge.length<=0){
                  let tedge = this.graph.addEdge(new EdgeArrow({source: { cell: item.id, port: item.getPorts().find(t=>t.group=='bottom')?.id },
              target: { cell: target.id, port: target.getPorts().find(t=>t.group=='top')?.id},data:{lineType:100}}))
                 }
               })
             }
           }
       })
       this.graph.on('edge:removed',(item)=>{
         console.info('item>>>',item);
         //or 连线删除都删除
         if(item.cell.getData()?.lineType==100){
           let source_id = item.cell.getSourceCellId()
           let target_id = item.cell.getTargetCellId()
           let source = this.graph.getCell(source_id)
           let target = this.graph.getCell(target_id)
           //1.起点模式
           if(source.getData().groupType==100){
             //找到组内的点
             let groupIds = []
             this.graph.getNodes().filter(t=>t.parent ==source.parent).forEach(k=>{
               groupIds.push(k.id)
             })
             //找到复合条件的linetype
             let cells = this.graph.getEdges().filter(p=>groupIds.indexOf(p.source.cell)>=0 && p.target.cell==target_id && p.getData().lineType==100)
             this.graph.removeCells(cells)
           }
           //2.终点模式
            else if(target.getData().groupType==100){
             //找到组内的点
             let groupIds = []
             this.graph.getNodes().filter(t=>t.parent ==target.parent).forEach(k=>{
               groupIds.push(k.id)
             })
             //找到复合条件的linetype
             let cells = this.graph.getEdges().filter(p=>groupIds.indexOf(p.target.cell)>=0 && p.source.cell==source_id  && p.getData().lineType==100)
             this.graph.removeCells(cells)
           }
         }
       })
       this.resizeFn()
     })
    
  },
  methods:{
    collapsedRightMenu(){
      this.rightMenu=!this.rightMenu
      this.resizeFn('right')
    },
    collapsedLeftMenu(){
       this.leftMenu=!this.leftMenu
       this.resizeFn('left')
    },
    dragNode(node){ 
      if(node?.data?.children?.length>0){
        let parentId=generateUUID();
        let children = node.data.children
        let point = this.graph.clientToLocal({x:window.event.x,y:window.event.y})
        let index=0;
        let nodes=[]
        //1.添加组内节点
        children.forEach(t=>{
          let item_node = new FlowChartRect({
            label:t.title,
            data:t,
            width: 81,
            height:45,
            x:point.x,
            y:point.y+index,
            groupType:0,
            parent:parentId
          })
          index += 80
          nodes.push(this.graph.addNode(item_node));
        })
        //2.添加连线
        if (nodes.length > 1) {
          for (let k = 0; k < nodes.length - 1; k++) {
            this.graph.addEdge(new EdgeArrow({source: { cell: nodes[k].id, port: nodes[k].getPorts().find(t=>t.group=='bottom')?.id },
              target: { cell: nodes[k+1].id, port: nodes[k+1].getPorts().find(t=>t.group=='top')?.id}}))
          }
        }
        //3.添加群组
        let group = new NodeGroup({
           attrs: {
             text: {
              text: node.data.title,
             },
           },
          data: {
           children:node.data.children,
           parent: true,
           maxHeight:40+45*nodes.length+35*(nodes.length-1),
          },
          id:parentId,
          groupType:0,
          x:point.x-70,
          y:point.y-30,
          collapsed:false,
          width:121,
          zIndex:1
        });
        let parentNode = this.graph.addNode(group)
        //4.添加群组关系
        nodes.forEach(item=>{
          //item.setParent(parentNode)
          parentNode.addChild(item)
          console.info('parent',item.getParent())
        })
      }
      //当前版本问题
      return node.clone()
    },
    validate(node){
      console.info('getNode',node);
      if(node?.data?.children?.length>0){
        return false
      }
      return true
    },
    getContainerSize(){
      return {
        width: document.body.offsetWidth - 581,
        height: document.body.offsetHeight - 87,
      }
    },
    resizeFn(side){
      //const { width, height } = this.getContainerSize()
      let width = this.$refs.graph_content.$el.offsetWidth-24
      if(side=='right'){
        if(!this.rightMenu){
          width+=280
        }
        else{
          width-=280
        }
      }
      if(side=='left'){
        if(!this.leftMenu){
          width+=280
        }
        else{
          width-=280
        }
      }
      let height = document.body.offsetHeight-54
      this.graph.resize(width, height)
    },
    //取消事件
    flowCancleFunc() {
      console.info('取消')
      this.$emit('flowCancleFunc')
    },
    orFunc(){
      console.info('or模式')
      this.$emit('orFunc')
    },
    //保存事件
    flowSaveFunc() {
      this.$emit('flowSaveFunc')
    },
  }
}
</script>

<style lang="less">
// html,
// body {
//   margin: 0;
//   padding: 0;
// }
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   min-height: 100vh;
// }
.toolbar {
  // display: flex;
  align-items: center;
  flex:1;
  // height: 27px;
  // padding: 8px;
  .iconfont-editor {
    font-family: 'iconfont-editor' !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
    color: #fff;
  }
  .split {
    width: 10px;
    height: 100%;
    border-right: 1px solid #eee;
    margin-right: 10px;
  }
  .tip {
    color: #fff;
    display: block;
    font-size: 14px;
    text-align: center;
  }
  .pull-right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .command {
    display: flex;
    color: #333;
    display: inline-block;
    i {
      display: block;
      width: 27px;
      height: 27px;
      margin: 0 6px;
      padding-top: 10px;
      text-align: center;
      border: 1px solid #fff;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 26px;
      // padding-top: 10px;
      // margin-left: -6px;
      margin-left: 6px;
      padding-right: 6px;
      line-height: 28px;
      cursor: pointer;
    }

    .label {
      font-size: 14px;
      color: #fff;
    }

    &:hover {
      border: 1px solid rgba(2, 2, 2, 0);
    }
  }

  .disable {
    color: rgb(102, 102, 102);
    i {
      cursor: not-allowed;
    }

    span {
      cursor: not-allowed;
      color: rgb(102, 102, 102);
    }

    &:hover {
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
.ant-layout-sider-children{
  height:100%;
}
</style>
