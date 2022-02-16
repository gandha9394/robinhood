import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

const resolveBinaryPlugin = () => ({
	name: 'rollup-plugin-unresolve-binaries',
	resolveId: (source) => {
		if (source.endsWith('.node')) {
			return false;
		}
		return null;
	}
});

export default {
	input: 'src/rh/index.ts',
	output: {
		file: 'dist/index.mjs',
		format: 'es'
	},
	plugins: [
		typescript(),
		commonjs(),
		resolveBinaryPlugin()
	]
};