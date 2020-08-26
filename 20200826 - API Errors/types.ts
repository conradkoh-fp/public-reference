//Frontend code
export interface ServerError {
	code: ErrorCode //language indepdendent code, human readable, addition to this considered a breaking change
	message: string
	target?: string //the "target" of the error (?) - seems to specify WHERE the error has occurred (such as a property)
	details?: ServerError[]
	innererror?: InnerError
}

export interface InnerError {
    code?: string,
    message?: string, 
    target?: string,
    innererror?: InnerError
}

//Global server error code that must be handled by ALL clients
export enum ErrorCode {
	TokenExpired = 'token_expired',
	InvalidToken = 'invalid_token',
    BadArgument = 'bad_argument',
    NullValue = 'null_value',
    MalformedValue = 'malformed_value',
    InvalidValue = 'invalid_value'
}
