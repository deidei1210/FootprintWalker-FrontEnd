<template>
    <div class="text-center">
        <v-btn color="deep-purple-lighten-2" @click="dialog = true">
            查看反馈进度
        </v-btn>

        <v-dialog v-model="dialog" width="auto">
            <v-container>
                <v-card>
                    <v-card-title>{{ myFeedback.title }}</v-card-title>
                    <v-card-subtitle>{{ myFeedback.date }}</v-card-subtitle>
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
                    <v-card-subtitle>{{ myFeedback.reply.time }}</v-card-subtitle>
                    <v-card-text>{{ myFeedback.reply.content }}</v-card-text>

                    <v-card-actions>
                        <v-btn color="deep-purple-lighten-2" block @click="dialog = false">Close Dialog</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-dialog>

    </div>
</template>
<script>
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
        }
    },
}
</script>