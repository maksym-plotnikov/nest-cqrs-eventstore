import { onsPlatform } from 'ngx-onsenui';

export const isMobile = () => {
    return getMobileOS() != 'other';
};

export const getMobileOS = () => {
    if (onsPlatform.isAndroid()) {
        return 'android';
    } else if (onsPlatform.isIOS()) {
        return 'ios';
    } else if (onsPlatform.isWP()) {
        return 'wp';
    } else {
        return 'other';
    }
};
