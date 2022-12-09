import "./App.css";
import Main from "./Main";
import { Grid, Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            This is a quizz created on Forefront hackathon, images are generated
            by AI <a href="https://openai.com/dall-e-2/">Dall-e</a>. <br />
            Try to guess one of{" "}
            <a href="https://www.biographyonline.net/people/famous-100.html">
              Top 100 Famous People
            </a>{" "}
            in a funny situation.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Main />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
