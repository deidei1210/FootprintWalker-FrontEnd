<template>
    <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
            <v-btn color="deep-purple-lighten-2" v-bind="props">
                {{ button }}
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">我的反馈</span>
            </v-card-title>
            <v-row style="margin-left:40px;margin-top:20px;">
                <div class="text-h7" style="margin-top:5px;">我的评分：</div>
                <v-rating v-model="rating" hover :length="5" :size="32" color="amber" active-color="amber" />
                <div class="text-grey ms-4 text-caption" style="position:relative;margin-top:8px;">
                    {{ rating }}
                </div>
            </v-row>
            <v-card-text>
                <v-container>
                    <v-textarea prepend-icon="mdi-pen" v-model="feedbackTitle" label="标题" variant="outlined" rows="1"
                        cols="10"></v-textarea>
                    <v-textarea v-model="feedback" label="我对此次活动的反馈......" variant="outlined" rows="20"
                        prepend-icon="mdi-comment"></v-textarea>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-accent-2 mr-5" variant="outlined" @click="dialog = false">
                    关闭
                </v-btn>
                <v-btn color="deep-purple-lighten-2 ml-2" variant="outlined" @click="createFeedback" :loading="loading">
                    提交
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout"
        style="position:fixed;top:50%;left:5%; height:100px;">
        {{ snackbar.message }}<v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
    </v-snackbar>
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
            required: true
        }
    },
    data: () => ({
        loading: false,

        dialog: false,
        userId: 1,
        rating: 3,
        feedback: "",
        feedbackTitle: "",
        currentDate: new Date(),

        snackbar: {
            show: false,
            message: "",
            color: '',
            timeout: 3000, // Snackbar显示的时间（毫秒）
        },
    }),
    methods: {
        formatDateTime,
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        createFeedback() {
            this.loading = true;

            const feedbackData = {
                feedbackType: "SUGGESTION",
                feedbackTime: this.currentDate,
                feedbackContent: this.feedback,
                feedbackStatus: "PENDING",
                activityId: this.activity.id,
                title: this.feedbackTitle,
                rating: this.rating,
                userId: this.userId,
                feedbackImages: ["string"]
            };

            axiosForActivity.post('/api/activity/feedbacks', feedbackData)
                .then(response => {
                    console.log('Feedback created successfully:', response.data);
                    // 在这里处理反馈创建成功的逻辑
                    this.showSnackbar('提交成功！', '#B9F6CA');
                })
                .catch(error => {
                    console.error('Error creating feedback:', error);
                    // 在这里处理反馈创建失败的逻辑
                    this.showSnackbar('提交失败，请重试', 'error');
                })
                .finally(() => {
                    this.dialog = false;
                    this.loading = false;
                });
        },
        showSnackbar(message, color) {
            this.snackbar.message = message;
            this.snackbar.color = color;
            this.snackbar.show = true;

            // 可以在一定时间后关闭Snackbar，这里使用setTimeout
            setTimeout(() => {
                this.snackbar.show = false;
            }, this.snackbar.timeout);
        },
    }
}
</script>
