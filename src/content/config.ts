import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    price: z.number(),
    originalPrice: z.number().optional(),
    badge: z.string().optional(),
    rating: z.number().default(4.8),
    reviewsCount: z.number().default(120),
    image: z.string(),
    category: z.string(),
    description: z.string(),
    inStock: z.boolean().default(true),
    specs: z.array(z.string()).default([]),
  }),
});

export const collections = {
  products: productsCollection,
};
