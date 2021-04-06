import {
  Cors,
  LambdaRestApi,
  RestApi,
} from '@aws-cdk/aws-apigateway';
import {
  Code, Function, IFunction, Runtime,
} from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { StackProps } from '@aws-cdk/core';
import { APP_NAME } from '../../constant/app';
import AppStage from '../../constant/app_stage';

export interface RootStackProps extends StackProps {
  stage: AppStage;
}

export default class RootStack extends cdk.Stack {
  public api : RestApi

  public apiHandler: IFunction

  public stage: AppStage;

  constructor(scope: cdk.Construct, id: string, props: RootStackProps) {
    super(scope, id, props);
    this.stage = props.stage;
    const resourceNames = {
      apiGateway: this.resName('APIGateway'),
      apiHandlerLambda: this.resName('LambdaHandler'),
    };

    this.apiHandler = new Function(this, resourceNames.apiHandlerLambda, {
      functionName: resourceNames.apiHandlerLambda,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.APIHandler',
      code: Code.fromAsset('./build/api_root_lambda'),
    });

    this.api = new LambdaRestApi(this, resourceNames.apiGateway, {
      handler: this.apiHandler,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
      proxy: true,
    });
  }

  private resName = (res: string) : string => `${APP_NAME}-${res}-${this.stage}`
}
