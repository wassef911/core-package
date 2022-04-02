import { PollStatusTypes, UpdateTypes } from '../models/types';

import { StatusColorPipe } from './status-color.pipe';

const arr = [
  [
    [UpdateTypes.NOT_CLEAR], '#ec6a37'
  ],
  [
    [UpdateTypes.INVALID], '#DF5050'
  ],
  [
    [UpdateTypes.PROCESSING, PollStatusTypes.IN_PROGRESS], '#D48C2E'
  ],
  [
    [UpdateTypes.REJECTED], '#DF5050'
  ],
  [
    [UpdateTypes.ACCEPTED, PollStatusTypes.ENDED], '#72A545'
  ],
];

fdescribe('StatusColorPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusColorPipe();
    expect(pipe).toBeTruthy();
  });


  it('should render values properly', () => {
    arr.forEach((testCase) => {
      const pipe = new StatusColorPipe();
      (testCase[0] as Array<string>).forEach((type) => {
        const result = pipe.transform(type);
        expect(result).toBe(testCase[1]);
      });
    });
  });

  it('should render default value', () => {
    const pipe = new StatusColorPipe();
    const result = pipe.transform('erererererer');
    expect(result).toBe('#58C0E6');
  });
});
