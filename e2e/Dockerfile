FROM mcr.microsoft.com/playwright:v1.47.2-noble

WORKDIR /e2e

COPY package*.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

CMD ["npx", "playwright", "test", "--config=playwright.config.ts"]