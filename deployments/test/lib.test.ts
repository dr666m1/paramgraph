import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Paramgraph } from "../lib/paramgraph";

test("first test", () => {
  const app = new cdk.App();
  const stack = new Paramgraph(app, "teststack");
  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::S3::Bucket", 1);
});
