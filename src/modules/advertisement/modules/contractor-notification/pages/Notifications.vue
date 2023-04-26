<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <b-btn
                variant="warning"
                class="text-capitalize"
                @click="$router.go(-1)"
            >
              {{ $t('actions.back') }}
            </b-btn>
            <b>{{ $t('submodules.contractor_notification.title') }} №{{ listItems.registerNumber }}</b>
            <b>{{ listItems.contractorFullName }}</b>
            <b class="m-0 mb-1 p-2"><strong>{{ $t('column.passport_number') }}:
              {{ listItems.contractorAdvertisingConstructionPassportNumber }}</strong></b>
          </div>
          <template>
            <b-row class="pr-md-0 pr-lg-2">
              <b-col>
                <h4 style="padding-top: 2%"><strong>{{ $t('column.comment') }}:</strong>
                  {{ listItems.description }}</h4>
                <h4 style="padding-top: 2%"><strong>{{ $t('column.placement_date') }}:</strong>
                  {{ listItems.placedDate }}</h4>
                <h4 style="padding-top: 2%"><strong>{{ $t('column.address') }}:</strong>
                  {{
                    getName({
                      nameRu: listItems.addressDto.regionNameRu,
                      nameLt: listItems.addressDto.regionNameLt,
                      nameUz: listItems.addressDto.regionNameUz,
                    }) ? getName({
                      nameRu: listItems.addressDto.regionNameRu,
                      nameLt: listItems.addressDto.regionNameLt,
                      nameUz: listItems.addressDto.regionNameUz,
                    }) + ',' : ''
                  }}
                  {{
                    getName({
                      nameRu: listItems.addressDto.districtNameRu,
                      nameLt: listItems.addressDto.districtNameLt,
                      nameUz: listItems.addressDto.districtNameUz,
                    }) ? getName({
                      nameRu: listItems.addressDto.districtNameRu,
                      nameLt: listItems.addressDto.districtNameLt,
                      nameUz: listItems.addressDto.districtNameUz,
                    }) + ',' : ''
                  }}
                  {{
                    getName({
                      nameRu: listItems.addressDto.quarterNameRu,
                      nameLt: listItems.addressDto.quarterNameLt,
                      nameUz: listItems.addressDto.quarterNameUz,
                    }) ? getName({
                      nameRu: listItems.addressDto.quarterNameRu,
                      nameLt: listItems.addressDto.quarterNameLt,
                      nameUz: listItems.addressDto.quarterNameUz,
                    }) + ',' : ''
                  }}
                  {{
                    getName({
                      nameRu: listItems.addressDto.streetNameRu,
                      nameLt: listItems.addressDto.streetNameLt,
                      nameUz: listItems.addressDto.streetNameUz,
                    }) ? getName({
                      nameRu: listItems.addressDto.streetNameRu,
                      nameLt: listItems.addressDto.streetNameLt,
                      nameUz: listItems.addressDto.streetNameUz,
                    }) : ''
                  }}
                  {{ listItems.addressDto.additional ? listItems.addressDto.additional : '' }}
                </h4>
                <h4 style="padding-top: 2%"><strong>{{ $t('column.created_by') }}:</strong>
                  {{ listItems.createdBy }}</h4>

                <div v-if="listItems.rejectMessage">
                  <h4 style="padding-top: 2%"><strong>{{ $t('column.reason_rejected') }}:</strong>
                    {{ listItems.rejectMessage ? listItems.rejectMessage : '' }}</h4>
                </div>
              </b-col>
              <b-col
                  class="p-2"
                  cols="4"
                  md="5"
                  lg="4"
              >
                <template v-if="photosFromServer && photosFromServer.length">
                  <b-carousel
                      id="carousel-1"
                      controls
                      indicators
                      no-animation
                      :interval="0"
                      background="#ababab"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                  >
                    <b-carousel-slide
                        class="ad-details-img-slide"
                        v-for="(imgFile, imgIndex) in photosFromServer"
                        :key="`images-${imgIndex}`"
                    >
                      <template v-slot:img>
                        <img
                            :src="publicPath + imgFile.url"
                            @click="() => showImg(imgIndex)"
                        />
                      </template>
                      <vue-easy-lightbox
                          :visible="visible"
                          :imgs="imgArr"
                          :index="imgIndex"
                          @hide="handleHide"
                      ></vue-easy-lightbox>
                    </b-carousel-slide>
                  </b-carousel>
                </template>
                <template v-else>
                  <div class="pe-0 mb-1">
                    <img
                        class="ad-details-img"
                        alt="images"
                        :src="require('@/assets/images/photo-placeholder.png')"
                    >
                  </div>
                </template>
              </b-col>
            </b-row>
          </template>
          <template>
            <div class="row">
              <div class="col-12">
                <div v-if="listItems.isNotOwner" class="d-flex align-items-center justify-content-between mt-5">
                  <b-btn v-if="listItems.statusCode == 'ACCEPTED' || listItems.statusCode == 'REJECTED'" disabled>
                    {{ $t('actions.reject') }}
                  </b-btn>
                  <b-btn v-else
                         variant="danger"
                         class="text-capitalize"
                         @click="messageModal = true"
                  >
                    {{ $t('actions.reject') }}
                  </b-btn>
                  <ValidationObserver
                      ref="observer"
                      v-slot="{}"
                  >
                    <b-modal v-model="messageModal" :ok-title="$t('actions.send')" @ok="rejectNotification"
                             :ok-disabled="lengthOfMessage < 10"
                             :cancel-title="$t('actions.cancel')">
                      <BaseTextareaWithValidation
                          class="required"
                          rules="required|min:10"
                          required
                          label-on-top
                          :label="$t('messaging.title')"
                          v-model="messages.rejectMessage"
                      >
                      </BaseTextareaWithValidation>
                    </b-modal>
                  </ValidationObserver>
                  <b-btn v-if="listItems.statusCode == 'ACCEPTED' || listItems.statusCode == 'REJECTED'" disabled>
                    {{ $t('actions.accept') }}
                  </b-btn>
                  <b-btn v-else
                         variant="primary"
                         class="text-capitalize"
                         @click="acceptNotification()"
                  >
                    {{ $t('actions.accept') }}
                  </b-btn>
                </div>
              </div>
              <!-- end col -->
            </div>
            <div style="text-align: right; padding-right: 2px">
              <VueQriously :value="qrCodeHeader + '/notifications/' + listItems.id" :size="100"/>
            </div>
          </template>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>
