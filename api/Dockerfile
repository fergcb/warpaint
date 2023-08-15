FROM denoland/deno

EXPOSE 8080

WORKDIR /api

ADD . /api

RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
