// @ts-ignore
import Tesseract from 'tesseract.js/dist/tesseract.esm.min.js';
import TextLayer from "./text-layer";
type LoggerMessage = {
  jobId: string
  progress: number
  status: string
  userJobId: string
  workerId: string
}
export default class OCRViewer {
  constructor(options: any) {
    this.init(options)
  }
  _el?: HTMLElement = undefined
  _src: string = ''
  width: number = 0
  height: number = 0
  lang = 'eng'
  canvasEl?: HTMLCanvasElement = undefined
  init(options: any) {
    const { el, src, width, height, lang } = options;
    this._el = el
    this._src = src
    this.lang = lang || this.lang
    this.width = width
    this.height = height
    this.render()
  }
  render() {
    const { _el, _src } = this
    if (!_el) {
      console.error('el is undefined')
      return
    }
    this.canvasEl = this.createdCanvas()
    _el.appendChild(this.canvasEl)
    _el.style.position = 'relative'
    const ctx = this.canvasEl.getContext('2d')
    if (!ctx) {
      return
    }
    const img = new Image()
    img.src = _src
    img.onload = async () => {
      if (this.canvasEl) {
        this.canvasEl.width = this.width || img.naturalWidth
        this.canvasEl.height = this.height || img.naturalHeight
        ctx.drawImage(img, 0, 0, this.canvasEl.width, this.canvasEl.height)
        const textData = await this.getText()
        new TextLayer({
          el: _el,
          textData: textData,
          width: this.canvasEl.width,
          height: this.canvasEl.height,
        })
      }
    }
  }
  createdCanvas() {
    const canvas = document.createElement('canvas')
    canvas.id = 'ocr-viewer-canvas'
    return canvas
  }
  async getText() {
    const worker = await Tesseract.createWorker(this.lang, 1, {
      logger: (m: LoggerMessage) => console.log(m),
    });
    const ret = await worker.recognize(this.canvasEl, {rotateAuto: true}, {imageColor: true, imageGrey: true, imageBinary: true});
    console.log('result:', ret);
    await worker.terminate();
    return ret
  }
}
