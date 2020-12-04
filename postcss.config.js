/*
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-11-25 11:37:58
 * @LastEditTime: 2020-12-01 10:45:26
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/postcss.config.js
 */
module.exports = {
  "plugins":{
    'autoprefixer': {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    },
    // 'postcss-px-to-viewport': {
    //   viewportWidth: 750,     // (Number) The width of the viewport.
    //   viewportHeight: 1334,    // (Number) The height of the viewport.
    //   unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
    //   viewportUnit: 'vw',     // (String) Expected units.
    //   selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
    //   minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
    //   mediaQuery: false
    // }  
  }
 
}
