import { ExceptionPipe } from './exception.pipe';

describe('ExceptionPipe', () => {
  it('create an instance', () => {
    const pipe = new ExceptionPipe();
    expect(pipe).toBeTruthy();
  });

  it('check exception pipe', () => {
    const pipe = new ExceptionPipe();
    const valueList = [
      { name: 'spray', id: 5, _id: 'ewdsd' },
      { name: 'limit', id: '1', _id: '5t433v' },
      { name: 'elite', id: '2', _id: '4355' },
      { name: 'exuberant', id: '3', _id: '334r34v' },
      { name: 'exuberant2', id: 3, _id: '454343rf' },
    ];
    const changedValueList = pipe.transform(valueList, ['ewdsd']);
    expect(changedValueList[0].name).toContain('limit');
  });
});
