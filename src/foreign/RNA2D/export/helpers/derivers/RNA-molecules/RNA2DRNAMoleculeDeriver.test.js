import { RNA2DRNAMoleculeDeriver } from './RNA2DRNAMoleculeDeriver';

function createStringDeriverMock() {
  return {
    derive: () => '',
  };
}

function createArrayDeriverMock() {
  return {
    derive: () => [],
  };
}

let nameDeriver = null;
let rna2DResiduesDeriver = null;
let rna2DBasePairsDeriver = null;
let rna2DLabelsDeriver = null;

let rna2DRNAMoleculeDeriver = null;

beforeEach(() => {
  nameDeriver = createStringDeriverMock();
  rna2DResiduesDeriver = createArrayDeriverMock();
  rna2DBasePairsDeriver = createArrayDeriverMock();
  rna2DLabelsDeriver = createArrayDeriverMock();

  rna2DRNAMoleculeDeriver = new RNA2DRNAMoleculeDeriver({
    nameDeriver,
    rna2DResiduesDeriver,
    rna2DBasePairsDeriver,
    rna2DLabelsDeriver,
  });
});

afterEach(() => {
  rna2DRNAMoleculeDeriver = null;

  nameDeriver = null;
  rna2DResiduesDeriver = null;
  rna2DBasePairsDeriver = null;
  rna2DLabelsDeriver = null;
});

describe('RNA2DRNAMoleculeDeriver class', () => {
  describe('derive method', () => {
    it('includes derived name', () => {
      nameDeriver.derive = () => 'Name - 9823urwfaksjd';

      expect(rna2DRNAMoleculeDeriver.derive().name).toBe('Name - 9823urwfaksjd');
    });

    it('includes derived RNA 2D residues', () => {
      rna2DResiduesDeriver.derive = () => [
        'Residue - 81948',
        'Residue - 56DSY',
        'Residue - JD8W9',
      ];

      expect(rna2DRNAMoleculeDeriver.derive().sequence).toStrictEqual([
        'Residue - 81948',
        'Residue - 56DSY',
        'Residue - JD8W9',
      ]);
    });

    it('includes derived RNA 2D base-pairs', () => {
      rna2DBasePairsDeriver.derive = () => [
        'Base-pair - c89su8foj',
        'Base-pair - JCS98TR2',
        'Base-pair - 8237yrywfu',
        'Base-pair - j89we',
      ];

      expect(rna2DRNAMoleculeDeriver.derive().basePairs).toStrictEqual([
        'Base-pair - c89su8foj',
        'Base-pair - JCS98TR2',
        'Base-pair - 8237yrywfu',
        'Base-pair - j89we',
      ]);
    });

    it('includes derived RNA 2D labels', () => {
      rna2DLabelsDeriver.derive = () => [
        'Label - 89r2',
        'Label - 5361',
        'Label - 832957',
      ];

      expect(rna2DRNAMoleculeDeriver.derive().labels).toStrictEqual([
        'Label - 89r2',
        'Label - 5361',
        'Label - 832957',
      ]);
    });
  });
});
