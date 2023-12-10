<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    <v-img src="../assets/HomeTitle.png" style="position:relative;top:-60px;"></v-img>
    <div style="position:relative;top:-245px;"><v-img src="../assets/往期回顾.png"></v-img></div>
    <v-row style="position:relative;top:-210px;">
        <v-col style="padding:50px;">
            <v-img src="../assets/活动报名.png"></v-img>
        </v-col>
        <v-col style="padding:50px;">
            <v-img src="../assets/最近新闻.png"></v-img>
        </v-col>
    </v-row>
    <div style="position:relative;top:2px;"><v-img src="../assets/关于我们.png"></v-img></div>
    <Footer></Footer>
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
        userAccount: null,
        password: null,
        loading: false,
    }),
    mounted() {
        const scripts = document.querySelectorAll('script[src="./src/snow.js"]')
        scripts.forEach(script => {
            script.parentNode.removeChild(script)
        })
    },
    methods: {

    },
}
</script>

