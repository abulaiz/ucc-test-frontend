<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span>Vehicle Tool App</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>  

    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
