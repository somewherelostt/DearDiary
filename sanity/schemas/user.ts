import { defineType, defineField } from "sanity";

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "url",
    }),
    defineField({
      name: "preferences",
      title: "Preferences",
      type: "object",
      fields: [
        {
          name: "theme",
          title: "Theme",
          type: "string",
          options: {
            list: [
              { title: "Light", value: "light" },
              { title: "Dark", value: "dark" },
              { title: "Auto", value: "auto" },
            ],
          },
          initialValue: "light",
        },
        {
          name: "colorPalette",
          title: "Color Palette",
          type: "string",
          options: {
            list: [
              { title: "Default", value: "default" },
              { title: "Colorblind Friendly", value: "colorblind" },
              { title: "Minimal", value: "minimal" },
            ],
          },
          initialValue: "default",
        },
        {
          name: "disableAnimations",
          title: "Disable Animations",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "defaultPrivacy",
          title: "Default Privacy",
          type: "boolean",
          description: "Make entries private by default",
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
