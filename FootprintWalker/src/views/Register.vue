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
                    <v-container style="position:relative;left:157px;top:41px;max-width: 400px;margin-left: 48px;">
                        <!-- 选择校区 -->
                        <v-row justify="start">
                            <v-select v-model="campus" style="max-width: 150px;" label="请选择校区"
                                :items="['四平路校区', '嘉定校区', '彰武校区', '沪西校区']" variant="outlined" density="compact"
                                color="#F65353"></v-select>
                        </v-row>
                        <!-- 输入姓名和学号 -->
                        <v-row justify="start">
                            <v-col style="padding:0px;">
                                <v-text-field v-model="username" style="max-width: 150px;" label="请输入姓名"
                                    prepend-inner-icon="mdi-account" variant="outlined" density="compact"
                                    color="#F65353"></v-text-field>
                            </v-col>
                            <v-col style="padding:0px;">
                                <v-text-field v-model="studentNumber" style="max-width: 150px;" label="请输入学号"
                                    prepend-inner-icon="mdi-numeric" variant="outlined" density="compact"
                                    color="#F65353"></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- 输入性别 -->
                        <v-row justify="start">
                            <span style="color:rgb(115,115,115);position:relative;top:2px;">性别：</span>
                            <v-radio-group inline density="compact">
                                <v-radio label="男" value="one" color="red"></v-radio>
                                <v-radio label="女" value="two" color="red"></v-radio>
                            </v-radio-group>
                        </v-row>
                        <!-- 输入电话号码，并获取验证码 -->
                        <v-row justify="start">
                            <v-text-field v-model="telephone" style="max-width: 200px;" label="请输入电话号码"
                                prepend-inner-icon="mdi-phone" variant="outlined" density="compact"
                                color="#F65353"></v-text-field>
                            <v-btn style=" margin-left: 20px;" outlined dark color="#F65353" size="large" type="submit"
                                variant="elevated" width="130" @click="getVerifyCode" density="compact">
                                获取验证码
                            </v-btn>
                        </v-row>
                        <!-- 输入验证码 -->
                        <v-row justify="start">
                            <v-text-field v-model="verifyCode" style="max-width: 200px;" label="请输入验证码"
                                prepend-inner-icon="mdi-counter" variant="outlined" density="compact"
                                color="#F65353"></v-text-field>
                        </v-row>
                        <!-- 设置密码 -->
                        <v-row justify="start">
                            <v-text-field v-model="password" style="max-width: 200px;" label="设置密码"
                                prepend-inner-icon="mdi-lock" variant="outlined" density="compact" color="#F65353"
                                type="password" clearable></v-text-field>
                            <v-btn style=" margin-left: 20px;" outlined dark color="#F65353" size="large" type="submit"
                                variant="elevated" width="130" @click="getVerifyCode" density="compact">
                                确 认
                            </v-btn>
                        </v-row>
                        <!-- 确认密码 -->
                        <v-row justify="start">
                            <v-text-field v-model="verifyPassword" style="max-width: 200px;" label="确认密码"
                                prepend-inner-icon="mdi-check-decagram" variant="outlined" density="compact" color="#F65353"
                                type="password" clearable></v-text-field>
                        </v-row>
                    </v-container>

                    <!-- 右边那一坨 -->
                    <v-container style="position:absolute;left:526px;top:168px;max-width: 180px;margin-left: 48px;">
                        <!-- 输入学院 -->
                        <v-row justify="start">
                            <v-text-field v-model="college" style="max-width: 200px;" label="请输入学院"
                                prepend-inner-icon="mdi-school" variant="outlined" density="compact" color="#F65353"
                                clearable></v-text-field>
                        </v-row>
                        <!-- 输入年级 -->
                        <v-row justify="start">
                            <v-text-field v-model="grade" style="max-width: 200px;" label="请输入年级"
                                prepend-inner-icon="mdi-timer" variant="outlined" density="compact" color="#F65353"
                                clearable></v-text-field>
                        </v-row>
                        <!-- 输入专业 -->
                        <v-row justify="start">
                            <v-text-field v-model="major" style="max-width: 200px;" label="请输入专业"
                                prepend-inner-icon="mdi-pen" variant="outlined" density="compact" color="#F65353"
                                clearable></v-text-field>
                        </v-row>
                    </v-container>
                    <!-- 确认按钮 -->
                    <v-btn :loading="registerLoading" style="position:absolute;right:72px;bottom:100px;" color="#F65353"
                        size="large" type="submit" variant="elevated" width="130" @click="submitRegisterForm">
                        起 航
                    </v-btn>
                </v-form>
                <!-- 显示输入内容，在机票的最右边 -->
                <v-container style="position:absolute;right:37px;top:98px;max-width: 280px;margin-left: 48px;">
                    <div class="text-h7 font-weight-bold" style="color:#F65353;">{{ campus }}</div>
                    <div class="text-h7 font-weight-bold" style="color:#F65353;margin-top: 48px;margin-left:27px;">
                        <span>{{ date }}</span>
                        <span style="margin-left:101px;">{{ Time }}</span>
                    </div>
                    <div class="text-h4 font-weight-bold" style="color:#272626;margin-top: 48px;margin-left:100px;">
                        {{ username }}
                    </div>
                </v-container>
            </v-img>

        </div>
        <!-- 校外注册 -->
        <div v-if="outUniRegister"  class="Register">
            <div class="title text-h3 font-weight-bold">校 外 注 册</div>
            <!-- 显示机票背景图片 -->
            <v-img :width="2600" aspect-ratio="16/9" cover src="../assets/Ticket.png"
                style="margin-top: 20px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">
                <!-- 注册表单 -->
                <v-form v-model="form" @submit.prevent="onSubmit">
                    <!-- 左边那一块表单，包括校区，姓名，学号等 -->
                    <v-container style="position:relative;left:157px;top:41px;max-width: 400px;margin-left: 48px;">
                        <!-- 选择校区 -->
                        <v-row justify="start">
                            <v-select v-model="campus" style="max-width: 150px;" label="请选择校区"
                                :items="['四平路校区', '嘉定校区', '彰武校区', '沪西校区']" variant="outlined" density="compact"
                                color="#F65353"></v-select>
                        </v-row>
                        <!-- 输入姓名和学号 -->
                        <v-row justify="start">
                            <v-col style="padding:0px;">
                                <v-text-field v-model="username" style="max-width: 150px;" label="请输入姓名"
                                    prepend-inner-icon="mdi-account" variant="outlined" density="compact"
                                    color="#F65353"></v-text-field>
                            </v-col>
                            <v-col style="padding:0px;">
                                <v-text-field v-model="studentNumber" style="max-width: 150px;" label="请输入学号"
                                    prepend-inner-icon="mdi-numeric" variant="outlined" density="compact"
                                    color="#F65353"></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- 输入性别 -->
                        <v-row justify="start">
                            <span style="color:rgb(115,115,115);position:relative;top:2px;">性别：</span>
                            <v-radio-group inline density="compact">
                                <v-radio label="男" value="one" color="red"></v-radio>
                                <v-radio label="女" value="two" color="red"></v-radio>
                            </v-radio-group>
                        </v-row>
                        <!-- 输入电话号码，并获取验证码 -->
                        <v-row justify="start">
                            <v-text-field v-model="telephone" style="max-width: 200px;" label="请输入电话号码"
                                prepend-inner-icon="mdi-phone" variant="outlined" density="compact"
                                color="#F65353"></v-text-field>
                            <v-btn style=" margin-left: 20px;" outlined dark color="#F65353" size="large" type="submit"
                                variant="elevated" width="130" @click="getVerifyCode" density="compact">
                                获取验证码
                            </v-btn>
                        </v-row>
                        <!-- 输入验证码 -->
                        <v-row justify="start">
                            <v-text-field v-model="verifyCode" style="max-width: 200px;" label="请输入验证码"
                                prepend-inner-icon="mdi-counter" variant="outlined" density="compact"
                                color="#F65353"></v-text-field>
                        </v-row>
                        <!-- 设置密码 -->
                        <v-row justify="start">
                            <v-text-field v-model="password" style="max-width: 200px;" label="设置密码"
                                prepend-inner-icon="mdi-lock" variant="outlined" density="compact" color="#F65353"
                                type="password" clearable></v-text-field>
                            <v-btn style=" margin-left: 20px;" outlined dark color="#F65353" size="large" type="submit"
                                variant="elevated" width="130" @click="getVerifyCode" density="compact">
                                确 认
                            </v-btn>
                        </v-row>
                        <!-- 确认密码 -->
                        <v-row justify="start">
                            <v-text-field v-model="verifyPassword" style="max-width: 200px;" label="确认密码"
                                prepend-inner-icon="mdi-check-decagram" variant="outlined" density="compact" color="#F65353"
                                type="password" clearable></v-text-field>
                        </v-row>
                    </v-container>

                    <!-- 右边那一坨 -->
                    <v-container style="position:absolute;left:526px;top:168px;max-width: 180px;margin-left: 48px;">
                        <!-- 输入学院 -->
                        <v-row justify="start">
                            <v-text-field v-model="college" style="max-width: 200px;" label="请输入学院"
                                prepend-inner-icon="mdi-school" variant="outlined" density="compact" color="#F65353"
                                clearable></v-text-field>
                        </v-row>
                        <!-- 输入年级 -->
                        <v-row justify="start">
                            <v-text-field v-model="grade" style="max-width: 200px;" label="请输入年级"
                                prepend-inner-icon="mdi-timer" variant="outlined" density="compact" color="#F65353"
                                clearable></v-text-field>
                        </v-row>
                        <!-- 输入专业 -->
                        <v-row justify="start">
                            <v-text-field v-model="major" style="max-width: 200px;" label="请输入专业"
                                prepend-inner-icon="mdi-pen" variant="outlined" density="compact" color="#F65353"
                                clearable></v-text-field>
                        </v-row>
                    </v-container>
                    <!-- 确认按钮 -->
                    <v-btn :loading="registerLoading" style="position:absolute;right:72px;bottom:100px;" color="#F65353"
                        size="large" type="submit" variant="elevated" width="130" @click="submitRegisterForm">
                        起 航
                    </v-btn>
                </v-form>
                <!-- 显示输入内容，在机票的最右边 -->
                <v-container style="position:absolute;right:37px;top:98px;max-width: 280px;margin-left: 48px;">
                    <div class="text-h7 font-weight-bold" style="color:#F65353;">{{ campus }}</div>
                    <div class="text-h7 font-weight-bold" style="color:#F65353;margin-top: 48px;margin-left:27px;">
                        <span>{{ date }}</span>
                        <span style="margin-left:101px;">{{ Time }}</span>
                    </div>
                    <div class="text-h4 font-weight-bold" style="color:#272626;margin-top: 48px;margin-left:100px;">
                        {{ username }}
                    </div>
                </v-container>
            </v-img>

        </div>

    </div>
