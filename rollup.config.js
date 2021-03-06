import path from 'path'

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import url from 'rollup-plugin-url'
import execute from 'rollup-plugin-execute' // To replace copy plugin
import filesize from 'rollup-plugin-filesize'

// devserver requirements
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import html from 'rollup-plugin-fill-html'

// postcss plugins that we use for the component library
import postcss from 'rollup-plugin-postcss'
import postcssModules from 'postcss-modules'
import cssnext from 'postcss-cssnext'
import precss from 'precss'
import cssnano from 'cssnano'
import nested from 'postcss-nested'
import postcssImport from 'postcss-import'
import postcssUrl from 'postcss-url'

// Convert CJS modules to ES6, so they can be included in a bundle
import commonjs from 'rollup-plugin-commonjs'

import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'

const cssExportMap = {}
const NODE_MODULES_EXCLUDE = 'node_modules/**'

const output_dir = path.resolve(__dirname, 'build')
const input_dir = isProd
   ? path.resolve(__dirname, 'lib', 'index.js')
   : path.resolve(__dirname, 'lib', 'app.js')

const external = Object.keys(pkg.dependencies)

let postCssPlugins = [
   postcssImport({
      root: 'node_modules',
   }),
   postcssUrl({ url: 'rebase' }),
   cssnext({ warnForDuplicates: false }),
   precss(),
   nested(),
   postcssModules({
      getJSON(id, exportTokens) {
         cssExportMap[id] = exportTokens
      },
   }),
]

let rollupPlugins = [
   // Define environment variables in the library
   replace({
      'process.env.NODE_ENV': JSON.stringify(
         process.env.NODE_ENV || 'development'
      ),
   }),

   // postcss for styles using numerous plugins for sass like syntax
   postcss({
      sourceMap: 'inline',
      plugins: isProd ? [...postCssPlugins, cssnano()] : postCssPlugins,
      getExportNamed: false,
      getExport(id) {
         return cssExportMap[id]
      },
   }),

   // Allow transpilation of future JS
   babel({
      exclude: NODE_MODULES_EXCLUDE,
      externalHelpers: false,
      runtimeHelpers: true,
   }),

   resolve({
      customResolveOptions: {
         moduleDirectory: 'node_modules',
      },
      jsnext: true,
      main: true,
      browser: true,
   }),

   commonjs({
      include: 'node_modules/**',
      namedExports: {
         'node_modules/react/index.js': [
            'PropTypes',
            'createElement',
            'Component',
            'PureComponent',
            'cloneElement',
            'Children',
         ],
         'node_modules/react-dom/index.js': ['findDOMNode'],
      },
   }),

   // limit imports or url() in project
   url({ limit: 10 * 1024, emitFiles: true }),

   // show the output bundle size in the CLI
   filesize(),
]

if (isProd) {
   rollupPlugins = [...rollupPlugins, uglify()]
} else {
   rollupPlugins = [
      ...rollupPlugins,

      execute([
         'cp public/index.html build/index.html',
         'cp node_modules/highlight.js/styles/atom-one-dark.css build/atom-one-dark.css',
      ]),

      html({
         template: 'build/index.html',
         filename: 'index.html',
         externals: [
            // { type: 'css', file: 'main.css', inject: 'head' },
            { type: 'css', file: 'atom-one-dark.css', inject: 'head' },
            { type: 'js', file: 'index.js', inject: 'body' },
         ],
      }),

      // devserver instantiation
      serve({
         contentBase: output_dir,
         historyApiFallback: false,
         port: 8080,
      }),

      livereload({ watch: output_dir }),
   ]
}

export default {
   input: input_dir,
   output: {
      file: path.resolve(output_dir, 'index.js'),
      format: 'cjs',
      name: 'glomo-boxes',
      sourcemap: true,
      sourcemapFile: output_dir,
   },
   plugins: rollupPlugins,

   // external dependencies of the project
   external: isProd && external,
}
