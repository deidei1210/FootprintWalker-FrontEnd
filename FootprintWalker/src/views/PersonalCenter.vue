<template>
    <!-- 顶部的导航栏 -->
    <div style="position: relative;">
        <img src="../assets/个人中心背景.png" style="position:absolute; top:0px; width: 100%; z-index: 1;" alt="">
        <!-- 顶部的导航栏 -->
        <DefaultBar style="position: fixed; top: 0; left: 0; z-index: 5;" />
        <div style="position:relative;height: 100vh; overflow-y: auto;">
            <!-- 个人信息页面的内容 -->
            <v-card
                style="position:absolute;margin-left:15%;margin-right:15%;width:70%;margin-top:150px;margin-bottom:5%;z-index: 3;">
                <v-card-title>个人信息</v-card-title>
                <v-card-subtitle>{{ personalInfo.name }}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <!-- 放置头像 -->
                        <v-col><v-avatar image="https://randomuser.me/api/portraits/women/85.jpg" size="200"
                                style="margin-left: 15%;"></v-avatar></v-col>
                        <!-- 显示用户的信息 -->
                        <v-col cols="5">
                            <v-list disabled>
                                <v-list-subheader class="text-h6">基本信息</v-list-subheader>

                                <v-list-item class="text-body-1" prepend-icon="mdi-account">姓名：{{
                                    personalInfo.name }}</v-list-item>
                                <v-list-item class="text-body-1" prepend-icon="mdi-human-male">性别：{{
                                    personalInfo.gender }}</v-list-item>
                                <v-list-item class="text-body-1" prepend-icon="mdi-email">邮箱：{{
                                    personalInfo.email }}</v-list-item>
                                <v-list-item class="text-body-1" prepend-icon="mdi-phone">电话：{{
                                    personalInfo.phoneNumber }}</v-list-item>

                            </v-list>
                        </v-col>
                        <v-col>
                            <v-list-subheader class="text-h6"></v-list-subheader>
                            <v-list disabled>
                                <v-list-item class="text-body-1" prepend-icon="mdi-school">校区：{{
                                    personalInfo.campus }}</v-list-item>
                                <v-list-item class="text-body-1" prepend-icon="mdi-home">学院：{{
                                    personalInfo.institute }}</v-list-item>
                                <v-list-item class="text-body-1" prepend-icon="mdi-pen">专业：{{
                                    personalInfo.major }}</v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card-text>

            </v-card>

            <v-container color="white" style="position:absolute;margin-left:6%;width:100%;margin-top:300px;margin-bottom:5%;z-index: 4;">
                <v-card class="pa-7" style="position:absolute;top:230px;left:13%;width:97%;">
                    <v-card-title>已报名的活动</v-card-title>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col v-for="(activity, index) in paginatedActivities" :key="activity.id" :cols="12 / cardsPerRow">
                            <assign-card :activity="activity" />
                        </v-col>
                    </v-row>
                    <v-pagination v-model="currentPage" :length="totalPages" @input="loadPage" />
                </v-card>

            </v-container>

        </div>

    </div>
    <!-- Footer 元素 -->
    <Footer style="position: absolute;bottom: -20%; width: 100%; z-index: 1;">
    </Footer>
</template>
  
<script>
import DefaultBar from '@/layouts/default/AppBar.vue'
import Footer from '@/layouts/default/Foot.vue'
import { axiosForActivity } from "@/main";
import AssignCard from '@/components/AssignCard.vue'
import axios from 'axios';

// import DefaultView from '@/layouts/default/View.vue'
export default {
   
    //导出组件
    components: {
        DefaultBar,
        Footer,
        AssignCard,
    },
    data: () => ({
        form: false,
        userId: 1,
        password: null,
        loading: false,
        currentOption: 'userInfo', // 默认选项为个人信息
        personalInfo: {
            name: "deidei",           //用户姓名
            gender: "女",         //用户性别
            email: "2051498@tongji.edu.cn",          //用户邮箱
            phoneNumber: "15961672163",    //用户电话号码
            campus: "嘉定",         //用户校区
            institute: "软件学院",      //用户学院
            major: "软件工程",          //用户专业
        },
        activities: [], // 初始化为空数组
        currentPage: 1, // 当前页码
        cardsPerPage: 6, // 每页显示的卡片数量
        cardsPerRow: 3, // 每行显示的卡片数量


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
        this.fetchPersonalInfo();
    },
    methods: {
        setCurrentOption(option) {
            this.currentOption = option;
        },
        //获取用户报名的所有活动
        fetchActivities() {
            axiosForActivity.get('/api/activity/activities') // 替换为您的API端点
                .then(response => {
                    console.log(response);
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
                        currentParticipants: activity.currentParticipants, //当前活动的报名人数      

                    }));
                    this.activities = this.activities.filter(activity => activity.id !== 9);
                    // 按照deadline从晚到早排序
                    this.activities.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                    // 可以添加错误处理逻辑
                });
        },
        loadPage() {
            // 处理页码变化时的逻辑，例如加载对应页的数据
            console.log('Load page:', this.currentPage);
        },

        //获取用户的基本信息
        fetchPersonalInfo(){
            axios.get(`api/human_management/members/${this.userId}`)
            .then(response => {
              console.log('Login successful', response);
              this.personalInfo.name=response.data.name;
              this.personalInfo.gender=response.data.gender;
              this.personalInfo.email=response.data.email;
              this.personalInfo.phoneNumber=response.data.phoneNumber;
              this.personalInfo.campus=response.data.campus;
              this.personalInfo.institute=response.data.institute;
              this.personalInfo.major=response.data.major;
              
            })
            .catch(error => {
              console.error('Login failed', error);
              // 登录失败后的操作
            })
            .finally(() => {
              this.loading = false;
            });
        }

    },
}



</script>
  