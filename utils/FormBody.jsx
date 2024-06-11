import React from "react";
import { Col, Form } from "react-bootstrap";
import Select from "react-select";

let ProjectForm = ({ form, project, setProject }) => {
  // let option = form.option ? form?.option : [];
  // form["option"] = option;

  let content;
  if (form.type === "file") {
    content = (
      <Form.Group
        as={Col}
        className="mb-3"
        controlId={`exampleForm.ControlInput${form.id}`}
      >
        <Form.Label>{form.label}</Form.Label>
        <Form.Control
          type={form.type}
          required={form.required}
          onChange={(e) =>
            setProject({
              ...project,
              [form.onChangevalue]: e.target.files[0],
            })
          }
          placeholder={form.placeholder}
          autoFocus
        />
      </Form.Group>
    );
  } else if (form.type === "select") {
    content = (
      <Form.Group
        as={Col}
        className="mb-3"
        controlId={`exampleForm.ControlInput${form.id}`}
      >
        <Form.Label>{form.label}</Form.Label>
        <Select
          name="colors"
          defaultValue={form?.option.filter(
            (item) => item.value == project[form.onChangevalue]
          )}
          onChange={(e) =>
            setProject({ ...project, [form.onChangevalue]: e.value })
          }
          placeholder={form.placeholder}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "black",
            }),
          }}
          required={form.required}
          options={form.option}
          className="basic-multi-select"
          classNamePrefix="AssignedTo"
        />
      </Form.Group>
    );
  } else if (form.type === "textarea") {
    content = (
      <Form.Group
        className="mb-3"
        as={Col}
        controlId={`exampleForm.ControlTextarea${form.id}`}
      >
        <Form.Label>{form.label}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={project[form.onChangevalue]}
          onChange={(e) =>
            setProject({
              ...project,
              [form.onChangevalue]: e.target.value,
            })
          }
        />
      </Form.Group>
    );
  } else if (form.type === "date") {
    content = (
      <Form.Group
        className="mb-3"
        as={Col}
        controlId={`exampleForm.ControlTextarea${form.id}`}
      >
        <Form.Label>{form.label}</Form.Label>
        <Form.Control 
         as="date"
        />
      </Form.Group>
    );
  } else {
    content = (
      <Form.Group
        as={Col}
        className="mb-3"
        controlId={`exampleForm.ControlInput${form.id}`}
      >
        <Form.Label>{form.label}</Form.Label>
        <Form.Control
          type={form.type}
          required={form.required}
          min={1}
          value={project[form.onChangevalue]}
          onChange={(e) =>
            setProject({
              ...project,
              [form.onChangevalue]: e.target.value,
            })
          }
          placeholder={form.placeholder}
          autoFocus
        />
      </Form.Group>
    );
  }

  return content;
};

ProjectForm = React.memo(ProjectForm);
export default ProjectForm;
