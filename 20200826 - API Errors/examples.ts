import { ErrorCode, ServerError } from './types'
/**
 * Example API error when start date is greater than end date
 * Using details to represent errors
 */
let formErrorSingle: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'Deal form fields invalid',
    target: 'deal_form',
    details: [
        { code: ErrorCode.InvalidValue, message: 'Start date is later than end date', target: 'start_date' }
    ]
}

/**
 * NEGATIVE EXAMPLE (Do not use)
 * Example API error when start date is greater than end date
 * Using innererror to represent errors
 */
let formErrorSingle2: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'Deal form fields invalid',
    target: 'deal_form',
    innererror: {
        code: 'start_date_error',
        message: 'Start date is later than end date',
        target: 'start_date',
    }
}

/**
 * Example API error when start date is greater than end date
 * Using details to report multiple errors. Not possilbe to represent multiple errors using innererror
 */
let formErrorMultiple1: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'Deal form fields invalid',
    target: 'deal_form',
    details: [
        { code: ErrorCode.InvalidValue, message: 'Start date is later than end date', target: 'start_date' },
        { code: ErrorCode.InvalidValue, message: 'End date is earlier than start date', target: 'end_date' },
    ]
}

/**
 * Example API error 
 * Using details to report multiple errors with more detailed reasons for ocurring errors
 */
let nestedFormErrorMultiple: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'Form fields invalid',
    target: 'registration_form',
    details: [
        { code: ErrorCode.InvalidValue, message: 'username_must_not_be_empty', target: 'username' },
        { code: ErrorCode.InvalidValue, message: 'password_error', target: 'password', innererror: {
            code: 'password_does_not_meet_policy', message: 'Password does not meet policy'
        }},
    ],
}


/**
 * Example API error 
 * Using details to report multiple errors with more detailed reasons for ocurring errors and inner errors for fields with multiple fields
 */
let nestedFormErrorMultiple2: ServerError = {
    code: ErrorCode.BadArgument,
    message: 'Form fields invalid',
    target: 'registration_form',
    details: [
        { code: ErrorCode.InvalidValue, message: 'Username must not be empty', target: 'username' },
        { code: ErrorCode.InvalidValue, message: 'Password Error', target: 'password', innererror: {
            code: 'password_does_not_meet_policy', message: 'Password does not meet policy'
        }},
        { code: ErrorCode.InvalidValue, message: 'Address Invalid', target: 'address', details: [
            { code: ErrorCode.InvalidValue, message: 'Line 1 invalid', target: 'line_1', innererror: {
                code: 'line_1_cannot_be_empty', message: "Line 1 cannot be empty"
            }}
        ]}
    ],
}