import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://user1:12vaibhav34890@mycluster.9py9n05.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Car_Rent_Buy'; 
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(uri);
    if(client){
        console.log("connection successfull");

    }else{
        console.log("connection failed");
    }
    

    return client.db(dbName);
    
  } catch (e) {
    console.log("Error in connecting database");
    console.error(e);
    throw new Error('Failed to connect to MongoDB');
    
  }
}

export default connectToDatabase;