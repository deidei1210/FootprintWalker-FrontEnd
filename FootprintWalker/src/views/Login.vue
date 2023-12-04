
<template>
    <!-- 登陆界面 -->
    <div class="Screen">
        <div class="login">
            <div class="title text-h3 font-weight-bold">去旅行，去热爱!</div>
            <!-- <v-sheet width="300" class="mx-auto"> -->
            <v-form fast-fail @submit.prevent>
                <v-icon :icon="`mdiSvg:${mdiAccount}`"></v-icon>
                <!-- 用户姓名 -->
                <v-text-field v-model="userName" label="First name" :rules="firstNameRules"></v-text-field>
                <!-- 用户密码 -->
                <v-text-field v-model="userCode" label="Last name" :rules="lastNameRules"></v-text-field>
                <!-- 三个按钮 -->
                <v-container>
                    <!-- 登录按钮 -->
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <v-btn type="submit" class="login-button" size="x-large" density="comfortable" color="#F4A9E0">
                                登 录
                            </v-btn>
                        </v-col>
                        <!-- 注册按钮 -->
                        <v-col cols="auto">
                            <v-btn type="submit" class="register-button" size="x-large" density="comfortable"
                                color="#E7F49A">
                                注 册
                            </v-btn>
                        </v-col>
                    </v-row>
                    <!-- 忘记密码 -->
                    <v-row justify="center" align="center">
                        <v-btn type="submit" class="register-button" size="x-large" density="comfortable">
                            注 册
                        </v-btn>
                    </v-row>
                </v-container>

            </v-form>
            <!-- </v-sheet> -->
        </div>
    </div>
</template>
  
<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import {
    mdiAccount,
    mdiDelete,
    mdiPencil,
    mdiShareVariant,
} from '@mdi/js'
export default {
    data: () => ({
        mdiAccount,
        mdiDelete,
        mdiPencil,
        mdiShareVariant,
    }),
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

.login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    overflow: hidden;
}

.login-button {
    margin-right: 20px;
}

.register-button {
    margin-left: 20px;
}
</style>