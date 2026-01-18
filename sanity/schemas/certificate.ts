import { defineType, defineField } from "sanity";

export default defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Certificate Name",
      description: "e.g., ISO 9001, FSSAI, HACCP",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label / Year",
      description: "e.g., 2015, Certified, Licensed",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Certificate Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
        },
      ],
    }),
    defineField({
      name: "imageUrl",
      title: "Google Drive Image URL",
      type: "url",
      description:
        "Paste the full Google Drive Share URL here (e.g., https://drive.google.com/file/d/abcdef...)",
      validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "label",
      media: "image",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
