# Robinhood
<img src="https://www.teahub.io/photos/full/24-241191_robin-hood-wallpaper-hd.jpg" style="height:300px; width:auto;text-align:center"/>
 
 
## Description
Imagine a world where you can donate and consume resources within a community without having to pay for expensive cloud vendors. Robinhood brings you the ability to share and consume computer resources. A donor who has excess resources can donate to a community and anyone in the community can consume these resources to perform resource heavy tasks that they couldn't have done earlier with their own systems.

Robihood allows the donor to configure how much of their resources they want to donate and Robinhood creates a virtual container on the system which can now be accessed by the community.

As a donor, I can view and control my resources and access to them via the admin UI. I can monitor usage and even control access to my resources.

As a consumer, I can assume control of the container and perform any action that I would perform on a AWS/GCP instance.

## Motivation
 
- _I have an underpowered PC. I need to temporarily use resources to run something._
- _I have a terrible internet connection. I need to upload/download or run an opertaion over the internet._
- _My OS is incompatible with a program, I need to quickly run he program without sideloading another OS on my system._
 
- _My company has 3 badass machines/servers. We have puny systems. How can I leverage them to do my job?_
 
- _I need a cost effective way to run a program without having to signup with a cloud vendor_
 
 
## Terminology
 
### Central Server (or Signaling Server)
 
- Solely exists to establish the initial p2p connection between peers.
 
- Also can be used to host the Admin UI and issue REST commands to peers.
 
 
### Remote (or Donor's Machine)
 
- Is the "powerful" PC that the owner wants to share to anyone needing it, with resource quotas of course.
 
### Consumer
- Anyone who needs the resources. Consumer can connect to multiple hosts as well. 

### Admin UI
 
  - A central place where users can login, and monitor who is using my resources, what commands they're running (full history), resource utilization (graphs), and remotely start/stop their servers [ yes, I can use my mobile and open Admin UI to stop the server on my PC. (Ooooh! Mind blown) ]
 
- For consumers, it gives you a listing of live servers, their owner's name, and a "connect" button to launch a webterminal. Also give a "show command" to copy and paste the command on a terminal to connect to remote on your favorite terminal

## Commands list

- `rh login <email-id>`
- `rh init` – to start sharing your resources (to donate)
- `rh kill` - to stop sharing your resources
- `rh list` - to list of all donor available
- `rh connect <donor-name>` - to connect to a donor (to consume)
- `any command` - once connected, you have control of the entire shell. So go nuts!
- `exit` – exit from shell. Doesn't kill the container. You can rejoin and resume from where you left off.

