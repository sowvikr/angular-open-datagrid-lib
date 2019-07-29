# AngularOpenDatagrid

### Install
```npm install angular-open-datagrid --save```
### Usage
#### Import app.module.ts
```javascript
import {AngularOpenDatagridModule} from 'angular-open-datagrid';
```
#### Add to the Imports @NgModule

```javascript
imports: [
    BrowserModule,
    AppRoutingModule,
    AngularOpenDatagridModule
  ]
```
#### Use
```html
<data-grid [pagination]="pagination" [theme]="theme"
                [columnDefs]="columnDefs" [rowData]="rowData"></data-grid>
```
#### Icons
For icons install font-awesome 
```javascript
npm install font-awesome --save
```
and include css in src/styles.scss
```css
@import "../node_modules/font-awesome/css/font-awesome.css";
```

## Table Options
### Pagination
* **pagination [boolean]:** Enable pagination for the table.
* **pageSize [number]:** Enable pagination for the table.
### Themes
* **theme [string]:** Themebased table. The available themes are as follows
1. Matrial Theme (metrial-theme)
2. Dark Theme (dark-theme)
3. Standard Theme (standard-theme)
4. Red Theme (red-theme)
### Search
* **commonSearch [boolean]:** Enable common search for the table.
### Column Definitions
#### Mandatory Options
* **headerName [string]:** Header name of the particular column
* **field [string]:** Field name mapping to the data rows.
* **width [number]:** Width of the column in pixel.
* **sort [boolean]:** Column is sortable.
* **filter [boolean]:** Can filter can be filtered.

```javascript
colunDefs[          
          headerName: 'Model',
          field: 'model',
          width: '40px',
          sort: true,
          filter: true
]
```
#### Optional Options
* **columnFilter [boolean]:** This filter is group similar values and make a Special filter for the particular column.
* **isEdit [boolean]:** Editable the prticular column.
* **cellRender [function(row, column, data, colDef)]:** Custom column renderer.


**Column Definition Example**
```javascript
columnDefs[{
          headerName: 'Model',
          field: 'model',
          width: '40',
          sort: true,
          filter: true,
          cellRender: (row, column, data, def) => {
            return '<a href="#">' + data + '</a>';
          }
        },
        {headerName: 'Make', isEdit: true, field: 'make', width: '40px'......}]
```

### Rows
Simply array of data.
**Example:**
```javascript
rowData: [
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'red'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 50, color: 'green'},
        .............................................................................
        ]
```
### Binding data with table component
```html
  <app-data-table [pagination]=true [theme]="standard-theme"
                  [columnDefs]="columns" [rowData]="data"></app-data-table>
```

## Notable Features
1. Theme based data table
2. Column is re-arrangeable using drag-drop
3. Row arrangable.
4. Nice animation for visualization.
5. Edit Cell
6. Copy paste like Microsoft Excel.
7. Export the data as CSV.
# Preview
![Preview](/Datatable.png)
# Demo
1. Download the zip.
2. Unzip and open CMD and type npm start.

# Future Timeline
1. Ability to render remote data.
2. Make more fast and smooth.
