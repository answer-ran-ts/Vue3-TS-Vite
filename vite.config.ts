import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'


export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd()).VITE_PROJECT_ENV
  return defineConfig({
    // 判断当前环境变量，如果是开发环境，base用./,如果是生产环境用decisionAnalysis，因为生产环境用./的话，会找不到对应的入口报错
    base: env === 'dev' ? './' : '/decisionAnalysis',
    publicDir: 'src/assets/static',//要打包的静态资源，我的图片资源在这个文件夹里，不配置的话，output打包出来的文件会没有图片
    plugins: [vue(), vueJsx(), viteCompression({//压缩，让体积更小
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    })], // 配置需要使用的插件列表，这里将vue添加进去
    // 配置文件别名 vite1.0是/@/  2.0改为/@
    // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    // 强制预构建插件包
    optimizeDeps: {
      include: ['axios'],
    },
    // 打包配置
    build: {
      // 清除console和debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        input: {
          //方便运维配置，我把index.html入口文件名和指定输出路径文件改为同名了，但是开发环境没有index.html会导致页面空白，所以我是再复制一份出来命名为index.html
          index: resolve(__dirname, 'index.html')
          // main: resolve(__dirname, 'decisionAnalysis.html'),
          // nested: resolve(__dirname, 'nested/index.html')
        },
        output: {//配置这个是让不同类型文件放在不同文件夹，不会显得太乱
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) { //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      },
      target: 'modules',
      outDir: 'dist/decisionAnalysis', //指定输出路径
      assetsDir: '', // 指定生成静态资源的存放路径
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      emptyOutDir: true,//打包前先清空原有打包文件
    },
    // 本地运行配置，及反向代理配置
    server: {
      cors: true, // 默认启用并允许任何源
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      //反向代理配置
      proxy: {
        '/decision-analysis-platform-test': {
          target: 'https://huyun120.cn/decision-analysis-platform-test',   //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/decision-analysis-platform-test/, '')
        }
      }
    }
  })
}