import { z } from 'zod';

export const MarkdownSchema = z.string();
export type Markdown = z.infer<typeof MarkdownSchema>;

export const HtmlSchema = z.string();
export type Html = z.infer<typeof HtmlSchema>;
