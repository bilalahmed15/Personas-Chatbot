source .env
gcloud config set project ${PROJECT_ID}
docker build -t gcr.io/${PROJECT_ID}/${APP_NAME} .
docker push gcr.io/${PROJECT_ID}/${APP_NAME}
gcloud run deploy ${APP_NAME} --image gcr.io/${PROJECT_ID}/${APP_NAME}:latest --platform managed --region ${APP_REGION} --allow-unauthenticated --set-env-vars "OPENAI_API_KEY=${OPENAI_KEY}"
