<template>
  <div class="error_mess">
    <h1 v-if="error.statusCode === 404">{{$t("PageNotFound")}}</h1>
    <h1 v-else>{{$t("AnErrorOccurred")}}</h1>
    <NuxtLink to="/account">{{$t("GoToHomePage")}}</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style>
.error_mess {
    text-align: center;
}
</style>