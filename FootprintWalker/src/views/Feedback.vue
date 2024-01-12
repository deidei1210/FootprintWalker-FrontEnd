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
                                <v-col v-for="activity in allActivities" :key="activity.id" :cols="12 / cardsPerRow">
                                    <v-card>
                                        <v-card-title>{{ activity.title }}</v-card-title>
                                        <v-card-subtitle>{{ formatDateTime(activity.startTime) }}</v-card-subtitle>
                                        <!-- 其他活动信息显示 -->
                                        <v-card-actions>
                                            <!-- 查看每个活动的反馈情况 -->
                                            <dialog-button :button="button1" :activity="activity"></dialog-button>
                                            <!-- 用户对指定的活动提出反馈 -->
                                            <feedback-button :button="button2" :activity="activity"></feedback-button>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>
                   
                   <!-- 进行反馈 -->
                    <v-window-item value="two">
                        <v-row style="margin-left:40px;margin-top:20px;">
                            <div class="text-h7" style="margin-top:5px;">我的评分：</div>
                            <v-rating v-model="clubRating" hover :length="5" :size="32" color="amber"
                                active-color="amber" />
                            <div class="text-grey ms-4 text-caption" style="position:relative;margin-top:8px;">
                                {{ clubRating }}
                            </div>
                        </v-row>
                        <!-- 社团反馈内容 -->
                        <v-container class="feedback-container">
                            <v-textarea v-model="feedbackTitle" prepend-icon="mdi-pen" label="标题" variant="outlined"
                                rows="1" cols="10"></v-textarea>
                            <v-textarea v-model="feedback" label="我对社团的反馈......" variant="outlined" rows="18"
                                prepend-icon="mdi-comment"></v-textarea>
                        </v-container>
                        <div class="d-flex flex-row-reverse mb-6">
                            <!-- 提交按钮 -->
                            <v-btn class="ma-2 pa-2" @click="submitFeedback" color="#4A4A4A" size="x-large">提交</v-btn>
                        </div>
                    </v-window-item>
                    
                    <!-- 查看我的反馈处理进度 -->
                    <v-window-item value="three">
                        <!-- 我的反馈内容 -->
                        <v-container class="feedback-container">
                            <v-row>
                                <v-col v-for="feedback in myFeedback" :key="feedback.id" :cols="12 / cardsPerRow">
                                    <v-card>
                                        <v-row style="margin-top:6px;margin-left:1px;">
                                            <v-card-title>{{ feedback.title }}</v-card-title>
                                            <v-chip color="green" size="small" style="margin-top:10px;"
                                                v-if="feedback.status">已处理</v-chip>
                                            <v-chip color="red" size="small" style="margin-top:10px;" v-else>未处理</v-chip>
                                        </v-row>
                                        <v-card-subtitle>{{ formatDateTime(feedback.date) }}</v-card-subtitle>
                                        <!-- 其他活动信息显示 -->
                                        <v-card-actions>
                                            <show-reply-button :my-feedback="feedback"></show-reply-button>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
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
import DialogButton from '@/components/DialogButton.vue'
import FeedbackButton from '@/components/FeedbackButton.vue'
import ShowReplyButton from '@/components/ShowReplyButton.vue'
import { axiosForActivity } from "@/main";
import { formatDateTime } from "@/tools/Format.js";
// import DefaultView from '@/layouts/default/View.vue'
export default {
    //导出组件
    components: {
        DefaultBar,
        Footer,
        DialogButton,
        FeedbackButton,
        ShowReplyButton,
    },

    data: () => ({
        tab: null,
        form: false,
        userId: 1,
        password: null,
        loading: false,
        currentDate: new Date(),
        allActivities: [], // 从服务器获取的活动数据，根据分页显示

        button1: "查看反馈",
        button2: "我要评价",
        currentPage: 1,
        cardsPerRow: 1,
        totalPages: 0,

        //我输入的反馈内容
        feedback: "",
        feedbackTitle: "",

        //我的反馈
        myFeedback: [],
        clubRating: 3,

        //是否打开弹窗
        activityFeedbackDialog: false,
    }),
    mounted() {
        //获取活动的数据
        this.fetchActivities();
        //获取该用户本身的反馈数据
        this.fetchFeedbackByUserId();
    },

    methods: {
        formatDateTime,
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        //提交社团反馈
        submitFeedback() {
            // 在这里处理提交逻辑，例如打印 feedback 中的内容
            console.log('用户反馈内容：', this.feedback);
            const feedbackData = {
                feedbackType: "SUGGESTION",
                feedbackTime: this.currentDate,
                feedbackContent: this.feedback,
                feedbackStatus: "PENDING",
                activityId: 9,     //如果是社团反馈的内容，那么活动id默认是9
                title: this.feedbackTitle,
                rating: this.clubRating,
                userId: this.userId,
                feedbackImages: ["string"]
            };
            console.log(feedbackData)
            axiosForActivity.post('/api/activity/feedbacks', feedbackData)
                .then(response => {
                    console.log('Feedback created successfully:', response.data);
                    // 在这里处理反馈创建成功的逻辑
                    this.feedback = "";
                })
                .catch(error => {
                    console.error('Error creating feedback:', error);
                    // 在这里处理反馈创建失败的逻辑
                });

        },
        //获取当前活动
        fetchActivities() {
            axiosForActivity.get('/api/activity/activities') // 替换为您的API端点
                .then(response => {
                    console.log(response);
                    this.allActivities = response.data.map(activity => ({
                        id: activity.id,
                        title: activity.title, // 假设 'activityInfo' 字段包含活动标题
                        deadline: activity.registrationEndTime, // 假设这已经是一个格式化好的字符串
                        startTime: activity.startTime,
                        endTime: activity.endTime,
                        location: activity.location,
                        content: activity.activityInfo, // 假设 'organizeDetails' 字段包含活动内容
                        image: activity.adImages?.[0] || 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', // 使用第一张广告图片或默认图片
                        limited: activity.estimatedLimit, //活动限制的报名人数
                        cost: activity.cost,             //活动报名的费用
                        adImages: activity.adImages,
                        currentParticipants: activity.currentParticipants, //当前活动的报名人数      

                    }));
                    // 删除 id 为 9 的那一项
                    this.allActivities = this.allActivities.filter(activity => activity.id !== 9);
                    // 按照开始时间从晚到早排序
                    this.allActivities.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                    // 可以添加错误处理逻辑
                });
        },
        //获取当前用户的所有反馈内容
        fetchFeedbackByUserId() {
            axiosForActivity.get(`/api/activity/feedbacks/user/${this.userId}`) // 替换为您的API端点
                .then(response => {
                    console.log(response);
                    this.myFeedback = response.data.map(myfeedback => ({
                        id: myfeedback.id,
                        title: myfeedback.title, 
                        rating: myfeedback.rating, // 假设这已经是一个格式化好的字符串
                        content: myfeedback.feedbackContent, // 假设 'organizeDetails' 字段包含活动内容
                        status: myfeedback.feedbackStatus=="PROCESSED",
                        date: myfeedback.feedbackTime, //当前活动的报名人数      
                    }));
                    // 按照开始时间从晚到早排序
                    this.myFeedback.sort((a, b) => new Date(b.date) - new Date(a.date));
                    console.log(this.myFeedback)
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                    // 可以添加错误处理逻辑
                });
        }
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

.v-dialog {
    background: #d1d1d11a;
}
</style>