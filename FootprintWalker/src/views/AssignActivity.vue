<template>
    <div style="position:relative;">
        <!-- 顶部的导航栏 -->
        <DefaultBar />
        <v-img src="../assets/background/活动报名天空背景.png" style="width: 100%; height: 100%;">
            <v-container style="position:absolute;top:230px;left:13%;">
                <v-progress-circular v-if="loadingActivity" :size="100" :width="7" color="white" style="margin-left: 47%;"
                    indeterminate></v-progress-circular>
                <v-row>
                    <v-col v-for="(activity, index) in paginatedActivities" :key="activity.id" :cols="12 / cardsPerRow">
                        <assign-card :activity="activity" />
                    </v-col>
                </v-row>
                <v-pagination v-model="currentPage" :length="totalPages" @input="loadPage" />
            </v-container>
        </v-img>
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout"
            style="position:fixed;top:50%;left:5%; height:100px;">
            {{ snackbar.message }}<v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
        </v-snackbar>
        <Footer></Footer>
    </div>
</template>
<script>
import DefaultBar from '@/layouts/default/AppBar.vue'
import AssignCard from '@/components/AssignCard.vue'
import Footer from '@/layouts/default/Foot.vue'
import AssignButton from '@/components/AssignButton.vue'
import axios from "axios";
import { axiosForActivity } from "@/main";
// import DefaultView from '@/layouts/default/View.vue'
export default {
    //导出组件
    components: {
        DefaultBar,
        AssignCard,
        Footer,
        AssignButton,
    },
    data: () => ({
        loadingActivity: true,
        form: false,
        userAccount: null,
        password: null,
        loading: false,
        currentPage: 1, // 当前页码
        cardsPerPage: 6, // 每页显示的卡片数量
        cardsPerRow: 3, // 每行显示的卡片数量
        //报名卡片内容

        activities: [], // 初始化为空数组

        snackbar: {
            show: false,
            message: "",
            color: '',
            timeout: 3000, // Snackbar显示的时间（毫秒）
        },

    }),
    computed: {
        paginatedActivities() {
            const startIndex = (this.currentPage - 1) * this.cardsPerPage;
            const endIndex = startIndex + this.cardsPerPage;
            return this.activities.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.activities.length / this.cardsPerPage);
        },
    },
    mounted() {
        this.fetchActivities();
    },
    methods: {
        fetchActivities() {
            this.loadingActivity = true;
            axiosForActivity.get('/api/activity/activities') // 替换为您的API端点
                .then(response => {
                    console.log(1)
                    console.log(response);
                    // 计算participantIds数组的长度
                    this.activities = response.data.map(activity => ({
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
                        activityStatus: activity.activityStatus, //当前活动状态 
                        currentParticipants:activity.participantIds, //当前报名的人数 
                        // currentParticipants: activity.participantIds, // 当前报名的参与者ID数组
                        participantCount: activity.participantIds ? activity.participantIds.length : 0 // 参与者数量  
                    }));

                    console.log(this.activities);
                    this.activities = this.activities.filter(activity => activity.id !== 9 && activity.activityStatus === 'PUBLISHED');
                    // 按照deadline从晚到早排序
                    this.activities.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
                    this.showSnackbar('加载成功！', '#B9F6CA');
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                    // 可以添加错误处理逻辑
                    this.showSnackbar('加载失败，请重试', 'error');
                }).finally(() => {
                    this.loadingActivity = false;
                })
        },
        loadPage() {
            // 处理页码变化时的逻辑，例如加载对应页的数据
            console.log('Load page:', this.currentPage);
        },
        showSnackbar(message, color) {
            this.snackbar.message = message;
            this.snackbar.color = color;
            this.snackbar.show = true;

            // 可以在一定时间后关闭Snackbar，这里使用setTimeout
            setTimeout(() => {
                this.snackbar.show = false;
            }, this.snackbar.timeout);
        },

    },
}
</script>
<style></style>

