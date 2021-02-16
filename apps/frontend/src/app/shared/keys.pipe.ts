import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(object: any): any {
        const keys = [];
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                keys.push({ key, value: object[key] });
            }
        }
        return keys;
    }
}
