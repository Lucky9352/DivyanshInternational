import { defineField, defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Our Gallery",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
      rows: 3,
      initialValue:
        "Explore our collection of images showcasing our journey, products, and community.",
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryImage",
          title: "Image",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Products", value: "products" },
                  { title: "Community", value: "community" },
                  { title: "Events", value: "events" },
                  { title: "Facility", value: "facility" },
                  { title: "Other", value: "other" },
                ],
              },
              initialValue: "other",
            }),
            defineField({
              name: "imageUrl",
              title: "Google Drive Image URL",
              type: "url",
              description:
                "Paste the full Google Drive Share URL here (e.g., https://drive.google.com/file/d/abcdef...)",
              validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
            }),
            defineField({
              name: "aspectRatio",
              title: "Aspect Ratio",
              type: "string",
              options: {
                list: [
                  { title: "Auto", value: "auto" },
                  { title: "Tall (Portrait)", value: "tall" },
                  { title: "Wide (Landscape)", value: "wide" },
                ],
              },
              initialValue: "auto",
              description: "Helps the masonry layout optimizer.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              category: "category",
              subtitle: "imageUrl",
            },
            prepare({ title, category, subtitle }) {
              return {
                title: title || "Untitled Image",
                subtitle: `${category ? category.toUpperCase() + " • " : ""}${subtitle ? "Has URL" : "No URL"}`,
                media: ImageIcon,
              };
            },
          },
        }),
      ],
    }),
  ],
});
