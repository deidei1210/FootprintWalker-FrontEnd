<template>
    <v-row justify="center">
        <v-btn v-if="assigned" color="amber-accent-4" variant="outlined" @click="dialog4 = true"
            :disabled="isRegistrationClosed">
            取消报名
        </v-btn>
        <v-btn v-else color="deep-purple-lighten-2" variant="outlined" @click="dialog1 = true"
            :disabled="isRegistrationClosed">
            我要报名
        </v-btn>

        <!-- 阅读免责声明 -->
        <v-dialog v-model="dialog1" persistent width="1024">
            <!-- <template v-slot:activator="{ props }">

            </template> -->
            <v-card id="dropdown">
                <v-card-title>
                    <span class="text-h5">{{ activity.title }}报名</span>
                </v-card-title>
                <v-card-text>
                    <div class="text-h5 text-center">活动安全须知</div>
                    <div>
                        1. 所有参加活动人员在活动开始前应阅读《活动安全须知》。<br />

                        2. 所有参加活动人员应遵守《活动安全须知》所列条款，配合活动的安全实施。<br />

                        3.参与者应对自身的健康状况做出正确判断，患有各种慢性疾病，突发疾病，心脏病，高血压等，不宜参加所有项目的应提前告知，并带好必要的药品和做好自我预防。在活动中如出现身体不适，请及时告知领队或工作人员，作相应处理。<br />

                        4. 参加活动人员应着适宜运动的服装，鞋子，装备，减少安全隐患。<br />

                        5.
                        在活动过程当中，参与者应当听从领队的指导，避免擅自做出违反操作规范的行为。<br />

                        6.
                        在活动过程当中，参与者应当在活动许可的范围内进行活动，不要离开规定场地，前往无安全保障措施的区域，不要进行危险举动。<br />

                        7.
                        在活动过程当中，如遇紧急情况，不要惊慌，应及时与领队或工作人员联系，切勿擅自进行不当的处理。<br />

                        8.
                        在活动过程当中，参与者之间应当互相帮助，团队负责人应随时了解队伍的整体情况，配合活动的安全实施。<br />

                        9. 在野外活动时，不要采摘食用野生植物，不要饮用不明来源的泉水，避免中毒。<br />

                        10.
                        在活动过程当中，所有参加活动人员应注意自我保护，提高安全意识，集体意识，确保活动安全有序。<br />

                        <div class="text-h5 text-center ma-3">同济大学足迹行者社团免责声明书</div>

                        所有参与者务必详细阅读此《免责声明》。活动报名者均视为同意自愿接受遵守和服从《免责声明》的内容。出发前，务必签署此《免责声明》，不签署者不得参加活动。对于活动中不遵守本《免责声明》者，领队保留使其离开活动的权利，恶劣者将被列入活动黑名单。<br />

                        1.本社团所有活动采取自愿参加、费用自理、责任自担的原则：参与者应为年满18岁、具有完全民事行为能力的自然人（未年满18岁的人员须告知家长相关活动内容并经由家长同意），自愿接受并遵守活动发布内容中的规则和事项。<br />

                        2.
                        活动参与者在活动中，应听从领队及工作人员的带领。活动参与者若发生意外，其后果由参与者自行独自承担。领队人员有因天气或其他安全因素取消或调整线路的权力。<br />

                        3.
                        活动参与者已确认自己充分了解本次活动的路线，确认自己有充分的身体、心理和物质上的准备来参加此次活动。<br />

                        4. 对于突发性状况造成的活动参与者损失，由活动参与者承担。<br />

                        <div class="text-right">同济大学足迹行者社团</div>

                        <div class="text-right">{{ formatDateTime(currentDate) }}</div>

                        <div class="text-right">本声明即日生效!</div>
                    </div>
                </v-card-text>
                <v-checkbox class="ml-4" v-model="checkbox" color="deep-purple-lighten-2" aria-required="true">
                    <template v-slot:label>
                        <div id="confirm">我已阅读以上内容，并接受安全须知和免责声明书</div>
                    </template>
                </v-checkbox>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-5" color="red-accent-2" variant="outlined" @click="dialog1 = false">
                        关 闭
                    </v-btn>
                    <v-btn class="ml-2" color="deep-purple-lighten-2" variant="outlined" @click="handleRegistration"
                        id="assign2">
                        报 名
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 报名确认 -->
        <v-dialog v-model="dialog2" persistent width="1024">
            <v-card>
                <v-card-title> 报名确认 </v-card-title>
                <v-card-text> 您确定要报名吗？ </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red-accent-2 mr-5" variant="outlined" @click="dialog2 = false">
                        取 消
                    </v-btn>
                    <v-btn color="deep-purple-lighten-2 ml-2" variant="outlined" @click="RegisterTheActivity"
                        :loading="loading2" id="assign3">
                        确 定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 提示阅读免责声明 -->
        <v-dialog v-model="dialog3" persistent width="1024">
            <v-card>
                <v-card-title> 提 示 </v-card-title>
                <v-card-text> 请先阅读并勾选免责声明！ </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple-lighten-2" variant="outlined" @click="dialog3 = false">
                        关 闭
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 提示是否取消报名 -->
        <v-dialog v-model="dialog4" persistent width="1024">
            <v-card>
                <v-card-title> 提 示 </v-card-title>
                <v-card-text> 您确定取消报名{{ activity.title }}吗？ </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red-accent-2 mr-5" variant="outlined" @click="dialog4 = false">
                        不 取 消
                    </v-btn>
                    <v-btn color="deep-purple-lighten-2 ml-2" variant="outlined" @click="CancelRegisterTheActivity"
                        :loading="loading4">
                        确 定 取 消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout"
            style="position: fixed; top: 50%; left: 5%; height: 100px">
            {{ snackbar.message }}<v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
        </v-snackbar>
    </v-row>
