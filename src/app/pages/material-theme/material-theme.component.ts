import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-theme',
  templateUrl: './material-theme.component.html',
  styleUrls: ['./material-theme.component.scss']
})
export class MaterialThemeComponent implements OnInit {
  dataTables: Array<any> = [
    {
      pagination: true, theme: 'metrial-theme',
      /*columnDefs: [
        {
          headerName: 'Model',
          field: 'model',
          width: '40px',
          sort: true,
          isEdit: true,
          filter: true/!*,
          cellRender: (row, column, data, def) => {
            return '<a href="#">' + data + '</a>';
          }*!/
        },
        {headerName: 'Make', isEdit: true, field: 'make', width: '40px', filter: true, columnFilter: true},
        {headerName: 'Price', isEdit: true, width: '40px', field: 'price'},
        {headerName: 'Mileage (km/ltr)', isEdit: true, width: '10px', field: 'mileage', sort: true},
        {headerName: 'Color', isEdit: true, field: 'color', width: '10px', filter: true, columnFilter: true}
      ],
      rowData: [
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'red'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 50, color: 'green'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 40, color: 'blue'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 330, color: 'bottle green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 100, color: 'black'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 60, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 70, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 80, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 20, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 40, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 50, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 60, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 70, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 40, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
        {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
        {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
        {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'}
      ]*/
      columnDefs: [
        {
          headerName: 'Trade Date', width: 220, field: 'tradeDate', filter: true, columnFilter: true,
          sort: true, isEdit: true, suppressMovable: true
        }, {
          headerName: 'Trade Reference', width: 220, field: 'tradeRef', filter: true, columnFilter: true,
          sort: true, isEdit: true, suppressMovable: true
        },
        {
          headerName: 'Client', width: 220, field: 'client', filter: true, sort: true, columnFilter: true,
          isEdit: true, suppressMovable: true,
          cellRender: (row, column, data, def) => {
            return '<a href="#/client"><span class="client-link">'
              + data + '</span></a>';
          }
        },
        {
          headerName: 'Bought', width: 220, field: 'symbol', filter: true, sort: true, isEdit: true, suppressMovable: true, columnFilter: true,
          cellRender: (row, column, data, def) => {
            let icon = 'check';
            if (!data) {
              icon = 'x';
            }
            return '<i class="feather icon-' + icon +
              '"></i>';
          }
        },
        {
          headerName: 'BuySell', width: 220, field: 'buySell', filter: true, resizable: true,
          sort: true, isEdit: true, suppressMovable: true
        },
        {
          headerName: 'Shares', width: 220, field: 'shares', filter: true, resizable: true, sort: true, isEdit: true, suppressMovable: true
        },
        {
          headerName: 'Price', width: 220, field: 'price', filter: true, resizable: true, sort: true, isEdit: true, suppressMovable: true
        },
        {
          headerName: 'Notional', width: 220, field: 'notional', filter: true, resizable: true,
          sort: true, isEdit: true, suppressMovable: true
        },
        {
          headerName: 'Commission', width: 220, field: 'commission', filter: true, resizable: true,
          sort: true, isEdit: true, suppressMovable: true
        }
      ],
      rowData: [
        {
          tradeDate: '01/01/2019',
          tradeRef: 'ADP34232',
          client: 'EY',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/01/2019',
          tradeRef: 'ADP34232',
          client: 'EY',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/01/2019',
          tradeRef: 'ADP34232',
          client: 'EY',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/01/2019',
          tradeRef: 'ADP34232',
          client: 'Goldman Sachs',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/02/2019',
          tradeRef: 'CDP34232',
          client: 'Goldman Sachs',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/02/2019',
          tradeRef: 'CDP34732',
          client: 'Goldman Sachs',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/02/2019',
          tradeRef: 'CDP33732',
          client: 'Goldman Sachs',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/02/2019',
          tradeRef: 'CDP33732',
          client: 'Goldman Sachs',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/02/2019',
          tradeRef: 'CDP33732',
          client: 'PWC',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/02/2019',
          tradeRef: 'DDP33732',
          client: 'PWC',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/03/2019',
          tradeRef: 'DDP44732',
          client: 'PWC',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/03/2019',
          tradeRef: 'DDP44732',
          client: 'PWC',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/03/2019',
          tradeRef: 'DDP44232',
          client: 'PWC',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/03/2019',
          tradeRef: 'DDP44232',
          client: 'PWC',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/03/2019',
          tradeRef: 'DDP44232',
          client: 'PWC',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/03/2019',
          tradeRef: 'EDP44232',
          client: 'BSE',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/04/2019',
          tradeRef: 'EDP44232',
          client: 'BSE',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/04/2019',
          tradeRef: 'EDP44232',
          client: 'BSE',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/04/2019',
          tradeRef: 'EDP44232',
          client: 'BSE',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/04/2019',
          tradeRef: 'EDP55232',
          client: 'BSE',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/04/2019',
          tradeRef: 'EDP55232',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/04/2019',
          tradeRef: 'RDP55232',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/05/2019',
          tradeRef: 'RDP52132',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/05/2019',
          tradeRef: 'RDP52132',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/05/2019',
          tradeRef: 'RDP32132',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/05/2019',
          tradeRef: 'RDP32132',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/05/2019',
          tradeRef: 'RDP32132',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/06/2019',
          tradeRef: 'WDP32144',
          client: 'NSE',
          symbol: true,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/06/2019',
          tradeRef: 'WDP32144',
          client: 'CMC',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/06/2019',
          tradeRef: 'WDP33244',
          client: 'CMC',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/06/2019',
          tradeRef: 'WDP33244',
          client: 'CMC',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/06/2019',
          tradeRef: 'WDP33244',
          client: 'CMC',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
        {
          tradeDate: '01/06/2019',
          tradeRef: 'WDP33244',
          client: 'CMC',
          symbol: false,
          buySell: 'B',
          shares: '50,000',
          price: '$2.00',
          notional: '$200,000',
          commission: ' $2,500'
        },
      ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
