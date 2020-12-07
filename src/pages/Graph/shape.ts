import { Graph, Dom, Node, Shape } from '@antv/x6'
export const FlowChartRect = Graph.registerNode('flow-chart-rect', {
  inherit: 'rect',
  width: 80,
  height: 42,
  attrs: {
    body: {
      stroke: '#5F95FF',
      // strokeWidth: 1,
      strokeWidth: 0,
      // fill: 'rgba(95,149,255,0.05)',
      fill: '#D9D9D9',
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%',
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'edit-text': {
      contenteditable: 'true',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        // color: 'rgba(0,0,0,0.85)',
        fill: '#000000',
      },
    },
    text: {
      fontSize: 12,
      // fill: 'rgba(0,0,0,0.85)',
      fill: '#000000',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text',
            },
          ],
        },
      ],
    },
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  },
})

export const FlowChartImageRect = Graph.registerNode('flow-chart-image-rect', {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    image: {
      'xlink:href': 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 16,
      height: 16,
      x: 12,
      y: 12,
    },
    title: {
      text: 'Node',
      refX: 40,
      refY: 14,
      // fill: 'rgba(0,0,0,0.85)',
      fill: '#000000',
      fontSize: 12,
      'text-anchor': 'start',
    },
    text: {
      text: 'this is content text',
      refX: 40,
      refY: 38,
      fontSize: 12,
      // fill: 'rgba(0,0,0,0.6)',
      fill: '#000000',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  },
})

export const FlowChartTitleRect = Graph.registerNode('flow-chart-title-rect', {
  inherit: 'rect',
  width: 200,
  height: 68,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    head: {
      refWidth: '100%',
      stroke: 'transparent',
      height: 28,
      fill: 'rgb(95,149,255)',
    },
    image: {
      'xlink:href': 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      height: 16,
      x: 6,
      y: 6,
    },
    title: {
      text: 'Node',
      refX: 30,
      refY: 9,
      fill: '#ffffff',
      fontSize: 12,
      'text-anchor': 'start',
    },
    text: {
      text: 'this is content text',
      refX: 8,
      refY: 45,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'rect',
      selector: 'head',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  },
})

export const FlowChartAnimateText = Graph.registerNode('flow-chart-animate-text', {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    text1: {
      class: 'animate-text1',
      text: 'AntV X6',
      fontSize: 32,
    },
    text2: {
      class: 'animate-text2',
      text: 'AntV X6',
      fontSize: 32,
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text1',
    },
    {
      tagName: 'text',
      selector: 'text2',
    },
  ],
})

export class NodeGroup extends Node {
  private collapsed: boolean = false

  public maxHeight: number = 200
  public maxWidth: number = 240
  protected postprocess() {
    this.toggleCollapse(false)
  }

  isCollapsed() {
    return this.collapsed
  }

  toggleCollapse(collapsed?: boolean) {
    const target = collapsed == null ? !this.collapsed : collapsed
    if (target) {
      this.attr('buttonSign', { d: 'M 1 5 9 5 M 5 1 5 9' })
      this.attr('image/xlink:href', require('../../assets/flow/group_close.png'))
      this.resize(200, 40)
    } else {
      this.attr('buttonSign', { d: 'M 2 5 8 5' })
      this.attr('image/xlink:href', require('../../assets/flow/group_open.png'))
      this.resize(this.data.maxWidth ? this.data.maxWidth : 240, this.data.maxHeight)
    }
    this.collapsed = target
  }
}

NodeGroup.config({
  shape: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'g',
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted',
          },
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none',
          },
        },
      ],
    },
  ],
  attrs: {
    body: {
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 1,
      // fill: 'rgba(95,149,255,0.05)',
      fill: '#E9E9E9',
      // stroke: '#5F95FF',
      stroke: '#CDCDCD',
    },
    image: {
      'xlink:href': require('../../assets/flow/group_open.png'),
      width: 16,
      height: 16,
      x: 8,
      y: 12,
    },
    text: {
      fontSize: 12,
      // fill: 'rgba(0,0,0,0.85)',
      fill: '#000000',
      refX: 30,
      refY: 15,
    },
    buttonGroup: {
      refX: '100%',
      refX2: -25,
      refY: 13,
    },
    button: {
      height: 14,
      width: 16,
      rx: 2,
      ry: 2,
      fill: '#f5f5f5',
      stroke: '#ccc',
      cursor: 'pointer',
      event: 'node:collapse',
    },
    buttonSign: {
      refX: 3,
      refY: 2,
      stroke: '#808080',
    },
  },
})

export class EdgeArrow extends Shape.Edge {}
EdgeArrow.config({
  attrs: {
    line: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      targetMarker: {
        name: 'classic',
        size: 8,
      },
    },
  },
  router: {
    name: 'manhattan',
  },
})

export class EdgeTwoArrows extends Shape.Edge {}
EdgeTwoArrows.config({
  attrs: {
    line: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      sourceMarker: {
        name: 'classic',
        size: 8,
      },
      targetMarker: {
        name: 'classic',
        size: 8,
      },
    },
  },
  router: {
    name: 'manhattan',
  },
})
