FROM node:alpine
RUN yarn global add serve
WORKDIR /app
COPY build/ /app/build
ENV PORT 800
EXPOSE ${PORT}
# CMD ["printenv"]
CMD serve -p  $PORT -s build/