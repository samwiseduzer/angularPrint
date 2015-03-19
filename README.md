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
    <li>Makes element and its children visible for printing</li>
  </ul>
  ```html
  <div>
      <div print-section>
        I'll print
        <p>Me, too!</p>
      </div>
      <div>I won't</div>
  </div>
  ```
<h4>printOnly</h4>
  <ul>
    <li>Directive type: Attribute</li>
    <li>Makes element and its children only visible for printing</li>
  </ul>
  ```html
  <div print-section>
      <div print-only>
        I'll print, but until then nobody wants me
        <p>Me, too!</p>
      </div>
      <div>Me, too! Except that people still want to look at me in the meantime...</div>
  </div>
  ```
<h4>printHide</h4>
  <ul>
    <li>Directive type: Attribute</li>
    <li>Makes element invisible during printing, but it is replaced by blank space</li>
  </ul>
  ```html
  <div print-section>
      <div print-hide>
        I won't print
        <p>Me, either</p>
      </div>
      <div>I'll print, but those bozos upstairs are still taking up space</div>
  </div>
  ```
<h4>printRemove</h4>
  <ul>
    <li>Directive type: Attribute</li>
    <li>Makes element invisible during printing</li>
  </ul>
  ```html
  <div print-section>
      <div print-hide>
        I won't print
        <p>Me, either</p>
      </div>
      <div>I'll print, and those bozos upstairs will finally stop making such a ruckus</div>
  </div>
  ```
<h4>printBtn</h4>
  <ul>
    <li>Directive type: Attribute</li>
    <li>Adds onClick callback to element that will trigger printing</li>
  </ul>
  ```html
  <button print-btn>Doesn't matter where you put me</button>
  <span print-btn>I will make anything cause a print</span>
  <p print-btn>to happen if you click me</p>
  ```
<h4>printLandscape</h4>
  <ul>
    <li>Directive type: Attribute</li>
    <li>Will cause printing to be landscape instead of portrait</li>
  </ul>
  ```html
  <button print-landscape>Doesn't matter where you put me</button>
  <span print-landscape>I will cause any print</span>
  <p print-landscape>to be landscape</p>
  ```
<h4>printTable</h4>
  <ul>
    <li>Directive type: Attribute</li>
    <li>Optimizes table for printing. This includes keeping 'td' cell content from being cut-off by page breaks.</li>
    <li>Sub attributes:</li>
    <ul>
      <li><h5>printData</h5> (required)</li>
      <ul>
        <li>Takes the array of data objects represented by the table and looks for any changes to this data. If a clone of the table is being used, changes to this data will trigger an update to the clone table.</li>
      </ul>
      <li><h5>printClone</h5> (optional)</li>
      <ul>
        <li>Instead of optimizing the table, this attribute will create an optimized clone of the table. This may be desirable in conjunction with the addClass attribute, as it will cause these classes to be added to the clone only</li>
      </ul>
      <li><h5>addClass</h5> (optional)</li>
      <ul>
        <li>Takes a string of space-separated classes to be applied to the table</li>
      </ul>
    </ul>
  </ul>
  ```html
  <table print-table print-clone print-data="people" add-class="red white blue">
    <tr>
      <td print-remove>Unwanted field</td>
      <td>Name</td>
      <td>Address</td>
      <td>Phone</td>
    </tr>
    <tr ng-repeat="person in people">
      <td print-remove>{{person.unwantedInfo}}</td>
      <td>{{person.name}}</td>
      <td>{{person.address}}</td>
      <td>{{person.phone}}</td>
    </tr>
  </table>      
  ```

