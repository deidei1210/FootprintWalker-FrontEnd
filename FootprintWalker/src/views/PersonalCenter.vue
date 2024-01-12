<template>
    <!-- 顶部的导航栏 -->
    <div style="position: relative;">
        <!-- 顶部的导航栏 -->
        <DefaultBar style="position: fixed; top: 0; left: 0; z-index: 5;" />
        <v-card style="position:relative;height:100%;">
            <v-layout>
                <!-- 抽屉式导航栏 -->
                <v-navigation-drawer expand-on-hover rail>
                    <!-- 显示头像和邮箱 -->
                    <v-list>
                        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                            :title="personalInfo.name" :subtitle="personalInfo.email"></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="compact" nav>
                        <v-list-item  @click="setCurrentOption('userInfo')" prepend-icon="mdi-account" title="个人信息" value="userInfo"></v-list-item>
                        <v-list-item @click="setCurrentOption('activity')" prepend-icon="mdi-balloon" title="已报名的活动" value="activity"></v-list-item>
                        <v-list-item @click="setCurrentOption('setting')" prepend-icon="mdi-cog-outline" title="修改个人信息" value="setting"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main style="positon:absolute;height: 800px;">
                    <!-- 根据当前选项显示不同的内容 -->
                    <div v-if="currentOption === 'userInfo'">
                        <!-- 个人信息页面的内容 -->
                        个人信息
                        <!-- ... -->
                    </div>

                    <div v-if="currentOption === 'activity'">
                        <!-- 已报名的活动页面的内容 -->
                        已报名活动
                        <!-- ... -->
                    </div>

                    <div v-if="currentOption === 'setting'">
                        <!-- 修改个人信息页面的内容 -->
                        修改个人信息
                        <!-- ... -->
                    </div>
                </v-main>
            </v-layout>
        </v-card>

    </div>
    <!-- Footer 元素 -->
    <Footer style="position: absolute;left: 0; width: 100%; z-index: 1;">
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
        Footer
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


    }),
    methods: {
        setCurrentOption(option) {
            this.currentOption = option;
        },
    },
}



</script>
  