# fis-optimizer-terser

通过 [terser](https://github.com/terser/terser) 来压缩代码。

用法

```
fis.match('*.js', {
  optimizer: fis.plugin('terser', {
    // options
  })
})
```
