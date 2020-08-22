# Project Info
Needed installed programs : MongoDB(DataBase Name : OMM; Collection Name : monuments) , some node packages
Monument Schema:
{
    "name": String,
    "description": String,
    "address": String,
    "date": Date
    "monumentView": String,
    "registryNumber": int64
}
# Clone repository
git clone https://github.com/EgorOnufreychuk/omm_playground.git -b Egor - clone branch
# Start MongoDB server 
1. cd omm_playground/api
2. npm i express
3. npm install mongoose@4.10.8 --save
4. nodemon server 
# Start React project
1. cd omm_playground/client
2. npm i 
3. npm start 
>>>>>>> 23391f7a34aee52f08eeeb60b103f3165f8dd4d1
