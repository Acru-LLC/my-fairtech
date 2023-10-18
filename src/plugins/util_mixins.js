import {TokenService} from "@/shared/services/storage.service";
import i18n from "../i18n";

export default {
  install(Vue) {
    Vue.mixin({
      /** DATA */
      data() {
        return {
          var_default_search_payload: {
            page: 1,
            itemsPerPage: 20,
            sortBy: [],
            sortDesc: [],
            groupBy: [],
            groupDesc: [],
            multiSort: true,
            mustSort: false
          }
        }
      },
      /**
       * COMPUTED
       */
      computed: {
        util_current_locale() {
          return TokenService.getLocale()
        }
      },

      /**
       * METHODS
       */
      methods: {
        formatNumber (num) {
          return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        },
        toLatin(word) {
          var answer = "",
            a = {};
          a["ҳ"] = "h";
          a["Ҳ"] = "H";
          a["Ё"] = "YO";
          a["Й"] = "Y";
          a["Ц"] = "TS";
          a["У"] = "U";
          a["К"] = "K";
          a["Е"] = "E";
          a["Н"] = "N";
          a["Г"] = "G";
          a["Ш"] = "SH";
          a["З"] = "Z";
          a["Х"] = "X";
          a["Ъ"] = "'";
          a["ё"] = "yo";
          a["й"] = "y";
          a["ц"] = "ts";
          a["у"] = "u";
          a["к"] = "k";
          a["е"] = "e";
          a["н"] = "n";
          a["г"] = "g";
          a["ш"] = "sh";
          a["з"] = "z";
          a["х"] = "x";
          a["ъ"] = "ʼ";
          a["Ф"] = "F";
          a["Ы"] = "I";
          a["В"] = "V";
          a["А"] = "A";
          a["П"] = "P";
          a["Р"] = "R";
          a["О"] = "O";
          a["Л"] = "L";
          a["Д"] = "D";
          a["Ж"] = "J";
          a["Э"] = "E";
          a["ф"] = "f";
          a["ы"] = "i";
          a["в"] = "v";
          a["а"] = "a";
          a["п"] = "p";
          a["р"] = "r";
          a["о"] = "o";
          a["л"] = "l";
          a["д"] = "d";
          a["ж"] = "j";
          a["э"] = "e";
          a["Я"] = "Ya";
          a["Ч"] = "CH";
          a["С"] = "S";
          a["М"] = "M";
          a["И"] = "I";
          a["Т"] = "T";
          a["Ь"] = "ʼ";
          a["Б"] = "B";
          a["Ю"] = "Yu";
          a["я"] = "ya";
          a["ч"] = "ch";
          a["с"] = "s";
          a["м"] = "m";
          a["и"] = "i";
          a["т"] = "t";
          a["ь"] = "ʼ";
          a["б"] = "b";
          a["ю"] = "yu";
          a["қ"] = "q";
          a["ў"] = "oʼ";
          a["Қ"] = "Q";
          a["Ў"] = "Oʼ";
          a["ғ"] = "gʼ";
          a["Ғ"] = "Gʼ";
          a["В"] = "V";
          a["в"] = "v";

          for (let i in word) {
            if (word.hasOwnProperty(i)) {
              if (a[word[i]] === undefined) {
                answer += word[i];
              } else {
                answer += a[word[i]];
              }
            }
          }
          return answer
        },

        toCyrill(word) {
          var answer = "",
            a = {};
          a["h"] = "ҳ";
          a["H"] = "Ҳ";
          a["YO"] = "Ё";
          a["Y"] = "Й";
          a["TS"] = "Ц";
          a["U"] = "У";
          a["K"] = "К";
          a["E"] = "Е";
          a["N"] = "Н";
          a["G"] = "Г";
          a["SH"] = "Ш";
          a["Z"] = "З";
          a["X"] = "Х";
          a["yo"] = "ё";
          a["y"] = "й";
          a["ts"] = "ц";
          a["u"] = "у";
          a["k"] = "к";
          a["e"] = "е";
          a["n"] = "н";
          a["g"] = "г";
          a["sh"] = "ш";
          a["z"] = "з";
          a["x"] = "х";
          a["F"] = "Ф";
          a["V"] = "В";
          a["A"] = "А";
          a["P"] = "П";
          a["R"] = "Р";
          a["O"] = "О";
          a["L"] = "Л";
          a["D"] = "Д";
          a["J"] = "Ж";
          a["E"] = "Е";
          a["f"] = "ф";
          a["v"] = "в";
          a["a"] = "а";
          a["p"] = "п";
          a["r"] = "р";
          a["o"] = "о";
          a["l"] = "л";
          a["d"] = "д";
          a["j"] = "ж";
          a["e"] = "е";
          a["Ya"] = "Я";
          a["CH"] = "Ч";
          a["S"] = "С";
          a["M"] = "М";
          a["I"] = "И";
          a["T"] = "Т";
          a["B"] = "Б";
          a["Yu"] = "Ю";
          a["ya"] = "я";
          a["ch"] = "ч";
          a["s"] = "с";
          a["m"] = "м";
          a["i"] = "и";
          a["t"] = "т";
          a["b"] = "б";
          a["yu"] = "ю";
          a["q"] = "қ";
          a["'o"] = "ў";
          a["Q"] = "Қ";
          a["'O"] = "Ў";
          a["o‘"] = "ў";
          a["g'"] = "ғ";
          a["g`"] = "ғ";
          a["g‘"] = "ғ";
          a["G`"] = "Ғ";
          a["G‘"] = "Ғ";
          a["G'"] = "Ғ";
          a["V"] = "В";
          a["v"] = "в";

          for (let i = 0; i < word.length; i++) {
            if (i + 1 <= word.length) {
              if (word[i] + word[i + 1] === "Ye" || word[i] + word[i + 1] === "YE") {
                answer += "Е";
                i++;
              } else if (word[i] + word[i + 1] === "ye") {
                answer += "е";
                i++;
              } else if (word[i] + word[i + 1] === "Ya" || word[i] + word[i + 1] === "YA") {
                answer += "Я";
                i++;
              } else if (word[i] + word[i + 1] === "ya") {
                answer += "я";
                i++;
              } else if (
                word[i] + word[i + 1] === "Yu" ||
                word[i] + word[i + 1] === "YU"
              ) {
                answer += "Ю";
                i++;
              } else if (word[i] + word[i + 1] === "yu") {
                answer += "ю";
                i++;
              } else if (
                word[i] + word[i + 1] === "Ch" ||
                word[i] + word[i + 1] === "CH"
              ) {
                answer += "Ч";
                i++;
              } else if (word[i] + word[i + 1] === "ch") {
                answer += "ч";
                i++;
              } else if (word[i] + word[i + 1] === "sh") {
                answer += "ш";
                i++;
              } else if (
                word[i] + word[i + 1] === "Sh" ||
                word[i] + word[i + 1] === "SH"
              ) {
                answer += "Ш";
                i++;
              } else if (word[i] + word[i + 1] === "ts") {
                answer += "ц";
                i++;
              } else if (
                word[i] + word[i + 1] === "Ts" ||
                word[i] + word[i + 1] === "TS"
              ) {
                answer += "Ц";
                i++;
              } else if (
                word[i] + word[i + 1] === "Yo" ||
                word[i] + word[i + 1] === "YO"
              ) {

                if (word[i + 2] !== "'" && word[i + 2] !== "ʼ" && word[i + 2] !== "‘") {
                  answer += "Ё";
                  i++
                } else {
                  if (a[word[i]] === undefined) {
                    answer += word[i];
                  } else {
                    answer += a[word[i]];
                  }
                }


              } else if (word[i] + word[i + 1] === "yo") {
                if (word[i + 2] !== "'" && word[i + 2] !== "ʼ" && word[i + 2] !== "‘") {
                  answer += "ё";
                  i++;

                } else {
                  if (a[word[i]] === undefined) {
                    answer += word[i];
                  } else {
                    answer += a[word[i]];
                  }
                }

              } else if (word[i] + word[i + 1] === "a'") {
                answer += "аъ";
                i++;
              } else if (word[i] + word[i + 1] === "o'") {
                answer += "ў";
                i++;
              } else if (word[i] + word[i + 1] === "g'") {
                answer += "ғ";
                i++;
              } else if (word[i] + word[i + 1] === "O'") {
                answer += "Ў";
                i++;
              } else if (word[i] + word[i + 1] === "G'") {
                answer += "Ғ";
                i++;
              } else if (word[i] + word[i + 1] === "A'") {
                answer += "Aъ";
                i++;
              } else if (word[i] + word[i + 1] === "aʼ") {
                answer += "аъ";
                i++;
              } else if (word[i] + word[i + 1] === "oʼ") {
                answer += "ў";
                i++;
              } else if (word[i] + word[i + 1] === "gʼ") {
                answer += "ғ";
                i++;
              } else if (word[i] + word[i + 1] === "Oʼ") {
                answer += "Ў";
                i++;
              } else if (word[i] + word[i + 1] === "Gʼ") {
                answer += "Ғ";
                i++;
              } else if (word[i] + word[i + 1] === "Aʼ") {
                answer += "Aъ";
                i++;
              } else if (word[i] + word[i + 1] === "a‘") {
                answer += "аъ";
                i++;
              } else if (word[i] + word[i + 1] === "o‘") {
                answer += "ў";
                i++;
              } else if (word[i] + word[i + 1] === "g‘") {
                answer += "ғ";
                i++;
              } else if (word[i] + word[i + 1] === "O‘") {
                answer += "Ў";
                i++;
              } else if (word[i] + word[i + 1] === "G‘") {
                answer += "Ғ";
                i++;
              } else if (word[i] + word[i + 1] === "A‘") {
                answer += "Aъ";
                i++;
              } else if (["e'", "eʼ", "e‘"].includes(word[i] + word[i + 1])) {
                answer += "еъ";
                i++;
              } else if (["i'", "iʼ", "i‘"].includes(word[i] + word[i + 1])) {
                answer += "иъ";
                i++;
              } else if (["u'", "uʼ", "u‘"].includes(word[i] + word[i + 1])) {
                answer += "уъ";
                i++;
              } else if (["u'", "uʼ", "u‘"].includes(word[i] + word[i + 1])) {
                answer += "уъ";
                i++;
              } else {
                if (a[word[i]] === undefined) {
                  answer += word[i];
                } else {
                  answer += a[word[i]];
                }
              }
            }
          }
          return answer
        },
        getOnlyCharacter(word){
          return word.replace(/[^a-z]+/g, '');
        },
        // ENCODE URL
        enc(id) {
          let payload = "did$tAid$z"
          try {
            let params = window.btoa(payload)
            return window.btoa(params + id)
          } catch (error) {
            return "e"
          }
        },
        //DECODE URL
        dec(args) {
          let payload = "did$tAid$z"
          try {
            let params = window.atob(args)
            let givenVal = window.btoa(payload)
            let arr = params.split(givenVal)
            return parseInt(arr[1])
          } catch (error) {
            return "e"
          }

        },
        util_paginate(index, page_number, itemsPerPage) {
          --page_number;
          return itemsPerPage * page_number + index + 1;
        },
        // PAGINATE FROM VIRTUAL (TEMPORARY)
        paginate(index, page_size, page_number) {
          --page_size;
          return (page_number * page_size) + index + 1;
        },
        localeKey(key='name') {
          if (!key) return ''
          return `${key}${i18n.locale[0].toUpperCase()}${i18n.locale[1]}`
        },
        getName(item) {
          for (let i in item) {
            if (i18n.locale === 'ru') {
              if (i.endsWith("Ru")) {
                if (item[i]) {
                  return item[i];
                }
                return item.nameUz ? item.nameUz : item.nameLt ? item.nameLt : item.nameRu ? item.nameRu : ''
              }
            } else if (i18n.locale === 'uz') {
              if (i.endsWith("Lt")) {
                if (item[i]) {
                  return item[i];
                }
                return item.nameUz ? item.nameUz : item.nameLt ? item.nameLt : item.nameRu ? item.nameRu : ''
              }
            } else if (i18n.locale === 'en') {
              if (i.endsWith("En")) {
                if (item[i]) {
                  return item[i];
                }
                return item.nameUz ? item.nameUz : item.nameLt ? item.nameLt : item.nameRu ? item.nameRu : ''
              }
            } else if (i18n.locale === 'uzCyrillic') {
              if (i.endsWith("Uz")) {
                return item[i];
              }
              return item.nameUz ? item.nameUz : item.nameLt ? item.nameLt : item.nameRu ? item.nameRu : ''
            } else {
              return ''
            }
          }
          return ''
        },
        // CHECK EMPTY
        _empty(v) {
          if (v == null) {
            return true
          } else if (v == undefined) {
            return true
          } else if (v.length === 0) {
            return true
          } else {
            return false
          }

        },
        getNumberFormat(num) {
          if (num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          } else return null
        },
        getDateFormat(date, separator = '.') {
          let data = new Date(date);
          let day = data.getDate();
          let month = data.getMonth() + 1;
          return (
            (day <= 9 ? "0" + day : day).toString() +
            separator +
            (month <= 9 ? "0" + month : month).toString() +
            separator +
            data.getFullYear().toString()
          );
        },
        urlPushState(queries) {
          const url = new URL(window.location);
          for (let i in queries) {
            url.searchParams.set(i, queries[i]);
          }
          window.history.pushState({}, '', url);
        }
      }
    })
  }
}
