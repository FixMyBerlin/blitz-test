import { z } from "zod";

export const CreateProjectSchema = z.object({
  userId: z.undefined(),
  name: z.string(),
  active: z.boolean(),
  foo: z.string(),
  id: z.string(),
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateProjectSchema = CreateProjectSchema.merge(
  z.object({
    id: z.number(),
    userId: z.undefined(),
  })
);

export const DeleteProjectSchema = z.object({
  id: z.number(),
});
