import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Table,
  Group,
  Loader,
  Alert,
  Center,
  Anchor,
  Tooltip,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import Service from "../utils/http";

// Initialize service once
const service = new Service();

function UrlHistory() {
  const [urls, setUrls] = useState([]); // store fetched URLs
  const [loading, setLoading] = useState(true); // show loader while fetching
  const [error, setError] = useState(null); // handle errors

  // Fetch data on component mount
  useEffect(() => {
    async function fetchUrls() {
      try {
        setLoading(true);
        const response = await service.get("user/my/urls?page=1&limit=10");
        setUrls(response.shortURLs || []); // store URLs
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch URLs");
      } finally {
        setLoading(false);
      }
    }

    fetchUrls();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Center mih={300}>
        <Loader size="xl" />
        <Text ml="md">Loading your short URLs...</Text>
      </Center>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        {error}
      </Alert>
    );
  }

  // No URLs found
  if (urls.length === 0) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="No URLs Found"
        color="blue"
        variant="light"
      >
        <Text>You haven’t created any short URLs yet.</Text>
      </Alert>
    );
  }

  // Table rows
  const rows = urls.map((url) => (
    <Table.Tr key={url._id}>
      <Table.Td>
        <Anchor
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Tooltip label={url.originalUrl} withArrow>
            <span>
              {url.originalUrl.length > 25
                ? `${url.originalUrl.slice(0, 25)}...`
                : url.originalUrl}
            </span>
          </Tooltip>
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor
          href={`${service.getBaseURL()}/api/s/${url.shortCode}`}
          target="_blank"
        >
          {url.shortCode}
        </Anchor>
      </Table.Td>
      <Table.Td>{url.clickCount}</Table.Td>
      <Table.Td>{new Date(url.createdAt).toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="lg" my="md">
      <Group justify="space-between" align="center" mb="md">
        <Title order={3}>My Short URLs</Title>
      </Group>

      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        c={"blue"}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Original URL</Table.Th>
            <Table.Th>Short Link</Table.Th>
            <Table.Th>Clicks</Table.Th>
            <Table.Th>Created On</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
}

export default UrlHistory;
