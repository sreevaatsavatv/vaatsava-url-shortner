import React, { useState } from "react";
import UrlForm from "./UrlForm";
import UrlResponse from "./UrlResponse";
import { Container } from "@mantine/core";

export default function UrlShortner() {
  const [response, setResponse] = useState(null);
  return (
    <div>
      <Container size="md" my={40}>
        {response ? (
          <UrlResponse setResponse={setResponse} response={response} />
        ) : (
          <UrlForm setResponse={setResponse} />
        )}
      </Container>
    </div>
  );
}
