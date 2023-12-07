<template>
  <v-container>
    <v-app-bar app color="#6A76AB" scroll-behavior="fade-image" image="https://picsum.photos/1920/1080?random" dark
      shrink-on-scroll height="60" scroll-target="#scrolling-techniques-3">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>
      <!-- 左上角的标题 -->
      <v-col class="text-center" cols="1">
        <strong>Footprint Walker</strong>
      </v-col>
      <!-- 一个竖直的分割线 -->
      <v-divider class="mx-4" vertical dark></v-divider>
      <!-- 页面选项 -->
      <v-tabs align-with-title>
        <!-- 前往首页 -->
        <v-tab class="mx-2 white--text" to="/home-page">
          <v-icon left dense> mdi-home </v-icon>
          首页资讯
        </v-tab>
        <v-tab class="mx-2 white--text" to="/about-us">
          <v-icon left dense> mdi-facebook-messenger </v-icon>
          关于我们
        </v-tab>
        <v-tab class="mx-2 white--text" to="/assign-activity">
          <v-icon left dense> mdi-party-popper </v-icon>
          活动报名
        </v-tab>
        <v-tab class="mx-2 white--text" to="/feedback">
          <v-icon left dense> mdi-pen </v-icon>
          反馈中心
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer> <!-- 这个会占据剩余的空间，将按钮推到最右边 -->
      <!-- 转换到个人中心 -->
      <v-btn icon  to="/personal-center">
        <v-icon>mdi-account</v-icon>
        <v-tooltip activator="parent" location="bottom">个人中心</v-tooltip>
      </v-btn>
      <!-- 退出登录 -->
      <v-btn icon to="/">
        <v-icon>mdi-location-exit</v-icon>
        <v-tooltip activator="parent" location="bottom">退出登录</v-tooltip>
      </v-btn>
    </v-app-bar>
    <router-view />
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      showInfo: false
    };
  }
}

</script>
<style scoped>
.v-tab {
  width: 155px !important;
}

.hovered {
  /* 自定义悬浮样式 */
  background-color: #ffcc00;
  color: #ffffff;
}
</style>