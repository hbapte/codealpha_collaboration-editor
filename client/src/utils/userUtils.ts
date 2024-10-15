// client/src/utils/userUtils.ts
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export function getOrCreateUserId() {
    let userId = Cookies.get('userId');

    if (!userId) {
        userId = uuidv4();
        Cookies.set('userId', userId, { expires: 365 }); // Expires in 1 year
    }

    return userId;
}