</template>
  
<script>
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
    data: () => ({
        //控制此时页面的状态
        chooseRegister: 1,        //当这个值为1的时候表示用户正在选择注册的方式
        uniRegister: 0,           //当这个值为1的时候表示用户选择在校注册
        outUniRegister: 0,       //当这个值为1的时候表示用户选择校外注册
        registerLoading: false,   //表示默认的提交表单的按钮状态不是正在加载中的
        form: false,             //表单状态
        //用户填写的信息
        campus: "",              //用户校区
        username: "",            //用户姓名
        studentNumber: "",       //用户学号
        telephone: "",            //用户电话
        verifyCode: "",           //验证码
        password: "",             //用户的密码
        verifyPassword: "",       //确认密码
        college: "",               //学院
        major: "",                 //专业
        grade: "",                //年级
        //获取当前时间和日期
        Time: "",                  //当前时间
        date: "",                  //当前日期
    }),
    mounted() {
        const now = new Date();
        this.Time = now.toLocaleTimeString();
        this.date = now.toLocaleDateString();
    },
    methods: {
        //处校内注册逻辑
        UniRegisterHandler() {
            this.chooseRegister = 0;
            this.uniRegister = 1;
            this.outUniRegister = 0;
        },
        //处理校外注册逻辑
        OutUniRegisterHandler() {
            this.chooseRegister = 0;
            this.outUniRegister = 1;
            this.uniRegister = 0;
        },
        //处理忘记密码逻辑
        forgotPasswordHandler() {
            //将用户重定向到重新设置密码的界面
            this.$router.push('/set-code')

        },

        //获取手机验证码
        getVerifyCode() {

        },
        //用户填完所有的表单项目，进行注册提交
        submitRegisterForm() {
            //表单不合法，不提交
            if (!this.form) return

            //否则提交表单内容，与后端交互，判断是否注册成功
            this.registerLoading = true
            //将用户重定向到重新设置密码的界面
            this.$router.push('/')
            setTimeout(() => (this.registerLoading = false), 2000)

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