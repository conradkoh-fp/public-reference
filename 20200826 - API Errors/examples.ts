import { ErrorCode, ServerError } from './types'
/**
 * Example API error when start date is greater than end date
 * Using details to represent errors
 */
let formErrorSingle: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'deal_form_fields_invalid',
    target: 'deal_form',
    details: [
        { code: ErrorCode.InvalidValue, message: 'start_date_greater_than_end_date', target: 'start_date' }
    ]
}

/**
 * Example API error when start date is greater than end date
 * Using innererror to represent errors
 */
let formErrorSingle2: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'deal_form_fields_invalid',
    target: 'deal_form',
    innererror: {
        code: 'start_date_error',
        message: 'start_date_greater_than_end_date',
        target: 'start_date',
    }
}

/**
 * Example API error when start date is greater than end date
 * Using details to report multiple errors. Not possilbe to represent multiple errors using innererror
 */
let formErrorMultiple1: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'deal_form_fields_invalid',
    target: 'deal_form',
    details: [
        { code: ErrorCode.InvalidValue, message: 'start_date_greater_than_end_date', target: 'start_date' },
        { code: ErrorCode.InvalidValue, message: 'end_date_less_than_start_date', target: 'end_date' },
    ]
}

/**
 * Example API error 
 * Using details to report multiple errors with more detailed reasons for ocurring errors
 */
let nestedFormErrorMultiple: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'form_fields_invalid',
    target: 'registration_form',
    details: [
        { code: ErrorCode.InvalidValue, message: 'username_must_not_be_empty', target: 'username' },
        { code: ErrorCode.InvalidValue, message: 'password_error', target: 'password', innererror: {
            code: 'password_does_not_meet_policy', message: 'password_does_not_meet_policy'
        }},
    ],
}