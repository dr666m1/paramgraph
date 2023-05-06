const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const origins = require("@aws-cdk/aws-cloudfront-origins");
const route53 = require("aws-cdk-lib/aws-route53");

class Paramgraph extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "MyFirstBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS, // default seems BLOCK_ALL
    });

    new s3deploy.BucketDeployment(this, "DeployWebSite", {
      sources: [s3deploy.Source.asset("../web/app/out")],
      destinationBucket: bucket,
    });

    // NOTE you havet to add NS recort to dr666m1.net host zone
    new route53.PublicHostedZone(this, "HostZone", {
      zoneName: "p2g.dr666m1.net",
    });

    new cloudfront.Distribution(this, "MyDist", {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }
}

module.exports = { Paramgraph };
