<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="deep-purple-lighten-2" v-bind="props" variant="outlined" @click="reserve"
                    :disabled="isRegistrationClosed">
                    {{ registrationButtonText }}
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ activity.title }}报名</span>
                </v-card-title>
                <v-card-text>
                    <div class="text-h5 text-center">活动安全须知</div>
                    <div>
                        1. 所有参加活动人员在活动开始前应阅读《活动安全须知》。<br>

                        2. 所有参加活动人员应遵守《活动安全须知》所列条款，配合活动的安全实施。<br>

                        3.参与者应对自身的健康状况做出正确判断，患有各种慢性疾病，突发疾病，心脏病，高血压等，不宜参加所有项目的应提前告知，并带好必要的药品和做好自我预防。在活动中如出现身体不适，请及时告知领队或工作人员，作相应处理。<br>

                        4. 参加活动人员应着适宜运动的服装，鞋子，装备，减少安全隐患。<br>

                        5. 在活动过程当中，参与者应当听从领队的指导，避免擅自做出违反操作规范的行为。<br>

                        6. 在活动过程当中，参与者应当在活动许可的范围内进行活动，不要离开规定场地，前往无安全保障措施的区域，不要进行危险举动。<br>

                        7. 在活动过程当中，如遇紧急情况，不要惊慌，应及时与领队或工作人员联系，切勿擅自进行不当的处理。<br>

                        8. 在活动过程当中，参与者之间应当互相帮助，团队负责人应随时了解队伍的整体情况，配合活动的安全实施。<br>

                        9. 在野外活动时，不要采摘食用野生植物，不要饮用不明来源的泉水，避免中毒。<br>

                        10. 在活动过程当中，所有参加活动人员应注意自我保护，提高安全意识，集体意识，确保活动安全有序。<br>


                        <div class="text-h5 text-center ma-3">同济大学足迹行者社团免责声明书</div>

                        所有参与者务必详细阅读此《免责声明》。活动报名者均视为同意自愿接受遵守和服从《免责声明》的内容。出发前，务必签署此《免责声明》，不签署者不得参加活动。对于活动中不遵守本《免责声明》者，领队保留使其离开活动的权利，恶劣者将被列入活动黑名单。<br>

                        1.本社团所有活动采取自愿参加、费用自理、责任自担的原则：参与者应为年满18岁、具有完全民事行为能力的自然人（未年满18岁的人员须告知家长相关活动内容并经由家长同意），自愿接受并遵守活动发布内容中的规则和事项。<br>

                        2. 活动参与者在活动中，应听从领队及工作人员的带领。活动参与者若发生意外，其后果由参与者自行独自承担。领队人员有因天气或其他安全因素取消或调整线路的权力。<br>

                        3. 活动参与者已确认自己充分了解本次活动的路线，确认自己有充分的身体、心理和物质上的准备来参加此次活动。<br>

                        4. 对于突发性状况造成的活动参与者损失，由活动参与者承担。<br>

                        <div class="text-right">同济大学足迹行者社团</div>

                        <div class="text-right">{{ formatDateTime(currentDate) }}</div>

                        <div class="text-right">本声明即日生效!</div>
                    </div>
                </v-card-text>
                <v-checkbox class="ml-4" v-model="checkbox" color="deep-purple-lighten-2" aria-required="true">
                    <template v-slot:label>
                        <div>
                            我已阅读以上内容，并接受安全须知和免责声明书
                        </div>
                    </template>
                </v-checkbox>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-5" color="red-accent-2" variant="outlined" @click="dialog = false">
                        关 闭
                    </v-btn>
                    <v-btn class="ml-2" color="deep-purple-lighten-2" variant="outlined" @click="dialog = false">
                        报 名
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
    data: () => ({
        dialog: false,
        currentDate: new Date(),
        checkbox: false,
    }),
    computed: {
        isRegistrationClosed() {
            const currentDate = new Date();
            const deadlineDate = new Date(this.activity.deadline);
            // 比较当前时间和报名截止日期
            return currentDate > deadlineDate;
        },
        registrationButtonText() {
            return this.isRegistrationClosed ? '已截止' : '我要报名';
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