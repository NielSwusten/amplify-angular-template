import { Injectable } from '@angular/core';
import { Predictions } from '@aws-amplify/predictions';



@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor() { }

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
      

      // Result should contain the sentiment analysis response
      console.log('Sentiment Analysis Result:', result);
      const sentiment = result.textInterpretation.sentiment;
      console.log('Sentiment:', sentiment); // 'POSITIVE', 'NEGATIVE', 'NEUTRAL'

      return "test"; // Return the sentiment or use it as needed
    } catch (error) {
      console.error('Error interpreting sentiment:', error);
    }
  }
}
