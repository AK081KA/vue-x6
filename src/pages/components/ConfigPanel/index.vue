<template>
      <div>
      <!-- <node-panel v-show="status=='node-selected'">
        <detail-form type="node" :read-only="readOnly" :formModel="selectedModel" />
        <slot name="node">
        </slot>
      </node-panel> -->
      <grid-panel v-show="cellType=='grid'"  :graph="cell">
        <detail-form type="grid" :read-only="readOnly" />
        <slot name="grid">
        </slot>
      </grid-panel>
      <node-panel v-show="cellType=='node'"  :cell="cell" :formModel="formModel">
        <detail-form type="node" :read-only="readOnly" />
        <slot name="node">
        </slot>
      </node-panel>
      <edge-panel v-show="cellType=='edge'"  :cell="cell" :formModel="formModel">
        <detail-form type="edge" :read-only="readOnly"  />
        <slot name="edge">
        </slot>
      </edge-panel>
      <!-- <group-panel v-show="status=='group-selected'">
        <detail-form type="group" :read-only="readOnly" :formModel="selectedModel" />
        <slot name="group">
        </slot>
      </group-panel>
      <multi-panel v-show="status=='multi-selected'" :formModel="selectedModel" />
      <canvas-panel v-show="status=='canvas-selected'">
        <slot name="flow">
        </slot>
      </canvas-panel> -->
    </div>
</template>
<script>
import EdgePanel from './ConfigEdge/index'
import NodePanel from './ConfigNode/index'
import GridPanel from './ConfigGrid/index'
import FlowGraph from '../../Graph'
export default {
  name: 'EditorDetailPanel',
  components: {
    EdgePanel,
    NodePanel,
    GridPanel
  },
  props: ['readOnly'],
  data() {
    return {
      selectedModel: null,
      cellType:'grid',
      cell:null,
      formModel:{}
    }
  },
  created(){
    this.$nextTick(()=>{
      const { graph } = FlowGraph
      graph.on('blank:click', () => {
        console.info();
         this.cellType='grid'
         this.cell=graph
         this.$emit('itemSelectedFunc', { type: 'flow', item: null, data: this.getCells() })
      })
      graph.on('cell:click', ({ cell }) => {
         if(cell.isNode()){
           this.cellType='node'
           this.formModel={
             label:cell.label,
             fontColor:cell.attrs?.text?.fill?cell.attrs?.text?.fill:'#000',
             fontSize:cell.attrs?.text?.fill?cell.attrs?.text?.fontSize:12,
             backColor:cell.attrs?.body?.fill?cell.attrs?.body?.fill:'#D9D9D9',
           }
           console.info('节点',cell)
           this.$emit('itemSelectedFunc', {
            type: 'node',
            item: cell,
            data: this.getCells(),
           })
         }
         else if(cell.isEdge()){
           this.cellType='edge'
           let targetMName = cell.getAttrs().targetMarker?(cell.getAttrs().targetMarker.name?cell.getAttrs().targetMarker.name:cell.getAttrs().targetMarker):'classic'
           let sourceMName = cell.getAttrs().sourceMarker?(cell.getAttrs().sourceMarker.name?cell.getAttrs().sourceMarker.name:cell.getAttrs().sourceMarker):'path'
           this.formModel={
             connector:cell.connector?cell.connector:'normal',
             stroke:cell.getAttrs().line.stroke?cell.getAttrs().line.stroke:'#5F95FF',
             targetMarker:targetMName,
             sourceMarker:sourceMName,
             strokeWidth:cell.getAttrs().line.strokeWidth?cell.getAttrs().line.strokeWidth:1,
             label:cell.getLabels().length>0?cell.getLabels()[0].attrs.label.text:''
           }
           this.$emit('itemSelectedFunc', {
            type: 'edge',
            item: cell,
            data: this.getCells(),
           })
         }
         this.cell=cell
      })
      graph.on('cell:dblclick',({cell})=>{
        if(cell.isNode()){
           this.cellType='node'
           this.formModel={
             label:cell.label,
             fontColor:cell.attrs?.text?.fill?cell.attrs?.text?.fill:'#000',
             fontSize:cell.attrs?.text?.fill?cell.attrs?.text?.fontSize:12,
             backColor:cell.attrs?.body?.fill?cell.attrs?.body?.fill:'#D9D9D9',
           }
           console.info('节点',cell)
           this.$emit('doubleClickFunc', {
            type: 'node',
            item: cell,
            data: this.getCells(),
           })
        }
        else if(cell.isEdge()){
           this.cellType='edge'
           let targetMName = cell.getAttrs().targetMarker?(cell.getAttrs().targetMarker.name?cell.getAttrs().targetMarker.name:cell.getAttrs().targetMarker):'classic'
           let sourceMName = cell.getAttrs().sourceMarker?(cell.getAttrs().sourceMarker.name?cell.getAttrs().sourceMarker.name:cell.getAttrs().sourceMarker):'path'
           this.formModel={
             connector:cell.connector?cell.connector:'normal',
             stroke:cell.getAttrs().line.stroke?cell.getAttrs().line.stroke:'#5F95FF',
             targetMarker:targetMName,
             sourceMarker:sourceMName,
             strokeWidth:cell.getAttrs().line.strokeWidth?cell.getAttrs().line.strokeWidth:1,
             label:cell.getLabels().length>0?cell.getLabels()[0].attrs.label.text:''
           }
           this.$emit('doubleClickFunc', {
            type: 'edge',
            item: cell,
            data: this.getCells(),
           })
         }
         this.cell=cell
      })
      graph.on('cell:added',({cell})=>{
        if(cell.isNode() && !cell.parent ){ //&& !cell?.children?.length>0
          this.$emit('itemsAddFunc', cell)
        }
      })
      graph.on('cell:removed',({cell})=>{
         console.info('删除的节点',cell);
        this.$emit('itemsDeletedFunc', [cell.id])
      })
    })
  },
  methods:{
    getCells(){
      const { graph } = FlowGraph
      let nodes = graph.getCells().filter(t=>t.isNode() && !t.parent)
      let groups = graph.getCells().filter(t=>t.isNode() && t.parent)
      let edges = graph.getCells().filter(t=>t.isEdge())
      return {nodes:nodes,edges:edges,groups:groups}
    }
  }
}
</script>