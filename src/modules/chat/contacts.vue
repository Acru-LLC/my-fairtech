<template>
  <div>
    <vue-easy-lightbox
      :visible="singleImage"
      :imgs="`${publicPath}${uploadPath}`"
      @hide="singleImage = false"
    ></vue-easy-lightbox>
    <simplebar
      :key="cmpKey + 'FORWARD_CONTACTS'"
      style="height: 410px"
      id="contact-list"
      ref="contactsRef"
    >
      <ul class="list-unstyled chat-list">
        <li
          :class="{ active: username == `${data.firstName} ${data.lastName}` }"
          :id="contactList[contactList.length - 1].id == data.id ? 'lid' : ''"
          v-for="(data, index) in contactList"
          :key="data.employeeId + 'CONTACTS_FOR_CHAT' + index"
          @click="$emit('contactUsername', data)"
        >
          <a href="javascript: void(0);">
            <div class="media d-flex" style="align-items: center">
              <div class="align-self-center mr-3"></div>
              <div class="align-self-center mr-3" v-if="data.uploadPath">
                <img
                  @click="
                    () => {
                      uploadPath = data.uploadPath;
                      singleImage = true;
                    }
                  "
                  :src="`${publicPath}${data.uploadPath}`"
                  class="rounded-circle avatar-sm"
                  alt
                />
              </div>
              <div
                class="avatar-sm align-self-center mr-3"
                v-if="!data.uploadPath"
              >
                <span
                  class=" avatar-title rounded-circle bg-soft-primary text-white "
                  >{{ data.firstName.charAt(0) }}</span
                >
              </div>
              <div class="media-body overflow-hidden">
                <h5 :class="check(data)" class="font-size-14 mb-1">
                  {{ `${data.lastName} ${data.firstName} ${data.middleName}` }}
                </h5>
                <span>
                  {{ data.depName }}
                </span>
                <span>
                  {{ data.posName }}
                </span>
              </div>
              <i
                v-if="check(data)"
                class="fas fa-user-check font-size-18 text-primary"
              ></i>
            </div>
          </a>
        </li>
      </ul>
    </simplebar>
  </div>
</template>

<script>
import messengerService from "@/shared/services/messengerService";
import simplebar from "simplebar-vue";
import VueEasyLightbox from "vue-easy-lightbox";
// import { getName } from "@/helper";
export default {
  props: {
    members: {
      type: Array,
      default: () => [],
    },
    username: {
      type: String,
      default: "",
    },
  },
  components: {
    simplebar,
    VueEasyLightbox,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      // getName: getName,
      searchValue: "",
      uploadPath: "",
      contactList: [],
      contactPage: 0,
      singleImage: false,
      cmpKey: 0,
    };
  },
  methods: {
    reset(v = "") {
      this.cmpKey += 1;
      this.searchValue = v;
      setTimeout(() => {
        this.getClickTab({ page: 0, itemsPerPage: 30, search: v });
        this.scrollActive();
      }, 200);
    },
    scrollActive() {
      if (this.$refs.contactsRef && this.$refs.contactsRef.SimpleBar) {
        this.$refs.contactsRef.SimpleBar.getScrollElement().addEventListener(
          "scroll",
          (e) => {
            let { scrollTop, scrollHeight, clientHeight } = event.target;
            const offsetForTrigger = 1;
            if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
              this.loadMoreContact();
            }
          }
        );
      }
    },
    check(v) {
      let index = this.members.indexOf(v.employeeId);
      if (index > -1) {
        return ["font-weight-bold", "text-primary"];
      } else {
        return false;
      }
    },
    getClickTab(v) {
      this.contactPage = 0;
      this.getContacts(v);
    },
    getContacts(v) {
      messengerService
        .getContactList(v)
        .then(({ data }) => {
          if (data) {
            this.$nextTick(() => {
              this.contactList = data.list.map((e) => {
                return {
                  firstName: e.firstName,
                  lastName: e.lastName,
                  middleName: e.middleName,
                  depName: this.getName({
                    nameUz: e.depNameUz,
                    nameLt: e.depNameLt,
                    nameRu: e.depNameRu,
                  }),

                  posName: this.getName({
                    nameUz: e.positionNameUz,
                    nameLt: e.positionNameLt,
                    nameRu: e.positionNameRu,
                  }),
                  employeeId: e.id,
                  id: e.chatId,
                  uploadPath: e.uploadPath,
                };
              });
            });
          }
        })
        .catch((err) => {
          // catchErr(err);
        });
    },
    loadMoreContact() {
      messengerService
        .getContactList({
          page: (this.contactPage += 1),
          itemsPerPage: 20,
          search: this.searchValue,
        })
        .then(async ({ data }) => {
          if (data.list.length > 0) {
            let contactList = data.list.map((e) => {
              return {
                firstName: e.firstName,
                lastName: e.lastName,
                middleName: e.middleName,
                depName: this.getName({
                  nameUz: e.depNameUz,
                  nameLt: e.depNameLt,
                  nameRu: e.depNameRu,
                }),

                posName: this.getName({
                  nameUz: e.positionNameUz,
                  nameLt: e.positionNameLt,
                  nameRu: e.positionNameRu,
                }),
                employeeId: e.id,
                id: e.chatId,
                uploadPath: e.uploadPath,
              };
            });
            this.$nextTick(() => {
              this.contactList = this.contactList.concat(contactList);
            });
          } else {
            this.contactPage = this.contactPage - 1;
          }
        })
        .catch((err) => {
          // catchErr(err);
        });
    },
  },
  mounted() {
    var container3 = document.querySelector(
      "#contact-list .simplebar-content-wrapper"
    );
    if (container3) {
      container3.scrollTo({ top: 500, behavior: "smooth" });
    }
    // Contact list actions
    this.$refs.contactsRef.SimpleBar.getScrollElement().addEventListener(
      "scroll",
      (e) => {
        let { scrollTop, scrollHeight, clientHeight } = event.target;
        const offsetForTrigger = 1;
        if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
          this.loadMoreContact();
        }
      }
    );
  },
};
</script>

<style>
</style>