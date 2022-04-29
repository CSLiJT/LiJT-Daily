---
title: 因果推断学习笔记.3
mathjax: true
codeblock:
  enable: true
  show_result: true
date: 2022-04-22 10:49:39
tags: 因果推断
categories: 学习笔记
---
观测性研究中对平均因果作用（$ACE$）的估计方法：倾向得分（propensity score）、线性回归、Heckman Selection Model。本篇主要介绍倾向得分方法。线性回归和HSM可见文末附参考文献。
<!--more-->
## 观测性研究中对ACE的估计方法
### 倾向得分
如上篇学习笔记所言，如果个体信息变量足够简单，$X$为二值变量（如性别），则可以按照$X=1$和$X=0$将样本分为两层，在每层分别估计$ACE$后再做加权平均，即可得到全体$ACE$的相合估计。但事实上，$X$的**维数很高且可能有连续分量**，因此很难将样本按$X$分层。即便能分层，也会面临类别不平衡的问题。为此，Rosenbaum and Rubin(1983) 提出了倾向得分的概念。

**定义**：倾向得分的定义为：
$$
e(X)=P(Z=1|X)
$$
且满足
1. $X\perp Z|e(X)$
2. 如果有强可忽略性假定（即$Z\perp(Y(1),Y(0))|X$）且$e(X)\in(0,1)$，则$Z\perp(Y(1),Y(0))|e(X)$

#### 分层方法
上述第二条性质表明，如果给定样本信息$X$，处理机制是可忽略的，那么只需要给定一个一维的变量$e(X)$，处理机制也是可以忽略的。这样一来，我们得到了估计ACE的分层（stratify）方法：
- Step 1: 先拟合一个Logistic/Probit模型（自变量为$X$，因变量为$e(X)$），估计每个个体的倾向得分$\hat{e}(X)$
- Step 2: 用估计的倾向得分$\hat{e}(X)$分层（相当于把倾向得分当作个体信息），在每一层中估计平均因果作用，再加权平均即可。

#### 加权方法
此外，Hirano, Imbens and Ridder(2003)从经验似然的角度指出了另一种“加权方法”(weighting)，并证明了该方法是半参数有效的估计方法。该方法使用以下统计量作为$ACE$的估计：
$$
\hat{ACE}=\frac{1}{n}\sum_{i=1}^{n}\left[\frac{Y_i Z_i}{\hat{e}(X_i)}-\frac{Y_i(1-Z_i)}{1-\hat{e}(X_i)}\right]
$$


## 参考文献

1. [丁鹏.因果推断简介.PKU-MATH-00112230.2019](https://www.math.pku.edu.cn/teachers/yaoy/math112230/lecture10_DingP_causal091101.pdf)

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
            id: document.title+document.date,
            distractionFreeMode: false // Facebook-like distraction free mode
        });
        gitalk.render('gitalk-container');
    </script>
</section>