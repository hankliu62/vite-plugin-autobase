import { Plugin } from 'vite';
export interface Options {
    /**
     * 自定义前缀
     */
    prefix?: string;
}
/**
 * 创建一个Vite插件，自动设置基础路径（base）和环境变量。
 *
 * 在 Github Pages 项目中，编译的文件需要加项目repo的前缀
 *
 * @example
 * ```js
 * import { defineConfig } from 'vite';
 * import autobase from 'vite-plugin-autobase';
 *
 * export default defineConfig({
 *   plugins: [
 *     autobase()
 *   ]
 * });
 * ```
 *
 * @param opts 选项，包括自定义前缀。
 * @returns 返回一个Vite插件对象。
 */
export default function createPlugin(opts?: Options): Plugin;
