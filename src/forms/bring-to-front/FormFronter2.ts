export type Config = {
  isNotNecessary: {
    /**
     * Returns true if the target form is already "at the front".
     */
    isTrue(): boolean;
  }

  bringToFront: {
    /**
     * Brings the target form "to the front".
     */
    do(): void;
  };
};

export class FormFronter2 {
  constructor(private config: Config) {}

  bringToFront() {
    if (!this.config.isNotNecessary.isTrue()) {
      this.config.bringToFront.do();
    }
  }
}
