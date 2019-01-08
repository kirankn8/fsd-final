import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('check search', () => {
    const pipe = new SearchPipe();
    const valueList = [
      { name: 'spray', id: 5, _id: 'ewdsd' },
      { name: 'limit', id: '1', _id: '5t433v' },
      { name: 'elite', id: '2', _id: '4355' },
      { name: 'exuberant', id: '3', _id: '334r34v' },
      { name: 'exuberant2', id: 3, _id: '454343rf' },
    ];
    const changedValueList = pipe.transform(valueList, 'elite');
    expect(changedValueList[0].name).toContain('elite');
  });

  it('check sort', () => {
    const pipe = new SearchPipe();
    const valueList = [
      { name: 'spray', id: 5, _id: 'ewdsd' },
      { name: 'limit', id: '1', _id: '5t433v' },
      { name: 'elite', id: '2', _id: '4355' },
      { name: 'exuberant', id: '3', _id: '334r34v' },
      { name: 'exuberant2', id: 3, _id: '454343rf' },
    ];
    const changedValueList = pipe.transform(valueList, null, 'id');
    expect(changedValueList[0].name).toContain('limit');
  });
});
