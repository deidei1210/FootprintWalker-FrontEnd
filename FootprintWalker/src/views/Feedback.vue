<template>
    <!-- 子绝父相 -->
    <div style="position: relative;">
        <!-- 顶部的导航栏 -->
        <DefaultBar style="position: fixed; top: 0; left: 0; z-index: 5;" />
        <!-- 图片元素 -->
        <img src="../assets/反馈中心背景.png" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 1;" alt="">
        <v-card style="position:absolute;left:15%;top:200px;z-index: 4;width:70%;">
            <v-tabs v-model="tab" bg-color="#4A4A4A">
                <v-tab value="one">活动反馈</v-tab>
                <v-tab value="two">社团反馈</v-tab>
                <v-tab value="three">我的反馈</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <!-- 活动反馈 -->
                    <v-window-item value="one">
                        <!-- 活动反馈内容 -->
                        <v-container class="feedback-container">
                            <v-row>
                                <v-col v-for="activity in paginatedActivities" :key="activity.id" :cols="12 / cardsPerRow">
                                    <v-card>
                                        <v-card-title>{{ activity.name }}</v-card-title>
                                        <v-card-subtitle>{{ activity.date }}</v-card-subtitle>
                                        <!-- 其他活动信息显示 -->
                                        <v-card-actions>
                                            <v-btn @click="showFeedbackDialog(activity)">查看反馈</v-btn>
                                            <v-btn @click="showFeedbackForm(activity)">我要反馈</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="two">
                        <!-- 社团反馈内容 -->
                        <v-container class="feedback-container">
                            <v-textarea v-model="feedback" label="我对社团的反馈......" variant="outlined" rows="20"
                                prepend-icon="mdi-comment"></v-textarea>
                        </v-container>
                        <div class="d-flex flex-row-reverse mb-6">
                            <!-- 提交按钮 -->
                            <v-btn class="ma-2 pa-2" @click="submitFeedback" color="#4A4A4A" size="x-large">提交</v-btn>
                        </div>
                    </v-window-item>

                    <v-window-item value="three">
                        <!-- 我的反馈内容 -->
                        <v-container class="feedback-container">

                        </v-container>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>


    </div>
    <!-- Footer 元素 -->
    <Footer style="position: absolute; bottom: -400px; left: 0; width: 100%; z-index: 1;">
    </Footer>
</template>
  
  
<script>
import DefaultBar from '@/layouts/default/AppBar.vue'
import Footer from '@/layouts/default/Foot.vue'
// import DefaultView from '@/layouts/default/View.vue'
export default {
    //导出组件
    components: {
        DefaultBar,
        Footer,
    },

    data: () => ({
        tab: null,
        form: false,
        userAccount: null,
        password: null,
        loading: false,

        paginatedActivities: [
            {
                id: "1",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "2",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "3",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "4",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "5",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "6",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "7",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "8",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "9",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "10",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "11",
                name: "安徽之行",
                date: "2023-10-05"
            },
            {
                id: "12",
                name: "安徽之行",
                date: "2023-10-05"
            },
        ], // 从服务器获取的活动数据，根据分页显示
        currentPage: 1,
        cardsPerRow: 1,
        totalPages: 0,

        feedback: "",
    }),

    //   computed: {
    //       paginatedArticles() {
    //           // 根据当前页码和每页显示的数量计算出当前页需要显示的文章
    //           const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    //           const endIndex = startIndex + this.articlesPerPage;
    //           return this.articles.slice(startIndex, endIndex);
    //       },
    //       totalPages() {
    //           // 计算总页数
    //           return Math.ceil(this.articles.length / this.articlesPerPage);
    //       },
    //   },

    mounted() {
        // 页面加载时加载第一页的活动数据
        this.loadPage(1);
    },

    methods: {
        loadPage(page) {
            // 根据页码加载对应的活动数据
            // 这里需要从服务器获取数据，然后更新 paginatedActivities、totalPages 等数据
        },
        showFeedbackDialog(activity) {
            // 显示查看反馈的弹窗，根据 activity.id 获取反馈数据
            // 你可以使用 Vuetify 的 Dialog 组件来实现弹窗
        },
        showFeedbackForm(activity) {
            // 显示我要反馈的弹窗，可以使用 Vuetify 的 Dialog 组件
            // 在弹窗中提供一个文本输入框，用户输入反馈内容
        },
        submitFeedback() {
            // 在这里处理提交逻辑，例如打印 feedback 中的内容
            console.log('用户反馈内容：', this.feedback);
            this.feedback="";
        },
    }
};
</script>

<style scoped>
.feedback-container {
    height: 600px;
    /* 设置最大高度 */
    overflow-y: auto;
    /* 添加垂直滚动条 */
}
</style>