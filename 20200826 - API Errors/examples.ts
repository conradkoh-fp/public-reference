import { ErrorCode, APIError } from './types'
/**
 * Example API error when start date is greater than end date
 * Using details to represent errors
 */
let formErrorSingle: APIError = {
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
let formErrorSingle2: APIError = {
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
let formErrorMultiple1: APIError = {
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
let nestedFormErrorMultiple: APIError = {
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

/**
 * Proposal:
 * 1. Use details to represent 1 - * relation (such as form errors caused by a bad field)
 * 2. Use innerError to represent a 1 - 1 relation with nesting for more details
 * 3. To display more customised error messages where they have occurred, traverse the following and pick the deepest message available
 *     a. innerError to get more detailed error message to be displayed to a user on a page level
 *     b. details -> innererror to get per field error messages first, and then traverse inner error of details to get custom errors
 * 4. messasges should be keys to be used for localisation (a-Z, used programmatically)
 */