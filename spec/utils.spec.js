const { timeStamp } = require('../db/utils/timeStamp');
const { expect } = require('chai');

const data = [
  {
    title: 'The Notorious MSG’s Unlikely Formula For Success',
    topic: 'cooking',
    author: 'grumpy19',
    body:
      "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
    created_at: 1502921310430,
  },
  // {
  //   title: 'Stone Soup',
  //   topic: 'cooking',
  //   author: 'cooljmessy',
  //   body:
  //     'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
  //   created_at: 1481662720516,
  // },
];

describe('timeStamp', () => {
  it('Should be able to recieve an array with a single element (object) and return the array with the timeStamp formatted', () => {
    const actual = timeStamp(data);
    const expected = Date(data[0].created_at);
    expect(actual[0].created_at).to.equal(expected);
  });
});
