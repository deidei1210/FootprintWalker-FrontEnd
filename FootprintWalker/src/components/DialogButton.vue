<template>
    <div class="text-center">
        <v-btn color="deep-purple-lighten-2" @click="dialog = true">
            {{ button }}
        </v-btn>

        <v-dialog v-model="dialog" width="auto">
            <v-container class="dialog-container">
                <v-row v-for="feedback in feedbackList" :key="feedback.id">
                    <v-card style="margin-top:5px;margin-bottom: 5px;width:100%;">
                        <v-card-title>{{ feedback.title }}</v-card-title>
                        <v-card-subtitle>{{ formatDateTime(feedback.feedbackTime) }}</v-card-subtitle>

                        <v-row align="center" class="mx-0">
                            <v-rating :model-value="feedback.rating" color="amber" density="compact" half-increments
                                readonly size="x-small" style="margin-left:15px;"></v-rating>
                            <div class="text-grey ms-4 text-caption" style="position:relative;margin-top:8px;">
                                {{ feedback.rating }}
                            </div>
                        </v-row>

                        <v-card-text>
                            {{ feedback.feedbackContent }}
                        </v-card-text>

                    </v-card>
                </v-row>
                <div v-if="feedbackLength" class="text-center">暂时没有反馈哦～</div>
                <v-card-actions>
                    <v-btn color="deep-purple-lighten-2" block @click="dialog = false">关闭对话框</v-btn>
                </v-card-actions>
            </v-container>
        </v-dialog>
    </div>
</template>
  
<script>
import { axiosForActivity } from "@/main";
import { formatDateTime } from "@/tools/Format.js";

export default {
    props: {
        button: {
            type: String,
            required: true,
        },
        activity: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialog: false,
            feedbackList: [],//获取每一个指定活动id的反馈
            feedbackListLength:0,
        }
    },
    computed:{
        feedbackLength(){
            return this.feedbackList.length==0;
        }
    },
    mounted() {
        this.getFeedbackList();
        
    },
    methods: {
        formatDateTime,
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        getFeedbackList() {
            console.log(this.activity);
            console.log(this.activity.id);
            const activityId = this.activity.id;
            axiosForActivity.get(`/api/activity/feedbacks/activity/${activityId}`) // 替换为您的API端点
                .then(response => {
                    console.log(response);

                    this.feedbackList=response.data;
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                    // 可以添加错误处理逻辑
                });
        }
    }

}
</script>
  
<style>
.dialog-container {
    background-color: #e9e9e9;
    width: 1000px;
    height: 2500px;
    overflow-y: auto;
    border-radius: 5px;
    /* 添加垂直滚动条 */
}
</style>