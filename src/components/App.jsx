import { GlobalStyle } from './GlobalStyle';
import React, { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { NotificationMessage } from './NotificationMessage/NotificationMessage';
import { SectionTitle } from './SectionTitle/SectionTitle';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Box } from './Box';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  console.log(good);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good / total) * 100);
  };

  const onLeaveFeedback = type => {
    switch (type) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;

      default:
        throw new Error(`Unknows feedback type - ${type}`);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gridGap="20px"
      p="20px"
    >
      <SectionTitle title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </SectionTitle>
      <SectionTitle title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <NotificationMessage message="There is no feedback" />
        )}
      </SectionTitle>
      <GlobalStyle />
    </Box>
  );
};
