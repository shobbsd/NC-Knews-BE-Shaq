const { expect } = require('chai');
const { timeStamp, articleRef } = require('../db/utils/');
const { articleData } = require('../db/data/index');

const data = [
  {
    title: 'The Notorious MSG’s Unlikely Formula For Success',
    topic: 'cooking',
    author: 'grumpy19',
    body:
      "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
    created_at: 1502921310430,
  },
  {
    title: 'Stone Soup',
    topic: 'cooking',
    author: 'cooljmessy',
    body:
      'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
    created_at: 1481662720516,
  },
];

const data2 = [
  {
    title: 'Running a Node App',
    topic: 'coding',
    author: 'jessjelly',
    body:
      'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
    created_at: 1471522072389,
    article_id: 1,
  },
  {
    title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
    topic: 'coding',
    author: 'jessjelly',
    body:
      'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
    created_at: 1500584273256,
    article_id: 3,
  },
];

describe('timeStamp', () => {
  it('Should be able to recieve an array with a single element (object) and return the array with the timeStamp formatted', () => {
    const actual = timeStamp([data[0]]);
    const expected = Date(data[0].created_at);
    expect(actual[0].created_at).to.equal(expected);
  });
  it('Should be able to recieve an array with a multiple elements (object) and return the array with the timeStamp formatted', () => {
    const actual = timeStamp(data);
    const expected = Date(data[0].created_at);
    expect(actual[0].created_at).to.equal(expected);
    expect(actual[1].created_at).to.equal(Date(data[1].created_at));
  });
  it('Should be able to recieve an array with a multiple elements (object) and return the array with the timeStamp formatted', () => {
    const actual = timeStamp(articleData);
    const expected = Date(data[0].created_at);
    // console.log(actual);
  });
});

describe('articleRef', () => {
  it('Should be able to create a reference Object ', () => {
    const actual = articleRef(data2);
    // console.log(actual);
  });
});
