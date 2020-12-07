<template>
  <div>
      <div style="background-color: rgb(218, 218, 218);
    height: 40px;">
        <AreaTitle title='属性' style="padding-left: 15px;"></AreaTitle>
      </div>
      <a-form readonly>
        <a-form-item label="名称：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input style="font-size:12px" :disabled="readOnly"  @change="changeLabel" v-model="formModel.label" />
        </a-form-item>
        <a-form-item label="颜色：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <ColorPicker   :disabled="readOnly" @update="changeColor" v-model="formModel.stroke"/>
        </a-form-item>
        <a-form-item label="宽度：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-slider :min="1" :max="5"  :disabled="readOnly" @change="changeWidth" v-model="formModel.strokeWidth"/>
        </a-form-item>
        <a-form-item label="形状：" :labelCol="labelCol" :wrapperCol="wrapperCol" v-model="formModel.connector">
          <a-select  :disabled="readOnly" @change="onConnectorChange">
            <a-select-option value="normal">Normal</a-select-option>
            <a-select-option value="smooth">Smooth</a-select-option>
            <a-select-option value="rounded">Rounded</a-select-option>
            <!-- <a-select-option value="jumpover">Jumpover</a-select-option> -->
          </a-select>
        </a-form-item>
        <a-form-item label="起点：">
           <a-select  :disabled="readOnly" @change="onStartChange" v-model="formModel.sourceMarker">
            <a-select-option value="block">block</a-select-option>
            <a-select-option value="classic">classic</a-select-option>
            <a-select-option value="diamond">diamond</a-select-option>
            <a-select-option value="cross">cross</a-select-option>
            <a-select-option value="async">async</a-select-option>
            <a-select-option value="path">path</a-select-option>
            <a-select-option value="circle">circle</a-select-option>
            <a-select-option value="circlePlus">circlePlus</a-select-option>
            <a-select-option value="ellipse">ellipse</a-select-option>  
          </a-select>
        </a-form-item>
        <a-form-item label="终点：">
           <a-select  :disabled="readOnly" @change="onEndChange" v-model="formModel.targetMarker">
            <a-select-option value="block">block</a-select-option>
            <a-select-option value="classic">classic</a-select-option>
            <a-select-option value="diamond">diamond</a-select-option>
            <a-select-option value="cross">cross</a-select-option>
            <a-select-option value="async">async</a-select-option>
            <a-select-option value="path">path</a-select-option>
            <a-select-option value="circle">circle</a-select-option>
            <a-select-option value="circlePlus">circlePlus</a-select-option>
            <a-select-option value="ellipse">ellipse</a-select-option>  
          </a-select>
        </a-form-item>
      </a-form>
      <slot name="edge">
      </slot>
    </div>
</template>
<script>
import AreaTitle from '../../AreaTitle/AreaTitle'
import ColorPicker from '../../ColorPicker/index'
export default {
  name:'EdgePanel',
  components: { AreaTitle,ColorPicker },
  props: ['type', 'readOnly', 'formModel','cell'],
  data(){
    return{
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 18 },
      },
    }
  },
  methods:{
    onConnectorChange(val){
       this.cell.setConnector(val)
    },
    changeColor(val){
      this.cell.attr('line/stroke', val)
    },
    changeLabel(e){
      const { value } = e.target;
      this.cell.setLabels([{attrs: { label: { text: value } }}])
    },
    changeWidth(val){
      console.info('kuandu',val)
      this.cell.attr('line/strokeWidth', val)
    },
    onStartChange(val){
      this.cell.attr('line/sourceMarker', val)
    },
    onEndChange(val){
      this.cell.attr('line/targetMarker', val)
    }
  }
}
</script>