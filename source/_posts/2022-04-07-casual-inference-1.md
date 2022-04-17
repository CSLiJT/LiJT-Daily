---
title: 因果推断学习笔记.1
mathjax: true
codeblock:
  enable: true
  show_result: true
date: 2022-04-07 12:16:58
tags:
categories: 学习笔记
---

因果推断的基本概念。

<!--more-->

## 基本概念
### 相关与因果的不同
- 相关性 $\neq$ 因果性
  - 相关性是双向的；因果性是单向的。因果关系会在统计层面导致相关性，但相关性并不蕴含因果性。

### 相关概念
- **unit**: 因果推理中的原子（不可分）研究对象，可以是实物，也可以是概念
- **treatment**: 施加给unit的操作。也叫做干预、介入等
- **variables**(context): unit自带的一些属性。例如，若unit=患者，则variables=性别、病史、血压... 在treatment中不受影响的variable被称为pre-treatment variables
- **confounders**(covariate): 会影响treatment选择和结果的一些变量。例如treatment=用药，confounder=年龄，即同一剂量的药剂在不同年龄段人群导致的结果可能不一样
- **casual effect**: 因果效应。对于unit，若treatment A 的施加与否对其结果状态有影响，则称A构成一个casual effect. 施加对象是个体则构成个体因果效应；施加对象是群体则构成群体因果效应
- **potential outcome**: 施加给unit的treatment所产生的所有结果的取值空间，包含factual outcome(观测结果)和counterfactual outcomes(反事实结果)
- **factual outcome**: 施加给操作对象最终观测到的结果，记为Y
- **counterfactual outcome**: 反事实结果，即不作treatment产生的结果
- **individualized treatment effect**($ITE$): 个体操作效果。 $ITE=Y(1)-Y(0)$。其中$Y(1)$是事实结果，$Y(0)$是反事实结果。二者相减，相当于施加操作后和施加操作前unit状态的差别，即操作treatment所带来的增益。
- **average treatment effect**($ATE$): $ITE$关于unit分布的期望。即$ATE=E(Y(1)-Y(0))$
- **counterfactual inference**: 决类似于“如果这个病人采用其他疗法，血压会降下来吗？”这样的问题的推理。

## 研究方向
- 因果发现：给定若干个变量，发现/挖掘变量间的因果关系，形成因果有向图
- 因果效应：已知变量和变量间的因果关系，求因果关系的效果（原因对结果的影响程度）

## 参考文献
1. [chen-wai-wai-7.因果推断综述及基础方法介绍（一）](https://zhuanlan.zhihu.com/p/258562953)
2. [xue-ruo-7.通俗解释因果推理 casual inference](https://zhuanlan.zhihu.com/p/109996301)
3. [丁鹏.因果推断简介.PKU-MATH-00112230.2019](https://www.math.pku.edu.cn/teachers/yaoy/math112230/lecture10_DingP_causal091101.pdf)

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
            id: document.title,
            distractionFreeMode: false // Facebook-like distraction free mode
        });
        gitalk.render('gitalk-container');
    </script>
</section>