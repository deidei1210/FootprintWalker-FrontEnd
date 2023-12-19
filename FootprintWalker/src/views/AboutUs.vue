<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    <!-- 左边是地图 -->
    <div id="allmap">
        <h1>12333131</h1>
        <v-img src="../assets/AboutUsPeaple_decoration.png" width="150px"  style="position:absolute;right:10px;bottom:10px;"></v-img>
    </div>
</template>
  
<script>
import DefaultBar from '@/layouts/default/AppBar.vue'
// import DefaultView from '@/layouts/default/View.vue'
export default {
    //导出组件
    components: {
        DefaultBar
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
#allmap {
    display: inline-block;
    position: relative;
    height: 530px;
    width: 100%;
    border-radius: 6px;
}
</style>