#!/bin/bash
exists=`tmux list-sessions| grep pingpongtest`
tmux new -d
tmux send-keys 'npm run dev:signaling' 'C-m'
tmux rename-window foo
tmux select-window -t 0
tmux split-window -h 'sleep 1 && npm run dev:donor'
tmux split-window -v 'sleep 3 && npm run dev:donee'
tmux attach-session