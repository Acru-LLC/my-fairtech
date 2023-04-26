import ApiService from '@/shared/services/api.service'

export default {
    upload() {
        return ApiService.get(`/document/upload`)
    }
}
