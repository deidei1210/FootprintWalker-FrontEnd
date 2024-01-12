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
                <v-card-title>个人信息 <v-btn prepend-icon="mdi-pen" variant="plain" @click="dialogEdit = true">
                        编辑
                    </v-btn></v-card-title>
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
                                <v-list-item class="text-body-1" prepend-icon="mdi-pen">年级：{{
                                    personalInfo.level }}</v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card-text>

            </v-card>

            <!-- 活动报名信息 -->
            <v-container color="white"
                style="position:absolute;margin-left:6%;width:100%;margin-top:300px;margin-bottom:5%;z-index: 4;">
                <v-card class="pa-7" style="position:absolute;top:230px;left:13%;width:97%;">
                    <v-card-title>已报名的活动</v-card-title>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col v-for="(activity, index) in activities" :key="activity.id" :cols="12 / cardsPerRow">
                            <assign-card :activity="activity" />
                        </v-col>
                    </v-row>
                    <v-pagination v-model="currentPage" :length="totalPages" @input="loadPage" />
                </v-card>

            </v-container>
        </div>
    </div>

    <!-- 修改个人信息 -->
    <v-dialog v-model="dialogEdit" persistent width="1024">
        <v-card>
            <v-card-title>
                <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <!-- 修改姓名 -->
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="personalInfo.name" label="姓名" required></v-text-field>
                        </v-col>
                        <!-- 修改性别 -->
                        <v-col cols="12" sm="6" md="6">
                            <p class="ml-2">性别:</p>
                            <v-radio-group v-model="personalInfo.gender" inline>
                                <v-radio label="MALE" value="MALE" color="deep-purple-lighten-2"></v-radio>
                                <v-radio label="FEMALE" value="FEMALE" color="deep-purple-lighten-2"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <!-- 修改邮箱 -->
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="personalInfo.email" label="邮箱" required></v-text-field>
                        </v-col>
                        <!-- 修改电话号码 -->
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="personalInfo.phoneNumber" label="电话号码" required></v-text-field>
                        </v-col>
                        <!-- 修改校区 -->
                        <v-col cols="12" sm="4" md="4">
                            <v-select v-model="personalInfo.campus" :items="['四平路校区', '嘉定校区', '沪北校区', '沪西校区']" label="选择校区"
                                required></v-select>
                        </v-col>
                        <!-- 修改学院 -->
                        <v-col cols="12" sm="4" md="4">
                            <v-select v-model="personalInfo.institute" :items="instituteList" label="选择学院"
                                required></v-select>
                        </v-col>
                        <!-- 修改年纪 -->
                        <v-col cols="12" sm="4" md="4">
                            <v-select v-model="personalInfo.level" :items="gradeList" label="选择年级" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="personalInfo.major" label="专业" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-accent-2 mr-5" variant="outlined" @click="cancelEdit">
                    关 闭
                </v-btn>
                <v-btn color="deep-purple-lighten-2" variant="outlined" @click="saveEdit" :loading="saveLoading">
                    保 存
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout"
        style="position:fixed;top:50%;left:5%; height:100px;">
        {{ snackbar.message }}<v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
    </v-snackbar>

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
        saveLoading: false,

        form: false,
        userId: 1,
        password: null,
        loading: false,
        currentOption: 'userInfo', // 默认选项为个人信息
        personalInfo: {
            name: "",           //用户姓名
            gender: "",         //用户性别
            email: "",          //用户邮箱
            phoneNumber: "",    //用户电话号码
            campus: "",         //用户校区
            institute: "",      //用户学院
            major: "",          //用户专业
            password: "",
            level: "",
        },
        activities: [], // 初始化为空数组
        currentPage: 1, // 当前页码
        cardsPerPage: 6, // 每页显示的卡片数量
        cardsPerRow: 3, // 每行显示的卡片数量
        dialogEdit: false,
        instituteList: ['机械与能源学院', '生命科学与技术学院', '铁道与城市轨道交通研究院', '物理科学与工程学院', '建筑与城市规划学院', '汽车学院', '数学科学学院', '土木工程学院', '海洋与地球科学学院', '设计创意学院', '医学院', '新生院', '电子信息与工程学院', '法学院', '人文学院', '外国语学院', '环境科学与工程学院', '体育教学部', '艺术与传媒学院', '经济与管理学院', '马克思主义学院', '政治与国际关系学院', '中德工程学院', '测绘与地理信息学院', '航空航天与力学学院', '软件学院', '中德学院', '材料科学与工程学院', '化学科学与工程学院', '交通运输工程学院', '口腔医学院', '上海国际知识产权学院', '同济大学附属医院', '校医院'],
        gradeList: ['大一', '大二', '大三', '大四', '大五', '研一', '研二', '研三', '博士生及以上'],

        //关于弹窗的基本信息
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
        this.fetchPersonalInfo();
    },
    methods: {
        setCurrentOption(option) {
            this.currentOption = option;
        },
        //获取用户报名的所有活动
        fetchActivities() {
            const requestBody = {
                "page": 0,
                "size": 2000,
                "sort": [
                ]
            }
            axiosForActivity.get(`/api/activity/activities/participant/${this.userId}`, requestBody) // 替换为您的API端点
                .then(response => {
                    console.log(response);
                    this.activities = response.data.content.map(activity => ({
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
                    }));
                    console.log("用户报名的活动：", this.activities)
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

        //保存对个人信息的更改
        saveEdit() {
            this.saveLoading = true;
            //调用put更改数据库中的内容
            const requestBody = {
                "gender": this.personalInfo.gender,
                "name": this.personalInfo.name,
                "level": this.mapGradeToLevelCTE(this.personalInfo.level),
                "campus": this.mapCampusToEnumCTE(this.personalInfo.campus),
                "email": this.personalInfo.email,
                "phoneNumber": this.personalInfo.phoneNumber,
                "password": this.personalInfo.password,
                "institute": this.mapCollegeToInstituteCTE(this.personalInfo.institute),
                "major": this.personalInfo.major
            }
            axios.put(`/api/human_management/members/${this.userId}`, requestBody)
                .then(response => {
                    console.log('修改个人信息成功！', response);

                    window.location.reload(); // 强制刷新页面
                })
                .catch(error => {
                    console.error('Login failed', error);
                    // 登录失败后的操作
                    window.location.reload(); // 强制刷新页面
                })
                .finally(() => {
                    this.dialogEdit = false;
                    this.saveLoading = false;
                });
        },
        //取消对个人信息的更改
        cancelEdit() {
            this.dialogEdit = false;
            window.location.reload(); // 强制刷新页面

        },

        // 将中文转换成对应的英文
        mapGradeToLevelCTE(grade) {
            const gradeMap = {
                '大一': 'U1',
                '大二': 'U2',
                '大三': 'U3',
                '大四': 'U4',
                '大五': 'U5',
                '研一': 'P1',
                '研二': 'P2',
                '研三': 'P3',
                '博士生及以上': 'D_plus'
            };
            return gradeMap[grade] || null; // 返回对应的枚举值或者null
        },
        mapCampusToEnumCTE(campus) {
            const campusMap = {
                '四平路校区': 'SIPING',
                '嘉定校区': 'JIADING',
                '沪北校区': 'HUBEI',
                '沪西校区': 'HUXI'
            };
            return campusMap[campus] || null; // 返回对应的枚举值或者null
        },
        mapCollegeToInstituteCTE(college) {
            const collegeMap = {
                '机械与能源学院': 'MECHANICAL_AND_ENERGY_ENGINEERING',
                '生命科学与技术学院': 'LIFE_SCIENCES_AND_TECHNOLOGY',
                '铁道与城市轨道交通研究院': 'RAIL_TRANSIT_RESEARCH_INSTITUTE',
                '物理科学与工程学院': 'PHYSICAL_SCIENCE_AND_ENGINEERING',
                '建筑与城市规划学院': 'ARCHITECTURE_AND_URBAN_PLANNING',
                '汽车学院': 'AUTOMOTIVE_COLLEGE',
                '数学科学学院': 'MATHEMATICAL_SCIENCES',
                '土木工程学院': 'CIVIL_ENGINEERING',
                '海洋与地球科学学院': 'MARINE_AND_EARTH_SCIENCES',
                '设计创意学院': 'DESIGN_AND_CREATIVE_COLLEGE',
                '医学院': 'MEDICAL_COLLEGE',
                '新生院': 'FRESHMAN_COLLEGE',
                '电子信息与工程学院': 'ELECTRONIC_INFORMATION_ENGINEERING',
                '法学院': 'LAW_SCHOOL',
                '人文学院': 'COLLEGE_OF_HUMANITIES',
                '外国语学院': 'SCHOOL_OF_FOREIGN_LANGUAGES',
                '环境科学与工程学院': 'ENVIRONMENTAL_SCIENCE_AND_ENGINEERING',
                '体育教学部': 'PHYSICAL_EDUCATION_DEPARTMENT',
                '艺术与传媒学院': 'ART_AND_MEDIA_COLLEGE',
                '经济与管理学院': 'ECONOMICS_AND_MANAGEMENT',
                '马克思主义学院': 'MARXISM_COLLEGE',
                '政治与国际关系学院': 'POLITICAL_SCIENCE_AND_INTERNATIONAL_RELATIONS',
                '中德工程学院': 'SINO_GERMAN_COLLEGE_OF_ENGINEERING',
                '测绘与地理信息学院': 'GEOMATICS_AND_GEOINFORMATION_COLLEGE',
                '航空航天与力学学院': 'AERONAUTICS_AND_ASTRONAUTICS',
                '软件学院': 'SOFTWARE_COLLEGE',
                '中德学院': 'SINO_GERMAN_COLLEGE',
                '材料科学与工程学院': 'MATERIALS_SCIENCE_AND_ENGINEERING',
                '化学科学与工程学院': 'CHEMICAL_SCIENCE_AND_ENGINEERING',
                '交通运输工程学院': 'TRANSPORTATION_ENGINEERING_COLLEGE',
                '口腔医学院': 'COLLEGE_OF_STOMATOLOGY',
                '上海国际知识产权学院': 'SHANGHAI_INTELLECTUAL_PROPERTY_COLLEGE',
                '同济大学附属医院': 'TONGJI_UNIVERSITY_AFFILIATED_HOSPITAL',
                '校医院': 'UNIVERSITY_HOSPITAL'
                // 注意：确保这些值与您后端定义的枚举值一致
            };
            return collegeMap[college] || null; // 返回对应的枚举值或者null
        },

        //获取用户的基本信息
        fetchPersonalInfo() {
            axios.get(`api/human_management/members/${this.userId}`)
                .then(response => {
                    console.log('获取个人信息成功！', response);
                    this.personalInfo.name = response.data.name;
                    this.personalInfo.gender = response.data.gender;
                    this.personalInfo.email = response.data.email;
                    this.personalInfo.phoneNumber = response.data.phoneNumber;
                    this.personalInfo.campus = this.mapCampusToEnumETC(response.data.campus);
                    this.personalInfo.institute = this.mapCollegeToInstituteETC(response.data.institute);
                    this.personalInfo.major = response.data.major;
                    this.personalInfo.password = response.data.password;
                    this.personalInfo.level = this.mapGradeToLevelETC(response.data.level);
                })
                .catch(error => {
                    console.error('Login failed', error);
                    // 登录失败后的操作
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        //将英文转换成对应的中文
        mapGradeToLevelETC(grade) {
            const gradeMap = {
                'U1': '大一',
                'U2': '大二',
                'U3': '大三',
                'U4': '大四',
                'U5': '大五',
                'P1': '研一',
                'P2': '研二',
                'P3': '研三',
                'D_plus': '博士生及以上'
            };
            return gradeMap[grade] || null; // 返回对应的枚举值或者null
        },
        mapCampusToEnumETC(campus) {
            const campusMap = {
                'SIPING': '四平路校区',
                'JIADING': '嘉定校区',
                'HUBEI': '沪北校区',
                'HUXI': '沪西校区'
            };
            return campusMap[campus] || null; // 返回对应的枚举值或者null
        },
        mapCollegeToInstituteETC(institute) {
            const instituteMap = {
                'MECHANICAL_AND_ENERGY_ENGINEERING': '机械与能源学院',
                'LIFE_SCIENCES_AND_TECHNOLOGY': '生命科学与技术学院',
                'RAIL_TRANSIT_RESEARCH_INSTITUTE': '铁道与城市轨道交通研究院',
                'PHYSICAL_SCIENCE_AND_ENGINEERING': '物理科学与工程学院',
                'ARCHITECTURE_AND_URBAN_PLANNING': '建筑与城市规划学院',
                'AUTOMOTIVE_COLLEGE': '汽车学院',
                'MATHEMATICAL_SCIENCES': '数学科学学院',
                'CIVIL_ENGINEERING': '土木工程学院',
                'MARINE_AND_EARTH_SCIENCES': '海洋与地球科学学院',
                'DESIGN_AND_CREATIVE_COLLEGE': '设计创意学院',
                'MEDICAL_COLLEGE': '医学院',
                'FRESHMAN_COLLEGE': '新生院',
                'ELECTRONIC_INFORMATION_ENGINEERING': '电子信息与工程学院',
                'LAW_SCHOOL': '法学院',
                'COLLEGE_OF_HUMANITIES': '人文学院',
                'SCHOOL_OF_FOREIGN_LANGUAGES': '外国语学院',
                'ENVIRONMENTAL_SCIENCE_AND_ENGINEERING': '环境科学与工程学院',
                'PHYSICAL_EDUCATION_DEPARTMENT': '体育教学部',
                'ART_AND_MEDIA_COLLEGE': '艺术与传媒学院',
                'ECONOMICS_AND_MANAGEMENT': '经济与管理学院',
                'MARXISM_COLLEGE': '马克思主义学院',
                'POLITICAL_SCIENCE_AND_INTERNATIONAL_RELATIONS': '政治与国际关系学院',
                'SINO_GERMAN_COLLEGE_OF_ENGINEERING': '中德工程学院',
                'GEOMATICS_AND_GEOINFORMATION_COLLEGE': '测绘与地理信息学院',
                'AERONAUTICS_AND_ASTRONAUTICS': '航空航天与力学学院',
                'SOFTWARE_COLLEGE': '软件学院',
                'SINO_GERMAN_COLLEGE': '中德学院',
                'MATERIALS_SCIENCE_AND_ENGINEERING': '材料科学与工程学院',
                'CHEMICAL_SCIENCE_AND_ENGINEERING': '化学科学与工程学院',
                'TRANSPORTATION_ENGINEERING_COLLEGE': '交通运输工程学院',
                'COLLEGE_OF_STOMATOLOGY': '口腔医学院',
                'SHANGHAI_INTELLECTUAL_PROPERTY_COLLEGE': '上海国际知识产权学院',
                'TONGJI_UNIVERSITY_AFFILIATED_HOSPITAL': '同济大学附属医院',
                'UNIVERSITY_HOSPITAL': '校医院',
                // 注意：确保这些值与您后端定义的枚举值一致
            };
            return instituteMap[institute] || null; // 返回对应的中文值或者null
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
  