APP_VERSION ?= v0.1.0
IMAGE_REGISTRY ?= quay.io/opstree
IMAGE_NAME ?= salary-api

# Build salary api
build:
	mvn clean package

# Run checkstyle against code
fmt:
	mvn checkstyle:checkstyle

# Run jacoco test cases for coverage
test:
	mvn test

docker-build:
	docker build -t ${IMAGE_REGISTRY}/${IMAGE_NAME}:${APP_VERSION} -f Dockerfile .

docker-push:
	docker push ${IMAGE_REGISTRY}/${IMAGE_NAME}:${APP_VERSION}

run-migrations:
	migrate -path migration -database "cassandra://10.0.1.25:9042/employee?username=scylla&password=12345" up

