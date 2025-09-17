import React, { use, useEffect, useState } from "react";

import Service from "../utils/http";
import { Center, Container, Text } from "@mantine/core";
import { Avatar } from "@mantine/core";
const obj = new Service();

export default function Profile() {
  const [user, setUser] = useState({});

  const getProfileData = async () => {
    try {
      let data = await obj.get("user/me");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  const [hovered, setHovered] = useState(false);
  return (
    <div>
      {
        <Center style={{ height: "60vh", width: "100%" }}>
          <Container
            size="responsive"
            style={{
              backgroundColor: hovered ? "#ffdeeb" : "white",
              borderRadius: "20px",
              padding: "20px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Center height="20vh" mt={50} mb={20}>
              <Avatar src={user?.avatar} alt="it's me" size={150} />
            </Center>
            <Center>
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{
                  from: "rgba(0, 0, 0, 1)",
                  to: "rgba(224, 110, 110, 1)",
                  deg: 90,
                }}
              >
                {user?.name}
              </Text>
            </Center>

            <Center>
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{
                  from: "rgba(0, 0, 0, 1)",
                  to: "rgba(224, 110, 110, 1)",
                  deg: 90,
                }}
              >
                Email: {user?.email}
              </Text>

              <br />
            </Center>
            <Center>
              <Text fw={700}>Id: {user?._id}</Text>
            </Center>

            <Center>
              <Text fw={700}>Created At: {user?.createdAt}</Text>
            </Center>
            <br />
            {/* </Center> */}
          </Container>
        </Center>
      }
    </div>
  );
}
