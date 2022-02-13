package main

import (
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"github.com/pion/turn/v2"
)

var host = "http://34.133.251.43" //TODO: ping icanhazip.com
var port = "8081"
var tcpPort = "8082"
var realm = "seturealm"
var username = "dhirajbhakta110@gmail.com"
var password = "kaizokuoniorewanaru"

//TODO: add support for more than one connection at a time

//users=user=pass
func main() {
	// Create a UDP listener to pass into pion/turn
	// pion/turn itself doesn't allocate any UDP sockets, but lets the user pass them in
	// this allows us to add logging, storage or modify inbound/outbound traffic
	udpListener, err := net.ListenPacket("udp4", "0.0.0.0:"+port)
	if err != nil {
		log.Fatal("Cannot create UDP listener")
	}
	tcpListener, err := net.Listen("tcp4", "0.0.0.0"+tcpPort)
	if err != nil {
		log.Fatal("Cannot create TCP listener")
	}

	// Cache -users flag for easy lookup later
	// If passwords are stored they should be saved to your DB hashed using turn.GenerateAuthKey
	authKey := turn.GenerateAuthKey(username, realm, password)

	s, err := turn.NewServer(turn.ServerConfig{
		Realm: realm,
		// called everytime a user tries to authenticate with the TURN server
		AuthHandler: func(_username string, _realm string, _srcAddr net.Addr) ([]byte, bool) {
			if username == _username {
				return authKey, true
			}
			return nil, false
		},
		// PacketConnConfigs is a list of UDP Listeners and the configuration around them
		PacketConnConfigs: []turn.PacketConnConfig{
			{
				PacketConn: udpListener,
				RelayAddressGenerator: &turn.RelayAddressGeneratorPortRange{
					RelayAddress: net.ParseIP(host),
					Address:      "0.0.0.0",
					MinPort:      9000,
					MaxPort:      9100,
				},
			},
		},
		ListenerConfigs: []turn.ListenerConfig{
			{
				Listener: tcpListener,
				RelayAddressGenerator: &turn.RelayAddressGeneratorPortRange{
					RelayAddress: net.ParseIP(host),
					Address:      "0.0.0.0",
					MinPort:      9200,
					MaxPort:      9300,
				},
			},
		},
	})
	if err != nil {
		log.Panic(err)
	}

	// Block until user sends SIGINT or SIGTERM
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	<-sigs

	if err = s.Close(); err != nil {
		log.Panic(err)
	}
}
