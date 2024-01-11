<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ props }">
                <v-btn color="deep-purple-lighten-2" variant="outlined" v-bind="props">
                    活动详情
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ activity.title }}</span>
                </v-card-title>
                <v-card-subtitle>活动报名截止日期：{{ formatDateTime(activity.deadline) }}</v-card-subtitle>
                <v-divider></v-divider>
                <div style="width: 75%;">
                    <v-carousel cycle height="330" hide-delimiter-background show-arrows="hover" :interval="4000"
                        style="margin-top:25px;margin-bottom:25px;border-radius: 5px;margin-left:17%;">
                        <v-carousel-item v-for="(image, i) in activity.adImages" :key="i" :src="image"
                            cover></v-carousel-item>
                    </v-carousel>
                </div>
                <v-card-text>
                    【活动地点】：{{ activity.location }}
                </v-card-text>
                <v-card-text>
                    【活动时间】：{{ formatDateTime(activity.startTime) }} 到 {{
                        formatDateTime(activity.endTime)
                    }}
                </v-card-text>
                <v-card-text>
                    【报名费用】：{{ activity.cost }}元
                </v-card-text>
                <v-card-text>
                    【人数限制】：{{ activity.limited }}人
                </v-card-text>
                <v-card-text>
                    【活动介绍】：{{ activity.content }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple-lighten-2" variant="outlined" @click="dialog = false">
                        关 闭
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { formatDateTime } from "@/tools/Format.js";
export default {
    props: {
        activity: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            dialog: false,
        }
    },
    methods: {
        formatDateTime,
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    }
}
</script>