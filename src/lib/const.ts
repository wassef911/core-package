import { trigger, style, animate, transition } from '@angular/animations';

export const defaultAnimation = {
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate(500, style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition('* => void', [animate(0, style({ opacity: 0 }))]),
    ]),
  ]
};
