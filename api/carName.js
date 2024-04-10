import connectToDatabase from '@/utils/mongodb';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  
  const {Car_name}=req.body;

  try {
    const db = await connectToDatabase();
    const Find  =  db.collection("vehicle").find({Car_name})
    const documents = await Find.toArray(); 
    
    if (documents) {
      res.status(200).json({ message: "Found successfully", documents });
                      
                    } else {
                     
                      throw new Error("Failed to find vehicle");
                    }    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
