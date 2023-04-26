<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <ValidationObserver
        ref="observer"
        v-slot="{}"
    >
      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <b-row>
            <b-col>
              <ValidationProvider
                  name="photos"
                  rules="required"
              >
                <template v-slot:default="">
                  <BaseTextareaWithValidation
                      rules="required"
                      class="required"
                      label-on-top
                      v-model="editingItem.description"
                      max-rows="6"
                      :label="$t('column.comment')"
                      :placeholder="$t('column.comment')"
                  />

                </template>
              </ValidationProvider>
            </b-col>
          </b-row>
          <br/>
          <b-row>
            <b-col>
              <ValidationProvider
                  rules="required"
              >
                <template v-slot:default="">
                  <BaseDatePickerWithValidation
                      class="required"
                      custom-styles="grid-template-columns: 50% 50%"
                      v-model="editingItem.placedDate"
                      :label="$t('column.placement_date')"
                      :placeholder="$t('column.placement_date')"
                      disable-after
                      lang="ru"
                  ></BaseDatePickerWithValidation>
                </template>
              </ValidationProvider>
            </b-col>
          </b-row>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <ValidationProvider
              name="photos"
              rules="required"
          >
            <template v-slot:default="" style="margin-bottom: 0%">
              <BaseFileUploaderWithValidation
                  ref="photosUploader"
                  rules="required"
                  class="required"
                  :required="true"
                  v-model="photos"
                  :max-files="5"
                  :max-filesize="null"
                  wrapper-classes="required"
                  data-vv-name="photos"
                  data-vv-as="Photos"
                  :label="$t('column.ad_construction_photo')"
              ></BaseFileUploaderWithValidation>
            </template>
          </ValidationProvider>
        </b-col>
      </b-row>
    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'report/advertisement-notifications'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {},
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      photos: [],
      photosFromServer: [],
      publicPath: process.env.BASE_URL,
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateContractorNotification'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (!this.isModeCreate) {
            crudAndListsService.updateNotification(MAIN_API_URL, this.makeAndReturnFormData(), this.$route.params.id)
                .then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.createNotification(MAIN_API_URL, this.makeAndReturnFormData(), this.$route.params.adConstructionId)
                .then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    },
    async setFilesFromServer() {
      // OBJECT_PHOTOS
      this.photosFromServer.forEach(f => {
        fetch(this.publicPath + f.url)
            .then((res) => res.blob())
            .then((myBlob) => {
              myBlob.name = f.name;
              myBlob.lastModified = new Date();
              const myFile = new File([myBlob], f.name, {
                type: myBlob.type,
              });

              let url = this.publicPath + f.url;
              this.$refs.photosUploader.$refs.dropzone.manuallyAddFile(myFile, url);
            })
            .catch(e => console.log(e));
      })
    },
    makeAndReturnFormData() {
      let form = new FormData();
      this.photos.forEach(f => {
        form.append("advertisementNotificationPhotos", f.file);
      })
      form.append("description", this.editingItem.description);
      form.append("placedDate", this.editingItem.placedDate)
      return form
    },
    collectErr(key) {
      if (this.errors[key] !== undefined) {
        return this.errors[key];
      }
      return undefined;
    },
    hasError(key) {
      if (this.errors[key] !== undefined) {
        return true;
      }
      return false;
    },
  },
  /*
  * CREATED */
  created() {
    this.var_default_search_payload.itemsPerPage = 500
    if (this.isModeCreate) {
      crudAndListsService.getEmpty(MAIN_API_URL)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
          .then(res => {
            this.editingItem = res.data.AdvertisementNotificationDto
            this.photosFromServer = res.data.advertisementNotificationPhotoList
            this.setFilesFromServer()
          })
          .catch(e => {
            console.log(e)
          })
    }
  }
}
</script>
<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}
</style>