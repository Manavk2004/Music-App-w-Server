FROM node:20-alpine AS frontend
WORKDIR /app/frontend

COPY MusicApp/package*.json ./
RUN npm ci

COPY MusicApp/ ./
RUN npm run build

FROM node:20-alpine AS backend
WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

COPY server/ ./server/

COPY --from=frontend /app/frontend/dist ./dist

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "server/server.js"]