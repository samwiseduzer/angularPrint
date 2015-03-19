# angularPrint
An Angular module that allows users to selectively print elements, as well as provides optimizations for printing. By default, printing margins are minimized.

<h2>Installation</h2>
<ul>
  <li>make sure bower is installed</li>
  <li>navigate to the root directory of your project and execute the command "bower install angular-print"</li>
</ul>

<h2>Using AngularPrint</h2>
<h4>printSection</h4>
<ul>
  <li>Directive type: Attribute</li>
  <li>Makes element visible for printing</li>
</ul>
<h4>printHide</h4>
<ul>
  <li>Directive type: Attribute</li>
  <li>Makes element invisible during printing, but it is replaced by blank space</li>
</ul>
<h4>printRemove</h4>
<ul>
  <li>Directive type: Attribute</li>
  <li>Makes element invisible during printing</li>
</ul>
<h4>printBtn</h4>
<ul>
  <li>Directive type: Attribute</li>
  <li>Adds onClick callback to element that will trigger printing</li>
</ul>
<h4>printLandscape</h4>
<ul>
  <li>Directive type: Attribute</li>
  <li>Will cause printing to be landscape instead of portrait</li>
</ul>
<h4>printTable</h4>
<ul>
  <li>Directive type: Attribute</li>
  <li>Optimizes table for printing. This includes keeping 'td' cell content from being cut-off by page breaks.</li>
  <li>Sub attributes:</li>
  <ul>
    <li><h5>printClone</h5></li>
    <ul>
      <li>Instead of optimizing the table, this attribute will create an optimized clone of the table. This may be desirable in conjunction with the addClass attribute, as it will cause these classes to be added to the clone only</li>
    </ul>
    <li><h5>addClass</h5></li>
    <ul>
      <li>Takes a string of space-separated classes to be applied to the table</li>
    </ul>
  <ul>
</ul>

