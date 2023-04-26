<template>
  <b-overlay
      :opacity="0.1"
      :show="loader"
      z-index="1000"
      rounded="sm"
  >
    <base-create-or-update-wrapper
        :custom-title="$t('actions.upload')"
        has-save-suspend
        @save="save"
    >
      <ValidationObserver ref="observer" v-slot="{}">
        <b-row class="mb-3">
          <b-col lg="4" md="6" sm="12">
            <BaseFileUploaderWithValidation
                v-model="file"
                data-vv-name="file"
                data-vv-as="file"
                :multiple="false"
                :max-files="1"
                :maxFilesize="100"
                :label="$t('actions.excel_file_upload')"
            ></BaseFileUploaderWithValidation>
          </b-col>
          <b-col lg="4" md="6" sm="12">
            <p>
              {{ $t('actions.download_template') }}
            </p>
            <a class="btn btn-info" target="_blank" :href="getTemplateUrl" download>
              {{ $t('actions.download_template') }}
            </a>
          </b-col>
        </b-row>
      </ValidationObserver>
    </base-create-or-update-wrapper>
  </b-overlay>
</template>
<script>
import priceStockService from "@/shared/services/integration/priceStock.service";

export default {
  data() {
    return {
      file: null,
      loader: false,
    };
  },
  computed: {
    computedObserver() {
      return this.$refs.observer;
    },
    isRealization() {
      return this.$route.name === 'IntegrationPriceStockRealizationUpload';
    },
    getTemplateUrl() {
      if (this.isRealization) {
        return '/template/integration/price-stock/birja-realizatsiya-shablon.xlsx';
      }
      return '/template/integration/price-stock/birja-vstavlenie-s-realizatsiei-shablon.xlsx';
    },
  },
  watch: {},
  methods: {
    save() {
      this.computedObserver.validate().then(async valid => {
        this.loader = true;
        if (valid) {
          this.loader = true;
          if (this.isRealization) {
            await priceStockService.uploadByExcelRealization(this.file[0]).then(res => {
              this.file = null
            })
          } else {
            await priceStockService.uploadByExcelEmbeddingRealization(this.file[0]).then(res => {
              this.file = null
            })
          }
          this.computedObserver.reset()
          this.$router.go(-1)
          this.$toast(this.$t("messages.saved_successfully"), {type: "success"})
          this.loader = false;
        } else {
          this.$toast(this.$t("messages.fill_required_fields"), {type: "error"})
          this.loader = false;
        }
      });
    },
  },
}
</script>