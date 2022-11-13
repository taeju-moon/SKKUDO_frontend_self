import PropTypes from "prop-types";
import { useState } from "react";

import {
  Dialog,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";

interface ColumnModalType {
  addColumnModalOpen: boolean;
  setColumnModalOpen: (arg: boolean) => void;
}

interface ColumnType {
  key: string;
  valueType: "string" | "number" | "boolean";
}

export default function ColumnModal({
  addColumnModalOpen,
  setColumnModalOpen,
}: ColumnModalType) {
  const [columnForm, setColumnForm] = useState<ColumnType>({
    key: "",
    valueType: "string",
  });
  return (
    <Dialog
      open={addColumnModalOpen}
      onClose={() => setColumnModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ mx: "auto", width: 300, p: 3 }}>
        <FormControl>
          <TextField
            label="열이름"
            color="success"
            onChange={(e) => {
              setColumnForm({ ...columnForm, key: e.target.value });
            }}
          ></TextField>

          <Button color="success" onClick={() => setColumnModalOpen(false)}>
            CLOSE
          </Button>
        </FormControl>
      </Box>
    </Dialog>
  );
}
