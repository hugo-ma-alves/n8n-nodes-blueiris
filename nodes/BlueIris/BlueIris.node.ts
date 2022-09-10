import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { getCamList, getLogs, getStatus } from './BlueIrisApi';

export class BlueIris implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BlueIris',
		name: 'BlueIris',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:BlueIris.png',
		group: ['input'],
		version: 1,
		description: 'Node to consume BlueIris API',
		subtitle: '={{"Operation: " + $parameter["operation"]}}',
		defaults: {
			name: 'BlueIris',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'blueIrisApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'API URL',
				name: 'apiUrl',
				type: 'string',
				required: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-json
				description: 'The URL of the API. Typically something like this: https://yourdomain:81/json.',
				default: '',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'status',
				required: true,
				options: [
					{
						name: 'Status',
						value: 'status',
						action: 'Returns the system status',
						description: "Returns the system status",
					},
					{
						name: 'Cameras List',
						value: 'camlist',
						action: 'Returns the list of cameras',
						description: 'Returns a list of cameras on the system ordered by group. Cameras not belonging to any' +
							'group are shown beneath the \"all cameras\" group. Disabled cameras are placed at the end of' +
							'the list.',
					},
					{
						name: 'Logs',
						value: 'logs',
						description: "Returns the list of logs",
						action: 'Returns the list of logs',
					},
				],
			},
			{
				displayName: 'After',
				name: 'after',
				type: 'dateTime',
				default: null,
				displayOptions: {
					show: {
						operation: [
							'logs',
						],
					},
				},
				description: 'Returns logs after the specified date, if not specified returns everything',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];
		const items = this.getInputData();
		const length = items.length;

		for (let i = 0; i < length; i++) {
			try {
				const apiUrl = this.getNodeParameter('apiUrl', i) as string;
				const operation = this.getNodeParameter('operation', 0) as string;
				let responseData;
				if (operation === "status") {
					responseData = await getStatus.call(this, apiUrl);
				} else if (operation === "camlist") {
					responseData = await getCamList.call(this, apiUrl);
				} else if (operation === "logs") {
					const afterTime = this.getNodeParameter('after', i) as string;
					responseData = await getLogs.call(this, apiUrl, afterTime);
				}

				returnData.push(responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
				} else {
					throw new NodeOperationError(this.getNode(), error, {
						description: error.message,
						itemIndex: i,
					});

				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}

}
