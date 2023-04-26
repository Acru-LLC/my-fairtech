import ApiService from '@/shared/services/api.service'

const employee = '/employee'
const chat = '/chat'
const groupChat = '/groupChat'

export default {
    getUnreadMessages () {
        return ApiService.get(`/unread-messages`)
    },
    async sendFile (data) {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.file)
        bodyFormData.append('ownerId', data.ownerId)
        bodyFormData.append('chatId', data.chatId)
        bodyFormData.append("message", data.message)
        const requestData = {
            method: 'post',
            url: `/chat-message/sendMessage`,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    async sendImageGroup (data) {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.file)
        bodyFormData.append('ownerId', data.ownerId)
        bodyFormData.append('groupChatId', data.groupChatId)
        bodyFormData.append("message", data.message)
        const requestData = {
            method: 'post',
            url: `groupChat/chat-message/sendMessage`,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    getContactList: function ({ page, itemsPerPage, search }) {
        return ApiService.post(`${employee}/get-by-chat?search=${search ? search : ''}`, { page, itemsPerPage })
    },

    // chat
    getChatList: function ({ page, itemsPerPage, search }) {
        return ApiService.post(`${chat}/list?search=${search ? search : ''}`, { page, itemsPerPage })
    },

    createChat: function (empId) {
        return ApiService.post(`${chat}/create/${empId}`,)
    },
    getByChatId ({ chatId, pag, search }) {
        return ApiService.post(`/get-by-chatId/${chatId}?search=${search ? search : ''}`, pag)
    },
    // By GroupChatId List
    getByGroupChatId ({ chatId, pag, search }) {
        return ApiService.post(`${groupChat}/get-by-chatId/${chatId}?search=${search != undefined ? search : ''}`, pag)
    },
    createGroupChat (data) {
        return ApiService.post(`${groupChat}/create`, data)
    },
    groupChatList: function ({ page, itemsPerPage, search }) {
        return ApiService.post(`${groupChat}/list?search=${search ? search : ''}`, { page, itemsPerPage })
    },
    groupChatMessageDelete: function (data) {
        return ApiService.post(`${groupChat}/delete`, data)
    },
    chatMessageDelete: function (data) {
        return ApiService.delete(`/delete/${data.id}`)
    },
    groupChatMessageUpdate: function (data) {
        return ApiService.post(`${groupChat}/edit`, data)
    },
    chatMessageUpdate: function (data) {
        return ApiService.post(`/edit`, data)
    },
    forwardChat (data) {
        return ApiService.post(`/forward-message`, data)
    },
    replyChat (data) {
        let bodyFormData = new FormData()
        bodyFormData.append("chatId", data.chatId)
        bodyFormData.append("id", data.id)
        bodyFormData.append("message", data.message)
        bodyFormData.append("file", data.file ? data.file : null)
        return ApiService.formDataFile(`/reply-message`, bodyFormData)
    },
    groupMembersById (id, data) {
        return ApiService.post(`/groupChat/members/${id}?search=${data.search ? data.search : ''}`, data)
    },
    deleteMemberFromGroup (data, groupId) {
        return ApiService.post(`/groupChat/delete-members/${groupId}`, data)
    },
    addMemberToGroup (data, groupId) {
        return ApiService.post(`/groupChat/add-members/${groupId}`, data)
    },
    deleteGroup (groupId) {
        return ApiService.delete(`/groupChat/delete/${groupId}`);
    },
    editGroup (file, name, id) {
        let bodyFormData = new FormData()
        bodyFormData.append("file", file)
        bodyFormData.append("name", name)
        bodyFormData.append("groupChatId", id)
        return ApiService.formDataFile(`/groupChat/uploadPhoto`, bodyFormData)
    },

    changeUserAvatar (file, userId) {
        let bodyFormData = new FormData()
        bodyFormData.append("employeePhoto", file)
        return ApiService.formDataFile(`/file-entity/save/employee-photo/${userId}`, bodyFormData)
    },
    changeUserProfileAvatar (file) {
        let bodyFormData = new FormData()
        bodyFormData.append("employeePhoto", file)
        return ApiService.formDataFile(`/file-entity/save/employee-photo/for-profile`, bodyFormData)
    }


}
