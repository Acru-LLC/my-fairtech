<template>
  <div>
    <div class="mb-2">
      <!-- Ishni tugatish -->
      <div v-if="isCommission">
        <!-- Ichki ariza -->
        <b-row v-if="applicationType === 'INNER'">
          <!-- Ishni tugatish -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_FINISH_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="DECISION_COMMISSION"/>
              <docsIcon :name="$t('submodules.commission.doc_button.decision')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ko'rsatma loyihasi - Ishni tugatish uchun -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_FINISH_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="PRESCRIPTION_COMMISSION"/>
              <docsIcon :name="$t('submodules.commission.doc_button.prescription')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Bayonnoma - Ishni tugatish uchun -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_FINISH_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="PROTOCOL_COMMISSION"/>
              <docsIcon :name="$t('submodules.commission.doc_button.protocol')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ishni tugagandagi xat LETTER_FINISH -->
          <b-col v-if="['FINISHED'].indexOf(projectStatus)!==-1 && ['LETTER_FINISH'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="LETTER_FINISH"/>
              <docsIcon :name="$t('submodules.commission.doc_button.letter')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Chaqiruv xati -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['LETTER_INVOKE'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="LETTER_INVOKE"/>
              <docsIcon :name="$t('submodules.commission.doc_button.invoke_letter')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ishni to'xtatib turish -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_SUSPEND_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="PROTOCOL_SUSPEND"/>
              <docsIcon :name="$t('submodules.commission.doc_button.protocol')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ajrim - (vaqtincha) to'xtatish uchun -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_SUSPEND_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="COMPROMISE_DECISION_SUSPEND"/>
              <docsIcon :name="$t('submodules.commission.doc_button.compromise')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ishni kechiktirish turish -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_DELAY_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="PROTOCOL_DELAY"/>
              <docsIcon :name="$t('submodules.commission.doc_button.protocol')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ajrim - kechiktirish uchun -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_DELAY_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="COMPROMISE_DECISION_DELAY"/>
              <docsIcon :name="$t('submodules.commission.doc_button.compromise')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ishni qayta tiklash turish -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_RESUME_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="PROTOCOL_RESUME"/>
              <docsIcon :name="$t('submodules.commission.doc_button.protocol')" :src="icon.word"/>
            </label>
          </b-col>
          <!-- Ajrim - davom etish uchun -->
          <b-col v-if="['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(projectStatus)!==-1 && ['FOR_RESUME_WORK'].indexOf(modal.type)!==-1" sm="6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" type="radio" value="COMPROMISE_DECISION_RESUME"/>
              <docsIcon :name="$t('submodules.commission.doc_button.compromise')" :src="icon.word"/>
            </label>
          </b-col>
        </b-row>
        <b-row v-else-if="applicationType === 'FROM_DXA'">
          <!-- Qaror loyihasi -->
          <div class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" name="pay-method" type="radio" value="DECISION"/>
              <docsIcon :name="$t('submodules.application_before_commission.draft_decision')" :src="icon.word"/>
            </label>
          </div>
          <!-- BAYONNOMA -->
          <div class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" name="pay-method" type="radio" value="PROTOCOL_DXA"/>
              <docsIcon :name="$t('column.protocol')" :src="icon.word"/>
            </label>
          </div>
        </b-row>
        <b-row v-else>
          <!-- BAYONNOMA -->
          <div class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" name="pay-method" type="radio" value="PROTOCOL"/>
              <docsIcon :name="$t('column.protocol')" :src="icon.word"/>
            </label>
          </div>
        </b-row>
      </div>
      <div v-else>
        <b-row v-if="applicationType === 'INNER'">
          <!-- Ma'lumotnoma - qayta ochish uchun, vaqtincha yopilganda, tugatilganda -->
          <div v-if="['COMMISSION_REVISION', 'FINISHED'].indexOf(projectStatus)===-1
                    && ['FOR_NOT_COMPLETED', 'FOR_NOT_BELONG', 'FOR_REGION'].indexOf(modal.type)===-1"
               class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input id="doc-methodoption1"
                     v-model="type"
                     class="card-radio-input"
                     name="pay-method"
                     type="radio"
                     value="REFERENCE"/>
              <docsIcon :name="$t('submodules.application_before_commission.reference')" :src="icon.word"/>
            </label>
          </div>
          <!-- BILDIRISHNOMA FAYL ARIZA PROYEKTI UCHUN -->
          <div v-if="['FOR_COMMISSION'].indexOf(modal.type) !== -1 && projectStatus !== 'REVISION'" class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type"
                     class="card-radio-input"
                     name="pay-method"
                     type="radio"
                     value="NOTICE"/>
              <docsIcon :name="$t('submodules.commission.notice')"
                        :src="icon.word"/>
            </label>
          </div>
          <!-- Ajrim fayli -->
          <div v-if="['FOR_COMMISSION'].indexOf(modal.type) !== -1 && projectStatus !== 'REVISION'" class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type"
                     class="card-radio-input"
                     name="pay-method"
                     type="radio"
                     value="COMPROMISE_DECISION"/>
              <docsIcon :name="$t('submodules.commission.compromise_decision')"
                        :src="icon.word"/>
            </label>
          </div>
          <!-- Malumot to'liq bolmasa, tegishli bolmasa, hududga junatilsa - Xat yozish -->
          <div class="col-sm-6">
            <label v-if="['FOR_NOT_COMPLETED', 'FOR_NOT_BELONG', 'FOR_REGION'].indexOf(modal.type) !== -1"
                   class="card-radio-label mb-3">
              <input v-model="type"
                     :value="letterType"
                     class="card-radio-input"
                     name="pay-method"
                     type="radio"/>
              <docsIcon :name="$t('submodules.application_before_commission.letter')"
                        :src="icon.word"/>
            </label>
          </div>
          <!-- Malumot toliq bolmasa, tegishli bolmasa, hududga junatilsa - Bildirishnoma yozish -->
          <div class="col-sm-6">
            <label v-if="['FOR_NOT_COMPLETED', 'FOR_NOT_BELONG', 'FOR_REGION'].indexOf(modal.type) !== -1"
                   class="card-radio-label mb-3">
              <input v-model="type"
                     :value="noticeType"
                     class="card-radio-input"
                     name="pay-method"
                     type="radio"/>
              <docsIcon :name="$t('submodules.commission.notice')"
                        :src="icon.word"/>
            </label>
          </div>
        </b-row>
        <!-- VILOYATGA YUBORILGAN DXA ARIZALARI TEGISHLI BO'LMASA -->
        <b-row v-if="applicationType === 'NOT_BELONG'" class="col-sm-6">
          <label class="card-radio-label mb-3">
            <input id="doc-methodoption4" v-model="type" class="card-radio-input" name="pay-method" type="radio"
                   value="LETTER"/>
            <docsIcon :name="$t('submodules.application_before_commission.letter')" :src="icon.word"/>
          </label>
        </b-row>
        <b-row v-if="applicationType === 'FROM_DXA'">
          <div v-if="['COMMISSION_REVISION', 'FINISHED', 'TEMPORARILY_CLOSED'].indexOf(projectStatus)===-1
                     && ['FOR_NOT_COMPLETED', 'FOR_NOT_BELONG', 'FOR_REGION'].indexOf(modal.type)===-1"
               class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" name="pay-method" type="radio" value="REFERENCE"/>
              <docsIcon :name="$t('submodules.application_before_commission.reference')" :src="icon.word"/>
            </label>
          </div>
          <div v-if="['REVISION_AFTER_COMMISSION', 'CREATED'].indexOf(projectStatus)===-1
                    && ['BEFORE_COMMISSION'].indexOf(modal.type)===-1"
               class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" name="pay-method" type="radio" value="REFERENCE"/>
              <docsIcon :name="$t('submodules.application_before_commission.reference')" :src="icon.word"/>
            </label>
          </div>
          <!-- VILOYATGA YUBORILGAN DXA ARIZALARI TEGISHLI BO'LMASA -->
          <div class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input v-model="type" class="card-radio-input" name="pay-method" type="radio" value="DECISION"/>
              <docsIcon :name="$t('submodules.application_before_commission.draft_decision')" :src="icon.word"/>
            </label>
          </div>
          <!-- Bayonnoma loyihasi -->
          <div class="col-sm-6">
            <label class="card-radio-label mb-3">
              <input id="doc-methodoption6" v-model="type" class="card-radio-input" name="pay-method" type="radio"
                     value="PROTOCOL_DXA"/>
              <docsIcon :name="$t('submodules.application_before_commission.protocol')"
                        :src="icon.word"/>
            </label>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import docsIcon from "@/modules/projects/docsIcon.vue";

export default {
  components: {
    docsIcon,
  },
  props: {
    applicationType: {
      type: String,
      default: ''
    },
    projectStatus: {
      type: String,
      default: ''
    },
    modal: {
      type: Object,
    },
  },
  data() {
    return {
      type: null,
      file: null,
      icon: {
        word: require('@/assets/word.png'),
      }
    };
  },
  computed: {
    isCommission() {
      return this.$route.name === 'CommissionProjects'
    },
    letterType() {
      switch (this.modal.type) {
        case 'FOR_NOT_COMPLETED':
          return 'LETTER_NOT_COMPLETED';
        case 'FOR_NOT_BELONG':
          return 'LETTER_NOT_BELONG';
        case 'FOR_REGION':
          return 'LETTER_REGION';
        default:
          return this.modal.type;
      }
    },
    noticeType() {
      switch (this.modal.type) {
        case 'FOR_NOT_COMPLETED':
          return 'NOTICE_NOT_COMPLETED';
        case 'FOR_NOT_BELONG':
          return 'NOTICE_NOT_BELONG';
        case 'FOR_REGION':
          return 'NOTICE_REGION';
        default:
          return this.modal.type;
      }
    },
  },
};
</script>

<style>
</style>