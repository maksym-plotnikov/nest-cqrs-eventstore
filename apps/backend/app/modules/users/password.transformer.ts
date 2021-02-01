import { ValueTransformer } from 'typeorm';
import { UtilsService } from '../../shared/services/utils.service';

export class PasswordTransformer implements ValueTransformer {
    to(value: string | undefined) {
        // Omit hashing to DB if password is already valid Bcrypt hash
        if (/^\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}$/.test(value)) {
            return value;
        }
        return UtilsService.generateHash(value);
    }
    from(value) {
        return value;
    }
}
