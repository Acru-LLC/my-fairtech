import ApiService from '@/shared/services/api.service'

const MAIN_NARKO = 'ssv-narkodis'
const MAIN_PSIX = 'ssv-psixodis'
const ssvService = {
    getInfoNarkoBypinfl(data) {
        return ApiService.post(`${MAIN_NARKO}/by-pinpp?pinpp=${data.pinfl}`)
    },
    getInfoNarkoByPasport(data) {
        return ApiService.post(`${MAIN_NARKO}/by-passport?serial=${data.passportSeries}&number=${data.passportNumber}`)
    },
    getInfoNarkoByCert(data) {
        return ApiService.post(`${MAIN_NARKO}/by-cert?serial=${data.certificateSeries}&certificateNumber=${data.certificateNumber}&birthDate=${data.birthdate}`)
    },
    getInfoPsixBypinfl(data) {
        return ApiService.post(`${MAIN_PSIX}/by-pinpp?pinpp=${data.pinfl}`)
    },
    getInfoPsixByPasport(data) {
        return ApiService.post(`${MAIN_PSIX}/by-passport?serial=${data.passportSeries}&number=${data.passportNumber}`)
    },
    getInfoPsixByCert(data) {
        return ApiService.post(`${MAIN_PSIX}/by-cert?serial=${data.certificateSeries}&certificateNumber=${data.certificateNumber}&birthDate=${data.birthdate}`)
    },
}

export default ssvService