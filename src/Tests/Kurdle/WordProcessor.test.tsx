import { Color, Position } from '../../Kurdle/Position';
import { trimWords } from '../../Kurdle/WordProcessor';

test('Properly Filters on Green Letters', () => {
    let input = ['HELLO', 'EHLLO', 'HIGHT', 'ABACK', 'ABASE', 'ABATE', 'ABBEY', 'ABBOT', 'ABHOR'];
    let expected = ['HELLO', 'HIGHT']
    let positionInfo = new Position('H', Color.Green, 0);
    let trimmedWords = trimWords(positionInfo, input)
    expect(trimmedWords).toEqual(expected);
});

test('Properly Filters on Grey Letters', () => {
    let input = ['HELLO', 'EHLLO', 'HIGHT', 'ABACK', 'ABASE', 'ABATE', 'ABBEY', 'ABBOT', 'ABHOR'];
    let expected = ['ABACK', 'ABASE', 'ABATE', 'ABBEY', 'ABBOT']
    let positionInfo = new Position('H', Color.Grey, 0);
    let trimmedWords = trimWords(positionInfo, input)
    expect(trimmedWords).toEqual(expected);
});

test('Properly Filters on Yello Letters', () => {
    let input = ['HELLO', 'EHLLO', 'HIGHT', 'ABACK', 'ABASE', 'ABATE', 'ABBEY', 'ABBOT', 'ABHOR'];
    let expected = ['EHLLO', 'ABHOR']
    let positionInfo = new Position('H', Color.Yellow, 0);
    let trimmedWords = trimWords(positionInfo, input)
    expect(trimmedWords).toEqual(expected);
});