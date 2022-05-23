FROM formapro/nginx-php-fpm:latest-all-exts

RUN apt-get update \
    && apt-get install -y git curl vim unzip

WORKDIR /app
RUN pwd
RUN ls -l
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony
RUN git config --global user.email "contact@juanmalora.dev" \ 
    && git config --global user.name "Juan Manuel Lora"

WORKDIR /app/rest-api

RUN symfony --no-interaction new .

COPY ./rest-api/composer.json ./
COPY ./rest-api/composer.lock ./
COPY ./rest-api/symfony.lock ./

RUN composer update