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
                                <v-col v-for="activity in allActivities" :key="activity.id" :cols="12 / cardsPerRow">
                                    <v-card>
                                        <v-card-title>{{ activity.title }}</v-card-title>
                                        <v-card-subtitle>{{ formatDateTime(activity.startTime) }}</v-card-subtitle>
                                        <!-- 其他活动信息显示 -->
                                        <v-card-actions>
                                            <!-- 查看每个活动的反馈情况 -->
                                            <dialog-button :button="button1" :activity="activity"></dialog-button>
                                            <!-- 用户对指定的活动提出反馈 -->
                                            <feedback-button :button="button2" :activity="activity"></feedback-button>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>
                   
                   <!-- 进行反馈 -->
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
                            <v-textarea v-model="feedbackTitle" prepend-icon="mdi-pen" label="标题" variant="outlined"
                                rows="1" cols="10"></v-textarea>
                            <v-textarea v-model="feedback" label="我对社团的反馈......" variant="outlined" rows="18"
                                prepend-icon="mdi-comment"></v-textarea>
                        </v-container>
                        <div class="d-flex flex-row-reverse mb-6">
                            <!-- 提交按钮 -->
                            <v-btn class="ma-2 pa-2" @click="submitFeedback" color="#4A4A4A" size="x-large">提交</v-btn>
                        </div>
                    </v-window-item>
                    
                    <!-- 查看我的反馈处理进度 -->
                    <v-window-item value="three">
                        <!-- 我的反馈内容 -->
                        <v-container class="feedback-container">
                            <v-row>
                                <v-col v-for="feedback in myFeedback" :key="feedback.id" :cols="12 / cardsPerRow">
                                    <v-card>
                                        <v-row style="margin-top:6px;margin-left:1px;">
                                            <v-card-title>{{ feedback.title }}</v-card-title>
                                            <v-chip color="green" size="small" style="margin-top:10px;"
                                                v-if="feedback.status">已处理</v-chip>
                                            <v-chip color="red" size="small" style="margin-top:10px;" v-else>未处理</v-chip>
                                        </v-row>
                                        <v-card-subtitle>{{ formatDateTime(feedback.date) }}</v-card-subtitle>
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
import { axiosForActivity } from "@/main";
import { formatDateTime } from "@/tools/Format.js";
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
        userId: 1,
        password: null,
        loading: false,
        currentDate: new Date(),
        allActivities: [
            // {
            //     id: "1",          //活动序列
            //     name: "安徽之行",  //活动名称
            //     date: "2023-10-05",//活动日期
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 5,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 5,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 4.5,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 4.5,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 3.5,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "6",
            //     //         title: "还行",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 2,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "7",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 1,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "8",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         rating: 3,
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "2",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "3",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "4",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "5",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "6",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "7",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "8",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "9",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     // feedbackList: [
            //     //     {
            //     //         id: "1",
            //     //         title: "很开心的一天",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "2",
            //     //         title: "我的安徽之旅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "3",
            //     //         title: "希望越办越好",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "4",
            //     //         title: "带队小哥哥很帅",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     //     {
            //     //         id: "5",
            //     //         title: "感觉一般",
            //     //         feedbackTime: "2023-10-05",//反馈时间
            //     //         content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //     //     },
            //     // ],
            // },
            // {
            //     id: "10",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     feedbackList: [
            //         {
            //             id: "1",
            //             title: "很开心的一天",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "2",
            //             title: "我的安徽之旅",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "3",
            //             title: "希望越办越好",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "4",
            //             title: "带队小哥哥很帅",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "5",
            //             title: "感觉一般",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //     ],
            // },
            // {
            //     id: "11",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     feedbackList: [
            //         {
            //             id: "1",
            //             title: "很开心的一天",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "2",
            //             title: "我的安徽之旅",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "3",
            //             title: "希望越办越好",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "4",
            //             title: "带队小哥哥很帅",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "5",
            //             title: "感觉一般",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //     ],
            // },
            // {
            //     id: "12",
            //     name: "安徽之行",
            //     date: "2023-10-05",
            //     feedbackList: [
            //         {
            //             id: "1",
            //             title: "很开心的一天",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "2",
            //             title: "我的安徽之旅",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "3",
            //             title: "希望越办越好",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "4",
            //             title: "带队小哥哥很帅",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //         {
            //             id: "5",
            //             title: "感觉一般",
            //             feedbackTime: "2023-10-05",//反馈时间
            //             content: "v-slot 是 Vue.js 中用于插槽内容分发的一种语法。它是用于处理子组件向父组件传递内容的一种机制。在 Vuetify 中，v-dialog 组件提供了一个名为 activator 的插槽，可以使用 v-slot 来自定义触发打开对话框的元素。这样你就可以在 v-btn 上使用 v-slot:activator=，并在按钮上绑定 on 事件，使得按钮点击时触发对话框的显示。具体来说，v-slot 允许你在父组件中定义一个插槽，然后在子组件中使用 <slot> 元素来接收这些内容。这使得你可以更加灵活地控制组件之间的通信和内容的传递。在上述示例中，v-slot:activator 允许我们自定义触发对话框的按钮，使得按钮的点击事件通过 on 对象传递给按钮，从而控制对话框的显示。",               //反馈内容
            //         },
            //     ],
            // },
        ], // 从服务器获取的活动数据，根据分页显示

        button1: "查看反馈",
        button2: "我要评价",
        currentPage: 1,
        cardsPerRow: 1,
        totalPages: 0,

        //我输入的反馈内容
        feedback: "",
        feedbackTitle: "",

        //我的反馈
        myFeedback: [
            {
                id: "1",    //反馈序号
                title: "美好的一天",   //反馈的标题
                rating: "3",
                content: "学生们的日常生活充满了丰富多彩的课堂体验。每天早晨，他们会走进各式各样的教室，迎接着不同学科的知识冲击。上完一堂数学课，接着便是生物实验或者文学讨论。在这个知识的海洋中，他们用思考和互动搭建着知识的桥梁，培养着综合素养。而且，有趣的老师和生动的课程设置，让课堂变得更加生动活泼。",//反馈内容
                status: true, //处理情况
                date: "2024-01-01",   //反馈日期
            },
            {
                id: "2",
                title: "美好的二天",
                rating: "3",
                content: "午餐时间是学生们社交的黄金时刻。他们聚集在食堂，品味着丰富多样的美食，同时也分享着一天中的点滴趣事。在这里，友谊得以深深培养，班级之间的默契在笑声和交谈中升华。有的在交换着午餐盒中的美食，有的在商量着下午一起进行的活动。午餐不仅仅是填饱肚子的时刻，更是心灵交流的重要场所。",//反馈内容
                status: false,
                date: "2024-01-01",         
            },
            {
                id: "3",
                title: "美好的三天",
                rating: "3",
                content: "学生们在紧凑的学业之余，还拥有着各式各样的课外活动。运动、艺术、社团，无不为学生提供了展示自我、发现兴趣的平台。下午的时间里，球场上传来欢声笑语，艺术教室里弥漫着创意的氛围，社团活动中形成了一个个小家庭。这些活动不仅让学生们全面发展，更增添了校园生活的丰富多彩。",//反馈内容
                status: true,
                date: "2024-01-01",
            },
            {
                id: "4",
                title: "美好的四天",
                rating: "4",
                content: "学生们的日常生活充满了丰富多彩的课堂体验。每天早晨，他们会走进各式各样的教室，迎接着不同学科的知识冲击。上完一堂数学课，接着便是生物实验或者文学讨论。在这个知识的海洋中，他们用思考和互动搭建着知识的桥梁，培养着综合素养。而且，有趣的老师和生动的课程设置，让课堂变得更加生动活泼。",//反馈内容
                status: false,
                date: "2024-01-01",
            },
            {
                id: "5",
                title: "美好的五天",
                rating: "5",
                content: "学生们的日常生活充满了丰富多彩的课堂体验。每天早晨，他们会走进各式各样的教室，迎接着不同学科的知识冲击。上完一堂数学课，接着便是生物实验或者文学讨论。在这个知识的海洋中，他们用思考和互动搭建着知识的桥梁，培养着综合素养。而且，有趣的老师和生动的课程设置，让课堂变得更加生动活泼。",//反馈内容
                status: false,
                date: "2024-01-01", 
            }
        ],
        clubRating: 3,

        //是否打开弹窗
        activityFeedbackDialog: false,
    }),
    mounted() {
        //获取活动的数据
        this.fetchActivities();
        //获取该用户本身的反馈数据
        this.fetchFeedbackByUserId();
    },

    methods: {
        formatDateTime,
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        //提交社团反馈
        submitFeedback() {
            // 在这里处理提交逻辑，例如打印 feedback 中的内容
            console.log('用户反馈内容：', this.feedback);
            const feedbackData = {
                feedbackType: "SUGGESTION",
                feedbackTime: this.currentDate,
                feedbackContent: this.feedback,
                feedbackStatus: "PENDING",
                activityId: 9,     //如果是社团反馈的内容，那么活动id默认是9
                title: this.feedbackTitle,
                rating: this.clubRating,
                userId: this.userId,
                feedbackImages: ["string"]
            };
            console.log(feedbackData)
            axiosForActivity.post('/api/activity/feedbacks', feedbackData)
                .then(response => {
                    console.log('Feedback created successfully:', response.data);
                    // 在这里处理反馈创建成功的逻辑
                    this.feedback = "";
                })
                .catch(error => {
                    console.error('Error creating feedback:', error);
                    // 在这里处理反馈创建失败的逻辑
                });

        },
        //获取当前活动
        fetchActivities() {
            axiosForActivity.get('/api/activity/activities') // 替换为您的API端点
                .then(response => {
                    console.log(response);
                    this.allActivities = response.data.map(activity => ({
                        id: activity.id,
                        title: activity.title, // 假设 'activityInfo' 字段包含活动标题
                        deadline: activity.registrationEndTime, // 假设这已经是一个格式化好的字符串
                        startTime: activity.startTime,
                        endTime: activity.endTime,
                        location: activity.location,
                        content: activity.activityInfo, // 假设 'organizeDetails' 字段包含活动内容
                        image: activity.adImages?.[0] || 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', // 使用第一张广告图片或默认图片
                        limited: activity.estimatedLimit, //活动限制的报名人数
                        cost: activity.cost,             //活动报名的费用
                        adImages: activity.adImages,
                        currentParticipants: activity.currentParticipants, //当前活动的报名人数      

                    }));
                    // 删除 id 为 9 的那一项
                    this.allActivities = this.allActivities.filter(activity => activity.id !== 9);
                    // 按照开始时间从晚到早排序
                    this.allActivities.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                    // 可以添加错误处理逻辑
                });
        },
        //获取当前用户的所有反馈内容
        fetchFeedbackByUserId() {
            axiosForActivity.get(`/api/activity/feedbacks/user/${this.userId}`) // 替换为您的API端点
                .then(response => {
                    console.log(response);
                    this.myFeedback = response.data.map(myfeedback => ({
                        id: myfeedback.id,
                        title: myfeedback.title, 
                        rating: myfeedback.rating, // 假设这已经是一个格式化好的字符串
                        content: myfeedback.feedbackContent, // 假设 'organizeDetails' 字段包含活动内容
                        status: myfeedback.feedbackStatus=="PROCESSED",
                        date: myfeedback.feedbackTime, //当前活动的报名人数      
                    }));
                    // 按照开始时间从晚到早排序
                    this.myFeedback.sort((a, b) => new Date(b.date) - new Date(a.date));
                    console.log(this.myFeedback)
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                    // 可以添加错误处理逻辑
                });
        }
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