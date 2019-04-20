# AngularOpenDatagrid

This was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.




## Table Options
### Pagination
* **pagination [boolean]:** Enable pagination for the table.
* **pageSize [boolean]:** Enable pagination for the table.
### Themes
* **theme [string]:** Themebased table. The available themes are as follows
1. Matrial Theme (metrial-theme)
2. Dark Theme (dark-theme)
3. Standard Theme (standard-theme)
4. Red Theme (red-theme)

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
# Preview
![Preview](/Datatable.png)
# Future Timeline
1. Ability to render remote data.
2. Make more fast and smooth.
