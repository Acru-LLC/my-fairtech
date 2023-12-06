import ApiService from '@/shared/services/api.service'

const MAIN_NARKO = 'ssv-narkodis'
const MAIN_PSIX = 'ssv-psixodis'
const service = {
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
    getInfosByCode(code_name, TIF_TN, SHTRIX, MXIK, withLoader = false) {
        if (code_name == 'TIF_TN') {
            return ApiService.post(
                `bojxona/tnved-code?tnvedCode=${TIF_TN}`, withLoader
            );
        } else if (code_name == 'SHTRIX' || code_name == 'MXIK') {
            return ApiService.get(
                `soliq/getInfo?international_code=${code_name == 'SHTRIX' ? SHTRIX : ''}&mxik_code=${code_name == 'MXIK' ? MXIK : ''}&lang=uz`, withLoader
            );
        }
    },
}

export default service
