import app from "./app";
import dotenv from "dotenv";
import { loadPokemonData } from "./utils/dataloader";


dotenv.config();

const PORT = process.env.PORT || 3000;

loadPokemonData();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


