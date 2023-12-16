<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    <v-img src="../assets/HomeTitle.png" style="position:relative;top:-60px;"></v-img>
    <div style="position:relative;top:-245px;">
        <v-img src="../assets/往期回顾.png">
            <!-- 左边是地图 -->
            <div id="allmap"></div>
            <!-- 右边是往期回顾的文字介绍 -->
            <div id="Lookback">
                <v-icon icon="mdi-map-marker" color="red" style="display:inline-block;position:relative;top:-10px;"
                    size="x-large" />
                <div class="text-h3 text-white" style="display:inline-block;">皖南之行</div>
                <div class="text-container">
                    <p class="text-left text-body-1 text-white">
                        在浓墨重彩的中国画卷中，皖南以其独特的徽派文化和醉人的自然风光绽放着无尽的魅力，它坚韧地在时间的长河中保存着那些美丽而深邃的故事。在刚过去的国庆假期，我们——同济大学的足迹行者们，怀揣着探索的好奇与敬仰的向往，踏上了这片灿烂的土地，寻找那些尘封的古韵，体验那些如诗如画的景致。
                        回望那段徜徉于皖南的日子，我们仿佛仍能听见村居酒吧内桌游的欢声笑语，在夜的深蔚中编织着我们的青春回忆；我们的味蕾依然徜徉在那些蕴藏在徽州大地上的美食奥秘中，徜徉于古老的食谱之间。当我们驻足观赏那些永不褪色的徽派建筑，感受那些沉淀在小铺、老街中的人文情怀时，我们似乎触摸到了徽州的静谧与庄重；而在宏伟的山川、壮阔的稻田面前，我们的心灵被自然的鬼斧神工深深震撼，见证了皖南美景的壮丽与多姿。
                        这，便是我们的皖南——一个蕴藏着无尽故事的地方，一个值得我们怀念、珍藏的美丽角落。在接下来的篇章中，我们将回顾这一路的点点滴滴，让记忆深处的每一处感动与美好，如徽州的山水般，静静流淌，永不消逝。
                    </p>
                </div>
                <a href="">更多>></a>
                <v-carousel cycle height="330"  hide-delimiter-background show-arrows="hover" :interval="4000" style="margin-top:25px;border-radius: 5px;">
                    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
                </v-carousel>
            </div>
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

    },
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
  max-height: 6em; /* 设置最大高度为6行 */
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
</style>