<template>
  <v-container>
    <v-app-bar app color="#6A76AB" src="../../assets/barBackground.jpg" dark shrink-on-scroll height="60" fade-img-on-scroll
      scroll-target="#scrolling-techniques-3">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>
      <v-col class="text-center" cols="1">
        <strong>TechWave</strong>
      </v-col>
      <v-divider class="mx-4" vertical dark></v-divider>
      <v-tabs align-with-title>
        <v-tab class="mx-2 white--text" to="/news">
          <v-icon left dense> mdi-home </v-icon>
          首页资讯
        </v-tab>
        <v-tab class="mx-2 white--text" to="/forum">
          <v-icon left dense> mdi-facebook-messenger </v-icon>
          交流论坛
        </v-tab>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-tab class="mx-2 white--text" id="myTab" to="/message" v-bind="attrs" v-on="on">
                <v-icon left dense> mdi-message </v-icon>
                我的消息
            </v-tab>
          </template>
          <v-list>
            <v-list-item v-for="item in items" :key="item.title" :to="item.router" link>
              <v-icon left small class="pl-1"> {{ item.icon }} </v-icon>
              <v-list-item-content class="pt-0 pl-2">
                <v-list-item-title>
                  <v-badge color="red" :offset-x="-1" :offset-y="7" :content="item.count" :value="item.count">
                    {{ item.title }}
                  </v-badge>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-tab class="mx-2 white--text" to="/account">
          <v-icon left dense> mdi-account </v-icon>
          个人中心
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