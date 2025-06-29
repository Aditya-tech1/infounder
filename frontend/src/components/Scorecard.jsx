// src/components/Scorecard.jsx
"use client";
import React from 'react';
import styles from './Scorecard.module.css';

// Updated icons to match your new theme's style
const ICONS = {
    positive: <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
    neutral: <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg>,
    negative: <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    recommendation: <svg fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>,
    delivery: <svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.994 9.994 0 0010 12c-2.31 0-4.438.784-6.131 2.095z" /></svg>,
    deck: <svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 7.5a1 1 0 011-1h6a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5zM17 17.5a1 1 0 00-1-1h-2a1 1 0 00-1 1v0a1 1 0 001 1h2a1 1 0 001-1v0zM12 9a1 1 0 011-1h4a1 1 0 011 1v1a1 1 0 01-1 1h-4a1 1 0 01-1-1V9z" /></svg>,
    recommendationsTitle: <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM9.25 4.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12.25 4.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6.11 6.39a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM13.89 6.39a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06a.75.75 0 000-1.06zM4.75 9.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12.25 9.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9.25 12.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12.25 12.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6.11 13.89a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM13.89 13.89a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06a.75.75 0 000-1.06z" clipRule="evenodd" /></svg>,
};


const Scorecard = ({ reportData }) => {
  if (!reportData) return null;

  const { overallScore, confidenceScore, deliveryFeedback, deckFeedback, recommendations } = reportData;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - (overallScore / 5));

  return (
    <div className={styles.scorecardContainer}>
      {/* --- Scores --- */}
      <div className={styles.gridContainer}>
        <div className={styles.card}>
          <div className={styles.scoreItem}>
            <h3 className={styles.cardTitle}>Overall Score</h3>
            <div className={styles.scoreGauge}>
              <svg viewBox="0 0 120 120">
                <circle className={styles.scoreGaugeBg} cx="60" cy="60" r={radius}></circle>
                <circle className={styles.scoreGaugeFg} cx="60" cy="60" r={radius} style={{ strokeDashoffset }}></circle>
              </svg>
              <div className={styles.scoreText}>
                {overallScore.toFixed(1)}<span>/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.scoreItem}>
            <h3 className={styles.cardTitle}>Confidence Score</h3>
            <div className={styles.confidenceDisplay}>
              {(confidenceScore * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* --- Feedback --- */}
      <div className={styles.gridContainer}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{ICONS.delivery} Delivery Feedback</h3>
          <ul className={styles.list}>
            {deliveryFeedback.map((item, index) => (
              <li key={index} className={`${styles.listItem} ${styles[item.sentiment]}`}>
                {ICONS[item.sentiment]}
                {item.message}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{ICONS.deck} Deck Feedback</h3>
          <ul className={styles.list}>
            {deckFeedback.map((item, index) => (
              <li key={index} className={`${styles.listItem} ${styles[item.sentiment]}`}>
                {ICONS[item.sentiment]}
                {item.message}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Recommendations --- */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{ICONS.recommendationsTitle} Actionable Recommendations</h3>
        <ul className={styles.list}>
          {recommendations.map((rec, index) => (
            <li key={index} className={`${styles.listItem} ${styles.recommendation}`}>
              {ICONS.recommendation}
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scorecard;