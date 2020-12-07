export default {
    name: 'AreaTitle',
    props: {
      title: {
        type: String,
        default: null,
      },
    },
    created() {},
    data() {
      return {}
    },
    methods: {},
    render() {
      const { title } = this.$props
      var areatitle = {
        'margin-bottom': '18px',
        display: 'inline-block',
        'margin-right': '18px',
      }
      return title ? (
        <div class="table-operator" style="display: inline-block;margin-right: 18px;padding-left: 15px;height: 100%;">
         
          <span class="areatitle-font" style="font-size:20px;color:#000;line-height: 40px;">
            {title}
          </span>
        </div>
      ) : null
    },
  }
  