AWS_ACCOUNT := $(shell aws sts get-caller-identity --query Account --output text)
AWS_REGION := $(shell aws configure get region)

.PHONY: init
init:
	cdk bootstrap aws://$(AWS_ACCOUNT)/$(AWS_REGION)
