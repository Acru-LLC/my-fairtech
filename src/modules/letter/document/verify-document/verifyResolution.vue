<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand class="mx-auto" href="#">
        <b-row align-v="center" class="text-center">
          <b-col>
            <img :src=" require('@/assets/images/acru-logo.png')" alt height="70"/>
          </b-col>
          <!--                    <b-col>-->
          <!--                        <span class="ml-2"><b>Uzbekistan GTL</b></span>-->
          <!--                    </b-col>-->
        </b-row>


      </b-navbar-brand>
    </b-navbar>
    <div class="container-fluid mt-2 justify-content-center">
      <b-row>
        <b-col lg="4" md="8" sm="12" xl="4">
          <b-card>
            <table class="table table-centered">
              <tr>
                <td>
                  <p>{{ $t('document.number') }}:</p>
                </td>
                <td>
                  <p> {{ item.docNumber }}</p>
                </td>
              </tr>
              <!--                            <tr>-->
              <!--                                <td>-->
              <!--                                    <p>{{$t('document.sender')}}:</p>-->
              <!--                                </td>-->
              <!--                                <td>-->
              <!--                                    <p> {{item.sender}}</p>-->
              <!--                                </td>-->
              <!--                            </tr>-->
            </table>
            <br>
            <p>{{ $t('document.signed_by_multiple') }}:</p>
            <div class="table-responsive">
              <table class="table table-centered">
                <tbody>
                <template>
                  <tr v-for="(el, index) in signedBy" :key="index">
                    <td style="width: 50px;">
                      <div class="avatar-xs">
                        <span
                            class="avatar-title rounded-circle bg-soft-primary text-white font-size-20">
                          {{ el.fullName[0] }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <p class="font-size-14 m-0">
                        <a href class="text-dark">{{ el.fullName }}</a>
                      </p>
                      <span class="small">{{ $t('document.signedDate') }} : {{ el.date }}</span>
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </div>
          </b-card>
          <b-modal
              :cancel-title="$t('actions.cancel')"
              :ok-title="$t('actions.yes')"
              hide-footer
              id="my-modal-dialog"
              size="lg"
              v-model="showModal"
          >
            <vue-pdf-app
                :config="config"
                :file-name="`${item.docNumber}.pdf`"
                :pdf="correctUrl"
            ></vue-pdf-app>
          </b-modal>

        </b-col>
        <b-col lg="8" md="8" sm="12" xl="8">
          <b-overlay :show="pdfLoadingProgressState">
            <b-card>
              <b-row align-h="between">

                <b-col>
                  <b-button @click="downloadFile" :disabled="loadingButton" size="sm"
                            variant="outline-primary">
                    <b-spinner v-if="loadingButton" small></b-spinner>
                    <i v-else class="fa fa-download"></i>
                    {{ $t('actions.download_file') }}
                  </b-button>
                </b-col>
                <b-col class="text-right">
                  <b-button @click="showModal = !showModal" size="sm" variant="outline-primary"><i
                      class="fa fa-eye"></i> {{ $t('actions.show_document') }}
                  </b-button>

                </b-col>
              </b-row>
              <hr>
              <div class="my-pdf-viewer-document">
                <div v-for="(i, ii) in numPages" :key="ii" class="my-pdf-viewer-page">
                  <pdf
                      :key="ii"
                      @progress="pdfLoadingProgress"
                      :src="correctUrl"
                      :page="i"
                  ></pdf>
                </div>
              </div>
            </b-card>
          </b-overlay>
        </b-col>
      </b-row>
    </div>
    <!--        <b-row>-->
    <!--            <b-col lg="4">-->
    <!--                <b-overlay :show="pdfLoadingProgressState">-->
    <!--                    <div id="my-pdf-view">-->
    <!--                        {{currentPage}} / {{pageCount}}-->
    <!--                        <pdf :src="correctUrl" @progress="pdfLoadingProgress" @num-pages="pageCount = $event"-->
    <!--                             @page-loaded="currentPage = $event"></pdf>-->
    <!--                    </div>-->
    <!--                </b-overlay>-->
    <!--            </b-col>-->
    <!--        </b-row>-->

    <!--        <div>-->
    <!--            <input type="checkbox" v-model="show">-->
    <!--            <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}-->
    <!--            <button @click="rotate += 90">&#x27F3;</button>-->
    <!--            <button @click="rotate -= 90">&#x27F2;</button>-->
    <!--            <button @click="$refs.pdf.print()">print</button>-->
    <!--            <div style="width: 50%">-->
    <!--                <div v-if="loadedRatio > 0 && loadedRatio < 1"-->
    <!--                     style="background-color: green; color: white; text-align: center"-->
    <!--                     :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%-->
    <!--                </div>-->
    <!--                <pdf v-if="show" v-for="i in numPages" :key="i" :page="i" ref="pdf"-->
    <!--                     style="border: 1px solid red; display: inline-block; width: 25%;" :src="correctUrl"-->
    <!--                     :rotate="rotate" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event"-->
    <!--                     @link-clicked="page = $event"></pdf>-->

    <!--            </div>-->
    <!--        </div>-->


  </div>

