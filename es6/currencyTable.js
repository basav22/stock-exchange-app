
class CurrencyTable {
    constructor(templateId) {
        this.template = document.getElementById(templateId);
        if (!this.template) {
            throw "No Table template found";
        }
        // set rowId
        this.primaryKey = this.template.content.querySelector("tr").getAttribute("data-primarykey");
        this.sortByCol = this.template.content.querySelector("tr").getAttribute("data-sortby");
        
        this.tableDOM = document.createElement("table");
        document.body.appendChild(this.tableDOM);
    }

    updateTable(tableData) {
        // create a row
        const rowTemplate = this.createRow(tableData);

        // findRow with rowId
        const rowIndex = this.findRowIndex(
            rowEl => rowEl.getAttribute("data-rowId") === tableData[this.primaryKey]
        );
        if (rowIndex !== -1) {
            console.log(`${tableData.name} already exists at ${rowIndex}`)
            this.deleteRow(rowIndex);
        }

        // find index of row with lowest maximum sortByCol attr value
        const insertBeforeIndex = this.findRowIndex(
            rowEl => Number(rowEl.getAttribute("data-sortByVal")) > Number(tableData[this.sortByCol])
        );
        if(insertBeforeIndex === -1)
            this.tableDOM.appendChild(rowTemplate);
        else
            this.tableDOM.insertBefore(rowTemplate, this.tableDOM.querySelectorAll('tr')[insertBeforeIndex]);
    }

    deleteRow(rowIndex) {
        const rowEl = this.tableDOM.querySelectorAll('tr')[rowIndex];
        if (rowEl)
            rowEl.remove();
    }

    findRowIndex(searchFn) {
        const allRowEls = this.tableDOM.querySelectorAll('tr');
        return [].findIndex.call(allRowEls, searchFn);
    }

    createRow(tableData) {
        const rowTemplate = this.template.content.cloneNode(true);
        const rowEl = rowTemplate.querySelector('tr');

        const cols = rowEl.children;
        [].forEach.call(cols, col => {
            const colId = col.getAttribute("data-colid");
            col.innerText = tableData[colId] || "";
        });

        // set rowID for newly created row
        const rowId = tableData[this.primaryKey];
        if (!rowId) {
            throw new Error("RowId is missing for data -", tableData);
        }
        rowEl.setAttribute("data-rowid", rowId);

        // set sortBy attribute as well
        rowEl.setAttribute("data-sortByVal", tableData[this.sortByCol]);

        return rowTemplate;
    }
}

export default CurrencyTable;
