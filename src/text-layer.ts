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
      el.appendChild(this.textLayer)
      this.analysisText()
    }
  }
  analysisText() {
    const { data } = this.textData!
    if (Array.isArray(data.lines)) {
      for (let i = 0; i < data.lines.length; i++) {
        const line = data.lines[i]
        const { text, bbox } = line
        const { x0: x, y0: y, x1: width, y1: height } = bbox
        const spanLayer = document.createElement('span')
        spanLayer.innerText = text.replace(/\s*/g, '')
        spanLayer.style.position = 'absolute'
        spanLayer.style.top = `${y}px`
        spanLayer.style.left = `${x}px`
        // spanLayer.style.width = `${width}px`
        // spanLayer.style.height = `${height}px`
        spanLayer.style.color = 'transparent'
        spanLayer.style.cursor = 'text'
        // spanLayer.style.fontSize = `${line.words[0].font_size}px`

        this.textLayer!.appendChild(spanLayer)
      }
    }
  }
}
