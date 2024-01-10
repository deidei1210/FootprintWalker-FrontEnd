
<template>
    <!-- <script src="./src/snow.js"></script> -->
    <!-- 登陆界面 -->
    <div class="Screen">
        <div class="login">
            <div class="title text-h3 font-weight-bold">去旅行，去热爱!</div>
            <v-card class="mx-auto px-6 py-8 login-card" max-width="400">
                <!-- 使用了 @submit.prevent 监听表单的提交事件，并调用 onSubmit 方法进行处理。.prevent 修饰符阻止了表单的默认提交行为，从而可以使用自定义的提交方法进行处理。 -->
                <v-form v-model="form" @submit.prevent="onSubmit">
                    <!-- 输入账号 -->
                    <v-text-field v-model="userAccount" :readonly="loading" :rules="[required]" class="mb-2" clearable
                        label="Account" prepend-icon="mdi-account"></v-text-field>
                    <!-- 输入密码 -->
                    <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                        placeholder="Enter your password" prepend-icon="mdi-lock" type="password"></v-text-field>

                    <br>
                    <v-container>
                        <v-row justify="center">
                            <v-btn :loading="loading" style=" margin-right: 20px;" color="#F4A9E0" size="large"
                                type="submit" variant="elevated" width="130" @click="loginHandler">
                                登 录
                            </v-btn>
                            <v-btn :loading="loading" style="margin-left: 20px;" color="#E7F49A" size="large" type="submit"
                                variant="elevated" width="130" @click="registerHandler">
                                注 册
                            </v-btn>
                        </v-row>
                        <v-row justify="center">
                            <v-btn :loading="loading" style="margin-top: 20px;" color="gray" size="small" type="submit"
                                variant="text" width="130" @click="forgotPasswordHandler">
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
} from '@mdi/js';
import axios from 'axios';
export default {
    data: () => ({
        mdiAccount,

        form: false,
        userAccount: null,
        password: null,
        loading: false,
    }),
    mounted() {
        const script = document.createElement('script')
        script.src = './src/snow.js'
        document.body.appendChild(script)
    },
    methods: {
        onSubmit() {
            //表单不合法，不提交
            if (!this.form) return

            //否则提交表单内容，与后端交互，判断是否能够登录
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        required(v) {
            return !!v || 'Field is required'
        },
        //处理登录逻辑
        loginHandler() {
          if (!this.form) return;

          this.loading = true;

          // const params = {
          //   id: this.userAccount,
          //   password: this.password,
          // };
          // // 构建查询参数
          // const params = new URLSearchParams();
          // params.append('id', this.userAccount);
          // params.append('password', this.password);

          // console.log("params",params);
          // axios.post('/api/human_management/members/login',null, {
          //   params: {
          //     id: this.userAccount,
          //     password: this.password,
          //   }
          // })
          axios.post("api/human_managament/members/login?id=7&password=7")
            .then(response => {
              console.log('Login successful', response);
              // 登录成功后的操作，例如重定向
              this.$router.push('/home-page');
            })
            .catch(error => {
              console.error('Login failed', error);
              // 登录失败后的操作
            })
            .finally(() => {
              this.loading = false;
            });

        },
        //处理注册逻辑
        registerHandler() {
            //执行注册逻辑，将用户重定向到注册页面
            this.$router.push('/register')
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
