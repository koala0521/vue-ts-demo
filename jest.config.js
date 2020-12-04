/*
 * @Author: XueBaBa
 * @Description: 文件描述~
 * @Date: 2020-12-03 17:47:27
 * @LastEditTime: 2020-12-03 18:28:31
 * @LastEditors: Do not edit
 * @FilePath: /vue-ts-demo/jest.config.js
 */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  'collectCoverageFrom': ['**/*.{js,vue}', '!**/node_modules/**']
}
