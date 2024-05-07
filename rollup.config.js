import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts', // 入口文件
	output: [
		{
			file: 'dist/ocr-viewer.cjs', // CommonJS 输出
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'dist/ocr-viewer.esm.js', // ES模块输出
			format: 'esm',
			sourcemap: true,
		},
		{
			file: 'dist/ocr-viewer.min.js', // 压缩后的UMD格式输出
			format: 'umd',
			name: 'OCRViewer', // 全局变量名
			sourcemap: true,
			plugins: [terser()],
		},
	],
	plugins: [
		resolve(), // 解析第三方模块
		commonjs(), // 转换CommonJS模块
		typescript({ tsconfig: './tsconfig.json' }), // TypeScript 插件
		json(),
	],
};
