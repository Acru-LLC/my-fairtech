<template>
    <div class="card m-0">
        <div class="card-body">
            <h4 class="card-title mb-4 d-flex" style="align-items: center" v-if="fileName" >
                <FileView :uploadPath="fileName" />
                <span class="ml-2">
                    <p
                        class="m-0 pre word-break-all"
                        style="max-width: 390px"
                        v-if="fileName"
                    >
                        {{ fileName }}
                    </p>
                    <span v-if="fileSize" class="text-primary" >
                      {{ getFileSize(fileSize) }}
                    </span>
                </span>
            </h4>
            <b-form>
                <b-form-group
                    class="mb-4"
                    :label="$t('column.comment')"
                    label-for="horizontal-password-input"
                    label-cols-sm="3"
                >
                    <b-form-textarea
                        v-model="fileMessage"
                        rows="3"
                        max-rows="10"
                    ></b-form-textarea>
                </b-form-group>
                <div class="form-group row justify-content-end">
                    <div class="col-sm-9">
                        <div>
                            <b-button variant="outline-danger" @click="$emit('cancel')" class="mr-2" >
                              {{ $t("actions.cancel") }}
                            </b-button>
                            <b-button variant="primary" @click="$emit('sendFile', fileMessage, file)" >
                              {{ $t("actions.send") }}
                            </b-button>
                        </div>
                    </div>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
import FileView from "./components/fileView.vue"
import { getFileSize, imageTypes, getExtFromName } from "@/helper";
export default {
    props: ["file"],
    components: {
        FileView
    },
    data () {
        return {
            fileName: null,
            fileSize: null,
            fileMessage: "",
            getFileSize: getFileSize,
            imageTypes: imageTypes,
            getExtFromName: getExtFromName,
        };
    },
    methods: {
        reset () {
            this.fileMessage = "";
        },
        setNameSize (name, size) {
            this.fileName = name;
            this.fileSize = size;
        },
    },
};
</script>

<style>
</style>