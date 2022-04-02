import { Pipe, PipeTransform } from '@angular/core';

import { PollStatusTypes, UpdateTypes } from '../models/types';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case UpdateTypes.NOT_CLEAR:
        return '#ec6a37';
      case UpdateTypes.INVALID:
        return '#DF5050';
      case PollStatusTypes.IN_PROGRESS:
      case UpdateTypes.PROCESSING:
        return '#D48C2E';
      case UpdateTypes.REJECTED:
        return '#DF5050';
      case PollStatusTypes.ENDED:
      case UpdateTypes.ACCEPTED:
        return '#72A545';
      // defaults to RECEIVED or NOT_STARTED
      default:
        return '#58C0E6';
    }
  }
}
