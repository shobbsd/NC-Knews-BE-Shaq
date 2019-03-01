const { expect } = require('chai');
const { formatTimeStamp, createArticleRef, formatComment } = require('../db/utils');

const preFormatData = [
  {
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: 1542284514171,
    votes: 100,
  },
  {
    title: 'Eight pug gifs that remind me of mitch',
    topic: 'mitch',
    author: 'icellusedkars',
    body: 'some gifs',
    created_at: 1289996514171,
  },
  {
    title: 'Student SUES Mitch!',
    topic: 'mitch',
    author: 'rogersop',
    body:
      'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
    created_at: 1163852514171,
  },
  {
    title: 'UNCOVERED: catspiracy to bring down democracy',
    topic: 'cats',
    author: 'rogersop',
    body: 'Bastet walks amongst us, and the cats are taking arms!',
    created_at: 1037708514171,
  },
  {
    title: 'A',
    topic: 'mitch',
    author: 'icellusedkars',
    body: 'Delicious tin of cat food',
    created_at: 911564514171,
  },
];

const formattedData = [
  {
    article_id: 8,
    title: 'Does Mitch predate civilisation?',
    body:
      'Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!',
    votes: 0,
    topic: 'mitch',
    author: 'icellusedkars',
    created_at: '1990 - 11 - 22T12: 21: 54.000Z',
  },
  {
    article_id: 9,
    title: "They're not exactly dogs, are they?",
    body: 'Well? Think about it.',
    votes: 0,
    topic: 'mitch',
    author: 'butter_bridge',
    created_at: '1986 - 11 - 23T12: 21: 54.000Z',
  },
  {
    article_id: 10,
    title: 'Seven inspirational thought leaders from Manchester UK',
    body: "Who are we kidding, there is only one, and it's Mitch!",
    votes: 0,
    topic: 'mitch',
    author: 'rogersop',
    created_at: '1982 - 11 - 24T12: 21: 54.000Z',
  },
  {
    article_id: 11,
    title: 'Am I a cat?',
    body:
      'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
    votes: 0,
    topic: 'mitch',
    author: 'icellusedkars',
    created_at: '1978 - 11 - 25T12: 21: 54.000Z',
  },
  {
    article_id: 12,
    title: 'Moustache',
    body: 'Have you seen the size of that thing?',
    votes: 0,
    topic: 'mitch',
    author: 'butter_bridge',
    created_at: '1974 - 11 - 26T12: 21: 54.000Z',
  },
];

const commentData = [
  {
    body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    belongs_to: "They're not exactly dogs, are they?",
    created_by: 'butter_bridge',
    votes: 16,
    created_at: 1511354163389,
  },
  {
    body:
      'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'butter_bridge',
    votes: 14,
    created_at: 1479818163389,
  },
  {
    body:
      'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'icellusedkars',
    votes: 100,
    created_at: 1448282163389,
  },
];

const ref = {
  'Living in the shadow of a great man': 1,
  "They're not exactly dogs, are they?": 9,
};

describe('formatTimeStamp', () => {
  it('the function should be able to receive an array with one element and return an array with that element formatted', () => {
    const test = [preFormatData[0]];
    const actual = formatTimeStamp(test);
    const expected = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: '11/15/2018, 12:21:54 PM',
        votes: 100,
      },
    ];
    expect(actual).to.eql(expected);
  });
  it('the function should be able to receive an array with multiple elements and return an array with the elements formatted', () => {
    const test = [preFormatData[0], preFormatData[1]];
    const actual = formatTimeStamp(test);
    const expected = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: '11/15/2018, 12:21:54 PM',
        votes: 100,
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: '11/17/2010, 12:21:54 PM',
      },
    ];
    expect(actual).to.eql(expected);
  });
  it('the function should not mutate the variable', () => {
    const test = [preFormatData[0], preFormatData[1]];
    const actual = formatTimeStamp(test);
    expect(actual).to.not.equal(test);
  });
});

describe('createArticleRef', () => {
  it('The function should be able to take in an array and return an object', () => {
    const actual = createArticleRef([]);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it('The function should be able to take in an array with a single element and return an object with a key = to the title and a value = to the article_id', () => {
    const actual = createArticleRef([formattedData[0]]);
    const key = formattedData[0].title;
    const value = formattedData[0].article_id;
    const expected = { [key]: value };
    expect(actual).to.eql(expected);
  });
  it('The function should be able to take in an array with a multiple elements and return a single object with keys = to the title and values = to the article_id', () => {
    const actual = createArticleRef([formattedData[0], formattedData[1]]);
    const key = formattedData[0].title;
    const key2 = formattedData[1].title;
    const value = formattedData[0].article_id;
    const value2 = formattedData[1].article_id;
    const expected = { [key]: value, [key2]: value2 };
    expect(actual).to.eql(expected);
  });
});

describe('formatComment', () => {
  it('The function should be able to take in a reference object and an array with a single element, and return an array with the data formatted in the correct way (swappinig "belongs_to" with "article_id" and swapping "created_by" with author" )', () => {
    const actual = formatComment([commentData[0]], ref);
    const expected = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        created_at: '11/22/2017, 12:36:03 PM',
        article_id: 9,
        author: 'butter_bridge',
      },
    ];
    expect(actual).to.eql(expected);
  });
  it('The function should be able to take in a reference object and an array with multiple elements, and return an array with the data formatted in the correct way (swappinig "belongs_to" with "article_id" and swapping "created_by" with author" )', () => {
    const actual = formatComment([commentData[0], commentData[2]], ref);
    const expected = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        created_at: '11/22/2017, 12:36:03 PM',
        article_id: 9,
        author: 'butter_bridge',
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        votes: 100,
        created_at: '11/23/2015, 12:36:03 PM',
        article_id: 1,
        author: 'icellusedkars',
      },
    ];
    expect(actual).to.eql(expected);
  });
  it('The function should not mutate the original data', () => {
    const testArr = [commentData[0], commentData[2]];
    const actual = formatComment(testArr, ref);
    expect(actual).to.not.equal(testArr);
  });
});
