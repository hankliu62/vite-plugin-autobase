## vite-plugin-autobase

创建一个Vite插件，自动设置基础路径（base）和环境变量。

在 Github Pages 项目中，编译的文件需要加项目repo的前缀

### example

``` js
import { defineConfig } from 'vite';
import autobase from 'vite-plugin-autobase';

export default defineConfig({
  plugins: [
    autobase()
  ]
});
```


