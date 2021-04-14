# FROM node:alpine
# RUN yarn global add serve
# WORKDIR /app
# COPY build/ /app/build
# ENV PORT 800
# EXPOSE ${PORT}
# # CMD ["printenv"]
# CMD serve -p  $PORT -s build/s

# build environment
FROM node:alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
ARG REACT_APP_BACKEND_URI=https://disinfodex-backend-production-e2kyhghera-ue.a.run.app
ENV REACT_APP_BACKEND_URI https://disinfodex-backend-production-e2kyhghera-ue.a.run.app
RUN yarn build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
