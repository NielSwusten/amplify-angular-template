window.global = window;
import { Amplify } from "aws-amplify";
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from '../amplify_outputs.json';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { config } from "aws-sdk";
const amplifyConfig = parseAmplifyConfig(outputs);




bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
