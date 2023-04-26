<script>
import Service from "../letterService";
import {cnfDoc, showMsgSuccess} from "@/helper";
import SignKeys from "../SignKeys.vue";
import Receivers from "./receivers.vue";
import Editor from "../create/froal.editor.vue";
import Modal from "../create/modal.vue";
import helperService from '@/shared/services/helper.service'

export default {
  components: {SignKeys, Receivers, Editor, Modal},
  watch: {
    page() {
      this.getList();
    },
    searchValue(v) {
      this.getList();
    },
  },
  data() {
    return {
      rejectedSeeLoader: false,
      rejectedLetter: null,
      viewFileModal: false,
      fileUploadPath: null,
      isRejectedSeeModal: false,
      signatureSeeModal: false,
      reasonRejectedSee: "",
      commissionTypeId: null,
      commissionComment: '',
      commissionCompletionDate: null,
      commissionModalLoader: false,
      commissionTypes: [],
      commissionsModal: false,
      currentPage: 1,
      src: null,
      numPages: undefined,
      reasonRejected: "",
      reasonForReview: "",
      selectedTrItem: {},
      active: "",
      sendTypeList: [
        {
          label: this.$t("forSignature"),
          value: "SIGNATURE",
        },
        {
          label: this.$t("forAgreement"),
          value: "AGREEMENT",
        },
        {
          label: this.$t("forReview"),
          value: "REVIEW",
        },
      ],
      title: this.$t("received"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("received"),
          active: true,
        },
      ],
      list: [],
      searchValue: "",
      page: 1,
      limit: 20,
      loading: false,
      total: 1,
      isModal: false,
      currentItem: {},
      signatureModal: false,
      loaderButton: false,
      isModalKeys: false,
      agreementCount: 0,
      signatureCount: 0,
      reviewCount: 0,
      loaderReceiver: false,
      infoData: {},
      visaInfoById: {},
      rejectedLoader: false,
      isRejectedModal: false,
      isForReviewModal: false,
      viewModal: false,
      filesList: [],
      projectFilesList: [],
      viewModalBeforeSigned: false,
      loaderPdf: false,
      ilovaUploadPath: null,
      viewIlovaModal: false,
      base64: null,
      editModal: false,
      loader: false,
      contextText: "",
      icon: {
        pdf: require('@/assets/pdf.png'),
      },
      sendLetterToChairman: {
        modal: false,
        comment: "",
        loader: false,
      }
    };
  },
  async created() {
    await this.getList();
    await this.getIncomeTotalCount();
  },
  computed: {
    params() {
      return {
        params: {
          itemsPerPage: this.limit,
          page: this.page - 1,
        },
        search: this.searchValue,
      };
    },
    computedMakeSignedCompromiseDecisionToReject() {
      return this.selectedTrItem.applicationTypeInProject !== 'FROM_DXA'
          && this.selectedTrItem.applicationTypeInProject !== 'NOT_BELONG'
          && ['SENT_FOR_REJECT', 'REJECTED', 'TO_INVOKE_SIGNED', 'TO_SIGN_FINISH_LETTER',
            'FINISH_LETTER_SIGN_AND_SEND', 'SEND_SIGN_TO_RETURN', 'SEND_SIGN'].indexOf(this.selectedTrItem.status) === -1
          && this.selectedTrItem.isForCommission && !this.selectedTrItem.isHeadOfDepartment;
    },
    computedMakeSignedCompromiseDecisionToAccept() {
      return this.selectedTrItem.applicationTypeInProject !== 'FROM_DXA'
          && this.selectedTrItem.applicationTypeInProject !== 'NOT_BELONG'
          && ['REJECTED'].indexOf(this.selectedTrItem.status) === -1
          && this.selectedTrItem.isForCommission && !this.selectedTrItem.isHeadOfDepartment;
    },
    signItemButtonLabel() {
      if (this.selectedTrItem.action === "SIGNATURE") {
        if (this.selectedTrItem.status === 'SEND_SIGN') {
          return this.$t("submodules.commission.doc_status.send_for_commission")
        }
        return this.$t("submodules.reports.make_sign")
      } else if (this.selectedTrItem.action === 'REVIEW') {
        if (this.selectedTrItem.isForCommission && !this.selectedTrItem.isHeadOfDepartment) {
          return this.$t("submodules.commission.doc_status.for_begin_commission")
        }
        if (this.selectedTrItem.status === 'SEND_SEEN_CLOSED' && ["FOR_RESUME_WORK", "FOR_DELAY_WORK", "FOR_SUSPEND_WORK"].includes(this.selectedTrItem.returnType)) {
          return this.$t('submodules.commission.doc_status.allow_project_reopening')
        }
        switch (this.selectedTrItem.status) {
          case 'SENT_FOR_REJECT':
            if (!this.selectedTrItem.isRejectLetterCreated) {
              return this.$t("submodules.commission.doc_button.create_letter")
            }
            break;
          case 'REJECTED':
              return this.$t("submodules.commission.doc_status.confirmation_that_letter_has_reached")
          case 'FINISH_LETTER_SIGN_AND_SEND':
              return this.$t("submodules.commission.doc_status.confirmation_that_work_finished")
          default:
            return this.$t("confirm")
        }
      } else if (this.selectedTrItem.action === 'AGREEMENT') {
        return this.$t("submodules.reports.make_agreement")
      }
      return ""
    },
  },

  methods: {
    showRejectedByRaisModal(item) {
      this.currentItem = item;
      this.isRejectedSeeModal = true;
    },
    rejectSeeConfirm() {
      cnfDoc(this.$t("messages.reject_title")).then((rs) => {
        if (rs.value) {
          this.signatureSeeModal = true;
        }
      });
    },
    async signSuccessSee(data) {
      let payload = {
        signedContent: data.content,
        inn: data.inn,
        pnfl: data.pnfl
      }
      switch (this.selectedTrItem.action) {
        case 'REVIEW':
          switch (this.selectedTrItem.status) {
            case 'SEND_SEEN_CLOSED':
              await Service.letterCancelled(payload, this.selectedTrItem.letterId, this.selectedTrItem.id, this.reasonRejectedSee)
                  .then(async () => {
                    this.isRejectedSeeModal = false;
                    this.signatureSeeModal = false;
                    this.getProjects();
                    this.getTotalCount();
                  })
                  .catch((err) => {
                    // this.catchErr(err);
                  });
              break;
          }
          break;
        default:
          await Service.onlyDocSignForRRejectedByRais(payload, this.selectedTrItem.letterId, this.selectedTrItem.id, this.reasonRejectedSee)
              .then(async () => {
                this.isRejectedSeeModal = false;
                this.signatureSeeModal = false;
                let tempData = Object.assign({}, this.selectedTrItem);
                await showMsgSuccess(this.$t("successDocSigned"));
                this.getList();
                this.getTotalCount();
              })
              .catch((err) => {
                // this.catchErr(err);
              });
          break;
      }
    },
    openSignatureModalForCommission() {
      if (this.commissionTypeId) {
        if (this.selectedTrItem.action === 'REVIEW'
            && this.selectedTrItem.applicationTypeInProject === 'INNER'
            && (this.selectedTrItem.status === 'SENT_TO_MANAGEMENT')
            && this.selectedTrItem.projectType === 'BEFORE_COMMISSION') {
          if (!this.commissionCompletionDate) {
            return this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
          }
          Service.makeReviewForCommissionManagement(this.selectedTrItem.id, this.commissionTypeId, this.commissionComment, this.commissionCompletionDate)
              .then(async () => {
                await showMsgSuccess(this.$t("successDocSigned"));
                this.getProjects();
                this.getTotalCount();
                this.signatureModal = false;
                this.commissionsModal = false;
              })
              .catch((err) => {
                // this.catchErr(err);
              })
              .finally(() => {
                this.signatureModal = false;
                this.commissionsModal = false;
              });
        } else {
          this.signatureModal = true
        }
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    customLabelCommissionTypes(opt) {
      let selected = this.commissionTypes.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    changeText(text) {
      this.contextText = text;
    },
    okModal() {
      let text = this.$refs.editorRef.text;
      this.$refs.editModalRef.loading(true);
      Service.saveLetterBody(this.selectedTrItem.letterId, text)
          .then(() => {
            let tempData = Object.assign({}, this.selectedTrItem);
            this.successEdited();
            this.getList(true, tempData.id);
            this.editModal = false;
            /* setTimeout(() => {
              let newdata = this.list.find((e) => e.id == tempData.id);
              this.selectedTrItem = newdata;
              this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
            }, 500); */
          })
          .catch((e) => {
          })
          .finally(() => {
            this.$refs.editModalRef.loading(false);
          });
    },
    viewModalClick() {
      this.$refs.editModalRef.loadingPdf(true);
      this.viewModalBeforeSigned = true;
      this.loaderPdf = true;
      this.base64 = null;

      Service.convert(this.contextText)
          .then((res) => {
            setTimeout(() => {
              this.base64 = res.data;
            }, 400);
          })
          .finally(() => {
            this.loaderPdf = false;
            this.$refs.editModalRef.loadingPdf(false);
          });
    },
    editLetter(item) {
      /* this.editModal = true;
      setTimeout(() => {
        Service.getBody(item.letterId).then((res) => {
          let editor = this.$refs.editorRef;
          if (editor) {
            if (!this._empty(res.data)) {
              editor.setTextContent(res.data);
            }
          }
        });
      }, 400); */

    },
    viewProject(selectedLetter) {
      /* this.$router.push({
          name: selectedLetter.projectType === 'COMMISSION' ? 'CommissionProjects' : 'ProjectsMain',
          query: { page: "overview", id: selectedLetter.projectId },
      }); */
      let routeData = this.$router.resolve({
        name: selectedLetter.projectType === 'COMMISSION' ? 'CommissionProjects' : 'ProjectsMain',
        query: {page: "overview", id: selectedLetter.projectId},
      });
      window.open(routeData.href, '_blank');
    },
    viewIlova(item) {
      const ext = this.getExt(item.uploadPath ? item.uploadPath : item.url)
      if (ext === "pdf") {
        this.ilovaUploadPath = item.uploadPath ? item.uploadPath : item.url;
        this.viewIlovaModal = true;
      } else {
        this.convertToPdf(item).then((uploadPath) => {
          if (uploadPath) {
            this.ilovaUploadPath = uploadPath;
            this.viewIlovaModal = true;
          }
        });
      }
    },
    openOnlyOffice(letterId) {
      let routeData = this.$router.resolve({
        name: "Office-DOCUMENT-commission",
        query: {id: letterId, page: "GET"},
      });
      window.open(routeData.href, "_blank");
    },
    viewIlovaProject(uploadPath) {
      if (this.getExt(uploadPath) === "pdf") {
        this.ilovaUploadPath = uploadPath;
        this.viewIlovaModal = true;
      }
    },
    convertToPdf(selectedItem, forSign = false) {
      return new Promise((res, rej) => {
        let config = {
          url: `${selectedItem.url}`,
          outputtype: ".pdf",
          forSign: forSign,
          key: selectedItem.key,
        };
        Service.convertToPdfByApi(config)
            .then((rs) => {
              if (rs.data.uploadPath) {
                this.$nextTick(() => {
                  this.src = `${this.baseUrl}/${rs.data.uploadPath}`;
                });
                res(rs.data.uploadPath);
              } else {
                res(false);
              }
            })
            .catch((e) => {
              // this.catchErr(e);
              rej(e);
            });
      });
    },
    getByIdLetter() {
      Service.getByIdLetter(this.selectedTrItem.letterId)
          .then((rs) => {
            this.currentDoc = rs.data;
            this.loaderPdf = true;
            this.convertToPdf(rs.data).then((uploadPath) => {
              if (!uploadPath) {
                setTimeout(() => {
                  this.convertToPdf(rs.data)
                      .then(() => {
                        this.loaderPdf = false;
                      })
                      .catch((e) => {
                        this.loaderPdf = false;
                      });
                }, 4000);
              } else {
                this.loaderPdf = false;
              }
            });
          })
          .catch((e) => {
          });
    },
    viewLetter() {
      this.viewModalBeforeSigned = true;
      this.loaderPdf = true;
      this.base64 = null;
      Service.viewPdfByLetterId(this.selectedTrItem.letterId)
          .then((res) => {
            setTimeout(() => {
              this.base64 = res.data;
            }, 300);
          })
          .finally(() => {
            this.loaderPdf = false;
          });
    },
    viewDocBeforeSigned() {
      // this.viewModalBeforeSigned = true;
      // this.getByIdLetter();
      this.viewLetter();
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    getAttachedFilesById(id) {
      Service.getAttachedFilesById(id).then((res) => {
        this.filesList = res.data;
      });
    },
    getProjectLettersByLetterId(data) {
      Service.projectLettersByLetterId(data.letterId).then((res) => {
        this.projectFilesList = res.data;
      });
    },
    saveRejected(payload) {
      this.convertToPdf(this.selectedTrItem).then(r1 => {
        this.rejectedLoader = true;
        Service.saveRejected(
            this.selectedTrItem.letterId,
            this.selectedTrItem.id,
            this.reasonRejected,
            payload
        )
            .then(async () => {
              this.isRejectedModal = false;
              let tempData = Object.assign({}, this.selectedTrItem);
              await this.successSaved();
              await this.getList(true, tempData.id);
              await this.getIncomeTotalCount();
              /* setTimeout(() => {
                let newdata = this.list.find((e) => e.id == tempData.id);
                this.selectedTrItem = newdata;
                this.$forceUpdate();
                this.getReceivers(this.selectedTrItem);
              }, 500); */
            })
            .finally(() => {
              this.rejectedLoader = false;
            });
      })
    },
    handleToReject() {
      this.cnf().then((rs) => {
        if (rs.value) {
          this.$router.push(`/letter/to-reject/${this.selectedTrItem.id}/${this.selectedTrItem.letterId}`);
        }
      });
    },
    showRejectedModal() {
      switch (this.selectedTrItem.action) {
        case 'SIGNATURE':
          switch (this.selectedTrItem.status) {
            case 'SEND_FOR_COMMISSION':
              this.handleToReject();
              break;
            case 'SEND_SIGN':
              this.isForReviewModal = true;
              break;
            default:
              this.isRejectedModal = true;
              break;
          }
          break;
        case 'REVIEW':
          if (this.computedMakeSignedCompromiseDecisionToReject) {
            this.handleMakeSignedCompromiseDecisionToReject();
          } else {
            switch (this.selectedTrItem.status) {
              case 'SEND_SEEN_CLOSED':
                this.handleLetterCancelled(this.selectedTrItem);
                break;
              default:
                this.isRejectedModal = true;
                break;
            }
          }
          break;
        default:
          this.isRejectedModal = true;
          break;
      }
    },
    async handleMakeSignedCompromiseDecisionToReject() {
      await this.$router.push(`/letter/income/${this.selectedTrItem.letterId}/${this.selectedTrItem.id}?type=compromise-decision-to-reject`);
    },
    async handleMakeSignedCompromiseDecisionToAccept() {
      await this.$router.push(`/letter/income/${this.selectedTrItem.letterId}/${this.selectedTrItem.id}?type=compromise-decision-to-accept`);
    },
    viewDocSigned() {
      this.viewModal = true;
    },
    getIncomeTotalCount() {
      Service.getIncomeTotalCount().then((rs) => {
        this.agreementCount = rs.data.agreement;
        this.reviewCount = rs.data.review;
        this.signatureCount = rs.data.signature;
      });
    },
    async signSuccess(data) {
      let payload = {
        signedContent: data.content,
        inn: data.inn,
        pnfl: data.pnfl
      };
      if (this.isRejectedModal) {
        this.isModalKeys = false;
        this.signatureModal = false;
        this.saveRejected(payload)
      } else {
        switch (this.selectedTrItem.status) {
          case 'COMMISSION_SEND':
            Service.onlyDocSign(payload, this.selectedTrItem.id)
                .then(async () => {
                  this.isModalKeys = false;
                  this.signatureModal = false;
                  let tempData = Object.assign({}, this.selectedTrItem);
                  await showMsgSuccess(this.$t("successDocSigned"));
                  await this.getList(true, tempData.id);
                  await this.getIncomeTotalCount();
                })
                .catch((err) => {
                  // this.catchErr(err);
                });
            break;
          case 'NOT_BELONG':
            await Service.onlyDocSign(payload, this.selectedTrItem.id)
                .then(async () => {
                  await Service.onlyDocSignNotBelong(payload, this.selectedTrItem.id)
                      .then(async () => {


                      })
                      .catch((err) => {
                        this.catchErr(err);
                      });

                  this.isModalKeys = false;
                  this.signatureModal = false;
                  let tempData = Object.assign({}, this.selectedTrItem);
                  await showMsgSuccess(this.$t("successDocSigned"));
                  await this.getList(true, tempData.id);
                  await this.getIncomeTotalCount();
                })
                .catch((err) => {
                  // this.catchErr(err);
                });
            break;
          case 'SEND_SIGN_TO_RETURN':
            Service.signDoc(payload, this.selectedTrItem.id, this.commissionTypeId, this.commissionComment)
                .then(async () => {
                  this.isModalKeys = false;
                  this.signatureModal = false;
                  this.commissionsModal = false;
                  let tempData = Object.assign({}, this.selectedTrItem);
                  await showMsgSuccess(this.$t("successDocSigned"));
                  await this.getList(true, tempData.id);
                  await this.getIncomeTotalCount();
                })
                .catch((err) => {
                });
            break;
          case 'SEND_SIGN':
            Service.letterCancelled(payload, this.selectedTrItem.letterId, this.selectedTrItem.id, this.reasonForReview)
                .then(async () => {
                  this.isModalKeys = false;
                  this.signatureModal = false;
                  this.isForReviewModal = false;
                  this.reasonForReview = '';
                  let tempData = Object.assign({}, this.selectedTrItem);
                  await showMsgSuccess(this.$t("successDocSigned"));
                  await this.getList(true, tempData.id);
                  await this.getIncomeTotalCount();
                })
                .catch((err) => {
                });
            break;
          default:
            Service.signDoc(payload, this.selectedTrItem.id, this.commissionTypeId, this.commissionComment)
                .then(async () => {
                  this.isModalKeys = false;
                  this.signatureModal = false;
                  this.commissionsModal = false;
                  let tempData = Object.assign({}, this.selectedTrItem);
                  await showMsgSuccess(this.$t("successDocSigned"));
                  await this.getList(true, tempData.id);
                  await this.getIncomeTotalCount();
                  /* setTimeout(() => {
                    let newdata = this.list.find((e) => e.id == tempData.id);
                    this.selectedTrItem = Object.assign({}, newdata);
                    this.$forceUpdate();
                    this.getReceivers(this.selectedTrItem);
                  }, 1000); */
                })
                .catch((err) => {
                  // this.catchErr(err);
                });
            break;
        }
      }
    },
    getReceivers(item) {
      this.loaderReceiver = true;
      Service.getReceivers(item.letterId)
          .then((rs) => {
            this.infoData = rs.data;
          })
          .finally(() => {
            this.loaderReceiver = false;
          });
    },
    async getVisaInfoById() {
      await helperService.getVisaAllInfoById(this.selectedTrItem.applicationIdFromDXA, false)
          .then(res => {
            this.visaInfoById = res.data
          })
          .catch(e => {
            console.log(e)
          }).finally(() => {
          })
    },
    async clickTrItem(item) {
      if (this.selectedTrItem.id === item.id) {
        this.selectedTrItem = {};
        this.infoData = {};
      } else {
        this.selectedTrItem = item;
        await this.getAttachedFilesById(item.letterId);
        await this.getReceivers(item);
        if (['FROM_DXA', 'NOT_BELONG'].includes(item.applicationTypeInProject)) {
          await this.getVisaInfoById();
          await this.getProjectLettersByLetterId(item);
        } else {
          this.visaInfoById = {}
          this.projectFilesList = []
        }
        if (item.isRejectLetterCreated) {
          Service.getRejectLetter(item.letterId).then(res => {
            this.rejectedLetter = res.data;
          }).catch(e => {
            console.log(e)
          })
        } else {
          this.rejectedLetter = null;
          this.fileUploadPath = null;
        }
      }
    },
    signatureItem() {
      this.isModalKeys = true;
    },
    selectSendType(v) {
      this.selectedTrItem = {};
      this.infoData = {};
      if (this.active == v) {
        this.active = "";
      } else {
        this.active = v;
      }
      this.getList();
    },
    makeAgree(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeAgree(item.letterId).then(async () => {
            let tempData = Object.assign({}, this.selectedTrItem);
            await this.successSaved();
            await this.getList(true, tempData.id);
            await this.getIncomeTotalCount();
            // setTimeout(() => {
            //   let newdata = this.list.find((e) => e.id == tempData.id);
            //   this.selectedTrItem = Object.assign({}, newdata);
            //   this.$forceUpdate();
            //   this.getReceivers(this.selectedTrItem);
            // }, 500);
          });
        }
      });
    },
    fetchCommissionTypes(callback = () => ({})) {
      Service.searchList('directory/commission/commission-type', this.var_default_search_payload, null, true)
          .then(res => {
            this.commissionTypes = res.data.list
            callback();
          })
          .catch(e => {
            console.log(e)
          })
    },
    makeReviewForCommission(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeReviewForCommission(item.id, item.comment).then(async () => {
            await this.successSaved();
            await this.$router.push("/projects/commission");
          });
        }
      });
    },
    letterMakeViewed(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeCompromiseDecisionViewed(item.id).then(() => {
            this.forceRouteReload()
          });
        }
      });
    },
    letterRejectViewed(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeViewedLetterToReject(item.id).then(() => {
            this.forceRouteReload()
          });
        }
      });
    },
    makeReviewForCommissionWithComment(item) {
      if (this.commissionTypes.length === 0) {
        return this.fetchCommissionTypes(() => {
          this.commissionsModal = true;
        });
      }
      this.commissionsModal = true;
    },
    makeReview(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeReview(item.letterId).then(async () => {
            // let tempData = this.selectedTrItem;
            let tempData = Object.assign({}, this.selectedTrItem);
            await this.successSaved();
            await this.getList(true, tempData.id);
            await this.getIncomeTotalCount();
          });
        }
      });
    },
    makeReviewLetter(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeAgreedLetter(item.id).then(async () => {
            let tempData = Object.assign({}, this.selectedTrItem);
            await this.successSaved();
            await this.getList(true, tempData.id);
            await this.getIncomeTotalCount();
          });
        }
      });
    },
    rejectConfirm() {
      cnfDoc(this.$t("messages.reject_title")).then((rs) => {
        if (rs.value) {
          this.signatureModal = true;
        }
      });
    },
    forReview() {
      cnfDoc(this.$t("messages.you_sure_title")).then((rs) => {
        if (rs.value) {
          this.signatureModal = true;
        }
      });
    },
    viewFile(uploadPath) {
      if (this.getExt(uploadPath) === "pdf") {
        this.fileUploadPath = uploadPath;
        this.viewFileModal = true;
      }
    },
    signItemToManagement(item) {
      this.$router.push(
          `/letter/income/to-management/${item.letterId}/${item.id}`
      );
    },
    handleSendLetterToChairman() {
      this.cnf().then(({value}) => {
        if (value) {
          this.sendLetterToChairman.loader = true
          Service.handleSendLetterToChairman(this.rejectedLetter.id, this.sendLetterToChairman.comment).then(() => {
            this.getList();
            this.sendLetterToChairman.loader = false
            this.sendLetterToChairman.modal = false
          })
              .finally(() => {
                this.sendLetterToChairman.loader = false
                this.sendLetterToChairman.modal = false
              })
        }
      });
    },
    handleLetterCancelled(item) {
      this.isRejectedSeeModal = true;
    },

    async signAcceptedItem(item) {
      if (item.applicationTypeInProject === 'FROM_DXA' && item.status === 'SEND_SIGN'
          && item.action === 'SIGNATURE') {
        await Service.setLetterRejtOrAccept(item.letterId, false).then((rs) => {
          this.$router.push(
              `/letter/income/${item.letterId}/${item.id}`
          );
        });
      }
    },

    async signRejectedItem(item) {
      if (item.applicationTypeInProject === 'FROM_DXA' && item.status === 'SEND_SIGN'
          && item.action === 'SIGNATURE') {
        await Service.setLetterRejtOrAccept(item.letterId, true).then((rs) => {
          this.$router.push(
              `/letter/income/${item.letterId}/${item.id}`
          );
        });
      }
    },
    async signItem(item) {
      switch (item.action) {
        case 'SIGNATURE':
          this.currentItem = item;
          if (item.applicationTypeInProject === 'FROM_DXA') {
            switch (item.status) {
              case 'SEND_SIGN':
                await Service.setLetterRejtOrAccept(item.letterId, true).then((rs) => {
                  this.$router.push(
                      `/letter/income/${item.letterId}/${item.id}`
                  );
                });
                break;
              case 'COMMISSION_SEND':
                await Service.setLetterRejtOrAccept(item.letterId, true).then((rs) => {
                  this.$router.push(
                      `/letter/income/${item.letterId}/${item.id}`
                  );
                });
                break;
              default:
                cnfDoc(this.$t("docConfirm")).then((rs) => {
                  if (rs.value) {
                    this.signatureModal = true;
                  }
                });
                break;
            }
          } else if (item.applicationTypeInProject === 'NOT_BELONG') {
            if (item.fileType !== 'pdf') {
              await this.convertToPdf(item).then(async r => {
                if (!r.uploadPath) {
                  this.$toast(this.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                } else if (!r.uploadPath.endsWith('.pdf')) {
                  this.$toast(this.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                }
              })
                  .catch(e => console.log(e))
            }
          } else {
            switch (item.status) {
              case 'SEND_SIGN':
                this.$router.push(`/letter/income/${item.letterId}/${item.id}`);
                break;
              case 'FOR_REGION':
                await Service.setLetterRejtOrAccept(item.letterId, true).then((rs) => {
                  this.$router.push(
                      `/letter/income/${item.letterId}/${item.id}`
                  );
                });
                break;
              case 'FOR_NOT_BELONG':
                await Service.setLetterRejtOrAccept(item.letterId, true).then((rs) => {
                  this.$router.push(
                      `/letter/income/${item.letterId}/${item.id}`
                  );
                });
                break;
              case 'COMMISSION_SEND':
                this.$router.push(`/letter/income/${item.letterId}/${item.id}`);
                break;
              case 'SEND_SIGN_FINISH':
                await this.$router.push(`/letter/make-signed-to-closed/${item.id}/${item.letterId}`);
                break;
              case 'FOR_NOT_COMPLETED':
                await Service.setLetterRejtOrAccept(item.letterId, true).then((rs) => {
                  this.$router.push(
                      `/letter/income/${item.letterId}/${item.id}`
                  );
                });
                break;
              case 'SEND_FOR_COMMISSION':
                await this.$router.push(`/letter/before-commission/${item.id}/${item.letterId}`);
                break;
              case 'SEND_SIGN_TO_RETURN':
                await this.$router.push(`/letter/income/${item.letterId}/${item.id}`);
                break;
              case 'TO_SIGN_REJECT_LETTER':
                await this.$router.push(`/letter/to-reject/${item.id}/${item.letterId}`);
                break;
              case 'TO_SIGN_FINISH_LETTER':
                await this.$router.push(`/letter/before-commission/${item.id}/${item.letterId}`);
                break;
              default:
                await cnfDoc(this.$t("docConfirm")).then((rs) => {
                  if (rs.value) {
                    this.signatureModal = true;
                  }
                });
                break;
            }
          }
          break;
        case 'AGREEMENT':
          this.currentItem = item;
          switch (item.status) {
            default:
              this.makeAgree(item);
              break;
          }
          break;
        case 'REVIEW':
          this.currentItem = item;
          if (this.computedMakeSignedCompromiseDecisionToAccept) {
            await this.handleMakeSignedCompromiseDecisionToAccept();
          } else {
            if (!this.currentItem.isForCommission && this.currentItem.isHeadOfDepartment) {
              this.letterMakeViewed(item)
            } else
              switch (item.status) {
                case 'SEND_FOR_COMMISSION':
                  this.makeReviewForCommission(item);
                  break;
                case 'SENT_TO_MANAGEMENT':
                  this.makeReviewForCommissionWithComment(item);
                  break;
                case 'SENT_FOR_REJECT':
                  // Xat yaratish tugmasida shu joyga kelayapti.
                  this.uploadRejectLetter(item);
                  break;
                case 'TO_INVOKE_SIGNED':
                  this.makeReviewLetter(item);
                  break;
                case 'SEND_SEEN_CLOSED':
                  await this.cnf().then((rs) => {
                    if (rs.value) {
                      if (["FOR_RESUME_WORK", "FOR_DELAY_WORK", "FOR_SUSPEND_WORK"].includes(this.selectedTrItem.returnType)) {
                        Service.letterAcceptForReopen(item.letterId).then(async () => {
                          let tempData = Object.assign({}, this.selectedTrItem);
                          await this.successSaved();
                          await this.getList(true, tempData.id);
                          await this.getIncomeTotalCount();
                        });
                      } else {
                        Service.makeAgreedLetterToClosed(item.id).then(async () => {
                          let tempData = Object.assign({}, this.selectedTrItem);
                          await this.successSaved();
                          await this.getList(true, tempData.id);
                          await this.getIncomeTotalCount();
                        });
                      }
                    }
                  });
                  break;
                case 'FINISH_LETTER_SIGN_AND_SEND':
                  await this.cnf().then((rs) => {
                    if (rs.value) {
                      Service.makeViewedLetterToFinish(item.id).then(async () => {
                        let tempData = Object.assign({}, this.selectedTrItem);
                        await this.successSaved();
                        await this.getList(true, tempData.id);
                        await this.getIncomeTotalCount();
                      });
                    }
                  });
                  break;
                case 'REJECTED':
                  this.letterRejectViewed(item)
                  break;
                default:
                  this.makeReview(item);
                  break;
              }
          }
          break;
      }
    },
    save() {
      if (!this.$refs.addRef.checkValidity()) {
        Service.upload(this.$refs.addRef.form).then((rs) => {
          if (rs.data) {
            this.getList();
            let routeData = this.$router.resolve({
              name: "Office-DOCUMENT-commission",
              query: {page: "GET", id: rs.data.id},
            });
            window.open(routeData.href, "_blank");
            this.isModal = false;
          }
        });
      } else {
        this.enterInfo();
      }
    },
    add() {
      this.isModal = true;
    },
    getList(reset = false, resetId) {
      this.loading = true;
      Service.getListLetterIncome(this.params, this.active)
          .then(({data}) => {
            this.list = data.list;
            this.total = data.total;
            if (reset) {
              let newdata = this.list.find((e) => e.id === resetId);
              this.selectedTrItem = Object.assign({}, newdata);
              // this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
            }
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loading = false;
          });
    },
    uploadRejectLetter(item) {
      this.cnf().then(({value}) => {
        if (value) {
          Service.uploadRejectLetter(item.id, 'LETTER_REJECT', "Rad etish xati").then((rs) => {
            let routeData = this.$router.resolve({
              name: "Office-DOCUMENT-commission",
              query: {id: rs.data.id, page: "GET"},
            });
            this.getList();
            this.getIncomeTotalCount();
            window.open(routeData.href, "_blank");
          });
        }
      });
    }
  },
};
</script>

