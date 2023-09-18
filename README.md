# Handy Dollar

<big>A financial planning tool aimed to help the user understand and categorize their spending in order to make more educated decisions about future budgeting.</big>

## Inspiration

Our main motivation for undertaking this project is from a common issue we’ve experienced in the business world: users usually cannot access in-depth information about a transaction on their banking apps. By enabling customers to upload and link physics receipts, we aim to promote financial responsibility and intelligent budgeting.

## What it does

HandyDollar provides users with a dashboard that organizes their recent transactions sourced through the Plaid API and gives a breakdown of important financial details such as average spending. The main functionality of HandyDollar is the ability to upload and link receipts to their corresponding transactions and using Computer Vision and GPT3.5, provide a breakdown of the receipt that can be viewed on the dashboard.

## How we built it

The intricate architecture of HandyDollar was meticulously crafted using NextJS, where the app router serves as the front end's backbone. TypeScript and TailwindCSS were harnessed to bring our front-end vision to life. On the backend front, we harnessed the power of NodeJS in conjunction with Supabase, leveraging its PostgreSQL tables, S3 Buckets, RESTful API, and user authentication capabilities. Additionally, we employed Azure AI Services to harness the potential of Image-to-Text AI, and GPT3.5 played a pivotal role in parsing the AI responses into meaningful JSON data. The integration of the Plaid API facilitated user connections to banking services, enabling us to fetch recent transaction data seamlessly.

Sponsor Technologies: Azure AI Services

## Challenges we ran into

Our project was not without its fair share of challenges. Early on, we had issues with rate limitations stemming from hot reloads. However, we overcame this hurdle by implementing a caching mechanism for Azure and GPT3.5 responses within our database. Additionally, we encountered issues with our prompt engineering, as it failed to yield consistent responses. A creative solution emerged as we transformed the prompts to return neatly formatted and meaningful JSON data, a transformation that proved remarkably successful in interpretation.

## Accomplishments that we're proud of

We are proud of the development of our Image-to-Text-to-JSON pipeline. This feat posed a significant technical challenge but ultimately stands as one of the cornerstones of our project, showcasing its innovative and practical value.

What we learned
Our journey with HandyDollar has imparted invaluable lessons in the seamless integration of server-side and client-side components. We've honed our expertise in utilizing API routes within NextJS's App router, and our understanding of database management has deepened considerably, with a focus on concepts like Row-Level Security (RLS) policies and Buckets.

## Built With

azure ai services |
gpt3.5 |
nextjs |
node.js |
plaid |
postgresql |
supabase |
tailwindcss |
typescript |
