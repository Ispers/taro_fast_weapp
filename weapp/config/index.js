import { defineConfig } from '@tarojs/cli'

import devConfig from './dev'
import prodConfig from './prod'
import global from './global'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'taroWeappDemo',
    date: '2024-8-13',
    // 兼容 NutUI 以及 兼容项目配置的尺寸设置为非 750 导致组件库的样式偏大偏小问题
    designWidth(input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2 / 1
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
      // 使用 HTML 标签
      '@tarojs/plugin-html',
    ],
    // 非Number类型的值，必须要写成json字符
    defineConstants: global,
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      // 是否开启依赖预编译功能。开启后首次编译 Taro 会把项目的 node_modules 依赖打包为模块联邦的 Remote 应用，二次编译时 Webpack 只需要编译项目源码，从而提升编译速度
      prebundle: {
        // 不需要执行预编译的依赖
        exclude: ['@nutui/nutui-react-taro', '@nutui/icons-react-taro', '@tarojs/extend']
      }
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    // sass: {
    //   resource: [
    //     path.resolve(__dirname, '..', 'src/assets/styles/custom_theme.scss')
    //   ],
    //   // 默认京东 APP 10.0主题 > @import "@nutui/nutui-react-taro/dist/styles/variables.scss";
    //   data: `@import "@nutui/nutui-react-taro/dist/styles/variables-jmapp.scss";`
    // },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
