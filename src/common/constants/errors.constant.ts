
export class ErrorMessages {
    static USER_EXIST = "user already exist";
    static INCORRECT_CREDENTIALS = "incorrect credentials";
    // static BRAND_EXIST = "brand already exist";
    // static ADDON_EXIST = "addon already exist";
    // static CATEGORY_EXIST = "category already exist";
    // static ADDON_NOT_FOUND = "addon not found";
    static USER_NOT_AUTHORIZE = "unauthorize";



    static userNotFound(id: string) {
        return `user with id ${id} not found`;
    }

    static brandNotFound(id: string) {
        return `brand with id ${id} not found`;
    }

    static userEmailNotFound(email: string) {
        return `${email} does not exist`;
    }

    static addonNotFound(id: string) {
        return `addon with id ${id} not found`;
    }
}