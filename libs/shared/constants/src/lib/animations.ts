import { animate, style, transition, trigger } from '@angular/animations';

export const IN_OUT_ANIMATION = [
    trigger('inOutAnimation', [
        transition(':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            animate('0.25s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', opacity: 1 }),
            animate(
                '0.25s ease-in',
                style({ transform: 'translateY(-100%)', opacity: 0 }),
            ),
        ]),
    ]),
];
