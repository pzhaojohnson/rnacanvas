import * as React from 'react';
import { useState } from 'react';
import { ErrorMessage } from 'Forms/ErrorMessage';
import type { App } from 'App';
import { ExampleSelect } from './ExampleSelect';
import { SequenceIdField } from './SequenceIdField';
import { SequenceField } from './SequenceField';
import { SequenceParsingDetails } from './SequenceParsingDetails';
import { DotBracketField } from './DotBracketField';
import { DotBracketParsingDetails } from './DotBracketParsingDetails';
import { SubmitButton } from 'Forms/buttons/SubmitButton';
import { parseInputs } from './parseInputs';

import * as View from 'Draw/view';

let examples = [
  {
    name: 'A Small Structure',
    sequenceId: 'A Small Structure',
    sequence: 'UAAGCGCAUAGACGAUGCAACCGCAUCGCCUAGCGCUUAGAUCGGCCAACAGCAUCGGUUGGCCAAUAGGCUGCACGCCAUCAUUUGCAUGGUGUGUAAAGCUU',
    dotBracket:'...((((.....((((((....))))))....)))).......(((((((.......))))))).......(((((((((.........)))))))))......',
  },
  {
    name: 'A Large Structure',
    sequenceId: 'A Large Structure',
    sequence: 'GCCGCUAUAACAAUACUAGAUGGAAUUUCACAGUAUUCACUGAGACUCAUUGAUGCUAUGAUGUUCACAUCUGAUUUGGCUACUAACAAUCUAGUUGUAAUGGCCUACAUUACAGGUGGUGUUGUUCAGUUGACUUCGCAGUGGCUAACUAACAUCUUUGGCACUGUUUAUGAAAAACUCAAACCCGUCCUUGAUUGGCUUGAAGAGAAGUUUAAGGAAGGUGUAGAGUUUCUUAGAGACGGUUGGGAAAUUGUUAAAUUUAUCUCAACCUGUGCUUGUGAAAUUGUCGGUGGACAAAUUGUCACCUGUGCAAAGGAAAUUAAGGAGAGUGUUCAGACAUUCUUUAAGCUUGUAAAUAAAUUUUUGGCUUUGUGUGCUGACUCUAUCAUUAUUGGUGGAGCUAAACUUAAAGCCUUGAAUUUAGGUGAAACAUUUGUCACGCACUCAAAGGGAUUGUACAGAAAGUGUGUUAAAUCCAGAGAAGAAACUGGCCUACUCAUGCCUCUAAAAGCCCCAAAAGAAAUUAUCUUCUUAGAGGGA',
    dotBracket: '((((((..........((((((((((.(((.(((((.((.((.....)).))))))).))).)))).))))))..(..(((...(((((((((.((((((((.....)))))))).))).)))))).)))..)......))))))..((..(((((...(((((.((((.(((.((((((..(((..(((((((...((((......))))))))))).)))...)))))).))).))))((((((((((((....))))..)))))))).)))))...))...)))..)).(((((((..(((((.................(((((((((....)))))))))...........(((((((..(((((((.((..((.((((((((....)))))))).)).)).)))))))..))))))))))))...))))))).....(((...(((..(....(((..(((((......((((........))))......))))).)))...)..)))..(((((......))))).)))...',
  },
  {
    name: 'Pseudoknots',
    sequenceId: 'Pseudoknots',
    sequence: 'UUUUAUAGAAACCAUCUCACUUGCUGGUUCCUAUAAAGAUUGGUCCUAUUCUGGACAAUCUACACAACUAGGUAUAGAAUCUGGUAAGAGAGGUGAUAAAAGUGUAUAUUACACUAGUAAUCCUACCACAUUCCACCUAGAUGGUGAAGUUAUCACCUUUGACAAUCUUAAGACACUUCUUUCUUUGAGAGAAGUGAGGACUAUUAAGGUGUUUAAAACAGUAGACAACAUUAACCUCCACACUGUUGUUGUGGACACCAUGUCAAUGACAUAUGGACAUGGUGUUGGUCCAACUUAUUUGGAUG',
    dotBracket: '...[[[[[...((((....((((.((((((]]]]].((((((((((......))))..((((.((......)).))))...{{{{{..(((((((((((.((((((...))))))........}}}}}.....((((.....))))...)))))))))))..)))))).....((((((((((...)))))))))).)))))).)))).((((((......)))))).((((.((.((((((.......))))))<<<<<.)).))))....))))...>>>>>...((((((.....)))))).',
  },
];

