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
          <v-icon left dense> mdi-message </v-icon>
          活动报名
        </v-tab>
        <v-tab class="mx-2 white--text" to="/feedback">
          <v-icon left dense> mdi-account </v-icon>
          反馈中心
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <router-view />
  </v-container>
</template>
<script>
export default {
  name: "HeaderBar",
  computed: {
    items() {
      return [
        {
          title: "我的消息",
          icon: "mdi-message",
          router: "/message/my-message",
          count: this.$store.getters.listCount,
          type: "message"
        },
        {
          title: "系统通知",
          icon: "mdi-bell",
          router: "/message/system-notification",
          count: this.$store.getters.notificationCount,
          type: "system"
        },
        {
          title: "收到的赞",
          icon: "mdi-thumb-up",
          router: "/message/received-like",
          count: this.$store.getters.likeCount,
          type: "like"
        },
        {
          title: "回复我的",
          icon: "mdi-reply",
          router: "/message/reply-me",
          count: this.$store.getters.replyCount,
          type: "reply"
        },
      ];
    },
  },
}

</script>
<style scoped>
.v-tab {
  width: 155px !important;
}
</style>