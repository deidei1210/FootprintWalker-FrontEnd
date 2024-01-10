<template>
    <!-- 子绝父相 -->
    <div style="position: relative;">
        <!-- 顶部的导航栏 -->
        <DefaultBar style="position: fixed; top: 0; left: 0; z-index: 5;" />
        <!-- 图片元素 -->
        <img src="../assets/反馈中心背景.png" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 1;" alt="">
        <v-card style="position:absolute;left:15%;top:200px;z-index: 4;width:70%;">
            <v-tabs v-model="tab" bg-color="#4A4A4A">
                <v-tab value="one">活动反馈</v-tab>
                <v-tab value="two">社团反馈</v-tab>
                <v-tab value="three">我的反馈</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        One
                    </v-window-item>

                    <v-window-item value="two">
                        Two
                    </v-window-item>

                    <v-window-item value="three">
                        Three
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>


    </div>
    <!-- Footer 元素 -->
    <Footer style="position: absolute; bottom: -400px; left: 0; width: 100%; z-index: 1;">
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
        Footer,
    },
    data: () => ({
        tab: null,
        form: false,
        userAccount: null,
        password: null,
        loading: false,
    }),
    methods: {

    },
}



</script>
  