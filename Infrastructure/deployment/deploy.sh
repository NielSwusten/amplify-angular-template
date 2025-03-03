#!/bin/bash

# Define the S3 bucket and region
S3_BUCKET=amplify-d3sz5hpiuo0td1-ma-amplifydataamplifycodege-g9v2uj2nwigp
REGION=eu-central-1

# Create the Lambda zip files
cd lambdas/messages
zip -r ../../deployment/messages.zip .
cd ../..

cd lambdas/testdb
zip -r ../../deployment/testdb.zip .
cd ../..

# Upload the zip files to S3
aws s3 cp deployment/messages.zip s3://$S3_BUCKET/lambdas/messages.zip --region $REGION
aws s3 cp deployment/testdb.zip s3://$S3_BUCKET/lambdas/testdb.zip --region $REGION
