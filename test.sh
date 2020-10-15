echo "Sending CAPTIVATION unaligned with padding of 3, and a message"
cat example-stdinput.txt | docker run -i -a STDIN -a STDOUT seaniewaunie/captivation:1.0.2 

