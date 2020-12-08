<template>
<!-- overflow-y:auto;max-height:100%;max-width:100%;padding-bottom:30px;user-select: none;width:294px; -->
  <a-tree :treeData="nodeItems" style="height:100%;background-color:#F2F2F2;overflow-y: auto;  max-height: 100%;max-width:100%;padding-bottom:30px;user-select: none;"
      @dragstart="dragstart" :draggable="true" @dragover="dragover">
      <a-icon slot="meh" type="smile-o" />
      <template slot="title" slot-scope="{title}">
        <div class="item item-flow-rect" style="user-select:none;">{{title}}</div>
      </template>
    </a-tree>
</template>

<script>

import { generateUUID } from '../../../common/uuid'
import dataNodeItems from './dataNodeItems'
import { Graph, Addon, Shape } from '@antv/x6'
import { FlowChartRect, FlowChartImageRect, FlowChartTitleRect, FlowChartAnimateText, NodeGroup } from '../../Graph/shape'
const { Rect, Circle } = Shape
export default {
  name: 'EditorItemPanel',
  components: {  },
  props:[
    'dnd'
  ],
  data() {
    return {
      seletedItem: null,
      nodeItems:dataNodeItems,
    }
  },
  created() {

  },
  watch: {

  },
  methods: {

    dragstart({event, node}) {
      this.seletedItem = null
      this.findChildByKey(this.nodeItems, node.dataRef.key)
        if (this.seletedItem) {
           let node =new FlowChartRect( {
              label:this.seletedItem.title,
              data: this.seletedItem,
              isNeedDel: true,
              width: 81,
              height: 45,
              isAdd:true
            })
            this.dnd.start(node, event)
        }
    },
    dragover({event,node}){

    },
    findChildByKey(data, key) {
      data.some((item, index) => {
        if (item.key === key) {
          this.seletedItem = item
          return true
        } else if (
          item.children &&
          item.children.length > 0 &&
          !this.seletedItem
        ) {
          let result_new = null
          this.findChildByKey(item.children, key)
          if (this.seletedItem) {
            return true
          }
        }
      })
    },
  },
}
</script>

<style lang="less">
.item-panel {
  box-sizing: border-box;
  position: fixed;
  // top: 45px;
  bottom: 0;
  left: 0;
  width: 150px;
  // padding: 10px;
  text-align: center;
  overflow-y: auto;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    user-select: none;

    &.item-flow-rect {
      width: 100px;
      height: 50px;
      border: 1px solid rgb(24, 144, 255);
      background-color: rgba(24, 144, 255, 0.2);
    }

    &.item-flow-circle {
      width: 70px;
      height: 70px;
      border-radius: 60px;
      border: 1px solid rgb(250, 140, 22);
      background-color: rgba(250, 140, 22, 0.2);
    }

    &.item-flow-rhombus {
      width: 70px;
      height: 70px;
      margin: 25px auto;
      border: 1px solid rgb(19, 194, 194);
      background-color: rgba(19, 194, 194, 0.2);
      transform: rotate(45deg);

      span {
        transform: rotate(-45deg);
      }
    }

    &.item-img {
      max-width: 100px;
    }
  }
  .ant-tree-node-content-wrapper {
    user-select: none;
  }
  .ant-tree-title{
    user-select: none;
  }
}
</style>
