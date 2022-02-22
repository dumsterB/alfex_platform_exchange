<template>
  <div class="settingsTab">
    <p class="text-h6">Настройки</p>
    <div class="content ma-4">
      <v-card  :class="item.active  ? 'tabs-active tabs-setting' : 'tabs-setting'"  @click="tabHandler(item)"  v-for="item of selections" :key="item.text" >
        <h3 class="tab-btn text">{{ $t(item.title) }}</h3>
        <p>{{$t(item.text)}}</p>
      </v-card>
      <p class="text-h6 success-text">{{$t('settings_notification')}}</p>
      <p class="text-gray">{{$t('settings_notification_description')}}</p>
      <v-switch
        v-model="switcher"
        :label="!switcher ? `${$t('on')}` : `${$t('off')}`"
        color="success"
      ></v-switch>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from "vuex";

export default {
  name: "settingsTab",
  data(){
    return{
      switcher:''
    }
  },
  computed:{
    ...mapGetters({storeSelections:'data/settings/selections'}),
    selections(){
      return JSON.parse(JSON.stringify(this.storeSelections))
    },
    title1(){
      return this.$t('account_settings')
    },
    text1(){
      return this.$t('personal_information')
    },
    title2(){
      return this.$t('security')
    },
    text2(){
      return this.$t('password_and_2mfa')
    }
  },
  methods:{
    ...mapMutations({changeActive:'data/settings/changeActive'}),
    tabHandler(val){
      this.changeActive(val.id)
    }
  },
}
</script>

<style scoped>
.tabs-setting {
  width: 320px;
  height: 80px!important;
  text-align: center;
  cursor: pointer;
  align-items: center;
  align-content: center;
  display: block!important;
  margin-top: 10px;
  padding: 8px;
}
.tabs-active{
  background: linear-gradient(94.9deg, #2fed59 4.26%, #23ad41 95.87%);
  color: white;
}

</style>
