import Decoder from './decoder';

const d = new Decoder('CAPTIVATION', 100);

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();

  if (!chunk) {
    return;
  }

  d.feedChunk(chunk);
});

d.on('decoded', (msg) => {
  console.info(msg);
});
