<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    <!-- 左边是地图 -->
    <div id="allmap1">
        <v-img src="../assets/AboutUsPeaple_decoration.png" width="150px"
            style="position:absolute;right:10px;bottom:10px;"></v-img>
    </div>
    <v-img src="../assets/background/AboutUsGoing.png" style="position:relative;top:-10px;">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover" :interval="4000"
            style="position: absolute;border-radius: 5px;width:50%;left:25%;top:15%;">
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
        </v-carousel>
    </v-img>
    <v-img src="../assets/background/WhoAreWe_background.png" style="position:relative;top:-260px;">
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
    <v-img src="../assets/background/我们的印记背景.png" style="position:relative;top:-260px;">
        <!-- 文章展示 -->
        <div style="position:relative;top:150px;">
            <article-preview v-for="article in paginatedArticles" :key="article.id" :article="article" />
            <!-- 分页导航组件 -->
            <v-pagination v-model="currentPage" :length="totalPages" @input="loadPage"></v-pagination>
        </div>
    </v-img>
        <v-img src="../assets/background/干事招新背景.png" class="background-image" style="position:relative;top:-260px;" cover>
            <v-img src="../assets/background/干事招新卡片.png" width="1000" style="left:20%;">
            <div style="width:700px;position:absolute;left:20%;top:15%;">{{ content }}</div>
            <v-btn style="position:absolute;left:45%;bottom:20%;" size="x-large" color="#BAB9C5">我要报名</v-btn>
            </v-img>
        </v-img>
    <Footer style="position:relative;top:-260px;"></Footer>
</template>
  
