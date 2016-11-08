FROM node:6.4
ENV PORT 8080
EXPOSE ${PORT}
COPY . .
RUN npm install
RUN npm install lib
RUN node generate.js
CMD node index.js