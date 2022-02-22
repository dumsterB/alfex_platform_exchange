<template>
  <div class="settings">
    <v-container>
      <v-row>
        <v-col cols="12" lg="4" md="4">
          <SettingsTab></SettingsTab>
        </v-col>
        <v-col cols="12" lg="4" md="4">
       <component  :is="component"></component>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SettingsTab from '@/components/elements/settings/SettingsTab'
import PrivateInformation from '@/components/elements/settings/PrivateInformation'
import Security from '@/components/elements/settings/Security'
import Verification from '@/components/elements/settings/Verification'


import {mapGetters} from "vuex";
export default {
  data(){
    return{
      currentComponent:'',
    }
  },
  components:{
    SettingsTab,PrivateInformation,Security,Verification
  },
  computed:{
    ...mapGetters({selections:'data/settings/selections',componentHandler:'data/settings/componentHandler'}),
    component(){
      console.log(this.componentHandler)
      try {
        return () => import(`@/components/elements/settings/${this.componentHandler}`);
      } catch (e) {
        return null;
      }
    }
  },
  mounted() {},
};
</script>
