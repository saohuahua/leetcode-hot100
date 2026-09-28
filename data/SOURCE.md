# 官方题单来源

- 来源：[力扣 LeetCode 热题 100](https://leetcode.cn/studyplan/top-100-liked/)
- 实际核对日期：2026-09-28
- 读取方式：Node.js fetch 请求公开页面，HTTP 200，从页面 `__NEXT_DATA__` 提取 `studyPlanV2Detail.planSubGroups`
- 原始数据：[official-page-data.json](official-page-data.json)
- 教材使用的精简清单：[hot100.json](hot100.json)
- 校验结果：17 个分类，100 个题目，100 个唯一题号

本地 PowerShell 与 curl 的 TLS 请求曾失败，随后 Node.js 成功读取官方页面。本记录依赖成功请求得到的实际页面数据，不把失败检索当作核验依据。

题目范围按此日期快照组织。讲解自行概述题意，不复制官方完整题面。第215题的线性时间要求及固定值域、第347题的进阶时间要求，在独立思路审阅时另外读取对应官方题目页核查，并据此调整了主解。
