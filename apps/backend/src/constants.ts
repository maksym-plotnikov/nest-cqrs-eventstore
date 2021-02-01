export const USER_REQUEST_KEY = 'user';
export const JWT_ERROR = 'JWT_ERROR';

export enum ErrorSource {
    EMAIL = 'EMAIL',
    USERNAME = 'USERNAME',
}

export enum RoleType {
    Admin = 'ADMIN',
    User = 'USER',
}

export const locales = {
    messages: {
        IS_NOT_EMPTY: 'Field cannot be empty',
        IS_STRING: 'Field should be string',
        IS_NUMBER: 'Field should be number',
        IS_EMAIL: 'Field should be valid email',
        IS_PHONE_NUMBER: 'Field should be valid phone number',
        IS_ENUM: 'Field should be valid Enum',
        IS_BOOLEAN: 'Field should be valid Boolean',
        IS_OBJECT: 'Field should be valid object',
        IS_NOT_UUID: 'Field should be valid UUID',
        PASSWORD_IS_SET:
            'Password has been already reset. Please login with Your credentials.',
        PASSWORD_IS_CREATE:
            'User with this email already exists. Please login to change Your password.',
        PASSWORD_INCORRECT: 'Your current password is incorrect',
        IS_COMPANY_NAMES_ENUM_ARRAY: 'Field should be valid array of company names',
        IS_TEMPLATE_STATUSES_ENUM_ARRAY:
            'Field should be valid array of template statuses',
        UNPROCESSABLE_ENTITY:
            'Something went wrong during request processing. Please try again later.',
        ITEM_NOT_FOUND: (item = 'Item') => `${item} not found`,
        SUCCESSFULLY: (action = 'created') => `Successfully ${action}`,
        PROVIDE_ITEM: (item = 'item id') => `Provide ${item}`,
        MIN_LENGTH: (num = 4) => `Field should have more than ${num} letters`,
        MAX_LENGTH: (num = 4) => `Field should have less than ${num} letters`,
        SAME_ITEM_WITH_FIELD_EXISTS: (item, fields) => {
            if (fields.length > 0) {
                const fieldsConcat = fields.join(', ');
                return `${item} with same ${fieldsConcat} already exists`;
            }
            return `${item} with same ${fields[0]} already exists`;
        },
        USER_ID_NOT_EXIST: (id = '') => `User with id ${id} doesn't exist`,
        USER_EMAIL_NOT_EXIST: (email = '') => `User with email ${email} doesn't exist`,
    },
};
