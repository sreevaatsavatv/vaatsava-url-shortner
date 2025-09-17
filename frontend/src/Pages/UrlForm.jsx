import { Button, Container, TextInput } from "@mantine/core";

import React, { useState } from "react";

import Service from "../utils/http";

const obj = new Service();

export default function UrlForm(props) {
  const generateShortUrl = async (data) => {
    try {
      let res = await obj.post("s", data);
      props.setResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setdata] = useState({
    originalUrl: "",
    expiresAt: "",
    title: "",
    customUrl: "",
  });

  //   obj.post("", data.originalUrl);
  //   props.set;
  return (
    <div>
      {
        <Container size="xs" my={40}>
          <h2 style={{ textAlign: "center" }}>URL Shortner Form</h2>
          <TextInput
            radius="md"
            mb={"md"}
            label="Original Url"
            withAsterisk
            description="Enter Your URL"
            placeholder="Enter Your URL"
            onChange={(e) => {
              setdata({ ...data, originalUrl: e.target.value });
            }}
          />
          <TextInput
            radius="md"
            mb={"md"}
            label="Custom Url(Optional)"
            description="Enter Custom URL"
            placeholder="Enter Your URL"
            onChange={(e) => {
              setdata({ ...data, customUrl: e.target.value });
            }}
          />
          <TextInput
            radius="md"
            mb={"md"}
            label="Title(Optional)"
            description="Enter Your Title"
            placeholder="Enter Your Title"
            onChange={(e) => {
              setdata({ ...data, title: e.target.value });
            }}
          />
          <TextInput
            type="date"
            radius="md"
            label="Expiry Date(Optional)"
            placeholder="Enter Your Title"
            onChange={(e) => {
              setdata({ ...data, expiresAt: e.target.value });
            }}
          />
          <Button
            disabled={data?.originalUrl?.length > 10 ? false : true}
            variant="outline"
            color="red"
            mt={"md"}
            onClick={() => {
              generateShortUrl(data);
            }}
          >
            Generate Shortend Url
          </Button>
        </Container>
      }
    </div>
  );
}
