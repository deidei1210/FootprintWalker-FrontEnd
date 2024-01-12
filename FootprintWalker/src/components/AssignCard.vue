<template>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374" height="570">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img lazy-src="https://picsum.photos/id/11/100/60" cover height="250" :src="activity.image">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
            </template>
        </v-img>

        <v-card-item>
            <v-card-title>{{ activity.title }}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">报名截止日期：{{ formatDateTime(activity.deadline) }}</span>
                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <div class="text-subtitle-1">【活动地点】：{{ activity.location }}</div>
            <div class="text-subtitle-1">【活动时间】：{{ formatDateTime(activity.startTime) }} 到 {{
                formatDateTime(activity.endTime)
            }}</div>
            <div class="text-subtitle-1" style="height:70px;">【活动内容】：{{ truncatedContent }}</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-actions>
            <v-row style="margin-bottom:10px;">
                <activity-detail :activity="activity" style="margin-top:11px;"></activity-detail>
                <assign-button :activity="activity"></assign-button>
            </v-row>
        </v-card-actions>
    </v-card>
</template>
<script>
import { formatDateTime } from "@/tools/Format.js";
import AssignButton from '@/components/AssignButton.vue'
import ActivityDetail from '@/components/ActivityDetail.vue'
export default {
    //导出组件
    components: {
        AssignButton,
        ActivityDetail
    },
    props: {
        activity: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        loading: false,
        selection: 1,

    }),
    computed: {
        isRegistrationClosed() {
            const currentDate = new Date();
            const deadlineDate = new Date(this.activity.deadline);

            // console.log(currentDate);
            // console.log(deadlineDate);

            // 比较当前时间和报名截止日期
            return currentDate > deadlineDate;
        },
        registrationButtonText() {
            return this.isRegistrationClosed ? '已截止' : '我要报名';
        },
        truncatedContent() {
            // 截取活动内容的前50个字符
            const maxLength = 50;
            return this.activity.content.length > maxLength
                ? this.activity.content.substring(0, maxLength) + '...'
                : this.activity.content;
        },
    },

    methods: {
        formatDateTime,
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
}
</script>
