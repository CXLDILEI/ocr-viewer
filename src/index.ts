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
  imgElement: HTMLImageElement = new Image()
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
    _el.style.position = 'relative'
    this.imgElement.src = _src
    this.imgElement.onload = async () => {
      this._el!.style.width = `${this.width || this.imgElement.naturalWidth}px`
      this._el!.style.height = `${this.height || this.imgElement.naturalHeight}px`
      this.imgElement.width = this.width || this.imgElement.naturalWidth
      this.imgElement.height = this.height || this.imgElement.naturalHeight
      this._el?.appendChild(this.imgElement)
      const textData = await this.getText()
      new TextLayer({
        el: _el,
        textData: textData,
        width: this.imgElement.width,
        height: this.imgElement.height,
      })
    }
  }
  async getText() {
    const worker = await Tesseract.createWorker(this.lang, 1, {
      logger: (m: LoggerMessage) => console.log(m),
    });
    const ret = await worker.recognize(this.imgElement, {rotateAuto: true}, {imageColor: true, imageGrey: true, imageBinary: true});
    console.log('result:', ret);
    await worker.terminate();
    return ret
  }
}
