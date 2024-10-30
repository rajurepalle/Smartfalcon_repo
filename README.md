***HEY SmartFalcon Team.***

**Here is the Walk Through documentation of the assgniment.**

**You can clone this repository to your VS CODE or you code use github CODESPACES to review this**

Then

**Navigate to Your Project Directory:** <br>
cd Smartfalcon_repo 

**Install Hyperledger Fabric: (by using below command)** <br>
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.5.0

**Go to Fabric Test Network Directory:**<br>
cd Smartfalcon_repo/test-network

Down the Existing Network: <br>
./network.sh down

**Start the Network Create a Channel b/w org1 peer1 & org2 peer1:** <br>
sudo ./network.sh up createChannel

**Deploy the Chaincode in peers: (Javascript)**: <br>
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript

**Set Environment Variables for the Peer:** <br>
export PATH=${PWD}/../bin:$PATH export FABRIC_CFG_PATH=$PWD/../config/ export CORE_PEER_TLS_ENABLED=true export CORE_PEER_LOCALMSPID="Org1MSP" export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp export CORE_PEER_ADDRESS=localhost:7051

**Chaincode Initiation:** <br>
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'


***Starting Gateway (Node.js application)*** <br>
cd asset-transfer-basic/application-gateway-javascript

**Install Required Dependencies:** <br>
npm i

**Start the Node.js Server:** <br>
npm start

**"The server should start at http://localhost:3000."**

Now we can access the API endpoints to invoke Smart Contracts deplyed in fabric channel!

***Now Go to postman *** <br>

GET http://localhost:3000/data


Response : (We get data in the ledger)

            {
                ID: 'DATA1',
                DEALERID: 'dealer1',
                MSISDN: '9999999999',
                MPIN: '1234',
                BALANCE: 3120,
                STATUS: 'active',
                TRANSAMOUNT: 1000,
                TRANSTYPE: 'PRIVATE',
                REMARKS: '',
            }