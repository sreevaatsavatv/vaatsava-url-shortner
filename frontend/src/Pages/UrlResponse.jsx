import {
  Button,
  Container,
  CopyButton,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import Service from "../utils/http";
import { QRCodeSVG } from "qrcode.react";

const obj = new Service();

export default function UrlResponse(props) {
  const surl = obj.getBaseURL() + "/api/s/" + props?.response?.shortCode;
  console.log(surl, props);
  return (
    <div>
      {
        <Container size="xs" my={40} style={{ textAlign: "center" }}>
          <Container>
            <Button
              onClick={() => {
                props.setResponse(null);
              }}
            >
              {" "}
              Reset{" "}
            </Button>
          </Container>
          <Text
            mt={20}
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "grape", to: "grape", deg: 360 }}
          >
            Shortned URL:
          </Text>
          <Container mt={20}>
            <TextInput value={surl} size="md" radius="lg" />
          </Container>
          <br />
          <CopyButton mt="md" value={surl}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                {copied ? "Copied url" : "Copy url"}
              </Button>
            )}
          </CopyButton>
          <Container mt={40} style={{ textAlign: "center" }}>
            <QRCodeSVG
              imageSettings={{
                excavate: true,
                src: "https://mentorpick.com/static/images/mplogo.png",
                height: 100,
                width: 100,
              }}
              value={surl}
              size={400}
            >
              <Image src={"https://mentorpick.com/static/images/mplogo.png"} />
            </QRCodeSVG>
          </Container>
        </Container>
      }
    </div>
  );
}
