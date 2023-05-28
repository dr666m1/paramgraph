import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Paramgraph } from "../lib/paramgraph";
import * as fs from "fs";

beforeAll(() => {
  const dir = "../web/app/out";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

test("first test", () => {
  const app = new cdk.App();
  const stack = new Paramgraph(app, "teststack");
  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::S3::Bucket", 1);
});
