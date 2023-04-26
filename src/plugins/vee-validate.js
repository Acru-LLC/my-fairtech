import Vue from 'vue'
import {
    TokenService
} from '@/shared/services/storage.service'
import i18n from '@/i18n'

import { ValidationProvider, ValidationObserver } from 'vee-validate'

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { confirmed } from 'vee-validate/dist/rules';
import { integer } from 'vee-validate/dist/rules';
import { double } from 'vee-validate/dist/rules';
import { numeric } from 'vee-validate/dist/rules';
import { regex } from 'vee-validate/dist/rules';
import { min } from 'vee-validate/dist/rules';
import { max } from 'vee-validate/dist/rules';
import { email } from 'vee-validate/dist/rules';

extend('password', {
    params: ['target'],
    validate (value, { target }) {
        return value === target;
    },
    message: i18n.t('validator.passwords_mismatch', TokenService.getLocale())
});

const phoneOrEmailRule = {
    getMessage (field, args) {
        return `The ${field} must be either a valid phone number or e-mail`;
    },
    validate (value, args) {
        // Custom regex for a phone number
        let uzbPhoneRegex = new RegExp("^[+]{0,1}[8-9]{1,3}[0-9]{2}[-]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}");

        // Check for either of these to return true
        return email(value) || uzbPhoneRegex.test(value);
    }
};
/* const validPasswordRegex = {
    getMessage (field, args) {
        return i18n.t('validator.regex', TokenService.getLocale())
    },
    validate (value, args) {
        // Custom regex for password
        // eslint-disable-next-line no-useless-escape
        let validPasswordReg = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
        // Check for either of these to return true
        return validPasswordReg.test(value);
    }
};
extend('validPassword', {
    ...validPasswordRegex,
    //+ values._field_
    message: (_, values) => i18n.t('validator.regex', TokenService.getLocale())
}); */
extend('phoneOrEmail', {
    ...phoneOrEmailRule,
    //+ values._field_
    message: (_, values) => i18n.t('validator.required', TokenService.getLocale())
});

extend('required', {
    ...required,
    //+ values._field_
    message: (_, values) => i18n.t('validator.required', TokenService.getLocale())
});
extend('email', {
    ...email,
    //+ values._field_
    message: (_, values) => i18n.t('validator.email', TokenService.getLocale())
});
extend('regex', {
    ...regex,
    //+ values._field_
    message: (_, values) => i18n.t('validator.regex', TokenService.getLocale())
});
extend('integer', {
    ...integer,
    //+ values._field_
    message: (_, values) => i18n.t('validator.integer', TokenService.getLocale())
});
extend('double', {
    ...double,
    //+ values._field_
    message: (_, values) => i18n.t('validator.double', TokenService.getLocale())
});
extend('numeric', {
    ...numeric,
    //+ values._field_
    message: (_, values) => i18n.t('validator.numeric', TokenService.getLocale())
});
extend('min', {
    ...min,
    //+ values._field_
    message: (_, values) => i18n.t('validator.min', TokenService.getLocale())
});
extend('max', {
    ...max,
    //+ values._field_
    message: (_, values) => i18n.t('validator.max', TokenService.getLocale())
});
extend('confirmed', {
    ...confirmed,
    //+ values._field_
    message: (_, values) => i18n.t('validator.confirmed', TokenService.getLocale())
});
extend('positive', value => {
    if (value >= 0) {
        return true;
    }

    return i18n.t('validator.positive', TokenService.getLocale());
});
extend('positiveNotZero', value => {
    if (value > 0) {
        return true;
    }

    return i18n.t('validator.positive', TokenService.getLocale());
});
extend('negative', value => {
    if (/^-\d*\.?\d+$/.test(value)) {
        return true;
    }

    return i18n.t('validator.negative', TokenService.getLocale());
});

extend('notempty', value => {
    if (value !== '') {
        return true;
    }

    return 'The {_field_} field must be a positive number';
})
extend('phoneNumber', {
    validate: value => {
        let uzbPhoneRegex = new RegExp("^[+]{0,1}[8-9]{1,3}[0-9]{2}[-]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}");
        return uzbPhoneRegex.test(value);
    }
});
