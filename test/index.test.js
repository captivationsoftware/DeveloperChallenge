import Decoder from '../src/decoder';
import { encodeMessage } from '../src/helpers';

const d = new Decoder('CZAJKOWSKI', 100);

test('decode', () => {

  const messages = [
    `Wish that I was on ol' Rocky Top Down in the Tennessee hills Ain't no smoggy smoke on Rocky Top Ain't no telephone bills Once I had a girl on Rocky Top Half bear, other half cat Wild as a mink, but sweet as soda pop I still dream about that`,
    `Rocky Top, you'll always be Home sweet home to me Good ol' Rocky Top Rocky Top, Tennessee Rocky Top, Tennessee`,
    `Once two strangers climbed ol' Rocky Top Lookin' for a moonshine still Strangers ain't come down from Rocky Top Reckon they never will Corn won't grow at all on Rocky Top Dirt's too rocky by far That's why all the folks on Rocky Top Get their corn from a jar`,
    `I've had years of cramped-up city life Trapped like a duck in a pen All I know is it's a pity life Can't be simple again`
  ]
    .map((msg) => {
      return msg.substring(0, 100);
    });

  const decodedCallback = jest.fn();
  d.on('decoded', decodedCallback);

  messages.forEach((msg) => {

    const n = Math.random() * Math.pow(10, 2);
    let junk = '';

    for (let i = 0; i < n; i++) {
      junk += Math.floor(Math.random() * 2);
    }

    junk += encodeMessage('CZAJKOWSKI') + encodeMessage(msg)

    d.feedChunk(junk);
  });

  expect(decodedCallback).toHaveBeenCalledTimes(messages.length);
});
