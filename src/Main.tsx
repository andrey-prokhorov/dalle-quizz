import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { people } from "./people";
import { places } from "./places";
import { verbs } from "./verbs";
import { ButtonGroup, CardMedia } from "@mui/material";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const shuffle = (array: string[]) =>
  array.sort(() => {
    const randomTrueOrFalse = Math.random() > 0.5;
    return randomTrueOrFalse ? 1 : -1;
  });

const onSuccess = () => {
  alert("CORRECT!");
};

const onFail = () => {
  alert("WRONG!");
};

const Main = () => {
  const [apiKey, setApiKey] = useState("");
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const generateQuestion = (): string => {
    const randomPerson = people[getRandomInt(people.length)];
    const randomPlace = places[getRandomInt(places.length)];
    const randomVerb = verbs[getRandomInt(verbs.length)];

    const searchText = `${randomPerson} ${randomVerb} in ${randomPlace}`;
    const questionText = `Who is ${randomVerb}  in ${randomPlace}?`;
    const answersArray = [
      randomPerson,
      people[getRandomInt(people.length)],
      people[getRandomInt(people.length)],
      people[getRandomInt(people.length)],
    ];

    setUrl("");
    setSearch(searchText);
    setAnswers(answersArray);
    setQuestion(questionText);
    setCorrectAnswer(randomPerson);

    return searchText;
  };

  const checkForApiKey = () => {
    if (!apiKey) {
      const key = prompt("Please provide an api key for Dall-e API:");
      setApiKey(key || "");
    }
  };

  const loadNewQuestion = () => {
    checkForApiKey();
    const prompt = generateQuestion();

    const body = {
      prompt,
      n: 1,
      size: "512x512", //allowed sizes: ['256x256', '512x512', '1024x1024']
    };

    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        const url = response.data[0].url;
        setUrl(url);

        console.log("Success:", response);
        console.log({ url });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message);
      });
  };

  shuffle(answers);

  console.log("url:", url);

  return (
    <Card sx={{ maxWidth: 600 }}>
      {url && (
        <CardMedia component="img" height="512" image={url} alt={question} />
      )}
      {!url && search && <p>Image is loading</p>}

      <CardContent>
        <Typography variant="h3" gutterBottom>
          {question}
        </Typography>

        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={answers[0] === correctAnswer ? onSuccess : onFail}>
            {answers[0]}
          </Button>
          <Button onClick={answers[1] === correctAnswer ? onSuccess : onFail}>
            {answers[1]}
          </Button>
          <Button onClick={answers[2] === correctAnswer ? onSuccess : onFail}>
            {answers[2]}
          </Button>
          <Button onClick={answers[3] === correctAnswer ? onSuccess : onFail}>
            {answers[3]}
          </Button>
        </ButtonGroup>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={loadNewQuestion}>
          New question
        </Button>
      </CardActions>
    </Card>
  );
};

export default Main;
