
deploy:
    @eval $$(aws ecr get-login --no-include-email)
	@sh -c "docker build -f ./Dockerfile -t ${ECR_REPO} . && docker push ${ECR_REPO}"
	@sh -c "aws --region ap-south-1 ecs update-service --cluster pedigree-prod --service pedigree-prod-pedigree-ui --force-new-deployment"