interface Props {
  app: App;
  close: () => void;
}

export function EnterDotBracketSection(props: Props): React.ReactElement {
  let [sequenceId, setSequenceId] = useState('');
  let [sequence, setSequence] = useState('');
  let [dotBracket, setDotBracket] = useState('');

  let [showingSequenceParsingDetails, showSequenceParsingDetails] = useState(false);
  let [ignoringNumbers, ignoreNumbers] = useState(true);
  let [ignoringNonAugctLetters, ignoreNonAugctLetters] = useState(false);
  let [ignoringNonAlphanumerics, ignoreNonAlphanumerics] = useState(true);

  let [showingDotBracketParsingDetails, showDotBracketParsingDetails] = useState(false);

  let [errorMessage, setErrorMessage] = useState('');
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  return (
    <div style={{ margin: '0px 144px', flexGrow: 1, display: 'flex', flexDirection: 'column' }} >
      <div style={{ marginTop: '24px' }} >
        <ExampleSelect
          examples={examples.map(e => e.name)}
          select={name => {
            let example = examples.find(e => e.name == name);
            if (example) {
              setSequenceId(example.sequenceId);
              setSequence(example.sequence);
              setDotBracket(example.dotBracket);
              setErrorMessage('');
            }
          }}
        />
      </div>
      <div style={{ marginTop: '21px' }} >
        <SequenceIdField
          initialValue={sequenceId}
          set={id => setSequenceId(id)}
        />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} >
        <div style={{ flexBasis: '0px', flexGrow: 1, display: 'flex', flexDirection: 'row' }} >
          <SequenceField
            initialValue={sequence}
            set={s => setSequence(s)}
            toggleParsingDetails={() => showSequenceParsingDetails(!showingSequenceParsingDetails)}
            showDescription={!showingSequenceParsingDetails}
            flexGrow={1}
          />
          {!showingSequenceParsingDetails ? null : (
            <SequenceParsingDetails
              ignoringNumbers={ignoringNumbers}
              ignoreNumbers={b => ignoreNumbers(b)}
              ignoringNonAugctLetters={ignoringNonAugctLetters}
              ignoreNonAugctLetters={b => ignoreNonAugctLetters(b)}
              ignoringNonAlphanumerics={ignoringNonAlphanumerics}
              ignoreNonAlphanumerics={b => ignoreNonAlphanumerics(b)}
            />
          )}
        </div>
        <div style={{ flexBasis: '0px', flexGrow: 1, display: 'flex', flexDirection: 'row' }} >
          <DotBracketField
            initialValue={dotBracket}
            set={s => setDotBracket(s)}
            toggleParsingDetails={() => showDotBracketParsingDetails(!showingDotBracketParsingDetails)}
            showDescription={!showingDotBracketParsingDetails}
            flexGrow={1}
          />
          {showingDotBracketParsingDetails ? <DotBracketParsingDetails /> : null}
        </div>
      </div>
      <div style={{ margin: '25px 0 24px 0', display: 'flex', alignItems: 'center' }} >
        <SubmitButton
          onClick={() => {
            let parsed = parseInputs({
              sequenceId: sequenceId,
              sequence: sequence,
              ignoreNumbers: ignoringNumbers,
              ignoreNonAugctLetters: ignoringNonAugctLetters,
              ignoreNonAlphanumerics: ignoringNonAlphanumerics,
              dotBracket: dotBracket,
            });
            if (typeof parsed == 'string') {
              setErrorMessage(parsed);
              setErrorMessageKey(errorMessageKey + 1);
            } else {
              props.app.strictDrawing.appendStructure({ ...parsed, characters: parsed.sequence });
              if (props.app.strictDrawing.drawing.secondaryBonds.length == 0) {
                props.app.strictDrawing.flatOutermostLoop();
                let strictDrawingInteraction = props.app.strictDrawingInteraction;
                strictDrawingInteraction.currentTool = strictDrawingInteraction.bindingTool;
                strictDrawingInteraction.bindingTool.showComplements = false;
              }
              props.close();
              // prevent coming back to this form or preceding forms
              props.app.formContainer.clearHistory();
              props.app.refresh();
              (new View.DrawingWrapper(props.app.drawing)).centerView();
            }
          }}
        >
          Submit
        </SubmitButton>
        {!errorMessage ? null : (
          <ErrorMessage key={errorMessageKey} style={{ marginLeft: '10px' }} >
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
}
