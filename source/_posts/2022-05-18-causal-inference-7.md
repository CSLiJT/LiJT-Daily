---
title: 因果推断学习笔记.7
mathjax: true
codeblock:
  enable: true
  show_result: true
date: 2022-05-18 19:43:36
tags: 因果推断
categories: 学习笔记
---

为了解决其他变量/协变量干扰因果效应的问题，老爷子提出了后门准则 & 前门准则。

<!--more-->

## 后门准则
- 假设在变量图中，想要探究 $X\to Y$的因果效应
- 但是图中总有一些指向$X$的、看得见（图中有显示）却摸不着（实验中难以测量）的父变量
- 后门准则所解决的就是由于$X$的可见不可得的父变量导致无法测量$X$对$Y$的因果效应的问题！

---
**定义：后门准则（The Backdoor Criterion）**：在有向无环图$G=(V,E)$中，给定一对变量$(X,Y)\in E$，则变量集合$Z$相对于$(X,Y)$满足后门准则，当且仅当$Z$的任一元素均不是$X$的后继节点，并且$Z$阻断了所有的在$X$和$Y$之间且指向$X$的路径。

---

如果变量集合$Z$满足后门准则，那么$X$对$Y$的因果效应如下推出：
$$
P(Y=y|do(X=x)) = \sum_z P(Y=y|X=x,Z=z)P(Z=z)
$$

- “后门”是指那些连接$X$和$Y$，既指向$X$又指向$Y$的羊肠小道，如$X\leftarrow W\to Y$
- “后门”的存在使得$X$和$Y$是相关的，但这种关系不一定是因果的
- 满足后门准则的变量不能是$X$的后代，否则$X$会因果作用于这类变量，而这类变量又会继续影响$Y$1。
- 满足后门准则的变量必须是在逻辑图中可见的，而不能是不可观测的协变量(confounders)!

## 前门准则
- 仍然假设试图探究 $X\to Y$的因果效应
- 后门准则的一大要求是，满足后门准则的变量在逻辑图中是可见的。问题在于，这一条件不一定能时时刻刻都成立。
  - 例如：$U$为协变量(confounders)，并且$X\leftarrow U\to Y$。即便这是$X$的唯一的“后门”，由于$U$不可观测，因此$U$不能满足后门准则。
- 前门准则所解决的正是这样的问题！

---
**定义：前门准则（The Front-Door Criterion）**：给定一个变量集合$Z$，$Z$相对于变量$(X,Y)$满足前门准则，当且仅当$Z$同时满足以下3个条件：
1. $Z$中断（intercept）所有从$X$到$Y$的有向边；
2. 不存在关于$(X,Z)$的后门；
3. 所有关于$(Z,Y)$的后门均被$X$阻断。

---
如果$Z$满足前门路径，并且$P(x,z)>0$，那么$X\to Y$的因果效应是可识别的，并且可按照如下方式计算：
$$
P(y|do(x)) = \sum_{z}P(z|x)\sum_{x'}P(y|x',z)P(x')
$$

其推导原理如下：
- 由条件2可知，由于不存在$(X,Z)$的后门，因此：

$$
P(Z=z|do(X=x)) = P(Z=z|X=x)
$$

- 由条件1可知，$Z\to Y$ 。因此可以使用后门准则计算 $Z\to Y$的因果效应（书上p68式3.13少写了$P(X=x)$）：
$$
P(Y=y|do(Z=z)) = \sum_{x}P(Y=y|Z=z,X=x)P(X=x)
$$

- 接下来考虑到$X$对$Y$的整体因果效应。如果$Z$被自然赋予（do-操作）了值$z$，那么$Y$的取值为$y$的概率为$P(Y=y|do(Z=z))$。对于$Z$的每一个取值$z$，在$X$被自然赋予（do-操作）了值$x$时，其取值概率为$P(Z=z|do(X=x))$。那么$X\to Y$的整体因果效应为
$$
P(Y=y|do(X=x)) = \sum_{z}P(Y=y|do(Z=z))P(Z=z|do(X=x))\\
= \sum_{z}\sum_{x'}P(Y=y|Z=z,X=x')P(X=x')P(Z=z|X=x)\\
= \sum_{z}P(z|x)\sum_{x'}P(y|x',z)P(x')
$$

## 参考文献
1. Judea Pearl, Madlyn Glymour, Nicholas P.Jewell.Causal Inference in Statistics: A Primer.2016.WILEY
     
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