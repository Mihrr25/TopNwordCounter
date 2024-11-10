const express = require("express");;
const {arrayCreator} = require("./arrayCreator");
const cors=require("cors")

const app = express();
app.use(express.json());
app.use(cors());

const getTopFrequentWords = (words) => {
  const wordCounts = {};

  words.forEach((word) => {
    if (word) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });

  return Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
};

app.post("/", async (req, res) => {
  console.log("hello")
  const { url } = req.body;
  if (!url) {
    res.status(500).json({ error: "Failed to fetch or process the URL" });
  }

  try {
    words=await arrayCreator(url)
    const topWords = getTopFrequentWords(words);
    res.json({ topWords });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch or process the URL" });
  }

});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
