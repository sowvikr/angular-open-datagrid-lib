import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-standard-theme',
  templateUrl: './standard-theme.component.html',
  styleUrls: ['./standard-theme.component.scss']
})
export class StandardThemeComponent implements OnInit {

  rowData5 = [
    {
      'price': '1,00,000',
      'symbol': 'AXJIO',
      'shares': 10
    },
    {
      'price': '20,000',
      'symbol': 'NAB.AX',
      'shares': 5
    },
    {
      'price': '10,000',
      'symbol': 'IBM',
      'shares': 10
    },
    {
      'price': '2,000',
      'symbol': 'JBX.AX',
      'shares': 15
    },
    {
      'price': '80,000',
      'symbol': 'WES.AX',
      'shares': 7
    },
    {
      'price': '1,000',
      'symbol': 'AAPL',
      'shares': 8
    },
    {
      'price': '8,000',
      'symbol': 'HPQ',
      'shares': 11
    },
    {
      'price': '60,000',
      'symbol': 'INTC',
      'shares': 26
    },
    {
      'price': '800',
      'symbol': 'RACE',
      'shares': 90
    },
    {
      'price': '9000',
      'symbol': 'TM',
      'shares': 100
    }

  ]

  rowData1 = [
    {
      'price': '35,000',
      'symbol': 'NAB.AX',
      'shares': 5
    },
    {
      'price': '16,000',
      'symbol': 'IBM',
      'shares': 10
    },
    {
      'price': '83,000',
      'symbol': 'WES.AX',
      'shares': 7
    },
    {
      'price': '1,500',
      'symbol': 'JBX.AX',
      'shares': 15
    },
    {
      'price': '850',
      'symbol': 'RACE',
      'shares': 90
    },
    {
      'price': '6,000',
      'symbol': 'HPQ',
      'shares': 11
    },
    {
      'price': '1,20,000',
      'symbol': 'AXJIO',
      'shares': 10
    },
    {
      'price': '8500',
      'symbol': 'TM',
      'shares': 100
    },
    {
      'price': '14,000',
      'symbol': 'AAPL',
      'shares': 8
    },
    {
      'price': '57,500',
      'symbol': 'INTC',
      'shares': 26
    }
  ];

  rowData2 = [
    {
      'price': '85,000',
      'symbol': 'WES.AX',
      'shares': 7
    },
    {
      'price': '6,000',
      'symbol': 'HPQ',
      'shares': 11
    },
    {
      'price': '55,000',
      'symbol': 'INTC',
      'shares': 26
    },
    {
      'price': '1,00,000',
      'symbol': 'AXJIO',
      'shares': 10
    },
    {
      'price': '30,000',
      'symbol': 'NAB.AX',
      'shares': 5
    },
    {
      'price': '12,000',
      'symbol': 'IBM',
      'shares': 10
    },
    {
      'price': '1,500',
      'symbol': 'JBX.AX',
      'shares': 15
    },
    {
      'price': '800',
      'symbol': 'RACE',
      'shares': 90
    },
    {
      'price': '8000',
      'symbol': 'TM',
      'shares': 100
    },
    {
      'price': '12,000',
      'symbol': 'AAPL',
      'shares': 8
    }
  ];

  rowData3 = [
    {
      'price': '58,500',
      'symbol': 'INTC',
      'shares': 26
    },
    {
      'price': '35,500',
      'symbol': 'NAB.AX',
      'shares': 5
    },
    {
      'price': '12,000',
      'symbol': 'IBM',
      'shares': 10
    },
    {
      'price': '83,000',
      'symbol': 'WES.AX',
      'shares': 7
    },
    {
      'price': '890',
      'symbol': 'RACE',
      'shares': 90
    },
    {
      'price': '6,000',
      'symbol': 'HPQ',
      'shares': 11
    },
    {
      'price': '14,500',
      'symbol': 'AAPL',
      'shares': 8
    },
    {
      'price': '1,550',
      'symbol': 'JBX.AX',
      'shares': 15
    },

    {
      'price': '1,50,000',
      'symbol': 'AXJIO',
      'shares': 10
    },
    {
      'price': '8900',
      'symbol': 'TM',
      'shares': 100
    }

  ];

  rowData4 = [
    {
      'price': '15,000',
      'symbol': 'IBM',
      'shares': 10
    },
    {
      'price': '800',
      'symbol': 'RACE',
      'shares': 90
    },
    {
      'price': '2,000',
      'symbol': 'JBX.AX',
      'shares': 15
    },
    {
      'price': '80,000',
      'symbol': 'WES.AX',
      'shares': 7
    },
    {
      'price': '9000',
      'symbol': 'TM',
      'shares': 100
    },
    {
      'price': '1,00,000',
      'symbol': 'AXJIO',
      'shares': 10
    },
    {
      'price': '20,000',
      'symbol': 'NAB.AX',
      'shares': 5
    },
    {
      'price': '1,000',
      'symbol': 'AAPL',
      'shares': 8
    },
    {
      'price': '8,000',
      'symbol': 'HPQ',
      'shares': 11
    },
    {
      'price': '60,000',
      'symbol': 'INTC',
      'shares': 26
    }

  ];

  dataTables: Array<any> = [
    {
      pagination: true, theme: 'light-theme',
      columnDefs: [
        {
          headerName: 'Price', width: 220, field: 'price', filter: true, columnFilter: true,
          sort: true, isEdit: true, suppressMovable: true
        },
        {
          headerName: 'Symbol', width: 220, field: 'symbol', filter: true, columnFilter: true,
          sort: true, isEdit: true, suppressMovable: true
        },
        {
          headerName: 'Shares', width: 220, field: 'shares', filter: true, resizable: true,
          sort: true, isEdit: true, suppressMovable: true
        },
      ],
      rowData: [
        {
          'price': '1,00,000',
          'symbol': 'AXJIO',
          'shares': 10
        },
        {
          'price': '20,000',
          'symbol': 'NAB.AX',
          'shares': 5
        },
        {
          'price': '10,000',
          'symbol': 'IBM',
          'shares': 10
        },
        {
          'price': '2,000',
          'symbol': 'JBX.AX',
          'shares': 15
        },
        {
          'price': '80,000',
          'symbol': 'WES.AX',
          'shares': 7
        },
        {
          'price': '1,000',
          'symbol': 'AAPL',
          'shares': 8
        },
        {
          'price': '8,000',
          'symbol': 'HPQ',
          'shares': 11
        },
        {
          'price': '60,000',
          'symbol': 'INTC',
          'shares': 26
        },
        {
          'price': '800',
          'symbol': 'RACE',
          'shares': 90
        },
        {
          'price': '9000',
          'symbol': 'TM',
          'shares': 100
        }
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      const rowData = this['rowData' + Math.floor((Math.random() * 5) + 1)];
      if (rowData) {
        console.log(rowData);
      }
      this.dataTables[0].rowData = rowData;
    }, 5000);
  }

}

