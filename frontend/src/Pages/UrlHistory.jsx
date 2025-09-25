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
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import { IconAlertCircle, IconEdit, IconTrash } from "@tabler/icons-react";
import Service from "../utils/http";

// Initialize service once
const service = new Service();

function UrlHistory() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // modal state
  const [open, setOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);

  // Fetch URLs with pagination
  const fetchUrls = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await service.get(
        `user/my/urls?page=${currentPage}&limit=10`
      );
      console.log("Fetched URLs:", response);

      setUrls(response?.urls || []);
      setTotalPages(response.totalPages || 1);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  // Load URLs on mount + page change
  useEffect(() => {
    fetchUrls(page);
  }, [page]);

  // Edit selected URL
  const editSelectedUrl = async () => {
    if (!selectedUrl) return;

    try {
      const response = await service.patch(`s/${selectedUrl.shortCode}`, {
        originalUrl: selectedUrl.originalUrl,
        title: selectedUrl.title,
      });

      setUrls((prev) =>
        prev.map((url) =>
          url._id === selectedUrl._id ? { ...url, ...response.url } : url
        )
      );
      setOpen(false);
    } catch (err) {
      console.error("Failed to edit URL:", err);
    }
  };

  // Delete URL
  const deleteUrl = async (shortCode) => {
    try {
      await service.delete(`s/${shortCode}`);
      setUrls((prev) => prev.filter((url) => url.shortCode !== shortCode));
    } catch (err) {
      console.error("Failed to delete URL:", err);
    }
  };

  // Loading
  if (loading) {
    return (
      <Center mih={300}>
        <Loader size="xl" />
        <Text ml="md">Loading your short URLs...</Text>
      </Center>
    );
  }

  // Error
  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        {error}
      </Alert>
    );
  }

  // Empty state
  if (urls?.length === 0) {
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
          {url?.shortCode}
        </Anchor>
      </Table.Td>
      <Table.Td>{url.clickCount}</Table.Td>
      <Table.Td>{new Date(url.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Button
          variant="subtle"
          mx={10}
          onClick={() => {
            setSelectedUrl(url);
            setOpen(true);
          }}
        >
          <IconEdit />
        </Button>
        <Button
          variant="subtle"
          color="red"
          onClick={() => deleteUrl(url.shortCode)}
        >
          <IconTrash />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="lg" my="md">
      {/* Edit Modal */}
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Edit URL"
        centered
      >
        <TextInput
          label="Original URL"
          placeholder="Enter the original URL"
          value={selectedUrl ? selectedUrl.originalUrl : ""}
          onChange={(e) =>
            setSelectedUrl((prev) => ({ ...prev, originalUrl: e.target.value }))
          }
        />
        <TextInput
          label="Title"
          placeholder="Enter the title"
          value={selectedUrl ? selectedUrl.title : ""}
          onChange={(e) =>
            setSelectedUrl((prev) => ({ ...prev, title: e.target.value }))
          }
          mt="md"
        />
        <Button fullWidth mt="md" onClick={editSelectedUrl}>
          Save Changes
        </Button>
      </Modal>

      {/* Header */}
      <Group justify="space-between" align="center" mb="md">
        <Title order={3}>My Short URLs</Title>
      </Group>

      {/* Table */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Original URL</Table.Th>
            <Table.Th>Short Link</Table.Th>
            <Table.Th>Clicks</Table.Th>
            <Table.Th>Created On</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* Pagination */}
      <Group justify="center" mt="md">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <Text mx="md">
          Page {page} of {totalPages}
        </Text>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </Group>
    </Container>
  );
}

export default UrlHistory;
