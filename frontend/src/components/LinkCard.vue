<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <div class="q-pa-sm text-overline">
        <a>{{ link.nanoLink }}</a>
      </div>
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">{{ link.longLink }}</div>
        <div class="q-pa-md text-subtitle2">by {{ link.uid }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn
          :loading="loading"
          flat
          round
          icon="mdi-pencil-box-outline"
          @click="dialogUpdateLink(props.link)"
        ></q-btn>
        <q-btn
          :loading="loading"
          flat
          round
          icon="mdi-trash-can-outline"
          color="red"
          @click="deleteLink(link._id)"
        ></q-btn>
        <q-btn flat @click="copyLink(link.nanoLink)">Copy</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUrlStore } from "../stores/url-store.js";
import { useNotify } from "../composables/notifyHooks.js";
import { useQuasar } from "quasar";
import CustomComponent from '../components/EditLink.vue'

const props = defineProps({
  link: Object,
});

const loading = ref(false);
const useLink = useUrlStore();
const { showNotify } = useNotify();
const $q = useQuasar();


const deleteLink = async (_id) => {
  $q.dialog({
    title: "Confirm",
    message: "Deseas eliminar el registro?",
    cancel: true,
    presistent: true,
  }).onOk(async () => {
    try {
      loading.value = true;
      await useLink.removeLink(_id);

      showNotify("Eliminado correctamente", "positive");
    } catch (error) {
      showNotify(error.error);
      loading.value = false;
    } finally {
      loading.value = false;
    }
  });
};

const dialogUpdateLink = (link) => {
  $q.dialog({
    component: CustomComponent,
    componentProps: {
      modelLink: link
    },
  })
}

const copyLink = async(nanoLink) => {
  try {
    const path = `${process.env.FRONT_URI}/${nanoLink}`
    await navigator.clipboard.writeText(path);
    showNotify("Copiado correctamente", "positive");
  } catch (error) {
    showNotify(error.error);
  }
}

</script>
