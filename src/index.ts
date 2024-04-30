// @ts-ignore
import Tesseract from 'tesseract.js/dist/tesseract.esm.min.js';
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
  _el?: HTMLCanvasElement = undefined
  _src: string = ''
  width: number = 0
  height: number = 0
  lang = 'chi_sim'
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
      return
    }
    const ctx = _el.getContext('2d')
    if (!ctx) {
      return
    }
    const img = new Image()
    img.src = _src
    img.onload = () => {
      _el.width = this.width || img.naturalWidth
      _el.height = this.height || img.naturalHeight
      ctx.drawImage(img, 0, 0, _el.width, _el.height)
      this.getText()
    }
  }
  async getText() {
    const worker = await Tesseract.createWorker(this.lang, 1, {
      logger: (m: LoggerMessage) => console.log(m),
    });
    const ret = await worker.recognize(this._el, {rotateAuto: true}, {imageColor: true, imageGrey: true, imageBinary: true});
    console.log(ret);
    return ret
  }
}
