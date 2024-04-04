import { UserConfig, ConfigEnv, Plugin } from 'vite';

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
export default function createPlugin(opts?: Options): Plugin {
  const { prefix } = opts || {};

  const plugin: Plugin = {
    name: 'vitejs-plugin-autobase',
    config(config: UserConfig, { command }: ConfigEnv) {
      // 根据命令模式（构建或开发）自动调整配置
      if (command === 'build') {
        // 检测是否在Github Actions环境中运行
        const isGithubActions = process.env?.GITHUB_ACTIONS || false;

        if (isGithubActions) {
          // 在Github Actions环境中自动设置base路径
          // ts-ignore
          const repo = prefix || (process.env?.GITHUB_REPOSITORY || "").replace(/.*?\//, "");
          if (repo && (!config.base || config.base === '/')) {
            // 用于为静态资源（如图像、样式表、JavaScript 文件等）设置 URL 前缀
            // 这在将应用部署到自定义域名或 CDN 上时特别有用，因为它允许您将静态资源存储在不同的位置
            // 设置base路径，用于静态资源的URL前缀
            config.base = `/${repo}/`;
            // 同时设置process.env中的ROUTE_PREFIX，供应用内部使用
            if (config.define?.["process.env"]) {
              config.define["process.env"]["ROUTE_PREFIX"] = `/${repo}`;
            } else {
              config.define = {
                ...(config.define || {}),
                ["process.env"]: {
                  ["ROUTE_PREFIX"]: `/${repo}`,
                }
              };
            }
          }
        }
      }

      return config;
    },
  };

  return plugin;
}