<script>
import DefaultBar from '@/layouts/default/AppBar.vue'
import Footer from '@/layouts/default/Foot.vue'
import ArticlePreview from '@/components/ArticlePreview.vue';
// import DefaultView from '@/layouts/default/View.vue'
export default {
    //导出组件
    components: {
        DefaultBar,
        Footer,
        ArticlePreview
    },
    data: () => ({
        form: false,
        userAccount: null,
        password: null,
        loading: false,
        items: [
            {
                src: '../src/assets/activity/anhui2.JPG',
            },
            {
                src: '../src/assets/activity/wugongshan.png',
            },
            {
                src: '../src/assets/activity/wuyi.png',
            },
        ],
        articlesPerPage: 4, // 每页显示的文章数量
        currentPage: 1, // 当前页码
        //文章内容
        articles: [
            { id: 1, title: '活动回顾 | City Walk 邂逅秋天的浪漫与快乐', preview: '上海的愚园路，是一条充满历史味和人文气息的马路，沿途绿树成荫，环境优美。10月29日这天，足迹er们一起在秋日的阳光里走街串巷。一路上，我们途径了各种不同风格的建筑，从上了年纪的石制建筑到现代的高楼大厦。城市的繁华与宁静在这里交融，形成一幅幅美丽的图画。', image: "/activity/CityWalk.png" },
            { id: 2, title: '活动回顾 | 徽韵山水，足迹行者的诗画旅程', preview: '在浓墨重彩的中国画卷中，皖南以其独特的徽派文化和醉人的自然风光绽放着无尽的魅力，它坚韧地在时间的长河中保存着那些美丽而深邃的故事。在刚过去的国庆假期，我们——同济大学的足迹行者们，怀揣着探索的好奇与敬仰的向往，踏上了这片灿烂的土地，寻找那些尘封的古韵，体验那些如诗如画的景致。', image: "/activity/anhui1.JPG" },
            { id: 3, title: '国庆·纪龙山 | 地心探险 星空露营 来一场灵魂的流浪', preview: '十月一日欢度国庆大学的同学们一同前往浙江桐庐纪龙山奔赴山野之间，探索大好河山将足迹印在祖国大地开始军训拉练（bushi）', image: "/activity/jilongshan.png" },
            { id: 4, title: '国庆回顾|横沙之行 | 浩瀚星空，余晖落日，海浪和沙', preview: ' 从长兴对江渡客运站坐五分钟的轮渡，就登上了美丽的横沙岛。四季轮转的风车和日夜驻守的灯塔守护着这片小岛，纵横交错的内部水系带来了充足的灌溉水源，使得金秋时节的水稻显得格外耀眼，在微风的吹拂下形成一片片麦浪。', image: "/activity/hengshadao.png" },
            { id: 5, title: '文章标题5', preview: '文章预览内容5...', image: "/activity/CityWalk.png" },
            { id: 6, title: '文章标题6', preview: '文章预览内容6...', image: "/activity/CityWalk.png" },
            { id: 7, title: '文章标题7', preview: '文章预览内容7...', image: "/activity/CityWalk.png" },
            { id: 8, title: '文章标题8', preview: '文章预览内容8...', image: "/activity/CityWalk.png" },
            { id: 9, title: '文章标题9', preview: '文章预览内容9...', image: "/activity/CityWalk.png" },
            { id: 10, title: '文章标题10', preview: '文章预览内容10...', image: "/activity/CityWalk.png" },
            { id: 11, title: '文章标题11', preview: '文章预览内容11...', image: "/activity/CityWalk.png" },
            { id: 12, title: '文章标题12', preview: '文章预览内容12...', image: "/activity/CityWalk.png" },
            { id: 13, title: '文章标题13', preview: '文章预览内容13...', image: "/activity/CityWalk.png" },
            { id: 14, title: '文章标题14', preview: '文章预览内容14...', image: "/activity/CityWalk.png" },
            { id: 15, title: '文章标题15', preview: '文章预览内容15...', image: "/activity/CityWalk.png" },
            { id: 16, title: '文章标题16', preview: '文章预览内容16...', image: "/activity/CityWalk.png" },
            // 其他文章数据...
        ],
        content: "加入我们，成为校园中的引领者！你是否渴望在校园里展现自己的领袖魅力，影响更多的同学？你是否希望参与策划并组织那些让人印象深刻的活动和项目？那么，这就是你大展拳脚的舞台！我们诚挚邀请你加入我们的团队，成为我们的一员。作为一名干事，你将有机会参与各种丰富多彩的活动策划、组织和执行，锻炼你的团队合作能力、沟通技巧和领导潜能。无论你是对活动策划充满热情，还是渴望提升自己的团队管理能力，我们都将为你提供一个施展才华的舞台。加入我们，让我们一起书写属于我们的精彩故事，为校园增添更多色彩，展现青春无限的活力！快来成为我们团队的一份子吧，让我们一同开启未来的精彩旅程！"
    }),
    computed: {
        paginatedArticles() {
            // 根据当前页码和每页显示的数量计算出当前页需要显示的文章
            const startIndex = (this.currentPage - 1) * this.articlesPerPage;
            const endIndex = startIndex + this.articlesPerPage;
            return this.articles.slice(startIndex, endIndex);
        },
        totalPages() {
            // 计算总页数
            return Math.ceil(this.articles.length / this.articlesPerPage);
        },
    },
    mounted() {
        const scripts = document.querySelectorAll('script[src="./src/snow.js"]')
        scripts.forEach(script => {
            script.parentNode.removeChild(script)
        })
        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        let map = new BMapGL.Map("allmap1");    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(119.404, 30.915), 9);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setMapStyleV2({
            styleId: '3edf2b18e4530ff02701506c58ab7df8'
        });
        let points = [
            new BMapGL.Point(121.434, 31.225),  //愚园路
            new BMapGL.Point(117.944, 29.931),  //皖南之行
            new BMapGL.Point(119.562, 29.945), //纪龙山
            new BMapGL.Point(121.866, 31.332), //横沙岛
            // 这里可以继续添加更多的点坐标
        ];

        for (const element of points) {
            let marker = new BMapGL.Marker(element);
            marker.addEventListener("click", function () {
                alert("您点击了标注");
            });
            map.addOverlay(marker);
        }

    },
    methods: {
        loadPage() {
            // 处理页码变化时的逻辑，比如加载对应页的数据
            console.log('Load page:', this.currentPage);
        },
    },
}
</script>

<style>
#allmap1 {
    display: inline-block;
    height: 800px;
    width: 100%;
    border-radius: 6px;
}
.background-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.inner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 100%; 使内部容器充满整个背景图片 */
}
</style>