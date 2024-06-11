NAME   := platformha/client
TAG    := $$(git log -1 --pretty=%h)
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest


build:
	docker build -t ${IMG} -f ./.deploy/docker/server.dockerfile . && \
	docker tag ${IMG} ${LATEST}
