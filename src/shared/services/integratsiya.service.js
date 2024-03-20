import ApiService from "@/shared/services/api.service";

const integratsiyaService = {
    getContractorInfoByInnForCreate(inn, withLoader = false) {
        return ApiService.get(
            `soliq/get-info-from-soliq-by-inn/yuridik-info?inn=${inn}`, withLoader
        );
    },
    // Suv xo‘jaligi vazirligi
    getSuvXojaligiInformation(date, withLoader = false) {
        return ApiService.post(
            `suvXojaligi/get-info?offset=${date.offset}&limit=${date.limit}`, withLoader);
    },
    // Farmatsevtika tarmog‘ini rivojlantirish agentligi
    getFarmasevtikaInformation(date, withLoader = false) {
        return ApiService.post(
            `farmasevtika/get-info?offset=${date.offset}&limit=${date.limit}`, withLoader);
    },
    getFarmasevtikaInformationByBoxGroupId(id, withLoader = false) {
        return ApiService.post(
            `farmasevtika/get-info-by-id?box_group_id=${id}`, withLoader);
    },
    // Iqtisodiy taraqqiyot va kambag‘allikni qisqartirish vazirligi
    getIstisodiyotInformation1(date, withLoader = false) {
        return ApiService.post(`iqtisodiyot-vazirlik/get-information-1?date=${date}`, withLoader);
    },
    getIstisodiyotInformation2(date, withLoader = false) {
        return ApiService.post(`iqtisodiyot-vazirlik/get-information-2?date=${date}`, withLoader);
    },
    getIstisodiyotInformation3(date, withLoader = false) {
        return ApiService.post(
            `iqtisodiyot-vazirlik/get-information-3?date=${date}`, withLoader);
    },
    // O'zimliklar karantini agentligi'
    getOsimliklarKarantinInfoByInnForCreate(inn, withLoader = false) {
        return ApiService.get(
            `osimliklar-karantin-api/get-by-inn-info?number=${inn}`, withLoader
        );
    },
    // Soliq Qomitasi'
    getSoliqQomitasiInfoByInn(inn, withLoader = false) {
        return ApiService.get(
            `soliq/get-contractor-by-inn/inner-or-from-soliq?inn=${inn}`, withLoader
        );
    },
    // Davlat soliq qo‘mitasi huzuridagi Kadastr agentligi
    getKadastrInfoForCreate(inn, withLoader = false) {
        return ApiService.get(
            `kadastr-api/get-by-inn-info?number=${inn}`, withLoader
        );
    },

    // Suv xojaligi
    getSuvXojaligiInfo(withLoader = false) {
        return ApiService.get(`suvXojaligi/get-info`, withLoader);
    },

    // Davlat Aktivlari
    getDavlatActiveInfoForCreate(inn, withLoader = false) {
        return ApiService.get(
            `active-api/get-by-inn-info?number=${inn}`, withLoader
        );
    },
// DavlatActive
    getDavlatActiveInfoForInn(data, withLoader = false) {
        return ApiService.post(
            `davlat-active-api/get-info-by-inn?inn=${data.inn}&pinfl=${data.pinfl}&identifikator=${data.identifikator}`, withLoader
        );
    },
    // Kommunal
    getKommunalInfoByPinflWith_kad_num(data, withLoader = false) {
        return ApiService.post(
            `kommunal/get-info-by-kad_num?kad_num=${data.kad_num}`, withLoader
        );
    },
// Elektr Taminot
    getElektrTaminotInfoByPinflWith_kad_num(data, withLoader = false) {
        return ApiService.post(
            `elektr-taminot/get-info?sender_pinfl=${data.pinfl}&kad_num=${data.kad_num}`, withLoader
        );
    },
    getElektrTaminotInfoWithLicshet(data, withLoader = false) {
        return ApiService.post(
            `elektr-taminot/get-info-by-licshet?licshet=${data.licshet}`, withLoader
        );
    },
// Ekologiya
    getEkologiyaInfoForSTIR(pinfl, withLoader = false) {
        return ApiService.post(
            `ekologiya-api/get-info-by-pinfl?pinfl=${pinfl}`, withLoader
        );
    },
    getEkologiyaInfoForUsername(username, withLoader = false) {
        return ApiService.get(
            `active-api/get-by-inn-info?number=${username}`, withLoader
        );
    },

    // MIP
    // **********  hudud-gaz **********
    //methods-1
    getHududGazInfoMethod1(value, withLoader = false) {
        return ApiService.post(
            `hudud-gaz/getby_pin?pin=${value}`, withLoader
        );
    },
    //methods-2
    getHududGazInfoMethod2(value, withLoader = false) {
        return ApiService.post(
            `hudud-gaz/getby_kad_num?kad_num=${value}`, withLoader
        );
    },
    //methods-3
    getHududGazInfoMethod3(value, withLoader = false) {
        return ApiService.post(
            `hudud-gaz/getby_tin?tin=${value}`, withLoader
        );
    },
    //methods-4
    getHududGazInfoMethod4(value, withLoader = false) {
        return ApiService.post(
            `hudud-gaz/getby_customer_code?customer_code=${value}`, withLoader
        );
    },

    // **********  kadastr **********
    //methods-1
    getKadastrInfoMethod1(data, withLoader = false) {
        return ApiService.post(
            `kadastr/method1?kad_num=${data.kad_num}&tin=${data.tin}&purpose=${data.purpose}`, withLoader
        );
    },
    //methods-2
    getKadastrInfoMethod2(data, withLoader = false) {
        return ApiService.post(
            `kadastr/method2?pin=${data.pin}&tin=${data.tin}&purpose=${data.purpose}`, withLoader
        );
    },
    //methods-3
    getKadastrInfoMethod3(data, withLoader = false) {
        return ApiService.post(
            `kadastr/method3?tin=${data.tin}&org_tin=${data.org_tin}`, withLoader
        );
    },
// IIV
    getIIVInfo(data) {
        return ApiService.post(`iiv-sud/check`, data)
    },
    // YOSHLAR
    getYoshlarInfo(data) {
        return ApiService.post(`iiv-yd/yoshlarDaftari`, data)
    },
    // Suv Taminot
    getSuvTaminotInfoByPinflWith_kad_num(data, withLoader = false) {
        return ApiService.post(
            `suvtaminot/get-info-by-kad_num?cadastre=${data.kad_num}`, withLoader
        );
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

export default integratsiyaService;
