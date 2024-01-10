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
    <v-img src="../assets/我们的印记背景.png" style="position:relative;top:-350px;">
        <!-- 文章展示 -->
        <div style="position:relative;top:150px;" >
            <article-preview v-for="article in paginatedArticles" :key="article.id" :article="article" />
            <!-- 分页导航组件 -->
            <v-pagination v-model="currentPage" :length="totalPages" @input="loadPage"></v-pagination>
        </div>
    </v-img>
    <v-img src="../assets/干事招新背景.png">
        <div class="container">
            <v-card class="custom-card">
                <v-card-title class="card-title">干事招新</v-card-title>
                <v-card-subtitle class="card-subtitle">足迹行者</v-card-subtitle>
                <v-card-text class="card-text">{{ content }}</v-card-text>
                <v-btn class="custom-btn">我要报名</v-btn>
            </v-card>
        </div>
    </v-img>
    <Footer></Footer>
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
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            },
        ],
        articlesPerPage: 4, // 每页显示的文章数量
        currentPage: 1, // 当前页码
        //文章内容
        articles: [
            { id: 1, title: '文章标题1', preview: '文章预览内容1...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 2, title: '文章标题2', preview: '文章预览内容2...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 3, title: '文章标题3', preview: '文章预览内容3...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 4, title: '文章标题4', preview: '文章预览内容4...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 5, title: '文章标题5', preview: '文章预览内容5...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 6, title: '文章标题6', preview: '文章预览内容6...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 7, title: '文章标题7', preview: '文章预览内容7...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 8, title: '文章标题8', preview: '文章预览内容8...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 9, title: '文章标题9', preview: '文章预览内容9...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 10, title: '文章标题10', preview: '文章预览内容10...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 11, title: '文章标题11', preview: '文章预览内容11...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 12, title: '文章标题12', preview: '文章预览内容12...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 13, title: '文章标题13', preview: '文章预览内容13...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 14, title: '文章标题14', preview: '文章预览内容14...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 15, title: '文章标题15', preview: '文章预览内容15...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
            { id: 16, title: '文章标题16', preview: '文章预览内容16...', image: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
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
    position: relative;
    top: -60px;
    height: 800px;
    width: 100%;
    border-radius: 6px;
}

.container {
    position: relative;
    top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; 使容器占据整个视口高度 */
}

.custom-card {
    background-color: #fefdfd;
    /* 卡片的背景颜色 */
    width: 60%;
    /* 自定义卡片宽度 */
    text-align: center;
    /* 文字居中 */
}

.card-title {
    background-color: #2c2f31;
    /* 标题的背景颜色 */
    color: white;
    /* 标题文字颜色 */
    text-align: center;
    /* 文字居中 */
}

.card-subtitle {
    text-align: center;
    /* 文字居中 */
}

.custom-btn {
    background-color: #f27162;
    /* 按钮的背景颜色 */
    color: white;
    /* 按钮文字颜色 */
    margin: auto;
    /* 垂直水平居中 */
    margin-bottom: 10px;
}</style>