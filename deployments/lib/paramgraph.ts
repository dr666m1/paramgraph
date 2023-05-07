import { Construct } from "constructs";

import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

class Paramgraph extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
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

    const subDomain = "p2g.dr666m1.net";
    // NOTE add NS record to dr666m1.net host zone manually
    const myHostedZone = new route53.PublicHostedZone(this, "HostZone", {
      zoneName: subDomain,
    });

    const myCertificate = new acm.Certificate(this, "Certificate", {
      domainName: subDomain,
      // CNAME record is created automatically
      validation: acm.CertificateValidation.fromDns(myHostedZone),
    });

    const distribution = new cloudfront.Distribution(this, "MyDist", {
      defaultBehavior: {
        // @ts-ignore
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [subDomain],
      certificate: myCertificate,
    });

    new route53.ARecord(this, "AliasRecord", {
      zone: myHostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });
  }
}

module.exports = { Paramgraph };
