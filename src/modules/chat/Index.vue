<template>
  <Layout>
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.chat.title') }}</div>
    </div>
    <div>
      <vue-easy-lightbox :visible="imageView" :imgs="`${baseUrl}${uploadPath}`" @hide="imageView = false"/>
      <b-modal
          v-model="fileModal"
          size="md"
          :no-close-on-backdrop="true"
          hide-header
          hide-footer
          centered
          body-class="p-0"
      >
        <b-overlay :opacity="0.1" :show="loaderFile" rounded="sm">
          <file-upload
              ref="fileComponent"
              v-if="file"
              :file="file"
              @cancel="() => { fileModal = false; file = null; }"
              @sendFile="sendFile"
          />
        </b-overlay>
      </b-modal>
    </div>
    <b-form-file ref="fileRef" style="display: none" v-model="file"/>
    <b-form-file
        ref="userAvatarFileRef"
        style="display: none"
        v-model="fileForUserAvatar"
        @input="updateUserAvatar"
    />
    <div class="d-lg-flex">
      <div class="chat-leftsidebar mr-lg-4">
        <div class>
          <div class="py-4">
            <div class="media align-items-center">
              <div class="align-self-center mr-3">
                <div class="avatar-container">
                  <b-spinner
                      v-if="userAvatarLoading"
                      variant="primary"
                      label="Loading"
                  ></b-spinner>
                  <img
                      v-else
                      alt
                      class="rounded-circle bg-light p-2 image"
                      :src="`${userAvatarUrlFromStorage ? publicPath+userAvatarUrlFromStorage : require('@/assets/images/users/default-avatar.png')}`"
                  />
                  <div class="overlay">
                    <div
                        @click="userAvatarClicked"
                        class=" avatar-edit-pencil d-flex align-items-center justify-content-center bg-primary "
                    >
                      <i class="mdi mdi-camera-plus-outline text-white" style="font-size: 2rem;"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="media-body">
                <h5 class="font-size-15 mt-0 mb-1">
                  {{ `${userFullName}` }}
                </h5>
                <p class="text-muted mb-0">
                  <i class="mdi mdi-circle text-success align-middle mr-1"></i>
                  {{ $t("active") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-leftsidebar-nav mt-0">
          <b-tabs pills fill content-class="my-2" v-model="index">
            <b-tab title="Tab 1" active>
              <template v-slot:title>
                <i class="bx bx-chat font-size-20 d-sm-none"></i>
                <span class="d-none d-sm-block">{{ $t("chat.chat") }}</span>
              </template>
              <div class="search-box chat-search-box py-2 mb-2">
                <div class="position-relative">
                  <input type="text" class="form-control" v-model="searchChat" :placeholder="$t('actions.filter')"/>
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
              <Chats ref="chatComponent" :username="username" @chatClick="chatUsername" :ch="CHAT"/>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="bx bx-group font-size-20 d-sm-none"></i>
                <span class="d-none d-sm-block">{{ $t("chat.groups") }}</span>
              </template>
              <div class="search-box chat-search-box py-2 mb-2">
                <div class="position-relative">
                  <input type="text" class="form-control" v-model="searchGroup" :placeholder="$t('actions.filter')"/>
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
              <Groups :group="CHAT" :username="username" @groupClick="groupUsername" ref="groupComponent"/>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="bx bx-book-content font-size-20 d-sm-none"></i>
                <span class="d-none d-sm-block">{{ $t("chat.contacts") }}</span>
              </template>
              <b-card-text>
                <div class="search-box chat-search-box py-2 mb-2">
                  <div class="position-relative">
                    <input
                        type="text"
                        class="form-control"
                        v-model="searchContact"
                        :placeholder="$t('actions.filter')"
                    />
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                </div>

                <Contacts :username="username" ref="contactComponent" @contactUsername="contactUsername"/>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </div>
      </div>
      <div v-if="mobileChat">
        <b-sidebar class="sidebar-chat" shadow sidebar-class="p-0" :no-header="true" right v-model="isSidebarChat">
          <Messages
              ref="messageRef"
              @back="isSidebarChat = false"
              @editGroup="editGroup"
              @searchMsg="searchMsg"
              @deleteMsg="deleteMsg"
              @formSubmit="formSubmit"
              @fileUpload="fileUpload"
              @selectEmoji="selectEmoji"
              @deleteGroup="deleteGroup"
              @contactUsername="contactUsername"
              @viewGroupMembers="viewGroupMembers"
              @addMembersToGroup="addMembersToGroup"
              @getMessagesByChatId="getMessagesByChatId"
              @getMessagesByGroupId="getMessagesByGroupId"
              @viewImageFromMessages="viewImageFromMessages"
              :noMsg="noMsg"
              :emojies="emojies"
              :username="username"
              :messages="messages"
              :chatType="chatType"
              :submitted="submitted"
              :currentContact="CHAT"
              :mobileChat="mobileChat"
          />
        </b-sidebar>
      </div>

      <Messages
          v-else
          @editGroup="editGroup"
          @deleteGroup="deleteGroup"
          @addMembersToGroup="addMembersToGroup"
          @viewGroupMembers="viewGroupMembers"
          @contactUsername="contactUsername"
          @searchMsg="searchMsg"
          ref="messageRef"
          @fileUpload="fileUpload"
          @viewImageFromMessages="viewImageFromMessages"
          @getMessagesByGroupId="getMessagesByGroupId"
          @getMessagesByChatId="getMessagesByChatId"
          @selectEmoji="selectEmoji"
          @formSubmit="formSubmit"
          @deleteMsg="deleteMsg"
          :currentContact="CHAT"
          :username="username"
          :messages="messages"
          :emojies="emojies"
          :submitted="submitted"
          :noMsg="noMsg"
          :chatType="chatType"
          :mobileChat="mobileChat"
      />
    </div>
    <b-modal v-model="isEdit" size="lg" :no-close-on-backdrop="true" hide-header hide-footer body-class="p-0">
      <Edit ref="editRef" :emojies="emojies" @cancel="isEdit = false" @save="saveEdit"/>
    </b-modal>

    <!-- GROUP MEMBERS -->
    <b-modal v-model="groupMembersModal" size="lg" hide-footer body-class="p-0" :no-close-on-backdrop="true">
      <div>
        <div class="pl-5 pr-5 pb-2 pt-2">
          <div class="search-box">
            <div class="position-relative">
              <input
                  type="text"
                  class="form-control"
                  v-model="searchGroupMembers"
                  :placeholder="$t('actions.filter')"
              />
              <i class="bx bx-search-alt search-icon"></i>
            </div>
          </div>
        </div>
        <div>
          <GroupMembers
              @setTotalForGroupMember="setTotalForGroupMember"
              @close="groupMembersModal = false"
              :searchValue="searchGroupMembers"
              :group="CHAT"
              ref="groupMemberRef"
          />
        </div>
      </div>
      <template v-slot:modal-header>
        <div style="width: 100%" class="d-flex justify-content-between align-items-center">
          <div class="d-flex">
            <h5 class="pre">{{ CHAT.groupName }}</h5>
          </div>
          <div>
            <b-button variant="white" class="btn-label">
              {{ `${$t("chat.group_members")}` }}
              <b-badge class="ml-1" variant="primary">
                {{ totalGroupMember }}
              </b-badge>
            </b-button>
            <div class="float-right">
              <b-button class="mr-1" variant="light" @click="addMemberFromModal" >
                <i class="fa fa-user-plus"></i>
              </b-button>
              <b-button variant="light" @click="groupMembersModal = false" >
                <i class="fa fa-times"></i>
              </b-button>
            </div>
          </div>
        </div>
      </template>
    </b-modal>

    <b-modal v-model="addGroupMembersModal" size="lg" hide-footer body-class="p-0" :no-close-on-backdrop="true" >
      <div>
        <div class="pl-5 pr-5 pb-2 pt-2">
          <div class="search-box">
            <div class="position-relative">
              <input
                  type="text"
                  class="form-control"
                  v-model="searchGroupMembersAdd"
                  :placeholder="$t('actions.filter')"
              />
              <i class="bx bx-search-alt search-icon"></i>
            </div>
          </div>
        </div>
        <div>
          <AddGroupMembers
              @close="closeModalAddMember"
              :searchValue="searchGroupMembersAdd"
              :group="CHAT"
              ref="addGroupMemberRef"
          />
        </div>
      </div>
      <template v-slot:modal-header>
        <div style="width: 100%">
          <b-button class="float-right" variant="light" @click="addGroupMembersModal = false" >
            <i class="fa fa-times"></i>
          </b-button>
          <div class="d-flex">
            <h5 class="pre">{{ CHAT.groupName }}</h5>
          </div>
        </div>
      </template>
    </b-modal>

    <!-- GROUP EDIT -->

    <b-modal v-model="editGroupModal" size="lg" body-class="p-0" :no-close-on-backdrop="true" >
      <div>
        <div>
          <EditGroup @close="editGroupModal = false" :group="CHAT" ref="editGroupRef" />
        </div>
      </div>
      <template v-slot:modal-header>
        <div style="width: 100%">
          <b-button class="float-right" variant="light" @click="editGroupModal = false" >
            <i class="fa fa-times"></i>
          </b-button>
        </div>
      </template>

      <template v-slot:modal-footer>
        <div style="width: 100%">
          <b-button size="lg" class="float-right" variant="success" @click="saveEditedData" >
            <b-overlay :opacity="0.1" :show="loaderEdit" rounded="sm" >
              <i class="fa fa-save"></i>
              {{ $t("actions.save") }}
            </b-overlay>
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- end row -->
  </Layout>
</template>
<script>
import VueEasyLightbox from "vue-easy-lightbox";
import Layout from "@/router/layouts/main";
import appConfig from "@/app.config";
// import PageHeader from "@/components/page-header";
import { mapActions, mapState } from "vuex";

import messengerService from "@/shared/services/messengerService";
import { TokenService } from "@/shared/services/storage.service"

import fileUpload from "./file-upload";
import Chats from "./chats";
import Contacts from "./contacts";
import Groups from "./groups";
import Edit from "./edit";
import Messages from "./messages";
import GroupMembers from "./groupMembers";
import AddGroupMembers from "./addNewMembersToGroup.vue";
import EditGroup from "./editGroup.vue";
/**
 * Chat Component
 */
import i18n from "@/i18n";

export default {
  watch: {
    innerWidth: {
      handler(v) {
        this.setWindowWidthPrivate(v);
      },
    },
    index(v) {
      if (v === 2) {
        this.$refs.contactComponent.getClickTab({
          page: 0,
          itemsPerPage: 10,
          search: this.searchContact,
        });
      } else if (v === 0) {
        this.$refs.chatComponent.getClickTab({
          page: 0,
          itemsPerPage: 10,
          search: this.searchChat,
        });
      } else if (v === 1) {
        this.$refs.groupComponent.getClickTab({
          page: 0,
          itemsPerPage: 10,
          search: this.searchGroup,
        });
      }
    },
    file: {
      handler(v) {
        if (v) {
          this.fileModal = true;
          setTimeout(() => {
            this.$refs.fileComponent.setNameSize(v.name, v.size);
          }, 300);
        } else {
          this.$refs.fileComponent.setNameSize(null, null);
        }
      },
    },
    searchGroup() {
      if (this.index === 1) {
        this.$refs.groupComponent.getClickTab({
          page: 0,
          itemsPerPage: 10,
          search: this.searchGroup,
        });
      }
    },

    searchChat() {
      if (this.index === 0) {
        this.$refs.chatComponent.getClickTab({
          page: 0,
          itemsPerPage: 10,
          search: this.searchChat,
        });
      }
    },
    searchContact() {
      if (this.index === 2) {
        this.$refs.contactComponent.getClickTab({
          page: 0,
          itemsPerPage: 10,
          search: this.searchContact,
        });
      }
    },
  },
  page: {
    title: i18n.t("chat.chat"),
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    // PageHeader,
    fileUpload,
    Chats,
    Contacts,
    Groups,
    Edit,
    Messages,
    VueEasyLightbox,
    GroupMembers,
    AddGroupMembers,
    EditGroup,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      localUserAvatarUrl: null,
      userAvatarLoading: false,
      innerWidth: window.innerWidth,
      userFullName: TokenService.getFullName(),
      userId: TokenService.getUserId(),
      loaderEdit: false,
      editGroupModal: false,
      totalGroupMember: 0,
      searchGroupMembers: "",
      groupMembersModal: false,
      pag: { page: 0, itemsPerPage: 10 },
      loaderFile: false,
      chatId: null,
      uploadPath: null,
      imageView: false,
      emojies: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🤩",
        "🥳",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "☹️",
        "😣",
        "😖",
        "😫",
        "😩",
        "🥺",
        "😢",
        "😭",
        "😤",
        "😠",
        "😡",
        "🤬",
        "🤯",
        "😳",
        "🥵",
        "🥶",
        "😱",
        "😨",
        "😰",
        "😥",
        "😓",
        "🤗",
        "🤔",
        "🤭",
        "🤫",
        "🤥",
        "😶",
        "😐",
        "😑",
        "😬",
        "🙄",
        "😯",
        "😦",
        "😧",
        "😮",
        "😲",
        "🥱",
        "😴",
        "🤤",
        "😪",
        "😵",
        "🤐",
        "🥴",
        "🤢",
        "🤮",
        "🤧",
        "😷",
        "🤕",
        "🤑",
        "🤠",
      ],
      isEdit: false,
      searchValue: "",
      groupModal: false,
      fileModal: false,
      file: null,
      fileForUserAvatar: null,

      chatData: [],
      index: 0,
      isSidebarChat: false,

      noMsg: false,
      CHAT: null,
      loader: false,
      submitted: false,

      title: this.$t("chat.chat"),
      username: this.$t("chat.chat"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("chat.chat"),
          active: true,
        },
      ],
      chatType: "chat",

      // FORCHATMESSAGES
      page: 0,

      groupChatId: null,
      searchChat: "",
      searchContact: "",
      searchGroup: "",
      mobileChat: false,
      addGroupMembersModal: false,
      searchGroupMembersAdd: "",
    };
  },
  created() {
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
    this.setWindowWidthPrivate(this.innerWidth);
  },
  computed: {
    ...mapState("messenger", [
      "chatListMessages",
      "chatTotalMessages",
      "groupChatListMessages",
    ]),
    baseUrl() {
      return process.env.BASE_URL;
    },
    // ...mapState("employee", ["user"]),
    messages() {
      if (this.chatType === "group") {
        return this.groupChatListMessages;
      } else {
        return this.chatListMessages;
      }
    },
    userAvatarUrlFromStorage() {
      return TokenService.getUserAvatarUrl()
    }
  },
  methods: {
    ...mapActions("messenger", [
      "getByChatId",
      "sendMessage",
      "getByGroupChatId",
      "sendMessageGroup",
    ]),
    resetMessagesComponentProps() {
      this.CHAT = null
      this.username = this.$t("chat.chat")
      this.$store.commit('messenger/setListGroupChatMesseges', { list: [], total: 0 })
      this.submitted = false
      this.noMsg = false
    },
    updateUserAvatar() {
      this.userAvatarLoading = true
      messengerService
          .changeUserAvatar(this.fileForUserAvatar, this.userId)
          .then((rs) => {
            this.userAvatarLoading = false
            if (rs.data) {
              this.localUserAvatarUrl = rs.data
              TokenService.setUserAvatarUrl(rs.data)
            }
          })
          .catch((e) => {
            console.log(e)
            this.userAvatarLoading = false
          })
    },
    userAvatarClicked() {
      this.$refs.userAvatarFileRef.$el.firstChild.click()
    },
    closeModalAddMember() {
      this.addGroupMembersModal = false;
      this.searchGroupMembersAdd = "";
      if (this.groupMembersModal && this.$refs.groupMemberRef) {
        this.$refs.groupMemberRef.reset(this.searchGroupMembers);
      }
    },
    addMemberFromModal() {
      this.addMembersToGroup();
    },
    saveEditedData() {
      this.loaderEdit = true;
      let { file, name } = this.$refs.editGroupRef;
      messengerService
          .editGroup(file, name, this.CHAT.id)
          .then((rs) => {
            if (rs.data) {
              if (this.index === 1) {
                this.$refs.groupComponent.getClickTab({
                  page: 0,
                  itemsPerPage: 10,
                  search: this.searchGroup,
                });
              }
              this.editGroupModal = false;
              this.setUsername(rs.data.groupName);
            }
          })
          .catch(() => {
            // catchErr(e);
          })
          .finally(() => {
            this.loaderEdit = false;
          });
    },
    editGroup() {
      this.editGroupModal = true;
      setTimeout(() => {
        this.$refs.editGroupRef.setEditedData(
            this.CHAT.groupName,
            `${this.baseUrl}/${this.CHAT.uploadPath}`
        );
      }, 300);
    },
    deleteGroup() {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              messengerService
                  .deleteGroup(this.CHAT.id)
                  .then(() => {
                    if (this.index === 1) {
                      this.$refs.groupComponent.getClickTab({
                        page: 0,
                        itemsPerPage: 10,
                        search: this.searchGroup,
                      });
                    }
                    this.resetMessagesComponentProps()
                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(() => {
            // An error occurred
          })
    },
    addMembersToGroup() {
      this.addGroupMembersModal = true;
      this.searchGroupMembersAdd = "";

      setTimeout(() => {
        this.$refs.addGroupMemberRef.reset(this.searchGroupMembersAdd);
      }, 300);
    },
    setTotalForGroupMember(v) {
      this.totalGroupMember = v.total;
    },
    viewGroupMembers() {
      this.groupMembersModal = true;
      this.searchGroupMembers = "";
      setTimeout(() => {
        this.$refs.groupMemberRef.reset(this.searchGroupMembers);
      }, 300);
    },
    //MESSAGE SEARCHING CHAT AND GROUP
    async searchMsg(v) {
      if (this.CHAT.id) {
        const arg = {
          pag: this.pag,
          chatId: this.CHAT.id,
          search: v,
        };
        if (this.chatType === "group") {
          await this.getByGroupChatId(arg);
        } else {
          await this.getByChatId(arg);
        }
      }
    },
    //END

    viewImageFromMessages(path) {
      this.imageView = true;
      this.uploadPath = path;
    },
    setWindowWidthPrivate(v) {
      this.mobileChat = v < 992;
    },
    selectEmoji(e) {
      this.$refs.messageRef.form.message = String(
          this.$refs.messageRef.form.message.concat(e)
      );
    },

    //DELETE MESSAGE
    deleteMsg(id, groupChatId, chatId) {
      const deleteApi = (api, arg) => {
        api(arg)
            .then(() => console.log('deleted'))
            .catch(() => {
              // catchErr(err)
            });
      };
      if (this.chatType === "group") {
        deleteApi(messengerService.groupChatMessageDelete, {
          id,
          groupChatId,
        });
      } else {
        deleteApi(messengerService.chatMessageDelete, { id, chatId });
      }
    },

    saveEdit({ message }) {
      if (this.chatType === "group") {
        if (this.groupChatId) {
          messengerService
              .groupChatMessageUpdate({
                id: this.groupChatId,
                message: message,
              })
              .then(() => {
              })
              .catch(() => {
                // catchErr(err);
              });
        }
      } else {
        messengerService
            .chatMessageUpdate({
              id: this.chatId,
              message: message,
            })
            .then(() => {
            })
            .catch(() => {
              // catchErr(err);
            });
      }
    },
    updateMsg({ id, message, uploadPath, fileName }) {
      if (this.chatType === "group") {
        this.isEdit = true;
        this.groupChatId = id;
        setTimeout(() => {
          this.$refs.editRef.setMsg(message);
          this.$refs.editRef.setFile(fileName, uploadPath);
        }, 200);
      } else {
        this.isEdit = true;
        this.chatId = id;
        setTimeout(() => {
          this.$refs.editRef.setMsg(message);
          this.$refs.editRef.setFile(fileName, uploadPath);
        }, 200);
      }
    },
    finishSendFile(message, id, employeeId, file) {
      this.loaderFile = true;
      const messageRef = this.$refs.messageRef;
      let { toastData, toastStatus } = messageRef;
      if (toastStatus === "reply") {
        this.callApi(
            messengerService.replyChat,
            {
              chatId: id,
              message: message,
              file: file,
              id: toastData.id,
            },
            () => {
              this.$refs.fileComponent.reset();
              this.file = null;
              this.fileModal = false;
              this.loaderFile = false;
              this.handleScroll();
            }
        );
      } else {
        let data = {
          chatId: id || employeeId,
          ownerId: JSON.parse(localStorage.getItem("user_id")),
          file: file,
          message: message,
        };

        messengerService
            .sendFile(data)
            .then(() => {
              this.$refs.fileComponent.reset();
              this.file = null;
              this.fileModal = false;
              this.loaderFile = false;
              this.handleScroll();
            })
            .catch(() => {
              // catchErr(err);
            });
      }
    },

    sendFile(message, file) {
      if (this.chatType === "chat") {
        const { id, ownerId, employeeId } = this.CHAT;
        if (ownerId || id) {
          this.finishSendFile(message, id, employeeId, file);
        } else {
          this.finishSendFileFromContact(file, message);
        }
      } else {
        this.finishSendFileGroup(message, this.CHAT.id, file);
      }
    },
    finishSendFileFromContact(file, message) {
      messengerService
          .createChat(this.CHAT.employeeId)
          .then(async (rs) => {
            const { id, employeeId } = rs.data;
            if (id) {
              await this.getByChatId({ pag: this.pag, chatId: id });
              await this.finishSendFile(message, id, employeeId, file);
            }
          })
          .catch(() => {
            // catchErr(err);
          });
    },
    finishSendFileGroup(message, groupId, file) {
      this.loaderFile = true;
      let data = {
        groupChatId: groupId,
        ownerId: JSON.parse(localStorage.getItem("user_id")),
        file: file,
        message: message,
      };
      messengerService.sendImageGroup(data).then(() => {
        this.$refs.fileComponent.reset();
        this.file = null;
        this.fileModal = false;
        this.loaderFile = false;
        this.handleScroll();
      });
    },
    fileUpload() {
      this.$refs.fileRef.$el.firstChild.click();
    },

    getMessagesByChatId(cmp) {
      if (this.CHAT.id) {
        messengerService
            .getByChatId({
              pag: { page: (this.page += 1), itemsPerPage: 10 },
              chatId: this.CHAT.id,
            })
            .then(async ({ data }) => {
              this.$store.commit("messenger/pushItems", data.list);
              if (data.list.length > 0) {
                cmp.scrollTop = 800;
                this.noMsg = false;
              } else {
                this.noMsg = true;
                this.page + -1;
              }
            })
            .catch(() => {
              // catchErr(err);
            });
        this.handleScroll();
      }
    },
    getMessagesByGroupId(cmp) {
      messengerService
          .getByGroupChatId({
            pag: { page: (this.page += 1), itemsPerPage: 10 },
            chatId: this.CHAT.id,
          })
          .then(async ({ data }) => {
            if (data.list.length > 0) {
              cmp.scrollTop = 1500;
              this.$store.commit("messenger/pushGroupItems", data.list);
              this.noMsg = false;
            } else {
              this.noMsg = true;
              this.page + -1;
            }
          });
    },

    /**
     * Get the name of user
     */
    setUsername(name) {
      this.username = name;
    },
    async chatUsername(contact) {
      this.chatType = "chat";
      this.noMsg = false;
      this.page = 0;

      this.CHAT = contact;
      await this.$store.commit("messenger/setCurrentChat", contact);
      await this.setUsername(contact.myName);
      await this.getByChatId({
        pag: { page: 0, itemsPerPage: 10 },
        chatId: contact.id,
      });
      await this.setMobileChat();
    },
    setMobileChat() {
      if (this.mobileChat) {
        this.isSidebarChat = true;
      }
    },
    async groupUsername(group) {
      this.$nextTick(() => {
        this.noMsg = false;
        this.page = 0;
        this.chatType = "group";
        this.CHAT = group;
      });
      await this.$store.commit("messenger/setCurrentChat", group);
      await this.setUsername(group.groupName);
      await this.getByGroupChatId({
        pag: { page: 0, itemsPerPage: 10 },
        chatId: group.id,
      });
      await this.setMobileChat();
    },
    async contactUsername(contact) {
      this.$nextTick(() => {
        this.noMsg = false;
        this.CHAT = contact;
        this.chatType = "chat";
        this.page = 0;
      });
      await this.$store.commit("messenger/setCurrentChat", contact);
      await this.setUsername(
          ` ${contact.lastName} ${contact.firstName} ${contact.middleName}`
      );
      if (contact.id) {
        await this.getByChatId({
          pag: { page: 0, itemsPerPage: 10 },
          chatId: contact.id,
        });
      } else {
        await this.$store.commit("messenger/setListChatMesseges", {
          total: 0,
          list: [],
        });
      }

      await this.setMobileChat();
    },

    /**
     * Char form Submit
     */
    // eslint-disable-next-line no-unused-vars
    sendMsgGroup(message) {
      this.sendMessageGroup(
          JSON.stringify({
            message: message,
            groupChatId: this.CHAT.id,
            ownerId: JSON.parse(localStorage.getItem("user_id")),
          })
      );
      // this.form.message = "";
      this.handleScroll();
    },
    sendMsgApi(msg, chatId) {
      this.sendMessage(
          JSON.stringify({
            message: msg,
            chatId: chatId || empId,
            ownerId: JSON.parse(localStorage.getItem("user_id")),
          })
      );
    },
    async sendMsg(message) {
      if (this.CHAT.ownerId) {
        this.sendMsgApi(message, this.CHAT.id || this.CHAT.employeeId);
      } else {
        if (this.CHAT.id) {
          await this.sendMsgApi(message, this.CHAT.id || this.CHAT.employeeId);
        } else {
          messengerService
              .createChat(this.CHAT.employeeId)
              .then(async (rs) => {
                if (rs.data) {
                  await this.getByChatId({
                    pag: { page: 0, itemsPerPage: 10 },
                    chatId: rs.data.id,
                  });
                  this.sendMsgApi(message, rs.data.id || rs.data.employeeId);
                  this.isSidebarChat = false;
                }
              })
              .catch(() => {
                // catchErr(err);
              });
        }
      }
      this.handleScroll();
    },
    callApi(api, arg, func = null) {
      const messageRef = this.$refs.messageRef;
      const hideToast = () => {
        if (messageRef) messageRef.replyMsg(null, "hidden");
        this.handleScroll();
        if (func) {
          func();
        }
      };
      api(arg)
          .then(() => hideToast())
          .catch(() => {
            // catchErr(e)
          });
    },
    //MESSAGE SEND API
    async formSubmit() {
      const messageRef = this.$refs.messageRef;

      this.submitted = true;
      let { toastData, toastStatus } = messageRef;

      const message = messageRef.form.message;
      // stop here if form is invalid
      if ((!message || message.trim().length === 0) && toastStatus !== 'forward') {
        messageRef.$refs.msgInput.$el.focus()
      } else {
        let payload = {
          id: toastData ? toastData.id : null,
          message: message,
        };
        switch (toastStatus) {
          case "edit":
            if (this.chatType === "group") {
              this.callApi(messengerService.groupChatMessageUpdate, payload);
            } else {
              this.callApi(messengerService.chatMessageUpdate, payload);
            }
            break;

          case "forward":
            // eslint-disable-next-line no-case-declarations
            const { id, employeeId } = this.CHAT;
            if (this.chatType === "group") {
              this.callApi(messengerService.groupChatMessageUpdate, payload);
            } else {
              if (id) {
                this.callApi(messengerService.forwardChat, {
                  chatId: id,
                  ...payload,
                });
              } else {
                messengerService
                    .createChat(employeeId)
                    .then((rs) => {
                      this.callApi(messengerService.forwardChat, {
                        chatId: rs.data.id,
                        ...payload,
                      });
                    })
                    .catch(() => {
                      // catchErr(err);
                    });
              }
            }
            break;
          case "reply":
            if (this.chatType === "group") {
              this.callApi(messengerService.groupChatMessageUpdate, payload);
            } else {
              if (this.CHAT.id) {
                this.callApi(messengerService.replyChat, {
                  chatId: this.CHAT.id,
                  ...payload,
                });
              }
            }
            break;

          default:
            if (this.chatType === "chat") {
              await this.sendMsg(message);
            } else {
              await this.sendMsgGroup(message);
            }
            break;
            // }
        }
        this.submitted = false;
        messageRef.form.message = "";
        if (this.index === 2) {
          this.index = 0;
          setTimeout(() => {
            this.$refs.chatComponent.getClickTab({
              page: 0,
              itemsPerPage: 10,
              search: this.searchChat,
            });
            this.CHAT = null;
            this.username = this.$t("chat.chat");
          }, 300);
        }
      }
    },

    handleScroll() {
      const messageRef = this.$refs.messageRef;
      if (messageRef.$refs.current.$el) {
        setTimeout(() => {
          messageRef.$refs.current.SimpleBar.getScrollElement().scrollTop =
              messageRef.$refs.current.SimpleBar.getScrollElement().scrollHeight +
              1500;
        }, 500);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.sidebar-chat {
  .b-sidebar {
    width: 100vw;
    background: white;
  }
}

::v-deep.avatar-edit-pencil {
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  box-shadow: 5px 5px 5px #eee;
  border-radius: 50px;
  border: 3px solid white;
  cursor: pointer;
  /* background: #2b6c58; */
}

::v-deep.avatar-container {
  position: relative;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep.image {
  display: block;
  width: 5rem;
  height: 5rem;
}

::v-deep.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.3s ease;
}

::v-deep.avatar-container:hover .overlay {
  opacity: 1;
}

::v-deep.icon {
  color: white;
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

::v-deep.fa-user:hover {
  color: #eee;
}
</style>
