import { defineField, defineType } from "sanity";

export const sector = defineType({
  name: "sector",
  title: "Sector",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand Key",
      type: "string",
      initialValue: "eduba",
      validation: (Rule) => Rule.required(),
      description: "Tenant/brand identifier, for example: eduba, pilot",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageIndex",
      title: "Page Index",
      type: "string",
    }),
    defineField({
      name: "pageTag",
      title: "Page Tag",
      type: "string",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
        defineField({
          name: "exploreLabel",
          title: "Explore Label",
          type: "string",
        }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "consulting",
      title: "Consulting",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "consultingCard",
              fields: [
                defineField({ name: "id", title: "Id", type: "string" }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({ name: "body", title: "Body", type: "text" }),
              ],
            },
          ],
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "whyUs",
      title: "Why Us",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "whyUsItem",
              fields: [
                defineField({ name: "id", title: "Id", type: "string" }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                }),
              ],
            },
          ],
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text" }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "serviceCard",
              fields: [
                defineField({ name: "id", title: "Id", type: "string" }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "price",
                  title: "Price",
                  type: "string",
                }),
                defineField({ name: "body", title: "Body", type: "text" }),
              ],
            },
          ],
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "methodology",
      title: "Methodology",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              name: "methodologyStep",
              fields: [
                defineField({ name: "id", title: "Id", type: "string" }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                }),
              ],
            },
          ],
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "engagement",
      title: "Engagement",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text" }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "engagementCard",
              fields: [
                defineField({ name: "id", title: "Id", type: "string" }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({ name: "body", title: "Body", type: "text" }),
              ],
            },
          ],
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "faqItem",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "text",
                }),
              ],
            },
          ],
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "buttonLabel",
          title: "Button Label",
          type: "string",
        }),
        defineField({
          name: "buttonHref",
          title: "Button Href",
          type: "string",
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageTag",
    },
  },
});