<script>
import {mapActions} from 'vuex'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
const MAIN_API_URL = 'report/advertisement-notifications'
import VueQriously from "vue-qriously";
import crudAndListsService from "@/shared/services/crud_and_list.service"
import BaseTextareaWithValidation from "@/components/base/BaseTextareaWithValidation";
import helperService from "@/shared/services/helper.service";

export default {
  name: "AdDetailsById",
  /*
  * COMPONENTS */
  components: {BaseTextareaWithValidation, VueQriously},
  /*
  * DATA */
  data() {
    return {
      listItems: {
        addressDto: {}
      },
      photosFromServer: [],
      publicPath: process.env.BASE_URL,
      visible: false,
      arr: [],
      messageModal: false,
      qrCodeHeader: process.env.VUE_APP_ROOT_URL,
      messages: {
        rejectMessage: ''
      },
    }
  },

  /*
* METHODS */
  methods: {
    ...mapActions(['setCount']),
    getItems(id) {
      crudAndListsService.getById(MAIN_API_URL, id, false)
          .then(res => {
            this.listItems = res.data.AdvertisementNotificationDto
            this.photosFromServer = res.data.advertisementNotificationPhotoList
            this.setCount()
          })
          .catch(e => {
            console.log(e)
          })
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
    acceptNotification() {
      this.$bvModal.msgBoxConfirm(this.$t('messages.accept_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              helperService
                  .acceptById(this.$route.params.notId, true)
                  .then((res) => {
                    this.$toast(this.$t('messages.accepted_message'), {type: 'success'});
                    this.listItems.statusCode = 'ACCEPTED'
                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    rejectNotification() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          helperService
              .rejectById(this.$route.params.notId, this.messages, true)
              .then((res) => {
                this.$toast(this.$t('messages.rejected_message'), {type: 'warning'});
                this.listItems.statusCode = 'REJECTED'
              })
              .catch(e => {
                console.log(e)
              })
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      })
    }

  },

  /*
* CREATED */
  async created() {
    this.getItems(this.$route.params.notId)
  },

  /*
* COMPUTED */
  computed: {
    imgArr() {
      this.photosFromServer.forEach(e => {
        const arrs = this.arr;
        if (this.photosFromServer)
          arrs.push(this.publicPath + e.url)
      })
      return this.arr
    },
    lengthOfMessage() {
      return this.messages.rejectMessage.length
    },
    computedObserver() {
      return this.$refs.observer
    }
  }
}
</script>

<style scoped lang="scss">
.ad-details-img-slide {
  img {
    max-width: 100%;
    height: auto;
    max-height: 20rem;
    min-height: 10rem;
  }
}

.ad-details-img {
  max-width: 100%;
  height: auto;
}
</style>