<template>
  <div
      :style="mobileChat ? `height:${heightWindow}px` : ''"
      class="w-100 user-chat"
      :class="mobileChat ? 'block-display-992' : 'none-display-992'"
  >
    <div class="card">
      <div class="p-3 border-bottom">
        <div class="row">
          <div class="col-md-4 col-9">
            <div>
              <b-button
                  @click="$emit('back')"
                  variant="primary"
                  v-if="mobileChat"
                  class="mb-2"
              >
                <i class="fa fa-arrow-left"></i>
              </b-button>
              <div class="d-flex align-items-center">
                <div v-if="currentContact && currentContact.uploadPath">
                  <img :src="`${publicPath}${currentContact.uploadPath}`" class="rounded-circle avatar-sm" alt/>
                </div>
                <div>
                  <h5 class="font-size-16 font-weight-bold ml-2">
                    {{ username }}
                  </h5>
                  <div v-if="chatType === 'group' && currentContact && currentContact.membersCount" class="ml-2">
                    <span @click="$emit(  'viewGroupMembers')" class="link-like">
                        {{ $t("chat.group_members") }}
                    </span>
                    <b-badge variant="primary" class="ml-2 font-size-12">
                      {{ currentContact.membersCount }}
                    </b-badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 col-3">
            <ul class="list-inline user-chat-nav text-right mb-0" v-show="currentContact">
              <li class="list-inline-item d-sm-inline-block">
                <b-dropdown menu-class="dropdown-menu-md right-0" variant="white" dropleft toggle-class="nav-btn">
                  <template v-slot:button-content>
                    <i class="bx bx-search-alt-2"></i>
                  </template>
                  <form class="p-3">
                    <div class="form-group m-0">
                      <div class="input-group">
                        <input
                            ref="messageInputRef"
                            type="text"
                            v-model="searchMessage"
                            class="form-control"
                            :placeholder="$t('actions.search')"
                            aria-label="Recipient's username"
                        />
                        <div class="input-group-append">
                          <button class="btn btn-primary" type="submit">
                            <i class="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </b-dropdown>
              </li>
              <li class="list-inline-item d-sm-inline-block">
                <b-dropdown
                    v-if="chatType === 'group'"
                    toggle-class="nav-btn"
                    variant="white"
                    menu-class="right-0"
                    right
                >
                  <template v-slot:button-content>
                    <i class="bx bx-cog"></i>
                  </template>
                  <b-dropdown-item
                      @click="$emit('editGroup')"
                      v-if="chatType === 'group'"
                  >{{ $t("actions.edit") }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="
                                        $emit(
                                        'deleteGroup'
                                        )
                                    ">{{ $t("actions.delete") }}
                  </b-dropdown-item>
                  <b-dropdown-item
                      @click="$emit('viewGroupMembers')"
                      v-if="chatType === 'group'"
                  >
                    {{ $t("chat.group_members") }}
                  </b-dropdown-item>
                  <b-dropdown-item
                      @click="$emit('addMembersToGroup')"
                      v-if="chatType === 'group'"
                  >{{ $t("actions.add_to_group") }}
                  </b-dropdown-item>

                  <!-- <b-dropdown-item>Muted</b-dropdown-item>
<b-dropdown-item>Delete</b-dropdown-item> -->
                </b-dropdown>
              </li>

              <!-- <li class="list-inline-item">
        <b-dropdown toggle-class="nav-btn" right variant="white">
          <template v-slot:button-content>
            <i class="bx bx-dots-horizontal-rounded"></i>
          </template>
          <b-dropdown-item>Action</b-dropdown-item>
          <b-dropdown-item>Another action</b-dropdown-item>
          <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>
</li> -->
            </ul>
          </div>
        </div>
      </div>

      <div class="chat-users">
        <div class="chat-conversation p-3">
          <simplebar
              :style="`height: ${mobileChat ? heightWindow - 220 : 440}px`"
              id="containerElement"
              ref="current"
          >
            <ul class="list-unstyled">
              <li v-if="noMsg">
                <div class="chat-day-title m-2">
                  <span class="title">{{ $t("messages.data_not_found") }}</span>
                </div>
              </li>
              <li
                  v-show="currentContact"
                  v-for="(data, index) in messages"
                  :key="index"
                  :class="{ right: data.my }"
                  :id="data.id"
                  class="msgClass"
              >
                <div class="conversation-list">
                  <b-dropdown
                      variant="white"
                      menu-class="right-0"
                      right
                  >
                    <template v-slot:button-content>
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </template>
                    <!-- <b-dropdown-item>Copy</b-dropdown-item>
<b-dropdown-item>Save</b-dropdown-item>-->
                    <b-dropdown-item
                        v-if="data.my"
                        @click="updateMsg(data)"
                    >{{
                        $t("actions.edit")
                      }}
                    </b-dropdown-item>
                    <b-dropdown-item @click="$emit('deleteMsg',data.id,data.groupChatId,data.chatId)">
                      {{ $t("actions.delete") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                        v-if="chatType === 'chat'"
                        @click="replyMsg(data, 'reply')"
                    >{{ $t("actions.reply") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                        v-if="chatType === 'chat'"
                        @click="forwardMsg(data, true)"
                    >{{ $t("actions.forward") }}
                    </b-dropdown-item>
                  </b-dropdown>
                  <div class="ctext-wrap">
                    <div class="conversation-name" v-if="chatType === 'group'">
                      {{ data.ownerFullName }}
                    </div>
                    <div v-if="data.forwardUserId" class="conversation-name">
                      <div
                          v-if="data.forwardUploadPath"
                          class="d-flex align-items-center justify-content-center"
                      >
                        <div>
                          <b-img style="cursor: pointer" width="200" :src="`${publicPath}${data.forwardUploadPath}`"
                                 v-if=" data.parentFileName && imageTypes.indexOf( getExtFromName(data.forwardFileName) ) > 0"/>
                          <a v-else :href="`${publicPath}${data.forwardUploadPath}`">
                            <FileView :uploadPath="data.forwardUploadPath"/>
                          </a>
                        </div>
                        <p class="mb-1">{{ data.forwardFileName }}</p>
                      </div>
                      {{ data.forwardUserId ? `${$t("chat.forwarded_msg")} ${data.forwardUserFullName} ${$t("column.from")}` : ""
                      }}
                    </div>
                    <div v-if="data.parentId" class=" pl-3 d-flex justify-content-start align-items-start " style="
                        border-left: 3px solid #2b6c58;
                        flex-direction: column;"
                    >
                      <div class="conversation-name">
                        {{ data.parentId ? `${data.parentFullName} ` : "" }}
                      </div>

                      <div
                          v-if="data.parentUploadPath"
                          class="d-flex align-items-center justify-content-center"
                      >
                        <div>
                          <b-img style="cursor: pointer" width="200" :src="`${publicPath}${data.parentUploadPath}`"
                                 v-if=" data.parentFileName && imageTypes.indexOf( getExtFromName(data.parentFileName) ) > 0 "
                          />

                          <a v-else :href="`${publicPath}${data.parentUploadPath}`">
                            <FileView :uploadPath="data.parentUploadPath"/>
                          </a>
                        </div>
                        <p class="mb-1">{{ data.parentFileName }}</p>
                      </div>

                      <span class="d-block text-dark ml-2" v-if="data.parentMessage">
                        {{ data.parentMessage }}
                      </span>
                    </div>
                    <div
                        v-if="data.uploadPath"
                        class="d-flex align-items-center"
                    >
                      <b-img v-if="imageTypes.indexOf(getExtFromName(data.fileName)) > 0"
                             style="cursor: pointer" width="200"
                             @click="$emit('viewImageFromMessages', data.uploadPath)"
                             :src="`${publicPath}${data.uploadPath}`"
                      />

                      <a v-else :href="`${publicPath}${data.uploadPath}`" :download="data.fileName">
                        <FileView :uploadPath="data.uploadPath"/>
                      </a>
                      <p class="mb-1 ml-2">{{ data.fileName }}</p>
                    </div>
                    <p
                        class="pre m-0 font-size-14"
                        style="
                        word-break: break-all !important;
                        max-width: 1050px;
                      "
                    >
                      {{ data.message }}
                    </p>
                    <p class="chat-time mb-0">
                      <span
                          v-if="data.edited"
                          class="mr-2"
                          style="font-size: 12px"
                      >{{ $t("edited") }}</span>
                      <!-- <i class="bx bx-time-five align-middle mr-1"></i> -->
                      {{ data.dateHour }}
                      <i
                          v-if="data.isRead === 'UNREAD' && data.my"
                          class="mdi mdi-check text-muted align-middle ml-1"
                      ></i>
                      <i
                          v-if="data.isRead === 'READ' && data.my"
                          class="mdi mdi-check-all text-muted align-middle ml-1"
                      ></i>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </simplebar>
        </div>
        <div class="p-3 chat-input-section">
          <div class="row" v-if="currentContact" >
            <div class="col">
              <div class="position-relative">
                <div
                    class="p-e bg-light replymsg"
                    v-if="
                    (toastStatus === 'reply' ||
                      toastStatus === 'forward' ||
                      toastStatus === 'edit') &&
                    toastData
                  "
                >
                  <div class="d-flex" style="justify-content: space-between" >
                    <div class="d-flex">
                      <div class="mr-2">
                        <i
                            class="fa"
                            :class="
                            toastStatus === 'reply'
                              ? 'fa-reply'
                              : toastStatus === 'edit'
                              ? 'fa-pencil-alt'
                              : 'fa-forward'
                          "
                        ></i>
                      </div>
                      <div>
                        <h6 class="m-0 text-primary">
                          {{ toastData.ownerFullName }}
                        </h6>

                        <div class="d-flex" style="align-items: center" >
                          <FileView :uploadPath="toastData.uploadPath"/>
                          <span class="d-block ml-2">
                            {{ toastData.fileName }}
                          </span>
                        </div>
                        <p class="m-0 pre" style="word-break: break-all !important; max-width: 900px; ">
                          {{ toastData.message }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <i
                          @click="replyMsg(null, 'hidden')"
                          class="fa fa-times text-hover-danger p-2"
                          style="font-size: 15px"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="position-relative">
                <b-form-input
                    @keyup.enter="$emit('formSubmit')"
                    rows="1"
                    max-rows="30"
                    type="text"
                    v-model="form.message"
                    class="chat-input"
                    ref="msgInput"
                    :placeholder="$t('messaging.title')"
                />
              </div>
            </div>
            <div class="float-left">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <b-button id="button-1" variant="light" placement="top" class="pt-1 pb-1 pl-2 pr-2" >
                    <i class="mdi mdi-emoticon-happy-outline font-size-16"></i>
                  </b-button>
                </li>
                <b-tooltip variant="light" placement="top" target="button-1" >
                  <div style="overflow: auto; height: 250px">
                    <span
                        style="cursor: pointer"
                        @click="$emit('selectEmoji', e)"
                        class="font-size-22 emoji d-inline-block"
                        v-for="(e, index) in emojies"
                        :key="index"
                    >{{ e }}</span>
                  </div>
                </b-tooltip>

                <li class="list-inline-item">
                  <b-button
                      :disabled="toastStatus === 'forward'"
                      @click="$emit('fileUpload')"
                      v-b-tooltip.hover
                      placement="top"
                      id="button-1"
                      variant="light"
                      class="pl-2 pr-2 pb-1 pt-1"
                  >
                    <i class="mdi mdi-file-document-outline font-size-16"></i>
                  </b-button>
                </li>
              </ul>
            </div>
            <div class="col-auto">
              <button @click.prevent="$emit('formSubmit')" class="btn btn-primary btn-rounded chat-send w-md" >
                <span class="d-none d-sm-inline-block mr-2">
                  {{ $t("actions.send") }}
                </span>
                <i class="mdi mdi-send"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="forwardModal" size="md" hide-header body-class="p-0" >
      <div>
        <div class="p-3">
          <h5>{{ $t("actions.forward") }}</h5>
        </div>
        <div class="p-2 mb-2">
          <div class="search-box">
            <div class="position-relative">
              <input type="text" class="form-control" v-model="searchValue" :placeholder="$t('actions.filter')" />
              <i class="bx bx-search-alt search-icon"></i>
            </div>
          </div>
        </div>
        <ContactsForward ref="contactRefForward" @contactUsername="contactUsername" />
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="clear" >
          {{ $t("actions.close") }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import ContactsForward from "./contacts";
import FileView from "./components/fileView.vue"
// import { required } from "vuelidate/lib/validators";
import simplebar from "simplebar-vue";
import { getExtFromName, imageTypes } from "@/helper";

export default {
  watch: {
    currentContact: {
      handler(v) {
        if (v) {
          setTimeout(() => {
            this.scrollBottom();
            // this.scrollTop();
          }, 200);
        }
      },
    },
    searchMessage: {
      handler(v) {
        this.$emit("searchMsg", v);
      },
    },
    searchValue: {
      handler(v) {
        if (this.$refs.contactRefForward) {
          this.$refs.contactRefForward.reset(v);
        }
      },
    },
  },
  props: [
    "currentContact",
    "messages",
    "emojies",
    "submitted",
    "username",
    "noMsg",
    "chatType",
    "mobileChat",
  ],
  validations: {
    form: {
      message: {
        // required,
      },
    },
  },
  components: {
    simplebar,
    ContactsForward,
    FileView
  },
  methods: {
    updateMsg(data) {
      this.form.message = data.message;
      this.replyMsg(data, "edit");
    },
    clear() {
      this.searchValue = "";
      this.forwardMsg(null, false);
    },
    async contactUsername(data) {
      this.searchValue = "";
      await this.forwardMsg(this.toastData, false);
      await this.replyMsg(this.toastData, "forward");
      await this.$emit("contactUsername", data);
    },
    forwardMsg(data, b) {
      this.toastData = data;
      this.forwardModal = b;
      setTimeout(() => {
        if (this.$refs.contactRefForward) {
          this.$refs.contactRefForward.reset();
        }
      }, 300);
    },
    replyMsg(data, b) {
      this.toastStatus = b;
      this.toastData = data;
    },
    scrollBottom() {
      let container2 = document.querySelector(
          "#containerElement .simplebar-content-wrapper"
      );
      if (container2) {
        container2.scrollTo({
          top: container2.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    scrollTop() {
      let container2 = document.querySelector(
          "#containerElement .simplebar-content-wrapper"
      );
      this.$refs.current.SimpleBar.getScrollElement().addEventListener("scroll", () => {
        if (container2.scrollTop === 0) {
          if (this.chatType === "chat") {
            this.$emit("getMessagesByChatId", container2);
          } else {
            this.$emit("getMessagesByGroupId", container2);
          }
        }
      });
    },
  },
  data() {
    return {
      heightWindow: window.innerHeight,
      publicPath: process.env.BASE_URL,
      searchValue: "",
      forwardModal: false,
      toastData: null,
      toastStatus: "hidden",
      form: {
        message: "",
      },
      imageTypes: imageTypes,
      getExtFromName: getExtFromName,
      searchMessage: "",
    };
  },
  mounted() {
    let vm = this;
    this.$root.$on("bv::dropdown::show", () => {
      setTimeout(() => {
        if (vm.$refs.messageInputRef) {
          vm.$refs.messageInputRef.focus();
        }
      }, 300);
    });

    setTimeout(() => {
      this.scrollBottom();
      this.scrollTop();
      // Messages scroll action
    }, 200);
  },
};
</script>

<style lang="scss">
.replymsg {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  padding: 10px;
  background: white;
}

.link-like {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.right-0 {
  left: unset !important;
  right: 0 !important;
}
</style>