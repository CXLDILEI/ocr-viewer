import OCRViewer from "../dist/ocr-viewer.esm.js";

new OCRViewer({
	el: document.getElementById('viewer'),
	src: './test.png',
	lang: 'chi_sim',
})
