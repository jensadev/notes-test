import { terser } from 'rollup-plugin-terser';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/js/main.js',
    output: {
        file: 'dist/js/bundle.js',
        format: 'iife'
    },
    plugins: [terser(), nodeResolve()] 
};
