<template>
    <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
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
                <v-btn color="blue-darken-1" variant="outlined" @click="dialog = false">
                    关闭
                </v-btn>
                <v-btn color="blue-darken-1" variant="outlined" @click="dialog = false">
                    提交
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        button: {
            type: String,
            required: true,
        }
    },
    data: () => ({
        dialog: false,
        rating: 3,
        feedback: "",
        feedbackTitle:"",
    }),
}
</script>
