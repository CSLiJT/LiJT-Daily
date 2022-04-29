---
title: 因果推断学习笔记.4
mathjax: true
codeblock:
  enable: true
  show_result: true
date: 2022-04-27 22:41:22
tags: 因果推断
categories: 学习笔记
---
本篇主要记录 A Survey of Learning Causality with Data: Problems and Methods 的调研记录。这是一篇机器学习研究者视角下的因果推断研究综述。

<!--more-->

## 因果推断的两大研究方向
1. 因果推理（causal inference）：研究指定变量对另一变量的影响程度=已知因果关系，求关系强度
2. 因果发现（causal discovery）：研究哪些变量会对指定变量产生影响=不知因果关系，求因果关系

## 用于因果推断的数据形式
- 干预型数据：至少一个变量是通过（人为）干预设定的
- **观测型数据**：任何变量都是依靠因果关系中的“因”确定的

例如，为了调查顾客对餐厅满意度的影响因素，可以使用现有的点评记录数据（观测型数据）或通过进行某些处理/干预来收集不同条件下的点评记录数据（干预型）。一般观测型数据比干预型数据更加容易获得。

### 用于因果推理的数据
共有3种形式：
1. 标准数据集：$(\mathbf{X},\mathbf{t},\mathbf{y})$
   - $\mathbf{X}$: 样本特征矩阵
   - $\mathbf{t}$: 样本处理向量。第$i$个分量标记样本$i$被处理（值为1）或未处理（值为0）
   - $\mathbf{y}$: 样本结果向量。第$i$个分量标记样本处理/未处理后的状态
2. 标记不同数据单元间相互连结关系的辅助信息（用矩阵$\mathbf{A}$表示）
   - 例如时间序列、时序点过程（由不同时间点的随机事件组成的随机过程）、属性网络
   - 不直接显示目标变量间的因果关系，但不同数据单元间的联系间接蕴含了因果关系
3. 包含未观测的干扰因素（unobserved confounders）的数据
   - 辅助变量（instrumental variable）
   - 中介变量（mediator）
   - running variable （暂不理解，待补充）

### 用于因果发现的数据
1. 多元数据$\mathbf{X}$+标准因果图$G$，其中$G$用于因果发现模型的评测
   - $G$源于先验知识，有可能是不完善(incomplete)的。
2. 多元时间序列数据+标准因果图$G$

## 因果推断的基本框架
待补充

## 参考文献
1. [Guo, Ruocheng & Cheng, Lu & Li, Jundong & Hahn, Paul & Liu, Huan. (2018). A Survey of Learning Causality with Data: Problems and Methods.](https://rguo12.github.io/causal_survey.pdf)

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