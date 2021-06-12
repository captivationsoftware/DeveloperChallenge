# Mark Colby Captivation Software Developer Challenge

## To Run Solution:

Build Docker Image for NodeJS:
- docker build . -t markcolby/captivation_challenge

Run Docker Container with STDIN piped in
- cat testData.txt | docker run -i markcolby/captivation_challenge


### File Structure
- index.js has is entry point for node.js
- utils.js has helper functions
- tests/generateTests was used to create example data for manual testing