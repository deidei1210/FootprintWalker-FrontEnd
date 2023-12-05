<template>
    <!-- 注册界面 -->
    <div class="Screen">
        <!-- 选择注册方式 -->
        <div class="chooseRegisterWay">
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
    </div>
</template>
  
<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
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
    width: 400px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    overflow: hidden;
}
</style>