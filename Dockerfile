FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV DOCKER_ENV=true
ENV CI=true

CMD ["npx", "playwright", "test"]
