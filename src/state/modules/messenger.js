import { TokenService } from "@/shared/services/storage.service"
import messengerService from "@/shared/services/messengerService";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Vue from "vue"
let globalStompClient = null;
export const state = {
  marketing: null,
  notification: null,
  contactList: [],
  contactTotal: 0,
  groupChatList: [],
  groupChatTotal: 0,
  comments: [],
  commentsTotal: 0,
  openPage: "default",
  chatListMessages: [],
  chatTotalMessages: 0,
  groupChatListMessages: [],
  groupChatTotalMessages: 0,
  lastMessage: {},
  lastMessageGroup: {},
  groupUpdate: false,
  groupUpdateMsg: null,
  incomingPerson: null,
  exitingPerson: null,
  chatUnreadCount: 0,
  unreadData: null,
  CHAT: null
}
export const mutations = {
  setCurrentChat(state, data) {
    state.CHAT = data
  },
  setChatMessageMakeRead(state, id) {
    let index = state.chatListMessages.findIndex(e => e.id == id)
    if (index > -1) {
      Vue.set(state.chatListMessages[index], "isRead", "READ")
    }
  },
  setChatUnreadMessagCount(state, count) {
    state.chatUnreadCount = count
    if (count > 0) {
      // playSound()
    }
  },
  setChatUnreadCount(state, data) {
    state.unreadData = data
  },
  setComments(state, data) {
    state.comments = data
  },
  setIncomingPerson(state, data) {
    state.incomingPerson = data
  },
  setExitingPerson(state, data) {
    state.exitingPerson = data
  },
  setMarketing(state, data) {
    state.marketing = data
  },
  setNotification(state, data) {
    state.notification = data
  },
  setGroupUpdateE(state, data) {
    state.groupUpdate = data;
  },
  setGroupChatUpdate(state, data) {
    state.groupUpdate = true;
    state.groupUpdateMsg = data;
  },
  setListResponseGroupChat(state, data) {
    state.groupChatList = data.list;
    state.groupChatTotal = data.total;
  },
  setListResponse(state, data) {
    state.contactList = data.list.map(e => {
      return {
        firstName: e.firstName,
        lastName: e.lastName,
        employeeId: e.employeeId,
        chatId: e.chatId,
        uploadPath: e.uploadPath
      }
    })
    state.contactTotal = data.total;
  },
  setOpenPage(state, data) {
    state.openPage = data;
  },
  setListChatMesseges(state, data) {
    state.chatListMessages = data.list;
    state.chatTotalMessages = data.total;
  },
  setListGroupChatMesseges(state, data) {
    state.groupChatListMessages = data.list;
    state.groupChatTotalMessages = data.total;
  },
  pushItems(state, data) {
    state.chatListMessages = data.concat(state.chatListMessages)
  },
  pushGroupItems(state, data) {
    state.groupChatListMessages = data.concat(state.groupChatListMessages)
  },
  pushChatList(state, data) {
    if (state.CHAT && state.CHAT.id == data.chatId) {
      if (data.extra === 'delete') {
        const index = state.chatListMessages.findIndex(e => e.id == data.deleteId)
        if (index > -1) {
          state.chatListMessages.splice(index, 1);
        }
      } else if (data.extra === 'update') {
        const index = state.chatListMessages.findIndex(e => e.id == data.editedMessage.id)
        if (index > -1) {
          state.chatListMessages[index].message = data.editedMessage.message
          state.chatListMessages[index].edited = true
        }
      } else {
        let index = state.chatListMessages.findIndex(e => e.id == data.id)
        if (!index || index <= -1) {
          state.chatListMessages.push(data)
          state.chatTotalMessages++
        }
      }
    }
  },
  pushCount(state, data) {
    state.chatList.forEach((element) => {
      if (element.id === data.chatId) {
        bus.$set(element, "count", element.count++);
      }
    });
  },
  pushGroupChatList(state, data) {
    if (state.CHAT && state.CHAT.id == data.groupChatId) {
      if (data.extra === "unread") {
        state.groupChatListMessages.forEach((element) => {
          if (element.id == data.unreadId) {
            element.isRead = "READ";
          }
        });
      } else if (data.extra === "delete") {
        const index = state.groupChatListMessages.findIndex(e => e.id == data.deleteId)
        if (index > -1) {
          state.groupChatListMessages.splice(index, 1);
        }
      } else if (data.extra === "update") {
        const index = state.groupChatListMessages.findIndex(e => e.id == data.editedGroupMessage.id)
        if (index > -1) {
          state.groupChatListMessages[index].message = data.editedGroupMessage.message
          state.groupChatListMessages[index].edited = true
        }
      } else {
        const index = state.groupChatListMessages.findIndex(e => e.id == data.id)
        if (index <= -1) {
          state.groupChatListMessages.push(data)
          state.groupChatTotalMessages++
        }
      }
    }
  },
  pushGroupCount(state, data) {
    if (data.extra === "unread") {
    } else if (data.extra === "delete") {
    } else if (data.extra === "update") {
    } else {
      state.groupChatList.forEach((element) => {
        if (element.id === data.chatId) {
          bus.$set(element, "count", element.count++);
        }
      });
    }
  },
  remov(state) {
    state.chatListMessages.splice(-1, 1)
  }
}
export const actions = {
  async setChatMessageMakeRead({ commit }, data) {
    await commit('setChatMessageMakeRead', JSON.parse(data.body))
  },
  async getUnreadMessages(st) {
    messengerService.getUnreadMessages()
      .then(rs => {
        st.commit('setChatUnreadMessagCount', rs.data)
      })
  },
  async sendAnnouncementDocumentMarking(st, data) {
    st.dispatch("stompClientSendMessage", {
      stompClient: globalStompClient,
      endpoint: "/app/announcementDocumentMarking",
      message: data,
    });
  },
  async setChatUnreadCount({ commit }, data) {
    await commit('setChatUnreadCount', JSON.parse(data.body))
  },
  async setChatUnreadMessagCount({ commit }, data) {
    await commit("setChatUnreadMessagCount", JSON.parse(data.body));
  },
  async setDocumentMarking({ commit }, data) {
    await commit("setMarketing", JSON.parse(data.body));
  },
  async setNotificationMsg({ commit }, data) {
    await commit("setNotification", JSON.parse(data.body));
  },
  async setCommentTask({ commit }, data) {
    await commit("setComments", JSON.parse(data.body));
  },
  async setIncomingPerson({ commit }, data) {
    let parsed = JSON.parse(data.body)
    if (parsed.deviceName === 'enter') {
      await commit("setIncomingPerson", parsed);
    } else {
      await commit("setExitingPerson", parsed);
    }
  },
  async setGroupUpdate({ commit }) {
    await commit("setGroupUpdateE", false);
  },
  async setMessage({ commit }, data) {
    await commit("pushChatList", JSON.parse(data.body));
  },
  async setGroupMessage({ commit }, data) {
    await commit("pushGroupCount", JSON.parse(data.body));
    await commit("pushGroupChatList", JSON.parse(data.body));
  },
  async sendMessage(st, data) {
    st.dispatch("stompClientSendMessage", {
      stompClient: globalStompClient,
      endpoint: "/app/sendMessage",
      message: data,
    });
  },
  async sendMessageGroup(st, data) {
    st.dispatch("stompClientSendMessage", {
      stompClient: globalStompClient,
      endpoint: "/app/sendGroupMessage",
      message: data,
    });
  },
  async allUnreadMessages(st) {
    st.dispatch("stompClientSendMessage", {
      stompClient: globalStompClient,
      endpoint: "/app/allUnreadMessages",
      message: JSON.stringify({ user_id: JSON.parse(localStorage.getItem("user_id")) }),
    });
  },
  async onLoad(st, usr = null) {
    let username = null, fullName = null;
    if (!usr) {
      username = TokenService.getUserInfo() ? TokenService.getUserInfo().username : null;
      fullName = TokenService.getUserInfo() ? TokenService.getUserInfo().employeeFullName : null;
    } else {
      username = usr
    }
    // let ownerId = JSON.parse(localStorage.getItem("user_id"));
    if (username || fullName) {
      if (usr === 'security') {
        st.dispatch("connect").then(() => {
          st.dispatch("stompSubscribe", {
            stompClient: globalStompClient,
            endpoint: `/user/security/incomingPerson`,
            callback: async (data) => {
              st.dispatch("setIncomingPerson", data);
            },
          });
        })
      } else {
        st.dispatch("connect")
          .then(async (s) => {
            st.dispatch("stompClientSendMessage", {
              stompClient: globalStompClient,
              endpoint: "/app/register",
              message: username,
            });
          })
          .then(() => {
            st.dispatch("stompSubscribe", {
              stompClient: globalStompClient,
              endpoint: `/user/${username}/msg`,
              callback: async (data) => {
                st.dispatch("setMessage", data);
              },
            });
          }).then(() => {
          st.dispatch("stompSubscribe", {
            stompClient: globalStompClient,
            endpoint: `/user/${username}/groupMsg`,
            callback: async (data) => {
              st.dispatch("setGroupMessage", data);
            },
          });
        }).then(() => {
          st.dispatch("stompSubscribe", {
            stompClient: globalStompClient,
            endpoint: `/user/${username}/documentMarking`,
            callback: async (data) => {
              st.dispatch("setDocumentMarking", data);
            },
          });
        }).then(() => {
          st.dispatch("stompSubscribe", {
            stompClient: globalStompClient,
            endpoint: `/user/${username}/notificationMsg`,
            callback: async (data) => {
              st.dispatch("setNotificationMsg", data);
              st.dispatch("setCount", null, { root: true })
            },
          });
        })
          // .then(() => {
          //     st.dispatch("stompSubscribe", {
          //         stompClient: globalStompClient,
          //         endpoint: `/user/${fullName}/commentMgs`,
          //         callback: async (data) => {
          //             st.dispatch("setCommentTask", data);
          //         },
          //     });
          // })
          .then(() => {
            st.dispatch("stompSubscribe", {
              stompClient: globalStompClient,
              endpoint: `/user/${username}/unreadMessages`,
              callback: async (data) => {
                st.dispatch("setChatUnreadMessagCount", data);
              },
            });
          }).then(() => {
          st.dispatch("stompSubscribe", {
            stompClient: globalStompClient,
            endpoint: `/user/${username}/unreadMessage`,
            callback: async (data) => {
              st.dispatch("setChatUnreadCount", data);
            },
          });
        }).then(() => {
          st.dispatch("stompSubscribe", {
            stompClient: globalStompClient,
            endpoint: `/user/${username}/makeRead`,
            callback: async (data) => {
              st.dispatch("setChatMessageMakeRead", data);
            },
          });
        })
      }
    }
  },
  connect({ commit }) {
    return new Promise((resolve, reject) => {
      globalStompClient = Stomp.over(
        new SockJS(`${process.env.VUE_APP_WEBSOCKET_API}/gs-guide-websocket`)
      );
      if (globalStompClient) {
        globalStompClient.hasDebug = false
      }
      globalStompClient.connect({}, (frame) => resolve(globalStompClient));
    });
  },
  stompClientSendMessage(st, { stompClient, endpoint, message }) {
    stompClient.send(endpoint, message);
  },
  stompSubscribe(st, { stompClient, endpoint, callback }) {
    stompClient.subscribe(endpoint, callback);
    return stompClient;
  },
  async getByChatId({ commit }, params) {
    try {
      const res = await messengerService.getByChatId(params);
      await commit(
        "setListChatMesseges",
        res.data ? res.data : { list: [], total: 0 }
      );
    } catch (error) {
      await commit("setListChatMesseges", { list: [], total: 0 });
    }
  },
  async getByGroupChatId({ commit }, params) {
    try {
      const res = await messengerService.getByGroupChatId(params);
      await commit(
        "setListGroupChatMesseges",
        res.data ? res.data : { list: [], total: 0 }
      );
    } catch (error) {
      await commit("setListGroupChatMesseges", { list: [], total: 0 });
    }
  },
  async getContactList({ commit }, params) {
    try {
      const res = await messengerService.getContactList(params);
      await commit(
        "setListResponse",
        res.data ? res.data : { list: [], total: 0 }
      );
    } catch (error) {
      await commit("setListResponse", { list: [], total: 0 });
    }
  },
  async getGroupChatList({ commit }, params) {
    try {
      const res = await messengerService.groupChatList(params);
      await commit("setListResponseGroupChat", res.data ? res.data : { list: [], total: 0 }
      );
    } catch (error) {
      await commit("setListResponseGroupChat", { list: [], total: 0 });
    }
  }
}
