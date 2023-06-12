import { SchemaWrapper as RNA2DSchema } from 'Foreign/RNA2D/wrappers/schemas/SchemaWrapper';

export type Args = {
  /**
   * The URL to fetch the RNA 2D schema from.
   */
  url: string;
};

export async function fetchRNA2DSchema(args: Args) {
  let { url } = args;

  let response = await fetch(url);
  let blob = await response.blob();
  let text = await blob.text();

  return new RNA2DSchema(JSON.parse(text));
}
