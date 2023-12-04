
<template>
    <!-- 登陆界面 -->
    <div class="Screen">
        <div class="login">
            <div class="title text-h3 font-weight-bold">去旅行，去热爱!</div>
            <v-card class="mx-auto px-6 py-8 login-card" max-width="400">
                <v-form v-model="form" @submit.prevent="onSubmit">
                    <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                        label="Account" prepend-icon="mdi-account"></v-text-field>

                    <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                        placeholder="Enter your password" prepend-icon="mdi-lock"></v-text-field>

                    <br>
                    <v-container>
                        <v-row justify="center">
                            <v-btn :loading="loading" style=" margin-right: 20px;" color="#F4A9E0" size="large" type="submit" variant="elevated" width="130">
                                登 录
                            </v-btn>
                            <v-btn :loading="loading" style="margin-left: 20px;" color="#E7F49A" size="large" type="submit" variant="elevated" width="130">
                                注 册
                            </v-btn>
                        </v-row>
                        <v-row justify="center">
                            <v-btn :loading="loading" style="margin-top: 20px;" color="gray" size="small" type="submit" variant="text" width="130">
                                忘记密码？
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
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
    width: 400px;
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

.login-card {
    margin: 30px;
}
</style>