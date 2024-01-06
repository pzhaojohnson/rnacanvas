import type { App } from 'App';

import { SchemaWrapper as RNA2DSchema } from 'Foreign/RNA2D/wrappers/schemas/SchemaWrapper';

/**
 * The task of opening an RNA 2D schema file in a target app given a (possibly nullish) list of files
 * input by the user.
 */
export class OpenAnRNA2DSchemaFile {
  constructor(
    private config: {
      targetApp: App,
      listOfFiles: FileList | null | undefined,
    }
  ) {}

  /**
   * If the provided list of files is not nullish
   * and the first file in the list contains a valid RNA 2D schema,
   * then this method will open the contained RNA 2D schema in the target app.
   *
   * Otherwise, this method will fail with an error message that can be shown to the user.
   */
  async do() {
    if (!this.config.listOfFiles) {
      throw new Error('No file uploaded.');
    }

    let file: File | null | undefined = this.config.listOfFiles[0];

    if (!file) {
      throw new Error('No file uploaded.');
    }

    let fileText = await file.text();

    if (fileText.length == 0) {
      throw new Error('File is empty.');
    } else if (fileText.trim().length == 0) {
      throw new Error('File is empty.');
    }

    let rna2DSchema: RNA2DSchema;

    try {
      rna2DSchema = new RNA2DSchema(JSON.parse(fileText));
    } catch {
      throw new Error('Invalid RNA 2D JSON schema.');
    }

    // can fail too
    try {
      await this.config.targetApp.openRNA2DSchema(rna2DSchema);
    } catch {
      throw new Error('Invalid RNA 2D JSON schema.');
    }
  }
}
