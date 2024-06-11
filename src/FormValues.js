export const ProjectCreate = [
  {
    id: 1,
    label: "Project Name",
    type: "text",
    placeholder: "Enter ProjectName",
    required: true,
    onChangevalue: "name",
  },
  {
    id: 2,
    label: "Upload Image",
    type: "file",
    placeholder: "Upload image",
    required: false,
    onChangevalue: "image",
  },
];

export const RoleCreate = [
  {
    id: 1,
    label: "Role Name",
    type: "text",
    placeholder: "Enter RoleName",
    required: true,
    onChangevalue: "name",
  },
  {
    id: 2,
    label: "roleId",
    type: "text",
    placeholder: "Enter RoleId",
    required: true,
    onChangevalue: "roleId",
  },
];

export const UserCreate = (option) => {
  return [
    {
      id: 1,
      label: "Name",
      type: "text",
      placeholder: "username",
      required: true,
      onChangevalue: "name",
    },
    {
      id: 2,
      label: "Email address",
      type: "email",
      placeholder: "email",
      required: true,
      onChangevalue: "email",
    },
    {
      id: 3,
      label: "Password",
      type: "password",
      placeholder: "password",
      required: true,
      onChangevalue: "password",
    },
    {
      id: 4,
      label: "Select Role",
      type: "select",
      placeholder: "------------",
      required: true,
      option: option,
      onChangevalue: "role",
    },
    {
      id: 5,
      label: "User Profile",
      type: "file",
      required: false,
      onChangevalue: "image",
    },
  ];
};

export const createTask = (projects,users) => {
  return [
    {
      id: 1,
      label: "Story",
      type: "select",
      placeholder: "------------",
      required: true,
      option: projects,
      onChangevalue: "story",
    },
    {
      id: 2,
      label: "Task Name",
      type: "text",
      placeholder: "Enter a title of card",
      required: true,
      onChangevalue: "name",
    },
    {
      id: 3,
      label: "AssignedBy",
      type: "select",
      placeholder: "------------",
      required: false,
      option: users,
      onChangevalue: "assignedById",
    },
    {
      id: 4,
      label: "AssignedTo",
      type: "select",
      placeholder: "------------",
      required: false,
      option: users,
      onChangevalue: "assignedToId",
    },
    {
      id: 5,
      label: "ClosedBy",
      type: "select",
      placeholder: "------------",
      required: false,
      option: users,
      onChangevalue: "closedById",
    },
    {
      id: 6,
      label: "FinishedBy",
      type: "select",
      placeholder: "------------",
      required: false,
      option: users,
      onChangevalue: "finishedById",
    },
    {
      id: 7,
      label: "Estimated Time",
      type: "number",
      placeholder: "Estimated Time",
      required: true,
      onChangevalue: "estimatedTime",
    },
    {
      id: 8,
      label: "File",
      type: "file",
      required: false,
      onChangevalue: "image",
    },
    {
      id: 9,
      label: "Description",
      type: "textarea",
      placeholder: "",
      required: false,
      onChangevalue: "description",
    }
  ];
};
