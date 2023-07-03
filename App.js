const express= require('express')
const mongoose = require('mongoose');
const App= express();
const cors = require('cors');
const multer = require('multer');

const Product_routes= require("./routes/Product")

const Data = require('./models/Data')

const upload = multer({ dest: 'uploads/' });


// App.get('/', (req, res) => {
//   // Server logic goes here
//   res.send('Hello, World!');
// });

 //middleware
 App.use(express.json());
 App.use(cors());


 App.post('/upload', upload.single('image'), (req, res) => {
  console.log( '8888888888888888888888888888')
  if (!req.file) {
    console.log( 'No file uploaded')
    res.status(400).json({ message: 'No file uploaded' });
    
    return;
  }
  console.log( 'File uploaded successfully')
  const imagePath = req.file.path;
  console.log(req.file.path,'// Assuming Multer has saved the file locally') // Assuming Multer has saved the file locally


  res.json({ message: req.file.path });
 
});


 App.post('/editdata/:email',async(req,res)=>{
    try{
      // console.log(req.body.dataa,'12pppppppppppppppppppppppppppppppppppp3')
      console.log(req.params.email,'qqqqqqqqqqqqqqqqqqqq')
      const {emailId,name,description,image} = req.body.dataa
      console.log(req.body,'12pppppppppppppppppppppppppppppppppppp3')
      const data12= await Data.findOneAndUpdate(
        {"emailId":req.params.email},

      {$set:{
        "emailId":emailId,
        "name":name,
        "description":description,
      },
    }

    
      )
      
console.log(data12,'ooooooooooooooooo')
    }catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
 })

App.post('/deletedata',async(req,res)=>{
  try{
    // console.log(req.body.data)

    const {data} = req.body;

    // console.log(data)

    const data1 = await Data.deleteOne({ emailId: data })
    .then(result => {
      if (result.deletedCount === 1) {
        console.log('Document deleted successfully');
      } else {
        console.log('Document not found');
      }
    })
    .catch(error => {
      console.error('Error deleting document:', error);
    });

  }catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
})

App.post('/postdata', async (req, res) => {

  try {
  const { emailId, name, description, image } = req.body.data;
  const newData = new Data({
    emailId: emailId,
      name: name,
      description: description,
      // image: image,
   });
  const savedData = await newData.save();

  // console.log('Data saved:', savedData)

  }catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
App.get('/getdata', async (req, res) => {

  try {
  
  const savedData = await Data.find();
  res.status(200).json({ data: savedData })
  // console.log('Data got:', savedData)

  }catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


const cconnect=async()=>{
await mongoose.connect('mongodb+srv://123:123@cluster0.axiqotn.mongodb.net/?retryWrites=true&w=majority').then(()=>{
  console.log('mongodb connected')
}).catch((err)=>{
  console.log(err)
})
}

cconnect();



const port = 5005;
App.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


