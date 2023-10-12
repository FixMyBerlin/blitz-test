import { Form, FormProps } from "src/core/components/Form";
import { LabeledTextField } from "src/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "src/core/components/Form";

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  // const [{
  //   users: users
  // }] = usePaginatedQuery(getUsers, {
  //   orderBy: {
  //     id: "asc"
  //   }
  // });

  return (
    <Form<S> {...props}>
      <LabeledTextField
        name="name"
        label="Name"
        placeholder="Name"
        type="text"
      />
      {/* <LabeledTextField
        name="active"
        label="Active"
        placeholder="Active"
        type="text"
      /> */}
      <LabeledTextField name="foo" label="Foo" placeholder="Foo" type="text" />
      <LabeledTextField
        name="id"
        label="User Id"
        placeholder="User Id"
        // options={users}
      />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
