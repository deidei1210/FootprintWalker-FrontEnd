<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    <v-img src="../assets/background/HomeTitle.png" style="position:relative;top:-60px;"></v-img>
    <div style="position:relative;top:-245px;">
        <v-img src="../assets/background/往期回顾.png">
            <!-- 左边是地图 -->
            <div id="allmap"></div>
            <!-- 右边是往期回顾的文字介绍 -->
            <!-- 往期回顾 -->
            <div id="Lookback">
                <v-icon icon="mdi-map-marker" color="red" style="display:inline-block;position:relative;top:-10px;"
                    size="x-large" />
                <div class="text-h5 text-white" style="display:inline-block;" color="white">{{ lookback.title }}</div>
                <div class="text-container">
                    <p class="text-left text-body-1 text-white">{{ lookback.activityInfo }}</p>
                </div>
                <a href="https://mp.weixin.qq.com/s/lOkojvk7TmD2XJC0_9cdkg">更多>></a>
                <v-carousel cycle height="330" hide-delimiter-background show-arrows="hover" :interval="4000"
                    style="margin-top:25px;border-radius: 5px;">
                    <v-carousel-item lazy-src="https://picsum.photos/id/11/100/60" v-for="(image, i) in lookback.adImages"
                        :key="i" :src="image" cover>
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template>

                    </v-carousel-item>
                </v-carousel>
            </div>
        </v-img>
    </div>
    <!-- 活动报名和最近新闻 -->
    <v-row style="position:relative;top:-210px;">
        <!-- 活动报名 -->
        <v-col style="padding:50px;">
            <v-img src="../assets/background/活动报名.png">
                <div class="content">
                    <v-icon icon="mdi-fire" color="red" style="display:inline-block;position:relative;top:-10px;"
                        size="x-large" />
                    <div class="text-h5" style="display:inline-block;">{{ activityData.title }}</div>
                    <div class="text-caption">截止时间：{{ formatDateTime(activityData.registrationEndTime) }}</div>
                    <v-divider class="border-opacity-75"></v-divider>
                    <div class="text-left text-body-1"><span class="text-red">【活动时间】</span>{{
                        formatDateTime(activityData.startTime) }}</div>
                    <div class="text-left text-body-1"><span class="text-red">【活动人数】</span>{{
                        activityData.currentParticipants }}</div>
                    <div class="text-left text-body-1"><span class="text-red">【报名费用】</span>{{ activityData.cost }}</div>
                    <div class="text-left text-body-1"><span class="text-red">【活动校区】</span>{{
                        joinCampuses(activityData.campus) }}</div>
                    <div class="text-left text-body-1"><span class="text-red">【活动简介】</span>{{ truncatedContent }}
                    </div>
                    <div class="text-container" style="margin-top: 10px;">
                        <p class="text-left text-body-1">{{ activityData.description }}</p>
                    </div>
                    <router-link to="/assign-activity">更多>></router-link>

                    <v-img :src="activityData.adImages[0]" lazy-src="https://picsum.photos/id/11/100/60" max-width="50%">
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template>

                    </v-img>
                </div>
            </v-img>
        </v-col>

        <!-- 最近新闻 -->
        <v-col style="padding:50px;">
            <v-img src="../assets/background/最近新闻.png">
                <div class="content">
                    <!-- 显示前三条公告的图片和标题 -->
                    <v-row>
                        <v-col v-for="(announcement, index) in announcements.slice(0, 3)" :key="index">
                            <router-link :to="announcement.link">
                                <v-img :src="announcement.imageUrl" lazy-src="https://picsum.photos/id/11/100/60"
                                    height="160px" cover>
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                                <div>{{ announcement.title.slice(0, 50) }}</div>
                            </router-link>
                        </v-col>
                    </v-row>
                    <!-- 只显示后五条公告的标题 -->
                    <div style="margin:12px 3px 3px 3px;">
                        <div v-for="(announcement, index) in announcements.slice(3, 8)" :key="index"
                            style="display: flex; justify-content: space-between;">
                            <div>
                                <v-btn :to="announcement.link" variant="text" prepend-icon="mdi-circle">
                                    {{ announcement.title.slice(0, 40) }}
                                </v-btn>
                            </div>
                            <!-- 可以添加其他信息，如发布时间等 -->
                            <div>
                                <span style="font-size: 15px;">{{ formatDateTime(announcement.postTime) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </v-img>
        </v-col>

    </v-row>
    <!-- 社团简介 -->

    <div style="position:relative;top:2px;">
        <v-img src="../assets/background/关于我们.png">
            <v-row style="width:60%;position:relative;left:400px;top:270px;">
                <v-col cols="5"> <!-- 修改这里的列数来调整图片所占的宽度 -->
                    <v-img src="../assets/Poster.jpg" height="400px" max-width="280px"></v-img>
                </v-col>
                <v-col cols="7"> <!-- 修改这里的列数来调整文字所占的宽度 -->
                    <div style="position:relative;width:100%;">
                        足迹行者是同济大学的学生社团，致力于组织学生外出旅游和郊游活动。
                        我们提供丰富多样的旅行目的地和活动选择，让同学们能够亲近自然、放松身心，增进友谊和团队合作意识。
                        我们注重安全和组织管理，确保每次活动都能顺利进行。通过参与足迹行者，同学们可以拓宽视野、丰富知识，同时也能享受到旅行的乐趣和美好回忆。
                        欢迎加入我们，一起探索未知的旅程！
                    </div>
                </v-col>
            </v-row>
        </v-img>
    </div>

    <Footer></Footer>
</template>

<script>
import DefaultBar from '@/layouts/default/AppBar.vue'
import Footer from '@/layouts/default/Foot.vue'
import { BaiduMap } from 'vue-baidu-map-3x'
import { formatDateTime, joinCampuses } from '@/tools/Format.js'
import { axiosForActivity, axiosForAnnouncement } from '../main.js';
// import DefaultView from '@/layouts/default/View.vue'
export default {
    //导出组件
    components: {
        DefaultBar,
        Footer
    },
    data: () => ({
        form: false,
        userAccount: null,
        password: null,
        loading: false,
        announcements: [],
        lookback: {},
        eventInfo: {},
        activityData: {
            id: null,
            title: '',
            startTime: null,
            endTime: null,
            registrationStartTime: null,
            registrationEndTime: null,
            campus: ['', ''],
            cost: 0.0,
            location: '',
            activityInfo: '',
            currentParticipants: 0,
            estimatedLimit: 0,
            activityStatus: '',
            leaderIds: [],
            adImages: [],
            feedbackImages: [],
            feedbacks: [],
            organizeDetails: '',
            participantIds: []
        },
        // truncatedContent:"",

    }),
    computed: {
        //截取显示在往期活动的内容
        truncatedContent() {
            // 截取活动内容的前50个字符
            const maxLength = 100;
            return this.activityData.activityInfo.length > maxLength
                ? this.activityData.activityInfo.substring(0, maxLength) + '...'
                : this.activityData.activityInfo;
        },
    },
    mounted() {
        const scripts = document.querySelectorAll('script[src="./src/snow.js"]')
        this.getLookbackData();
        this.getActivityData();
        this.getAnnouncementsData();

        scripts.forEach(script => {
            script.parentNode.removeChild(script)
        })
        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        var map = new BMapGL.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(119.404, 30.915), 7);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        var points = [
            new BMapGL.Point(121.434, 31.225),  //愚园路
            new BMapGL.Point(117.944, 29.931),  //皖南之行
            new BMapGL.Point(119.562, 29.945), //纪龙山
            new BMapGL.Point(121.866, 31.332), //横沙岛
            // 这里可以继续添加更多的点坐标
        ];

        for (var i = 0; i < points.length; i++) {
            var marker = new BMapGL.Marker(points[i]);
            marker.addEventListener("click", function () {
                alert("您点击了标注");
            });
            map.addOverlay(marker);
        }

    },
    methods: {
        formatDateTime,
        joinCampuses,
        getLookbackData() {
            axiosForActivity.get('/api/activity/activities/latest-retrospective').then(response => {
                console.log('Response from retrospective:', response.data);
                this.lookback = response.data;

            });

        },
        getActivityData() {
            axiosForActivity.get('/api/activity/activities/latest').then(response => {
                console.log('Response from Service B:', response.data);
                this.activityData = response.data;
            });
            // this.activityData.activityInfo=truncatedContent();
        },
        getAnnouncementsData() {
            axiosForAnnouncement.get('/api/announcements/recent').then(response => {
                console.log('Response from Announcement:', response.data);
                this.announcements = response.data;

            });
        },
    }
}

</script>

<style>
#allmap {
    display: inline-block;
    position: relative;
    top: 230px;
    left: 50px;
    height: 530px;
    width: 50%;
    border-radius: 6px;
}

#Lookback {
    display: inline-block;
    position: absolute;
    top: 230px;
    left: 55%;
    height: 530px;
    width: 42%;
}

.text-container {
    position: relative;
    max-height: 6em;
    /* 设置最大高度为6行 */
    overflow: hidden;
}

.text-container::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    /* height: 1.2em; 添加一个遮罩层，以便显示省略号 */
    /* background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); */
}

.content {
    margin: 123px 30px 3px 30px;
}
</style>
