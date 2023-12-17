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
                <div class="text-h3 text-white" style="display:inline-block;" color="white">皖南之行</div>
                <!-- <v-divider class="border-opacity-75"></v-divider> -->

                <div class="text-container">
                    <p class="text-left text-body-1 text-white">
                        在浓墨重彩的中国画卷中，皖南以其独特的徽派文化和醉人的自然风光绽放着无尽的魅力，它坚韧地在时间的长河中保存着那些美丽而深邃的故事。在刚过去的国庆假期，我们——同济大学的足迹行者们，怀揣着探索的好奇与敬仰的向往，踏上了这片灿烂的土地，寻找那些尘封的古韵，体验那些如诗如画的景致。
                        回望那段徜徉于皖南的日子，我们仿佛仍能听见村居酒吧内桌游的欢声笑语，在夜的深蔚中编织着我们的青春回忆；我们的味蕾依然徜徉在那些蕴藏在徽州大地上的美食奥秘中，徜徉于古老的食谱之间。当我们驻足观赏那些永不褪色的徽派建筑，感受那些沉淀在小铺、老街中的人文情怀时，我们似乎触摸到了徽州的静谧与庄重；而在宏伟的山川、壮阔的稻田面前，我们的心灵被自然的鬼斧神工深深震撼，见证了皖南美景的壮丽与多姿。
                        这，便是我们的皖南——一个蕴藏着无尽故事的地方，一个值得我们怀念、珍藏的美丽角落。在接下来的篇章中，我们将回顾这一路的点点滴滴，让记忆深处的每一处感动与美好，如徽州的山水般，静静流淌，永不消逝。
                    </p>
                </div>
                <a href="">更多>></a>
                <v-carousel cycle height="330" hide-delimiter-background show-arrows="hover" :interval="4000"
                    style="margin-top:25px;border-radius: 5px;">
                    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
                </v-carousel>
            </div>
        </v-img>
    </div>
    <!-- 活动报名和最近新闻 -->
    <v-row style="position:relative;top:-210px;">
        <!-- 活动报名 -->
        <v-col style="padding:50px;">
            <v-img src="../assets/活动报名.png">
                <div class="content">
                    <v-icon icon="mdi-fire" color="red" style="display:inline-block;position:relative;top:-10px;"
                        size="x-large" />
                    <div class="text-h3" style="display:inline-block;">千岛湖</div>
                    <div class="text-caption">截止时间：2023年11月25日（星期六） 23:59</div>
                    <v-divider class="border-opacity-75"></v-divider>
                    <div class="text-left text-body-1"><span class="text-red">【活动时间】</span>2023年12月2—3日（第12周周末）</div>
                    <div class="text-left text-body-1"><span class="text-red">【活动人数】</span>25人左右</div>
                    <div class="text-left text-body-1"><span class="text-red">【报名费用】</span>625元/人</div>
                    <div class="text-left text-body-1"><span class="text-red">【活动校区】</span>不限。上车地点包括四平路、嘉定校区。</div>
                    <div class="text-container" style="margin-top: 10px;">
                        <p class="text-left text-body-1">
                            刚考完期中想放松一下？没有social机会浑身不自在？想让身心沉浸在自然风景之中？别催啦别催啦！！！大家等待已久的千岛湖活动这不就来！了！吗！在浙江淳安县有这么一处胜景，崇山峻岭淹入湖中，乃成为大小翠岛。从淳安县城乘当地百姓的水上巴士，溯新安江而上，或登上天屿山，一览碧水呈奇，千岛百姿，这里自然风光旖旎，生态环境佳绝，我们不保证能走废你的腿，但保证满足你想旅行的眼睛。别墅坐落于千岛湖畔，环境优美，内部条件良好，房间简约典雅，提供麻将机，KTV,Switch，烧烤等吃喝玩乐设施，是轰趴的不二之选，营造放松身心的完美环境，带你远离ddl的压力与烦恼。
                        </p>
                    </div>
                    <a href="">更多>></a>

                    <v-img src="../assets/activity/anhui1.JPG" max-width="50%"></v-img>

                </div>
            </v-img>
        </v-col>
        <!-- 最近新闻 -->
        <v-col style="padding:50px;">
            <v-img src="../assets/最近新闻.png">
                <div class="content">
                    <!-- 顶上的显示图片的部分新闻 -->
                    <v-row>
                        <v-col>
                            <router-link to="https://chat1.aichatos.com/#/chat/1700226220387">
                                <v-img src="../assets/activity/anhui1.JPG" height="160px" cover></v-img>
                            </router-link>
                        </v-col>
                        <v-col>
                            <router-link to="https://chat1.aichatos.com/#/chat/1700226220387">
                                <v-img src="../assets/activity/anhui1.JPG" height="160px" cover></v-img>
                            </router-link>
                        </v-col>
                        <v-col>
                            <router-link to="https://chat1.aichatos.com/#/chat/1700226220387">
                                <v-img src="../assets/activity/anhui1.JPG" height="160px" cover></v-img>
                            </router-link>
                        </v-col>
                    </v-row>
                    <div style="margin:12px 3px 3px 3px;">
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <v-btn to="/other-page" variant="text" prepend-icon="mdi-circle">
                                    千岛之湖 | 周末轰趴+出游一站式解决方案
                                </v-btn>
                            </div>
                            <div>
                                <span style="font-size: 15px;">2023-12-16</span>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <v-btn to="/other-page" variant="text" prepend-icon="mdi-circle">
                                    活动回顾 | 徽韵山水，足迹行者的诗画旅程
                                </v-btn>
                            </div>
                            <div>
                                <span style="font-size: 15px;">2023-12-16</span>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <v-btn to="/other-page" variant="text" prepend-icon="mdi-circle">
                                    足迹行者干事招新 | 去旅行，去热爱！
                                </v-btn>
                            </div>
                            <div>
                                <span style="font-size: 15px;">2023-12-16</span>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <v-btn to="/other-page" variant="text" prepend-icon="mdi-circle">
                                    松江之旅 | 走进自然，一起打个盹！
                                </v-btn>
                            </div>
                            <div>
                                <span style="font-size: 15px;">2023-12-16</span>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <v-btn to="/other-page" variant="text" prepend-icon="mdi-circle">
                                    2022秋招 | 期待与你一起再出发
                                </v-btn>
                            </div>
                            <div>
                                <span style="font-size: 15px;">2023-12-16</span>
                            </div>
                        </div>
                    </div>


                </div>
            </v-img>
        </v-col>
    </v-row>
    <!-- 社团简介 -->

    <div style="position:relative;top:2px;">
        <v-img src="../assets/关于我们.png">
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