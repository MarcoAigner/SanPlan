FROM node:16.13.2-alpine
WORKDIR /usr/src/app
COPY Backend/API/package.json Backend/API/package-lock.json ./
RUN npm ci --prod && npm cache clean --force
COPY --chown=node:node Backend/API .
USER node
EXPOSE 80
ENV PORT 80
ENV NODE_ENV production
CMD ["npm", "start"]