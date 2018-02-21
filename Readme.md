DB Updating Table Dev Challenge
===============================
        
<b>Notes:</b>
<ul>
    <li>No new dependencies added. To run <b><code>npm run start</code></b></li> 
</ul>
<h3>High level approach -</h3>
<ul>
    <li>There is HTML template with id "stock-table" which represents each row in table</li>
    <li>All TDs need to have "data-colid" attribute which maps to dataObject mapped to that keyString</li>
    <li>Last column is sparkline graph</li>
    <li>We need to specify "data-primarykey" attribute which represents primary key which we can use to identify individual row</li>
    <li>We need to specify "data-sortby" attribute which represents column name used to sort the table data</li>
    <li>With every refreshed data, we try to find existing row with currencyName and delete that row. Create a new row using template</li>
    <li>During insertion, we look for val of "data-sortBy" attribute while maintaining the order in table</li>
    <li>
        For Sparkline Update - 
        <ul>
        <li>Each currency holds historyValues which includes timestamp(when data was fetched)</li>
        <li>So we filter over historyValues to get latest 30s data and render graph</li>
        <li>Over the period of time, historyValues will flood, hence there is a job(setTimeout function) which clears the 60s data every 60s. This way we can clear unwanted data</li>
        </ul>
    </li>
</ul>

===============================
<p>In case of any queries, please contact - </p>
<p>
    <h4>Name - Basavaraj S Sonnad</h4>
    <h4>Email - sonnad.basavaraj@yahoo.com</h4>
</p>
       