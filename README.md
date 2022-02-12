# Robinhood
<img src="https://www.teahub.io/photos/full/24-241191_robin-hood-wallpaper-hd.jpg" style="height:300px; width:auto;text-align:center"/>
 
 
## Motivation
 
- _I have a lame PC. You have a better PC. What's stopping me from SSH'ing into your machine?_
 
- _My company has 3 badass laptops. Employees have crappy machines. What's stopping them from SSH'ing into the company laptops?_
 
- But there's EC2 and GCE. But why pay when you have the resources?
 
 
Users with lame PCs shouldn't ever pay to provision a EC2 instance. Users with powerful PCs in a typical home setup (private network, behind a NAT) can reserve their resources to be used by any user in the world whether or not they themselves are in a private network.
 
We aim to employ WebRTC, released in 2011 as a part of HTML5 for streaming audio and video directly from browsers. We use this approach to simulate a SSH into private networks
 
 
### Reasons to use EC2
 
- run things in "dev" mode just to showcase to managers/stakeholders
 
- EC2 instances have better internet connectivity, SSDs etc.
 
- //TODO: add more here....
 
 
 
## Terminology
 
### Central Server (or Signaling Server)
 
- solely exists to establish the initial p2p connection between peers.
 
- also can be used to host the Admin UI and issue REST commands to peers,...from a central place
 
 
### Remote (or Donor's Machine)
 
- is the "powerful" PC that the owner wants to share to anyone needing it, with resource quotas ofcourse
 
- (mandatory) Needs to install the PKG
 
- (mandatory) Needs to run the PKG (instructions on admin UI or `pkg --help`)
 
 
### Local (or Donee's Machine)
 
- is the "lame" PC that the user uses to connect to the Remote
 
- (optional) Needs to install the PKG and run it in client mode (instructions on admin UI or `pkg --help`)
 
- User can use browser on his "lame" machine and launch a **webterminal** hosted by the Admin UI
 
 
### RH
 
- is the executable which can run in 3 modes (client, server, central)
 
<!-- - when run in "central" mode, it will also host a Admin UI with a webterminal (Not part of RH)-->
 
- when run in "server" mode, it spawns a daemon(pm2) and listens to connect requests, commands sent through the terminal on the other side, and REST API hits.
 
- when run in "client" mode, it connects to the peer directly and gives you a prompt. You can do whatever you want.
 
- Additional command line arguments to list who and all are donating and to list who and all are using MY resources ( should be able to use PKG without AdminUI at all)
 
- PKG can be downloaded
 
 
### Admin UI
 
- central place where users can login, and monitor who is using their resources, what commands they're running (full history) , resource utilization (graphs), and remotely start/stop their servers [ yes, I can use my mobile and open Admin UI to stop the server on my PC ]
 
- for consumers, it gives you a listing of live servers, their owner's name, and a "connect" button to launch a webterminal. Also give a "show command" to copy and paste the command on a terminal to connect to remote on your favorite terminal
 
- Has a "Downloads" section which gives you the PKG
 
---
## Command Line Spec `rh [command] [flags]`
### Commands
- `login` : command line google signin
- `scp` : command to transfer files and directory
- `run` : default command.
   - `rh run ` is equivalent to `rh`
 
When no flags are provided (defaults),
-  `rh` will run in server mode
- `rh` will have no resource constraints
- `rh` will have --max-users=3
- `rh` will default to ubuntu
- signaling server will default to `https://robinhood.setu.co`
- `rh` `--port` will default to 8080 , and if already taken, keeps incrementing by one
-
### Server Mode `rh --server` or just `rh`
#### `--max-users`
#### `--memory` in %
#### `--cpu` in %
#### `--os` 
#### `--port`
 
### Client Mode `rh --client`
 
## Implementation
 
 
### Dependencies
 
platform=nodejs
 
1. **pm2** //TODO: @dhruv to elaborate
 
2. **node-pty** //TODO: @dhruv to elaborate
 
3. **wrtc** - Gives you a WebRTC API on top of C++ bindings
 
4. **webrtc.io** - Barebones Mesh to create a signaling server
 
5. **sockets.io** - Abstraction on top of websockets to help us create the signaling server.
 
 
 
## Dhruv and Dhiraj
- RH piece (Dhiraj)
 - Define protocol to connect to CS
 - implement protocol (need apis)
 - Push metrics and status (need apis) only from host to CS
 -
 ## Sujan
- Design the CLI UI
- Write code also
 
## GB
- Central server
 - Define protocol
 - implement protocol
 - Registry(DB) of hosts available and their currently statuses
   - May be an anlytics (Sujan?)
 -
- Auth
 - Web Auth
   - google signin
 - ** CLI auth
   - google signin **
 - Introspection of token on client package with the CS
 
## User journey
----- DONEE -----
Client package runs
Gets list of hosts along with available mem and CPU and network speeds of the device
user picks a host
user connects to the host - with preferences like OS, memory and CPU
once connected, same shell, but any command he runs will be pushed to the Donor
the outputs are printed on the Donee machine
Donee kills the connection by a command
   - sends a kill signal to CS (custom command)
       - kill command directly to donor machine
 
---- DONOR ----
Server package runs
Connects to CS
Pushes status
   - like cpu, memory and disk available
   - gets internet speed and pushes
   - signal to say ready for connection
   - heartbeat?
Sees metrics of the host
List number of connections etc,.
Can stop by sending a signal to the CS and kill the process
 
DONOR - commands list
`rh login <email-id> <password>`
`rh --server --limits`
`rh kill`
`rh list`
`rh stop <email-id>`
`rh metrics <email-id>`
 
DONEE - commands list
`rh login <email-id> <password>`
`rh list`
`rh connect --arguments (files?) --copy ~/dev:/home/ubuntu `
   zip the file
   once connected I get a message
   can we figure out a way to `rh scp`? P3
 
`any command I want`
`exit`



### TODOs
- [x] log.error is massively fucked. one off cases which reach here will kill the process with some random untraceable error
- fix spinner (or atleast a message)
- [x] fix logger.error
- [x] gracefully exit on `exit`
- [x] docker
- copy files p2
- Only Donor and me(Donee) were supposed to be there. Exiting... (p2 bug)
- terminal extra line appears on enter
- read arrow marks and execute the same
- suggestion (p100)
- user testing 
- tab key messes up the terminal
- if you are donor both stun and turn should be enabled
- but a donee only stun
- Only one donor can support only one donee (p2)
- Handle when donor disconnects!!
  