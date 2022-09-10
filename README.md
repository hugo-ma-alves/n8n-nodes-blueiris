# n8n-nodes-blueiris

This is an n8n community node. It lets you use BlueIris api in your n8n workflows.

This node allows you to invoke some endpoints from the [BlueIris](https://blueirissoftware.com/) cctv software API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Status

Returns overall status of the system

### Cameras list

Returns the list of all cameras configured in the system and their status.

### Logs

Returns the logs of the system. By default it returns all the logs, to better filter the results you can specify a from date.

## Credentials

To use the API you must first create a user account in BlueIris.
If you pretend to use the log operation you must give the user the Administrator privilege. 

![BlueIris user api](/docs/blueiris_user.png)

After creating the user on BlueIris you can create the credentials on n8n using the username password you just created on BlueIris.

## Compatibility

Tested on version 0.193.5

## Usage

_This is an optional section. Use it to help users with any difficult or confusing aspects of the node._

_By the time users are looking for community nodes, they probably already know n8n basics. But if you expect new users, you can link to the [Try it out](https://docs.n8n.io/try-it-out/) documentation to help them get started._

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
