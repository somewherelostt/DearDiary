import { defineType, defineField } from "sanity";

export default defineType({
  name: "journalEntry",
  title: "Journal Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mood",
      title: "Mood Data",
      type: "object",
      fields: [
        {
          name: "score",
          title: "Sentiment Score",
          type: "number",
          validation: (Rule) => Rule.required().min(-1).max(1),
        },
        {
          name: "intensity",
          title: "Intensity",
          type: "number",
          validation: (Rule) => Rule.required().min(0).max(1),
        },
        {
          name: "label",
          title: "Mood Label",
          type: "string",
          options: {
            list: [
              { title: "😊 Joyful", value: "joyful" },
              { title: "😌 Calm", value: "calm" },
              { title: "😐 Neutral", value: "neutral" },
              { title: "😰 Anxious", value: "anxious" },
              { title: "😔 Sad", value: "sad" },
              { title: "😠 Angry", value: "angry" },
            ],
          },
        },
        {
          name: "color",
          title: "Color",
          type: "string",
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "encrypted",
      title: "Encrypted",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "wordCount",
      title: "Word Count",
      type: "number",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      mood: "mood.label",
      date: "createdAt",
    },
    prepare({ title, mood, date }) {
      return {
        title: title || "Untitled Entry",
        subtitle: `${mood || "No mood"} • ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
});
