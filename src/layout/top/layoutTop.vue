<template>
  <div class="tops">
    <router-link class="item" to="/home">
      首页
    </router-link>
    <router-link class="item" to="/setting">
      设置
    </router-link>
    <div class="item">样式</div>
    <div class="item"></div>
  </div>
</template>

<style lang="scss" scoped>
.tops {
  background-color: rgba(238, 147, 193, 0.5);
  display: flex;
  width: 100%;
  height: 40px;

  .item {
    /* router-link渲染成a标签，需要block占满整个flex格子 */
    display: block;
    flex: 1;
    text-align: center;
    line-height: 40px;
    color: inherit;
    text-decoration: none;
    /* 清除a标签下划线 */
  }

  .item:hover {
    background-color: rgba(255, 105, 180, 0.5);
    color: white;
  }

  .item:not(:last-child) {
    border-right: 1px solid rgba(255, 105, 180);
  }
}
</style>