<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.report_income') }}</div>
    </div>
    <b-modal v-model="isRejectedSeeModal" :title="$t('submodules.reports.reasonRejected')" scrollable size="md">
      <b-form-textarea v-model="reasonRejectedSee" rows="5"></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click="rejectSeeConfirm">
          <b-overlay :opacity="0.1" :show="rejectedSeeLoader" rounded="sm">
            {{ $t("submodules.reports.rejected") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <b-modal v-model="signatureSeeModal" :title="$t('submodules.reports.make_sign')" hide-footer scrollable size="lg">
      <SignKeys :dataToSign="selectedTrItem" @sign="signSuccessSee"/>
    </b-modal>
    <Modal
        ref="editModalRef"
        :cancelText="'actions.cancel'"
        :okText="'actions.save'"
        :scroll="true"
        :signerHide="false"
        :size="'xl'"
        :title="selectedTrItem.fileName"
        :value="editModal"
        :variantOk="'success'"
        @closeModal="editModal = false"
        @okModal="okModal"
        @viewModalClick="viewModalClick"
    >
      <template v-slot:body>
        <div>
          <Editor ref="editorRef" @changeText="changeText"/>
        </div>
      </template>
    </Modal>
    <b-modal v-model="viewIlovaModal" :title="$t('actions.view')" scrollable size="xl">
      <div v-if="ilovaUploadPath" style="height: 700px">
        <embed
            :src="`${baseUrl}/${ilovaUploadPath}`"
            height="800"
            type="application/pdf"
            width="100%"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewIlovaModal = false">{{ $t("actions.close") }}</b-button>
      </template>
    </b-modal>
    <b-modal
        v-model="signatureModal"
        :title="`${$t('submodules.reports.make_sign')}`"
        hide-footer
        scrollable
        size="lg"
    >
      <SignKeys :dataToSign="selectedTrItem" @sign="signSuccess"/>
    </b-modal>

    <!-- for view document -->
    <b-modal
        v-model="viewModal"
        :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
        scrollable
        size="xl"
    >
      <div v-if="selectedTrItem.url" style="height: 700px">
        <embed
            :src="`${baseUrl}/${selectedTrItem.url}`"
            height="800"
            type="application/pdf"
            width="100%"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewModal = false">{{ $t("actions.close") }}</b-button>
      </template>
    </b-modal>

    <!-- modal view before modal -->
    <b-modal
        v-model="viewModalBeforeSigned"
        :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
        body-bg-variant="light"
        scrollable
        size="xl"
    >
      <b-overlay :opacity="1" :show="loaderPdf" rounded="lg" variant="white">
        <div style="min-height: 700px">
          <embed
              v-if="base64"
              :src="`data:application/pdf;base64, ${base64}`"
              :style="`min-height:${heightWindow-250}px`"
              style="width: 100%;"
          />
        </div>
      </b-overlay>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewModalBeforeSigned = false">{{ $t("actions.close") }}</b-button>
      </template>
    </b-modal>

    <!-- COMMISSIONS MODAL -->
    <b-modal
        v-model="commissionsModal"
        :title="`${$t('submodules.commission.title')}`"
        scrollable
        size="md"
    >
      <BaseMultiselectWithValidation
          v-model="commissionTypeId"
          :custom-label="customLabelCommissionTypes"
          :label="$t('submodules.commission.special_commission_type.title')"
          :max-height="600"
          :options="commissionTypes.map(e => e.id)"
          :show-labels="false"
          class="required"
          label-on-top
          open-direction="bottom"
          placeholder=""
          rules="required"
      ></BaseMultiselectWithValidation>

      <BaseDatePickerWithValidation
          v-model="commissionCompletionDate"
          :label="$t('date')"
          :placeholder="$t('date')"
          lang="ru"
          required
      />
      <b-form-textarea
          v-model="commissionComment"
          :placeholder="$t('submodules.doc.summary')"
          class="mt-3"
          rows="5"
      ></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button variant="success" @click="openSignatureModalForCommission">
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
            {{ $t("actions.continue") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <b-modal
        v-model="isRejectedModal"
        :title="`${$t('submodules.reports.reasonRejected')}`"
        scrollable
        size="md"
    >
      <b-form-textarea v-model="reasonRejected" rows="5"></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click="rejectConfirm">
          <b-overlay :opacity="0.1" :show="rejectedLoader" rounded="sm">
            {{ $t("submodules.reports.rejected") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <b-modal
        v-model="isForReviewModal"
        :title="`${$t('column.comment')}`"
        scrollable
        size="md"
    >
      <b-form-textarea v-model="reasonForReview" rows="5"></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button variant="warning" @click="forReview" :disabled="!reasonForReview">
          <b-overlay :opacity="0.1" :show="rejectedLoader" rounded="sm">
            {{ $t("submodules.commission.returnsee") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <b-modal
        v-model="sendLetterToChairman.modal"
        :title="`${$t('submodules.commission.send_for_sign')}`"
        scrollable
        size="md"
    >
      <b-form-textarea v-model="sendLetterToChairman.comment" rows="5"></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button variant="success" @click="handleSendLetterToChairman">
          <b-overlay
              :opacity="0.1"
              :show="sendLetterToChairman.loader"
              rounded="sm"
          >
            {{ $t("submodules.commission.send_for_sign") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body p-2">
            <div class="row">
              <div class="col-sm-4">
                <div class="d-inline-block mt-1 ml-2">
                  <div class="search-box">
                    <div class="position-relative">
                      <input
                          v-model="searchValue"
                          :placeholder="$t('actions.search')"
                          class="form-control rounded bg-light border-light"
                          style="width: 300px"
                          type="text"
                      />
                      <i class="mdi mdi-magnify search-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="text-sm-right">
                  <div class="mr-3 float-right">
                    <div class="d-flex align-items-center">
                      <div
                          v-for="(dc, index) in sendTypeList"
                          :key="index + 'doc'"
                          :class="dc.value === active ? 'my-card-active' : ''"
                          class="card m-0 my-card-hovered_2 mr-3"
                          @click.prevent="selectSendType(dc.value)"
                      >
                        <div class=" card-body p-0 text-center d-flex align-items-center justify-content-center ">
                          <div>
                            <div class="d-flex align-items-center">
                              <img
                                  :src="
                                    dc.value === 'SIGNATURE'
                                      ? require('@/assets/doc/2.png')
                                      : dc.value === 'REVIEW'
                                      ? require('@/assets/doc/3.png')
                                      : require('@/assets/doc/4.png')
                                  "
                                  alt="DOC"
                                  height="30"
                              />

                              <div class="ml-2">
                                <p class="m-0">
                                  {{ dc.label }}
                                </p>
                              </div>
                              <div class="ml-2">
                                <b-badge v-if=" dc.value === 'AGREEMENT' && agreementCount > 0 " variant="success">
                                  {{ agreementCount }}
                                </b-badge>

                                <b-badge v-if=" dc.value === 'SIGNATURE' && signatureCount > 0 " variant="success">
                                  {{ signatureCount }}
                                </b-badge>

                                <b-badge v-if=" dc.value === 'REVIEW' && reviewCount > 0 " variant="success">
                                  {{ reviewCount }}
                                </b-badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="card card-body">
              <div class="table-responsive">
                <b-overlay :opacity="0.1" :show="loading" rounded="sm">
                  <table class="table table-centered table-striped table-nowrap table-hover">
                    <thead class="thead-light">
                    <tr>
                      <th class="text-center" scope="col" style="width: 70px">№</th>
                      <th class="text-center" scope="col">
                        {{ $t("column.created_by") }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("submodules.doc.founder") }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("docDate") }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("docName") }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("puropseOfSending") }}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="list.length === 0" class="text-center">
                      <td :style="loading ? 'height:50px' : ''" colspan="9" style="vertical-align: middle">
                        <h5>
                          {{ $t("messages.data_not_found") }}
                        </h5>
                      </td>
                    </tr>
                    <tr
                        v-for="(item, index) in list"
                        :key="index + 'CREATE_DOC'"
                        :class="
                            selectedTrItem.id == item.id
                              ? 'bg-soft-primary text-primary'
                              : item.status === 'CANCELED' || item.cancelled
                              ? 'bg-soft-danger text-danger'
                              : item.isViewed ? 'bg-soft-success text-dark' : 'bg-white text-dark font-weight-bold'
                          "
                        class="p_cursor"
                        @click.prevent="clickTrItem(item)"
                    >
                      <td class="text-center">
                        <strong>
                          {{ paginate(index, limit, page - 1) }}</strong>
                      </td>
                      <td class="text-left">
                        {{ item.ownerLastName ? item.ownerLastName : '' }}
                        {{ item.ownerFirstName ? item.ownerFirstName : '' }}
                        {{ item.ownerParentName ? item.ownerParentName : '' }}
                      </td>
                      <td class="text-left">
                        {{ item.senderLastName ? item.senderLastName : '' }}
                        {{ item.senderFirstName ? item.senderFirstName : '' }}
                        {{ item.senderParentName ? item.senderParentName : '' }}
                      </td>
                      <td :class="!item.isRead ? 'font-weight-bold' : ''" class="text-center">
                        {{ item.date }}
                      </td>
                      <td :class="!item.isRead ? 'font-weight-bold' : ''" class="text-center">
                        <p class="pre m-0">{{ item.fileName }}</p>
                      </td>
                      <td
                          :class="!item.isRead ? 'font-weight-bold' : ''"
                          class="text-center p-0"
                      >
                        {{
                          item.action === "SIGNATURE"
                              ? $t("forSignature")
                              : item.action === "AGREEMENT"
                                  ? $t("forAgreement")
                                  : item.action === "REVIEW"
                                      ? $t("forReview")
                                      : ""
                        }}
                        <i
                            v-if="item.action === 'SIGNATURE' && item.signed"
                            class="mdi mdi-check-all font-size-22 p-0 ml-2 text-success"
                        ></i>

                        <i
                            v-if="item.action === 'AGREEMENT' && item.isAgreed"
                            class="mdi mdi-handshake font-size-22 ml-2 text-success"
                        ></i>

                        <i
                            v-if="item.action === 'REVIEW' && item.isViewed"
                            class="mdi mdi-file-eye font-size-18 font-size-16 ml-2 text-success"
                        ></i>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </b-overlay>
              </div>
              <div v-if="total > 0" class="row">
                <div class="col-lg-12">
                  <b-pagination v-model="page" :per-page="limit" :total-rows="total" class="m-0" size="sm"/>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="card card-body">
<!--              <div>status: {{ selectedTrItem.status }}</div>-->
<!--              <div>action: {{ selectedTrItem.action }}</div>-->
<!--              <div>returnType: {{ selectedTrItem.returnType }}</div>-->
<!--              <div>projectType: {{ selectedTrItem.projectType }}</div>-->
<!--              <div>applicationTypeInProject: {{ selectedTrItem.applicationTypeInProject }}</div>-->
              <table class="table m-0">
                <tbody>
                <!-- Tugmalar -->
                <tr v-if="selectedTrItem.id">
                  <td class="text-muted text-center p-0" colspan="2">
                    <div class="p-4">
                      <div v-if="['SIGNED', 'CANCELED'].indexOf(selectedTrItem.status) === -1 ||
                      selectedTrItem.status === 'SIGNED' &&selectedTrItem.action === 'REVIEW' && selectedTrItem.isHeadOfDepartment">
                        <b-button-group v-if="
                                (selectedTrItem.action === 'SIGNATURE' &&
                                  !selectedTrItem.signed) ||
                                (selectedTrItem.action === 'AGREEMENT' &&
                                  !selectedTrItem.isAgreed) ||
                                (selectedTrItem.action === 'REVIEW' &&
                                  !selectedTrItem.isViewed && !selectedTrItem.cancelled)
                              ">
                          <!-- DXA uchun project yaratish  -->
                          <b-button
                              v-if="selectedTrItem.applicationTypeInProject === 'FROM_DXA' && selectedTrItem.status === 'SEND_FOR_COMMISSION'"
                              variant="success"
                              @click="signItem(selectedTrItem)"
                          >
                            <i class="fa fa-check"></i><br>
                            {{ $t('actions.for_start_commission') }}
                          </b-button>
                          <!-- Boshqalar uchun tasdiqlash, korish, imzolash  -->
                          <b-button
                              v-if="selectedTrItem.applicationTypeInProject !== 'FROM_DXA' && selectedTrItem.applicationTypeInProject !== 'NOT_BELONG'"
                              variant="success"
                              @click="signItem(selectedTrItem)"
                          >
                            <i class="fa fa-check"></i><br>
                            {{ signItemButtonLabel }}
                          </b-button>
                          <b-button
                              v-if="selectedTrItem.applicationTypeInProject === 'NOT_BELONG'"
                              variant="success"
                              @click="signItem(selectedTrItem)"
                          >
                            <i class="fa fa-check"></i><br>
                            {{ $t("submodules.reports.make_sign") }}
                          </b-button>
                          <b-button
                              v-if="selectedTrItem.applicationTypeInProject !== 'FROM_DXA'
                                 && selectedTrItem.status ==='SEND_FOR_COMMISSION'
                                 && selectedTrItem.action === 'SIGNATURE'"
                              variant="success"
                              @click="signItem(selectedTrItem)"
                          >
                            <i class="fa fa-check"></i><br>
                            {{ $t("submodules.reports.make_sign") }}
                          </b-button>
                          <b-button
                              v-if="(selectedTrItem.applicationTypeInProject === 'FROM_DXA' && selectedTrItem.status !=='SEND_FOR_COMMISSION' && selectedTrItem.action !== 'SIGNATURE')"
                              variant="success"
                              @click="signItem(selectedTrItem)"
                          >
                            <i class="fa fa-check"></i><br>
                            {{
                              selectedTrItem.action === "REVIEW"
                                  ? $t("confirm")
                                  : selectedTrItem.action === "AGREEMENT"
                                      ? $t("submodules.reports.make_agreement")
                                      : ""
                            }}
                          </b-button>
                          <b-button
                              v-if="(selectedTrItem.applicationTypeInProject === 'FROM_DXA' && selectedTrItem.status ==='SEND_SIGN'
                              && selectedTrItem.action ==='SIGNATURE')"
                              variant="success"
                              @click="signAcceptedItem(selectedTrItem)"
                          >
                            <i class="fa fa-check"></i><br>
                            {{ $t("submodules.reports.doc_make_sign") }}
                          </b-button>
                          <b-button
                              v-if="(selectedTrItem.applicationTypeInProject === 'FROM_DXA' && selectedTrItem.status ==='SEND_SIGN'
                              && selectedTrItem.action ==='SIGNATURE') "
                              variant="danger"
                              @click="signRejectedItem(selectedTrItem)"
                          >
                            <i class="fa fa-times"></i><br>
                            {{ $t("submodules.reports.doc_reject_make_sign") }}
                          </b-button>
                          <b-button
                              v-if="selectedTrItem.applicationTypeInProject !== 'FROM_DXA'
                                 && selectedTrItem.applicationTypeInProject !=='NOT_BELONG'
                                 && ['TO_SIGN_REJECT_LETTER', 'SENT_FOR_REJECT', 'REJECTED', 'TO_INVOKE_SIGNED', 'TO_SIGN_FINISH_LETTER', 'SEND_SIGN_FINISH',
                                 'FINISH_LETTER_SIGN_AND_SEND', 'SEND_SIGN_TO_RETURN', 'SEND_SIGN', 'SEND_SEEN_CLOSED'].indexOf(selectedTrItem.status) === -1
                                 && !selectedTrItem.isForCommission && !selectedTrItem.isHeadOfDepartment"
                              variant="danger"
                              @click="showRejectedModal"
                          >
                            <i class="fa fa-times"></i><br>
                            {{ $t("submodules.reports.rejected") }}
                          </b-button>
                          <b-button
                              v-if="computedMakeSignedCompromiseDecisionToReject"
                              variant="danger"
                              @click="showRejectedModal"
                          >
                            <i class="fa fa-times"></i><br>
                            {{ $t("submodules.commission.doc_status.reject_begin_commission") }}
                          </b-button>
                          <b-button
                              v-if="selectedTrItem.applicationTypeInProject !== 'FROM_DXA'
                                 && selectedTrItem.applicationTypeInProject !=='NOT_BELONG'
                                 && ['SEND_SIGN'].indexOf(selectedTrItem.status) !== -1 && !selectedTrItem.isHeadOfDepartment"
                              variant="warning"
                              @click="showRejectedModal"
                          >
                            <i class="fa fa-times"></i><br>
                            {{ $t("submodules.commission.returnsee") }}
                          </b-button>
                          <!--Rasmiylatirishda hato kamchiliklar tufayli qaytarildi-->
                          <b-button
                              v-if="(selectedTrItem.applicationTypeInProject === 'FROM_DXA' && selectedTrItem.status === 'SEND_SIGN')"
                              v-b-tooltip.hover.top
                              :title="$t('submodules.commission.returnByRais')"
                              class="ml-1"
                              variant="warning"
                              @click="showRejectedByRaisModal(selectedTrItem)"
                          >
                            <i class="fa fa-times"></i><br>
                            {{ $t("column.return") }}
                          </b-button>
                          <b-button
                              v-if="['TO_SIGN_REJECT_LETTER'].indexOf(selectedTrItem.status) === -1 && selectedTrItem.action === 'SIGNATURE' && selectedTrItem.fileType === 'docx'"
                              :to="{
                                name: 'Office-DOCUMENT-commission',
                                query: { id: selectedTrItem.letterId, page: 'GET' },
                              }"
                              target="_blank"
                              variant="light"
                          >
                            <i class="fa fa-pencil-alt"></i><br>
                            {{ $t("actions.edit") }}
                          </b-button>
                        </b-button-group>
                        <!-- Loyihani korish va attachmentni  korish -->
                        <b-button-group>
                          <!-- loyihani korish-->
                          <b-button
                              v-if="['TO_SIGN_REJECT_LETTER', 'REJECTED', 'TO_INVOKE_SIGNED', 'FINISH_LETTER_SIGN_AND_SEND'].indexOf(selectedTrItem.status) === -1 &&
                                    ['LETTER_FINISH', 'LETTER_REJECT'].indexOf(selectedTrItem.letterType) === -1"
                              variant="info"
                              @click="viewProject(selectedTrItem)"
                          >
                            <i class="fa fa-eye"></i><br>
                            {{ selectedTrItem.projectType === 'COMMISSION' ? $t("actions.view_commission") : $t("actions.view_project") }}
                          </b-button>
                          <!-- Xujjatni ko'rish -->
                          <b-button variant="primary" @click="viewIlova(selectedTrItem)"
                                    v-if="getExt(selectedTrItem.uploadPath ? selectedTrItem.uploadPath : selectedTrItem.url) === 'pdf'">
                            <i class="fa fa-eye"></i><br>
                            {{ $t("actions.view_document") }}
                          </b-button>
                          <!-- Xujjatni docx bolsa only ofisga otish ko'rish [pastroqda bir bi xil tugma bor] -->
                          <b-button
                              variant="outline-info"
                              @click="openOnlyOffice(selectedTrItem.letterId)"
                              v-if="selectedTrItem.applicationTypeInProject === 'FROM_DXA' && getExt(selectedTrItem.uploadPath ? selectedTrItem.uploadPath : selectedTrItem.url) === 'docx'">
                            <i class="fa fa-pen"></i><br>
                            {{ $t("actions.edit") }}
                          </b-button>
                        </b-button-group>
                      </div>
                      <b-button-group v-else>
                        <b-button v-if="['TO_SIGN_REJECT_LETTER', 'REJECTED', 'TO_INVOKE_SIGNED', 'FINISH_LETTER_SIGN_AND_SEND'].indexOf(selectedTrItem.status) === -1 &&
                                    ['LETTER_FINISH', 'LETTER_REJECT'].indexOf(selectedTrItem.letterType) === -1"
                            variant="info" @click="viewProject(selectedTrItem)">
                          <i class="fa fa-eye"></i><br>
                          {{ $t("actions.view_project") }}
                        </b-button>
                        <!-- Xujjatni ko'rish -->
                        <b-button
                            variant="primary"
                            @click="viewIlova(selectedTrItem)"
                            v-if="getExt(selectedTrItem.uploadPath ? selectedTrItem.uploadPath : selectedTrItem.url) === 'pdf'"
                        >
                          <i class="fa fa-eye"></i><br>
                          {{ $t("actions.view_document") }}
                        </b-button>
                        <!-- Xujjatni docx bolsa only ofisga otish ko'rish [teparoqda bior xil tugma bor] -->
                        <b-button
                            variant="outline-info"
                            @click="openOnlyOffice(selectedTrItem.letterId)"
                            v-if="getExt(selectedTrItem.uploadPath ? selectedTrItem.uploadPath : selectedTrItem.url) === 'docx' && selectedTrItem.status !== 'CANCELED'"
                        >
                          <i class="fa fa-pen"></i><br>
                          {{ $t("actions.edit") }}
                        </b-button>
                      </b-button-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("docName") }}
                    </b>
                  </td>
                  <td>
                    {{ selectedTrItem.id && selectedTrItem.fileName ? selectedTrItem.fileName : "" }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("docCreatedDate") }}
                    </b>
                  </td>
                  <td>
                    {{ selectedTrItem.created }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("submodules.dxa.dxa_application_number") }}
                    </b>
                  </td>
                  <td>
                    {{ visaInfoById.applicationRegNumber }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("submodules.commission.income_date") }}
                    </b>
                  </td>
                  <td>
                    {{ visaInfoById.dateCameFromDxa }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b> {{ $t("submodules.dxa.application_type") }}</b> <br>
                  </td>
                  <td>
                    <span v-if="visaInfoById.applicationType === 'FOR_SALE'" class="text-left" style="font-size: 12px">
                      {{ $t("submodules.dxa.dxa_application_1") }}
                    </span>
                    <span
                        v-else-if="visaInfoById.applicationType === 'FOR_ADD'"
                        class="text-left"
                        style="font-size: 12px"
                    > {{ $t("submodules.dxa.dxa_application_2") }}
                    </span>
                  </td>
                </tr>
                <tr v-if="selectedTrItem.isForCommission">
                  <td colspan="2">
                    <div class="p-2 bg-gradient bg-info rounded text-white">
                      {{ $t("submodules.commission.doc_status.send_for_commission") }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>{{ $t("whoSent") }}</b>
                  </td>
                  <td class="pl-0">
                    <ul v-if="selectedTrItem.id" id="il" class="list-unstyled chat-list">
                      <li>
                        <div class="media d-flex" style="align-items: center">
                          <div class="align-self-center mr-3"></div>
                          <div v-if="selectedTrItem.senderUploadPath" class="align-self-center mr-3">
                            <img
                                :src="`${hrUrl}/${selectedTrItem.senderUploadPath}`"
                                alt
                                class="rounded-circle avatar-sm"
                                height="auto"
                            />
                          </div>
                          <div v-if="!selectedTrItem.senderUploadPath" class="avatar-sm align-self-center mr-3">
                            <span class=" avatar-title rounded-circle bg-soft-primary text-white">
                              {{ selectedTrItem?.senderFirstName?.charAt(0) }}
                            </span>
                          </div>
                          <div class="media-body overflow-hidden">
                            <h5 class="font-size-14 mb-1">
                              {{
                                `${selectedTrItem.senderLastName} ${selectedTrItem.senderFirstName} ${selectedTrItem.senderParentName}`
                              }}
                            </h5>
                            <p class="m-0">
                              {{
                                getName({
                                  nameLt: selectedTrItem.senderDepNameLt,
                                  nameRu: selectedTrItem.senderDepNameRu,
                                  nameUz: selectedTrItem.senderDepNameUz,
                                })
                              }}
                            </p>
                            <p class="m-0">
                              {{
                                getName({
                                  nameLt: selectedTrItem.senderPositionNameLt,
                                  nameRu: selectedTrItem.senderPositionNameRu,
                                  nameUz: selectedTrItem.senderPositionNameUz,
                                })
                              }}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>{{ $t("puropseOfSending") }}</b>
                  </td>
                  <td>
                    {{
                      selectedTrItem.id
                          ? selectedTrItem.action === "SIGNATURE"
                              ? $t("forSignature")
                              : selectedTrItem.action === "AGREEMENT"
                                  ? $t("forAgreement")
                                  : selectedTrItem.action === "REVIEW"
                                      ? $t("forReview")
                                      : ""
                          : ""
                    }}
                  </td>
                </tr>
                <tr v-if="selectedTrItem.comment !== null && selectedTrItem.comment !== ''">
                  <td class="text-muted">
                    <b>{{ $t("column.comment") }}</b>
                  </td>
                  <td>
                    {{ selectedTrItem.comment }}
                  </td>
                </tr>
                <tr v-if="filesList.length > 0">
                  <td class="text-muted">
                    <b>{{ $t("letter_ilovalar") }}</b>
                  </td>
                  <td></td>
                </tr>
                <tr v-for="(item, index) in filesList" :key="index + 'FILE'" class="mt-3">
                  <td class="p-2" colspan="2">
                    <div class="d-flex align-items-center bg-light p-2 justify-content-between">
                      <div class="d-flex align-items-center">
                        <a
                            :download="getExt(item.uploadPath) === 'pdf' ? false: item.uploadPath"
                            :href="getExt(item.uploadPath) === 'pdf' ? `#` : `${baseUrl}/${item.uploadPath}`"
                            @click="viewIlova(item)"
                        >
                          <FileView :uploadPath="item.fileName" class="my-card-hovered"/>
                        </a>
                        <span class="ml-2">
                          {{ item.fileName }}
                        </span>
                      </div>
                      <a
                          :href="`${baseUrl}/${item.uploadPath}`"
                          class="mr-3 p-1 btn btn-sm btn-light"
                          download
                      >
                        <i class="bx bx-download font-size-20"></i>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr v-if="selectedTrItem.isRejectLetterCreated && rejectedLetter">
                  <td class="text-muted">
                    <a :download="getExt(rejectedLetter.url) === 'pdf' ? false : rejectedLetter.url"
                       :href="getExt(rejectedLetter.url) === 'pdf' ? `#` : `${baseUrl}/${rejectedLetter.url}`"
                       @click="viewFile(rejectedLetter.url)"
                    >
                      <FileView :uploadPath="rejectedLetter.url" class="d-inline-block my-card-hovered"/>
                      <b class="align-top d-inline-block p-2 py-3">{{ rejectedLetter.fileName }}</b>
                    </a>
                  </td>
                  <td>
                    <b-btn variant="success m-2" @click="sendLetterToChairman.modal = true"
                           v-if="rejectedLetter.status === 'CREATED'">
                      <i class="fa fa-file-signature"></i>
                      {{ $t('submodules.commission.send_for_sign') }}
                    </b-btn>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>{{ $t("qabulQiluvchilar") }}</b>
                  </td>
                  <td></td>
                </tr>
                </tbody>
              </table>
              <b-overlay
                  :opacity="0.1"
                  :show="loaderReceiver"
                  rounded="sm"
              >
                <Receivers
                    :selectedAgreement="infoData.agreement"
                    :selectedReview="infoData.review"
                    :selectedSignature="infoData.signature"
                />
              </b-overlay>
              <!-- COMMISSION FILES -->
              <div class="wrapper" v-if="selectedTrItem && projectFilesList.length">
                <span CLASS="fromcenter">{{ $t('commission_attached_files') }}</span>
              </div>
              <div
                  v-if="selectedTrItem && projectFilesList.length"
                  class="card card-body card-tabs mt-1"
                  style="min-height: 10em; width: 100%"
              >
                <tr v-for="(item, index) in projectFilesList" :key="index + 'FILE'" class="mt-1">
                  <div class="d-flex align-items-center bg-light p-2 justify-content-between">
                    <div class="d-flex align-items-center">
                      <a :download="getExt(item.url) === 'pdf' ? false : item.url"
                         :href="getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"
                         @click="viewIlovaProject(item.url)"
                      >
                        <BaseFileViewer :uploadPath="item.url" class="my-card-hovered"/>
                      </a>
                      <span class="ml-2">
                        {{ item.fileName }}
                      </span>
                    </div>
                  </div>
                </tr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        v-model="viewFileModal"
        :title="$t('actions.view')"
        scrollable
        size="xl"
    >
      <div
          v-if="fileUploadPath"
          style="height: 700px"
      >
        <embed
            :src="`${baseUrl}/${fileUploadPath}`"
            height="800"
            type="application/pdf"
            width="100%"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button
            variant="secondary"
            @click="viewFileModal = false"
        >{{
            $t("actions.close")
          }}
        </b-button>
      </template>
    </b-modal>
  </div>
  <!-- </Layout> -->
</template>

<style>
.bg-class {
  background-color: #fbfbfb !important;
}
</style>