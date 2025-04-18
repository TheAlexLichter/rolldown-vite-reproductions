import { defineConfig } from 'vite'
import webpackStatsPlugin from 'rollup-plugin-webpack-stats'
export default defineConfig({
  plugins: [
    // @ts-expect-error Rollup types
    webpackStatsPlugin()
  ]
})