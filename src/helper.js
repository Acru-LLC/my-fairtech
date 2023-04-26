import i18n from '@/i18n'
import {bus} from "./main"
import Swal from "sweetalert2";
// import Swal from 'vue-toastification'
//VUE TREESELECT CUSTOM LABEL
const nrm = (node) => {
    let nodeEl = {
        id: node.id,
        label:
            i18n.locale == 'uzCyrillic'
                ? node.nameUz
                : i18n.locale == 'uz'
                    ? node.nameLt
                    : i18n.locale == "ru"
                        ? node.nameRu
                        : "",
    }
    if (node.children && node.children.length > 0) {
        nodeEl.children = node.children
    } else {
        delete nodeEl.children
        delete node.children
    }
    return nodeEl
}


//SHOW LOCALE NAME
/* const getName = (item) => {
    for (let i in item) {
        if (i18n.locale == 'ru') {
            if (i.endsWith("Ru")) {
                return item[i];
            }
        } else if (i18n.locale == 'uz') {
            if (i.endsWith("Lt")) {
                return item[i];
            }
        } else {
            return
        }
    }
} */

//SHOW LOCALE LABEL
const g_label = (ru, uz, uzCyrillic) => {
    return i18n.locale == 'uz' ? uz :
        i18n.locale == 'ru' ? ru :
            i18n.locale == 'uzCyrillic' ? uzCyrillic : uz
}
const g_label_Uz = (ru, uz, uzCyrillic) => {
    return i18n.locale == 'uz' ? uz :
        i18n.locale == 'ru' ? ru :
            i18n.locale == 'uzCyrillic' ? uz : ''
}

//FILE SIZE SHOW
const getFileSize = (size) => {
    var fSExt = new Array( "Bytes", "KB", "MB", "GB" ),
        i = 0;
    while (size > 900) {
        size /= 1024;
        i++;
    }
    var exactSize = Math.round( size * 100 ) / 100 + " " + fSExt[i];
    return exactSize;
}

//DATE UTILS
const replaceDate = (date) => {
    if (date) {
        return new Date( date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3" ) )
    } else {
        return date
    }
}
// ENCODE URL
const enc = (id) => {
    let payload = "did$tAid$z"
    try {
        let params = window.btoa( payload )
        let idencoded = window.btoa( params + id )
        return idencoded
    } catch (error) {
        return "e"
    }
}

//DECODE URL
const dec = (args) => {
    let payload = "did$tAid$z"
    try {
        let params = window.atob( args )
        let givenVal = window.btoa( payload )
        let arr = params.split( givenVal )
        return parseInt( arr[1] )
    } catch (error) {
        return "e"
    }

}

const getExtFromName = (name) => {
    return name.split( '.' ).pop().toLowerCase()
}


const imageTypes = [
    "tiff",
    "pjp",
    "jfif",
    "gif",
    "svg",
    "bmp",
    "png",
    "jpeg",
    "svgz",
    "jpg",
    "webp",
    "ico",
    "xbm",
    "dib",
    "tif",
    "jpe",
    "jif",
    "jfi",
    "pjpeg",
    "avif",
    "psd",
    "raw",
    "arw",
    "cr2",
    "nrw",
    "k25",
    "indd",
    "heif",
    "heic",
    "ind",
    "indt",
    "jp2",
    "j2k",
    "jpm",
    "mj2"
]

const docTypes = [
    'doc',
    'docx'
]

//SHOW LOCALE NAME
const g_name = (item) => {
    for (let i in item) {
        if (i18n.locale == 'ru') {
            if (i.endsWith("Ru")) {
                return item[i];
            }
        } else if (i18n.locale == 'uz') {
            if (i.endsWith("Lt")) {
                return item[i];
            }
        } else {
            return
        }
    }
}

const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat( (4 - base64String.length % 4) % 4 );
    const base64 = (base64String + padding)
        // eslint-disable-next-line no-useless-escape
        .replace( /\-/g, '+' )
        .replace( /_/g, '/' );

    const rawData = window.atob( base64 );
    const outputArray = new Uint8Array( rawData.length );

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt( i );
    }
    return outputArray;
}

const getlastWord = (words) => {
    var n = words.split( " " );
    return n[n.length - 1];

}

//ERRORS SHOW
const showMsgError = (msg) => {
    bus.$bvToast.toast( msg, {
        title: i18n.t( 'error.title' ),
        variant: 'danger',
        autoHideDelay: 2000,
    } )
}


//Success SHOW
const showMsgSuccess = (msg) => {
    bus.$bvToast.toast( msg, {
        title: i18n.t( 'succes.title' ),
        variant: 'success',
        autoHideDelay: 2000,
    } )
}

