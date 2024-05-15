interface ConfigResult {
  jobId: string
  data: any
}
export default class TextLayer {
  constructor(options: any) {
    this.init(options)
  }
  width: number = 0
  height: number = 0
  textData?: ConfigResult = undefined
  textLayer?: HTMLElement = undefined
  init(options: any) {
    const { el, textData, width, height } = options
    this.textData = textData
    this.width = width
    this.height = height
    this.createdTextLayer(el)
  }
  createdTextLayer(el: any) {
    this.textLayer = document.createElement('div')
    if (this.textLayer) {
      this.textLayer.id = 'textLayer'
      this.textLayer.style.width = `${this.width}px`
      this.textLayer.style.height = `${this.height}px`
      this.textLayer.style.position = 'absolute'
      this.textLayer.style.top = '0'
      this.analysisText()
      el.appendChild(this.textLayer)
    }
  }
  analysisText() {
    const { data } = this.textData!
    if (Array.isArray(data.words)) {
      for (let i = 0; i < data.words.length; i++) {
        const word = data.words[i]
        const { text, bbox, baseline } = word
        const { x0: x, y0: y, x1: width, y1: height } = bbox
        const baseLineY = baseline,has_baseline = true
        const spanLayer = document.createElement('span')
        spanLayer.innerText = text
        spanLayer.style.position = 'absolute'
        spanLayer.style.display = 'inline-block'
        spanLayer.style.verticalAlign = 'top'
        spanLayer.style.top = `${y}px`
        spanLayer.style.left = `${x}px`
        spanLayer.style.color = 'transparent'
        spanLayer.style.cursor = 'text'
        this.textLayer!.appendChild(spanLayer)
      }
    }

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet!.insertRule('#textLayer span::selection { background: rgba(22,119,255, 0.5); }', 0);
  }
}
