/**
 * Google App Engine version IDs always seem to have this format.
 */
const versionIdRegExp = /^[0-9]{8}t[0-9]{6}$/;

export class VersionId {
  constructor(readonly value: string) {
    if (!value.match(versionIdRegExp)) {
      throw new Error(`Invalid version ID: ${value}.`);
    }
  }

  /**
   * Throws if the Date constructor throws.
   */
  toDate(): Date | never {
    let year = this.value.substring(0, 4);
    let month = this.value.substring(4, 6);
    let day = this.value.substring(6, 8);
    let hours = this.value.substring(9, 11);
    let minutes = this.value.substring(11, 13);
    let seconds = this.value.substring(13, 15);

    return new Date(
      `${year}-${month}-${day}`
      + `T${hours}:${minutes}:${seconds}`
    );
  }

  toURLString() {
    return (
      'https://'
      + this.value
      + '-dot-rna2drawer2.uk.r.appspot.com'
    );
  }
}
