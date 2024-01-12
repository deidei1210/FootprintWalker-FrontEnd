<template>
    <div class="card-container">
        <v-card class="card">
            <!-- <div class="image-container"> -->
            <v-img class="image" height="200" :src="`../src/assets${article.image}`" cover></v-img>
            <!-- </div> -->
            <div class="content">
                <!-- 卡片头部 -->
                <v-card-title>{{ article.title }}</v-card-title>

                <!-- 卡片内容 -->
                <v-card-text>
                    {{ article.preview }}
                </v-card-text>

                <!-- 卡片操作按钮，可选 -->
                <v-card-actions>
                    <v-btn @click="readMore">阅读更多</v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </div>
</template>
  
<script>
export default {
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    mounted(){
        console.log(this.article)
    },
    methods: {
        readMore() {
            // 处理点击“阅读更多”按钮的逻辑
            // 可以导航到文章详情页或者展开卡片内容等
        },
    },
};
</script>

<style scoped>
/* 可以添加一些样式来美化卡片 */
.card {
    display: flex;
    background-color: #FDFAFA;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 60%;
}

.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
}


.image-container {
  flex: 0 0 auto; /* 不伸缩，固定宽度 */
  margin-right: 16px; /* 可根据需要调整间距 */
}

.content {
  flex: 1; /* 伸缩，占满剩余空间 */
}
</style>