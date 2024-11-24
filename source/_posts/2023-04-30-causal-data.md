---
title: 因果推断的数据集从何而来？
mathjax: true
codeblock:
  enable: true
  show_result: true
date: 2023-04-30 17:13:37
tags: 学习笔记 因果推断
categories: 学习笔记
---

因果推断中的数据集（尤其是反事实数据）是如何产生的？有哪些常用的数据集？

<!--more-->
## 参考文献
1. https://cloud.tencent.com/developer/article/1837845#:~:text=%E5%9B%A0%E6%9E%9C%E6%8E%A8%E6%96%AD%E7%A0%94%E7%A9%B6%E6%89%80%E9%87%87%E7%94%A8%E7%9A%84%E8%A7%82%E5%AF%9F%E6%80%A7%E6%95%B0%E6%8D%AE%E9%9B%86%E9%80%9A%E5%B8%B8%E6%98%AF%E3%80%8C%E5%8D%8A%E5%90%88%E6%88%90%E3%80%8D%E7%9A%84%EF%BC%9A%E9%83%A8%E5%88%86%E6%95%B0%E6%8D%AE%E9%9B%86%EF%BC%88%E4%BE%8B%E5%A6%82,IHDP%EF%BC%89%E9%80%9A%E8%BF%87%E9%9A%8F%E6%9C%BA%E6%95%B0%E6%8D%AE%E9%9B%86%EF%BC%88RCT%E8%AF%95%E9%AA%8C%EF%BC%89%E7%94%9F%E6%88%90%E5%BE%97%E5%88%B0%EF%BC%8C%E9%87%87%E7%94%A8%E5%9B%BA%E5%AE%9A%E7%9A%84%E7%94%9F%E6%88%90%E8%BF%87%E7%A8%8B%EF%BC%8C%E5%B9%B6%E4%BB%8E%E4%B8%AD%E7%A7%BB%E9%99%A4%E6%9C%89%E5%81%8F%E5%AD%90%E9%9B%86%E6%9D%A5%E6%A8%A1%E6%8B%9F%E8%A7%82%E6%B5%8B%E6%95%B0%E6%8D%AE%E4%B8%AD%E7%9A%84%E9%80%89%E6%8B%A9%E5%81%8F%E5%B7%AE%EF%BC%9B%E9%83%A8%E5%88%86%E6%95%B0%E6%8D%AE%E9%9B%86%E5%88%99%E5%B0%86%E9%9A%8F%E6%9C%BA%E6%95%B0%E6%8D%AE%E9%9B%86%E4%B8%8E%E8%A7%82%E6%B5%8B%E5%AF%B9%E7%85%A7%E6%95%B0%E6%8D%AE%E9%9B%86%E7%BB%93%E5%90%88%E8%B5%B7%E6%9D%A5%E4%BB%A5%E5%88%9B%E9%80%A0%E9%80%89%E6%8B%A9%E5%81%8F%E5%B7%AE%E3%80%82

<section class="post-full-comments">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
    <script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
    <div id="gitalk-container"></div>
    <script>
        var gitalk = new Gitalk({
            clientID: 'e1bbf465a324641f76ce',
            clientSecret: 'b865ad952a6494eb48283884abbe479d3f89f4a4',
            repo: 'LiJT-Daily-Comments',
            owner: 'CSLiJT',
            admin: ['CSLiJT'], //这里可以填写具有写权限的用户名列表，用来初始化Issues的
            id: decodeURI(window.location.pathname),
            distractionFreeMode: true // Facebook-like distraction free mode
        });
        gitalk.render('gitalk-container');
    </script>
</section>