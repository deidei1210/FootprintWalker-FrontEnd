<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    <v-img src="../assets/HomeTitle.png" style="position:relative;top:-60px;"></v-img>
    <div style="position:relative;top:-245px;">
        <v-img src="../assets/往期回顾.png">
            <div id="allmap"></div>
            123456
        </v-img>
    </div>
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
import { BaiduMap } from 'vue-baidu-map-3x'
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
        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        var map = new BMapGL.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    },
    methods: {

    },
}
</script>

<style>
#allmap {
    position:relative;
    top:230px;
    height: 530px;
    width: 50%;
}
</style>