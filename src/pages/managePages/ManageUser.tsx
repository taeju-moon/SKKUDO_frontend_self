import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Stack, Button, Container, Typography } from "@mui/material";
import Iconify from "../../components/Iconify";
import ColumnModal from "../../components/user/ColumnModal/ColumnModal";
import UserTable from "../../components/user/UserTable";

export default function User() {
  const [addColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          User
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          color="success"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setColumnModalOpen(true)}
        >
          유저 열 추가
        </Button>
        <ColumnModal
          addColumnModalOpen={addColumnModalOpen}
          setColumnModalOpen={setColumnModalOpen}
        />
      </Stack>

      <Card>
        <UserTable isManage={true} />
      </Card>
    </Container>
  );
}
