<template>
    <!-- 重置密码界面 -->
    <div class="Screen">
        <div class="findCode">
            <div class="title text-h3 font-weight-bold">找 回 密 码</div>
            <!-- 使用了 @submit.prevent 监听表单的提交事件，并调用 onSubmit 方法进行处理。.prevent 修饰符阻止了表单的默认提交行为，从而可以使用自定义的提交方法进行处理。 -->
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-row>
                    <!-- 输入用户名 -->
                    <v-col cols="12" md="12">
                        <v-text-field v-model="newPassword" :readonly="loading" :rules="[required]" class="mb-2" clearable
                            label="请输入新密码" prepend-inner-icon="mdi-lock" variant="solo" type="password"></v-text-field>
                    </v-col>
                    <!-- 输入手机号 -->
                    <v-col cols="12" md="12">
                        <v-text-field v-model="verifyNewPassword" :readonly="loading" :rules="[required]" label="请确认新密码"
                            placeholder="请确认新密码" prepend-inner-icon="mdi-lock" variant="solo" type="password" clearable></v-text-field>
                    </v-col>
                </v-row>

                <!-- 其他表单项和按钮 -->
                <br>
                <v-container>
                    <v-row justify="center">
                        <v-btn :loading="loading" style="margin-right: 20px;" color="#E7F49A" size="large" type="submit"
                            variant="elevated" width="130" @click="submitHandler">
                            确 认
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </div>

    </div>
</template>
  
<script>
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
    data: () => ({
        form: false,
        newPassword:"",
        verifyNewPassword:"",
        loading: false,
    }),
    methods: {
        onSubmit() {
            //表单不合法，不提交
            if (!this.form) return

            //否则提交表单内容，与后端交互，判断是否能够登录
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        // required(v) {
        //     return !!v || 'Field is required'
        // },
        //处理登录逻辑
        submitHandler() {
            //检查表单是否有效，如果无效，则返回
            if (!this.form) return

            //执行登录逻辑，成功后重定向到主页
            this.loading = true

            setTimeout(() => {
                this.loading = false
                //重定向到主页
                this.$router.push('/')
            }, 2000)
        },
        //获取验证码
        getVerifyCode() {
            //检查表单是否有效，如果无效，则返回
            if (!this.form) return

            //执行登录逻辑，成功后重定向到主页
            this.loading = true

            setTimeout(() => {
                this.loading = false
            }, 2000)
        }
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
    margin-bottom: 15px;
}

.findCode {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    overflow: hidden;
}

.login-card {
    margin: 30px;
}
</style>