<template>
    <div class="text-center">
        <v-btn color="deep-purple-lighten-2" @click="getReply">
            查看反馈进度
        </v-btn>

        <v-dialog v-model="dialog" width="1000">
            <v-container>
                <v-card>
                    <v-card-title>{{ myFeedback.title }}</v-card-title>
                    <v-card-subtitle>{{ formatDateTime(myFeedback.date) }}</v-card-subtitle>
                    <v-row align="center" class="mx-0">
                        <v-rating :model-value="myFeedback.rating" color="amber" density="compact" half-increments readonly
                            size="x-small" style="margin-left:15px;"></v-rating>
                        <div class="text-grey ms-4 text-caption" style="position:relative;margin-top:8px;">
                            {{ myFeedback.rating }}
                        </div>
                    </v-row>

                    <v-card-text>
                        {{ myFeedback.content }}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-title>回复内容</v-card-title>
                    <v-card-subtitle>{{ formatDateTime(reply.replyTime) }}</v-card-subtitle>
                    <v-card-text>{{ reply.content }}</v-card-text>

                    <v-card-actions>
                        <v-btn color="deep-purple-lighten-2" block @click="dialog = false">Close Dialog</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-dialog>

    </div>
</template>
<script>
import { formatDateTime } from "@/tools/Format.js";
import { axiosForActivity } from "@/main";

export default {
    props: {
        myFeedback: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialog: false,
            reply: {
                content: "",  //回复内容
                replyTime: "",//回复时间
            },
        }
    },
    methods: {
        formatDateTime,
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },

        //需要根据反馈id获取对应的回复
        getReply() {
            this.dialog = true;
            axiosForActivity.get(`/api/activity/replies/feedback/${this.myFeedback.id}`)
                .then(response => {
                    console.log(response);
                    this.reply = response.data.map(myfeedback => ({
                        content: myfeedback.replyContent,
                        replyTime:myfeedback.replyTime
                    }));
                    console.log(this.reply)
                })
                .catch(error => {
                    console.error('Error fetching replies:', error);
                    // 可以添加错误处理逻辑
                });
        }
    }
}
</script>