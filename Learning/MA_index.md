---
layout: default
---
<head>
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            inlineMath: [['$','$']]
            } 
        });
    </script>
</head>

# 多元统计分析-学习记录

## 2020-11-21

问题1：已知协方差矩阵 $S$:

$$
S = \left[
\begin{matrix}
1 & \rho & \rho & \ldots & \rho\\
\rho & 1 & \rho & \ldots & \rho\\
\vdots & \vdots &  \vdots & &\vdots\\
\rho & \rho & \rho & \ldots & 1\\
\end{matrix}
\right]
$$

求 $S$ 的特征根和特征向量。