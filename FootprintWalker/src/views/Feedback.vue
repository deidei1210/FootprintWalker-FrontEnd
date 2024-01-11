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
                    <!-- 活动反馈 -->
                    <v-window-item value="one">
                        <!-- 活动反馈内容 -->
                        <v-container class="feedback-container">
                            <v-row>
                                <v-col v-for="activity in allActivityFeedback" :key="activity.id" :cols="12 / cardsPerRow">
                                    <v-card>
                                        <v-card-title>{{ activity.name }}</v-card-title>
                                        <v-card-subtitle>{{ activity.date }}</v-card-subtitle>
                                        <!-- 其他活动信息显示 -->
                                        <v-card-actions>
                                            <!-- 查看每个活动的反馈情况 -->
                                            <dialog-button :button="button1"
                                                :feedback-list="activity.feedbackList"></dialog-button>
                                            <!-- 用户对指定的活动提出反馈 -->
                                            <feedback-button :button="button2"></feedback-button>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-row style="margin-left:40px;margin-top:20px;">
                            <div class="text-h7" style="margin-top:5px;">我的评分：</div>
                            <v-rating v-model="clubRating" hover :length="5" :size="32" color="amber"
                                active-color="amber" />
                            <div class="text-grey ms-4 text-caption" style="position:relative;margin-top:8px;">
                                {{ clubRating }}
                            </div>
                        </v-row>
                        <!-- 社团反馈内容 -->
                        <v-container class="feedback-container">
                            <v-textarea prepend-icon="mdi-pen" v-model="feedbackTitle" label="标题" variant="outlined"
                                rows="1" cols="10"></v-textarea>
                            <v-textarea v-model="feedback" label="我对社团的反馈......" variant="outlined" rows="18"
                                prepend-icon="mdi-comment"></v-textarea>
                        </v-container>
                        <div class="d-flex flex-row-reverse mb-6">
                            <!-- 提交按钮 -->
                            <v-btn class="ma-2 pa-2" @click="submitFeedback" color="#4A4A4A" size="x-large">提交</v-btn>
                        </div>
                    </v-window-item>

                    <v-window-item value="three">
                        <!-- 我的反馈内容 -->
                        <v-container class="feedback-container">
                            <v-row>
                                <v-col v-for="feedback in myFeedback" :key="feedback.id" :cols="12 / cardsPerRow">
                                    <v-card>
                                        <v-row style="margin-top:6px;margin-left:1px;">
                                            <v-card-title>{{ feedback.title }}</v-card-title>
                                            <v-chip color="green" size="small" style="margin-top:10px;" v-if="feedback.status">已处理</v-chip>
                                            <v-chip color="red" size="small" style="margin-top:10px;" v-else>未处理</v-chip>
                                        </v-row>
                                        <v-card-subtitle>{{ feedback.date }}</v-card-subtitle>
                                        <!-- 其他活动信息显示 -->
                                        <v-card-actions>
                                            <show-reply-button :my-feedback="feedback"></show-reply-button>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
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
import DialogButton from '@/components/DialogButton.vue'
import FeedbackButton from '@/components/FeedbackButton.vue'
import ShowReplyButton from '@/components/ShowReplyButton.vue'
// import DefaultView from '@/layouts/default/View.vue'
export default {
    //导出组件
    components: {
        DefaultBar,
        Footer,
        DialogButton,
        FeedbackButton,
        ShowReplyButton,
    },

    data: () => ({
        tab: null,
        form: false,
        userAccount: null,
        password: null,
        loading: false,

        allActivityFeedback: [
            {
                id: "1",          //活动序列
                name: "安徽之行",  //活动名称
                date: "2023-10-05",//活动日期
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 5,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 5,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 4.5,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 4.5,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 3.5,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "6",
                        title: "还行",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 2,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "7",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 1,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "8",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        rating: 3,
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "2",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "3",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "4",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "5",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "6",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "7",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "8",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "9",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "10",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "11",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
            {
                id: "12",
                name: "安徽之行",
                date: "2023-10-05",
                feedbackList: [
                    {
                        id: "1",
                        title: "很开心的一天",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "2",
                        title: "我的安徽之旅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "3",
                        title: "希望越办越好",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "4",
                        title: "带队小哥哥很帅",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                    {
                        id: "5",
                        title: "感觉一般",
                        feedbackTime: "2023-10-05",//反馈时间
                        content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
                    },
                ],
            },
        ], // 从服务器获取的活动数据，根据分页显示

        button1: "查看反馈",
        button2: "我要评价",
        currentPage: 1,
        cardsPerRow: 1,
        totalPages: 0,

        //我输入的反馈内容
        feedback: "",

        //我的反馈
        myFeedback: [
            {
                id: "1",    //反馈序号
                title: "美好的一天",   //反馈的标题
                rating: "3",
                content: "学生们的日常生活充满了丰富多彩的课堂体验。每天早晨，他们会走进各式各样的教室，迎接着不同学科的知识冲击。上完一堂数学课，接着便是生物实验或者文学讨论。在这个知识的海洋中，他们用思考和互动搭建着知识的桥梁，培养着综合素养。而且，有趣的老师和生动的课程设置，让课堂变得更加生动活泼。",//反馈内容
                status: true, //处理情况
                date: "2024-01-01",   //反馈日期
                reply: {
                    content: "午餐时间是学生们社交的黄金时刻。他们聚集在食堂，品味着丰富多样的美食，同时也分享着一天中的点滴趣事。在这里，友谊得以深深培养，班级之间的默契在笑声和交谈中升华。有的在交换着午餐盒中的美食，有的在商量着下午一起进行的活动。午餐不仅仅是填饱肚子的时刻，更是心灵交流的重要场所。",
                    time: "2024-01-03"
                }   //管理员回复
            },
            {
                id: "2",
                title: "美好的二天",
                rating: "3",
                content: "午餐时间是学生们社交的黄金时刻。他们聚集在食堂，品味着丰富多样的美食，同时也分享着一天中的点滴趣事。在这里，友谊得以深深培养，班级之间的默契在笑声和交谈中升华。有的在交换着午餐盒中的美食，有的在商量着下午一起进行的活动。午餐不仅仅是填饱肚子的时刻，更是心灵交流的重要场所。",//反馈内容
                status: false,
                date: "2024-01-01",
                reply: {
                    content: "午餐时间是学生们社交的黄金时刻。他们聚集在食堂，品味着丰富多样的美食，同时也分享着一天中的点滴趣事。在这里，友谊得以深深培养，班级之间的默契在笑声和交谈中升华。有的在交换着午餐盒中的美食，有的在商量着下午一起进行的活动。午餐不仅仅是填饱肚子的时刻，更是心灵交流的重要场所。",
                    time: "2024-01-03"
                }   //管理员回复            
            },
            {
                id: "3",
                title: "美好的三天",
                rating: "3",
                content: "学生们在紧凑的学业之余，还拥有着各式各样的课外活动。运动、艺术、社团，无不为学生提供了展示自我、发现兴趣的平台。下午的时间里，球场上传来欢声笑语，艺术教室里弥漫着创意的氛围，社团活动中形成了一个个小家庭。这些活动不仅让学生们全面发展，更增添了校园生活的丰富多彩。",//反馈内容
                status: true,
                date: "2024-01-01",
                reply: {
                    content: "午餐时间是学生们社交的黄金时刻。他们聚集在食堂，品味着丰富多样的美食，同时也分享着一天中的点滴趣事。在这里，友谊得以深深培养，班级之间的默契在笑声和交谈中升华。有的在交换着午餐盒中的美食，有的在商量着下午一起进行的活动。午餐不仅仅是填饱肚子的时刻，更是心灵交流的重要场所。",
                    time: "2024-01-03"
                }   //管理员回复   
            },
            {
                id: "4",
                title: "美好的四天",
                rating: "4",
                content: "学生们的日常生活充满了丰富多彩的课堂体验。每天早晨，他们会走进各式各样的教室，迎接着不同学科的知识冲击。上完一堂数学课，接着便是生物实验或者文学讨论。在这个知识的海洋中，他们用思考和互动搭建着知识的桥梁，培养着综合素养。而且，有趣的老师和生动的课程设置，让课堂变得更加生动活泼。",//反馈内容
                status: false,
                date: "2024-01-01",
                reply: {
                    content: "午餐时间是学生们社交的黄金时刻。他们聚集在食堂，品味着丰富多样的美食，同时也分享着一天中的点滴趣事。在这里，友谊得以深深培养，班级之间的默契在笑声和交谈中升华。有的在交换着午餐盒中的美食，有的在商量着下午一起进行的活动。午餐不仅仅是填饱肚子的时刻，更是心灵交流的重要场所。",
                    time: "2024-01-03"
                }   //管理员回复   
            },
            {
                id: "5",
                title: "美好的五天",
                rating: "5",
                content: "学生们的日常生活充满了丰富多彩的课堂体验。每天早晨，他们会走进各式各样的教室，迎接着不同学科的知识冲击。上完一堂数学课，接着便是生物实验或者文学讨论。在这个知识的海洋中，他们用思考和互动搭建着知识的桥梁，培养着综合素养。而且，有趣的老师和生动的课程设置，让课堂变得更加生动活泼。",//反馈内容
                status: false,
                date: "2024-01-01",
                reply: {
                    content: "午餐时间是学生们社交的黄金时刻。他们聚集在食堂，品味着丰富多样的美食，同时也分享着一天中的点滴趣事。在这里，友谊得以深深培养，班级之间的默契在笑声和交谈中升华。有的在交换着午餐盒中的美食，有的在商量着下午一起进行的活动。午餐不仅仅是填饱肚子的时刻，更是心灵交流的重要场所。",
                    time: "2024-01-03"
                }   //管理员回复   
            }
        ],
        clubRating: 3,

        //是否打开弹窗
        activityFeedbackDialog: false,
    }),

    //   computed: {
    //       paginatedArticles() {
    //           // 根据当前页码和每页显示的数量计算出当前页需要显示的文章
    //           const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    //           const endIndex = startIndex + this.articlesPerPage;
    //           return this.articles.slice(startIndex, endIndex);
    //       },
    //       totalPages() {
    //           // 计算总页数
    //           return Math.ceil(this.articles.length / this.articlesPerPage);
    //       },
    //   },

    mounted() {
        // 页面加载时加载第一页的活动数据
        this.loadPage(1);
    },

    methods: {
        loadPage(page) {
            // 根据页码加载对应的活动数据
            // 这里需要从服务器获取数据，然后更新 paginatedActivities、totalPages 等数据
        },
        showFeedbackDialog(activity) {
            // 显示查看反馈的弹窗，根据 activity.id 获取反馈数据
            // 你可以使用 Vuetify 的 Dialog 组件来实现弹窗
        },
        showFeedbackForm(activity) {
            // 显示我要反馈的弹窗，可以使用 Vuetify 的 Dialog 组件
            // 在弹窗中提供一个文本输入框，用户输入反馈内容
        },
        submitFeedback() {
            // 在这里处理提交逻辑，例如打印 feedback 中的内容
            console.log('用户反馈内容：', this.feedback);
            this.feedback = "";
        },
    }
};
</script>

<style scoped>
.feedback-container {
    height: 600px;
    /* 设置最大高度 */
    overflow-y: auto;
    /* 添加垂直滚动条 */
}

.v-dialog {
    background: #d1d1d11a;
}
</style>