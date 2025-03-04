window.global = window;
import { Amplify } from "aws-amplify";
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from '../amplify_outputs.json';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { config } from "aws-sdk";
const amplifyConfig = parseAmplifyConfig(outputs);

// predictionsConfig.interpret.interpretText.region = "eu-central-1";  // Correctly set the region for Predictions service


  Amplify.configure({
    ...amplifyConfig,
    Predictions: 
    {
      "interpret": {
        "interpretText": {
          "defaults": {
            "type": "ALL"
          },
          "proxy": false,
          "region": "eu-central-1"
        }
      }
    }
    
  });




bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
