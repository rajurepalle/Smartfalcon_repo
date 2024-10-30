***HEY SmartFalcon Team.***

**Here is the Walk Through documentation of the assgniment.**

**You can clone this repository to your VS CODE or you code use github CODESPACES to review this**

Then

**Navigate to Your Project Directory:**
cd Smartfalcon_repo 

**Install Hyperledger Fabric: (by using below command)**
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.5.0

**Go to Fabric Test Network Directory:**
cd fabric-samples/test-network

Down the Existing Network:
./network.sh down

**Start the Network Create a Channel b/w org1 peer1 & org2 peer1:**
sudo ./network.sh up createChannel

**Deploy the Chaincode in peers: (Javascript)**
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript