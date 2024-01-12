<template>
    <!-- 顶部的导航栏 -->
    <div style="position: relative;">
        <!-- 顶部的导航栏 -->
        <DefaultBar style="position: fixed; top: 0; left: 0; z-index: 5;" />
        <!-- 图片元素 -->
        <!-- <img src="../assets/个人中心背景.png" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 1;" alt=""> -->
        <!-- 显示个人信息 -->
        <v-card style="position:relative;height:100%;">
            <v-layout>
                <!-- 抽屉式导航栏 -->
                <v-navigation-drawer expand-on-hover rail>
                    <v-list>
                        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
                            subtitle="sandra_a88@gmailcom"></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="compact" nav>
                        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
                        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me"
                            value="shared"></v-list-item>
                        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main style="positon:absolute;height: 800px;">
                
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
        personalInfo:{
            name:"",
            gender:"",
            email:"",
            phoneNumber:"",
            campus:"",
            institute:"",
            major:"",
        },


    }),
    methods: {

    },
}



</script>
  