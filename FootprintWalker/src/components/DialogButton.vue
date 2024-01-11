<template>
    <div class="text-center">
        <v-btn color="primary" @click="dialog = true">
            {{ button }}
        </v-btn>

        <v-dialog v-model="dialog" width="auto">
            <v-container class="dialog-container">
                <v-row v-for="feedback in feedbackList" :key="feedback.id">
                    <v-card style="margin-top:5px;margin-bottom: 5px;">
                        <v-card-title>{{ feedback.title }}</v-card-title>
                        <v-card-subtitle>{{ feedback.feedbackTime }}</v-card-subtitle>
                        
                        <v-row align="center" class="mx-0">
                            <v-rating :model-value="feedback.rating" color="amber" density="compact" half-increments readonly
                                size="x-small" style="margin-left:15px;"></v-rating>
                            <div class="text-grey ms-4 text-caption" style="position:relative;margin-top:8px;">
                                {{feedback.rating}}
                            </div>
                        </v-row>

                        <v-card-text>
                            {{ feedback.content }}
                        </v-card-text>

                    </v-card>
                </v-row>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">关闭对话框</v-btn>
                </v-card-actions>
            </v-container>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    props: {
        button: {
            type: String,
            required: true,
        },
        feedbackList: {
            type: Array,
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