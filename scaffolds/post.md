---
title: {{ title }}
date: {{ date }}
tags:
categories:
mathjax: false
codeblock:
  enable: true
  show_result: true
---

<!--more-->

<section class="post-full-comments">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
    <script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
    <div id="gitalk-container"></div>
    <script>
        var gitalk = new Gitalk({
            clientID: 'e1bbf465a324641f76ce',
            clientSecret: 'f73c0bc3c19755d1c0d886c0d8791cad24509c9a',
            repo: 'LiJT-Daily-Comments',
            owner: 'CSLiJT',
            admin: ['CSLiJT'], //这里可以填写具有写权限的用户名列表，用来初始化Issues的
            id: md5(document.title),
            distractionFreeMode: false // Facebook-like distraction free mode
        });
        gitalk.render('gitalk-container');
    </script>
</section>