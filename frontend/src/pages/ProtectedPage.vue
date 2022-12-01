<template>
  <q-page>
    <template v-for="link of useLink.links" :key="link._id" >
      <LinkCardVue :link="link"/>
    </template>
  </q-page>
</template>

<script setup>
import LinkCardVue from "src/components/LinkCard.vue";
import { useUrlStore } from "../stores/url-store";

const useLink = useUrlStore();
</script>