// SHOW ERROR FROM API
const catchErr = (err) => {
    if (err.response && err.response.status == 417) {
        showMsgError( err.response.data.message )
    } else {
        if (err.response.data.message) {
            showMsgError( err.response.data.message )
        } else {
            showMsgError( `Iltimos, qayta urunib ko'ring` )
        }

    }
}


const enterInfo = () => {
    bus.$bvToast.toast( i18n.t( "messages.fill_required_fields" ), {
        title: i18n.t( 'error.title' ),
        variant: 'danger',
        autoHideDelay: 2000,
    } )
}

//SUCCESSEDITED
const successEdited = () => {
    bus.$bvToast.toast( i18n.t( "succes.title" ), {
        title: i18n.t( "succes.edited" ),
        variant: 'success',
        autoHideDelay: 2000,
    } )
}


//SUCCESSSAVED
const successSaved = () => {
    bus.$bvToast.toast( i18n.t( "succes.saved" ), {
        title: i18n.t( "succes.title" ),
        variant: 'success',
        autoHideDelay: 2000,
    } )
}

//SUCCESSSAVED
const successSavedDoc = () => {
    bus.$bvToast.toast( i18n.t( "succes.saved" ), {
        title: i18n.t( "messages.doc_saved" ),
        variant: 'success',
        autoHideDelay: 2000,
    } )
}
//AFTER DELETE SUCCESS
const deleteSuccess = () => {
    Swal.fire( {
        position: "center",
        icon: "success",
        title: i18n.t( "deleted" ),
        showConfirmButton: false,
        timer: 1000
    } );
}

//AFTRE EDIT SUCCESS
const accessDenied = (err) => {
    Swal.fire( {
        icon: 'error',
        title: i18n.t( 'error.netAccess' ),
        text: err,
    } );
}

const editSuccess = () => {
    Swal.fire( {
        position: "center",
        icon: "success",
        title: i18n.t( "succes.edited" ),
        showConfirmButton: false,
        timer: 1000
    } );
}
// poll error
const pollError = () => {
    Swal.fire( {
        position: "center",
        icon: 'error',
        title: i18n.t( 'warning.pollError' ),
        showConfirmButton: false,
        timer: 1000
    } );
}
//poll success
const pollSuccess = () => {
    Swal.fire( {
        position: "center",
        icon: "success",
        title: i18n.t( "warning.pollSuccess" ),
        showConfirmButton: false,
        timer: 1000
    } );
}


//CONFIRMATION
const cnf = () => {
    return Swal.fire( {
        title: i18n.t( "confirm" ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: i18n.t( "actions.yes" ),
        cancelButtonText: i18n.t( "actions.no" )
    } )
}
//CANCEL CONFIRMATION
const cancelBtn = () => {
    return Swal.fire( {
        title: i18n.t( "messages.cancel_modal_title" ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: i18n.t( "actions.yes" ),
        cancelButtonText: i18n.t( "actions.no" )
    } )
}

//CANCEL CONFIRMATION
const promptSwal = ({value = '', title = '', buttonText = null, type = 'text', label = '', inputValidator = () => {}}) => {
    return Swal.fire({
        title: title,
        input: type,
        inputLabel: label,
        inputValue: value,
        confirmButtonColor: "#34c38f",
        confirmButtonText: buttonText ?? i18n.t( "actions.yes" ),
        inputValidator: inputValidator
    })
}


//ALERT SWEET
const cnfDoc = (v) => {
    return Swal.fire( {
        title: v,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: i18n.t( "actions.yes" ),
        cancelButtonText: i18n.t( "actions.no" )
    } )

}

const checkFileIsImg = (file) => {
    let ext = file.name.split( "." ).pop();
    if (imageTypes.indexOf( ext ) <= -1) {
        showMsgError( i18n.t( "warning.fileImage" ) );
        return 'err'
    } else {
        return 'success'
    }
}

const checkFileIsDoc = (file) => {
    let ext = file.name.split( "." ).pop();
    if (docTypes.indexOf( ext ) <= -1) {
        showMsgError( i18n.t( "warning.fileDoc" ) );
        return 'err'
    } else {
        return 'success'
    }
}
const splitLargeText = (str, limit = 17) => {
    var newTitle = [];
    if (str.length >= limit) {
        str.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(" ")} ...`;
    }
    return str;
};
export {
    checkFileIsDoc,
    checkFileIsImg,
    nrm,
    g_label,
    g_name,
    g_label_Uz,
    getFileSize,
    replaceDate,
    dec,
    imageTypes,
    enc,
    getExtFromName,
    urlB64ToUint8Array,
    //
    showMsgError,
    catchErr,
    enterInfo,
    successEdited,
    successSaved,
    deleteSuccess,
    accessDenied,
    editSuccess,
    successSavedDoc,
    cnf,
    promptSwal,
    getlastWord,
    pollSuccess,
    pollError,
    showMsgSuccess,
    cnfDoc,
    cancelBtn,
    splitLargeText
};
