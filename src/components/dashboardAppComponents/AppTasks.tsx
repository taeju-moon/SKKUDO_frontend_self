import PropTypes from "prop-types";
import { useState } from "react";
// form
import { useForm, Controller } from "react-hook-form";
// @mui
import {
  Card,
  Stack,
  Divider,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from "@mui/material";
import Iconify from "../Iconify";
import MenuPopover from "../dashboardComponents/MenuPopover";
// components
// import Iconify from '../../../components/Iconify';
// import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

// AppTasks.propTypes = {
//   title: PropTypes.string,
//   subheader: PropTypes.string,
//   list: PropTypes.array.isRequired,
// };

interface TaskType {
  id: string;
  label: string;
}

interface AppTasksType {
  title: string;
  subheader?: string;
  list: TaskType[];
  [x: string]: any;
}
export default function AppTasks({
  title,
  subheader,
  list,
  ...other
}: AppTasksType) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ["2"],
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task: string) =>
            field.value.includes(task)
              ? field.value.filter((value) => value !== task)
              : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => field.onChange(onSelected(task.id))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};

interface TaskItemType {
  task: TaskType;
  checked: boolean;
  onChange(): void;
}
function TaskItem({ task, checked, onChange }: TaskItemType) {
  const [open, setOpen] = useState(false);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log("MARK COMPLETE", task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log("SHARE", task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log("EDIT", task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log("DELETE", task.id);
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: "text.disabled",
          textDecoration: "line-through",
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <MoreMenuButton
        open={open}
        onClose={handleCloseMenu}
        onOpen={handleOpenMenu}
        actions={
          <>
            <MenuItem onClick={handleMarkComplete}>
              <Iconify icon={"eva:checkmark-circle-2-fill"} />
              Mark Complete
            </MenuItem>

            <MenuItem onClick={handleEdit}>
              <Iconify icon={"eva:edit-fill"} />
              Edit
            </MenuItem>

            <MenuItem onClick={handleShare}>
              <Iconify icon={"eva:share-fill"} />
              Share
            </MenuItem>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              <Iconify icon={"eva:trash-2-outline"} />
              Delete
            </MenuItem>
          </>
        }
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  actions: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
};

interface MoreMenuButtonType {
  actions: React.ReactNode;
  open: boolean;
  onOpen(event: any): void;
  onClose(): void;
}
function MoreMenuButton({
  actions,
  open,
  onOpen,
  onClose,
}: MoreMenuButtonType) {
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={onOpen}
      >
        <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: "auto",
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
            "& svg": { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </>
  );
}
