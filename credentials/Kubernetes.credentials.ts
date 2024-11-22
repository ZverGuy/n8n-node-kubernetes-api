import {
    IAuthenticateGeneric, ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class Kubernetes implements ICredentialType {
    name = 'kubernetesApi';
    displayName = 'https://kubernetes.io/docs/home/';
    documentationUrl = 'https://www.chatwoot.com/docs/contributing-guide/chatwoot-apis';
    properties: INodeProperties[] = [
        {
            displayName: 'Kubernetes API URL',
            name: 'url',
            placeholder: "localhost:8001",
            type: 'string',
            default: '',
            required: true,
        },
        {
            displayName: 'Access Token',
            name: 'accessToken',
            type: 'string',
            placeholder: "Bearer eyJXXXXXXXXXXXXXXXXXXXXXXXXx",
            default: '',
            required: true,
            typeOptions: {password: true},
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
			headers: {
				Authorization: '={{$credentials.accessToken}}',
			},
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.url}}',
            url: '/api',
        },
    };
}