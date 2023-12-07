<template>
    <!-- 顶部的导航栏 -->
    <DefaultBar />
    活动报名
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
    methods: {

    },
}



</script>
  