import {INodeType, INodeTypeDescription} from 'n8n-workflow';
import {N8NPropertiesBuilder, N8NPropertiesBuilderConfig} from '@devlikeapro/n8n-openapi-node';
import * as doc from './openapi.json'; // <=== Your OpenAPI v3 spec

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()


export class Kubernetes implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Kubernetes',
    name: 'kubernetes',
    icon: 'file:kubernetes.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Kubernetes API',
    defaults: {
      name: 'Kubernetes',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'kubernetesApi',
        required: false,
      },
    ],
    requestDefaults: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      baseURL: '={{$credentials.url}}',
    },
    properties: properties, // <==== HERE
  };
}