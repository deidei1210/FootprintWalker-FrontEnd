<template>
    <!-- 注册界面 -->
    <div class="Screen">
        <!-- 选择注册方式 -->
        <div v-if="chooseRegister" class="chooseRegisterWay">
            <div class="title text-h3 font-weight-bold">注 册</div>
            <v-container style="margin:20px;">
                <v-row justify="center">
                    <v-btn :loading="loading" style=" margin-right: 20px;" color="#F4A9E0" size="large" type="submit"
                        variant="elevated" width="130" @click="UniRegisterHandler">
                        校内注册
                    </v-btn>
                    <v-btn :loading="loading" style="margin-left: 20px;" color="#E7F49A" size="large" type="submit"
                        variant="elevated" width="130" @click="OutUniRegisterHandler">
                        校外注册
                    </v-btn>
                </v-row>
            </v-container>
        </div>
        <!-- 校内注册 -->
        <div v-if="uniRegister" class="Register">
            <div class="title text-h3 font-weight-bold">校 内 注 册</div>
            <!-- 显示机票背景图片 -->
            <v-img :width="2600" aspect-ratio="16/9" cover src="../assets/Ticket.png"
                style="margin-top: 20px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">
                <!-- 注册表单 -->
                <v-form v-model="form" @submit.prevent="onSubmit">
                    <!-- 左边那一块表单，包括校区，姓名，学号等 -->
                    <v-container style="position:relative;left:157px;top:41px;">
                        <v-row justify="start">
                            <v-select style="max-width: 150px;" label="请选择校区" :items="['四平路校区', '嘉定校区', '彰武校区', '沪西校区']"
                                variant="outlined" density="comfortable" color="#F65353"></v-select>
                        </v-row>
                    </v-container>

                </v-form>
            </v-img>

        </div>
        <!-- 校外注册 -->
        <div v-if="outUniRegister">

        </div>

    </div>
</template>
  
<script>
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
    data: () => ({
        chooseRegister: 1,        //当这个值为1的时候表示用户正在选择注册的方式
        uniRegister: 0,           //当这个值为1的时候表示用户选择在校注册
        outUniRegister: 0,       //当这个值为1的时候表示用户选择校外注册
    }),
    methods: {
        //处校内注册逻辑
        UniRegisterHandler() {
            this.chooseRegister = 0;
            this.uniRegister = 1;
        },
        //处理校外注册逻辑
        OutUniRegisterHandler() {
            this.chooseRegister = 0;
            this.outUniRegister = 1;
        },
        //处理忘记密码逻辑
        forgotPasswordHandler() {
            //将用户重定向到重新设置密码的界面
            this.$router.push('/set-code')

        },
    },
}


</script>

<style>
.Screen {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/loginBackgroundImage.png);
    background-size: 100%;
}

.title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #E7F49A;
}

.chooseRegisterWay {
    position: absolute;
    left: 50%;
    top: 50%;

    margin: -190px 0 0 -175px;
    border-radius: 5px;
    overflow: hidden;
}

.Register {
    position: absolute;
    left: 22%;
    top: 43%;
    width: 1301px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    overflow: hidden;
}
</style>