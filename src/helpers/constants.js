import i18n from "@/i18n";

const ProductType = {
  LOCAL: i18n.t('LOCAL'),
  IMPORT: i18n.t('IMPORT'),
}

const ProductProductType = {
  FOOD: i18n.t('FOOD'),
  NON_FOOD: i18n.t('NON_FOOD'),
}

const LetterTypeStatus = {
  COMMON:i18n.t('constants.letter_type_status.COMMON'),
  REFERENCE: i18n.t('constants.letter_type_status.REFERENCE'),
  DECISION: i18n.t('constants.letter_type_status.DECISION'),
  PROTOCOL_DXA: i18n.t('constants.letter_type_status.PROTOCOL_DXA'),
  NOTICE: i18n.t('constants.letter_type_status.NOTICE'),
  OFFER_NOTICE: i18n.t('constants.letter_type_status.OFFER_NOTICE'),
  LETTER: i18n.t('constants.letter_type_status.LETTER'),
  COMPROMISE_DECISION: i18n.t('constants.letter_type_status.COMPROMISE_DECISION'),
  FOR_TAKE_VISA: i18n.t('constants.letter_type_status.FOR_TAKE_VISA'),
  LETTER_NOT_COMPLETED: i18n.t('constants.letter_type_status.LETTER_NOT_COMPLETED'),
  NOTICE_NOT_COMPLETED: i18n.t('constants.letter_type_status.NOTICE_NOT_COMPLETED'),
  LETTER_NOT_BELONG: i18n.t('constants.letter_type_status.LETTER_NOT_BELONG'),
  NOTICE_NOT_BELONG: i18n.t('constants.letter_type_status.NOTICE_NOT_BELONG'),
  LETTER_REGION: i18n.t('constants.letter_type_status.LETTER_REGION'),
  NOTICE_REGION: i18n.t('constants.letter_type_status.NOTICE_REGION'),
  LETTER_REJECT: i18n.t('constants.letter_type_status.LETTER_REJECT'),
  LETTER_INVOKE: i18n.t('constants.letter_type_status.LETTER_INVOKE'),
  LETTER_FINISH: i18n.t('constants.letter_type_status.LETTER_FINISH'),
  COMPROMISE_DECISION_SUSPEND: i18n.t('constants.letter_type_status.COMPROMISE_DECISION_SUSPEND'),
  COMPROMISE_DECISION_DELAY: i18n.t('constants.letter_type_status.COMPROMISE_DECISION_DELAY'),
  COMPROMISE_DECISION_RESUME: i18n.t('constants.letter_type_status.COMPROMISE_DECISION_RESUME'),
  PROTOCOL_SUSPEND: i18n.t('constants.letter_type_status.PROTOCOL_SUSPEND'),
  PROTOCOL_DELAY: i18n.t('constants.letter_type_status.PROTOCOL_DELAY'),
  PROTOCOL_RESUME: i18n.t('constants.letter_type_status.PROTOCOL_RESUME'),
  DECISION_COMMISSION: i18n.t('constants.letter_type_status.DECISION_COMMISSION'),
  PRESCRIPTION_COMMISSION: i18n.t('constants.letter_type_status.PRESCRIPTION_COMMISSION'),
  PROTOCOL_COMMISSION: i18n.t('constants.letter_type_status.PROTOCOL_COMMISSION'),
  FOR_PROCESS: i18n.t('constants.letter_type_status.FOR_PROCESS'),
  FOR_COMMISSION: i18n.t('constants.letter_type_status.FOR_COMMISSION'),
  FOR_NOT_BELONG: i18n.t('constants.letter_type_status.FOR_NOT_BELONG'),
  FOR_NOT_COMPLETED: i18n.t('constants.letter_type_status.FOR_NOT_COMPLETED'),
  FOR_REGION: i18n.t('constants.letter_type_status.FOR_REGION'),
  FOR_SUSPEND_WORK: i18n.t('constants.letter_type_status.FOR_SUSPEND_WORK'),
  FOR_DELAY_WORK: i18n.t('constants.letter_type_status.FOR_DELAY_WORK'),
  FOR_RESUME_WORK: i18n.t('constants.letter_type_status.FOR_RESUME_WORK'),
  FOR_FINISH_WORK: i18n.t('constants.letter_type_status.FOR_FINISH_WORK'),
}

export {
  ProductType,
  ProductProductType,
  LetterTypeStatus,
}