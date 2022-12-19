import { Container, Stack, Typography } from "@mui/material";
import NoteFilterSidebar from "../../components/notes/NoteFilterSidebar";
import NotesList from "../../components/notes/NotesList";
import NotesSort from "../../components/notes/NotesSort";
import NoteAddWidget from "../../components/notes/NoteAddWidget";
import { useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    cover: "",
    name: "first",
    status: "sale",
  },
  {
    id: 2,
    cover: "",
    name: "second",
    status: "new",
  },
];

function ManageNotes() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Notes
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <NoteFilterSidebar
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <NotesSort />
        </Stack>
      </Stack>

      <NotesList products={PRODUCTS} />
      <NoteAddWidget />
    </Container>
  );
}

export default ManageNotes;
