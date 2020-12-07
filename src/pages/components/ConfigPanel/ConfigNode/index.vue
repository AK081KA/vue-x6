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
        <a-form-item label="字体颜色：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <ColorPicker   :disabled="readOnly" @update="changeColor" v-model="formModel.fontColor"/>
        </a-form-item>
        <a-form-item label="字体大小：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-slider :min="8" :max="16"  :disabled="readOnly" @change="changeFontSize" v-model="formModel.fontSize"/>
        </a-form-item>
        <a-form-item label="背景色：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <ColorPicker   :disabled="readOnly" @update="changeBackColor" v-model="formModel.backColor"/>
        </a-form-item>
        <!-- <a-form-item label="宽度：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-slider :min="1" :max="5"  :disabled="readOnly" @change="changeWidth"/>
        </a-form-item> -->
      </a-form>
      <slot name="edge">
      </slot>
    </div>
</template>
<script>
import AreaTitle from '../../AreaTitle/AreaTitle'
import ColorPicker from '../../ColorPicker/index'
export default {
  name:'NodePanel',
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
    changeColor(val){
      this.cell.attr('text/fill', val)
    },
    changeLabel(e){
      const { value } = e.target;
      this.cell.attr('text/text', value)
    },
    changeFontSize(val){
      this.cell.attr('text/fontSize', val)
    },
    changeBackColor(val){
      this.cell.attr('body/fill', val)
    }
  }
}
</script>