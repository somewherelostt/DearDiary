import { defineType, defineField } from "sanity";

export default defineType({
  name: "moodPrompt",
  title: "Mood Prompt",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Prompt Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mood",
      title: "Target Mood",
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
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Reflection", value: "reflection" },
          { title: "Gratitude", value: "gratitude" },
          { title: "Growth", value: "growth" },
          { title: "Creativity", value: "creativity" },
          { title: "Goal Setting", value: "goal-setting" },
        ],
      },
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
