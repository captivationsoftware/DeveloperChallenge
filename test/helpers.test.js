import { encodeMessage } from '../src/helpers';

test('encodeMessage', () => {
  const encoded = encodeMessage('some long string of text');
  expect(encoded).toBeDefined();
});
