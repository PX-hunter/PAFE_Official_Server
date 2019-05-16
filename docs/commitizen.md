## **[Commitizen](https://github.com/commitizen/cz-cli)** - 规范commit格式

### Usage 

```bansh
npm install -g commitizen
cd YOURFOLDERNAME
commitizen init cz-conventional-changelog --save --save-exact
<!-- 提交 commit 由 git commit 变为 git cz -->
git cz
```
#### commit形式为选择+描述
```bash
? Select the type of change that you're committing: (Use arrow keys)
? feat:     A new feature 
  fix:      A bug fix 
  docs:     Documentation only changes 
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
  refactor: A code change that neither fixes a bug nor adds a feature 
  perf:     A code change that improves performance 
  test:     Adding missing tests or correcting existing tests
```
#### 简介

commitizen分为Type，Scoped，Subject，Body，Footer五部分，约定Body为选填，其余部分为必填

1. Type：选择提交类型
- feat：添加新功能（feature）
- fix：修补bug
- docs：文档，注释改动
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- perf：代码优化
- test：增加测试
- chore：构建过程或辅助工具的变动

2. Scoped：说明本次 commit 影响范围
- all：影响全局
- part：影响局部

3. Subject：简述本次改动
  - 如 add user interface

4. Body：对 Subject 做详尽描述

5. Footer：针对不兼容变更和 Issue 关闭

### 详细介绍见文档 **[Commitizen doc](https://github.com/commitizen/cz-cli)**