</template>
<script>
import VerifyDocumentService from "../../verifyDocument.service";

``
import appConfig from "@/app.config";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import pdf from 'vue-pdf'
import {mapState} from "vuex";

// var loadingTask = pdf.createLoadingTask('https://apiedoc.uzgtl.com/public/manualpdf');

function getPdfTaskUrl(url) {
  return pdf.createLoadingTask(url);
}

export default {
  name: "VerifyDocument",
  components: {
    VuePdfApp,
    pdf
  },
  data() {
    return {
      windowHeight: window.innerHeight,
      currentPage: 0,
      pageCount: 0,
      item: {
        pdfUrl: "",
        dateOfSigning: "",
        docNumber: "",
        sender: "",
        signedBy: "",
        signedByList: []
      },
      appConfig,
      showModal: false,
      config: {
        secondaryToolbar: {
          secondaryPresentationMode: false,
          secondaryOpenFile: false,
          secondaryPrint: false,
          secondaryDownload: true,
          secondaryViewBookmark: false,
          firstPage: false,
          lastPage: false,
          pageRotateCw: true,
          pageRotateCcw: true,
          cursorSelectTool: false,
          cursorHandTool: false,
          scrollVertical: false,
          scrollHorizontal: false,
          scrollWrapped: false,
          spreadNone: false,
          spreadOdd: false,
          spreadEven: false,
          documentProperties: false,
        },
        toolbar: {
          toolbarViewerRight: {
            openFile: false,
            print: false,
            viewBookmark: false,
          }
        }
      },
      pdfLoadingProgressState: true,
      show: true,
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
      loadingButton: false
    }
  },
  methods: {
    async downloadFile() {
      this.loadingButton = true;
      await VerifyDocumentService.downloadResolutionPdf(this.$route.params.id).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data], response.headers));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', this.item.docNumber + ".pdf");

        fileLink.click();
      }).finally(() => {
        this.loadingButton = false;
      })
    },
    error: function (err) {

      console.log(err);
    },
    pdfLoadingProgress(data) {
      if (data === 1) {
        this.pdfLoadingProgressState = false;
      }
    },
    async getDefaultItem() {
      // let urls = this.$route.fullPath.split("/");
      // urls[1] = urls[1].replace(/-/g, "");

      await VerifyDocumentService.verifyResolution(this.$route.params.id).then(response => {

        this.item = response.data;
      }).catch((e) => {
        this.$myMakeToast(
            this.$globalCreateErrorMessageFromArray(
                this.$getArrayFromArrayList(Object.values(e.response.data.errors))),
            this.$t("actions.error"),
            "danger"
        );
        setTimeout(() => {
          this.$router.push('/404');
        }, 1000)
      });

    },
    onResize() {
      this.windowHeight = window.innerHeight
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  computed: {
    ...mapState('locales', ['locale']),
    correctUrl() {
      return `${this.appConfig.api_request_type}://${this.appConfig.api_url}${this.item.pdfUrl}`
    },
    signedBy() {
      return this.item.signedByList
    }
  },
  async created() {
    await this.getDefaultItem();
  },
  watch: {
    'item.pdfUrl': {
      handler(newValue) {
        getPdfTaskUrl(`${this.appConfig.api_request_type}://${this.appConfig.api_url}${newValue}`).promise.then(pdf => {
          console.log(pdf)
          this.numPages = pdf.numPages;
        });

      }
    }
  }

}
</script>
<style scoped>
.bg-primary {
  background-color: #002856 !important;
}

.navbar-brand {
  text-align: center !important;
}

#my-pdf-view {
  width: 600px;
  height: 600px;
  overflow: scroll;
}

.my-pdf-viewer-document {
  height: 500px;
  width: 100%;
  overflow: scroll;
  background-color: #4f5d73;

}

.my-pdf-viewer-page {
  height: 1100px;
  width: 900px;
  padding: 12.5%;
}
</style>