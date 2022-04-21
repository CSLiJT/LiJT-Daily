---
title: 因果推断学习笔记.2
mathjax: true
codeblock:
  enable: true
  show_result: true
date: 2022-04-21 11:15:31
tags: 
categories: 学习笔记
---

因果推断的常用方法。

<!--more-->

## 承接上文
推断因果关系：试问某种处理/因素/变量，对于个体的状态有没有影响（因果作用）？

## Rubin Causal Model (RCM)
- 设$Z_i$表示**个体$i$**接受处理与否（处理取1，对照取0）；$Y_i$表示个体$i$的**结果变量**。另外记二元组$(Y_i(1),Y_i(0))$表示个体$i$接受处理或对照的潜在结果(potential outcome)。那么$Y_i(1)-Y_i(0)$表示个体$i$接受处理的**个体因果作用**。
- 然而问题在于，每个个体要么接受处理，要么作为对照，因此在一次观测中$(Y_i(1),Y_i(0))$必然缺失一半，因此个体的因果作用是不可识别的（注意，这里不允许前一个时刻对照、后一个时刻处理）。从概率的角度看，$i$可以看成样本空间$\Omega$中的样本点$\omega$。但是在**$Z$**做随机化的前提下，我们可以识别总体的平均因果作用(Average Casual Effect, ACE):
$$
ACE(Z\to Y)=E(Y_i(1)-Y_i(0)).
$$
这是因为
$$
\begin{aligned}
ACE(Z\to Y)&=E(Y_i(1))-E(Y_i(0)) &\#\text{对单个个体的全体结果变量求期望}\\
&= E(Y_i(1)|Z_i=1)-E(Y_i(0)|Z_i=0) &\#\text{随机化，即}Z\perp(Y(1),Y(0))\\
&= E(Y_i|Z_i=1)-E(Y_i|Z_i=0) &\#\text{表明ACE可以由观测数据估计出来}\\
\end{aligned}
$$
*注：这里$i$是固定的，期望的取法是将$Y_i$视作随机变量，对$Y_i$取条件期望*

- 上述推导表明，**随机化试验**对于平均因果作用的识别起着至关重要的作用。

## 观测性研究：可忽略性、倾向得分与回归分析
- 上一节的结论表明随机化试验对于平均因果作用的识别非常重要。然而在现实中，很多研究都是无法进行随机化试验的的（**对同一个体的随机化**）。在观测性研究中，通常能搜集到以下数据：个体的信息变量$X$（如年龄、性别）、个体是否接受处理$Z$（如是否吃某种新药、是否吸烟等）、个体的结果变量$Y$（如康复情况、肺部清洁程度等）。那么，我们可以用如下条件期望之差去估计$ACE$吗？
$$
E(Y|Z=1)-E(Y|Z=0)
$$
- 答案是：**不能**。反面教材：辛普森悖论（[Yule-Simpson Paradox](https://baike.baidu.com/item/%E8%BE%9B%E6%99%AE%E6%A3%AE%E6%82%96%E8%AE%BA/4475862)）
- 这就引出一个$ACE$的识别性问题，即通过观测数据我们能否得到ACE的相合估计。实际中，这需要一个不可验证的假定：**可忽略性**。

### 可忽略性&ACE的识别性
- 可忽略行假定：$Z\perp(Y(1),Y(0))$。即上文公式中的“随机化”。
- 这是一条不可验证的**假定**，它的存在使得我们可以通过观测数据识别$ACE$。然而，在观测性研究中，个体**选择处理与否**（$Z$）与其**个体属性**可能相关（注意，本质上，$(Y(1),Y(0))$也是个体属性的一部分！），上面的假定可能被破坏。但通常的方法是，收集充分多的个体信息$X$，使得如下的**强可忽略性假定**成立：
$$
Z\perp(Y(1),Y(0))\perp X
$$
可以证明，此时的$ACE$是可以识别的，因为
$$
\begin{aligned}
ACE &= E(Y(1))-E(Y(0)) &\#\text{对全体个体的全体结果变量求期望}\\
&= E[E(Y(1)|X)] - E[E(Y(0)|X)] &\#\text{全期望公式} \\
&= E[E(Y(1)|X,Z=1)] - E[E(Y(0)|X,Z=0)] \\ 
&= E[E(Y|X,Z=1)] - E[E(Y|X,Z=0)] \\ 
\end{aligned}
$$
- 在上述推导中，通过全期望公式引入个体信息变量$X$的权重，解决了辛普森悖论的问题。接下来的问题是，如何通过上述条件期望计算$ACE$。目前有三种方法：
> 倾向得分（propensity score）
> 线性回归（linear regression）
> Heckman Selection Model（又称Tobit Model）

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