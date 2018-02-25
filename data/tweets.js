exports.loadTweets = async () => {
  const baseData = {
    likes: 2,
    author: '5a92b7fdcb71600d68a94013',
  };
  const tweetText = [
    { _id: '58c05f928060197ca0b52d59', tweetContent: 'Lunch was fantastic. I rode the dragons afterwards.' },
    { _id: '58c05c208060197ca0b52d58', tweetContent: 'Winter is here.' },
    { _id: '58c05bcd8060197ca0b52d57', tweetContent: 'The weather is sooo cold. I miss the heat' },
    { _id: '58c057838060197ca0b52d54', tweetContent: 'Deep work has really helped me improve and made me happier' },
    { _id: '58c03a958060197ca0b52d50', tweetContent: 'I am taking back the 7 kingdoms right after I defeat the night king' },
    { _id: '58c03a428060197ca0b52d4f', tweetContent: 'I love John Snow!' },
    { _id: '58c039ee8060197ca0b52d4e', tweetContent: 'Being Queen is not as much fun as you would think.' },
    { _id: '58c039938060197ca0b52d4d', tweetContent: 'Enjoy the journey' },
  ];

  const allTweets = await tweetText.map(singleTweet => Object.assign({}, baseData, singleTweet));  
  return allTweets;
};
