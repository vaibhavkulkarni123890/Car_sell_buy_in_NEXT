import connectToDatabase from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { contactNo } = req.body;

  try {
    const db = await connectToDatabase();
    const Find = db.collection("vehicle").find({ contactNo });
    const documents = await Find.toArray();

    if (documents.length > 0) {
      res.status(200).json({ message: "Found successfully", documents });
    } else {
      res.status(404).json({ message: "No documents found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
