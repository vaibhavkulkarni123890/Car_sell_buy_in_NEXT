import connectToDatabase from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { User, CarName, sellingPrice, url, description, model, rating, contactNo} = req.body;

 

  try {
    const db = await connectToDatabase();
    const createResult =  await db.collection("vehicle").insertOne({
               User,
               CarName,
               sellingPrice,
               url,
               description,
               model,
               rating,
               contactNo,
            });
            if (createResult.insertedId) {
      
                      res.status(200).json({message:"Created successfully",createResult})
                      
                    } else {
                     
                      throw new Error("Failed to create vehicle");
                    }    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

