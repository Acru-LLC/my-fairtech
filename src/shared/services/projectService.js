import ApiService from '@/shared/services/api.service'

export default {
  saveDoc: function (url, extension, file, letterType, letterName) {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('type', extension)
    bodyFormData.append('letterType', letterType)
    bodyFormData.append('letterName', letterName)
    return ApiService.formDataPut(url, bodyFormData)
  },
  listDocsService: function (id, data) {
    return ApiService.post(`/project/list-upload/${id}`, data)
  },
  listDocsWithSignatoryService: function (id, data) {
    return ApiService.post(`/project/list-upload/with-signatory/${id}`, data)
  },
  getTotalCount: function (projectType) {
    return ApiService.get(`/project/totalCount?projectType=${projectType}`)
  },
  getLettersById: function (id) {
    return ApiService.get(`/project/get-letters?projectId=${id}`)
  },
  getById: function (id, projectType, withLoader = false) {
    return ApiService.get(`/project/get-by-id/${projectType === 'COMMISSION' ? 'commission/' : ''}${id}`, withLoader)
  },
  create: function (data, withloader = false) {
    return ApiService.post(`/project/create`, data, withloader)
  },
  createNotBelong: function (data) {
    return ApiService.post(`/project/create/not-belong`, data)
  },
  update: function (data, withloader = false) {
    return ApiService.post(`/project/update`, data, withloader)
  },
  delete: function (data) {
    return ApiService.delete(`/project/delete/${data}`)
  },
  list: function ({ pg, search }, st, projectType) {
    return ApiService.post(`/project/list?name=${search}&status=${st ? st : ''}&projectType=${projectType}`, pg)
  },
  listComments: function (id, data, withLoader = false) {
    return ApiService.post(`/project-comment/list-projectId/${id}`, data, withLoader)
  },
  leaveComment: function (id, cmt, file) {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('comment', cmt)
    bodyFormData.append('projectId', id)
    return ApiService.formDataFile(`/project-comment/create`, bodyFormData)
  },
  listFiles: function (id, data) {
    return ApiService.post(`/project-comment/attached-file/${id}`, data)
  },
  listBoards: function (id, data) {
    return ApiService.post(`/project-task/list/${id}`, data)
  },
  deleteMember(projId, id) {
    return ApiService.delete(`/project/delete-employee/${projId}/${id}`)
  },
  leaveFile: function (id, cmt, file) {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('comment', cmt)
    bodyFormData.append('projectId', id)
    return ApiService.formDataFile(`/project-comment/attachedFile-create`, bodyFormData)
  },
  addMember(id, members) {
    return ApiService.put(`/project/add-employee/${id}`, members)
  },
  createBoard(id, data) {
    return ApiService.post(`/project-task/createTask/${id}`, data)
  },
  createTask(id, cmt, file, color) {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('name', cmt)
    bodyFormData.append('color', color)
    return ApiService.formDataFile(`/project-task/createTaskCard/${id}`, bodyFormData)
  },
  listTaskCards(id, data) {
    return ApiService.post(`/project-task/taskCardList/${id}`, data)
  },
  listMembers(projectId, data, projectType) {
    return ApiService.post(`/project/employee-by-projectId/${projectId}?projectType=${projectType ? projectType : ''}`, data)
  },
  deleteBoard(id) {
    return ApiService.delete(`/project-task/deleteTask/${id}`)
  },
  updateBoard: function (projectTaskId, data) {
    return ApiService.put(`/project-task/updateTask/${projectTaskId}`, data)
  },
  deleteTaskCard(id) {
    return ApiService.delete(`/project-task/deleteTaskCard/${id}`)
  },
  updateTaskCard: function (projectTaskId, msg, file, ids, color) {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('color', color)
    return ApiService.formDataPut(`/project-task/updateTaskCard/${projectTaskId}?name=${msg}&employeeIds=${ids}`, bodyFormData)
  },
  changeIndex: function (data) {
    return ApiService.put(`/project-task/changeIndexProjectTask`, data)
  },
  changeIndexCard: function (id, data) {
    return ApiService.put(`/project-task/changeIndexProjectTaskCard/${id}`, data)
  },
  listCardEmployees(projectTaskCardId) {
    return ApiService.get(`/project-task/listTaskCardEmployees/${projectTaskCardId}`)
  },
  /* getCountByCurrentUser () {
      return ApiService.get(`/project/getCountByCurrentEmployee`)
  }, */
  /* getMyProjects ({ pg, search }) {
      return ApiService.post(`/project/listByCurrentEmployeeMyProjects?name=${search}`, pg)
  }, */
  changeStatus(projId, status = 'REVIEW_FINISHED', withLoader = false) {
    return ApiService.get(`/project/changeStatus/?projectId=${projId}&status=${status}`, withLoader)
  },
  listCardComment: function (id, { params, search }) {
    return ApiService.post(`/projectTaskCardComment/list/${id}?search=${search}`, params)
  },
  createCardComment: function (id, cmt, file) {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('comment', cmt)
    bodyFormData.append('projectTaskCardId', id)
    return ApiService.formDataFile(`/projectTaskCardComment/create`, bodyFormData)
  },
  updateCardComment: function (id, cmt, file) {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('comment', cmt)
    bodyFormData.append('projectTaskCardCommentId', id)
    return ApiService.formDataFile(`/projectTaskCardComment/update`, bodyFormData)
  },
  deleteCardComment: function (data) {
    return ApiService.delete(`/projectTaskCardComment/delete/${data}`)
  },
  getTaskByProjectId: function (data, params) {
    return ApiService.post(`/project-task/my-task-list?projectId=${data}`, params)
  },
  handleUploadToReturn: function (project_id, type, name) {
    let url = `/project/upload-to-return/${project_id}?letterType=${type}&letterName=${name}`
    return ApiService.put(url)
  },
  fetchLetterAllCount() {
    return ApiService.get(`/letter/get-all-count`)
  },
  projectReopenApplication(id, date) {
    return ApiService.post(`/project/reopen-project/${id}?date=${date}`, {}, true)
  },
}
