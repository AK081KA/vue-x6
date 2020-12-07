<template>
  <div style="width:100%;height:100%;">
    <div class="color-picker-area"> </div>
  </div>
</template>

<script>
import Pickr from '@simonwep/pickr/dist/pickr.min.js'
import '@simonwep/pickr/dist/themes/classic.min.css'
import '@simonwep/pickr/dist/themes/monolith.min.css'
import '@simonwep/pickr/dist/themes/nano.min.css'
import $ from 'jquery'
export default {
  name: 'ColorPicker',
  data() {
    return {
      colorPicker: null,
      mycolor: this.color,
      mydisabled: this.disabled,
      isListenColorChange: true,
    }
  },
  model: {
    prop: 'color',
    event: 'update',
  },
  props: {
    color: {
      type: String,
      default: '#40E0D0',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    color(newVal) {
      console.info('切换颜色')
      this.isListenColorChange = false
      this.mycolor = newVal
      if (this.colorPicker) {
        this.colorPicker.setColor(newVal, false)
      }
    },
    disabled(newval) {
      console.info('颜色花瓣', newval)
      console.info('颜色花瓣1', this.colorPicker)
      if (this.colorPicker && newval) {
        this.colorPicker.disable()
      } else if (this.colorPicker && !newval) {
        this.colorPicker.enable()
      }
    },
    mycolor(newVal, old) {
      if (this.isListenColorChange && newVal != this.color) {
        this.$emit('update', newVal)
      }
    },
  },
  mounted() {
    this.colorPicker = Pickr.create({
      //el: '.color-picker-area',
      el: $(this.$el).find('.color-picker-area')[0],
      theme: 'nano', // or 'monolith', or 'nano'
      default: this.color,
      swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)',
      ],

      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
          hex: true,
          rgba: true,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: false,
          save: false,
        },
      },
      // Button strings, brings the possibility to use a language other than English.
      strings: {
        save: '保存', // Default for save button
        clear: '清空', // Default for clear button
        cancel: '取消', // Default for cancel button
      },
    })
    this.colorPicker.on('change', (color, instance) => {
      var newcolor = color.toHEXA().toString()
      this.colorPicker.applyColor(true)
      this.isListenColorChange = true
      this.mycolor = newcolor
      //this.$emit('update', newcolor)
    })
    this.colorPicker.setColor(this.color, false)
    if (this.disabled) {
      this.colorPicker.disable()
    } else {
      this.colorPicker.enable()
    }
  },
  methods: {},
  beforeDestroy() {
    if (this.colorPicker) {
      this.colorPicker.destroy()
    }
  },
}
</script>
<style scoped>
.pcr-app[data-theme='nano'] .pcr-interaction {
  display: inline;
}
.pcr-app[data-theme='nano'] .pcr-interaction .pcr-result {
  text-align: center;
  width: 15em;
}

.pcr-app[data-theme='nano'] .pcr-interaction input {
  text-align: center;
  width: 7.1em;
}
.pcr-app[data-theme='nano'] .pcr-interaction .pcr-save {
  text-align: center;
  width: 7.1em;
}

.pcr-app[data-theme='nano'] .pcr-interaction .pcr-clear {
  text-align: center;
  width: 7.1em;
}
</style>