import { Injectable } from '@angular/core';
import { Predictions } from '@aws-amplify/predictions';
import { parseAmplifyConfig } from "aws-amplify/utils";

import { Amplify } from "aws-amplify";
import outputs from '../../amplify_outputs.json';
const amplifyConfig = parseAmplifyConfig(outputs);


@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor() {   Amplify.configure({
      ...amplifyConfig,
      Predictions: outputs.custom.Predictions,
      
    });
  }


  async analyzeSentiment(textToAnalyze: string): Promise<string | void> {
    
  try {
    
    const result = await Predictions.interpret({
      text: {
        source: {
          text: textToAnalyze,
        },
        type: 'all',  // Specify that you want sentiment analysis
      },
    });

    const sentiment = result.textInterpretation.sentiment;
    if (!sentiment) {
      console.warn('No sentiment data available.');
      return;
    }

    console.log('Sentiment Analysis Result:', result);
    console.log('Sentiment:', sentiment); // 'POSITIVE', 'NEGATIVE', 'NEUTRAL'

    const { positive = 0, negative = 0, neutral = 0 } = sentiment;
    const maxScore = Math.max(positive , negative, neutral);

    const roundedMaxScore = maxScore.toFixed(3)

    return `${sentiment.predominant} : ${Number(roundedMaxScore) * 100  }%`
  } catch (error) {
    console.error('Error interpreting sentiment:', error);
  }
}

}
