# RedirectWebProg
docker build -t redirect .
docker run -d -p 3000:3000 -v /path/to/RedirectWebProg/redirect-urls.json:/home/app/redirect-urls.json redirect
