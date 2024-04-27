## Local Deployment
These environment variables are required for local development and are defined in `.env.local` file.

- NODE_ENV=development
- NEXT_PUBLIC_API_KEY=<api key>
- NEXT_PUBLIC_AUTH_DOMAIN=<auth domain>
- NEXT_PUBLIC_PROJECT_ID=<project id>
- NEXT_PUBLIC_STORAGE_BUCKET=<storage bucket>
- NEXT_PUBLIC_MESSAGING_SENDER_ID=<messaging sender id>
- NEXT_PUBLIC_APP_ID=<app id>
- NEXT_PUBLIC_MEASUREMENT_ID=<measurement id>
- NEXT_PUBLIC_MOCKERY_BASEURL=<mockery base url>
  
## Production Deployment
These environment variables are required for production deployment.

- NODE_ENV=production
- NEXT_PUBLIC_API_KEY=<api key>
- NEXT_PUBLIC_AUTH_DOMAIN=<auth domain>
- NEXT_PUBLIC_PROJECT_ID=<project id>
- NEXT_PUBLIC_STORAGE_BUCKET=<storage bucket>
- NEXT_PUBLIC_MESSAGING_SENDER_ID=<messaging sender id>
- NEXT_PUBLIC_APP_ID=<app id>
- NEXT_PUBLIC_MEASUREMENT_ID=<measurement id>
- NEXT_PUBLIC_MOCKERY_BASEURL=<mockery base url>

### Docker
Use the following commands to build and run the docker image.

```bash
docker build -t davhar/mockeryweb:<version> .
docker run -p 3000:3000 davhar/mockeryweb:<version>
```
