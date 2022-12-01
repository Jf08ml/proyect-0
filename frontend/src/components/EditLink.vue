<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <div align="center">
            <h4>Actualizar</h4>
        </div>
        <q-form class="q-px-lg" @submit.prevent="onOKClick()">
        <q-input
        v-model="Link"
          :rules="[
            (val) =>
              (val && /^https:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(val)) ||
              'Verificar formato link',
          ]"
        >
        </q-input>
      </q-form>
        <q-card-actions align="center">
          <q-btn :loading="loading" color="primary" label="OK" @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
import { onMounted,ref } from 'vue';
import { useDialogPluginComponent } from 'quasar'
import { useUrlStore } from "../stores/url-store.js";
import { useNotify } from "../composables/notifyHooks.js";


const useLink = useUrlStore();
const { showNotify } = useNotify();
const loading = ref(false);

const Link = ref('');


const props = defineProps({
    modelLink: Object,
});

onMounted(() => {
    if (props.modelLink) {
        Link.value = props.modelLink.longLink;
    }
    
});

  defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ])
  
  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
  // dialogRef      - Vue ref to be applied to QDialog
  // onDialogHide   - Function to be used as handler for @hide on QDialog
  // onDialogOK     - Function to call to settle dialog with "ok" outcome
  //                    example: onDialogOK() - no payload
  //                    example: onDialogOK({ /*...*/ }) - with payload
  // onDialogCancel - Function to call to settle dialog with "cancel" outcome
  
  // this is part of our example (so not required)
  const onOKClick = async() => {
    try {
        loading.value = true;
        const newLink = { ...props.modelLink, longLink: Link.value}
        await useLink.updateLink(newLink);
        showNotify("Editado correctamente", "positive");
    } catch (error) {
        console.log(error)
        showNotify(error.errors[0].msg);
        loading.value = false;
    } finally {
        loading.value = false;
    }
  }
  </script>