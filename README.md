# n8n BlueIris API client

![Build](https://github.com/hugo-ma-alves/n8n-nodes-blueiris/actions/workflows/build.yml/badge.svg)
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]

[npm-url]: https://npmjs.org/package/n8n-nodes-blueiris
[npm-version-image]: https://img.shields.io/npm/v/n8n-nodes-blueiris.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/n8n-nodes-blueiris.svg?style=flat
[npm-downloads-url]: https://npmcharts.com/compare/n8n-nodes-blueiris?minimal=true


[N8n](https://n8n.io/) node for [BlueIris](https://blueirissoftware.com/) cctv software API.

This node invokes the BlueIris API and returns the response as is. You can then use the returned information on your workflow. By connecting this node to a trigger that runs periodically you can easily monitor the health of your BlueIris system.

For example, you can use the status operation result to detect offline or inoperational cameras. With this information you can decide to send a message to a telegram channel to alert someone about the issue. 

At this moment not all the operations provided by BlueIris API are implemented. You can check the implemented operations on the [Operations](#operations) section.

# Index

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials) 
[Compatibility](#compatibility)  
[Usage](#usage)  

# Installation

No special requirement for this node.

Just follow the generic [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

**NpmJs url:** https://www.npmjs.com/package/n8n-nodes-blueiris

**NpmJs package name:** n8n-nodes-blueiris

![install](/docs/install.gif)


# Operations

This section describes which BlueIris API operations are available in this plugin. For now only the most relevant "read" operations are implemented. In the future more operations will be implemented. Please create an issue or submit PR if you are interested in a specific operation.

You can check the API details directly on BlueIris manual [here](https://blueirissoftware.com/BlueIris.PDF).

## Status

Returns overall status of the system.

The result of this operation is useful to create alerts about the system health, for example cpu and memory usage.

## Cameras list

Returns the list of all cameras configured in the system and their status.

The result of this operation is useful to create alerts about issues with individual cameras. For example, you can use the result of this operation to get the list of cameras that are offline or online but not recording.

## Logs

Returns the logs of the system. By default it returns all the logs, to better filter the results you can specify a from date.

# Credentials

To use the BlueIris API, you must first create a user account in BlueIris.
If you pretend to use the "log" operation you must give the user the Administrator privilege. 

![BlueIris user api](/docs/blueiris_user.png)

After creating the user on BlueIris you can create the credentials on n8n using the username password you just created on BlueIris.

# Compatibility

Tested on n8n version 0.193.5 and BlueIris v5

# Usage

After creating the credentials, you just have to add the node to your workspace. The node configuration is quite simple, just specify the credentials name and the operation you want to perform. 

The result of the execution is the raw JSON response from BlueIris. You can use this response to build some alerts based on camera status for example.

![BlueIris user api](/docs/instructions.gif)

