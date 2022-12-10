# RNAcanvas

A [web app](https://rnacanvas.app) for the interactive drawing of nucleic acid structures.
Bases are automatically arranged to convey stems and loops
and the layout of a drawing can be easily adjusted by dragging with the mouse.
Drawings can be highly customized,
including the fonts, colors and dimensions of elements
and the outlines and numbering of bases.
The entirety of the Leontis-Westhof notation
for depicting canonical and non-canonical base-pairs
is also supported.
Drawings are exported in SVG and PowerPoint (PPTX) formats
such that all elements of a drawing (e.g., bases and bonds)
are exported as individual SVG and PowerPoint objects,
allowing for further manipulation in a vector graphics editor such as Adobe Illustrator or PowerPoint.

This project was formally named RNA2Drawer.
The original [desktop-based version](https://github.com/pzhaojohnson/RNA2Drawer#rna2drawer) of RNA2Drawer,
was published in the journal <em>RNA Biology</em> in 2019.

&nbsp;&nbsp;&nbsp;&nbsp;<b>Article:</b> [https://doi.org/10.1080/15476286.2019.1659081](https://doi.org/10.1080/15476286.2019.1659081)

&nbsp;&nbsp;&nbsp;&nbsp;<b><em>If you use RNAcanvas to draw structures in a publication, a citation is greatly appreciated!</em></b>

If you have questions, find issues, or have feature requests, email [contact@rnacanvas.app](mailto:contact@rnacanvas.app) or open an issue thread here on GitHub.

<p align="center" >
  <img src="https://user-images.githubusercontent.com/28662629/201731219-cb2adb6b-b2a1-47ce-b2a1-f20f457026ba.svg" />
</p>

* [Creating a New Drawing](#creating-a-new-drawing)
* [Saving and Opening Drawings](#saving-and-opening-drawings)
* [Exporting Drawings](#exporting-drawings)
* [Tools](#tools)
  * [The Dragging Tool](#the-dragging-tool)
  * [The Pairing Tool](#the-pairing-tool)
  * [The Flattening Tool](#the-flattening-tool)
  * [The Flipping Tool](#the-flipping-tool)
  * [The Editing Tool](#the-editing-tool)
* [Removing Elements](#removing-elements)
* [Adding Tertiary Bonds in Place of Secondary Bonds](#adding-tertiary-bonds-in-place-of-secondary-bonds)
* [Precisely Rotating the Drawing](#precisely-rotating-the-drawing)
* [Coloring Bases According to Data](#coloring-bases-according-to-data)
* [Strung Elements and Non-Canonical Base-Pairs](#strung-elements-and-non-canonical-base-pairs)
* [GU Wobble Base-Pairs as Dots](#gu-wobble-base-pairs-as-dots)
* [GC Base-Pairs as Double Lines](#gc-base-pairs-as-double-lines)
* [Text Labels](#text-labels)
* [Base Markers](#base-markers)
* [Straightening Stacked Stems](#straightening-stacked-stems)
* [Line Drawings](#line-drawings)
* [Outlining Subsequences of Bases](#outlining-subsequences-of-bases)
* [Stick-and-Ball Drawings](#stick-and-ball-drawings)
* [Motif Finding](#motif-finding)
* [Frequently Asked Questions](#frequently-asked-questions)
* [Funding](#funding)

## Creating a New Drawing

The form to create a new drawing
can be accessed using the button on the welcome page
or via the `File`: `New` menu button.
Structures may be input in dot-bracket notation
(also sometimes called "Vienna" format)
or as CT "Connectivity Table" files.
Structure prediction programs
such as Mfold and RNAfold
produce CT files.

Example structures in dot-bracket notation
can be loaded
using the buttons towards the top of the form.
Options controlling how the sequence and structure are parsed
can be viewed and adjusted
using the `Details` toggles above the top-right corners
of the sequence and structure text boxes.

## Saving and Opening Drawings

Drawings can be saved using the `File`: `Save` menu button,
which will cause a file with `.rna2drawer2` extension to be downloaded.
This file with `.rna2drawer2` extension
contains a complete representation of the drawing.
By default, the downloaded file will appear in your downloads folder,
though this can be changed by changing the corresponding setting in your web browser.

To open a saved drawing,
go to the form to do so
by using the button on the welcome page
or via the `File`: `Open` menu button
and upload your saved drawing
(i.e., the file with `.rna2drawer2` extension).

<b><em>Opening a saved drawing from before the RNA2Drawer web app.</em></b>
Saved drawings from before the RNA2Drawer web app with `.rna2drawer` extension (missing the trailing "2") can also be opened,
though not all aspects of the drawing will be preserved.
A list of which aspects will be preserved
can be viewed by clicking on the `Details` toggle
in the form to open saved drawings.

## Exporting Drawings

Drawings can be exported in SVG and PPTX formats.
SVG stands for scalable vector graphics
and SVG files can be opened and edited
in vector graphics editors
such as Adobe Illustrator and Inkscape.
PPTX is the main file format of PowerPoint.

All elements of a drawing are exported as individual SVG and PPTX objects.
For instance, bases are exported as text boxes
and primary and secondary bonds are exported as line objects.
This facilitates further manipulation of the exported drawing
in vector graphics editors and PowerPoint.

The forms to export drawings
can be accessed via the `Export` dropdown menu.
It is also possible to scale an exported drawing
by specifying a scaling factor in these forms.
For example, a scaling factor of "1" would result in no scaling of the exported drawing,
while a scaling factor of "2" would result in an exported drawing
that is double the size of what it was in the app.

## Tools

The different tools of the app control how you interact with the drawing.
Information and options pertaining to the tools of the app
can be found towards the bottom-left corner of the app.

## The Dragging Tool

With the dragging tool,
stems and loops can be dragged
while maintaining the arrangement of bases
as stems and loops.

https://user-images.githubusercontent.com/28662629/201531795-127de019-8db7-4d0b-bc16-dbf751dbcd92.mov

Stems can also be dragged along flat loops
and flat loops themselves can be moved up and down and rotated.

https://user-images.githubusercontent.com/28662629/201533096-ced3dc40-f1c9-42a5-a68b-891cf5a0932a.mov

By default, unpaired bases are compressed
when a stem is dragged towards them.
This behavior can be turned off
by toggling the `Only Expand` option
towards the bottom-left corner of the app.

https://user-images.githubusercontent.com/28662629/201535121-5588b750-bc0e-4aa8-8ba8-a57be64f7f0e.mov

## The Pairing Tool

With the pairing tool,
bases can be paired and unpaired
by adding and removing secondary and tertiary bonds.

To select a subsequence of bases,
click on a base and drag the mouse over the other bases to select.
Clicking on another set of bases
will pair them with the selected set of bases.
In contrast, clicking on the selected set of bases
will unpair them.

By default, secondary bonds are added when possible.
<b>To add tertiary bonds in place of secondary bonds,
hold the</b> `Shift` <b>key when pairing bases.</b>

https://user-images.githubusercontent.com/28662629/201538339-7cd74caf-a9d5-4734-b120-78a269528517.mov

Subsequences complementary to the selected subsequence
can be highlighted
by toggling the `Show Complements` option
towards the bottom-left corner of the app.

Options controlling the highlighting of complements
can be adjusted in the `Complement Rules` form,
which can be accessed using the `Options` button next to the `Show Complements` toggle.

https://user-images.githubusercontent.com/28662629/201539278-d0f2b4f1-0ffe-4383-84dc-8ab2539a49f2.mov

## The Flattening Tool

With the flattening tool,
individual inner and outer loops
can be flattened and unflattened.

Notably, flattening a loop
changes how stems in the loop can be dragged.
Stems can be dragged along a flattened loop
or dragged vertically
to change the height of the flattened loop.

https://user-images.githubusercontent.com/28662629/201540420-efb4932e-3a4c-46c4-9988-71df24679b61.mov

## The Flipping Tool

With the flipping tool,
stems and loops can be flipped and unflipped.

https://user-images.githubusercontent.com/28662629/201541074-75268222-c02d-4622-8425-d9237c1cbc3f.mov

## The Editing Tool

With the editing tool,
different aspects of elements
(e.g., fonts, colors, dimensions)
can be edited.

Elements can be selected by clicking on them
or by dragging the blue selecting box over them.
Towards the bottom-left corner of the app
is also a toggle
that controls what type of elements are currently being selected and edited
(e.g., bases, secondary bonds, numberings).

When elements are selected,
a form will appear on the right side of the app
for editing the selected elements.

<b>Most elements can be removed
from the drawing
by pressing the</b> `Delete` <b>key
while having the elements selected.</b>
Primary bonds are one exception to this.
(There will always be one primary bond
between each consecutive pair of bases.)

To deselect elements,
click on any empty part of the drawing.

https://user-images.githubusercontent.com/28662629/204059340-c9e76f25-bb81-4186-a579-30185dab27e3.mov

## Removing Elements

<b>Most elements can be removed
using the editing tool
by pressing the</b> `Delete` <b>key
while having the elements selected.</b>

Primary bonds are one exception to this.
(There will always be one primary bond
between each consecutive pair of bases.)

https://user-images.githubusercontent.com/28662629/204057979-38a49dd8-f394-423d-a914-ff8c6bec035f.mov

## Adding Tertiary Bonds in Place of Secondary Bonds

By default, the pairing tool pairs bases with secondary bonds when possible.
Tertiary bonds can be added instead by holding the `Shift` key
when pairing bases.

https://user-images.githubusercontent.com/28662629/204090271-02ea5b17-f24a-486a-a055-35b77491f0c6.mov

## Precisely Rotating the Drawing

The drawing can be precisely rotated
using the `Rotation` field in the `Layout` form
accessible via the `Edit`: `Layout` menu button.

https://user-images.githubusercontent.com/28662629/204422892-a50906a8-34d9-4a3b-b912-c4232c2be876.mov

## Coloring Bases According to Data

The `Bases by Data` form
(accessed using the `Edit`: `Bases`: `By Data` menu button)
allows bases to be selected and edited
according to whether a base falls into a specified range of data.
This allows bases to be colored according to chemical probing data
such as SHAPE data.

In the video below,
the `Bases by Data` form
is used to color the bases of a hairpin
according to some example chemical probing data.

First the example chemical probing data is pasted into the data text box
and the start position of the data (position 4) is input.

Then bases with low reactivity (values between 0 and 0.2) are selected
and given black outlines and white text colors.

Then the `Bases by Data` form is returned to
so that bases with mild reactivity (values between 0.21 and 0.6)
can be selected and given green outlines and text colors.

Then the `Bases by Data` form is returned to again
so that bases with moderate reactivity (values between 0.61 and 0.8)
can be selected and given orange outlines and text colors.

And finally the `Bases by Data` form is returned to
so that bases with high reactivity (values between 0.81 and 1.2)
can be selected and given red outlines and text colors.

https://user-images.githubusercontent.com/28662629/204619525-cca12f8f-f582-4c2c-8331-b886badf0528.mov

## Strung Elements and Non-Canonical Base-Pairs

<p align="center" >
  <img width="640px" src="https://user-images.githubusercontent.com/28662629/204091063-8ef7b92f-e15c-4f8f-a1ad-bb833e145b51.svg" />
</p>

Elements such as squares, circles, triangles and text
can be "strung" on the lines of bonds.
This allows for non-canonical base-pairs to be depicted
using the [Leontis-Westhof notation](https://pubmed.ncbi.nlm.nih.gov/11345429/),
for instance.

https://user-images.githubusercontent.com/28662629/204038687-60fcca31-92a4-4080-9d0a-3b4cd611add4.mov

## GU Wobble Base-Pairs as Dots

<p align="center" >
  <img width="640px" src="https://user-images.githubusercontent.com/28662629/204091623-001ed7c7-b832-42d4-9d35-c3ec9b9b9a02.svg" />
</p>

GU wobble base-pairs can be depicted as dots
(solid or hollow)
by adding a circle strung element
and making the line of the bond invisible.

https://user-images.githubusercontent.com/28662629/204035049-c93df9ee-7dac-4d7d-9896-4d1ec2b56d68.mov

## GC Base-Pairs as Double Lines

<p align="center" >
  <img width="640px" src="https://user-images.githubusercontent.com/28662629/204092255-3bc0a556-5daf-4161-9b30-c060342379f6.svg" />
</p>

One way to depict GC base-pairs as double lines
is to add a white rectangle strung element to all GC bonds
that covers the middle portion of the line for all GC bonds.

https://user-images.githubusercontent.com/28662629/204040327-eb28ff0a-099c-4aee-832c-cda85425aba3.mov

## Text Labels

<p align="center" >
  <img width="750px" src="https://user-images.githubusercontent.com/28662629/204093848-80b5b7bf-5692-43ee-bc4c-9131b1b36b54.svg" />
</p>

Text labels can be added to structural features
(e.g., hairpins, loops)
by adding a text strung element
to a bond that is part of the structural feature.
Due to being strung elements,
the text labels will move along with the structural feature
with respect to both position and orientation
whenever the layout of the drawing is adjusted.

https://user-images.githubusercontent.com/28662629/204042730-f590a4e1-e7ee-412f-bfc4-81cae01c24e5.mov

## Base Markers

<p align="center" >
  <img width="760px" src="https://user-images.githubusercontent.com/28662629/204095674-cf095ca5-aef7-4d6f-a38e-0d10e787e2da.svg" />
</p>

Strung elements of bonds
(e.g., colored triangles and circles)
can be dragged next to bases
to mark them with extra information.
Due to being strung elements,
these base markers will maintain their orientation
(relative to the bond that they are strung on)
whenever the layout of the drawing is adjusted.

https://user-images.githubusercontent.com/28662629/204045785-fd8d30e2-0069-41d1-baf7-5cda1d77bb54.mov

## Straightening Stacked Stems

Flattening the loop between two stacked stems
is an easy way to "straighten" them.

https://user-images.githubusercontent.com/28662629/201556667-9f716740-cb64-4f27-8a3e-436d7ef9c7bc.mov

## Line Drawings

<p align="center" >
  <img width="500px" src="https://user-images.githubusercontent.com/28662629/201732186-55ba8ba2-d866-4ba6-b997-6fa35f31bc11.svg" />
</p>

The following attributes give this drawing the appearance of a line drawing:
* For all bases, font size of `9` and color of `#999999`.
* For all primary bonds, line width of `9`, line color of `#999999`, and base padding of `0`.
* For all bases, an outline with radius of `4`, line width of `1`, and line and fill colors of `#999999`.

https://user-images.githubusercontent.com/28662629/201725511-2798964e-cdd6-4da3-a109-7a4567e1b1e2.mov

<b>It is also possible to make only part of a drawing appear as a line drawing
while keeping the rest of the drawing the same.</b>

https://user-images.githubusercontent.com/28662629/201726046-e840d6c3-96c0-4d74-88a1-2821e1a97f28.mov

## Outlining Subsequences of Bases

<p align="center" >
  <img width="760px" src="https://user-images.githubusercontent.com/28662629/204055802-ec365bb8-dcea-45af-91fa-3ea51120c1ec.svg" />
</p>

Subsequences of bases can be outlined
with some creative styling
of primary bonds and strung elements
and the outlines of individual bases.

https://user-images.githubusercontent.com/28662629/204053764-1df8f527-be49-4abb-8e93-1965c41a2e20.mov

## Stick-and-Ball Drawings

<p align="center" >
  <img width="775px" src="https://user-images.githubusercontent.com/28662629/205152368-f7eb23bf-1084-4e5d-bfe1-6e735a2b295a.svg" />
</p>

One way to draw structural features (e.g., hairpins)
in a stick-and-ball manner
is shown in the video below.

First the base letters of the structure are made invisible
(by making them white).

Then secondary bonds are made much wider (line width of 16)
so that they overlap
and shorter (base padding of 12)
to give stems of the structure a "stick" appearance.

Circle strung elements are then added,
sized to match the loops of the structure,
and dragged over the loops of the structure.

The bottommost secondary bond of the structure
is also made slightly thinner (line width of 12)
and longer (base padding of 0)
and given round line caps
to better connect the stick-and-ball structure
with neighboring elements.

https://user-images.githubusercontent.com/28662629/205112089-e70ebca1-e142-4c40-9c15-74d708251118.mov

## Motif Finding

The `Find Motifs` form can be accessed
using the button towards the bottom-right corner of the app.
The `Find Motifs` form supports
partial mismatching,
[IUPAC single letter codes](https://www.bioinformatics.org/sms/iupac.html),
and [regular expressions](https://regexone.com/).

https://user-images.githubusercontent.com/28662629/204537132-4d628d7d-f8f0-47e3-95c3-b7e5b7db5e0a.mov

## Frequently Asked Questions

<em>How do I delete a tertiary bond?</em>
Using the editing tool,
select the tertiary bond
and press the `Delete` key.

<em>How can I rotate the drawing?</em>
A `Rotation` field is present in the `Layout` form.
This form can be accessed via the `Edit`: `Layout` menu button.
See section on
[precisely rotating the drawing](#precisely-rotating-the-drawing).

<em>How can I make colors transparent?</em>
Most color picker swatches
have a text box next to them
holding a percentage value.
This percentage value is the opacity of the color.
Opacity is the opposite of transparency
(i.e., 100% opacity equals 0% transparency and vice versa).
To make a color fully transparent,
one would set its opacity to 0%.

<em>How can I color bases according to SHAPE data
or other chemical probing data?</em>
See section on [coloring bases according to data](#coloring-bases-according-to-data).

<em>How can I change the characters of bases?</em>
Using the editing tool,
one would:
1\) set the editing tool to edit bases,
2\) select the bases that one would like to edit,
and 3\) enter the desired character into the `Character` field
of the `Bases` form that will have appeared on the right side of the app.

<em>How can I take a screenshot?</em>
The app itself is unable to take screenshots,
though most operating systems have built-in ways of taking screenshots
of the whole screen or just a portion of the screen,
such as the Snipping Tool on Windows.

<em>Is there an easy way to "straighten" stacked stems?</em>
Flattening the loop between two stacked stems
is an easy way to "straighten" them.
See section on [straightening stacked stems](#straightening-stacked-stems).

<em>How do I create a drawing that is an outline of a structure?</em>
See section on [line drawings](#line-drawings).

## Funding

This material is based upon work supported by the National Science Foundation Graduate Research Fellowship Program under Grant No. DGE 1840340.
