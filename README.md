# n8n BlueIris

![Build](https://github.com/hugo-ma-alves/n8n-nodes-blueiris/actions/workflows/build.yml/badge.svg)
![npm](https://img.shields.io/npm/v/n8n-nodes-blueiris)
![npm](https://img.shields.io/npm/dw/n8n-nodes-blueiris)

[N8n](https://n8n.io/) node for [BlueIris](https://blueirissoftware.com/) cctv software API.
At this moment not all the operations provded by BlueIris API are implemented. You can check the implemented operations on the [Operations](#operations) section.

https://www.npmjs.com/package/n8n-nodes-blueiris

# Index

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials) 
[Compatibility](#compatibility)  
[Usage](#usage)  

# Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.
NPM url: https://www.npmjs.com/package/n8n-nodes-blueiris

# Operations

## Status

Returns overall status of the system

## Cameras list

Returns the list of all cameras configured in the system and their status.

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

TODO
