window.global = window;
import { Amplify } from "aws-amplify";
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from '../amplify_outputs.json';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const amplifyConfig = parseAmplifyConfig(outputs);

// Amplify.configure({
//   ...amplifyConfig,
//   Predictions: {
//     region: 'eu-central-1',  // Make sure this matches your region
//   }
// });


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
