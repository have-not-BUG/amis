define('docs/dev.md', function(require, exports, module) {

  module.exports = {
    "title": "自定义组件",
    "shortname": "dev",
    "html": "<p>自定义组件主要分两类。表单类和非表单类。</p>\n<h3><a class=\"anchor\" name=\"formitem\" href=\"#formitem\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>FormItem</h3><p>即表单类，它主要用来扩充表单项。先看个例子。</p>\n<pre><code class=\"lang-jsx\"><span class=\"hljs-keyword\">import</span> * <span class=\"hljs-keyword\">as</span> React <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> {FormItem} <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'amis'</span>;\n<span class=\"hljs-keyword\">import</span> * <span class=\"hljs-keyword\">as</span> cx <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'classnames'</span>;\n\n@FormItem({\n    <span class=\"hljs-attr\">type</span>: <span class=\"hljs-string\">'custom-checkbox'</span>,\n})\n<span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> <span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span> <span class=\"hljs-title\">CustomCheckbox</span> <span class=\"hljs-keyword\">extends</span> <span class=\"hljs-title\">React</span>.<span class=\"hljs-title\">PureComponent</span> </span>{\n    toggle = <span class=\"hljs-function\"><span class=\"hljs-params\">()</span> =&gt;</span> {\n        <span class=\"hljs-keyword\">const</span> {value, onChange} = <span class=\"hljs-keyword\">this</span>.props;\n\n        onChange(!value);\n    };\n\n    render() {\n        <span class=\"hljs-keyword\">const</span> {value} = <span class=\"hljs-keyword\">this</span>.props;\n        <span class=\"hljs-keyword\">const</span> checked = !!value;\n\n        <span class=\"hljs-keyword\">return</span> (\n            <span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span>&gt;</span>\n                <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">a</span>\n                    <span class=\"hljs-attr\">className</span>=<span class=\"hljs-string\">{cx(</span>'<span class=\"hljs-attr\">btn</span> <span class=\"hljs-attr\">btn-default</span>', {\n                        '<span class=\"hljs-attr\">btn-success</span>'<span class=\"hljs-attr\">:</span> <span class=\"hljs-attr\">checked</span>,\n                    })}\n                    <span class=\"hljs-attr\">onClick</span>=<span class=\"hljs-string\">{this.toggle}</span>\n                &gt;</span>\n                    {checked ? '已勾选' : '请勾选'}\n                <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">a</span>&gt;</span>\n                <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">className</span>=<span class=\"hljs-string\">\"inline m-l-xs\"</span>&gt;</span>{checked ? '已勾选' : '请勾选'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n            <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span></span>\n        );\n    }\n}\n</code></pre>\n<p>有了这个代码后，页面配置 form 的 controls 里面就可以通过这样的配置启动了。</p>\n<pre><code class=\"lang-js\">{\n    <span class=\"hljs-comment\">// 其他信息省略了。。</span>\n    <span class=\"hljs-attribute\">type</span>: <span class=\"hljs-string\">'form'</span>,\n    <span class=\"hljs-attribute\">controls</span>: [\n        {\n            <span class=\"hljs-attribute\">type</span>: <span class=\"hljs-string\">'custom-checkbox'</span>,\n            <span class=\"hljs-attribute\">name</span>: <span class=\"hljs-string\">'变量名'</span>,\n            <span class=\"hljs-attribute\">label</span>: <span class=\"hljs-string\">'自定义组件。'</span>\n        }\n    ]\n}\n</code></pre>\n<p>表单项开发主要关心两件事。</p>\n<ol>\n<li>呈现当前值。如以上例子，勾选了则显示<code>已勾选</code>，否则显示<code>请勾选</code>。</li>\n<li>接收用户交互，修改表单项值。如以上例子，当用户点击按钮时，切换当前选中的值。</li>\n</ol>\n<p>至于其他功能如：label/description 的展示、表单验证功能、表单布局（常规、左右或者内联）等等，只要是通过 FormItem 注册进去的都无需自己实现。</p>\n<h3><a class=\"anchor\" name=\"renderer\" href=\"#renderer\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>Renderer</h3><p>非表单类的组件自定义，主要通过 <code>Renderer</code> 实现。在开始阅读之前，请先阅读 <a href=\"./sdk#工作原理\">AMis 工作原理</a>。</p>\n<pre><code class=\"lang-jsx\"><span class=\"hljs-keyword\">import</span> * as <span class=\"hljs-type\">React</span> from <span class=\"hljs-symbol\">'reac</span>t';\n<span class=\"hljs-keyword\">import</span> {<span class=\"hljs-type\">Renderer</span>} from <span class=\"hljs-symbol\">'ami</span>s';\n\n<span class=\"hljs-meta\">@Renderer</span>({\n    test: /(^|\\/)my\\-renderer$/,\n})\n<span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span> <span class=\"hljs-title\">CustomRenderer</span> <span class=\"hljs-keyword\">extends</span> <span class=\"hljs-title\">React</span>.<span class=\"hljs-title\">Component</span> </span>{\n    render() {\n        const {tip, body, render} = <span class=\"hljs-keyword\">this</span>.props;\n\n        <span class=\"hljs-keyword\">return</span> (\n            &lt;div&gt;\n                &lt;p&gt;这是自定义组件：{tip}&lt;/p&gt;\n                {body ? (\n                    &lt;div className=<span class=\"hljs-string\">\"container\"</span>&gt;\n                        {render(<span class=\"hljs-symbol\">'bod</span>y', body, {\n                            <span class=\"hljs-comment\">// 这里的信息会作为 props 传递给子组件，一般情况下都不需要这个</span>\n                        })}\n                    &lt;/div&gt;\n                ) : <span class=\"hljs-literal\">null</span>}\n            &lt;/div&gt;\n        );\n    }\n}\n</code></pre>\n<p>这里注册一个 React 组件，当节点的 path 信息是 <code>my-renderer</code> 结尾时，交给当前组件来完成渲染。</p>\n<p>请注意 <code>this.props</code> 中的 <code>render</code> 方法，它用来实现容器功能，通过它可以让使用者动态的配置其他渲染模型。</p>\n<h2><a class=\"anchor\" name=\"%E5%B7%A5%E5%85%B7\" href=\"#%E5%B7%A5%E5%85%B7\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>工具</h2><p>目前主要提供以下工具。</p>\n<h3><a class=\"anchor\" name=\"fetch\" href=\"#fetch\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>fetch</h3><pre><code class=\"lang-jsx\"><span class=\"hljs-keyword\">import</span> {<span class=\"hljs-keyword\">fetch</span>} <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'amis/utils'</span>;\n</code></pre>\n<p>用来做 ajax 请求。参数说明</p>\n<ul>\n<li><code>api</code> 字符串或者 api 对象，如： {url: &#39;<a href=\"http://www.baidu.com&#39;\">http://www.baidu.com&#39;</a>, method: &#39;get&#39;}, api 地址支持变量。</li>\n<li><code>data</code> 数据体</li>\n</ul>\n<p>返回一个 Promise。</p>\n<p>如：</p>\n<pre><code class=\"lang-js\"><span class=\"hljs-keyword\">import</span> {<span class=\"hljs-keyword\">fetch</span>} <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'amis/utils'</span>;\n\n<span class=\"hljs-keyword\">fetch</span>(<span class=\"hljs-string\">'http://www.baidu.com/api/xxx?a=${a}&amp;b=${b}'</span>, {\n    a: <span class=\"hljs-string\">'aa'</span>,\n    b: <span class=\"hljs-string\">'bb'</span>,\n}).<span class=\"hljs-keyword\">then</span>(<span class=\"hljs-keyword\">function</span>(result) {\n    console.log(result);\n});\n</code></pre>\n<h3><a class=\"anchor\" name=\"filter\" href=\"#filter\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>filter</h3><pre><code class=\"lang-jsx\"><span class=\"hljs-keyword\">import</span> {<span class=\"hljs-keyword\">filter</span>} <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'amis/utils'</span>;\n</code></pre>\n<p>主要用来做字符替换，如：</p>\n<pre><code class=\"lang-js\">import {filter} from <span class=\"hljs-string\">'amis/utils'</span>;\n\nfilter<span class=\"hljs-comment\">('blabla?a={a}', {a: 123})</span>; <span class=\"hljs-comment\">// =&gt; 'blabla?a=123'</span>\n</code></pre>\n",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [
        {
          "label": "FormItem",
          "fragment": "formitem",
          "fullPath": "#formitem",
          "level": 3
        },
        {
          "label": "Renderer",
          "fragment": "renderer",
          "fullPath": "#renderer",
          "level": 3
        },
        {
          "label": "工具",
          "fragment": "%E5%B7%A5%E5%85%B7",
          "fullPath": "#%E5%B7%A5%E5%85%B7",
          "level": 2,
          "children": [
            {
              "label": "fetch",
              "fragment": "fetch",
              "fullPath": "#fetch",
              "level": 3
            },
            {
              "label": "filter",
              "fragment": "filter",
              "fullPath": "#filter",
              "level": 3
            }
          ]
        }
      ],
      "level": 0
    }
  };

});
