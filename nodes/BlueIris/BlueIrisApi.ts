import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import { IHttpRequestOptions, INode, NodeOperationError } from 'n8n-workflow';
import { createHash } from 'crypto';

export async function getStatus(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, apiUrl: string) {
	const session = await initSession.call(this, apiUrl);
	const operationRequest = generateOperationRequest(apiUrl, session, "status", {});
	return await doRequest.call(this, apiUrl, operationRequest, session);
}

export async function getCamList(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, apiUrl: string) {
	const session = await initSession.call(this, apiUrl);
	const operationRequest = generateOperationRequest(apiUrl, session, "camlist", {});
	return await doRequest.call(this, apiUrl, operationRequest, session);
}

export async function getLogs(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, apiUrl: string, after: string) {
	const session = await initSession.call(this, apiUrl);
	let extraParams;
	if (after != null) {
		extraParams = {
			aftertime: Date.parse(after) / 1000,
		};
	} else {
		extraParams = {};
	}
	const operationRequest = generateOperationRequest(apiUrl, session, "log", extraParams);
	return await doRequest.call(this, apiUrl, operationRequest, session);
}

async function initSession(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, apiUrl: string): Promise<string> {
	const credentials = await this.getCredentials('blueIrisApi');
	if (!credentials) {
		throw new NodeOperationError(this.getNode(), 'Credentials are mandatory!');
	}

	const initSessionRequest = generateInitializeSessionRequest(apiUrl);
	let responseData = await this.helpers.httpRequest(initSessionRequest);

	const session = responseData.session as string;
	const authenticationRequest = `${credentials.username}:${session}:${credentials.password}`;
	const hashedAuthentication = createHash('md5').update(authenticationRequest).digest('hex');

	const loginRequest = generateLoginRequest(apiUrl, session, hashedAuthentication);
	responseData = await this.helpers.httpRequest(loginRequest);
	checkResponseErrors(this.getNode(), responseData);

	return session;
}

async function doRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, apiUrl: string, request: IHttpRequestOptions, session: string) {
	const responseData = await this.helpers.httpRequest(request);
	checkResponseErrors(this.getNode(), responseData);

	const logoutRequest = generateCloseSessionRequest(apiUrl, session);
	await this.helpers.httpRequest(logoutRequest);

	return responseData;
}

// tslint:disable-next-line: no-any
function checkResponseErrors(node: INode, responseData: any) {
	if (responseData.result !== 'success') {
		throw new NodeOperationError(node, `Received the following error from BlueIris API: ${responseData.data.reason}`);
	}
}

function generateInitializeSessionRequest(apiUrl: string) {
	const body = { cmd: 'login' };
	return {
		body,
		method: 'POST',
		url: apiUrl,
		json: true,
	} as IHttpRequestOptions;
}

function generateLoginRequest(apiUrl: string, session: string, hashedAuthentication: string) {
	const body = {
		cmd: 'login',
		session,
		response: hashedAuthentication,
	};
	return {
		body,
		method: 'POST',
		url: apiUrl,
		json: true,
	} as IHttpRequestOptions;
}

function generateOperationRequest(apiUrl: string, session: string, operation: string, extraParameters: {}) {
	const body = {
		cmd: operation,
		session,
		...extraParameters,
	};
	return {
		body,
		method: 'POST',
		url: apiUrl,
		json: true,
	} as IHttpRequestOptions;
}

function generateCloseSessionRequest(apiUrl: string, session: string) {
	const body = {
		cmd: 'logout',
		session,
	};
	return {
		body,
		method: 'POST',
		url: apiUrl,
		json: true,
	} as IHttpRequestOptions;
}
