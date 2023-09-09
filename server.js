const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://andrew:<>@sei.7fwbq.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB Atlas");
  }).catch((err) => {
    console.log("Error: ", err.message);
  }
);

const RestaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  reviewers: [
    {
      name: String,
      imageUrl: String,
      review: String
    }
  ]
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.get('/restaurants', (req, res) => {
  Restaurant.find().then((restaurants) => {
    res.json(restaurants);
  });
})

app.get('/seed', (req, res) => {
  Restaurant.deleteMany({}).then(() => {
    Restaurant.create(Restaurant.create([
      {
        name: "The Golden Apple",
        location: "123 Main St, New York, NY 10001",
        image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
        reviewers: [{ name: 'Cecilia Chavez', imageUrl: 'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Emily Selman', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Kristin Watson', imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Celeste Burton', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" }
        ]
      },
      {
        name: "Dumpling House",
        location: "123 Main St, New York, NY 10001",
        image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
        reviewers: [{ name: 'Cecilia Chavez', imageUrl: 'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Emily Selman', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Kristin Watson', imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Celeste Burton', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" }
        ]
      },
      {
        name: "The Salty Pig",
        location: "123 Main St, New York, NY 10001",
        image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
        reviewers: [{ name: 'Cecilia Chavez', imageUrl: 'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Emily Selman', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        { name: 'Kristin Watson', imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', review: "This place is great" },
        ]
      },
      {
        name: "The Noodle Shop",
        location: "123 Main St, New York, NY 10001",
        image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
        reviewers: []
      }
    ]))
  }).then(() => {
    res.send("Database seeded successfully");
  })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
