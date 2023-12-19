<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    <!-- 左边是地图 -->
    <div id="allmap1">
        <v-img src="../assets/AboutUsPeaple_decoration.png" width="150px"
            style="position:absolute;right:10px;bottom:10px;"></v-img>
    </div>
    <v-img src="../assets/AboutUsGoing.png" style="position:relative;top:-72px;">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover" :interval="4000"
            style="position: absolute;border-radius: 5px;width:50%;left:25%;top:15%;">
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
        </v-carousel>
    </v-img>
    <v-img src="../assets/WhoAreWe_background.png" style="position:relative;top:-350px;">
        <v-row style="width:60%;position:relative;left:20%;top:43%;">
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
        items: [
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            },
        ],
    }),
    mounted() {
        const scripts = document.querySelectorAll('script[src="./src/snow.js"]')
        scripts.forEach(script => {
            script.parentNode.removeChild(script)
        })
        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        var map = new BMapGL.Map("allmap1");    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(119.404, 30.915), 7);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setMapStyleV2({
            styleId: '3edf2b18e4530ff02701506c58ab7df8'
        });
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

    },
}



</script>
<style>
#allmap1 {
    display: inline-block;
    position: relative;
    top: -60px;
    height: 600px;
    width: 100%;
    border-radius: 6px;
}
</style>