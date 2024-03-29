import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';

const { Client } = pg;

const app = express();
const PORT = 3001;

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "kalakriti",
  password: "keshavverma9013",
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors()); 

db.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(error => console.error('Error connecting to PostgreSQL database:', error));


app.get('/api/products', async (req,res) => {
    try {
     const query = 'SELECT * FROM products';
   const result = await db.query(query);
    res.json(result.rows);
  } catch(error) {
   console.error('error fetching product data', error);
   res.status(500).json({error : 'an error has occurred while fetching product data'});
 }
}); 

app.post('/api/cart', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { product_id, quantity, price } = req.body;

    const existingProduct = await db.query('SELECT * FROM cart WHERE product_id = $1', [product_id]);

    if (existingProduct.rows.length > 0) {

      const updatedQuantity = existingProduct.rows[0].quantity + quantity;
      await db.query('UPDATE cart SET quantity = $1 WHERE product_id = $2', [updatedQuantity, product_id]);
      res.status(200).json({ message: 'Cart data updated successfully' });
    } else {

      const query = 'INSERT INTO cart (product_id, quantity, price) VALUES ($1, $2, $3)';
      const values = [product_id, quantity, price];
      await db.query(query, values);
      res.status(201).json({ message: 'Cart data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving cart data:', error);
    res.status(500).json({ error: 'An rror occurred while saving cart data' });
  }
});


app.get('/api/cart', async (req,res) => {
  try {
   const query = 'SELECT * FROM cart';
 const result = await db.query(query);
  res.json(result.rows);
} catch(error) {
 console.error('error fetching cart data', error);
 res.status(500).json({error : 'an error has occurred while fetching cart data'});
}
}); 

app.post('/api/cartdel', async (req,res) => {
  try {
    console.log('request body', req.body);
    const {product_id} = req.body;
    const query = 'DELETE FROM cart WHERE product_id =$1';
    const values = [product_id]
    await db.query(query, values);
    res.status(201).json({ message: 'cart del data saved successfully' });
  } catch (error) {
    console.error('Error saving cart del data:', error);
    res.status(500).json({ error: 'An error occurred while saving cart del data' });
  }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  