ARG NODE_IMAGE=node:12-alpine

FROM $NODE_IMAGE AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM $NODE_IMAGE AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLED 1


RUN yarn build
RUN yarn build:server


FROM $NODE_IMAGE AS runner

WORKDIR /app

COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY src/entrypoint.sh ./
COPY dist/index.js ./socket.js

EXPOSE 3000

CMD ["./entrypoint.sh"]