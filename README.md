# Robinhood
<img src="https://www.teahub.io/photos/full/24-241191_robin-hood-wallpaper-hd.jpg" style="height:300px; width:auto;text-align:center"/>
 
 
## Motivation
 
- _I have an underpowered PC. I need to temporarily use resources to run something._
- _I have a terrible internet connection. I need to upload/download or run an opertaion over the internet._
- _My OS is incompatible with a program, I need to quickly run he program without sideloading another OS on my system._
 
- _My company has 3 badass machines/servers. We have puny systems. How can I leverage them to do my job?_
 
- _I need a cost effective way to run a program without having to signup with a cloud vendor_
 
 
 
 
 
## Terminology
 
### Central Server (or Signaling Server)
 
- solely exists to establish the initial p2p connection between peers.
 
- also can be used to host the Admin UI and issue REST commands to peers,...from a central place
 
 
### Remote (or Donor's Machine)
 
- is the "powerful" PC that the owner wants to share to anyone needing it, with resource quotas ofcourse
 
- (mandatory) Needs to install the PKG
 
- (mandatory) Needs to run the PKG (instructions on admin UI or `pkg --help`)
 
 ### Admin UI
 
- central place where users can login, and monitor who is using their resources, what commands they're running (full history) , resource utilization (graphs), and remotely start/stop their servers [ yes, I can use my mobile and open Admin UI to stop the server on my PC ]
 
- for consumers, it gives you a listing of live servers, their owner's name, and a "connect" button to launch a webterminal. Also give a "show command" to copy and paste the command on a terminal to connect to remote on your favorite terminal
 
- Has a "Downloads" section which gives you the PKG
## Commands list

`rh login <email-id>`
`rh init` – to start sharing your resources (to donate)
`rh kill` - to stop sharing your resources
`rh list` - to list of all donor available
`rh connect <donor-name>` - to connect to a donor (to consume)
`any command` - once connected, you have control of the entire shell. So go nuts!
`exit` – exit from shell. Doesn't kill the container. You can rejoin and resume from where you left off.

