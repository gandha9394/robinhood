import includePaths from 'rollup-plugin-includepaths';
const removeShebang = (options = {}) => ({
  name: 'rollup-plugin-remove-shebang',
  transform: (code, id) => {
    const includes = options.include || ['node_modules'];
    if (includes.some(include => id.includes(include))) {
      return code.replace(/[\s\n]*#!.*[\s\n]*/, '');
    }
    return null;
  }
});
export default {
    input: './dist/rh/index.js',
    output: {
      file: 'dist/.rhbundle.js',
      format: 'es'
    },makeAbsoluteExternalsRelative:false,
    plugins:[
        removeShebang({include:['dist/rh/index.js']}),
        includePaths({ paths: ["dist/src"] })
    ]
  };