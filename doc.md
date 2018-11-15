# 规范

## 目标

- 初级目标仅仅是该css框架基本的功能都有，类似于bootstrap等css框架
- 暂时不考虑是设计的是否美观，好看，那个后续可以调整
- 注意一个css框架结构和一个项目的css结构不是相同的，前者是通用的，后者往往是定制的，因此css的目录结构可能不一致
    - 此仓库结构作为一个项目的css结构

## 各个目录内容

初级处理
- base
    - 网站全局的一些样式设置
    - sass基本变量等
- layout
    - 栅格系统
    - 网页基本布局样式等
- modules
    - 各个独立的，上下文无关的组件
- state
    - 常用于js的判断状态的样式，例如is-active，is-selected
- utillity
    - 一些公共样式处理，例如.cleaerfix等

## 要点

- sass预处理
- 字体如何处理
- 栅格如何实现
    - float：兼容ie
    - flex：不兼容ie
- css reset
    - HTML标签在浏览器中都有默认的样式，不同的浏览器的默认样式之间存在差别。例如ul默认带有缩进样式，在IE下，它的缩进是由margin实现的，而在Firefox下却是由padding实现的。开发时浏览器的默认样式可能会给我们带来多浏览器兼容性问题，影响开发效率。现在很流行的解决方式是一开始就将浏览器的默认样式全部覆盖掉，这就是css reset。
- svg
- 目前先按照这个库来处理
    - https://github.com/milligram/milligram/blob/master/src/_Base.sass


