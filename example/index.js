import OCRViewer from "../dist/ocr-viewer.esm.js";

new OCRViewer({
	el: document.getElementById('canvas'),
	src: './test.png',
})