</template>
<script>
import { formatDateTime } from "@/tools/Format.js";
import { axiosForActivity } from "@/main";
export default {
    props: {
        activity: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        loading2: false, //用来检测报名按钮的加载状况
        loading4: false, //用来检测取消报名的加载状况

        dialog1: false, //用来开启第一个对话框
        dialog2: false, //用来开启第二个对话框
        dialog3: false, //提示阅读免责声明
        dialog4: false, //提示是否取消报名
        userId: localStorage.getItem("id"), //用户的id
        currentDate: new Date(),
        checkbox: false,
        assigned: false, //判断用户是否已经报名
        snackbar: {
            show: false,
            message: "",
            color: "",
            timeout: 3000, // Snackbar显示的时间（毫秒）
        },
    }),

    computed: {
        //判断报名是否截止
        isRegistrationClosed() {
            const currentDate = new Date();
            const deadlineDate = new Date(this.activity.deadline);
            // 比较当前时间和报名截止日期
            return currentDate > deadlineDate;
        },
    },

    mounted() {
        this.isAssigned();
    },

    methods: {
        formatDateTime,
        reserve() {
            this.loading = true;

            setTimeout(() => (this.loading = false), 2000);
        },
        handleRegistration() {
            if (this.checkbox) {
                // 处理报名逻辑，可以在这里触发弹窗或者其他操作
                this.dialog1 = false;
                this.dialog2 = true;
            } else {
                this.dialog3 = true;
                // 如果复选框未勾选，可以给予用户提示
                // this.$toast.error('请先阅读并勾选免责声明');
            }
        },
        //报名活动，需要与数据库交互
        RegisterTheActivity() {
            this.loading2 = true;
            const activityId = this.activity.id; // 替换为实际的活动ID
            const participantId = this.userId; // 替换为实际的参与者ID
            if (this.activity.participantCount < this.activity.limited) {
                axiosForActivity
                    .put(`/api/activity/activities/${activityId}/participants/${participantId}`)
                    .then((response) => {
                        console.log(this.activity);
                        console.log(response.data);
                        // 处理成功的情况，如果有需要的话
                        this.assigned = true;
                        this.showSnackbar("报名成功！", "#B9F6CA");
                    })
                    .catch((error) => {
                        console.error("添加参与者错误:", error);
                        // 处理错误的情况，如果有需要的话
                        this.showSnackbar("报名失败，请重试", "error");
                    })
                    .finally(() => {
                        // 在请求结束后重置loading2
                        this.loading2 = false;
                        this.dialog2 = false;
                    });
            }
            else {
                alert("报名人数已满！不能报名！")
                // 在请求结束后重置loading2
                this.loading2 = false;
                this.dialog2 = false;
            }
        },
        //取消报名
        CancelRegisterTheActivity() {
            this.loading4 = true;

            const activityId = this.activity.id; // 替换为实际的活动ID
            const participantId = this.userId; // 替换为实际的参与者ID

            axiosForActivity
                .delete(`/api/activity/activities/${activityId}/participants/${participantId}`)
                .then((response) => {
                    console.log(response.data);
                    // 处理成功的情况，如果有需要的话
                    this.assigned = false;
                    this.showSnackbar("取消成功", "#B9F6CA");
                })
                .catch((error) => {
                    console.error("添加参与者错误:", error);
                    // 处理错误的情况，如果有需要的话
                    // 处理错误的情况
                    this.showSnackbar("取消失败，请重试", "error");
                })
                .finally(() => {
                    // 在请求结束后重置loading2
                    this.loading4 = false;
                    this.dialog4 = false;
                });
        },
        //判断是否用户已经报名
        isAssigned() {
            var api =
                "/api/activity/activities/" + this.activity.id + "/participants/" + this.userId;
            axiosForActivity
                .get(api) // 替换为您的API端点
                .then((response) => {
                    console.log(response);
                    if (response.data == "Participant is in the activity's participant list") {
                        this.assigned = true;
                    } else {
                        this.assigned = false;
                    }
                    console.log(this.assigned);
                    console.log(this.activity.id);
                })
                .catch((error) => {
                    console.error("Error fetching activities:", error);
                    // 可以添加错误处理逻辑
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
    },
};
</script>

