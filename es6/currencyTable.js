const Currency = require("./currency").default;

class CurrencyTable {
    constructor({templateId, tableId}) {
        this.template = document.getElementById(templateId);
        if (!this.template) {
            throw "No Table template found";
        }
        // set rowId
        this.primaryKey = this.template.content.querySelector("tr").getAttribute("data-primarykey");
        this.sortByCol = this.template.content.querySelector("tr").getAttribute("data-sortby");
        
        this.currencies = []; // stores different currencies

        this.tableDataDOM = document.createElement("tbody");
        document.querySelector(`#${tableId}`).appendChild(this.tableDataDOM);
    }

    updateTable(tableData) {
        // create a row
        const rowTemplate = this.createRow(tableData);

        // findRow with rowId
        const rowIndex = this.findRowIndex(
            rowEl => rowEl.getAttribute("data-rowId") === tableData[this.primaryKey]
        );
        
        if (rowIndex !== -1) { // delete row with existing currency
            this.deleteRow(rowIndex);
        } 
       
        // find index of row with least maximum sortByCol attr value
        const insertBeforeIndex = this.findRowIndex(
            rowEl => Number(rowEl.getAttribute("data-sortByVal")) > Number(tableData[this.sortByCol])
        );
        if(insertBeforeIndex === -1)
            this.tableDataDOM.appendChild(rowTemplate);
        else
            this.tableDataDOM.insertBefore(rowTemplate, this.tableDataDOM.querySelectorAll('tr')[insertBeforeIndex]);
    }

    // get or create Currency instance
    getCurrency(name) {
        let currency = this.currencies.find(c => c.name === name);
        if(!currency) {
            currency = new Currency(name);
            this.currencies.push(currency);
        }
        return currency;
    }

    deleteRow(rowIndex) {
        const rowEl = this.tableDataDOM.querySelectorAll('tr')[rowIndex];
        if (rowEl)
            rowEl.remove();
    }

    findRowIndex(searchFn) {
        const allRowEls = this.tableDataDOM.querySelectorAll('tr');
        return [].findIndex.call(allRowEls, searchFn);
    }

    createRow(tableData) {
        const rowTemplate = this.template.content.cloneNode(true);
        const rowEl = rowTemplate.querySelector('tr');

        const cols = rowEl.children;
        [].forEach.call(cols, col => {
            const colId = col.getAttribute("data-colid");
            if(colId)
                col.innerText = tableData[colId] || "";
        });
        let currency = null;

        currency = this.getCurrency(tableData[this.primaryKey]);
        currency.setValue(tableData);

        // Draw graph at .sparkline
        const options = {
            width: 150,
            startColor: "blue",
            endColor: "orange",
            maxColor: "green",
            minColor: "red",
            tooltip: (val, index, arr) => `${val}`
        };
        Sparkline.draw(rowTemplate.querySelector('.sparkline'), currency.getSparklineData(), options)

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
